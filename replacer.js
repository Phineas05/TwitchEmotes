var extensionSettings;
var emoteListCache;
var host;
var nodeTestRegEx;
var blacklistedTags;
var emoteList;
var lastTitle;
var addedChannels;

function onLoad() {
	chrome.storage.local.get({
		emoteListCache: {}
	}, function(settings) {
		emoteListCache = settings.emoteListCache;
	});
	chrome.storage.sync.get({
		enableTwitchEmotes: true,
		enableBTTVEmotes: true,
		BTTVChannels: [],
		enableFFZEmotes: true,
		FFZChannels: [],
		enableEmoteBlacklist: false,
		removeBlacklistedEmotes: false,
		emoteBlacklist: [],
		hostnameListType: "blacklist",
		hostnameList: []
	}, function(settings) {
		extensionSettings = settings;
		initialize();
	});
}
$(document).ready(onLoad);

function initialize() {
	host = window.location.hostname;
	lastTitle = document.title;
	addedChannels = [];
	if (extensionSettings.hostnameList.indexOf(host) == -1 && extensionSettings.hostnameList.indexOf(host.replace("www.", "")) == -1) {
		if (extensionSettings.hostnameListType == "whitelist") {
			return;
		}
	} else {
		if (extensionSettings.hostnameListType == "blacklist") {
			return;
		}
	}
	nodeTestRegEx = /\w+?/gi;
	blacklistedTags = ["TITLE", "STYLE", "SCRIPT", "NOSCRIPT", "LINK", "TEMPLATE", "INPUT", "IFRAME"];
	emoteList = {};
	if (extensionSettings.enableTwitchEmotes) {
		processEmotes(getEmotes("https://twitchemotes.com/api_cache/v3/global.json", 1));
	}
	if (extensionSettings.enableBTTVEmotes) {
		processEmotes(getEmotes("https://api.betterttv.net/2/emotes", 2));
		$.each(extensionSettings.BTTVChannels, function(index, value) {
			processEmotes(getEmotes("https://api.betterttv.net/2/channels/" + value, 2));
		});
	}
	if (extensionSettings.enableFFZEmotes) {
		processEmotes(getEmotes("https://api.frankerfacez.com/v1/set/global", 3));
		$.each(extensionSettings.FFZChannels, function(index, value) {
			processEmotes(getEmotes("https://api.frankerfacez.com/v1/room/" + value, 3));
		});
	}
	var twitchChannel = getCurrentTwitchChannel();
	if (twitchChannel) {
		addChannelEmotes(twitchChannel);
		addedChannels.push(twitchChannel);
	}
	if (host == "www.twitch.tv") {
		var titleChangeObserver = new MutationObserver(function(mutations) {
			if (lastTitle != mutations[0].target.innerHTML) {
				lastTitle = mutations[0].target.innerHTML;
				var twitchChannel = getCurrentTwitchChannel();
				if (twitchChannel && addedChannels.indexOf(twitchChannel) == -1) {
					addChannelEmotes(twitchChannel);
					addedChannels.push(twitchChannel);
				}
			}
		});
		titleChangeObserver.observe(document.querySelector("title"), {attributes: false, childList: true, characterData: true, subtree: true});
	}
	startReplaceLoop();
	var mutationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var currentNode = $(mutation.addedNodes[i]);
				if (host == "clips.twitch.tv" && !twitchChannel) {
					try {
						twitchChannel = new RegExp(escapeRegEx("<a target=\"_blank\" href=\"https://www.twitch.tv/") + "(.*?)" + escapeRegEx("/clips?tt_content=player_profile_img"), "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
						addChannelEmotes(twitchChannel);
					} catch { }
				}
				if (extensionSettings.enableEmoteBlacklist && extensionSettings.removeBlacklistedEmotes) {
					if (currentNode.hasClass("chat-line__message") && extensionSettings.emoteBlacklist.length > 0) {
						var emoteBlacklist = [];
						$.each(extensionSettings.emoteBlacklist, function(index, value) {
							var escapedValue = escapeRegEx(value);
							if (escapedValue) {
								emoteBlacklist.push(escapedValue);
							}
						});
						var blacklistRegEx = new RegExp(emoteBlacklist.join("|"), "g");
						currentNode.find("span[data-a-target='chat-message-text']").each(function() {
							if ($(this).html().match(blacklistRegEx)) {
								currentNode.hide();
								return;
							}
						});
					}
				}
				currentNode.find("*").contents().filter(function() {
					return (this.nodeType == 3 && this.textContent.match(nodeTestRegEx));
				}).each(function() {
					replacePhrasesWithEmotes(this);
				});
			}
		});
	});
	mutationObserver.observe(document.body, {attributes: false, childList: true, characterData: true, subtree: true});
}

function escapeRegEx(string) {
	return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function getEmotes(url, parseMode) {
	var currentTimestamp = Math.floor(Date.now() / 1000);
	if (url in emoteListCache) {
		if (emoteListCache[url]["expiry"] - currentTimestamp > 0) {
			return emoteListCache[url]["emoteList"];
		}
	}
	var emoteList = {};
	try {
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", url, false);
		httpRequest.send(null);
		var response = JSON.parse(httpRequest.responseText);
		switch (parseMode) {
			case 1:
				$.each(response, function(emoteName, data) {
					emoteList[emoteName] = ["https://static-cdn.jtvnw.net/emoticons/v1/" + data["id"] + "/1.0"];
				});
			case 2:
				$.each(response["emotes"], function(index, data) {
					emoteList[data["code"]] = ["https://cdn.betterttv.net/emote/" + data["id"] + "/1x"];
				});
			case 3:
				$.each(response["sets"], function(setID, setData) {
					$.each(setData["emoticons"], function(index, data) {
						emoteList[data["name"]] = ["https://cdn.frankerfacez.com/emoticon/" + data["id"] + "/1"];
					});
				});
			default:
				break;
		}
		emoteListCache[url] = {expiry: currentTimestamp + 1800, emoteList: emoteList};
		chrome.storage.local.set({
			emoteListCache: emoteListCache
		});
	} finally {
		return emoteList;
	}
}

function processEmotes(emotes) {
	for (var emoteName in emotes) {
		if (extensionSettings.enableEmoteBlacklist) {
			var index = extensionSettings.emoteBlacklist.indexOf(emoteName);
			if (index > -1) {
				continue;
			}
		}
		var emoteRegex = "(?<=\\s|^)" + escapeRegEx(emoteName) + "(?=\\s|$)";
		emoteList[emoteName] = ["<img style=\"max-height: 32px;\" title=\"" + emoteName + "\" alt=\"" + emoteName + "\" src=\"" + emotes[emoteName][0] + "\"\\>", new RegExp(emoteRegex, "g")];
	}
}

function getCurrentTwitchChannel() {
	var twitchChannel = "";
	if (host == "www.twitch.tv") {
		var urlSplit = window.location.href.split("/")
		if (urlSplit[3] == "videos") {
			if (document.documentElement.innerHTML.indexOf("<title>Twitch</title>") > -1) {
				try {
					twitchChannel = new RegExp("<meta property=\"og:description\" content=\"(.*?) - ", "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
				} catch { }
			} else {
				try {
					twitchChannel = new RegExp("<title>(.*?) - ", "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
				} catch { }
			}
		} else if (urlSplit[3] == "popout") {
			twitchChannel = urlSplit[4];
		} else {
			if (document.documentElement.innerHTML.indexOf("<title>Twitch</title>") > -1) {
				try {
					twitchChannel = new RegExp("<meta property=\"og:title\" content=\"(.*?) - ", "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
				} catch { }
			} else {
				try {
					twitchChannel = new RegExp("<title>(.*?) - ", "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
				} catch { }
			}
		}
	} else if (host == "clips.twitch.tv") {
		try {
			twitchChannel = new RegExp("<meta property=\"og:title\" content=\"\(.*?) Playing", "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
		} catch { }
	}
	return twitchChannel;
}

function addChannelEmotes(channel) {
	if (extensionSettings.enableBTTVEmotes) {
		if (extensionSettings.BTTVChannels.indexOf(channel) == -1) {
			processEmotes(getEmotes("https://api.betterttv.net/2/channels/" + channel, 2));
		}
	}
	if (extensionSettings.enableFFZEmotes) {
		if (extensionSettings.FFZChannels.indexOf(channel) == -1) {
			processEmotes(getEmotes("https://api.frankerfacez.com/v1/room/" + channel, 3));
		}
	}
}

function startReplaceLoop() {
	$("body *").filter(function() {
		return (blacklistedTags.indexOf($(this).prop("tagName")) < 0);
	}).each(function() {
		$(this).contents().filter(function() {
			return (this.nodeType == 3 && this.textContent.match(nodeTestRegEx));
		}).each(function() {
			replacePhrasesWithEmotes(this);
		});
	});
}

function replacePhrasesWithEmotes(element) {
	var elementContent = element.textContent;
	for (var emoteName in emoteList) {
		elementContent = elementContent.replace(emoteList[emoteName][1], emoteList[emoteName][0]);
	}
	if (element.textContent != elementContent) {
		$(element).replaceWith(elementContent);
		var scrollElements = [];
		if (host == "www.twitch.tv") {
			if (!$(".chat-list__more-messages").is(":visible")) {
				scrollElements.push($(".chat-list").find(".simplebar-scroll-content"));
			}
			if (!$(".video-chat__sync-button").is(":visible")) {
				scrollElements.push($(".video-chat__message-list-wrapper"));
			}
		} else if (host == "clips.twitch.tv") {
			if (!$(".tw-button--small").is(":visible")) {
				scrollElements.push($(".clips-chat").find(".simplebar-scroll-content"));
			}
		}
		for (var i = 0; i < scrollElements.length; i++) {
			if (scrollElements[i].length > 0) {
				$(scrollElements[i]).scrollTop(scrollElements[i][0].scrollHeight + 100);
			}
		}
	}
}
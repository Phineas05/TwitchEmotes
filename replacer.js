var extensionSettings;
var emoteListCache;
var host;
var nodeTestRegEx;
var blacklistedTags;
var emoteList;
var lastTitle;
var addedLinks;
var mutationObserver;
var twitchGlobalEmotes;
var twitchChannel;
var waiting = 0;

function initialize(changes = null, areaName = "sync") {
	if (areaName == "sync") {
		if (mutationObserver) {
			mutationObserver.disconnect();
		}
		chrome.storage.local.get({
			emoteListCache: {}
		}, function(settings) {
			emoteListCache = settings.emoteListCache;
		});
		chrome.storage.sync.get({
			enableTwitchEmotes: true,
			subscriberEmotesChannels: [],
			enableOnTwitch: false,
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
			start();
		});
	}
}
$(document).ready(initialize);
chrome.storage.onChanged.addListener(initialize);

function start() {
	host = window.location.hostname;
	lastTitle = document.title;
	addedLinks = [];
	emoteList = {};
	urlList = [];
	twitchGlobalEmotes = {"JKanStyle": 15, "OptimizePrime": 16, "StoneLightning": 17, "TheRinger": 18, "RedCoat": 22, "Kappa": 25, "JonCarnage": 26, "MrDestructoid": 28, "BCWarrior": 30, "GingerPower": 32, "DansGame": 33, "SwiftRage": 34, "PJSalt": 36, "KevinTurtle": 40, "Kreygasm": 41, "SSSsss": 46, "PunchTrees": 47, "ArsonNoSexy": 50, "SMOrc": 52, "FrankerZ": 65, "OneHand": 66, "HassanChop": 68, "BloodTrail": 69, "DBstyle": 73, "AsianGlow": 74, "BibleThump": 86, "ShazBotstix": 87, "PogChamp": 88, "PMSTwin": 92, "FUNgineer": 244, "ResidentSleeper": 245, "4Head": 354, "HotPokket": 357, "FailFish": 360, "DAESuppy": 973, "WholeWheat": 1896, "ThunBeast": 1898, "TF2John": 1899, "RalpherZ": 1900, "Kippa": 1901, "Keepo": 1902, "BigBrother": 1904, "SoBayed": 1906, "PeoplesChamp": 3412, "GrammarKing": 3632, "PanicVis": 3668, "ANELE": 3792, "BrokeBack": 4057, "PipeHype": 4240, "YouWHY": 4337, "RitzMitz": 4338, "EleGiggle": 4339, "TheThing": 7427, "HassaanChop": 20225, "BabyRage": 22639, "panicBasket": 22998, "PermaSmug": 27509, "BuddhaBar": 27602, "WutFace": 28087, "PRChase": 28328, "Mau5": 30134, "HeyGuys": 30259, "NotATK": 34875, "mcaT": 35063, "TTours": 38436, "PraiseIt": 38586, "HumbleLife": 46881, "CorgiDerp": 49106, "ArgieB8": 51838, "ShadyLulu": 52492, "KappaPride": 55338, "CoolCat": 58127, "DendiFace": 58135, "NotLikeThis": 58765, "riPepperonis": 62833, "duDudu": 62834, "bleedPurple": 62835, "twitchRaid": 62836, "SeemsGood": 64138, "MingLee": 68856, "KappaRoss": 70433, "KappaClaus": 74510, "OhMyDog": 81103, "OSFrog": 81248, "SeriousSloth": 81249, "KomodoHype": 81273, "VoHiYo": 81274, "MikeHogu": 81636, "KappaWealth": 81997, "cmonBruh": 84608, "SmoocherZ": 89945, "NomNom": 90075, "StinkyCheese": 90076, "ChefFrank": 90129, "FutureMan": 98562, "OpieOP": 100590, "DoritosChip": 102242, "PJSugar": 102556, "VoteYea": 106293, "VoteNay": 106294, "RuleFive": 107030, "DxCat": 110734, "DrinkPurple": 110785, "TinyFace": 111119, "PicoMause": 111300, "TheTarFu": 111351, "DatSheffy": 111700, "UnSane": 111792, "copyThis": 112288, "pastaThat": 112289, "imGlitch": 112290, "GivePLZ": 112291, "TakeNRG": 112292, "BlargNaut": 114738, "DogFace": 114835, "Jebaited": 114836, "TooSpicy": 114846, "WTRuck": 114847, "UncleNox": 114856, "RaccAttack": 114870, "StrawBeary": 114876, "PrimeMe": 115075, "BrainSlug": 115233, "BatChest": 115234, "CurseLit": 116625, "Poooound": 117484, "FreakinStinkin": 117701, "SuperVinlin": 118772, "TriHard": 120232, "CoolStoryBob": 123171, "ItsBoshyTime": 133468, "KAPOW": 133537, "YouDontSay": 134254, "UWot": 134255, "RlyTho": 134256, "PartyTime": 135393, "NinjaGrumpy": 138325, "MVGame": 142140, "TBAngel": 143490, "TheIlluminati": 145315, "BlessRNG": 153556, "MorphinTime": 156787, "ThankEgg": 160392, "ArigatoNas": 160393, "BegWan": 160394, "BigPhish": 160395, "InuyoFace": 160396, "Kappu": 160397, "KonCha": 160400, "PunOko": 160401, "SabaPing": 160402, "TearGlove": 160403, "TehePelo": 160404, "TwitchLit": 166263, "CarlSmile": 166266, "CrreamAwk": 191313, "Squid1": 191762, "Squid2": 191763, "Squid3": 191764, "Squid4": 191767, "TwitchUnity": 196892, "TPcrunchyroll": 323914, "EntropyWins": 376765, "LUL": 425618, "PowerUpR": 425671, "PowerUpL": 425688, "HSCheers": 444572, "HSWP": 446979, "DarkMode": 461298, "TwitchVotes": 479745, "TPFufun": 508650, "RedTeam": 530888, "GreenTeam": 530890, "HappyJack": 551865, "AngryJack": 551866, "PurpleStar": 624501, "FBtouchdown": 626795, "PopCorn": 724216, "TombRaid": 864205, "EarthDay": 959018, "PartyHat": 965738, "MercyWing1": 1003187, "MercyWing2": 1003189, "PinkMercy": 1003190, "BisexualPride": 1064987, "LesbianPride": 1064988, "GayPride": 1064991, "TransgenderPride": 1064995, "AsexualPride": 1130348, "PansexualPride": 1130349, "TwitchRPG": 1220086, "IntersexPride": 1221184, "MaxLOL": 1290325, "NonBinaryPride": 1297279, "GenderFluidPride": 1297281, "FBRun": 1441261, "FBPass": 1441271, "FBSpiral": 1441273, "FBBlock": 1441276, "FBCatch": 1441281, "FBChallenge": 1441285, "FBPenalty": 1441289, "PeteZaroll": 1470035, "PeteZarollOdyssey": 1470037, "PixelBob": 1547903, "GunRun": 1584743, "HolidayCookie": 1713813, "HolidayLog": 1713816, "HolidayOrnament": 1713818, "HolidayPresent": 1713819, "HolidaySanta": 1713822, "HolidayTree": 1713825, "SoonerLater": 2113050};
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
	if (extensionSettings.enableTwitchEmotes) {
		if (((host == "www.twitch.tv" || host == "clips.twitch.tv") && extensionSettings.enableOnTwitch) || (host != "www.twitch.tv" && host != "clips.twitch.tv")) {
			urlList.push(["https://twitchemotes.com/api_cache/v3/global.json", 1, "Twitch Global Emote"]);
			$.each(extensionSettings.subscriberEmotesChannels, function(index, value) {
				urlList.push(["https://api.twitch.tv/api/channels/" + value + "/product?client_id=p7avnpl1f9bpc9mxa6za572e94x2qc", 2, "Subscriber Emote - " + value]);
			});
		}
	}
	if (extensionSettings.enableBTTVEmotes) {
		urlList.push(["https://api.betterttv.net/2/emotes", 2, "BetterTTV Global Emote"]);
		$.each(extensionSettings.BTTVChannels, function(index, value) {
			urlList.push(["https://api.betterttv.net/2/channels/" + value, 3, "BetterTTV Emote - " + value]);
		});
	}
	if (extensionSettings.enableFFZEmotes) {
		urlList.push(["https://api.frankerfacez.com/v1/set/global", 3, "FrankerFaceZ Global Emote"]);
		$.each(extensionSettings.FFZChannels, function(index, value) {
			urlList.push(["https://api.frankerfacez.com/v1/room/" + value, 4, "FrankerFaceZ Emote - " + value]);
		});
	}
	twitchChannel = getCurrentTwitchChannel();
	if (twitchChannel) {
		urlList = urlList.concat(addChannelEmotes(twitchChannel, true));
	}
	if (host == "www.twitch.tv") {
		var titleChangeObserver = new MutationObserver(function(mutations) {
			if (lastTitle != mutations[0].target.innerHTML) {
				lastTitle = mutations[0].target.innerHTML;
				twitchChannel = getCurrentTwitchChannel();
				if (twitchChannel) {
					addChannelEmotes(twitchChannel);
				}
			}
		});
		titleChangeObserver.observe(document.querySelector("title"), {attributes: false, childList: true, characterData: true, subtree: true});
	}
	var currentTimestamp = Math.floor(Date.now() / 1000);
	var deletedFromCache = 0;
	for (var url in emoteListCache) {
		if (emoteListCache[url]["expiry"] - currentTimestamp <= 0) {
			delete emoteListCache[url];
			deletedFromCache++;
		}
	}
	if (deletedFromCache > 0) {
		chrome.storage.local.set({
			emoteListCache: emoteListCache
		});
	}
	waiting += urlList.length;
	$.each(urlList, function(index, value) {
		addEmotes(value[0], value[1], value[2]);
	});
	mutationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var currentNode = $(mutation.addedNodes[i]);
				if (host == "clips.twitch.tv") {
					try {
						twitchChannel = getCurrentTwitchChannel();
						if (twitchChannel) {
							addChannelEmotes(twitchChannel);
						}
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
						currentNode.find(".chat-line__message--emote").each(function() {
							if ($(this).attr("alt").match(blacklistRegEx)) {
								currentNode.hide();
								return;
							}
						});
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

function addEmotes(url, parseMode, extra, direct = false, tries = 3) {
	if (addedLinks.indexOf(url) == -1) {
		addedLinks.push(url);
	} else {
		waiting--;
		return;
	}
	var currentTimestamp = Math.floor(Date.now() / 1000);
	if (url in emoteListCache) {
		if (emoteListCache[url]["expiry"] - currentTimestamp > 0) {
			processEmotes(emoteListCache[url]["emoteList"], direct);
			return;
		}
	}
	$.ajax({
		url: url,
		type: "GET",
		timeout: 15000,
		success: function(response) {
			var emoteList = {};
			switch (parseMode) {
				case 1:
					$.each(twitchGlobalEmotes, function(emoteName, id) {
						emoteList[emoteName] = ["https://static-cdn.jtvnw.net/emoticons/v1/" + id + "/1.0", extra];
					});
				case 2:
					$.each(response["emoticons"], function(index, data) {
						emoteList[data["regex"]] = [data["url"], extra];
					});
				case 3:
					$.each(response["emotes"], function(index, data) {
						emoteList[data["code"]] = ["https://cdn.betterttv.net/emote/" + data["id"] + "/1x", extra];
					});
				case 4:
					$.each(response["sets"], function(setID, setData) {
						$.each(setData["emoticons"], function(index, data) {
							emoteList[data["name"]] = ["https://cdn.frankerfacez.com/emoticon/" + data["id"] + "/1", extra];
						});
					});
				default:
					break;
			}
			emoteListCache[url] = {expiry: currentTimestamp + 3600, emoteList: emoteList};
			chrome.storage.local.set({
				emoteListCache: emoteListCache
			});
			processEmotes(emoteList, direct);
		},
		error: function() {
			if (--tries > 0) {
				addEmotes(url, parseMode, extra, direct, tries)
			} else {
				if (--waiting == 0) {
					startReplaceLoop();
				}
			}
		}
	});
}

function processEmotes(emotes, direct) {
	for (var emoteName in emotes) {
		if (extensionSettings.enableEmoteBlacklist) {
			var index = extensionSettings.emoteBlacklist.indexOf(emoteName);
			if (index > -1) {
				continue;
			}
		}
		var emoteRegex = "(?<=\\s|^)" + escapeRegEx(emoteName) + "(?=\\s|$)";
		if (emoteName in emoteList) {
			emoteList[emoteName][0] = emoteList[emoteName][0].replace("\" alt=", "&#10;" + emotes[emoteName][1] + "\" alt=")
		} else {
			emoteList[emoteName] = ["<img style=\"max-height: 32px;\" title=\"" + emoteName + "&#10;" + emotes[emoteName][1] + "\" alt=\"" + emoteName + "\" src=\"" + emotes[emoteName][0] + "\"\\>", new RegExp(emoteRegex, "g")];
		}
	}
	if (direct) {
		startReplaceLoop();
	} else if (--waiting == 0) {
		startReplaceLoop();
	}
}

function getCurrentTwitchChannel() {
	var twitchChannel = "";
	if (host == "www.twitch.tv") {
		var urlSplit = window.location.href.split("/")
		if (urlSplit.length > 4 && (urlSplit[4].startsWith("videos") || urlSplit[4].startsWith("clip") || urlSplit[4].startsWith("events") || urlSplit[4].startsWith("followers") || urlSplit[4].startsWith("following"))) {
			twitchChannel = urlSplit[3];
		} else if (urlSplit.length > 3) {
			if (urlSplit[3] == "popout") {
				twitchChannel = urlSplit[4];
			} else if (urlSplit[3] == "videos") {
				if (document.documentElement.innerHTML.indexOf("<title>Twitch</title>") == -1) {
					try {
						twitchChannel = new RegExp("<title>(.*?) - ", "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
					} catch { }
				}
			} else {
				if (document.documentElement.innerHTML.indexOf("<title>Twitch</title>") == -1) {
					twitchChannel = urlSplit[3];
				}
			}
		}
	} else if (host == "clips.twitch.tv") {
		try {
			twitchChannel = new RegExp(escapeRegEx("<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://www.twitch.tv/") + "(.*?)" + escapeRegEx("/clips?tt_content=player_profile_img\">"), "g").exec(document.documentElement.innerHTML)[1].toLowerCase();
		} catch { }
	}
	twitchChannel = twitchChannel.trim();
	if (twitchChannel && twitchChannel.indexOf(" ") < 0) {
		return twitchChannel;
	}
}

function addChannelEmotes(channel, returns = false) {
	urlList = [];
	if (extensionSettings.enableTwitchEmotes) {
		if (((host == "www.twitch.tv" || host == "clips.twitch.tv") && extensionSettings.enableOnTwitch) || (host != "www.twitch.tv" && host != "clips.twitch.tv")) {
			if (extensionSettings.subscriberEmotesChannels.indexOf(channel) == -1) {
				urlList.push(["https://api.twitch.tv/api/channels/" + channel + "/product?client_id=p7avnpl1f9bpc9mxa6za572e94x2qc", 2, "Subscriber Emote - " + channel]);
			}
		}
	}
	if (extensionSettings.enableBTTVEmotes) {
		if (extensionSettings.BTTVChannels.indexOf(channel) == -1) {
			urlList.push(["https://api.betterttv.net/2/channels/" + channel, 3, "BetterTTV Emote - " + channel]);
		}
	}
	if (extensionSettings.enableFFZEmotes) {
		if (extensionSettings.FFZChannels.indexOf(channel) == -1) {
			urlList.push(["https://api.frankerfacez.com/v1/room/" + channel, 4, "FrankerFaceZ Emote - " + channel]);
		}
	}
	if (returns) {
		return urlList;
	} else {
		waiting += urlList.length;
		$.each(urlList, function(index, value) {
			addEmotes(value[0], value[1], value[2]);
		});
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
var listID;
var notificationTimer;

function onLoad() {
	loadSettings();
	$("#resetSettingsButton").click(openConfirmationBox);
	$("#clearCacheButton").click(clearCache);
	$("#addSubscriberEmotesChannelButton").click(function() {
		listID = "subscriberEmotesChannels";
		openDialogBox("Add Subscriber Emotes Channel", "Channel name");
	});
	$("#addBTTVChannelButton").click(function() {
		listID = "BTTVChannels";
		openDialogBox("Add BTTV Channel", "Channel name");
	});
	$("#addFFZChannelButton").click(function() {
		listID = "FFZChannels";
		openDialogBox("Add FFZ Channel", "Channel name");
	});
	$("#addBlacklistedEmoteButton").click(function() {
		listID = "emoteBlacklist";
		openDialogBox("Add Blacklisted Emote", "Emote name");
	});
	$("#dialogBoxTextBox").keyup(function(e) {
		if (e.keyCode == 13) {
			dialogBoxAdd();
		} else if (e.keyCode == 27) {
			closeFloatingBox();
		}
   });
	$("#dialogBoxAddButton").click(dialogBoxAdd);
	$("#dialogBoxCancelButton").click(closeFloatingBox);
	$(document).on("click", "#removeListItemButton", removeListItem);
	$("#confirmationYesButton").click(resetSettings);
	$("#confirmationNoButton").click(closeFloatingBox);
	$(".notification").click(dismissNotification);
	$("#enableTwitchEmotesCheckbox").change(function() {
		chrome.storage.sync.set({enableTwitchEmotes: this.checked});
	});
	$("#enableOnTwitchCheckbox").change(function() {
		chrome.storage.sync.set({enableOnTwitch: this.checked});
    });
	$("#enableBTTVEmotesCheckbox").change(function() {
		chrome.storage.sync.set({enableBTTVEmotes: this.checked});
    });
	$("#enableFFZEmotesCheckbox").change(function() {
		chrome.storage.sync.set({enableFFZEmotes: this.checked});
    });
	$("#enableEmoteBlacklistCheckbox").change(function() {
		chrome.storage.sync.set({enableEmoteBlacklist: this.checked});
    });
	$("#removeBlacklistedEmotesCheckbox").change(function() {
		chrome.storage.sync.set({removeBlacklistedEmotes: this.checked});
	});
	$("#hostnameListTypeBlacklist").change(function() {
		chrome.storage.sync.set({hostnameListType: this.checked ? "blacklist" : "whitelist"});
	});
	$("#hostnameListTypeWhitelist").change(function() {
		chrome.storage.sync.set({hostnameListType: this.checked ? "whitelist" : "blacklist"});
	});
	$("#hostnameList").focusout(function() {
		chrome.storage.sync.set({hostnameList: this.value ? this.value.split("\n") : []});
	});
	$(".blackOverlay").click(closeFloatingBox);
	$(".centerPanel").css({opacity: 1});
}
$(document).ready(onLoad);

function openDialogBox(title, placeholder) {
	$("#dialogBoxTitle").html(title);
	$("#dialogBoxTextBox").val("");
	$("#dialogBoxTextBox").prop("placeholder", placeholder + ", use a semicolon to separate multiple values");
	$(".blackOverlay").css("visibility", "visible");
	$("#dialogBox").css("visibility", "visible");
	$(".blackOverlay").css("opacity", "0.75");
	$("#dialogBox").css("opacity", "1");
	$("#dialogBoxTextBox").focus();
}

function openConfirmationBox() {
	$(".blackOverlay").css("visibility", "visible");
	$("#confirmationBox").css("visibility", "visible");
	$(".blackOverlay").css("opacity", "0.75");
	$("#confirmationBox").css("opacity", "1");
}

function closeFloatingBox() {
	setTimeout(function() {
		$(".blackOverlay").css("visibility", "hidden");
		$(".floatingBox").css("visibility", "hidden");
	}, 250);
	$(".blackOverlay").css("opacity", "0");
	$(".floatingBox").css("opacity", "0");
}

function updateList(listID, list) {
	var html = "";
	$.each(list, function(index, value) {
		html += "<a class=\"deleteLink\" id=\"removeListItemButton\" data-listid=\"" + listID + "\" data-value=\"" + value + "\">x</a> " + value + "<br/>";
	});
	$("#" + listID).html(html);
}

function loadSettings() {
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
		$("#enableTwitchEmotesCheckbox").prop("checked", settings.enableTwitchEmotes);
		updateList("subscriberEmotesChannels", settings.subscriberEmotesChannels);
		$("#enableOnTwitchCheckbox").prop("checked", settings.enableOnTwitch);
		$("#enableBTTVEmotesCheckbox").prop("checked", settings.enableBTTVEmotes);
		updateList("BTTVChannels", settings.BTTVChannels);
		$("#enableFFZEmotesCheckbox").prop("checked", settings.enableFFZEmotes);
		updateList("FFZChannels", settings.FFZChannels);
		$("#enableEmoteBlacklistCheckbox").prop("checked", settings.enableEmoteBlacklist);
		$("#removeBlacklistedEmotesCheckbox").prop("checked", settings.removeBlacklistedEmotes);
		updateList("emoteBlacklist", settings.emoteBlacklist);
		if (settings.hostnameListType == "whitelist") {
			$("#hostnameListTypeWhitelist").prop("checked", true);
		} else {
			$("#hostnameListTypeBlacklist").prop("checked", true);
		}
		$("#hostnameList").val(settings.hostnameList.join("\n"));
		updateList();
	});
}

function dialogBoxAdd() {
	var input = $("#dialogBoxTextBox").val();
	var inputSplit = input.split(";");
	settings = {};
	settings[listID] = [];
	chrome.storage.sync.get(settings, function(settings) {
		$.each(inputSplit, function(index, input) {
			if (listID != "emoteBlacklist") {
				input = input.toLowerCase();
			}
			if (settings[listID].indexOf(input) == -1) {
				settings[listID].push(input);
			}
		});
		chrome.storage.sync.set(settings, function() {
			updateList(listID, settings[listID]);
		});
	});
	closeFloatingBox();
}

function removeListItem() {
	var listID = $(this).data("listid");
	var value = $(this).data("value");
	settings = {};
	settings[listID] = [];
	chrome.storage.sync.get(settings, function(settings) {
		var index = settings[listID].indexOf(value);
		if (index > -1) {
			settings[listID].splice(index, 1);
		}
		chrome.storage.sync.set(settings, function() {
			updateList(listID, settings[listID]);
		});
	});
}

function displayNotification(text) {
	$(".notification").html(text);
	$(".notification").css("visibility", "visible");
	$(".notification").css("opacity", "1");
	clearTimeout(notificationTimer);
	notificationTimer = setTimeout(dismissNotification, 3000);
}

function dismissNotification() {
	clearTimeout(notificationTimer);
	setTimeout(function() {
		$(".notification").css("visibility", "hidden");
	}, 250);
	$(".notification").css("opacity", "0");
}

function resetSettings() {
	chrome.storage.sync.clear(function() {
		displayNotification("Settings Reset");
	});
	loadSettings();
	closeFloatingBox();
}

function clearCache() {
	chrome.storage.local.set({
		emoteListCache: {}
	}, function() {
		displayNotification("Emote List Cache Cleared");
	});
}
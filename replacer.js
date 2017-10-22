window.document.onload = onLoad();
var blacklistedTags;
var emoteList;

function onLoad() {
	blacklistedTags = ["TITLE", "STYLE", "LINK", "TEMPLATE", "SCRIPT", "IMG"];
	emoteList = {
		"4Head": "https://static-cdn.jtvnw.net/emoticons/v1/354/1.0",
		"ANELE": "https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0",
		"BabyRage": "https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0",
		"BibleThump": "https://static-cdn.jtvnw.net/emoticons/v1/86/1.0",
		"BigBrother": "https://static-cdn.jtvnw.net/emoticons/v1/1904/1.0",
		"Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
		"BlessRNG": "https://static-cdn.jtvnw.net/emoticons/v1/153556/1.0",
		"BrokeBack": "https://static-cdn.jtvnw.net/emoticons/v1/4057/1.0",
		"CoolCat": "https://static-cdn.jtvnw.net/emoticons/v1/58127/1.0",
		"CoolStoryBob": "https://static-cdn.jtvnw.net/emoticons/v1/123171/1.0",
		"cmonBruh": "https://static-cdn.jtvnw.net/emoticons/v1/84608/1.0",
		"CurseLit": "https://static-cdn.jtvnw.net/emoticons/v1/116625/1.0",
		"DansGame": "https://static-cdn.jtvnw.net/emoticons/v1/33/1.0",
		"DatSheffy": "https://static-cdn.jtvnw.net/emoticons/v1/111700/1.0",
		"DendeiFace": "https://static-cdn.jtvnw.net/emoticons/v1/58135/1.0",
		"EleGiggle": "https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0",
		"FailFish": "https://static-cdn.jtvnw.net/emoticons/v1/360/1.0",
		"FrankerZ": "https://static-cdn.jtvnw.net/emoticons/v1/65/1.0",
		"HeyGuys": "https://static-cdn.jtvnw.net/emoticons/v1/30259/1.0",
		"HotPokket": "https://static-cdn.jtvnw.net/emoticons/v1/357/1.0",
		"Jebaited": "https://static-cdn.jtvnw.net/emoticons/v1/114836/1.0",
		"KappaPride": "https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0",
		"Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
		"Keepo": "https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0",
		"KreyGasm": "https://static-cdn.jtvnw.net/emoticons/v1/41/1.0",
		"LUL": "https://static-cdn.jtvnw.net/emoticons/v1/425618/1.0",
		"MingLee": "https://static-cdn.jtvnw.net/emoticons/v1/68856/1.0",
		"MrDestructoid": "https://static-cdn.jtvnw.net/emoticons/v1/28/1.0",
		"NotLikeThis": "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0",
		"OpieOP": "https://static-cdn.jtvnw.net/emoticons/v1/100590/1.0",
		"PJSalt": "https://static-cdn.jtvnw.net/emoticons/v1/36/1.0",
		"PogChamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/1.0",
		"PunchTrees": "https://static-cdn.jtvnw.net/emoticons/v1/47/1.0",
		"ResidentSleeper": "https://static-cdn.jtvnw.net/emoticons/v1/245/1.0",
		"SMOrc": "https://static-cdn.jtvnw.net/emoticons/v1/52/1.0",
		"SSSsss": "https://static-cdn.jtvnw.net/emoticons/v1/46/1.0",
		"SeemsGood": "https://static-cdn.jtvnw.net/emoticons/v1/64138/1.0",
		"SwiftRage": "https://static-cdn.jtvnw.net/emoticons/v1/34/1.0",
		"TTours": "https://static-cdn.jtvnw.net/emoticons/v1/38436/1.0",
		"TriHard": "https://static-cdn.jtvnw.net/emoticons/v1/120232/1.0",
		"VoteNay": "https://static-cdn.jtvnw.net/emoticons/v1/106294/1.0",
		"VoteYea": "https://static-cdn.jtvnw.net/emoticons/v1/106293/1.0",
		"WutFace": "https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0"
	};
	for (var emoteName in emoteList) {
		emoteList[emoteName] = "<img src=\"" + emoteList[emoteName] + "\"\\>";
	}
	startReplaceLoop();
}

function startReplaceLoop() {
	$("body *:not(:has(*)), h1").each(function() {
		replacePhrasesWithEmotes($(this), $(this).prop("tagName"), $(this).html());
	});
}

function replacePhrasesWithEmotes(element, elementTagName, elementContent) {
	if (blacklistedTags.indexOf(elementTagName) < 0) {
		for (var emoteName in emoteList) {
			var emoteImg = emoteList[emoteName];
			var regExp = new RegExp("\\b" + emoteName + "\\b", "gi");
			elementContent = elementContent.replace(regExp, emoteImg);
		}
		element.html(elementContent);
	}
}
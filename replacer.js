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
		"Kappa": "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
		"KappaPride": "https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0",
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
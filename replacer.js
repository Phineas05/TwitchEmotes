window.document.onload = onLoad();
var blacklistedTags;
var emoteList;

function onLoad() {
	blacklistedTags = ["TITLE", "STYLE", "SCRIPT", "LINK", "TEMPLATE"];
	emoteList = {

		// Global Twitch Emotes
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
		"Kreygasm": "https://static-cdn.jtvnw.net/emoticons/v1/41/1.0",
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
		"WutFace": "https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0",

		// BTTV Emotes
		"PedoBear": "https://cdn.betterttv.net/emote/54fa928f01e468494b85b54f/1x",
		"CiGrip": "https://cdn.betterttv.net/emote/54fa8fce01e468494b85b53c/1x",
		"GabeN": "https://cdn.betterttv.net/emote/54fa90ba01e468494b85b543/1x",
		"AngelThump": "https://cdn.betterttv.net/emote/566ca1a365dbbdab32ec055b/1x",
		"D:": "https://cdn.betterttv.net/emote/55028cd2135896936880fdd7/1x",
		"VisLaud": "https://cdn.betterttv.net/emote/550352766f86a5b26c281ba2/1x",
		"KKona": "https://cdn.betterttv.net/emote/566ca04265dbbdab32ec054a/1x",
		"haHAA": "https://cdn.betterttv.net/emote/555981336ba1901877765555/1x",
		"FeelsBirthdayMan": "https://cdn.betterttv.net/emote/55b6524154eefd53777b2580/1x",
		"FeelsBadMan": "https://cdn.betterttv.net/emote/566c9fc265dbbdab32ec053b/1x",
		"BasedGod": "https://cdn.betterttv.net/emote/566c9eeb65dbbdab32ec052b/1x",
		"FeelsGoodMan": "https://cdn.betterttv.net/emote/566c9fde65dbbdab32ec053e/1x",
		"LuL": "https://cdn.betterttv.net/emote/567b00c61ddbe1786688a633/1x",
		"FeelsAmazingMan": "https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/1x",
		"DuckerZ": "https://cdn.betterttv.net/emote/573d38b50ffbf6cc5cc38dc9/1x",
		"PepePls": "https://cdn.betterttv.net/emote/55898e122612142e6aaa935b/1x",
		"gachiGASM": "https://cdn.betterttv.net/emote/55999813f0db38ef6c7c663e/1x",
		"OMEGALUL": "https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x",
		"monkaS": "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x",
		"monkaMEGA": "https://cdn.betterttv.net/emote/58903da0b3b0df756ac3e64e/1x",
		"HAhaa": "https://cdn.betterttv.net/emote/55f47f507f08be9f0a63ce37/1x",
		"ZULUL": "https://cdn.betterttv.net/emote/57b38e53d5472c5343820619/1x",
		"gachiBASS": "https://cdn.betterttv.net/emote/57719a9a6bdecd592c3ad59b/1x",
		"Clap": "https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x",

		// FrankerFaceZ Emotes
		"PagChomp": "https://cdn.frankerfacez.com/emoticon/61496/1",
		"4HEad": "https://cdn.frankerfacez.com/emoticon/165783/1",
		"HYPERBRUH": "https://cdn.frankerfacez.com/emoticon/204717/1",
		"monkaGun": "https://cdn.frankerfacez.com/emoticon/187256/1"

	};
	for (var emoteName in emoteList) {
		emoteList[emoteName] = "<img style=\"max-height: 32px;\"src=\"" + emoteList[emoteName] + "\"\\>";
	}
	startReplaceLoop();
}

function startReplaceLoop() {
	$("body *:not(:has(*))").each(function() {
		replacePhrasesWithEmotes($(this), $(this).prop("tagName"), $(this).html());
	});
}

function replacePhrasesWithEmotes(element, elementTagName, elementContent) {	
	if (blacklistedTags.indexOf(elementTagName) < 0) {
		console.log(elementTagName);
		for (var emoteName in emoteList) {
			var emoteImg = emoteList[emoteName];
			var regExp = new RegExp("\\b" + emoteName + "\\b", "g");
			elementContent = elementContent.replace(regExp, emoteImg);
		}
		element.html(elementContent);
	}
}
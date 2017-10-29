window.document.onload = onLoad();
var host;
var nodeTestRegEx;
var blacklistedTags;
var blacklistedHosts;
var emoteList;

function onLoad() {
	host = window.location.hostname;
	nodeTestRegEx = /\w+?/gi;
	blacklistedTags = ["TITLE", "STYLE", "SCRIPT", "NOSCRIPT", "LINK", "TEMPLATE", "INPUT"];
	blacklistedHosts = [];
	if (blacklistedHosts.indexOf(host) >= 0) {
		return;
	}
	emoteList = {

		// Twitch Emotes
		"4Head": ["https://static-cdn.jtvnw.net/emoticons/v1/354/1.0", "g"],
		"ANELE": ["https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0", "gi"],
		"BabyRage": ["https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0", "gi"],
		"BibleThump": ["https://static-cdn.jtvnw.net/emoticons/v1/86/1.0", "gi"],
		"BigBrother": ["https://static-cdn.jtvnw.net/emoticons/v1/1904/1.0", "gi"],
		"BlessRNG": ["https://static-cdn.jtvnw.net/emoticons/v1/153556/1.0", "gi"],
		"BrokeBack": ["https://static-cdn.jtvnw.net/emoticons/v1/4057/1.0", "gi"],
		"CoolCat": ["https://static-cdn.jtvnw.net/emoticons/v1/58127/1.0", "gi"],
		"CoolStoryBob": ["https://static-cdn.jtvnw.net/emoticons/v1/123171/1.0", "gi"],
		"CurseLit": ["https://static-cdn.jtvnw.net/emoticons/v1/116625/1.0", "gi"],
		"DansGame": ["https://static-cdn.jtvnw.net/emoticons/v1/33/1.0", "gi"],
		"DatSheffy": ["https://static-cdn.jtvnw.net/emoticons/v1/111700/1.0", "gi"],
		"DendeiFace": ["https://static-cdn.jtvnw.net/emoticons/v1/58135/1.0", "gi"],
		"EleGiggle": ["https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0", "gi"],
		"FailFish": ["https://static-cdn.jtvnw.net/emoticons/v1/360/1.0", "gi"],
		"FrankerZ": ["https://static-cdn.jtvnw.net/emoticons/v1/65/1.0", "gi"],
		"HeyGuys": ["https://static-cdn.jtvnw.net/emoticons/v1/30259/1.0", "gi"],
		"HotPokket": ["https://static-cdn.jtvnw.net/emoticons/v1/357/1.0", "gi"],
		"Jebaited": ["https://static-cdn.jtvnw.net/emoticons/v1/114836/1.0", "gi"],
		"Kappa": ["https://static-cdn.jtvnw.net/emoticons/v1/25/1.0", "gi"],
		"KappaPride": ["https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0", "gi"],
		"Keepo": ["https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0", "gi"],
		"Kreygasm": ["https://static-cdn.jtvnw.net/emoticons/v1/41/1.0", "gi"],
		"LUL": ["https://static-cdn.jtvnw.net/emoticons/v1/425618/1.0", "g"],
		"MingLee": ["https://static-cdn.jtvnw.net/emoticons/v1/68856/1.0", "gi"],
		"MrDestructoid": ["https://static-cdn.jtvnw.net/emoticons/v1/28/1.0", "gi"],
		"NotLikeThis": ["https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0", "gi"],
		"OpieOP": ["https://static-cdn.jtvnw.net/emoticons/v1/100590/1.0", "gi"],
		"PJSalt": ["https://static-cdn.jtvnw.net/emoticons/v1/36/1.0", "gi"],
		"PogChamp": ["https://static-cdn.jtvnw.net/emoticons/v1/88/1.0", "gi"],
		"PunchTrees": ["https://static-cdn.jtvnw.net/emoticons/v1/47/1.0", "gi"],
		"ResidentSleeper": ["https://static-cdn.jtvnw.net/emoticons/v1/245/1.0", "gi"],
		"SMOrc": ["https://static-cdn.jtvnw.net/emoticons/v1/52/1.0", "gi"],
		"SSSsss": ["https://static-cdn.jtvnw.net/emoticons/v1/46/1.0", "g"],
		"SeemsGood": ["https://static-cdn.jtvnw.net/emoticons/v1/64138/1.0", "gi"],
		"SwiftRage": ["https://static-cdn.jtvnw.net/emoticons/v1/34/1.0", "gi"],
		"TTours": ["https://static-cdn.jtvnw.net/emoticons/v1/38436/1.0", "gi"],
		"TriHard": ["https://static-cdn.jtvnw.net/emoticons/v1/120232/1.0", "gi"],
		"VoteNay": ["https://static-cdn.jtvnw.net/emoticons/v1/106294/1.0", "gi"],
		"VoteYea": ["https://static-cdn.jtvnw.net/emoticons/v1/106293/1.0", "gi"],
		"WutFace": ["https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0", "gi"],
		"cmonBruh": ["https://static-cdn.jtvnw.net/emoticons/v1/84608/1.0", "gi"],

		// BetterTTV Emotes
		"AngelThump": ["https://cdn.betterttv.net/emote/566ca1a365dbbdab32ec055b/1x", "gi"],
		"BBaper": ["https://cdn.betterttv.net/emote/592bee30e9f5aa0463766a0d/1x", "gi"],
		"BasedGod": ["https://cdn.betterttv.net/emote/566c9eeb65dbbdab32ec052b/1x", "gi"],
		"CiGrip": ["https://cdn.betterttv.net/emote/54fa8fce01e468494b85b53c/1x", "gi"],
		"Clap": ["https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x", "gi"],
		"DankPepe": ["https://cdn.betterttv.net/emote/55c36ec7af1e28271aa4de0a/1x", "gi"],
		"DatBoi": ["https://cdn.betterttv.net/emote/572838c8264e23a134803aba/1x", "gi"],
		"DogePls": ["https://cdn.betterttv.net/emote/55c7eb723d8fd22f20ac9cc1/1x", "gi"],
		"DuckerZ": ["https://cdn.betterttv.net/emote/573d38b50ffbf6cc5cc38dc9/1x", "gi"],
		"EZ": ["https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/1x", "gi"],
		"EatPooPoo": ["https://cdn.betterttv.net/emote/5903ae40981c752327938935/1x", "gi"],
		"FeelsAmazingMan": ["https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/1x", "gi"],
		"FeelsBadMan": ["https://cdn.betterttv.net/emote/566c9fc265dbbdab32ec053b/1x", "gi"],
		"FeelsBirthdayMan": ["https://cdn.betterttv.net/emote/55b6524154eefd53777b2580/1x", "gi"],
		"FeelsGoodMan": ["https://cdn.betterttv.net/emote/566c9fde65dbbdab32ec053e/1x", "gi"],
		"FeelsSadMan": ["https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/1x", "gi"],
		"GabeN": ["https://cdn.betterttv.net/emote/54fa90ba01e468494b85b543/1x", "gi"],
		"HAhaa": ["https://cdn.betterttv.net/emote/55f47f507f08be9f0a63ce37/1x", "g"],
		"HYPERLUL": ["https://cdn.betterttv.net/emote/584b46fb32456b42e62b696b/1x", "gi"],
		"ImTriggered": ["https://cdn.betterttv.net/emote/55b11f64ac9c447a4e565d14/1x", "gi"],
		"KKaper": ["https://cdn.betterttv.net/emote/566d3352fb7103f332d79dbe/1x", "gi"],
		"KKona": ["https://cdn.betterttv.net/emote/566ca04265dbbdab32ec054a/1x", "gi"],
		"KKool": ["https://cdn.betterttv.net/emote/56c2cff2d9ec6bf744247bf1/1x", "gi"],
		"LuL": ["https://cdn.betterttv.net/emote/567b00c61ddbe1786688a633/1x", "g"],
		"MEGALUL": ["https://cdn.betterttv.net/emote/579f9ac281108bf71a550e97/1x", "gi"],
		"OMEGALUL": ["https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x", "gi"],
		"OMEGAZULUL": ["https://cdn.betterttv.net/emote/58ec135757be58152bdfa727/1x", "gi"],
		"PedoBear": ["https://cdn.betterttv.net/emote/54fa928f01e468494b85b54f/1x", "gi"],
		"PepePls": ["https://cdn.betterttv.net/emote/55898e122612142e6aaa935b/1x", "gi"],
		"RareBoi": ["https://cdn.betterttv.net/emote/573cb739b2cf70e76b2bd4e9/1x", "gi"],
		"RareParrot": ["https://cdn.betterttv.net/emote/55a24e1294dd94001ee86b39/1x", "gi"],
		"RareSloth": ["https://cdn.betterttv.net/emote/56841a3e69f91c294d13b072/1x", "gi"],
		"RarestParrot": ["https://cdn.betterttv.net/emote/56a6316731f511db3dde2042/1x", "gi"],
		"Thonk": ["https://cdn.betterttv.net/emote/585231dd58af204561cd6036/1x", "gi"],
		"ULTRALUL": ["https://cdn.betterttv.net/emote/57ae40399b8a4bbb723ee551/1x", "gi"],
		"VisLaud": ["https://cdn.betterttv.net/emote/550352766f86a5b26c281ba2/1x", "gi"],
		"ZULUL": ["https://cdn.betterttv.net/emote/57b38e53d5472c5343820619/1x", "gi"],
		"forsenPls": ["https://cdn.betterttv.net/emote/55e2096ea6fa8b261f81b12a/1x", "gi"],
		"forsenSWA": ["https://cdn.betterttv.net/emote/571647c4793a158658202e2e/1x", "gi"],
		"gachiBASS": ["https://cdn.betterttv.net/emote/57719a9a6bdecd592c3ad59b/1x", "gi"],
		"gachiGASM": ["https://cdn.betterttv.net/emote/55999813f0db38ef6c7c663e/1x", "gi"],
		"haHAA": ["https://cdn.betterttv.net/emote/555981336ba1901877765555/1x", "g"],
		"monkaGun": ["https://cdn.betterttv.net/emote/58f6e05e58f5dd226a16166e/1x", "gi"],
		"monkaMEGA": ["https://cdn.betterttv.net/emote/58903da0b3b0df756ac3e64e/1x", "gi"],
		"monkaOMEGA": ["https://cdn.betterttv.net/emote/5981e21aeaab4f3320e73abe/1x", "gi"],
		"monkaS": ["https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x", "gi"],
		"monkaX": ["https://cdn.betterttv.net/emote/58e5abdaf3ef4c75c9c6f0f9/1x", "gi"],
		"nymnCorn": ["https://cdn.betterttv.net/emote/56cb56f5500cb4cf51e25b90/1x", "gi"],
		"puke": ["https://cdn.betterttv.net/emote/550288fe135896936880fdd4/1x", "gi"],
		"qtpPLS": ["https://cdn.betterttv.net/emote/573b563409562f714ef27c32/1x", "gi"],

		// FrankerFaceZ Emotes
		"4HEad": ["https://cdn.frankerfacez.com/emoticon/165783/1", "g"],
		"BBona": ["https://cdn.frankerfacez.com/emoticon/186727/1", "gi"],
		"EZY": ["https://cdn.frankerfacez.com/emoticon/185890/1", "gi"],
		"FeelsOkayMan": ["https://cdn.frankerfacez.com/emoticon/145947/1", "gi"],
		"FeelsRageMan": ["https://cdn.frankerfacez.com/emoticon/53418/1", "gi"],
		"FeelsWeirdMan": ["https://cdn.frankerfacez.com/emoticon/131597/1", "gi"],
		"HYPERBRUH": ["https://cdn.frankerfacez.com/emoticon/204717/1", "gi"],
		"HandsUp": ["https://cdn.frankerfacez.com/emoticon/168711/1", "gi"],
		"KKomrade": ["https://cdn.frankerfacez.com/emoticon/145916/1", "gi"],
		"KKonaW": ["https://cdn.frankerfacez.com/emoticon/157420/1", "gi"],
		"Kapp": ["https://cdn.frankerfacez.com/emoticon/218860/1", "gi"],
		"LULW": ["https://cdn.frankerfacez.com/emoticon/139407/1", "gi"],
		"PagChomp": ["https://cdn.frankerfacez.com/emoticon/61496/1", "gi"],
		"PepeHands": ["https://cdn.frankerfacez.com/emoticon/188326/1", "gi"],
		"PepeLaugh": ["https://cdn.frankerfacez.com/emoticon/64785/1", "gi"],
		"PepeRIP": ["https://cdn.frankerfacez.com/emoticon/61091/1", "gi"],
		"PepoThink": ["https://cdn.frankerfacez.com/emoticon/174942/1", "gi"],
		"REEeee": ["https://cdn.frankerfacez.com/emoticon/116831/1", "g"],
		"SmugPepe": ["https://cdn.frankerfacez.com/emoticon/12042/1", "gi"],
		"ZULOL": ["https://cdn.frankerfacez.com/emoticon/218588/1", "gi"]

	};
	for (var emoteName in emoteList) {
		emoteList[emoteName][0] = "<img style=\"max-height: 32px;\" title=\"" + emoteName + "\" alt=\"" + emoteName + "\" src=\"" + emoteList[emoteName][0] + "\"\\>";
	}
	startReplaceLoop();
	var mutationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			for (var i = 0; i < mutation.addedNodes.length; ++i) {
				var currentNode = mutation.addedNodes[i];
				$(currentNode).find("*").contents().filter(function() {
					return (this.nodeType == 3 && this.textContent.match(nodeTestRegEx));
				}).each(function() {
					replacePhrasesWithEmotes(this);
				});
			}
		});
	});
	var observerConfig = {attributes: false, childList: true, characterData: true, subtree: true};
	mutationObserver.observe(document.body, observerConfig);
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
		var emoteImg = emoteList[emoteName][0];
		var regExp = new RegExp("\\b" + emoteName + "\\b", emoteList[emoteName][1]);
		elementContent = elementContent.replace(regExp, emoteImg);
	}
	if (element.textContent != elementContent) {
		$(element).replaceWith(elementContent);
		if (host == "www.twitch.tv") {
			if (!$(".more-messages-indicator").is(":visible")) {
				scrollElement = $(".chat-messages").find(".tse-scroll-content");
				$(scrollElement).scrollTop($(scrollElement)[0].scrollHeight + 100);
			}
		} else if (host == "clips.twitch.tv") {
			if (!$(".view-clip__scrollButton").is(":visible")) {
				scrollElement = $(".view-clip__main");
				$(scrollElement).scrollTop($(scrollElement)[0].scrollHeight + 100);
			}
		}
	}
}
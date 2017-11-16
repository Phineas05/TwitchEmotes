window.document.onload = onLoad();
var host;
var nodeTestRegEx;
var blacklistedTags;
var blacklistedHosts;
var emoteList;

function onLoad() {
	host = window.location.hostname;
	nodeTestRegEx = /\w+?/gi;
	blacklistedTags = ["TITLE", "STYLE", "SCRIPT", "NOSCRIPT", "LINK", "TEMPLATE", "INPUT", "IFRAME"];
	blacklistedHosts = [];
	if (blacklistedHosts.indexOf(host) >= 0) {
		return;
	}
	emoteList = {

		// Twitch Emotes
		"4Head": ["https://static-cdn.jtvnw.net/emoticons/v1/354/1.0", "g"],
		"ANELE": ["https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0", "g"],
		"BabyRage": ["https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0", "g"],
		"BibleThump": ["https://static-cdn.jtvnw.net/emoticons/v1/86/1.0", "g"],
		"BigBrother": ["https://static-cdn.jtvnw.net/emoticons/v1/1904/1.0", "g"],
		"BlessRNG": ["https://static-cdn.jtvnw.net/emoticons/v1/153556/1.0", "g"],
		"BrokeBack": ["https://static-cdn.jtvnw.net/emoticons/v1/4057/1.0", "g"],
		"cmonBruh": ["https://static-cdn.jtvnw.net/emoticons/v1/84608/1.0", "g"],
		"CoolCat": ["https://static-cdn.jtvnw.net/emoticons/v1/58127/1.0", "g"],
		"CoolStoryBob": ["https://static-cdn.jtvnw.net/emoticons/v1/123171/1.0", "g"],
		"CurseLit": ["https://static-cdn.jtvnw.net/emoticons/v1/116625/1.0", "g"],
		"DansGame": ["https://static-cdn.jtvnw.net/emoticons/v1/33/1.0", "g"],
		"DatSheffy": ["https://static-cdn.jtvnw.net/emoticons/v1/111700/1.0", "g"],
		"DendeiFace": ["https://static-cdn.jtvnw.net/emoticons/v1/58135/1.0", "g"],
		"EleGiggle": ["https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0", "g"],
		"FailFish": ["https://static-cdn.jtvnw.net/emoticons/v1/360/1.0", "g"],
		"FrankerZ": ["https://static-cdn.jtvnw.net/emoticons/v1/65/1.0", "g"],
		"HeyGuys": ["https://static-cdn.jtvnw.net/emoticons/v1/30259/1.0", "g"],
		"HotPokket": ["https://static-cdn.jtvnw.net/emoticons/v1/357/1.0", "g"],
		"Jebaited": ["https://static-cdn.jtvnw.net/emoticons/v1/114836/1.0", "g"],
		"Kappa": ["https://static-cdn.jtvnw.net/emoticons/v1/25/1.0", "g"],
		"KappaPride": ["https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0", "g"],
		"Keepo": ["https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0", "g"],
		"Kreygasm": ["https://static-cdn.jtvnw.net/emoticons/v1/41/1.0", "g"],
		"LUL": ["https://static-cdn.jtvnw.net/emoticons/v1/425618/1.0", "g"],
		"MingLee": ["https://static-cdn.jtvnw.net/emoticons/v1/68856/1.0", "g"],
		"MrDestructoid": ["https://static-cdn.jtvnw.net/emoticons/v1/28/1.0", "g"],
		"NotLikeThis": ["https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0", "g"],
		"OpieOP": ["https://static-cdn.jtvnw.net/emoticons/v1/100590/1.0", "g"],
		"PJSalt": ["https://static-cdn.jtvnw.net/emoticons/v1/36/1.0", "g"],
		"PogChamp": ["https://static-cdn.jtvnw.net/emoticons/v1/88/1.0", "g"],
		"PunchTrees": ["https://static-cdn.jtvnw.net/emoticons/v1/47/1.0", "g"],
		"ResidentSleeper": ["https://static-cdn.jtvnw.net/emoticons/v1/245/1.0", "g"],
		"SeemsGood": ["https://static-cdn.jtvnw.net/emoticons/v1/64138/1.0", "g"],
		"SMOrc": ["https://static-cdn.jtvnw.net/emoticons/v1/52/1.0", "g"],
		"SSSsss": ["https://static-cdn.jtvnw.net/emoticons/v1/46/1.0", "g"],
		"SwiftRage": ["https://static-cdn.jtvnw.net/emoticons/v1/34/1.0", "g"],
		"TriHard": ["https://static-cdn.jtvnw.net/emoticons/v1/120232/1.0", "g"],
		"TTours": ["https://static-cdn.jtvnw.net/emoticons/v1/38436/1.0", "g"],
		"VoteNay": ["https://static-cdn.jtvnw.net/emoticons/v1/106294/1.0", "g"],
		"VoteYea": ["https://static-cdn.jtvnw.net/emoticons/v1/106293/1.0", "g"],
		"WutFace": ["https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0", "g"],

		// BetterTTV Emotes
		":tf:": ["https://cdn.betterttv.net/emote/54fa8f1401e468494b85b537/1x", "g"],
		"\\(puke\\)": ["https://cdn.betterttv.net/emote/550288fe135896936880fdd4/1x", "g"],
		"AngelThump": ["https://cdn.betterttv.net/emote/566ca1a365dbbdab32ec055b/1x", "g"],
		"BasedGod": ["https://cdn.betterttv.net/emote/566c9eeb65dbbdab32ec052b/1x", "g"],
		"BBaper": ["https://cdn.betterttv.net/emote/592bee30e9f5aa0463766a0d/1x", "g"],
		"bUrself": ["https://cdn.betterttv.net/emote/566c9f3b65dbbdab32ec052e/1x", "g"],
		"CiGrip": ["https://cdn.betterttv.net/emote/54fa8fce01e468494b85b53c/1x", "g"],
		"Clap": ["https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/1x", "g"],
		"D:": ["https://cdn.betterttv.net/emote/55028cd2135896936880fdd7/1x", "g"],
		"DankPepe": ["https://cdn.betterttv.net/emote/55c36ec7af1e28271aa4de0a/1x", "g"],
		"DatBoi": ["https://cdn.betterttv.net/emote/572838c8264e23a134803aba/1x", "g"],
		"DogePls": ["https://cdn.betterttv.net/emote/55c7eb723d8fd22f20ac9cc1/1x", "g"],
		"DuckerZ": ["https://cdn.betterttv.net/emote/573d38b50ffbf6cc5cc38dc9/1x", "g"],
		"EatPooPoo": ["https://cdn.betterttv.net/emote/5903ae40981c752327938935/1x", "g"],
		"EZ": ["https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/1x", "g"],
		"FeelsAmazingMan": ["https://cdn.betterttv.net/emote/5733ff12e72c3c0814233e20/1x", "g"],
		"FeelsBadMan": ["https://cdn.betterttv.net/emote/566c9fc265dbbdab32ec053b/1x", "g"],
		"FeelsBirthdayMan": ["https://cdn.betterttv.net/emote/55b6524154eefd53777b2580/1x", "g"],
		"FeelsGoodMan": ["https://cdn.betterttv.net/emote/566c9fde65dbbdab32ec053e/1x", "g"],
		"FeelsSadMan": ["https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/1x", "g"],
		"FireSpeed": ["https://cdn.betterttv.net/emote/566c9ff365dbbdab32ec0541/1x", "g"],
		"FishMoley": ["https://cdn.betterttv.net/emote/566ca00f65dbbdab32ec0544/1x", "g"],
		"forsenPls": ["https://cdn.betterttv.net/emote/55e2096ea6fa8b261f81b12a/1x", "g"],
		"forsenSWA": ["https://cdn.betterttv.net/emote/571647c4793a158658202e2e/1x", "g"],
		"GabeN": ["https://cdn.betterttv.net/emote/54fa90ba01e468494b85b543/1x", "g"],
		"gachiBASS": ["https://cdn.betterttv.net/emote/57719a9a6bdecd592c3ad59b/1x", "g"],
		"gachiGASM": ["https://cdn.betterttv.net/emote/55999813f0db38ef6c7c663e/1x", "g"],
		"haHAA": ["https://cdn.betterttv.net/emote/555981336ba1901877765555/1x", "g"],
		"HAhaa": ["https://cdn.betterttv.net/emote/55f47f507f08be9f0a63ce37/1x", "g"],
		"HYPERLUL": ["https://cdn.betterttv.net/emote/584b46fb32456b42e62b696b/1x", "g"],
		"ImTriggered": ["https://cdn.betterttv.net/emote/55b11f64ac9c447a4e565d14/1x", "g"],
		"KKaper": ["https://cdn.betterttv.net/emote/566d3352fb7103f332d79dbe/1x", "g"],
		"KKona": ["https://cdn.betterttv.net/emote/566ca04265dbbdab32ec054a/1x", "g"],
		"KKool": ["https://cdn.betterttv.net/emote/56c2cff2d9ec6bf744247bf1/1x", "g"],
		"LuL": ["https://cdn.betterttv.net/emote/567b00c61ddbe1786688a633/1x", "g"],
		"MEGALUL": ["https://cdn.betterttv.net/emote/579f9ac281108bf71a550e97/1x", "g"],
		"monkaGun": ["https://cdn.betterttv.net/emote/58f6e05e58f5dd226a16166e/1x", "g"],
		"monkaMEGA": ["https://cdn.betterttv.net/emote/58903da0b3b0df756ac3e64e/1x", "g"],
		"monkaOMEGA": ["https://cdn.betterttv.net/emote/5981e21aeaab4f3320e73abe/1x", "g"],
		"monkaS": ["https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/1x", "g"],
		"monkaX": ["https://cdn.betterttv.net/emote/58e5abdaf3ef4c75c9c6f0f9/1x", "g"],
		"NaM": ["https://cdn.betterttv.net/emote/566ca06065dbbdab32ec054e/1x", "g"],
		"nymnCorn": ["https://cdn.betterttv.net/emote/56cb56f5500cb4cf51e25b90/1x", "g"],
		"OMEGALUL": ["https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x", "g"],
		"OMEGAZULUL": ["https://cdn.betterttv.net/emote/58ec135757be58152bdfa727/1x", "g"],
		"PedoBear": ["https://cdn.betterttv.net/emote/54fa928f01e468494b85b54f/1x", "g"],
		"PepePls": ["https://cdn.betterttv.net/emote/55898e122612142e6aaa935b/1x", "g"],
		"POGGERS": ["https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/1x", "g"],
		"qtpDANCE": ["https://cdn.betterttv.net/emote/57bf2bae78f652626cfe8e15/1x", "g"],
		"qtpPLS": ["https://cdn.betterttv.net/emote/573b563409562f714ef27c32/1x", "g"],
		"qtpPLZ": ["https://cdn.betterttv.net/emote/57db2af85b4ab31b205373a1/1x", "g"],
		"RareBoi": ["https://cdn.betterttv.net/emote/573cb739b2cf70e76b2bd4e9/1x", "g"],
		"RareParrot": ["https://cdn.betterttv.net/emote/55a24e1294dd94001ee86b39/1x", "g"],
		"RareSloth": ["https://cdn.betterttv.net/emote/56841a3e69f91c294d13b072/1x", "g"],
		"RarestParrot": ["https://cdn.betterttv.net/emote/56a6316731f511db3dde2042/1x", "g"],
		"SourPls": ["https://cdn.betterttv.net/emote/566ca38765dbbdab32ec0560/1x", "g"],
		"TaxiBro": ["https://cdn.betterttv.net/emote/54fbefeb01abde735115de5b/1x", "g"],
		"Thonk": ["https://cdn.betterttv.net/emote/585231dd58af204561cd6036/1x", "g"],
		"ULTRALUL": ["https://cdn.betterttv.net/emote/57ae40399b8a4bbb723ee551/1x", "g"],
		"VapeNation": ["https://cdn.betterttv.net/emote/56f5be00d48006ba34f530a4/1x", "g"],
		"VisLaud": ["https://cdn.betterttv.net/emote/550352766f86a5b26c281ba2/1x", "g"],
		"Wowee": ["https://cdn.betterttv.net/emote/58d2e73058d8950a875ad027/1x", "g"],
		"ZULUL": ["https://cdn.betterttv.net/emote/57b38e53d5472c5343820619/1x", "g"],

		// FrankerFaceZ Emotes
		"4HEad": ["https://cdn.frankerfacez.com/emoticon/165783/1", "g"],
		"BBona": ["https://cdn.frankerfacez.com/emoticon/186727/1", "g"],
		"eShrug": ["https://cdn.frankerfacez.com/emoticon/107715/1", "g"],
		"EZY": ["https://cdn.frankerfacez.com/emoticon/185890/1", "g"],
		"FeelsDankMan": ["https://cdn.frankerfacez.com/emoticon/167677/1", "g"],
		"FeelsOkayMan": ["https://cdn.frankerfacez.com/emoticon/145947/1", "g"],
		"FeelsRageMan": ["https://cdn.frankerfacez.com/emoticon/53418/1", "g"],
		"FeelsWeirdMan": ["https://cdn.frankerfacez.com/emoticon/131597/1", "g"],
		"HandsUp": ["https://cdn.frankerfacez.com/emoticon/168711/1", "g"],
		"HONEYDETECTED": ["https://cdn.frankerfacez.com/emoticon/211702/1", "g"],
		"HYPERBRUH": ["https://cdn.frankerfacez.com/emoticon/204717/1", "g"],
		"Kapp": ["https://cdn.frankerfacez.com/emoticon/218860/1", "g"],
		"KKomrade": ["https://cdn.frankerfacez.com/emoticon/145916/1", "g"],
		"KKonaW": ["https://cdn.frankerfacez.com/emoticon/157420/1", "g"],
		"LULW": ["https://cdn.frankerfacez.com/emoticon/139407/1", "g"],
		"PagChomp": ["https://cdn.frankerfacez.com/emoticon/61496/1", "g"],
		"PepeHands": ["https://cdn.frankerfacez.com/emoticon/188326/1", "g"],
		"pepeL": ["https://cdn.frankerfacez.com/emoticon/200804/1", "g"],
		"PepeLaugh": ["https://cdn.frankerfacez.com/emoticon/64785/1", "g"],
		"PepeRIP": ["https://cdn.frankerfacez.com/emoticon/61091/1", "g"],
		"PepoThink": ["https://cdn.frankerfacez.com/emoticon/174942/1", "g"],
		"Pog": ["https://cdn.frankerfacez.com/emoticon/210748/1", "g"],
		"REEeee": ["https://cdn.frankerfacez.com/emoticon/116831/1", "g"],
		"SmugPepe": ["https://cdn.frankerfacez.com/emoticon/12042/1", "g"],
		"SunWithFaceClap": ["https://cdn.frankerfacez.com/emoticon/219659/1", "g"],
		"TriEasy": ["https://cdn.frankerfacez.com/emoticon/25122/1", "g"],
		"ZULOL": ["https://cdn.frankerfacez.com/emoticon/218588/1", "g"],

		// Unicode Emotes
		":dagger:": ["https://emojipedia-us.s3.amazonaws.com/thumbs/60/twitter/103/dagger-knife_1f5e1.png", "g", "20"],
		":gun:": ["https://emojipedia-us.s3.amazonaws.com/thumbs/60/twitter/103/pistol_1f52b.png", "g", "20"],
		":rage:": ["https://emojipedia-us.s3.amazonaws.com/thumbs/60/twitter/103/pouting-face_1f621.png", "g", "20"],
		":shield:": ["https://emojipedia-us.s3.amazonaws.com/thumbs/60/twitter/103/shield_1f6e1.png", "g", "20"],
		":sun_with_face:": ["https://emojipedia-us.s3.amazonaws.com/thumbs/60/twitter/103/sun-with-face_1f31e.png", "g", "20"],
		":thinking:": ["https://emojipedia-us.s3.amazonaws.com/thumbs/60/apple/114/thinking-face_1f914.png", "g", "20"]

	};
	for (var emoteName in emoteList) {
		var displayName = emoteName.replace(/\\/g, "");
		var emoteRegex = "(?<=\\s|^)" + emoteName + "(?=\\s|$)";
		var height = "32";
		if (emoteList[emoteName].length > 2) {
			height = emoteList[emoteName][2];
		}
		emoteList[emoteName][0] = "<img style=\"max-height: " + height + "px;\" title=\"" + displayName + "\" alt=\"" + displayName + "\" src=\"" + emoteList[emoteName][0] + "\"\\>";
		emoteList[emoteName][1] = new RegExp(emoteRegex, emoteList[emoteName][1]);
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
			if (!$(".view-clip__scrollButton").is(":visible")) {
				scrollElements.push($(".view-clip__main"));
			}
		}
		for (var i = 0; i < scrollElements.length; i++) {
			if (scrollElements[i].length > 0) {
				$(scrollElements[i]).scrollTop(scrollElements[i][0].scrollHeight + 100);
			}
		}
	}
}
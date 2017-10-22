window.document.onload = onLoad();
var blacklistedTags;
var emoteList;

function onLoad() {
	blacklistedTags = ["TITLE", "STYLE", "SCRIPT", "IMG"];
	emoteList = {
		"kappa": "<img src=\"https://static-cdn.jtvnw.net/emoticons/v1/25/1.0\"\\>"
	};
	$("*:not(:has(*))").each(function() {
		replacePhrasesWithEmotes($(this), $(this).prop("tagName"), $(this).html());
	});
}

function replacePhrasesWithEmotes(element, elementTagName, elementContent) {
	if (blacklistedTags.indexOf(elementTagName) < 0) {
		for (var oldText1 in emoteList) {
			var oldText2 = oldText1.charAt(0).toUpperCase() + oldText1.slice(1);
			var oldText3 = oldText1.toUpperCase();
			var newText1 = emoteList[oldText1];
			var newText2 = newText1.charAt(0).toUpperCase() + newText1.slice(1);
			var newText3 = newText1.toUpperCase();
			var regExp1 = new RegExp("\\b" + oldText1 + "\\b", "g");
			var regExp2 = new RegExp("\\b" + oldText2 + "\\b", "g");
			var regExp3 = new RegExp("\\b" + oldText3 + "\\b", "g");
			console.log(elementContent.match(regExp1));
			console.log(elementContent.match(regExp2));
			console.log(elementContent.match(regExp3));
			elementContent = elementContent.replace(regExp1, newText1);
			elementContent = elementContent.replace(regExp2, newText2);
			elementContent = elementContent.replace(regExp3, newText3);			
		}
		element.html(elementContent);
	}
}
window.document.onload = onLoad();
var blacklistedTags;
var emoteList;

function onLoad() {
	blacklistedTags = ["TITLE", "STYLE", "SCRIPT"];
	emoteList = {
		"Kappa": "KappaTest"
	};
	$("*:not(:has(*)), p, tr").each(function() {
		replacePhrasesWithEmotes($(this), $(this).prop("tagName"), $(this).html());
	});
}

function replacePhrasesWithEmotes(element, elementTagName, elementContent) {
	if (blacklistedTags.indexOf(elementTagName) < 0) {
		for (var oldWord1 in wordList) {
			var oldWord2 = oldWord1.charAt(0).toUpperCase() + oldWord1.slice(1);
			var oldWord3 = oldWord1.toUpperCase();
			var newWord1 = wordList[oldWord1];
			var newWord2 = newWord1.charAt(0).toUpperCase() + newWord1.slice(1);
			var newWord3 = newWord1.toUpperCase();
			var regExp1 = new RegExp(oldWord1, "g");
			var regExp2 = new RegExp(oldWord2, "g");
			var regExp3 = new RegExp(oldWord3, "g");			
			elementContent = elementContent.replace(regExp1, newWord1);
			elementContent = elementContent.replace(regExp2, newWord2);
			elementContent = elementContent.replace(regExp3, newWord3);			
		}
		element.html(elementContent);
	}
}
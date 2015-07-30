function getExtractedImages(isSymbol_vals, imageId, catIndex_vals) {
	
	var images = [];
	
	var rootOrigin = '/images/' + imageId + '/extracted/';
	for (var i = 1; i <= isSymbol_vals.length; i++) {
		if (isSymbol_vals[i - 1] == true) {
			categoryIndexes.push(catIndex_vals[i - 1])
			var origin = document.createElement('img');

			origin.setAttribute('src', rootOrigin + i + '.jpg');
			origin.setAttribute('id', 'origin');
			origin.className = 'pictures';

			images.push(origin);

		}

	}

	console.log(images);
	if (images.length > 0) {
		imageIterator = createIteratorFor(images);
		addImage(imageIterator.current());
		//_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndexes[imageIterator.currentIndex()]))
	}

}

function onNextClick(event) {
	removeImage(imageIterator.current());
	addImage(imageIterator.next());
	_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndexes[imageIterator.currentIndex()]))
};

function onPreviousClick(event) {
	removeImage(imageIterator.current());
	addImage(imageIterator.previous());
	_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndexes[imageIterator.currentIndex()]))
};

function removeImage(imageElem) {
	var originalPictureDiv = document.getElementById('originalPicture');
	var selectedPictureDiv = document.getElementById('selectedPicture');

	var selected = document.getElementById('selected');
	var placeholder = document.getElementById('placeholder');

	selectedPictureDiv.removeChild(placeholder);
	selectedPictureDiv.removeChild(selected);
	originalPictureDiv.removeChild(imageElem);
}
function addImage(imageElem) {
	var originalPictureDiv = document.getElementById('originalPicture');
	var selectedPictureDiv = document.getElementById('selectedPicture');
	var selected = document.createElement('img');
	var placeholder = document.createElement('img');
	var origin = imageIterator.current();
	var tabs = '';

	originalPictureDiv.appendChild(origin);

	placeholder.setAttribute('src', symbols.root + '/universal/universal.jpg');
	placeholder.setAttribute('id', 'placeholder');
	placeholder.className = 'pictures';

	selectedPictureDiv.appendChild(placeholder);

	selected.className = 'pictures';
	selected.setAttribute('id', 'selected');
	selected.style.display = 'none';
	selectedPictureDiv.appendChild(selected);

}

function _replacePlaceholder(event) {
	var placeholderImg = document.getElementById('placeholder');
	var selectedImg = document.getElementById('selected');

	selectedImg.setAttribute('src', event.target.src);
	selectedImg.style.display = '';
	placeholderImg.style.display = 'none';

}

function _getCategoryFromIndex(index) {
	var categories = [ 'empty', 'sonstige', 'fuehrung', 'feuerwehr', 'thw' ];
	return categories[index];
}

function getExtractedImages(isSymbol_vals, imageId, catIndex_vals) {
	var images = [];
	var selectedPictureDiv = document.getElementById('selectedPicture');
	var placeholder = document.createElement('img');
	
	placeholder.setAttribute('src', symbols.root + '/universal/universal.jpg');
	placeholder.setAttribute('id', 'placeholder');
	placeholder.className = 'pictures';

	selectedPictureDiv.appendChild(placeholder);

	var rootOrigin = '/images/' + imageId + '/extracted/';
	for (var i = 1; i <= isSymbol_vals.length; i++) {
		if (isSymbol_vals[i - 1] == true) {
			var origin = document.createElement('img');

			origin.setAttribute('src', rootOrigin + i + '.jpg');
			origin.setAttribute('id', 'origin');
			origin.className = 'pictures';

			categoryIndexes.push(catIndex_vals[i - 1])
			images.push(origin);
			indexArray.push(i - 1);
		}

	}

	if (images.length > 0) {
		imageIterator = createIteratorFor(images);
		addImage(imageIterator.current());
		_updateCounter();
	}

}

function onNextClick(event) {

	var selected = document.getElementById('selected');
	if (selected.hasAttribute('src')) {
		var image = selected.cloneNode();
		resultImages[imageIterator.getCurrentIndex()] = image;
		removeTitleAndDescription(imageIterator.getCurrentIndex());
	}
	removeImage(imageIterator.current());
	addImage(imageIterator.next());
	_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndexes[imageIterator
			.getCurrentIndex()]));
	_updateCounter();
};

function onPreviousClick(event) {

	var selected = document.getElementById('selected');

	if (selected.hasAttribute('src')) {
		var image = selected.cloneNode();
		resultImages[imageIterator.getCurrentIndex()] = image;
		removeTitleAndDescription(imageIterator.getCurrentIndex());
	}

	removeImage(imageIterator.current());

	addImage(imageIterator.previous());

	_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndexes[imageIterator
			.getCurrentIndex()]));
	_updateCounter();

};

function removeImage(imageElem) {
	var originalPictureDiv = document.getElementById('originalPicture');
	var selectedPictureDiv = document.getElementById('selectedPicture');
	var selected = document.getElementById('selected');

	selectedPictureDiv.removeChild(selected);
	originalPictureDiv.removeChild(imageElem);
}

function addImage(imageElem) {
	var originalPictureDiv = document.getElementById('originalPicture');
	var selectedPictureDiv = document.getElementById('selectedPicture');
	var placeholder = document.getElementById('placeholder');
	var selected;
	var origin = imageIterator.current();
	var tabs = '';

	originalPictureDiv.appendChild(origin);

	if (resultImages[imageIterator.getCurrentIndex()]) {

		placeholder.style.display = 'none';
		selected = resultImages[imageIterator.getCurrentIndex()];
		selected.style.display = '';
		selectedPictureDiv.appendChild(selected);
		addTitleAndDescription(imageIterator.getCurrentIndex());
	} else {
		placeholder.style.display = '';
		selected = document.createElement('img');
		selected.className = 'pictures';
		selected.setAttribute('id', 'selected');
		selected.style.display = 'none';
		selectedPictureDiv.appendChild(selected);

		selected.onload = function() {
			addTitleAndDescription(imageIterator.getCurrentIndex());
		}
	}
}

function addTitleAndDescription(index) {
	var selected = document.getElementById('selected');
	var parent = selected.parentElement;

	if (resultDescription[index]) {
		parent.appendChild(resultTitle[index]);
		parent.appendChild(resultDescription[index]);
	} else {
		var title = document.createElement('input');
		var description = document.createElement('input');
		title.setAttribute('type', 'text');
		title.setAttribute('id', 'title_' + index);
		title.className = 'titleDescr top';
		title.placeholder = 'Titel einfügen';
		title.style.height = selected.width * 0.17 + 'px';

		description.setAttribute('type', 'text');
		description.setAttribute('id', 'descr_' + index);
		description.className = 'titleDescr bottom';
		description.placeholder = 'Beschriftung einfügen';
		description.style.height = selected.width * 0.17 + 'px';

		parent.appendChild(title);
		parent.appendChild(description);

		resultTitle[index] = title;
		resultDescription[index] = description;
	}

}

function removeTitleAndDescription(index) {
	var title = document.getElementById('title_' + index);
	var description = document.getElementById('descr_' + index);
	var parent = description.parentElement;
	parent.removeChild(title);
	parent.removeChild(description);
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

function _updateCounter() {
	var index = imageIterator.getCurrentIndex()+1;
	var counter = document.getElementById('counter');
	var indexStr = '' + index;
	if (index < 10) {
		indexStr = 0 + indexStr;
	}
	counter.innerText = indexStr + ' / ' + imageIterator.length();
	
}

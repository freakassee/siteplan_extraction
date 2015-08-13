function getExtractedImages(isSymbol_vals, imageId, catIndex_vals) {
	var original_sources = [];
	var rootOrigin = '/images/' + imageId + '/extracted/';
	var isFirst = true;
	_createTitleAndDescr(_createOriginAndSelected());
	selected.src = symbols.root + '/universal/universal.jpg';

	for (var i = 1; i <= isSymbol_vals.length; i++) {
		if (isSymbol_vals[i - 1] == true) {

			if (isFirst) {
				origin.src = rootOrigin + i + '.jpg';
				isFirst = false;
			}

			categoryIndices.push(catIndex_vals[i - 1])
			original_sources.push(rootOrigin + i + '.jpg');
			indexArray.push(i - 1);
		}
	}

	imageIterator = createIteratorFor(original_sources);

	_updateCounter();

}

function getExtractedImagesAdvanced(catIndex_vals) {

	var index = imageIterator.getCurrentIndex();
	_createTitleAndDescr(_createOriginAndSelected());

	for (var i = 0; i < indexArray.length; i++) {
		categoryIndices.push(catIndex_vals[indexArray[i]]);

	}

	if (!resultSources[index]) {
		selected.src = symbols.root + '/universal/universal.jpg';
	} else {
		selected.src = resultSources[index];
	}

	origin.src = imageIterator.current();

}

function _createOriginAndSelected() {

	var selected = document.createElement('img');
	var origin = document.createElement('img');

	selected.id = 'selected';
	selected.className = 'pictures';

	origin.id = 'origin';
	origin.className = 'pictures';

	originalPicture.appendChild(origin);

	selectedPicture.appendChild(selected);

	origin.onload = function() {
		changeTitleAndDescription();
	}
	selected.onload = function() {

		if (selected.src.indexOf('universal') == -1) {
			title.hidden = false;
			description.hidden = false;
		}
	}
	
}

function _createTitleAndDescr() {
	var title = document.createElement('input');
	var description = document.createElement('input');

	title.type = 'text';
	title.id = 'title';
	title.className = 'titleDescr top';
	title.placeholder = 'Titel einfügen';
	title.style.height = selected.width * 0.17 + 'px';
	title.hidden = true;

	description.type = 'text';
	description.id = 'description';
	description.className = 'titleDescr bottom';
	description.placeholder = 'Beschriftung einfügen';
	description.style.height = selected.width * 0.17 + 'px';
	description.hidden = true;

	selectedPicture.appendChild(title);
	selectedPicture.appendChild(description);

}

function onNextClick(event) {

	_storeImageSource();
	imageIterator.next()
	changeImage();
	_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndices[imageIterator.getCurrentIndex()]));
	_updateCounter();

}

function onPreviousClick(event) {

	_storeImageSource();
	imageIterator.previous()
	changeImage();
	_onlyShowSelectedTab(_getCategoryFromIndex(categoryIndices[imageIterator.getCurrentIndex()]));
	_updateCounter();

}

function changeImage() {
	origin.src = imageIterator.current();

	if (resultSources[imageIterator.getCurrentIndex()]) {
		selected.src = resultSources[imageIterator.getCurrentIndex()];
	} else {
		selected.src = symbols.root + '/universal/universal.jpg';
	}

}

function changeTitleAndDescription() {
	var index = imageIterator.getCurrentIndex();

	if (resultTitles[index]) {
		title.value = resultTitles[index];
	} else {
		resultTitles[index] = title.value;
	}

	if (resultDescriptions[index]) {
		description.value = resultDescriptions[index];
	} else {
		resultDescriptions[index] = description.value;
	}

}

function _storeImageSource() {

	if (selected.src.indexOf('universal') == -1) {
		resultSources[imageIterator.getCurrentIndex()] = selected.src;
		resultTitles[imageIterator.getCurrentIndex()] = '' + imageIterator.getCurrentIndex();
		title.hidden = true;
		title.value = '';
		resultDescriptions[imageIterator.getCurrentIndex()] = '' + imageIterator.getCurrentIndex();
		description.hidden = true;
		description.value = '';

	}

}

function _showSelectedImage(event) {

	selected.src = event.target.src;

}

function _getCategoryFromIndex(index) {

	var categories = [ 'empty', 'sonstige', 'fuehrung', 'feuerwehr', 'thw' ];

	return categories[index];

}

function _updateCounter() {

	var index = imageIterator.getCurrentIndex() + 1;
	var counter = document.getElementById('counter');
	var indexStr = '' + index;

	if (index < 10) {
		indexStr = 0 + indexStr;
	}

	counter.innerText = indexStr + ' / ' + imageIterator.length();

}

function _proceedToCompare() {

	_storeImageSource();

	var sources = [];
	var titles = [];
	var descriptions = [];
	var origin_sources = [];

	for (var i = 0; i < indexArray.length; i++) {

		var title = '';
		var descr = '';

		if (resultSources[i]) {
			sources.push('\'' + resultSources[i] + '\'');

			if (resultTitles[i]) {
				title = resultTitles[i];
			}

			if (resultDescriptions[i]) {
				descr = resultDescriptions[i];
			}

		} else {
			sources.push('\'\'');
		}

		titles.push('\'' + title + '\'');
		descriptions.push('\'' + descr + '\'');

		origin_sources.push('\'' + imageIterator.get(i) + '\'');
		origin_sources[i] = origin_sources[i].replace(window.location.origin, "");

		sources[i] = sources[i].replace(window.location.origin, "");

	}

	var params = {
		img_sources : sources,
		org_sources : origin_sources,
		titles : titles,
		descriptions : descriptions,
		positions : indexArray,
		img_id : imageId
	};

	createHiddenFormAndSubmit('/compare', imageId, params);
}
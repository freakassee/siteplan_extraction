function createList() {
	var tabList = document.getElementById('tabList');
	var imgList = document.getElementById('imgList');

	for (var i = 0; i < symbols.categories.length; i++) {
		var category = symbols.categories[i];
		var cat_Id = category.id;
		var path = symbols.root + cat_Id + '/';
		var subdex = 0;
		var tabElem = document.createElement('li');
		var link = document.createElement('a');

		link.setAttribute('href', cat_Id);
		link.setAttribute('id', cat_Id);
		link.innerHTML = category.title;

		tabElem.appendChild(link);
		tabList.appendChild(tabElem);

		for (var j = 0; j < category.images.length; j++) {
			var image = category.images[j];
			var file = category.prefix + image.name + symbols.extension;
			var tags = image.additionalTags;
			var listElement = document.createElement('li');
			var imgElem = document.createElement('img');
			var filterElem = document.createElement('filter');
			var tagsElem = document.createElement('tags');

			listElement.className = 'listElem';

			imgElem.setAttribute('src', path + file);
			imgElem.setAttribute('class', 'img');
			imgElem.setAttribute('id', cat_Id + '_' + j);

			filterElem.innerHTML = cat_Id;

			tagsElem.hidden = true;

			tags.unshift(image.name);

			for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
				var concatStr = tags[tagIndex] + ';';
				tagsElem.innerHTML = tagsElem.innerHTML.concat(concatStr);
			}

			listElement.appendChild(imgElem);
			listElement.appendChild(tagsElem);
			listElement.appendChild(filterElem);

			imgList.appendChild(listElement);

			imgElem.onclick = function(event) {
				_showSelectedImage(event);
			}

			imgElem.ondblclick = function(event) {
				
				onNextClick(event);

			}

		}

		tabElem.onclick = function(event) {
			var input = document.getElementById('inputSearch');

			if (!input.value == '') {
				checkbox.checked = true;
			}
			event.preventDefault();
			_onlyShowSelectedTab(event.target.id)
		}

	}
	_onlyShowSelectedTab('feuerwehr');
}

function createRightContainerContent() {

	var HTMLStr = 'Suche nur in Kategorie: <b>'
	var search = document.getElementById('searchContainer');
	var form = document.createElement('form');
	var searchBoxDiv = document.createElement('div');
	var surrounding = document.createElement('div');
	var input = document.createElement('input');
	var checkbox = document.createElement('input');
	var labelFor = document.createElement('label');
	var activeTab = document.getElementsByClassName('active')

	input.setAttribute('type', 'search');
	input.setAttribute('id', 'inputSearch');
	input.className = 'clearable';

	searchBoxDiv.setAttribute('class', 'searchBoxDiv');
	searchBoxDiv.appendChild(input);

	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'checkbox');
	checkbox.setAttribute('value', 'false');

	labelFor.setAttribute('for', 'checkbox');
	labelFor.setAttribute('id', 'checkboxLabel')

	surrounding.setAttribute('class', 'surrounding');
	surrounding.appendChild(checkbox);
	surrounding.appendChild(labelFor);

	search.appendChild(searchBoxDiv);
	search.appendChild(surrounding);

	input.onsearch = function() {
		// var float_ts = new Date().getTime();
		_search();
		// console.log('Zeit: '+ ((new Date().getTime() - float_ts)/1000) + '
		// Sek.');
	};

	input.ondblclick = function(event) {
		this.select();
	}

	input.onkeyup = function() {
		_search();
	}
	checkbox.onclick = function() {
		_search();
	}

}

function _search() {
	var input = document.getElementById('inputSearch');
	var searchWord = input.value.toLowerCase();
	var checkbox = document.getElementById('checkbox');
	var imgList = document.getElementById('imgList');

	var activeTab = document.getElementsByClassName('active')[0];
	var activeTab_val = activeTab.children[0].getAttribute('href');
	var tags = document.getElementsByTagName('tags');

	for (var i = 0; i < imgList.children.length; i++) {
		var listElem = imgList.children[i];
		var tag = tags[i];
		var tagText = tag.innerHTML.toLowerCase();
		var filter = listElem.getElementsByTagName('filter')[0].innerHTML;
		listElem.style.display = 'none';
		;
		if (!checkbox.checked) {
			if (searchWord == '') {
				_onlyShowSelectedTab(activeTab_val);
				break;
			} else {
				if (tagText.indexOf(searchWord) > -1) {
					listElem.style.display = '';
				}
			}
		} else {
			if (activeTab_val == filter) {
				if (tagText.indexOf(searchWord) > -1) {
					listElem.style.display = '';
				}
			}

		}
	}
}

function _onlyShowSelectedTab(clickedTab) {
	var target = document.getElementById(clickedTab);
	var HTMLStr = 'Suche nur in Kategorie: <b>'
	var labelFor = document.getElementById('checkboxLabel');
	var targetText = target.innerHTML;

	var selectedElements = document.getElementsByTagName('filter');

	var prevSelectedTab = document.getElementsByClassName('active')[0];
	if (prevSelectedTab) {
		prevSelectedTab.className = '';
	}

	target.parentElement.className = 'active';
	labelFor.innerHTML = HTMLStr + ' <b>' + targetText + '</b>';

	for (var i = 0; i < imgList.children.length; i++) {
		imgList.children[i].style.display = 'none';
		selectedElem = selectedElements[i];
		if (selectedElem.innerHTML == clickedTab) {
			selectedElem.parentElement.style.display = '';
		}
	}

	if (checkbox.checked) {
		_search();
	}

}

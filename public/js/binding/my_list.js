function createList() {
	var tabList = document.getElementById('tabList');

	for (var i = 0; i < symbols.categories.length; i++) {
		var category = symbols.categories[i];
		var cat_Id = category.id;
		var path = symbols.root + cat_Id + '/';
		var subdex = 0;
		var tabElem = document.createElement('li');
		var link = document.createElement('a');
		var imgArea = document.createElement('div');

		link.setAttribute('href', cat_Id);
		link.innerText = category.title;

		if (i == 0) {
			tabElem.className = 'active';

		} else {
			tabElem.className = '';
		}

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

			filterElem.innerText = cat_Id;

			tagsElem.hidden = true;

			tags.unshift(image.name);

			for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
				var concatStr = tags[tagIndex] + ';';
				tagsElem.innerText = tagsElem.innerText.concat(concatStr);
			}

			listElement.appendChild(imgElem);
			listElement.appendChild(tagsElem);
			listElement.appendChild(filterElem);

			imgList.appendChild(listElement);

		}

	}

}

function createRightContainerContent(callback) {

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
		input.onsearch();
	}
	
	searchBoxDiv.setAttribute('class', 'searchBoxDiv');
	searchBoxDiv.appendChild(input);

	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'checkbox');
	checkbox.setAttribute('value', 'false');
	checkbox.onclick = function() {
		input.onsearch();
	}

	labelFor.setAttribute('for', 'checkbox');
	labelFor.setAttribute('id', 'checkboxLabel')
	labelFor.innerHTML = HTMLStr + ' <b>' + activeTab[0].innerText + '</b>';

	surrounding.setAttribute('class', 'surrounding');
	surrounding.appendChild(checkbox);
	surrounding.appendChild(labelFor);

	search.appendChild(searchBoxDiv);
	search.appendChild(surrounding);

	
}

function _search() {
	var input = document.getElementById('inputSearch');
	var filterWord = input.value.toLowerCase();
	var checkbox = document.getElementById('checkbox');
	var imgList = document.getElementById('imgList');
	var selectedTab = document.getElementsByClassName('active')[0];
	var value = selectedTab.children[0].getAttribute('href');
	var filtered = document.getElementsByTagName(value);
	var tags = document.getElementsByTagName('tags');

	for (var i = 0; i < imgList.children.length; i++) {
		imgList.children[i].style.display = 'none';
	}


	for (var i = 0; i < tags.length; i++) {
		var listElem = imgList.children[i];
		var tag = tags[i];
		var text = tag.innerText.toLowerCase();

		if (!checkbox.checked) {

			if (text.indexOf(filterWord) > -1) {
				// console.log(i + ' ' + listElem + ' ' + filterWord);
				listElem.style.display = '';
			}
		} else {

			filter = listElem.getElementsByTagName('filter')[0].innerText;

			if (value == filter) {

				if (text.indexOf(filterWord) > -1) {
					// console
					// .log(filterWord
					// + ' '
					// + listElem.getElementsByTagName('tags')[0].innerText
					// + ' ' + i);
					listElem.style.display = '';
				}
			}

		}
	}
}

function onDOMContentLoaded() {
	var checkbox = document.getElementById('checkbox');
	var activeTab = document.getElementsByClassName('active')[0]
	var tabs = document.getElementById('tabList').children;

	_onlyShowSelected(activeTab.children[0].getAttribute('href'));

	for (var i = 0; i < tabs.length; i++) {
		tabs[i].onclick = function(event) {
			var clickedTab = event.target.getAttribute('href');
			var labelFor = document.getElementById('checkboxLabel');
			var HTMLStr = 'Suche nur in Kategorie: <b>'
			var targetText = event.target.innerText;
			var prevSelectedTab = document.getElementsByClassName('active')[0];
			event.preventDefault();
			prevSelectedTab.className = '';
			event.target.parentElement.className = 'active';
			
			_onlyShowSelected(clickedTab);
			labelFor.innerHTML = HTMLStr + ' <b>' + targetText + '</b>';
			

			if (checkbox.checked) {
				var input = document.getElementById('inputSearch');
				input.onsearch();
			}

		}
	}

}

function _onlyShowSelected(clickedTab) {
	var selectedElements = document.getElementsByTagName('filter');

	for (var i = 0; i < imgList.children.length; i++) {
		imgList.children[i].style.display = 'none';
	}

	for (var i = 0; i < selectedElements.length; i++) {

		selectedElem = selectedElements[i];
		if (selectedElem.innerText == clickedTab) {
			selectedElem.parentElement.style.display = '';
		}
	}

}
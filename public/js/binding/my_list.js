function createList() {
	var tabList = document.getElementById('tabList');
	var imgDisplay = document.getElementById('imageDisplay');

	for (var i = 0; i < symbols.categories.length; i++) {
		var category = symbols.categories[i];

		var tabElem = document.createElement('li');

		var link = document.createElement('a');
		link.setAttribute('href', category.id);
		link.innerText = category.title;
		tabElem.appendChild(link);
		tabList.appendChild(tabElem);

		var imgArea = document.createElement('div');
		imgArea.setAttribute('id', category.id);

		// imgDisplay.appendChild(imgArea);

		if (i == 0) {
			tabElem.className = 'active';

		}

		var subdex = 0;
		for (var int = 0; int < category.images.length; int++) {

			var image = category.images[int];

			var listElement = document.createElement('li');
			listElement.className = 'listElem';
			var imgElem = document.createElement('img');

			imgElem.setAttribute('src', symbols.root + category.id + '/'
					+ category.prefix + image.fileName + symbols.extension);
			imgElem.setAttribute('class', 'img');
			imgElem.setAttribute('id', category.id + '_' + int);

			var filterElem = document.createElement('filter');
			filterElem.innerText = category.id;
			// debugger;

			var tagsElem = document.createElement('tags');
			tagsElem.hidden = true;

			var tags = image.additionalTags;
			tags.unshift(image.fileName);

			for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
				tagsElem.innerText = tagsElem.innerText.concat(tags[tagIndex]
						+ ';');
			}

			listElement.appendChild(imgElem);
			listElement.appendChild(tagsElem);
			listElement.appendChild(filterElem);
			imgList.appendChild(listElement);
			// imgArea.appendChild(listElement);
		}

	}

}

function createFilter(callback) {

	var search = document.getElementById('searchBox');
	var form = document.createElement('form');
	// form.setAttribute('class', 'filterform');
	form.setAttribute('class', 'form-wrapper');
	search.appendChild(form);

	var searchDiv = document.createElement('div');
	var checkedDiv = document.createElement('div');
	var labelDiv = document.createElement('div');
	searchDiv.setAttribute('class', 'searchDiv');
	checkedDiv.setAttribute('class', 'checkedDiv');
	labelDiv.setAttribute('class', 'labelDiv');

	var input = document.createElement('input');
	input.setAttribute('type', 'search');
	input.setAttribute('id', 'search');
	input.className= 'clearable';
	searchDiv.appendChild(input);
	form.appendChild(searchDiv);

	var checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'checkbox');
	checkbox.setAttribute('value', 'false');
	checkbox.style.width = '20px';
	checkbox.style.height = '20px';
	checkbox.onclick = function() {
	
		input.onsearch ();
	}
	checkedDiv.appendChild(checkbox);
	form.appendChild(checkedDiv)

	var labelFor = document.createElement('label');
	labelFor.setAttribute('for', 'checkbox');
	labelFor.setAttribute('id', 'checkboxLabel')

	var activeTab = document.getElementsByClassName('active')

	labelFor.innerHTML = 'Suche nur in Kategorie: <b>' + activeTab[0].innerText+'</b>';
	labelDiv.appendChild(labelFor);
	form.appendChild(labelDiv);

	input.onsearch  = function() {
		debugger;
		var filterWord = input.value.toLowerCase();

		var checkbox = document.getElementById('checkbox');
		var imgList = document.getElementById('imgList');

		var selectedTab = document.getElementsByClassName('active')[0];
		var value = selectedTab.children[0].getAttribute('href');
		var filtered = document.getElementsByTagName(value);

		for (var int = 0; int < imgList.children.length; int++) {
			imgList.children[int].style.display = 'none';
		}

		var tags = document.getElementsByTagName('tags');
		for (var i = 0; i < tags.length; i++) {
			var listElem = imgList.children[i];
			var tag = tags[i];
			var text = tag.innerText.toLowerCase();
			if (!checkbox.checked) {

				if (text.indexOf(filterWord) > -1) {
					console.log(i + ' ' + listElem + ' ' + filterWord);
					listElem.style.display = '';
				}
			} else {
				filter = listElem.getElementsByTagName('filter')[0].innerText;
				if (value == filter) {
					if (text.indexOf(filterWord) > -1) {
						debugger;
						console
								.log(filterWord
										+ ' '
										+ listElem.getElementsByTagName('tags')[0].innerText
										+ ' ' + i);
						listElem.style.display = '';
					}
				}

			}
		}

	};

	input.onkeyup = function() {
		input.onsearch ();
	}

}

function onDOMContentLoaded() {
	var checkbox = document.getElementById('checkbox');
	var activeTab = document.getElementsByClassName('active')[0]
	onlyShowSelected(activeTab.children[0].getAttribute('href'));
	var tabs = document.getElementById('tabList').children;

	for (var int = 0; int < tabs.length; int++) {
		tabs[int].onclick = function(event) {

			event.preventDefault();
			var clickedTab = event.target.getAttribute('href');

			onlyShowSelected(clickedTab);
			var labelFor = document.getElementById('checkboxLabel');
			labelFor.innerHTML = 'Suche nur in Kategorie: <b>'
					+ event.target.innerText+'</b>';

			var prevSelectedTab = document.getElementsByClassName('active')[0];
			prevSelectedTab.className = '';
			event.target.parentElement.className = 'active';
			if (checkbox.checked) {
				var input = document.getElementById('search');
				input.onsearch ();
			}

		}
	}

}

function onlyShowSelected(clickedTab) {
	// input = document.getElementById('searchField');
	// input.onsearch ();
	for (var int = 0; int < imgList.children.length; int++) {
		imgList.children[int].style.display = 'none';
	}

	var selectedElements = document.getElementsByTagName('filter');

	for (var int = 0; int < selectedElements.length; int++) {

		selectedElem = selectedElements[int];
		if (selectedElem.innerText == clickedTab) {
			selectedElem.parentElement.style.display = '';
		}
	}

}
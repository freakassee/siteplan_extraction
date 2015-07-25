function createList(element, json) {

	for (var i = 0; i < 1/* json.categories.length */; i++) {
		var category = json.categories[i];
		var subdex = 0;
		for (var int = 0; int < category.images.length; int++) {

			var image = category.images[int];

			var listElement = document.createElement('li');
			var imgElem = document.createElement('img');
			imgElem.setAttribute('src', json.root + category.id + '/'
					+ category.prefix + image.fileName + json.extension);
			imgElem.setAttribute('class', 'img');
			imgElem.setAttribute('id', category.id + '_' + int);
			
			var filterElem = document.createElement('filter');
			filterElem.setAttribute('value',category.id);
			
			var tagsElem = document.createElement('tags');
			var tags = image.additionalTags;
			tags.unshift(image.fileName);


			for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
				var tag = document.createElement('tag');
				tag.setAttribute('value',tags[tagIndex]);
				tagsElem.appendChild(tag);
			}
			listElement.appendChild(imgElem);
			listElement.appendChild(tagsElem);
			listElement.appendChild(filterElem);
			element.appendChild(listElement);
		}

	}

}


function listFilter(header, list) {
	var form = document.createElement('form');
	form.setAttribute('class', 'filterform');
	form.setAttribute('action', '#');
	var input = document.createElement('input');
	input.setAttribute('class', 'filterinput');
	input.setAttribute('type', 'text');
	form.appendChild(input);
	header.appendChild(form);

	input.onchange = function() {
		var filter = input.value;

		for (var int = 0; int < list.children.length; int++) {
			
			for (var j = 0; j < array.length; j++) {
				var elem = list.children
			}
			var subElem = list.children.item(int);
			if (subElem.innerText.indexOf(filter) > -1) {
				console.log(int + ' ' + elem + ' ' + filter);
				subElem.hidden = false;
			} else {
				subElem.hidden = true;
			}
		}
	};
	input.onkeyup = function() {
		input.onchange();
	}

}

/* li Belgium
li Brazil
li Canada
li Denmark
li Finland
li France
li Germany
li Greece
li Ireland
li Israel
li Italy
li Japan
li Luxembourg
li Mexico
li Netherlands
li Norway
li Poland
li Portugal
li Russia
li Spain
li Sweden
li Switzerland
li Turkey
li United Kingdom
li United States*/

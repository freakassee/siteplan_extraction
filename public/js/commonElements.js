

function createNextButton(url, left, top) {
	var textNode = document.createTextNode('Weiter');
	var button = document.createElement('button');
	button.style.position = 'absolute';
	button.style.width = '75px';
	button.style.height = '30px';
	button.style.left = left + 'px';
	button.style.top = top + 'px';
	button.appendChild(textNode);

	button.onclick = function() {
		location.href = url;
	}

	mainDiv.appendChild(button);
}

function createHiddenFormAndSubmit(imageId) {
	var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('action', '/resize');
	form.setAttribute('enctype', 'application/x-www-form-urlencoded');
	var params = {
		x_values : x_values,
		y_values : y_values,
		isSymbol_values : isSymbol_values,
		img_id : imageId,
		pathname : pathname
	}

	for ( var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement('input');
			hiddenField.setAttribute('type', 'hidden');
			hiddenField.setAttribute('name', key);
			hiddenField.setAttribute('value', params[key]);
			form.appendChild(hiddenField);
		}
	}
	form.submit();
}

function setStyleAccordingToSymbolValue(id, div,opacity,inverted) {
	if(inverted){
		isSymbol_values[id]=!isSymbol_values[id];
	}

	if (!isSymbol_values[id]) {
		div.style.opacity = opacity;
	} else {
		div.style.opacity = 0.0;
	}
}
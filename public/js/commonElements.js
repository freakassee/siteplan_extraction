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

function createOverlayDiv(index, color) {
	//debugger;
	margin = 8;
	var div = document.createElement('div');
	div.setAttribute('id', 'ovrDiv_' + index);
	div.style.backgroundColor = color;
	div.style.position = 'absolute';

	d_left = (x_values[index] - x_values[0]) / scalingFactor + +ovr_W-margin;
	d_top = (y_values[index] - y_values[0]) / scalingFactor + ovr_H-margin;

	div.style.left = d_left + 'px';
	div.style.top = d_top + 'px';

	d_width = extracted_W2 / scalingFactor;
	d_height = extracted_H2 / scalingFactor;

	div.style.width = d_width + 'px';
	div.style.height = d_height + 'px';

	div.style.zIndex = 2;

	div.addEventListener('click', function(event) {
		onDivClick(event);
	});

	setStyleAccordingToSymbolValue(index, div, 0.5, false);
	mainDiv.appendChild(div);
	return div;
}


function setStyleAccordingToSymbolValue(id, element, opacity, inverted) {
	if (inverted) {
		isSymbol_values[id] = !isSymbol_values[id];
	}

	if (!isSymbol_values[id]) {
		element.style.opacity = opacity;
	} else {
		element.style.opacity = 0.0;
	}
}



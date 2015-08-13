function createNextButton(pathname, imageId, left, top, text) {
	var textNode = document.createTextNode(text);
	var button = document.createElement('button');
	button.id = 'button';
	button.style.position = 'absolute';
	button.style.width = '150px';
	button.style.height = '30px';
	button.style.left = left + 'px';
	button.style.top = top + 'px';
	button.appendChild(textNode);

	var params = {
		x_values : x_values,
		y_values : y_values,
		isSymbol_values : isSymbol_values,
		catIndex_values : catIndex_values,
		img_id : imageId,
		pathname : pathname
	}

	button.onclick = function() {
		createHiddenFormAndSubmit(pathname, imageId, params);
	}

	mainDiv.appendChild(button);

}

function createHiddenFormAndSubmit(pathname, imageId, params) {

	var actionPath = '/resize';
	var form = document.createElement('form');

	if (pathname == '/bind') {
		actionPath = '/bind';
	}

	if (pathname == '/compare') {
		actionPath = '/compare'
	}

	form.action = actionPath;
	form.enctype = 'application/x-www-form-urlencoded';
	form.method = 'post';
	form.id = 'hiddenForm';

	for ( var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement('input');
			hiddenField.type = 'hidden';
			hiddenField.name = key;
			hiddenField.value = params[key];
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit();

}

function createOverlayDiv(index, color) {
	var div = document.createElement('div');

	div.id = 'ovrDiv_' + index;
	div.style.backgroundColor = color;
	div.style.position = 'absolute';

	margin = 8;
	d_left = (x_values[index] - x_values[0]) / scalingFactor + +ovr_W - margin;
	d_top = (y_values[index] - y_values[0]) / scalingFactor + ovr_H;

	div.style.left = d_left + 'px';
	div.style.top = d_top + 'px';

	d_width = extracted_W2 / scalingFactor;
	d_height = extracted_H2 / scalingFactor;

	div.style.width = d_width + 'px';
	div.style.height = d_height + 'px';

	div.style.zIndex = 2;
	div.style.cursor = 'pointer';
	div.addEventListener('click', function(event) {
		onDivClick(event);
	});

	div.style.border = '2px solid black';
	div.innerText = 'Ändern';
	div.style.lineHeight = d_height + 'px';
	div.style.color = 'white';
	div.style.textAlign = 'center';
	setStyleAccordingToSymbolValue(index, div, 0.5, false);
	mainDiv.appendChild(div);

	return div;
}

function setStyleAccordingToSymbolValue(id, element, opacity, isInverted) {
	if (isInverted) {

		if (!isSymbol_values[id]) {
			element.style.opacity = 0.0;
		} else {
			element.style.opacity = opacity;
		}

	} else {

		if (!isSymbol_values[id]) {
			element.style.opacity = opacity;
		} else {
			element.style.opacity = 0.0;
		}
	}

}

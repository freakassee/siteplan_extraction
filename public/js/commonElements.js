function createNextButton(pathname, imageId, left, top, text, isDemo) {
	var textNode = document.createTextNode(text);
	var button = document.createElement('button');
	button.setAttribute('id', 'button');
	button.style.position = 'absolute';
	button.style.width = '150px';
	button.style.height = '30px';
	button.style.left = left + 'px';
	button.style.top = top + 'px';
	button.appendChild(textNode);

	button.onclick = function() {
		createHiddenFormAndSubmit(pathname, imageId, isDemo);
	}

	mainDiv.appendChild(button);
}

function createHiddenFormAndSubmit(pathname, imageId, isDemo) {
	if (isDemo) {
//		debugger;
		if(pathname.indexOf('/close')>-1){
			window.location.href = pathname;
		}else{
			window.location.href = pathname + '?imageId=' + imageId;			
		}
	} else {
		
		var form = document.createElement('form');
		form.setAttribute('method', 'post');
		form.setAttribute('id', 'hiddenForm');
		var actionPath = '/resize';
		if(pathname=='/bind'){
			actionPath = '/bind'
		}
		form.setAttribute('action', actionPath);
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
		mainDiv.appendChild(form);
		form.submit();
	}
}

function createOverlayDiv(index, color) {
	margin = 8;
	var div = document.createElement('div');
	div.setAttribute('id', 'ovrDiv_' + index);
	div.style.backgroundColor = color;
	div.style.position = 'absolute';

	d_left = (x_values[index] - x_values[0]) / scalingFactor + +ovr_W - margin;
	d_top = (y_values[index] - y_values[0]) / scalingFactor + ovr_H; // +
																		// margin;

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

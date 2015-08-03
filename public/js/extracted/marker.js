function marker(imageId) {
	mainDiv.appendChild(trImg);

	origin_W = trImg.naturalWidth;
	origin_H = trImg.naturalHeight;
	init(imageId);

}

function createDocument(image_Id, x_values, y_values, isSymbol_values) {
	scr_W = window.innerWidth*0.8;
	scr_H = window.innerHeight*0.8;

	if (trImg.height / scr_H > trImg.width / scr_W) {
		scalingFactor = trImg.height / scr_H;
		trImg.style.height = scr_H + 'px';

		// Right Version
		// createNextButton('/extracted_og', image_Id, origin_W / scalingFactor + 20,
		// scr_H/2,'Weiter zu Variante C');
		// version below is for questionnaire only
		// TO DELETE
		createNextButton('/extracted_og', 3,  origin_W / scalingFactor+20, scr_H / 2,
				'Weiter zu Variante C',true);

	} else {
		scalingFactor = trImg.width / scr_W;
		trImg.style.width = scr_W + 'px';

		// Right Version
		// createNextButton('/extracted_og',image_Id, 50, origin_H / scalingFactor +
		// 20,'Weiter zu Variante C');
		// version below is for questionnaire only
		// TO DELETE
		createNextButton('/extracted_og', 3, 50, origin_H / scalingFactor+20,
				'Weiter zu Variante C',true);

	}

	trImg.style.opacity = 1.0;
	ovr_W = roundDown(extracted_W / 5 / scalingFactor);
	ovr_H = ovr_W;

	for (var i = 0; i < x_values.length; i++) {
		ovr_list[i] = createOverlayDiv(i, 'transparent');
		mrk_list[i] = createMarkerDiv(i, 'orange'/* '#6699FF' */);
	}
}

function onDivClick(event) {
	var targetID = event.target.id;
	var id = targetID.split('_')[1];
	isSymbol_values[id] = !isSymbol_values[id];
	var target = document.getElementById(targetStr + id);
	setStyleAccordingToSymbolValue(id, target, 1.0, inverted);

}

function createMarkerDiv(index, color) {
	var markerDiv = document.createElement('div');
	markerDiv.setAttribute('id', 'markerDiv_' + index);
	markerDiv.style.backgroundColor = color;
	markerDiv.style.position = 'absolute';

	if (index < 11 || (index > 16 && index < 28)) {
		markerDiv.style.left = d_left + margin + 'px';
		markerDiv.style.width = d_width + 'px';
		markerDiv.style.height = -y_values[0] / scalingFactor + 'px';

		if (index < 11) {
			markerDiv.style.top = d_top + y_values[0] / scalingFactor + 'px';

		} else {
			markerDiv.style.top = d_top + d_height + 'px';
		}
	} else {
		markerDiv.style.top = d_top + 'px';
		markerDiv.style.width = -y_values[0] / scalingFactor + 'px';
		markerDiv.style.height = d_height + 'px';
		if (index < 28) {
			markerDiv.style.left = d_left + margin + d_width + 'px';
		} else {
			markerDiv.style.left = d_left + margin + y_values[0]
					/ scalingFactor + 'px';
		}
	}
	markerDiv.style.zIndex = 2;

	markerDiv.addEventListener('click', function(event) {
		onDivClick(event)
	});

	setStyleAccordingToSymbolValue(index, markerDiv, 1.0, true);
	mainDiv.appendChild(markerDiv);
}
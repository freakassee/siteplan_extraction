function transparent(imageId) {
	mainDiv.appendChild(trImg);

	origin_W = trImg.naturalWidth;
	origin_H = trImg.naturalHeight;

	init(imageId);

}

function createDocument(image_Id, x_values, y_values, isSymbol_values) {
	scr_W = window.innerWidth * 0.8;
	scr_H = window.innerHeight * 0.8;

	if (origin_H / scr_H > origin_W / scr_W) {
		scalingFactor = origin_H / scr_H;

		trImg.style.height = scr_H + 'px';

		createNextButton('/bind', image_Id, origin_W / scalingFactor + 20,
				scr_H / 2, 'Weiter zur Zuordnung', false);

	} else {
		scalingFactor = origin_W / scr_W;

		trImg.style.width = scr_W + 'px';

		createNextButton('/bind', image_Id, 50, origin_H / scalingFactor + 20,
				'Weiter zur Zuordnung', false);

	}

	trImg.style.opacity = 1.0;
	ovr_W = roundDown(extracted_W / 5 / scalingFactor);
	ovr_H = ovr_W;

	createInnerDiv(scalingFactor);

	for (var i = 0; i < x_values.length; i++) {
		ovr_list[i] = createOverlayDiv(i, 'black');

	}

}

function onDivClick(event) {
	var targetID = event.target.id;
	var id = targetID.split('_')[1];
	isSymbol_values[id] = !isSymbol_values[id];
	var target = document.getElementById(targetStr + id);
	setStyleAccordingToSymbolValue(id, target, 0.5, inverted);

}

function createInnerDiv(scalingFactor) {
	var innerDiv = document.createElement('div');
	innerDiv.setAttribute('id', 'innerDiv');
	innerDiv.style.position = 'absolute';
	innerDiv.style.backgroundColor = 'black';
	innerDiv.style.opacity = 0.8;
	innerDiv.style.left = (extracted_W2) / scalingFactor + ovr_W - margin
			+ 'px';
	innerDiv.style.top = (extracted_H2) / scalingFactor + ovr_H
			+ /* margin + */'px';
	innerDiv.style.width = (x_values[10] - x_values[1]) / scalingFactor + 'px';
	innerDiv.style.height = (y_values[17] - y_values[11]) / scalingFactor
			+ 'px';

	mainDiv.appendChild(innerDiv);
}

transparent.prototype.test = function() {
	return 123;
}
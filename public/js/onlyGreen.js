function onlyGreen(imageId) {
	mainDiv.appendChild(trImg);

	origin_W = trImg.naturalWidth;
	origin_H = trImg.naturalHeight;
	init(imageId);
}

function createDocument(image_Id, x_values, y_values, isSymbol_values) {
	scr_W = window.innerWidth*0.8;
	scr_H = window.innerHeight*0.8;

	if (origin_H / scr_H > origin_W / scr_W) {
		scalingFactor = origin_H / scr_H;
		trImg.style.height = scr_H + 'px';

		createNextButton('/bind', image_Id,  origin_W / scalingFactor+20, scr_H / 2);
	} else {
		scalingFactor = origin_W / scr_W;
		trImg.style.width = scr_W + 'px';

		createNextButton('/bind', image_Id, 50, origin_H / scalingFactor+20);
	}
	// nutzer untersuchen (wie viel it sie verwenden, etc.)
	// likert skala und irgendwas mit nasa
	trImg.style.opacity = 1.0;
	ovr_W = roundDown(extracted_W / 5 / scalingFactor);
	ovr_H = ovr_W;

	for (var i = 0; i < x_values.length; i++) {
		ovr_list[i] = createOverlayDiv(i, 'transparent');

		var ovr = document.createElement('img');
		ovr.setAttribute('src', '/styles/images/true.png');
		ovr.setAttribute('id', 'overlay_' + i);
		ovr.style.width = ovr_W + 'px';

		ovr.style.position = 'absolute';
		ovr.style.left = (x_values[i] + extracted_W2) / scalingFactor + 'px';
		ovr.style.top = (y_values[i] + extracted_H) / scalingFactor + 'px';
		setStyleAccordingToSymbolValue(i, ovr, 1.0, inverted);

		mainDiv.appendChild(ovr);
		img_list[i] = ovr;

	}

}

function onDivClick(event) {
	var targetID = event.target.id;
	var id = targetID.split('_')[1];
	isSymbol_values[id] = !isSymbol_values[id];
	var target = document.getElementById(targetStr + id);
	setStyleAccordingToSymbolValue(id, target, 1.0, inverted);

}
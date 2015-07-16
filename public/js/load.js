/*function load(x_values,y_values,isSymbol_values) {
	var mainDiv = document.getElementById('main');
	console.log(mainDiv);
	while (mainDiv.firstChild !== mainDiv.lastChild) {
		console.log(mainDiv.lastChild.id);
		mainDiv.removeChild(mainDiv.lastChild);
	}
	var scalingFactor;
	var scr_W = window.innerWidth - 20;
	var scr_H = window.innerHeight - 20;

	var trImg = document.getElementById('transformedImage');

	if (trImg.height / scr_H > trImg.width / scr_W) {
		scalingFactor = trImg.height / scr_H;
		trImg.style.height = scr_H + 'px';
	} else {
		scalingFactor = trImg.width / scr_W;
		trImg.style.width = scr_W + 'px';
	}
	trImg.style.webkitFilter = 'brightness(150%)';

	mainDiv.appendChild(trImg);

	// var x_values = [#{x_values}];
	// var y_values = [#{y_values}];
	// var isSymbol_values = [#{isSymbol_values}];

	var extracted_W = x_values[1] - 2 * x_values[0];
	var extracted_H = y_values[11] - 2 * y_values[0];

	var extracted_W2 = x_values[1] - x_values[0];
	var extracted_H2 = y_values[11] - y_values[0];

	var ovr_W = roundDown(extracted_W / 5 / scalingFactor);
	var ovr_H = ovr_W;

	var ovr_list = [];
	var div_list = [];

	var innerDiv = document.createElement('div');
	innerDiv.setAttribute('id', 'innerDiv');
	innerDiv.style.position = 'absolute';
	innerDiv.style.backgroundColor = 'black';
	innerDiv.style.opacity = 0.8;
	innerDiv.style.left = (extracted_W2) / scalingFactor + ovr_W + 'px';
	innerDiv.style.top = (extracted_H2) / scalingFactor + ovr_H + 'px';
	innerDiv.style.width = (x_values[10] - x_values[1]) / scalingFactor + 'px';
	innerDiv.style.height = (y_values[17] - y_values[11]) / scalingFactor
			+ 'px';

	mainDiv.appendChild(innerDiv);

	for (var i = 0; i < x_values.length; i++) {
		var div = document.createElement('div');
		div.setAttribute('id', 'ovrDiv_' + i);
		div.style.backgroundColor = 'black';
		div.style.position = 'absolute';
		div.style.left = (x_values[i] - x_values[0]) / scalingFactor + ovr_W
				+ 'px';
		div.style.top = (y_values[i] - y_values[0]) / scalingFactor + ovr_H
				+ 'px';

		div.style.width = extracted_W2 / scalingFactor + 'px';
		div.style.height = extracted_H2 / scalingFactor + 'px';

		div.style.zIndex = 2;

		setStyleAccordingToSymbolValue(i, div);
		mainDiv.appendChild(div);

		div.addEventListener('click', function(event) {

			var targetID = event.target.id;
			var id = targetID.split('_')[1];
			isSymbol_values[id] = !isSymbol_values[id];
			var target = document.getElementById(targetID);
			setStyleAccordingToSymbolValue(id, target);

		});

	}

	function setStyleAccordingToSymbolValue(id, div) {
		if (!isSymbol_values[id]) {
			div.style.opacity = 0.5;
		} else {
			div.style.opacity = 0.0;
		}
	}

	function roundDown(number, decimals) {
		decimals = decimals || 0;
		return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10,
				decimals));
	}
};*/
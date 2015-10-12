function create(handlerPosition) {
	var siteplan_Width;
	var siteplan_Height;

	setHandlerPosition(handlerPosition);
	create_from();
	create_vertical();
	createSitePlan();

	lineWidth.onchange = function() {
		changePreview();
	}
	lineWidth.onkeyup = function() {
		changePreview();
	}

	colPicker.changeInputValue = function() {
		changePreview();
	}

	preview.style.borderBottom = lineWidth.value + 'px solid ' + colPicker.value
}

function changePreview() {
	preview.style.borderBottom = lineWidth.value + 'px solid ' + colPicker.value
}

function create_vertical(widthPercentage, heightPercentage) {
	vertical_handler.style.height = maxH + 2 * borderW + 'px';
	vertical_handler.style.width = '8px';
	vertical_handler.style.marginLeft = '6px';
	vertical_handler.style.marginRight = '6px';
}

function createSitePlan() {

	var horizontal_section = roundDown(siteplan_Width / 11);
	var vertical_section = roundDown(maxH / 8);
	var div_H = vertical_section - dft_mar * 2;
	var div_W = horizontal_section - dft_mar * 2;
	var div_size;

	if (div_W < div_H) {
		div_size = div_W;
		add_mar_vert = (div_H - div_size) / 2;
	} else {
		div_size = div_H;
		add_mar_hor = (div_W - div_size) / 2;
	}

	topDiv.style.height = vertical_section + 'px';
	centerDiv.style.height = 6 * vertical_section + 'px';
	leftDiv.style.height = 6 * vertical_section + 'px';
	mapDiv.style.height = 6 * vertical_section + 'px';
	rightDiv.style.height = 6 * vertical_section + 'px';
	bottomDiv.style.height = vertical_section + 'px';

	centerDiv.style.width = 11 * horizontal_section + 'px';
	leftDiv.style.width = horizontal_section + 'px';
	mapDiv.style.width = 9 * horizontal_section + 'px';
	rightDiv.style.width = horizontal_section + 'px';

	to_map.style.marginTop = dft_mar + add_mar_vert + 'px';
	to_map.style.marginLeft = dft_mar + add_mar_hor + 'px';
	to_map.style.marginBottom = dft_mar + add_mar_vert + 'px';
	to_map.style.marginRight = dft_mar + add_mar_hor + 'px';

	to_map.style.width = 9 * horizontal_section - 2 * (dft_mar + add_mar_hor) + 'px';
	to_map.style.height = 6 * vertical_section - 2 * (dft_mar + add_mar_vert) + 'px';

	var bttmIn = 0;
	var lftIn = 1;
	var rghtIn = 1;
	for (var i = 0; i < 34; i++) {
		var holderDiv = document.createElement('div');
		var tacticalSign = document.createElement('img');
		var index = positions.lastIndexOf(i);
		if (index >= 0) {
			if (img_sources[index]) {
				tacticalSign.src = img_sources[index];
			} else {
				tacticalSign.src = org_sources[index]
			}

			if (titles[positions.lastIndexOf(i)]) {
				var input = document.createElement('input');
				input.type = 'text';
				input.value = titles[positions.lastIndexOf(i)];
				input.id = 'title_' + positions.lastIndexOf(i);
				input.style.position = 'absolute';
				input.style.width = div_size + 'px';
				input.style.height = div_size * 0.16 + 'px';
				input.style.top = 0 + 'px';
				input.style.left = 0 + 'px';
				input.style.border = '0px';
				input.style.textAlign = 'center';
				input.style.fontSize = div_size * 0.16 + 'px';

				holderDiv.appendChild(input);

			}

			if (descriptions[positions.lastIndexOf(i)]) {
				var description = document.createElement('input');
				description.type = 'text';
				description.id = 'description_' + positions.lastIndexOf(i);
				description.value = descriptions[positions.lastIndexOf(i)];
				description.style.position = 'absolute';
				description.style.width = div_size + 'px';
				description.style.bottom = 0 + 'px';
				description.style.left = 0 + 'px';
				description.style.border = '0px';
				description.style.textAlign = 'center';
				description.style.height = div_size * 0.16 + 'px';
				description.style.fontSize = div_size * 0.16 + 'px';

				holderDiv.appendChild(description);

			}

		} else {

			tacticalSign.src = '/styles/img/symbols/universal/universal.jpg';
		}

		holderDiv.style.width = div_size + 'px';
		holderDiv.style.height = div_size + 'px';
		holderDiv.className = 'holderDiv';

		holderDiv.style.marginTop = dft_mar + add_mar_vert + 'px';
		holderDiv.style.marginLeft = dft_mar + add_mar_hor + 'px';
		holderDiv.style.marginBottom = dft_mar + add_mar_vert + 'px';
		holderDiv.style.marginRight = dft_mar + add_mar_hor + 'px';

		// holderDiv.style.background = getRandomColor();

		holderDiv.onclick = function() {

			if (event.target.src.indexOf('universal') < 0) {
				to_map.style.cursor = 'crosshair';
				_reference();

				t_map.getViewport().addEventListener('click', onmapclick, true);
			}

		}

		holderDiv.ondblclick = function() {
			_removeReference();
		}

		tacticalSign.style.width = div_size + 'px';
		holderDiv.appendChild(tacticalSign);

		if (i < 11) {
			holderDiv.group = 'top';
			holderDiv.id = holderDiv.group + i;
			topDiv.appendChild(holderDiv);
		} else if (i >= 11 && i < 17) {
			holderDiv.group = 'right';
			holderDiv.id = holderDiv.group + rghtIn;
			rightDiv.appendChild(holderDiv);
			rghtIn++;
		} else if (i >= 17 && i < 28) {

			holderDiv.group = 'bottom';
			holderDiv.id = holderDiv.group + bttmIn;
			bottomDiv.appendChild(holderDiv);
			bttmIn++;
		} else {
			holderDiv.group = 'left';
			holderDiv.id = holderDiv.group + lftIn;
			leftDiv.appendChild(holderDiv);
			lftIn++;
		}
	}
	create_to();
}

function setHandlerPosition(percentage) {

	maxW = window.innerWidth - 2 * (margin + 2 * borderW);
	maxH = window.innerHeight - 2 * (margin + borderW);

	from_map_W = roundDown(maxW * percentage - 1 / 2 * verticalW) - 10;
	from_map.style.width = from_map_W + 'px'
	from_map.style.height = 2 * maxH / 3 + 'px';

	drawOptions.style.width = from_map_W + 'px';
	drawOptions.style.height = maxH / 3 - 11 + 'px';

	siteplan_Width = roundDown(maxW * (1 - percentage) - 1 / 2 * verticalW) - 10;
	siteplan_Height = maxH;

	siteplan.style.width = siteplan_Width + 'px'
	siteplan.style.height = siteplan_Height + 'px';

	// _updateAll()
}

function _updateAll() {

	if (f_map && t_map) {
		f_map.updateSize();
		for (var i = topDiv.children.length - 1; i >= 0; i--) {
			topDiv.children[i].remove();
			bottomDiv.children[i].remove();
			if (i < leftDiv.children.length) {
				leftDiv.children[i].remove();
				rightDiv.children[i].remove();
			}
		}
		to_map.children[0].remove();
		createSitePlan()
		t_map.updateSize();
	}
}
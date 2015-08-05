function create(handlerPosition) {
	var to_map_Width;
	var to_map_Height

	setHandlerPosition(handlerPosition);
	create_from();
	create_vertical();
	createSitePlan();
}
function create_from(widthPercentage, heightPercentage) {
	var from_map_url = '/images/' + imageId + '/transformed/' + imageId
			+ '.jpg';
	var extent = [ 0, 0, 3400, 2633 ];
	var projection = new ol.proj.Projection({
		code : 'xkcd-image',
		units : 'pixels',
		extent : extent
	});

	var imageLayer = new ol.layer.Image({
		source : new ol.source.ImageStatic({
			url : from_map_url,
			projection : projection,
			imageExtent : extent
		})
	});

	var map = new ol.Map({
		layers : [ imageLayer ],
		target : 'from_map',
		view : new ol.View({
			projection : projection,
			center : ol.extent.getCenter(extent),
			zoom : 1
		})
	});
}

function create_to(widthPercentage, heightPercentage) {

	var münster = ol.proj.fromLonLat([ 7.624, 51.961 ]);
	var osm = new ol.layer.Tile({
		preload : 4,
		source : new ol.source.OSM()
	});
	var map = new ol.Map({
		layers : [ osm ],
		target : 'mapDiv',
		renderer : 'canvas',
		view : new ol.View({
			center : münster,
			zoom : 14
		})
	});
	osm.on('postcompose', function(event) {
		var context = event.context;
		var canvas = context.canvas;
		var image = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = image.data;
		for (var i = 0, ii = data.length; i < ii; i += 4) {
			data[i] = data[i + 1] = data[i + 2] = (3 * data[i] + 4
					* data[i + 1] + data[i + 2]) / 8;
		}
		context.putImageData(image, 0, 0);
	});

}

function create_vertical(widthPercentage, heightPercentage) {
	vertical_handler.style.height = maxH + borderW + 'px';
	vertical_handler.style.width = '8px';
	vertical_handler.style.marginLeft = '6px';
	vertical_handler.style.marginRight = '6px';
}

function createSitePlan() {
	// var topDiv = document.getElementById('topDiv');
	// var leftDiv = document.getElementById('leftDiv');
	// var rightDiv = document.getElementById('rightDiv');
	// var bottomDiv = document.getElementById('bottomDiv');
	// var mapDiv = document.getElementById('mapDiv');

	var mar = 4;
	var holder_Width = to_map_Width / 11 - mar;
	var holder_Height = maxH / 8 - mar;
	var topBotWidths = to_map_Width + 'px';
	var topBotHeights = holder_Height + mar + 'px';
	var centerWidths = holder_Width + 1.5 * mar + 'px';
	var centerHeights = 6 * (holder_Height + mar) - mar + 'px'
	var tmpBot = 0;
	var tmpLeft = 0;
	topDiv.style.width = topBotWidths;
	topDiv.style.height = topBotHeights;

	centerDiv.style.width = topBotWidths;
	centerDiv.style.height = centerHeights;
	centerDiv.style.marginTop = mar / 2 + 'px';

	leftDiv.style.width = centerWidths;
	leftDiv.style.height = centerHeights;

	mapDiv.style.width = 9 * (holder_Width + mar) - mar + 'px';
	mapDiv.style.height = centerHeights;

	rightDiv.style.width = centerWidths;
	rightDiv.style.height = centerHeights;

	bottomDiv.style.width = topBotWidths;
	bottomDiv.style.height = topBotHeights;

	for (var i = 0; i < 34; i++) {

		var holder = document.createElement('img');
		if (positions.lastIndexOf(i) >= 0) {

			holder.setAttribute('src', imgSources[positions.lastIndexOf(i)]);
			
			if (titles[i]) {
				var input = document.createElement('input');
				input.setAttribute('type', 'text');
				input.setAttribute('id', 'textText_'+i);

				input.style.position = 'absolute';
				input.style.width = holder_Width - mar / 2 + 'px';
				input.style.height = holder_Width * 0.17 +'px';
				input.style.marginLeft = 3 / 4 * mar + 'px';
				input.style.marginTop = 3 / 4 * mar + 'px';
				input.style.top = 0 + 'px';
				input.style.left = 0 +'px';
				input.style.border = '0px';
				input.style.textAlign = 'center';
				input.style.fontSize= holder_Width * 0.17 +'px';
				//input.style.backgroundColor = 'red';
				input.setAttribute('value', titles[i]);

			}
		} else {

			holder.setAttribute('src',
					'/styles/img/symbols/universal/universal.jpg');
		}
		holder.style.width = holder_Width + 'px';
		holder.style.height = holder_Height + 'px';

		if (i < 11) {
			holder.setAttribute('id', 'img_' + (i + 1));
			holder.style.margin = mar / 2 + 'px';
			topDiv.appendChild(holder);
			if(i == 0){
				topDiv.appendChild(input);
			}
		} else if (i >= 11 && i < 17) {
			holder.setAttribute('id', 'img_' + (i + 1));
			holder.style.marginLeft = mar + 'px';
			rightDiv.appendChild(holder);

		} else if (i >= 17 && i < 28) {
			// holder.setAttribute('id', 'img_' + (i + (28 - i) - tmpBot));
			holder.style.margin = mar / 2 + 'px';
			bottomDiv.appendChild(holder);
			tmpBot++;
		} else {
			// holder.setAttribute('id', 'img_' + (i + (34 - i) - tmpLeft));
			holder.style.marginLeft = mar / 2 + 'px';
			leftDiv.appendChild(holder);
			tmpLeft++;
		}
	}
	create_to();
}

function setHandlerPosition(percentage) {

	maxW = window.innerWidth - 2 * (margin + 2 * borderW);
	maxH = window.innerHeight - 2 * (margin + borderW);

	from_map.style.width = maxW * percentage - 1 / 2 * verticalW + 'px'
	from_map.style.height = maxH + 'px';

	to_map_Width = maxW * (1 - percentage) - 1 / 2 * verticalW;
	to_map_Height = maxH;

	to_map.style.width = to_map_Width + 'px'
	to_map.style.height = to_map_Height + 'px';
}

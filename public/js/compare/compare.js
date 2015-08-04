function create(handlerPosition) {
	var to_map_Width;
	var to_map_Height

	setHandlerPosition(handlerPosition);
	create_from();
	create_vertical();
	createSitePlan();
}
function create_from(widthPercentage, heightPercentage) {

	var extent = [ 0, 0, 3400, 2633 ];
	var projection = new ol.proj.Projection({
		code : 'xkcd-image',
		units : 'pixels',
		extent : extent
	});

	var imageLayer = new ol.layer.Image({
		source : new ol.source.ImageStatic({
			url : '/images/1438184015736/transformed/1438184015736.jpg',
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

	topDiv.style.width = to_map_Width + 'px';
	topDiv.style.height = holder_Height + mar + 'px';

	centerDiv.style.width = to_map_Width + 'px';
	centerDiv.style.height = 6 * (holder_Height + mar) - mar + 'px';

	leftDiv.style.width = holder_Width + 1.5*mar + 'px';
	leftDiv.style.height = 6 * (holder_Height + mar) - mar + 'px';

	mapDiv.style.width = 9 * (holder_Width+mar) -mar + 'px';
	mapDiv.style.height = 6 * (holder_Height + mar) - mar  + 'px';

	rightDiv.style.width = holder_Width + 1.5*mar + 'px';
	rightDiv.style.height = 6 * (holder_Height + mar) - mar + 'px';

	bottomDiv.style.width = to_map_Width + 'px';
	bottomDiv.style.height = holder_Height + mar + 'px';

	for (var i = 0; i < 34; i++) {
		var holder = document.createElement('img');
		holder.setAttribute('src',
				'/styles/img/symbols/universal/universal.jpg');

		holder.style.width = holder_Width + 'px';
		holder.style.height = holder_Height + 'px';

		// if(extractedImages[i]==containsElement){
		// holder= extractedImages;
		// }

		if (i < 11) {
			holder.style.margin = mar / 2 + 'px';
			topDiv.appendChild(holder);
		} else if (i >= 11 && i < 17) {
			 holder.style.marginLeft = mar + 'px';
			rightDiv.appendChild(holder);

		} else if (i >= 17 && i < 28) {
			 holder.style.margin = mar/2 + 'px';
			 bottomDiv.appendChild(holder);
		} else {

			holder.style.marginLeft = mar / 2 + 'px';
			leftDiv.appendChild(holder);
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
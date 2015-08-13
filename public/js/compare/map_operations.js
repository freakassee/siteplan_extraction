function create_to(widthPercentage, heightPercentage) {

	var münster = ol.proj.fromLonLat([ 7.624, 51.961 ]);
	var osm = new ol.layer.Tile({

		preload : 4,
		source : new ol.source.OSM()
	});

	vector_source = new ol.source.Vector({
		wrapX : false
	});

	var vector_layer = new ol.layer.Vector({
		source : vector_source
	});

	t_map = new ol.Map({
		layers : [ osm, vector_layer ],
		target : 'to_map',
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
			data[i] = data[i + 1] = data[i + 2] = (3 * data[i] + 4 * data[i + 1] + data[i + 2]) / 8;
		}
		context.putImageData(image, 0, 0);
	});

	t_map.on("moveend", function(e) {
		drawLines();
	});

}

function _removeReference() {
	var target = event.currentTarget;
	var group = target.group;
	var index = parseInt(target.id.replace(group, ""));

	if (group === 'bottom') {
		index = index + 17;
	} else if (group === 'left') {
		index = index + 27;
	} else if (group === 'right') {
		index = index + 10;
	}

	startPoints[index] = null;
	endPoints[index] = null;
	widthValues[index] = null;
	colorValues[index] = null;

	vector_source.removeFeature(vector_source.getFeatureById(index));
}

function _reference() {
	var x, y, anchor;
	var active = document.getElementsByTagName('active')[0];

	if (active) {
		active.remove();
	}

	var active = document.createElement('active');
	var target = event.currentTarget;
	var group = target.group;
	var index = parseInt(target.id.replace(group, ''));

	var seg_w = roundDown(siteplan_Width / 11);
	var seg_h = roundDown(siteplan_Height / 8);

	var max_w = seg_w * 9;
	var max_h = seg_h * 6;

	target.appendChild(active);

	if (group === 'top') {
		y = 0;
		if (index === 0) {
			x = 0;
		} else if (index === 10) {
			x = max_w;
		} else {
			x = (index - 0.5) * seg_w;
		}

	} else if (group === 'bottom') {
		y = max_h;
		if (index === 0) {
			x = 0;
		} else if (index === 10) {
			x = max_w;
		} else {
			x = (index - 0.5) * seg_w;
		}
		index = index + 17;
	} else if (group === 'left') {
		x = 0;
		y = (index - 0.5) * seg_h;
		index = index + 27;
	} else if (group === 'right') {

		x = max_w;
		y = (index - 0.5) * seg_h;
		index = index + 10;
	} else {
		console.log('There is something wrong here');
	}

	anchor = [ x, y ];

	startPoints[index] = anchor;

}

function onmapclick(e) {
	var target = document.getElementsByTagName('active')[0].parentElement;
	var group = target.group;
	var index = parseInt(target.id.replace(group, ''));
	to_map.style.cursor = 'all-scroll';

	if (group === 'right') {
		index = index + 10;
	} else if (group === 'bottom') {
		index = index + 17;
	} else if (group === 'left') {
		index = index + 27
	}
	colorValues[index] = colPicker.value;
	widthValues[index] = parseInt(lineWidth.value);
	endPoints[index] = t_map.getCoordinateFromPixel(t_map.getEventPixel(e));

	drawLines();

	t_map.getViewport().removeEventListener('click', onmapclick, true);

}

function drawLines() {
	vector_source.clear();
	for (var i = 0; i < startPoints.length; i++) {

		if (startPoints[i] && endPoints[i]) {
			var feature = new ol.Feature();
			feature.setId(i);
			var startPoint = t_map.getCoordinateFromPixel(startPoints[i]);
			var endPoint = endPoints[i];
			feature.setStyle(new ol.style.Style({
				stroke : new ol.style.Stroke({
					color : colorValues[i],
					width : widthValues[i]
				})
			}));
			var lineString = new ol.geom.LineString([ [ startPoint[0], startPoint[1] ], [ endPoint[0], endPoint[1] ] ]);
			feature.setGeometry(lineString);
			vector_source.addFeatures([ feature ]);
		}
	}

}

function create_from(widthPercentage, heightPercentage) {
	var from_map_url = '/images/' + imageId + '/transformed/' + imageId + '.jpg';
	var extent = [ 0, 0, 3400, 2633 ];
	center = [ extent[2] / 2, extent[3] / 2 ];
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

	view = new ol.View({
		projection : projection,
		center : ol.extent.getCenter(extent),
		zoom : 0
	})

	f_map = new ol.Map({
		layers : [ imageLayer ],
		target : 'from_map',
		view : view
	});

	rotate.addEventListener('click', function() {

		var currentRotation = view.getRotation();
		var rotate = ol.animation.rotate({
			anchor : center,
			duration : 500,
			rotation : currentRotation
		});
		f_map.beforeRender(rotate);
		view.rotate(currentRotation + (Math.PI / 2), center);
	}, false);

}
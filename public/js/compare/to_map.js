function create_to() {
	var maxH = window.innerHeight;
	var münster = ol.proj.fromLonLat([ 7.624, 51.961 ]);
	var osm = new ol.layer.Tile({
		preload : 4,
		source : new ol.source.OSM()
	});
	var map = new ol.Map({
		layers : [ osm ],
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
			data[i] = data[i + 1] = data[i + 2] = (3 * data[i] + 4
					* data[i + 1] + data[i + 2]) / 8;
		}
		context.putImageData(image, 0, 0);
	});

}
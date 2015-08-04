function create_from() {
	// var from_map = document.getElementById('from_map');
	var maxH = window.innerHeight;
	console.log(maxH);

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

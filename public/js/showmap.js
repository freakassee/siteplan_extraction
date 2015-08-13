var edgesX, edgesY;

var projection = new ol.proj.Projection({
	code : 'xkcd-image',
	units : 'pixels',
	extent : extent
});

var imageLayer = new ol.layer.Image({
	
	source : new ol.source.ImageStatic({
		url : imageUrl,
		projection : projection,
		imageExtent : extent
	})

});

var vectorSource = new ol.source.Vector();

var drawLayer = new ol.layer.Vector({
	source : vectorSource,
	style : new ol.style.Style({
		
		fill : new ol.style.Fill({
			color : 'rgba(255, 255, 255, 0.2)'
		}),
		
		stroke : new ol.style.Stroke({
			color : '#ffcc33',
			width : 2
		}),
		
		image : new ol.style.Circle({
			radius : 7,
			fill : new ol.style.Fill({
				color : '#ffcc33'
			})
		})	
	})

});

var map = new ol.Map({
	layers : [ imageLayer, drawLayer ],
	target : 'map',
	view : new ol.View({
		
		projection : projection,
		center : ol.extent.getCenter(extent),
		zoom : 2
	})
});

vectorSource.on('addfeature', addFeature);

function addFeature(evt) {
	geometry = evt.feature.getGeometry();
	geometryType = geometry.getType();
	features = geometry.getCoordinates()[0];
	
	for (var int = 0; int < features.length - 1; int++) {
	
		var feature = features[int];
		console.log('Point ' + int + ' - X: ' + feature[0] + ' , Y: ' + (projection.getExtent()[3] - feature[1]));
		edgesX.push(feature[0]);
		edgesY.push(projection.getExtent()[3] - feature[1]);

	}
	edgesX.splice(0, 1);
	edgesY.splice(0, 1);
	map.removeInteraction(draw);
}

process.onclick = function(event) {
	console.log(edgesX);
	console.log(edgesY);
	
	var params = {
			X : edgesX,
			Y : edgesY,
			image : imageFile,
			img_id : img_id
	}
	var form = document.createElement("form");
	form.method = 'post';
	form.action = '/process';
	form.enctype = 'application/x-www-form-urlencoded';


	for ( var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement('input');
			hiddenField.type = 'hidden';
			hiddenField.name = key;
			hiddenField.value, params[key];
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit();

}

polygon.onclick = function(event) {

	vectorSource.clear();
	edgesX = [ 0 ];
	edgesY = [ 0 ];
	addInteraction();

}

function addInteraction() {
	var value = 'Polygon'
	
	draw = new ol.interaction.Draw({
		
		source : vectorSource,
		type : (value),
		maxPoints : 4
	});
	
	map.addInteraction(draw);
	
}
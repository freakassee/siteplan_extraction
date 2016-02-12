var express = require('express');
var sizeOf = require('image-size');



var router = express.Router();
var variables = require('../model/variables');

var uploadsWebDir = variables.uwd;
var uploadsServDir = variables.usd;

router.use(uploadsWebDir, express.static(uploadsServDir));

router.get('/showImage', function(req, res) {
	var query = req.query;
	if (req.query.imageId) {
		sizeOf(uploadsServDir + '/' + req.query.imageId + '.jpg', function(err, dimensions) {
			if (!err) {
				res.render('showImage', {
					url : uploadsWebDir + '/',
					img_id : query.imageId,
					img_file : query.imageId + '.jpg',
					img_width : dimensions.width,
					img_height : dimensions.height
				});
			} else {
				res.send('Die angeforderte Datei existiert nicht!');
			}
		});

	} else {
		res.send('Der "imageId" Parameter fehlt. Bitte tragen Sie diesen Wert in die URL ein.');
	}

});

module.exports = router;
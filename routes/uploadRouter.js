var multer = require('multer');
var sizeOf = require('image-size');
var express = require('express');
var fs = require('fs');
var router = express.Router();

var done = false;
var uploadsServDir = __dirname + '/uploads';

var variables = require('../model/variables');
var uploadsServDir = variables.usd;

var uploadsWebDir = variables.uwd;

router.use(uploadsWebDir, express.static(uploadsServDir));
router.use(multer({

	dest : uploadsServDir,
	rename : function(fieldname, filename) {
		console.log(fieldname);
		return Date.now();
	},
	onFileUploadComplete : function(file) {
		
		done = true;
	}
}));

/** Upload Section */
router.get('/upload', function(req, res) {
	res.render('upload', {
		content : 'Laden Sie hier bitte das Foto hoch'
	});
	res.end();
});

router.post('/upload', function(req, res) {
	if (done) {
		
		/**
		 * TODO Catch wrong Extensions Only .JPG and .PNG should be allowed
		 * Otherwise redirect to Upload Page
		 */

		var image_file = req.files.userImage;
		var image_name = image_file.name;
		var image_format = image_file.extension;

		var image_Id = image_name.replace('.' + image_format, '');

		if (image_format !== 'jpg') {
			fs.unlink(uploadsServDir + '/' + image_name, function(err) {
				if (err) {
					return console.error(err);
				} else {
					res.redirect('/start');
				}
			});
		} else {
			res.redirect('/showImage?imageId=' + image_Id);
		}

		
	}

});

module.exports = router;
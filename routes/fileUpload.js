var express = require('express');
var fs = require('fs');
var gm = require('gm').subClass({
	imageMagick : true
});
var config = require('../config');
var vars = require('../model/variables');
var router = express.Router();

router.get('/fileUpload', function(req, res) {
	res.render('fileUpload');
});

router.post('/fileUpload', function(req, res) {
	var tempPath = req.files.uploadfile.path;
	var targetPath = vars.UPLOADDIR + req.files.uploadfile.name;

	fs.rename(tempPath, targetPath, function(err) {
		if (err) {
			// res.send("Error found to upload file "+err);
			var msg = "Error found to upload file " + err;
			var type = "error";
		} else {
			var fileSize = req.files.uploadfile.size / 1024;
			var msg = "File uploaded to " + targetPath + " ("
					+ (fileSize.toFixed(2)) + " kb)";
			var type = "success";
			res.send(req.files.uploadfile.name);
		}
	});
});

router.get('/filelist', function(req, res) {
	fs.readdir(vars.THUMBNAILSDIR, function(err, list) {
		if (err) {
			throw err;
		}
		console.log("fileUpload:45: " + list)
		res.render('filelist', {
			fileList : list
		});
	});
});

router.get('/deleteFile/:file', function(req, res) {
	
	var targetPath = vars.UPLOADDIR + req.params.file;
	var targetPathThumbnail = vars.THUMBNAILSDIR + req.params.file; 
	fs.unlink(targetPath, function(err) {
		if (err) {
			res.send("Error to delete file: " + err);
		} else {
			fs.unlink(targetPathThumbnail, function(err) {
				if (err) {
					res.send("Error to delete Thumbnail file: " + err);
				} else {
					res.send("File deleted successfully!");
				}
			});
		}
	});
	
	
});

router.get('/createThumbnail', function(req, res) {
	if (req.query.target) {
		var target = req.query.target;
		var exec = require('child_process').exec;
		var fileWatcher = fs.watch(vars.THUMBNAILSDIR, function(event) {
			fs.readdir(vars.THUMBNAILSDIR, function(err, files) {
				console.log("fileUpload.65: " + files);
			});
			fileWatcher.close();
			res.end('Thumbnail sucessfully created!');
		});

		exec('gm convert ' + vars.UPLOADDIR + target + ' -resize 240x240 '
				+ vars.THUMBNAILSDIR + target, function(error, stdout, stderr) {
			if (error !== null) {
				// console.log("fileUpload.75: " + 'exec error: ' + error);
				res.end('Error in creating Thumbnail for image: ' + target)
			}
//			console.log("fileUpload.79: " + stdout);
//			console.log("fileUpload.80: " + stderr);
		});
	} else {
		res.end('');
	}
});

module.exports = router;
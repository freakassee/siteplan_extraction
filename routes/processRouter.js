var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;
var variables = require('../model/variables');

var router = express.Router();

router.post('/process', function(req, res) {

	var errorLog = variables.elog;
	var successLog = variables.slog;
	if (req.body.img_id && req.body.X && req.body.Y) {
		exec('cd model && matlab -nodisplay -nosplash -nodesktop -r image_name=\'' + 
				req.body.img_id + '.jpg\';process_image(image_name,['
				+ req.body.X + '],[' 
				+ req.body.Y + ']);exit;', 
				function(error, stdout, stderr) {

			var errorWatcher = fs.watch('./model/' + errorLog, function(event) {
				fs.readFile('./model/' + errorLog, function(err, data) {
					var dataString = data.toString();
					console.error(dataString);
					res.end(dataString);
				});
				successWatcher.close();
				errorWatcher.close();
			});

			var successWatcher = fs.watch('./model/' + successLog, function(event, next) {
				fs.readFile('./model/' + successLog, function(err, data) {
					res.redirect('/extracted_trn?imageId=' + req.body.img_id);
				});
				errorWatcher.close();
				successWatcher.close();

				// res.end('success');
			});
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	} else {
		res.end('Wrong Input');
	}
	// exec('cd model', function(error, stdout, stderr){
	//	
	//    
	//   
	// var successWatcher = fs.watch('./model/' + successLog, function(event,
	// next) {
	// console.log('test');
	// console.log('test2');
	// console.log(req);
	// console.log('test2');
	// fs.readFile('./model/' + successLog, function(err, data) {
	// res.redirect('/extracted_trn?imageId=' + req.body.img_id);
	// });
	// //errorWatcher.close();
	// successWatcher.close();
	//
	// });
	// if (error !== null) {
	// console.log('exec error: ' + error);
	// }
	//
	// });

});

module.exports = router;
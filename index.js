var express = require('express');
var fs = require('fs');
var multer = require('multer');
var sizeOf = require('image-size');
var bodyParser = require('body-parser');
var exec = require('child_process');

var app = express();
var done = false;
var uploadServDir = __dirname + '/uploads';
var uploadsWebDir = '/uploads';

app.use('/', express.static(__dirname + '/public'));
app.use('/styles', express.static(__dirname + '/public/stylesheets'));
app.use('/model', express.static(__dirname + '/model'));
app.use(uploadsWebDir, express.static(uploadServDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use('/image', express.static(__dirname + '/model/images'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/** Openlayers Section */

/** Upload Section */
app.get('/start', function(req, res) {
	res.render('upload', {
		content : 'Laden Sie hier bitte das Foto hoch'
	});
	res.end();
});

app.use(multer({
	// dest : './uploads',
	dest : uploadServDir,
	rename : function(fieldname, filename) {
		return Date.now();
	},
	onFileUploadStart : function(file) {
		// console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete : function(file) {
		// console.log(file.fieldname + ' uploaded to ' + file.path);
		done = true;
	}
}));

app.post('/upload', function(req, res) {
	if (done) {

		/**
		 * TODO Catch wrong Extensions Only .JPG and .PNG should be allowed
		 * Otherwise redirect to Upload Page
		 */

		var image_file = req.files.userImage;
		var image_name = image_file.name;
		var image_format = image_file.extension;

		var image_Id = image_name.replace('.' + image_format, '');

		// console.log(name);

		sizeOf(uploadServDir + '/' + image_name, function(err, dimensions) {
			if (!err) {
				res.redirect('/showmap?imageId=' + image_Id + '&format='
						+ image_format + '&width=' + dimensions.width
						+ '&height=' + dimensions.height);
			} else {
				res.send(err.toString());
			}
		});
	}
	// TODO try out
	// res.end();
});

app.get('/showmap', function(req, res) {
	query = req.query;
	if (query.imageId && query.format && query.width && query.height) {
		res.render('map', {
			url : uploadsWebDir + '/',
			img_id : query.imageId,
			img_file : query.imageId + '.' + query.format,
			img_width : query.width,
			img_height : query.height
		});

	} else {
		/**
		 * TODO send back error message and status code (see examples)
		 */
		res.send('One Parameter is missing. Verify that "imageId",'
				+ '"format", "width", as well as "height" are deed correctly.')
	}
	res.end();

});

/** Talking to MatLabs Section */
app.post('/process', function(req, res) {

	// console.log(req.body)

	exec.exec;
	//
	var errorLog = 'error.log';
	var successLog = 'success.log';
	// // var outputFile = 'primes.txt';
	//
	console.log(req.body.X);
	console.log(req.body.Y);

	exec('cd model && matlab -nodisplay -nosplash -nodesktop -r image_name=\''
			+ req.body.img_id + '.jpg\';process_image(image_name,['
			+ req.body.X + '],[' + req.body.Y + ']);exit;', function(error,
			stdout, stderr) {

		var errorWatcher = fs.watch('./model/' + errorLog, function(event) {
			fs.readFile('./model/' + errorLog, function(err, data) {
				var dataString = data.toString();
				console.error(dataString);
				res.end(dataString);
			});
			successWatcher.close();
			errorWatcher.close();
		});

		var successWatcher = fs.watch('./model/' + successLog, function(event,
				next) {
			fs.readFile('./model/' + successLog, function(err, data) {
				res.redirect('/extracted_rg?imageId=' + req.body.img_id)

			});
			errorWatcher.close();
			successWatcher.close();

			// res.end('success');
		});
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
});

app.get('/extracted_rg', function(req, res) {
	prepare(req,res,'extracted_rg');
});

app.get('/extracted_mt', function(req, res) {
	prepare(req,res,'extracted_mt');
});

app.get('/extracted_trn', function(req, res) {
	prepare(req,res,'extracted_trn');
});
app.get('/extracted_og', function(req, res) {
	prepare(req,res,'extracted_og');
//	var query = req.query;
//	var x_values = [];
//	var y_values = [];
//	var isSymbol_values = [];
//
//	var x_loaded = false;
//	var y_loaded = false;
//	var symbol_loaded = false;
//	if (query.imageId) {
//		fs.readFile('./public/images/' + query.imageId + '/data/x_values.txt',
//				function(err, data) {
//					if (!err) {
//						_parser(x_values, data);
//						x_loaded = true;
//						if (x_loaded && y_loaded && symbol_loaded) {
//							res.render('extracted_with_red', {
//								img_id : query.imageId,
//								x_values : x_values,
//								y_values : y_values,
//								isSymbol_values : isSymbol_values
//							});
//						}
//					} else {
//						console.log(err.toString());
//					}
//				});
//		fs.readFile('./public/images/' + query.imageId + '/data/y_values.txt',
//				function(err, data) {
//					if (!err) {
//						_parser(y_values, data);
//						y_loaded = true;
//						if (x_loaded && y_loaded && symbol_loaded) {
//							res.render('extracted_with_red', {
//								img_id : query.imageId,
//								x_values : x_values,
//								y_values : y_values,
//								isSymbol_values : isSymbol_values
//							});
//						}
//					} else {
//						console.log(err.toString());
//					}
//				});
//
//		fs.readFile('./public/images/' + query.imageId
//				+ '/data/isSymbol_values.txt', function(err, data) {
//			if (!err) {
//				_parser(isSymbol_values, data);
//				symbol_loaded = true;
//				if (x_loaded && y_loaded && symbol_loaded) {
//					res.render('extracted_with_red', {
//						img_id : query.imageId,
//						x_values : x_values,
//						y_values : y_values,
//						isSymbol_values : isSymbol_values
//					});
//				}
//			} else {
//				console.log(err.toString());
//			}
//		});
//	}
});

function prepare(req,res,jadeFile){
	var query = req.query;
	var x_values = [];
	var y_values = [];
	var isSymbol_values = [];

	var x_loaded = false;
	var y_loaded = false;
	var symbol_loaded = false;
	if (query.imageId) {
		fs.readFile('./public/images/' + query.imageId + '/data/x_values.txt',
				function(err, data) {
					if (!err) {
						_parser(x_values, data);
						x_loaded = true;
						if (x_loaded && y_loaded && symbol_loaded) {
							res.render(jadeFile, {
								img_id : query.imageId,
								x_values : x_values,
								y_values : y_values,
								isSymbol_values : isSymbol_values
							});
						}
					} else {
						console.log(err.toString());
					}
				});
		fs.readFile('./public/images/' + query.imageId + '/data/y_values.txt',
				function(err, data) {
					if (!err) {
						_parser(y_values, data);
						y_loaded = true;
						if (x_loaded && y_loaded && symbol_loaded) {
							res.render(jadeFile, {
								img_id : query.imageId,
								x_values : x_values,
								y_values : y_values,
								isSymbol_values : isSymbol_values
							});
						}
					} else {
						console.log(err.toString());
					}
				});

		fs.readFile('./public/images/' + query.imageId	+ '/data/isSymbol_values.txt', function(err, data) {
			if (!err) {
				_parser(isSymbol_values, data);
				symbol_loaded = true;
				if (x_loaded && y_loaded && symbol_loaded) {
					res.render(jadeFile, {
						img_id : query.imageId,
						x_values : x_values,
						y_values : y_values,
						isSymbol_values : isSymbol_values
					});
				}
			} else {
				console.log(err.toString());
			}
		});
	}
}

app.post('/resize',function(req,res){
	var query = req.body;
	var string = ''+query.isSymbol_values;
	var find = ',';
	var re = new RegExp(find, 'g');

	string = string.replace(re, '\n');
	fs.writeFile('./public/images/' + query.img_id	+ '/data/isSymbol_values.txt', string, 'utf-8', function (err) {
	      if (err) throw err;
	      res.redirect(query.pathname+'?imageId='+query.img_id);
	    });
	
});


app.listen(8080);

function _parser(arrayToFill, content) {
	var text = content.toString();

	var lines = text.split('\n');
	for (var i = 0; i < lines.length-1; i++) {
		arrayToFill[i] = lines[i];

	}
	//console.log(arrayToFill);
}
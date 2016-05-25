var express = require('express');
var fs = require('fs');



var bodyParser = require('body-parser');

var app = express();

//var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use('/', express.static(__dirname + '/public'));
app.use('/styles', express.static(__dirname + '/public/stylesheets'));
app.use('/model', express.static(__dirname + '/model'));
app.use('/openlayers', express.static(__dirname + '/node_modules/openlayers/dist'));
// app.use(uploadsWebDir, express.static(uploadServDir));



app.use('/image', express.static(__dirname + '/model/images'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/** Openlayers Section */

app.use('/', require('./routes/uploadRouter'))

app.use('/', require('./routes/showImageRouter'));

app.use('/', require('./routes/fileUpload'));

/** Talking to MatLabs Section */

app.use('/', require('./routes/processRouter'))

//app.get('/extracted_rg', function(req, res) {
//	prepare(req, res, 'extracted_rg');
//});
//
//app.get('/extracted_mt', function(req, res) {
//	prepare(req, res, 'extracted_mt');
//});

app.get('/extracted', function(req, res) {
	prepare(req, res, 'extracted');
});

//app.get('/extracted_og', function(req, res) {
//	prepare(req, res, 'extracted_og');
//});

function prepare(req, res, jadeFile) {
	var query = req.query;
	var x_values = [];
	var y_values = [];
	var isSymbol_values = [];
	var catIndex_values = [];

	var x_loaded = false;
	var y_loaded = false;
	var symbol_loaded = false;
	var catIndex_loaded = false;

	if (query.imageId) {
		fs.readFile('./public/images/' + query.imageId + '/data/catIndex_values.txt', function(err, data) {
			if (!err) {
				_parser(catIndex_values, data);
				catIndex_loaded = true;
				if (catIndex_loaded && x_loaded && y_loaded && symbol_loaded) {
					res.render(jadeFile, {
						img_id : query.imageId,
						x_values : x_values,
						y_values : y_values,
						isSymbol_values : isSymbol_values,
						catIndex_values : catIndex_values
					});
				}
			} else {
				console.log(err.toString());
			}
		});

		fs.readFile('./public/images/' + query.imageId + '/data/x_values.txt', function(err, data) {
			if (!err) {
				_parser(x_values, data);
				x_loaded = true;
				if (catIndex_loaded && x_loaded && y_loaded && symbol_loaded) {
					res.render(jadeFile, {
						img_id : query.imageId,
						x_values : x_values,
						y_values : y_values,
						isSymbol_values : isSymbol_values,
						catIndex_values : catIndex_values
					});
				}
			} else {
				console.log(err.toString());
			}
		});
		fs.readFile('./public/images/' + query.imageId + '/data/y_values.txt', function(err, data) {
			if (!err) {
				_parser(y_values, data);
				y_loaded = true;
				if (catIndex_loaded && x_loaded && y_loaded && symbol_loaded) {
					res.render(jadeFile, {
						img_id : query.imageId,
						x_values : x_values,
						y_values : y_values,
						isSymbol_values : isSymbol_values,
						catIndex_values : catIndex_values
					});
				}
			} else {
				console.log(err.toString());
			}
		});

		fs.readFile('./public/images/' + query.imageId + '/data/isSymbol_values.txt', function(err, data) {
			if (!err) {
				_parser(isSymbol_values, data);
				symbol_loaded = true;
				if (catIndex_loaded && x_loaded && y_loaded && symbol_loaded) {
					res.render(jadeFile, {
						img_id : query.imageId,
						x_values : x_values,
						y_values : y_values,
						isSymbol_values : isSymbol_values,
						catIndex_values : catIndex_values
					});
				}
			} else {
				console.log(err.toString());
			}
		});
	}
}

app.post('/resize', function(req, res) {
	var query = req.body;
	var string = '' + query.isSymbol_values;
	var find = ',';
	var re = new RegExp(find, 'g');

	string = string.replace(re, '\n');
	string = string + '\n';

	fs.writeFile('./public/images/' + query.img_id + '/data/isSymbol_values.txt', string, 'utf-8', function(err) {
		if (err) {
			throw err;
		}
		res.redirect(query.pathname + '?imageId=' + query.img_id);
	});

});

app.post('/reference', function(req, res) {
	var query = req.body;
	if (query.img_id && query.isSymbol_values) {
		var filePath = './public/images/' + query.img_id + '/data/';
		var content = _replaceCommaByLineBreak(query.isSymbol_values);

		fs.writeFile(filePath + 'isSymbol_values.txt', content, 'utf-8', function(err) {
			if (err) {
				throw err;
			}
			res.redirect(query.pathname + '?imageId=' + query.img_id);
		});
	} else {

		if (req.headers.referer) {
			res.redirect(req.headers.referer);
		} else {
			console.log(req.headers);
			res.status('404');
			res.send('Hier ist ein Fehler aufgetreten! Bitte starten Sie den Vorgang erneut, '
					+ 'indem Sie folgende URL in den Browser eingeben: \"' + req.headers.host + '/start\" ');
		}
	}
});

app.get('/reference', function(req, res) {
	var query = req.query;
	var isSymbol_values = [];
	var catIndex_values = [];

	var symbol_loaded = false;
	var catIndex_loaded = false;
	var proceedAdvanced = false;
	if (query.imageId) {
		var filePath = './public/images/' + query.imageId + '/data/';

		fs.readFile(filePath + 'catIndex_values.txt', function(err, data) {
			if (!err) {
				_parser(catIndex_values, data);
				catIndex_loaded = true;
				if (catIndex_loaded && symbol_loaded) {
					res.render('reference', {
						advanced : false,
						img_id : query.imageId,
						isSymbol_values : isSymbol_values,
						catIndex_values : catIndex_values
					});
				}
			} else {
				console.log(err.toString());
			}
		});

		// filePath Array for advanced route

		proceedAdvanced = _doFilesExist([ filePath + '_positions.txt', filePath + '_img_sources.txt', filePath + '_org_sources.txt',
				filePath + '_titles.txt', filePath + '_descriptions.txt' ]);

		// proceed with advanced
		if (proceedAdvanced) {
			var positions = [];
			var img_sources = [];
			var org_sources = [];
			var titles = [];
			var descriptions = [];
			var renderingJson = {
				catIndex_values : catIndex_values,
				advanced : true,
				img_id : query.imageId,
				positions : positions,
				img_sources : img_sources,
				org_sources : org_sources,
				titles : titles,
				descriptions : descriptions
			};
			var pos_loaded = false;
			var img_s_loaded = false;
			var org_s_loaded = false;
			var titles_loaded = false;
			var descr_loaded = false;

			fs.readFile(filePath + '_positions.txt', function(err, data) {
				if (!err) {
					_parser(positions, data);
					pos_loaded = true;
					renderingJson.positions = positions;
					if (catIndex_loaded && pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
						res.render('reference', renderingJson);
					}
				} else {
					console.log(err.toString());
				}
			});
			fs.readFile(filePath + '_img_sources.txt', function(err, data) {
				if (!err) {
					_parser(img_sources, data);
					img_s_loaded = true;
					renderingJson.img_sources = img_sources;
					if (catIndex_loaded && catIndex_loaded && pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
						res.render('reference', renderingJson);
					}
				} else {
					console.log(err.toString());
				}
			});
			fs.readFile(filePath + '_org_sources.txt', function(err, data) {
				if (!err) {
					_parser(org_sources, data);
					org_s_loaded = true;
					renderingJson.org_sources = org_sources;
					if (catIndex_loaded && pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
						res.render('reference', renderingJson);
					}
				} else {
				}
			});
			fs.readFile(filePath + '_titles.txt', function(err, data) {
				if (!err) {
					_parser(titles, data);
					titles_loaded = true;
					renderingJson.titles = titles;
					if (catIndex_loaded && pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
						res.render('reference', renderingJson);
					}
				} else {
					// console.log(err.toString());
				}
			});
			fs.readFile(filePath + '_descriptions.txt', function(err, data) {
				if (!err) {
					_parser(descriptions, data);
					descr_loaded = true;
					renderingJson.descriptions = descriptions;
					if (catIndex_loaded && pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
						res.render('reference', renderingJson);
					}
				} else {
				}
			});
		}
		// end of advanced proceeding
		// start of normal proceeding

		else {

			fs.readFile(filePath + 'isSymbol_values.txt', function(err, data) {
				if (!err) {
					_parser(isSymbol_values, data);
					symbol_loaded = true;
					if (catIndex_loaded && symbol_loaded) {
						res.render('reference', {
							advanced : false,
							img_id : query.imageId,
							isSymbol_values : isSymbol_values,
							catIndex_values : catIndex_values
						});
					}
				} else {
					console.log(err.toString());
				}
			});
		}

	}
});

app.post('/compare', function(req, res) {
	var query = req.body;
	var isWrittenArray = [];
	isWrittenArray.push(false, false, false, false);

	if (query.img_id && query.positions && query.img_sources && query.titles && query.descriptions) {

		var filePath = './public/images/' + query.img_id + '/data/';
		var path = '/compare/?imageId=' + query.img_id;
		fs.writeFile(filePath + '_positions.txt', _replaceCommaByLineBreak(query.positions), 'utf-8', function(err) {
			if (err) {
				throw err;
			}
			isWrittenArray[0] = true;
			_redirect(res, path, isWrittenArray);

		});

		fs.writeFile(filePath + '_img_sources.txt', _replaceCommaByLineBreak(query.img_sources), 'utf-8', function(err) {
			if (err) {
				throw err;
			}
			isWrittenArray[1] = true;
			_redirect(res, path, isWrittenArray);

		});
		fs.writeFile(filePath + '_titles.txt', _replaceCommaByLineBreak(query.titles), 'utf-8', function(err) {
			if (err) {
				throw err;
			}
			isWrittenArray[2] = true;
			_redirect(res, path, isWrittenArray);

		});
		fs.writeFile(filePath + '_descriptions.txt', _replaceCommaByLineBreak(query.descriptions), 'utf-8', function(err) {
			if (err) {
				throw err;
			}
			isWrittenArray[3] = true;
			_redirect(res, path, isWrittenArray);
		});
		if (query.org_sources) {
			fs.writeFile(filePath + '_org_sources.txt', _replaceCommaByLineBreak(query.org_sources), 'utf-8', function(err) {
				if (err) {
					throw err;
				}
			});
		}
	}

});

app.get('/compare', function(req, res) {
	var query = req.query;

	if (query.imageId) {
		var filePath = './public/images/' + query.imageId + '/data/';

		var positions = [];
		var img_sources = [];
		var org_sources = [];
		var titles = [];
		var descriptions = [];
		var renderingJson = {
			img_id : query.imageId,
			positions : positions,
			img_sources : img_sources,
			org_sources : org_sources,
			titles : titles,
			descriptions : descriptions
		};
		var pos_loaded = false;
		var img_s_loaded = false;
		var org_s_loaded = false;
		var titles_loaded = false;
		var descr_loaded = false;

		fs.readFile(filePath + '_positions.txt', function(err, data) {
			if (!err) {
				_parser(positions, data);
				pos_loaded = true;
				renderingJson.positions = positions;
				if (pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
					res.render('compare', renderingJson);
				}
			} else {
				console.log(err.toString());
			}
		});
		fs.readFile(filePath + '_img_sources.txt', function(err, data) {
			if (!err) {
				_parser(img_sources, data);
				img_s_loaded = true;
				renderingJson.img_sources = img_sources;
				if (pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
					res.render('compare', renderingJson);
				}
			} else {
				console.log(err.toString());
			}
		});
		fs.readFile(filePath + '_org_sources.txt', function(err, data) {
			if (!err) {
				_parser(org_sources, data);
				org_s_loaded = true;
				renderingJson.org_sources = org_sources;
				if (pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
					res.render('compare', renderingJson);
				}
			} else {
				console.log(err.toString());
			}
		});
		fs.readFile(filePath + '_titles.txt', function(err, data) {
			if (!err) {
				_parser(titles, data);
				titles_loaded = true;
				renderingJson.titles = titles;
				if (pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
					res.render('compare', renderingJson);
				}
			} else {
				console.log(err.toString());
			}
		});
		fs.readFile(filePath + '_descriptions.txt', function(err, data) {
			if (!err) {
				_parser(descriptions, data);
				descr_loaded = true;
				renderingJson.descriptions = descriptions;
				if (pos_loaded && img_s_loaded && org_s_loaded && titles_loaded && descr_loaded) {
					res.render('compare', renderingJson);
				}
			} else {
				console.log(err.toString());
			}
		});

	}

});

app.get('/close', function(req, res) {
	res.set({
		'content-type' : 'text/text; charset=utf-8'
	});
	res.end('Bitte jetzt den Browser schließen und dann auf Weiter klicken!');
});

app.listen(9090);

function _parser(arrayToFill, content) {
	var text = content.toString();

	var lines = text.split('\n');
	for (var i = 0; i < lines.length - 1; i++) {
		arrayToFill[i] = lines[i];

	}
}

function _redirect(response, redirectPath, boolArray) {
	if (boolArray instanceof Array && boolArray.length > 0 && boolArray.indexOf(false) === -1) {
		response.redirect(redirectPath);
	}
}

function _replaceCommaByLineBreak(queryString) {
	var string = '' + queryString;
	var find = ',';
	var re = new RegExp(find, 'g');

	string = string.replace(re, '\n');
	string = string + '\n';

	return string;
}

function _doFilesExist(pathToFilesArray) {
	var returnValue = true;
	for (var i = 0; i < pathToFilesArray.length; i++) {
		try {
			fs.statSync(pathToFilesArray[i]);

		} catch (err) {
			returnValue = false;
		}
		if (!returnValue) {
			break;
		}

	}
	return returnValue;
}
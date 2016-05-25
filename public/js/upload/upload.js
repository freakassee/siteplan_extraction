document.addEventListener('DOMContentLoaded', function() {
	_loadAvailableFiles();
});

function fileChange() {
	var fileList = addFileButton.files;
	var file = fileList[0];
	if (document.getElementById('thumb')) {
		var thumb_temp = document.getElementById('thumb');
		thumb_temp.remove();
		info.innerHTML = '';
	}

	var thumb = document.createElement('img');
	thumb.id = 'thumb';
	thumb.hidden = true;
	var reader = new FileReader();

	if (!file) {
		return;
	}

	if (!file.type.match('image.jpeg')) {
		Notifier.error('Datei ist nicht vom Typ', 'Achtung');
		uploadForm.reset();
		return;
	}

	fadeEffect.init('progress', null, 1);
	progressbar.style.color = '#000'

	reader.onload = (function(tImg) {
		return function(e) {

			tImg.src = e.target.result;

		};
	})(thumb);

	thumb.onload = (function(event) {

		var percent_w = 500;
		var percent_h = 500;
		var w = thumb.width;
		var h = thumb.height;
		var factor = percent_h / h;
		if (thumb.width * factor > percent_w) {
			factor = percent_w / w;
		}
		
		thumb.style.width = thumb.width * factor + 'px';
		thumb.style.height = thumb.height * factor + 'px';
		thumb.hidden = false;
		info.innerHTML = 'Datei: <b>' + file.name + '</b>. Größe: <b>'
				+ file.size + '</b> Bytes. ';
		
		var percent_w2 = window.innerWidth*0.85;
		var percent_h2 = window.innerHeight*0.85;

		var factor2 = percent_h2 / h;
		if (w * factor2 > percent_w2) {
			factor2 = percent_w2 / w;
		}
		overlayIMG.style.width= w * factor2 + 'px';
 	 	overlayIMG.style.height= h * factor2 + 'px';
  		
  		overlayIMG.src = thumb.src;
  		_myCallback();
	});
	
	
	reader.readAsDataURL(file);
	wrapper.innerHtml = '';
	wrapper.appendChild(thumb);
	info.style.display = 'inline-block';

}
function _myCallback(){
	upl.disabled = !upl.disabled;
}

function add() {
	cancelUpload();
	addFileButton.click();
}

function uploadImage() {
	var formData = new FormData();
	if (addFileButton.value == '') {
		alert('Please choose file!');
		return false;
	}

	var file = document.getElementById('addFileButton').files[0];
	formData.append('uploadfile', file);
	var xhr = new XMLHttpRequest();
	progressbar.style.color = '#fff'
	xhr.open('post', 'fileUpload/', true);
	
	xhr.onloadstart = function(e){
	 	_myCallback();	
	};
	xhr.upload.onprogress = function(e) {
		
		if (e.lengthComputable) {
			var percentage = (e.loaded / e.total) * 100;
			progressbar.style.width = percentage.toFixed(0) + '%';
			progressbar.innerHTML = percentage.toFixed(0) + '%';
		}

	};
	xhr.onerror = function(e) {
		alert('An error occurred while submitting the form. Maybe your file is too big');
	};

	xhr.onload = function(e) {
		var file = xhr.responseText;
		Notifier.success('File uploaded successfully!');

	};

	xhr.onloadend = function(event) {
		var target = event.target.responseText;
		// console.log(new Date().toTimeString());
		httpGetAsync('createThumbnail?target=' + target, function() {
			setTimeout(function() {
				progressbar.style.width = 0 + '%';
				progressbar.innerHTML = 0 + '%';
				// console.log(new Date().toTimeString());
			}, 2500);
		});
	}
	addFileButton.value='';
	xhr.send(formData);
	
}

function showMsg(className, msg) {

	// $('#msg').fadeIn();
	// showMsg('alert alert-success', 'File uploaded successfully!')
	// $('#msg').addClass(className);
	// $('#msg').html(msg);
	// $('#msg').fadeOut(3000, function() {
	// $('#msg').removeClass(className);
	// });
	$('#files').load('filelist');

}

function cancelUpload() {
	uploadForm.reset();
	// info.hidden = true;
	//
	// info.innerHTML = '';
	// if (thumbnail.hasChildNodes()) {
	// thumb.remove();
	// }
}

function _loadAvailableFiles() {
	var xhttpr = new XMLHttpRequest();
	xhttpr.onload = function() {
		files.innerHTML = this.responseText;
	};
	xhttpr.open('get', 'filelist/', true);
	xhttpr.send();

	$(document).on('click', '#delete', function() {
		$(this).attr('href', 'javascript:void(0)');
		$(this).html('deleting..');
		;
		var file = $(this).attr('file');
		$.ajax({
			url : 'deleteFile/' + file,
			type : 'GET',
			data : {},
			success : function(res) {
				showMsg('alert alert-danger', 'File deleted successfully!')
			}
		});
	});

}

var fadeEffect = function() {
	return {
		init : function(id, callback, flag, target) {
			this.elem = document.getElementById(id);
			clearInterval(this.elem.si);
			callback = callback || 50;
			if (target) {
				this.target = target
			} else if (flag) {
				this.target = 100;
			} else {
				this.target = 0;
			}
			this.flag = flag || -1
			if (this.elem.style.opacity) {
				this.alpha = parseFloat(this.elem.style.opacity * 100);
			} else {
				this.alpha = 0;
			}
			this.elem.si = setInterval(function() {
				fadeEffect.between();
			}, callback);
		},
		between : function() {
			if (this.alpha == this.target) {
				clearInterval(this.elem.si);
			} else {
				var value = Math.round(this.alpha
						+ ((this.target - this.alpha) * .05))
						+ (1 * this.flag);
				this.elem.style.opacity = value / 100;
				this.elem.style.filter = 'alpha(opacity=' + value + ')';
				this.alpha = value;
			}
		}
	}
}();

function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback();
		}
	}
	xmlHttp.open('GET', theUrl, true);
	xmlHttp.send(null);
	xmlHttp.onload = function(e) {
		$('#files').load('filelist');

		setTimeout(function() {
			fadeEffect.init('progress', null, 0);
		}, 1000);
	}
}

function toggleDisplay() {
	var hide = 'toggle-icon-cog-hide';
	var show =  'toggle-icon-cog'; 
	if (prev.style.display !== 'none') {
		prev.style.display = 'none';
		toggle_btn.innerText = 'Lagepläne anzeigen';
	} else {
		prev.style.display = 'block';
		
		toggle_btn.innerText = 'Lagepläne ausblenden';
	}

	if(toggle_btn.classList.contains(show)){
			 toggle_btn.className = toggle_btn.className.replace(show, hide);
		}else if(toggle_btn.classList.contains(hide)){
			 toggle_btn.className = toggle_btn.className.replace(hide,show);

		}
}

function toggleOverlay() {
	
 	if (overlay.style.visibility == 'visible') {
 		overlay.style.visibility = 'hidden';
 		document.removeEventListener('click',_hideOverlayAfterOutsideClick);
 	} else {
 		
 		
 		overlay.style.visibility = 'visible';
 		document.addEventListener('click',_hideOverlayAfterOutsideClick);

 	}
	
	
}

function _hideOverlayAfterOutsideClick(event){
	console.warn(event);
	if(event.target === overlay){
		toggleOverlay()
	}

}
function addListeners() {
	document.getElementById('vertical_handler').addEventListener('mousedown',
			mouseDown, false);
	window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
	window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
	window.addEventListener('mousemove', divMove, true);
	e.preventDefault();
}

function divMove(e) {

	var x = window.innerWidth - e.clientX - 50;
	var ratio = x / window.innerWidth * 100;
	if (ratio > 30 && ratio < 78) {
		var vertical_handler = document.getElementById('vertical_handler');
		var leftContainer = document.getElementById('leftContainer');
		var rightContainer = document.getElementById('rightContainer');
		var s_pic = document.getElementById('selectedPicture');
		var selected = document.getElementById('selected');
		var fields = s_pic.getElementsByClassName('titleDescr');
		
		vertical_handler.style.top = 0;
		vertical_handler.style.left = e.clientX;

		leftContainer.style.width = e.clientX - 25 + 'px';
		rightContainer.style.width = window.innerWidth - e.clientX - 50 + 'px';

		if (fields.length == 2) {
			fields[0].style.height = selected.height * 0.17 + 'px';
			fields[1].style.height = selected.height * 0.17 + 'px';
		}

	}

}
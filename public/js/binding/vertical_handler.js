function addListeners() {
	document.getElementById('verticalSideBar').addEventListener('mousedown',
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
	
	var x = window.innerWidth -e.clientX -50;
	var xt = x/window.innerWidth*100;
	//console.log(xt);
	if(xt>30&&xt<78){
		var verticalSideBar = document.getElementById('verticalSideBar');
		var leftContainer = document.getElementById('leftContainer'); 
		var rightContainer = document.getElementById('rightContainer');
	
		verticalSideBar.style.top = 0;

	
		verticalSideBar.style.left = e.clientX;
	
		leftContainer.style.width = e.clientX -25 +'px';
	
		rightContainer.style.width = window.innerWidth -e.clientX -50 +'px';
	

	
}
	
}
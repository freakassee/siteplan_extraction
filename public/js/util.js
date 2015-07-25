Array.prototype.equals = function(array, strict) {
	if (!array)
		return false;

	if (arguments.length == 1)
		strict = true;

	if (this.length != array.length)
		return false;

	for (var i = 0; i < this.length; i++) {
		if (this[i] instanceof Array && array[i] instanceof Array) {
			if (!this[i].equals(array[i], strict))
				return false;
		} else if (strict && this[i] != array[i]) {
			return false;
		} else if (!strict) {
			return this.sort().equals(array.sort(), true);
		}
	}
	return true;
}

function init( imageId) {
	window.onload = function() {
		//debugger;
		createDocument(imageId,x_values, y_values, isSymbol_values);
	}
	window.onresize = function() {
		waitForFinalEvent(function() {
			if (originIsSymbol.equals(isSymbol_values, true)) {
				location.reload();
			} else {
				
				createHiddenFormAndSubmit(location.pathname, imageId, false);
			}
		}, 50, "resizing");
	};
}

var waitForFinalEvent = (function() {
	var timers = {};
	return function(callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout(timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

function roundDown(number, decimals) {
	decimals = decimals || 0;
	return (Math.floor(number * Math.pow(10, decimals)) / Math
			.pow(10, decimals));
}

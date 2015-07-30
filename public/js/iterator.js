var createIteratorFor = function(collection) {
	var agg = (function(collection) {
		var index = 0;
		var length = collection.length;
		return {
			next : function() {

				if (!this.hasNext()) {

					index = 0;
					return collection[index];
				} else {

					index = index + 1;
					return collection[index];
				}
			},
			previous : function() {
				if (!this.hasPrevious()) {

					index = length - 1;
					return collection[index];
				} else {

					index = index - 1;
					return collection[index];
				}
			},
			hasNext : function() {
				return index < length - 1;
			},
			hasPrevious : function() {
				return index > 0;
			},
			rewind : function() {
				index = 0;
			},
			current : function() {
				return collection[index];
			}
		};
	})(collection);

	return agg;
};
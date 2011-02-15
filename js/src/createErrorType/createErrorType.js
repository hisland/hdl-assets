function createErrorType(name) {
	if (typeof window[name] == "undefined") {
		var error = window[name] = function(message) {
			this.message = message;
		};
		error.prototype = new window.Error;
		error.prototype.name = name;
	}
};
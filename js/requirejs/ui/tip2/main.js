define(['jquery', 'kissy', './calendar'], function($, S, Calendar){
	return {
		init: function(config){
			return new Calendar(config);
		}
	};
});
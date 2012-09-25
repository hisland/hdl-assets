define(['jquery', 'kissy', './grid'], function($, S, Grid){
	return {
		init: function(config){
			return new Grid(config);
		}
	};
});
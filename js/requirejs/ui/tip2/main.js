define(['jquery', 'kissy', './tip'], function($, S, Tip){
	return {
		init: function(config){
			return new Tip(config);
		}
	};
});
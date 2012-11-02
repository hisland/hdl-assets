define(['jquery', 'kissy', './calendar'], function($, S, Calendar){

var cal = new Calendar();

return {
	init: function(config){
		return {
			attach: function(target) {
				cal.setConfig(config);
				return this;
			}
		}
	}
};

});
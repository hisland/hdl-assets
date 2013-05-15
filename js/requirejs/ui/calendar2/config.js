define(['jquery'], function($){

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
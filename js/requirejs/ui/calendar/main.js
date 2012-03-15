/**
 * 
 */

define(['./calendar'], function(Calendar){
	return {
		init: function(setting){
			var calendar = new Calendar(setting);
			return calendar;
		}
	};
});

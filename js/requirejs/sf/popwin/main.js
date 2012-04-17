/**
 * 
 */

define(['./popwin'], function(Popwin){
	return {
		init: function(setting){
			return new Popwin(setting);
		}
	};
});

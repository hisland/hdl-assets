/**
 * 
 */

define(['./audit'], function(Audit){
	return {
		init: function(setting){
			return new Audit(setting);
		}
	};
});

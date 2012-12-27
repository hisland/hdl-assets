/**
 * 
 */

define(['./report'], function(Report){
	return {
		init: function(setting){
			return new Report(setting);
		}
	};
});

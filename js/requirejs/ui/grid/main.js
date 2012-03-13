/**
 * 
 */

define(['./grid'], function(Grid){
	return {
		/**
		 * 
		 */
		init: function(setting){
			return new Grid(setting);
		}
	};
});
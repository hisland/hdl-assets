/**
 * 
 */

define(['./compare'], function(Compare){
	return {
		init: function(a, b){
			return new Compare(a, b);
		}
	};
});

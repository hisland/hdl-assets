/**
 * 
 */

define(['./tree'], function(Tree){
	return {
		init: function(data){
			return new Tree(data);
		}
	};
});

/**
 * @namespace Pager
 * @memberOf ui
 */

define(['./pager-ajax'], function(Ajax){
	return {
		init: function(){
			return new P();
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		ajax: function(url, param){
			return new Ajax(url, param);
		}
	};
});

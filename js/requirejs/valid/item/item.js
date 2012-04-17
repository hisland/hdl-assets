/**
 * 
 */
define(['jquery', 'kissy'], function($, S){
	/**
	 * @class
	 */
	function Item(){}

	/**
	 * @lends Item#
	 */
	S.augment(Item, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		onCheck: function(fn){
			$(this).on('oncheck', fn);
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setMessage: function(msg){
			this.msg = msg;
		}
	});

	return Item;
});

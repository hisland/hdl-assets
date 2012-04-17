/**
 * 
 */
define(['jquery', 'kissy', './item'], function($, S, I){
	/**
	 * @class
	 */
	function Item(from, to, msg){
		if(!to){
			to = from;
			from = 0;
		}
		this.setFrom(from);
		this.setTo(to);
		this.setMsg(msg);
	}

	/**
	 * @lends Item#
	 */
	S.augment(Item, I, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		check: function(str){
			var rs = false, len = str.length;
			if(len <= to && len >= from){
				rs = true;
			}
			$(this).trigger('oncheck', [rs]);
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setFrom: function(len){
			this.from = len;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setTo: function(len){
			this.to = len;
		}
	});

	return Item;
});

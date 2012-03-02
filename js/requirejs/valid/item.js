/**
 * 
 */
define(['jquery', 'kissy', './rule'], function($, S, Rule){
	/**
	 * @class
	 */
	function Item(rule){
		
	}

	/**
	 * @lends Item#
	 */
	S.augment(Item, {
		valid: function(){
			var rs = true, str = $(this.selector).val();
			if(this.attached){
				S.each(this.rules, function(v, i, o){
					if(Rule.test(v)){
						
					}
				});
			}
			return rs;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		check: function(){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		onCheck: function(rs){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setMessage: function(msg){
			
		}
	});

	return Item;
});

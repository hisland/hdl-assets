/**
 * 
 */
define(['jquery', 'kissy', 'jquery-plugin'], function($, S){
	/**
	 * @class
	 */
	function Item(name, str){
		this.attached = false;
		this.selector = null;
		this.rules = [];
	}

	/**
	 * @lends Item#
	 */
	S.augment(Item, {
		attach: function(selector){
			this.selector = selector || this.selector;
			this.attached = true;
			$(this.selector).on('input', this, this.__input);
		},
		detach: function(){
			$(this.selector).off('input', this.__input);
			this.attached = false;
			this.selector = null;
		},
		add: function(rule){
			
		},
		valid: function(){
			if(!this.attached){
				return true;
			}
		},
		__input: function(e){
			
		}
	});

	return Item;
});

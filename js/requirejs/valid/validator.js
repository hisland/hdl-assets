/**
 * 验证工具主模块
 */
define(['kissy', './rule', './item'], function(S, Rule, Item){
	/**
	 * 
	 */
	function Validator(){
		
	}

	/**
	 * 
	 */
	S.augment(Validator, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__init: function(){
			
		},
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
		/**
		 * 
		 * @param 
		 * @return 
		 */
		get: function(index){
			
		},
		check: function(){
			if(!this.attached){
				return true;
			}
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		onCheck: function(fn){
			fn ? $(this).on('check', fn) : $(this).trigger('check', [false]);
		}
	});

	return Validator;
});

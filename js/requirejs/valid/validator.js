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
		add: function(item){
			
		},
		valid: function(){
			if(!this.attached){
				return true;
			}
		}
	});

	return Validator;
});

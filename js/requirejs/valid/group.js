/**
 * 
 */
define(['jquery', 'kissy', './rule'], function($, S, Rule){
	/**
	 * @class
	 */
	function Group(){
		this.attached = false;
		this.selector = null;
		this.items = {};
	}

	/**
	 * @lends Group#
	 */
	S.augment(Group, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__init: function(){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		attach: function(){
			this.attached = true;
			$(this.selector).on('input', this, this.__input);
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		detach: function(){
			$(this.selector).off('input', this.__input);
			this.attached = false;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setSelecotr: function(selector){
			this.selector = selector;
		},
		rule: function(name, msg){
			if(Rule.getItem(name)){
				
			}
		},
		/**
		 * 字符长度
		 * @param len Number
		 * @return this
		 */
		charlen: function(len, msg){
			
		},
		/**
		 * 字符UTF8长度
		 * @param len Number
		 * @return this
		 */
		utf8len: function(len, msg){
			
		},
		/**
		 * 
		 * @param from
		 * @param to
		 * @return 
		 */
		intRange: function(from, to, msg){
			
		},
		/**
		 * 
		 * @param from
		 * @param to
		 * @param digit
		 * @return 
		 */
		numberRange: function(from, to, digit, msg){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		reg: function(reg, msg){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		fn: function(fn, msg){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		trimBefore: function(state, msg){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		required: function(state, msg){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		gt: function(selector, trigger){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		lt: function(selector, trigger){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		eq: function(selector){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		neq: function(selector){
			
		},
		check: function(){
			var rs = true;
			if(this.attached){
				S.each(this.items, function(v, i, o){
					if(Rule.test(v.rule, str)){
						
					}
				});
			}
			return rs;
		},
		__input: function(e){
			var group = e.data, str = this.value;
		}
	});

	return Group;
});

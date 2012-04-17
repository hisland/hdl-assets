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
		this.items = [];
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
		attach: function(selector){
			this.detach();
			this.attached = true;
			this.selector = selector;
			$(this.selector).on('input', this, this.__input);
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		detach: function(){
			$(this.selector).off('input', this.__input);
			this.attached = false;
			return this;
		},
		rule: function(name, msg){
			if(Rule.getItem(name)){
				
			}
			return this;
		},
		/**
		 * 字符长度
		 * @param len Number
		 * @return this
		 */
		len: function(len, msg){
			
			return this;
		},
		/**
		 * 字符UTF8长度
		 * @param len Number
		 * @return this
		 */
		utf8len: function(len, msg){
			
			return this;
		},
		/**
		 * 
		 * @param from
		 * @param to
		 * @return 
		 */
		intRange: function(from, to, msg){
			
			return this;
		},
		/**
		 * 
		 * @param from
		 * @param to
		 * @param digit
		 * @return 
		 */
		numberRange: function(from, to, digit, msg){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		reg: function(reg, msg){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		fn: function(fn, msg){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		trimBefore: function(state, msg){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		required: function(state, msg){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		gt: function(selector, trigger){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		lt: function(selector, trigger){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		eq: function(selector){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		neq: function(selector){
			
			return this;
		},
		check: function(str){
			var rs = true;
			if(this.attached){
				S.each(this.items, function(v, i, o){
					if(Rule.test(v.rule, str)){
						
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
		get: function(idx){
			return this.items[idx];
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		del: function(idx){
			this.items.splice(idx, 1);
			return this;
		},
		__input: function(e){
			e.data.check(this.value);
		}
	});

	Group.init = function(selector){
		return (new Group()).attach(selector);
	}

	return Group;
});

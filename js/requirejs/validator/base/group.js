/**
 * 
 */
define(['jquery', 'kissy', '../msg', './rule-pre', 'util'], function($, S, MSG, Rule, Util){
	/**
	 * @class
	 */
	function Group(config){
		this.attached = false;
		this.selector = null;
		this.items = [];
	}

	/**
	 * @lends Group#
	 */
	S.augment(Group, {
		/**
		 * 增加使用预定义的规则的项 @see Rule
		 * @param name String
		 * @param msg String
		 * @return this
		 */
		rule: function(name, msg){
			if(Rule.getItem(name)){
				this.items.push({
					fn: function(str){
						return Rule.test(name, str);
					},
					msg: msg || Rule.getDesc(name)
				});
			}else{
				S.log('rule not found: ' + name);
			}
			return this;
		},
		/**
		 * 增加字符长度范围
		 * @param from Int
		 * @param to Int
		 * @param msg String
		 * @return this
		 */
		len: function(from, to, msg){
			this.items.push({
				fn: function(str){
					this.len = str.length;
					if(this.len >= this.from && this.len <= this.to){
						return true;
					}else{
						return false;
					}
				},
				msg: msg || MSG.group.len,
				from: from,
				to: to,
				len: 0
			});
			return this;
		},
		/**
		 * 增加字符UTF8长度范围
		 * @param from Int
		 * @param to Int
		 * @param msg String
		 * @return this
		 */
		utf8len: function(from, to, msg){
			this.items.push({
				fn: function(str){
					this.len = Util.lengthUTF8(str);
					if(this.len >= this.from && this.len <= this.to){
						return true;
					}else{
						return false;
					}
				},
				msg: msg || MSG.group.utf8len,
				from: from,
				to: to,
				len: 0
			});
			return this;
		},
		/**
		 * 增加整数范围验证
		 * @param from Int
		 * @param to Int
		 * @param msg String
		 * @return this
		 */
		intRange: function(from, to, msg){
			this.items.push({
				fn: function(str){
					if(/^\d+$/.test(str)){
						str -= 0;
						if(str >= from && str <= to){
							return true;
						}else{
							return false;
						}
					}else{
						return false;
					}
				},
				msg: msg || MSG.group.intRange,
				from: from,
				to: to
			});
			return this;
		},
		/**
		 * 增加小数范围验证
		 * @param from Int
		 * @param to Int
		 * @param digit Int 小数位数
		 * @param msg String
		 * @return this
		 */
		numberRange: function(from, to, digit, msg){
			
			return this;
		},
		/**
		 * 增加正则验证
		 * @param reg RegExp
		 * @param msg String
		 * @return this
		 */
		reg: function(reg, msg){
			this.items.push({
				fn: function(str){
					return reg.test(str);
				},
				msg: msg || MSG.group.reg
			});
			return this;
		},
		/**
		 * 增加函数验证
		 * @param reg Function
		 * @param msg String
		 * @return this
		 */
		fn: function(fn, msg){
			this.items.push({
				fn: function(str){
					return fn(str, $(this.selector));
				},
				msg: msg || MSG.group.fn
			});
			return this;
		},
		/**
		 * 验证前trim
		 * @param state Boolean
		 * @param msg String
		 * @return this
		 */
		trimBefore: function(state, msg){
			
			return this;
		},
		/**
		 * 此项是否必填
		 * @param state Boolean
		 * @param msg String
		 * @return this
		 */
		required: function(state, msg){
			
			return this;
		},
		/**
		 * 大于验证
		 * @param selector String|jQuery|DOM
		 * @param msg String
		 * @param trigger 'single'|'double' 单向或双向触发验证
		 * @return this
		 */
		gt: function(selector, msg, trigger){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		lt: function(selector, msg, trigger){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		eq: function(selector, msg, trigger){
			
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		neq: function(selector, msg, trigger){
			
			return this;
		},
		/**
		 * 获得验证项
		 * @param idx Int
		 * @return Item
		 */
		get: function(idx){
			return this.items[idx];
		},
		/**
		 * 删除一个验证项
		 * @param idx Int
		 * @return this
		 */
		del: function(idx){
			this.items.splice(idx, 1);
			return this;
		},
		/**
		 * 检测传入的字符串
		 * @param str String
		 * @return true|false
		 */
		check: function(str){
			var rs = true;
			S.each(this.items, function(v, i, o){
				i = v.fn(str);
				//返回值为文本提示信息
				if(S.isString(i)){
					v.msg = i;
				}
				//返回值不为true表示验证失败
				if(i !== true){
					rs = false;
					v.pass = false;
				}else{
					v.pass = true;
				}
			});

			this.pass = rs;
			$(this).trigger('oncheck', [rs]);
			return rs;
		},
		/**
		 * 添加检测时的回调函数
		 * @param fn Function
		 * @return this
		 */
		onCheck: function(fn){
			if(S.isFunction(fn)){
				$(this).on('oncheck', fn);
			}
			return this;
		}
	});

	Group.init = function(config){
		return new Group(config);
	}

	return Group;
});

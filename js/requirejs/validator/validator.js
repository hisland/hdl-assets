/**
 * 验证工具主模块
 */
define(['kissy', './base/rule-pre'], function(S, Rule){
	/**
	 * 
	 */
	function Validator(config){
		this.attached = false;
		this.selector = null;
		this.items = [];
	}

	/**
	 * 
	 */
	S.augment(Validator, {
		attach: function(selector){
			this.detach();
			this.attached = true;
			this.selector = selector || this.selector;
			$(this.selector).on('submit', this, this.__submit);
			return this;
		},
		detach: function(){
			$(this.selector).off('submit', this.__submit);
			this.attached = false;
			return this;
		},
		/**
		 * 增加一个验证组或者函数
		 * @param Group|Function
		 * @return this
		 */
		add: function(group){
			this.items.push(group);
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
		 * 
		 * @param 
		 * @return 
		 */
		check: function(){
			var rs = true, focused = false;
			S.each(this.items, function(v, i, o){
				if(S.isFunction(v)){
					i = v();
				}else{
					i = v.check();
				}

				if(!i && rs){
					$(v.selector).focus();
					rs = false;
					return false;
				}
			});
			$(this).trigger('oncheck', [rs]);
			return rs;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		onCheck: function(fn){
			if(S.isFunction(fn)){
				$(this).on('oncheck', fn);
			}
			return this;
		},
		/**
		 * 通过回调
		 * @param 
		 * @return 
		 */
		onPass: function(fn){
			this.onCheck(function(e, rs){
				if(rs){
					fn.call(this);
				}
			});
			return this;
		},
		/**
		 * 失败回调
		 * @param 
		 * @return 
		 */
		onFail: function(fn){
			this.onCheck(function(e, rs){
				if(!rs){
					fn.call(this);
				}
			});
			return this;
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__submit: function(e){
			e.preventDefault();
			e.data.check();
		}
	});

	return Validator;
});

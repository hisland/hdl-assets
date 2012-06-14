define(['jquery', 'kissy', 'util/laterFn'], function($, S, LaterFn){
	/**
	 * @lends ui.Popwin#
	 */
	var Proto = {
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		search: function(str){
			var me = this;
			this.delayReq.load(this.config.url, this.config.data, function(rs){
				me.refreshData($.parseJSON(rs));
			});
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		refreshData: function(data){
			
		},
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		attach: function(selector){
			this.detach();
			this.attached = true;
			this.selector = selector || this.selector;
			$(this.selector).on('input', this, this.__input);
			$(this.selector).on('focus', this, this.__focus);
			return this;
		},
		detach: function(){
			$(this.selector).off('input', this.__input);
			$(this.selector).off('focus', this, this.__focus);
			this.attached = false;
			return this;
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__input: function(e){
			e.data.search(this.value);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__focus: function(e){
			var ac = e.data;
			ac.popup.align(this).show();

			setTimeout(function(){
				ac.popup.$div.one('outerclick', function(){
					ac.popup.hide();
				});
			}, 100);
		}
	};

	return function(o){
		S.mix(o, Proto);
		return o;
	};
});
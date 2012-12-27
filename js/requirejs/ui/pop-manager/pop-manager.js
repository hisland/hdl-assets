/**
 * 
 */

define(['jquery', 'kissy', './focus-check', 'css!./pop-manager'], function($, S, CF){
	var html_string = '<div class="pop-manager-wrap"></div>',
		mask_string = '<div class="pop-manager-mask"></div>';

	/**
	 * 弹出层管理, 包括控制焦点, 遮罩
	 * @class
	 * @memberOf ui
	 */
	function popManager(){
		this.$div = $(html_string).appendTo('body');
		this.__init_mask().__init_ie6Iframe();
		this.mask().front();
	}

	/**
	 * @lends ui.popManager#
	 */
	S.augment(popManager, {
		/**
		 * 增加z-index放到最前
		 * @return this
		 */
		front: function() {
			this.$div.css('z-index', S.guid());
			return this;
		},
		/**
		 * 从DOM中删除
		 * @return this
		 */
		remove: function() {
			this.$div.remove();
			CF.remove();
			return this;
		},
		/**
		 * 显示最外层,如果需要提高层级请先调用front方法
		 * @return this
		 */
		show: function() {
			this.$div.css('display', 'block');
			CF.put(this);
			return this;
		},
		/**
		 * 隐藏最外层
		 * @return this
		 */
		hide: function() {
			this.$div.css('display', 'none');
			CF.remove();
			return this;
		},
		/**
		 * 显示遮罩, css3使用半透明背景, 其它使用半透明层
		 * @return this
		 */
		mask: function() {
			if($.browser.msie){
				this.$mask.css('display', 'block');
			}else{
				this.$div.css('background-color', 'rgba(0, 0, 0, 0.2)');
			}
			return this;
		},
		/**
		 * 隐藏遮罩
		 * @return this
		 */
		demask: function() {
			if($.browser.msie){
				this.$mask.css('display', 'none');
			}else{
				this.$div.css('background-color', '');
			}
			return this;
		},
		/**
		 * 显示loading状态
		 * @return this
		 */
		loading: function(){
			if($.browser.msie){
				this.$mask.addClass('loading');
			}else{
				this.$div.addClass('loading');
			}
			return this;
		},
		/**
		 * 隐藏loading状态
		 * @return this
		 */
		loaded: function(){
			if($.browser.msie){
				this.$mask.removeClass('loading');
			}else{
				this.$div.removeClass('loading');
			}
			return this;
		},
		/**
		 * 设置此实例会不会被clean清除
		 * @param 
		 * @return 
		 */
		notremove: function(state){
			this.$div.toggleClass('not-remove', state);
		},
		/**
		 * 初始化遮罩
		 * @return this
		 * @private
		 */
		__init_mask: function() {
			if($.browser.msie){
				this.$mask = $(mask_string);
				this.$div.prepend(this.$mask);
			}
			return this;
		},
		/**
		 * 初始化ie6下初始iframe垫层
		 * @return this
		 * @private
		 */
		__init_ie6Iframe: function(){
			if(/*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent)){
				this.$div.append('<iframe style="position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;filter:alpha(opacity=0);" frameborder="no" scrolling="no"></iframe>');
			}
			return this;
		}
	});

	return popManager;
});
/**
 * 弹出层管理工具 - 统一控制层级,遮罩
 * <pre><code>
 * API:
 * 		$.popManager.clean(true) 清除所有的弹出层包含块, 包括.not-remove的div
 * 		$.popManager.clean() 清除所有的弹出层包含块, 不会清除含.not-remove的div
 * 
 * 		p = $.popManager.init() 初始化一个弹出层包含块
 * 		p.front() 将此层放到最前面
 * 		p.show() 显示
 * 		p.hide() 隐藏
 * 		p.mask() 使用遮罩
 * 		p.demask() 去除遮罩
 * 		p.loading() 显示loading状态
 * 		p.loaded() 去除loading状态
 * 		p.remove() 删除此层
 * 
 * 		p.$div 最外层元素
 * 		p.$mask 遮罩元素 - css3使用的半透明背景,无此属性
 * 
 * TODO:
 * 		2011-08-09 09:15:49
 * 			IE6的内存泄露问题
 * 		2011-09-16 18:56:51
 * 			ESC隐藏控制
 * 		2012-01-16 11:18:21
 * 			弹出层需要禁止焦点跑到层后面去
 * </code></pre>
 */
define(['jquery', 'kissy'], function($, S){
	var html_string = '<div class="pop-manager-wrap" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;"></div>',
		mask_string = '<div class="pop-manager-mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);"></div>';

	/**
	 * @constructor
	 * @name popManager
	 */
	function init(){
		this.$div = $(html_string).appendTo('body');
		this.__init_mask().__init_ie6Iframe();
		this.mask().front();
	}

	/**
	 * @lends popManager#
	 */
	S.augment(init, {
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
			return this;
		},
		/**
		 * 显示最外层,如果需要提高层级请先调用front方法
		 * @return this
		 */
		show: function() {
			this.$div.show();
			return this;
		},
		/**
		 * 隐藏最外层
		 * @return this
		 */
		hide: function() {
			this.$div.hide();
			return this;
		},
		/**
		 * 显示遮罩, css3使用半透明背景, 其它使用半透明层
		 * @return this
		 */
		mask: function() {
			if($.browser.msie){
				this.$mask.show();
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
				this.$mask.hide();
			}else{
				this.$div.css('background-color', '');
			}
			return this;
		},
		/**
		 * 显示loading状态, 同时会打开mask
		 * @return this
		 */
		loading: function(){
			this.mask().$div.addClass('loading');
			return this;
		},
		/**
		 * 隐藏loading状态, 同时会关闭mask
		 * @return this
		 */
		loaded: function(){
			this.demask().$div.removeClass('loading');
			return this;
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

	return {
		/**
		 * 清除所有的弹出层包含块
		 * @param {boolean} force 为true时强制删除所有,其它值不会删除.not-remove的层
		 * @return popManager
		 */
		clean: function(force){
			if(force === true){
				$('div.pop-manager-wrap').remove();
			}else{
				$('div.pop-manager-wrap').not('.not-remove').remove();
			}
			return this;
		},
		/**
		 * 初始化一个弹出层包含块
		 */
		init: function(){
			return new init();
		}
	};
});
/**********************************************************************************************
 * 名称: 弹出层管理工具 - 统一控制层级,遮罩
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
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
 * 		2011-08-09 09:15:49:
 * 			IE6的内存泄露问题
 * 		2011-09-16 18:56:51:
 * 			ESC隐藏控制
 * 
 */
/**
 * @module popManager
 * @author hedingliang
 */
KISSY.add('popManager', function(S, undef) {
	var $ = jQuery,
		html_string = '<div class="pop-manager-wrap" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;"></div>',
		mask_string = '<div class="pop-manager-mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);"></div>',
		/**
		 * 弹出层管理命名空间
		 * @namespace popManager
		 */
		popManager = {};

	/**
	 * 清除所有的弹出层包含块
	 * @param {boolean} force 为true时强制删除所有,其它不会删除带not-remove的class的层
	 * @return popManager
	 * @memberof popManager
	 */
	popManager.clean = function(force){
		if(force === true){
			$('div.pop-manager-wrap').remove();
		}else{
			$('div.pop-manager-wrap').not('.not-remove').remove();
		}
		return this;
	}

	/**
	 * 初始化一个弹出层包含块
	 * @instance
	 * @memberof popManager
	 */
	popManager.init = function(){
		return new init();
	}

	function init(){
		this.$div = $(html_string).appendTo('body');
		this.__init_mask().__init_ie6Iframe();
		this.mask().front();
	}
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
		 * 从DOM中删除, 无参数
		 * @return this
		 */
		remove: function() {
			this.$div.remove();
			return this;
		},
		/**
		 * 显示出来,如果需要提高层级请先调用 front方法
		 * @return this
		 */
		show: function() {
			this.$div.show();
			return this;
		},
		/**
		 * 隐藏
		 * @return this
		 */
		hide: function() {
			this.$div.hide();
			return this;
		},
		/**
		 * 显示遮罩, css3使用半透明背景, 否则使用半透明层
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
		 * 显示loading状态
		 * @return this
		 */
		loading: function(){
			this.mask();
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
			this.demask();
			if($.browser.msie){
				this.$mask.removeClass('loading');
			}else{
				this.$div.removeClass('loading');
			}
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

	$.extend({
		popManager: popManager
	});
}, {
	requires: ['jquery-1.4.2']
});
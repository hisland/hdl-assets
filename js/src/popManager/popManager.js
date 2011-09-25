/**********************************************************************************************
 * 名称: 弹出层管理工具 - 统一控制层级,遮罩
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 * 		$.popManager.clean() 清除所有的弹出层包含块
 * 		p = $.popManager.init() 初始化一个弹出层包含块
 * 		p.front() 将此层放到最前面
 * 		p.mask() 使用遮罩
 * 		p.demask() 去除遮罩
 * 		p.loading() 显示loading状态
 * 		p.loaded() 去除loading状态
 * 		p.remove() 删除此层
 * 
 * 		p.$fndiv() 获得最外层元素
 * 		p.$fnmask() 获得遮罩元素
 * 
 * TODO:
 * 		2011-08-09 09:15:49:
 * 			IE6的内存泄露问题
 * 		2011-09-16 18:56:51:
 * 			ESC隐藏控制
 * 
 */

KISSY.add('popManager', function(S, undef) {
	var $ = jQuery,
		prefix = 'pop-manager-',
		html_string = '<div class="pop-manager-wrap" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;"></div>',
		mask_string = '<div class="pop-manager-mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);"></div>',
		popManager = {};

	//初始化一个弹出层包含块
	popManager.init = function(){
		return init();
	}

	//清除所有的弹出层包含块
	popManager.clean = function(){
		$('.pop-manager-wrap').remove();
		return this;
	}

	function init(){
		//更改为构造方式
		if(!(this instanceof init)){
			return new init();
		}

		//设置id
		var id = S.guid(prefix);
		$(html_string).attr('id', id).appendTo('body');
		this.selector = '#' + id;

		this.__init_mask().__init_ie6Iframe();
	}
	S.augment(init, {
		//放到最前
		front: function() {
			this.$fndiv().css('z-index', $.zindexManager.up());
			return this;
		},

		//删除此弹出层
		remove: function() {
			this.$fndiv().remove();
			return this;
		},

		//获得弹出层外层
		$fndiv: function() {
			return $(this.selector);
		},

		//获得弹出层遮罩div
		$fnmask: function() {
			return this.$fndiv().children('div:first');
		},

		//删除此弹出层
		__init_mask: function() {
			if($.browser.msie){
				this.$fndiv().prepend(mask_string);
			}
			return this;
		},

		//显示遮罩, css3使用半透明背景, 否则使用半透明层
		mask: function() {
			if($.browser.msie){
				this.$fnmask().show();
			}else{
				this.div.css('background-color', 'rgba(0, 0, 0, 0.2)');
			}
			return this;
		},

		//隐藏遮罩
		demask: function() {
			if($.browser.msie){
				this.$fnmask().hide();
			}else{
				this.div.css('background-color', '');
			}
			return this;
		},

		//显示loading层
		loading: function(){
			this.mask();
			this.$fndiv().addClass('loading');
			return this;
		},

		//显示loading层
		loaded: function(){
			this.demask();
			this.$fndiv().removeClass('loading');
			return this;
		},
		
		//ie6下增加iframe垫层
		__init_ie6Iframe: function(){
			if(/*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent)){
				this.$fndiv().append('<iframe style="position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;filter:alpha(opacity=0);" frameborder="no" scrolling="no"></iframe>');
			}
			return this;
		}
	});

	$.extend({
		popManager: popManager
	});
}, {
	requires: ['jquery-1.4.2', 'zindexManager']
});
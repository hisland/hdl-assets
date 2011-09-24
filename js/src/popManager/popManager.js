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
 * 		p.mask(false) 去除遮罩
 * 		p.remove() 删除此层
 * 
 * 		p.div 最外层元素的jquery对象
 * 		p.div.appendTo('body') 将层放到dom树中
 * 
 * TODO:
 * 		2011-08-09 09:15:49:
 * 			IE6的内存泄露问题
 * 		2011-09-16 18:56:51:
 * 			ESC隐藏控制
 */

KISSY.add('popManager', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,base_z_index = 1000
		,html_string = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;"></div>'
		,ifr_string = '<iframe style="position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;filter:alpha(opacity=0);" frameborder="no" scrolling="no"></iframe>'
		,mask_string = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);"></div>'
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent)
		,m = {};

	m.divs = EMPTY_$;

	//初始化一个弹出层包含块
	m.init = function(){
		return init().front();
	}

	//清除所有的弹出层包含块
	m.clean = function(){
		m.divs.remove();
		m.divs = EMPTY_$;
		return this;
	}

	function init(){
		//更改为构造方式
		if(!(this instanceof init)){
			return new init();
		}

		this.div = $(html_string);
		if(ie6){
			this.div.append(ifr_string);
		}
		this.mask();
		m.divs = m.divs.add(this.div);
	}
	$.extend(init.prototype, {
		//放到最前
		front: function () {
			this.div.css('z-index', $.zindexManager.up());
			return this;
		},
		//删除此弹出层
		remove: function () {
			this.div.remove();
			return this;
		},
		//遮罩处理,css3使用半透明背景,否则使用半透明层
		mask: function (use) {
			if(use === false){
				if($.browser.msie){
					this.div.children('div:first').remove();
				}else{
					this.div.css('background-color', '');
				}
				this.__mask = 0;
			}else{
				if(this.__mask){
				}else if($.browser.msie){
					this.div.prepend(mask_string);
					this.__mask = 1;
				}else{
					this.div.css('background-color', 'rgba(0, 0, 0, 0.2)');
					this.__mask = 1;
				}
			}
			return this;
		},
		loading: function(str){
			if (str === false) {
				this.div.removeClass('loading');
			}else{
				this.div.addClass('loading');
			}
			return this;
		}
	});

	$.extend({
		popManager: m
	});
}, {
	requires: ['jquery-1.4.2', 'zindexManager']
});
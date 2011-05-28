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
 */

KISSY.add('popManager', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,base_z_index = 3000
		,html_string = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;"></div>'
		,mask_string = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);"></div>'
		,m = {}
		
		,_uid = 0
		,uid = function(){
			return (++_uid + base_z_index);
		};

	m.divs = EMPTY_$;

	//初始化一个弹出层包含块
	m.init = function(){
		return new init().front();
	}

	//清除所有的弹出层包含块
	m.clean = function(){
		m.divs.remove();
		m.divs = EMPTY_$;
		_uid = 0;
		return this;
	}

	function init(){
		this.div = $(html_string);
		m.divs = m.divs.add(this.div);
	}
	$.extend(init.prototype, {
		//放到最前
		 front: function () {
			this.div.css('z-index', uid());
			return this;
		}
		//删除此弹出层
		,remove: function () {
			this.div.remove();
			return this;
		}
		//遮罩处理,css3使用半透明背景,否则使用半透明层
		,mask: function (use) {
			if(use == false){
				if($.browser.msie){
					this.div.children('div:first').remove();
				}else{
					this.div.css('background-color', '');
				}
			}else{
				if($.browser.msie){
					this.div.prepend(mask_string);
				}else{
					this.div.css('background-color', 'rgba(0, 0, 0, 0.2)');
				}
			}
			return this;
		}
	});

	$.extend({
		popManager: m
	});
}, {
	requires: ['jquery-1.4.2']
});
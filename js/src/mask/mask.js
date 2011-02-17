/**********************************************************************************************
 * 遮罩
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-11-11 15:35:37
 * 版本: v1
 *
 * 前置脚本:
 *			../jquery-1.4.2.min.js
 * 使用方法:
 *			mask.init();
 *			mask.clean();
 *			var a = mask.init();a.loading();a.remove();
 */
KISSY.add('mask', function(S, undef) {
	var  $ = jQuery
		,mask = {}
		,html_string = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff;opacity:0.8;filter:alpha(opacity=80);"></div>';

	mask.divs = $('');
	mask.init = function(){
		return new init();
	}
	mask.clean = function(){
		mask.divs.remove();
		mask.divs.length = 0;
	}

	function init(){
		this.div = $(html_string);
		mask.divs = mask.divs.add(this.div);
	}
	init.prototype = {
		 show: function(){
			this.div.show();
		}
		,hide: function(){
			this.div.hide();
		}
		,remove: function(){
			this.div.remove();
		}
	}

	$.mask = mask;
}, {
	requires: ['jquery-1.4.2']
});
/**********************************************************************************************
 * 名称: 弹出层管理工具 - 统一控制层级,遮罩
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 *
 * API:
 *	p = popManager.init() 初始化一个弹出层包含块
 *	popManager.clean() 清除所有的弹出层包含块
 *	p.front() 将此层放到最前面
 *	p.remove() 删除此层
 */

KISSY.add('popManager', function(S, undef) {
	var  $ = jQuery
		,base_z_index = 3000
		,html_string = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>'
		,m = {}
		
		,_uid = 0
		,uid = function(){
			return (++_uid + base_z_index);
		};
	
	m.divs = $('');
	m.init = function(){
		var o = new init();
		o.front();
		return o;
	}
	m.clean = function(){
		m.divs.remove();
		m.divs = $('');
		_uid = 0;
	}

	function init(){
		this.div = $(html_string);
		m.divs = m.divs.add(this.div);
	}
	init.prototype = {
		//放到最前
		 front: function () {
			this.div.css('z-index', uid());
			return this;
		}
		//删除此弹出层
		,remove: function () {
			this.div.remove();
		}
	}

	window.popManager = m;
}, {
	requires: ['jquery-1.4.2']
});
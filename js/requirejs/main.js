//公共的模块路径配置,任意页面加载此模块后可获得整体代码的正确配置
require.config({
	paths: {
		jquery: 'jquery-1.7.1'
	},
	packages: ['css', 'util', 'color', 'jquery-plugin', 'valid',
				'ui/autocomp', 'ui/button', 'ui/date', 'ui/grid', 'ui/popwin', 'ui/select',
				'ui/tab', 'ui/tip', 'ui/tree', 'ui/week', 'ui/popup']
});

require.config({
	packages: ['sf/condition', 'sf/config', 'sf/menu', 'sf/page', 'sf/top',
				'demo', 'sf/menu', 'sf/flow']
});

//从anti过来的包
var from_ant_pkg = ["from-anti/adjustElement",
				"from-anti/autoComplete",
				"from-anti/builtin",
				"from-anti/dropSelect",
				"from-anti/flexigrid",
				"from-anti/hdlDrag",
				"from-anti/hdlReg",
				"from-anti/hdlTest",
				"from-anti/hdlTipMsg",
				"from-anti/hdlTree",
				"from-anti/hdlValidator",
				"from-anti/jquery.hdlDateTool",
				"from-anti/jquery.input",
				"from-anti/jquery.mousewheel",
				"from-anti/load-url",
				"from-anti/loopFuncs",
				"from-anti/moni-select",
				"from-anti/multiCheckbox",
				"from-anti/multiSelect",
				"from-anti/pager",
				"from-anti/popManager",
				"from-anti/popWin",
				"from-anti/swfobject2.2",
				"from-anti/validString",
				"from-anti/weekTool"];

//ie6单独加载模块
if (/*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent)) {
	from_ant_pkg.push("from-anti/ie6");
}

require.config({
	packages: from_ant_pkg
});


//这两个模块放到最前面
from_ant_pkg.unshift("jquery", "kissy");

require(from_ant_pkg, function($, S){
	require(['sf/page', 'sf/menu', 'sf/condition', 'sf/config'], function(Page, Menu) {
		//初始化菜单包含层及对象
		var m = Menu.init();
		m.$div.appendTo('.aside');

		//加载菜单数据
		$.getJSON('assets/from-anti/menu/menu.json', function(rs){
			m.setData(rs);
		});
	});
});
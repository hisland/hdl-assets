define(function(require, exports, module){
	window.S = require('kissy');
	
	//初始化菜单包含层及对象
	var m = require('./menu/main').init();
	m.$div.appendTo('#menu-wrap');
	//菜单实例
	window.Menu = m;

	//页面公共控制实例
	window.Page = require('./page/main');

	//PL公共方法
	window.PL = S.mix(window.PL || {}, require('./PL/main'));

	//表格控件
	window.Grid = require('ui/grid');

	//提示信息
	window.Tip = require('ui/tip');

	//弹出层
	window.Popwin = require('ui/popwin');
	//修改了样式后,这个也跟着需要修改
	require('ui/popwin/popwin').prototype.setWidth = function(num){
		this.$content.width(num);
		return this;
	};

	//验证
	window.ValidForm = require('validator');
	window.ValidGroup = require('validator/group');

	//树控件
	window.Tree = require('ui/tree');

	//树控件
	window.Tab = require('ui/tab');

	//工具
	window.Util = require('util');

	//MD5
	window.MD5 = require('md5');

	//时间控件
	window.Calendar = require('ui/calendar');

	//时间控件
	window.Compare = require('sf/compare');

	//时间控件
	window.Cookie = require('util/cookie');

	//模拟下拉框
	//window.MoliSelect = require('ui/moni-select');

	//自动完成
	//window.Autocomplete = require('ui/autocomp');


	//从anti过来的包
	var from_ant_pkg = ["from-anti/builtin",
					"from-anti/dropSelect",
					"from-anti/flexigrid",
					"from-anti/hdlDrag",
					"from-anti/hdlReg",
					"from-anti/hdlTest",
					"from-anti/hdlValidator",
					"from-anti/jquery.hdlDateTool",
					"from-anti/loopFuncs",
					"from-anti/moni-select",
					"from-anti/weekTool",
					"from-anti/validString"];
	//ie6单独加载模块
	if (/*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent)) {
		from_ant_pkg.push("from-anti/ie6");
	}
	window.require.config({
		packages: from_ant_pkg
	});
	window.require(from_ant_pkg);
});

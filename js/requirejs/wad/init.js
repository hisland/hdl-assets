define(function(require, exports, module){
	window.S = require('kissy');
	
	//初始化菜单包含层及对象
	var m = require('./menu/main').init();
	m.$div.appendTo('#menu-wrap');
	//菜单实例
	window.Menu = m;

	//页面公共控制实例
	window.Page = require('./page/main');

	//WAD公共方法
	window.WAD = S.mix(window.WAD || {}, require('./WAD/main'));

	//表格控件
	window.Grid = require('ui/grid');

	//提示信息
	window.Tip = require('ui/tip');

	//弹出层
	window.Popwin = require('ui/popwin');
	window.Popup = require('ui/popup');

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

	//循环执行函数
	window.LoopFuncs = require('util/loopFuncs');

	//加密解密
	window.Encrypt = require('util/Encrypt');

	//模拟下拉框
	//window.MoliSelect = require('ui/moni-select');

	//自动完成
	//window.Autocomplete = require('ui/autocomp');
});

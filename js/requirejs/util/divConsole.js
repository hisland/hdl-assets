define(['jquery', 'kissy'], function($, S){

var defaultConfig = {
	weekStart: 1,
	showWeek: false,
	enableClear : true,
	enableNow : true,
	enableAnimate : false,
	selectDateHide : false,
	prefix0 : true
};

function DivConsole(config){
	this.__init(config).__initDOM().__initEvent();
}
//初始化, 事件
$.extend(DivConsole.prototype, {
	__init: function(config){
		config = $.isPlainObject(config) ? config : {};
		this.config = $.extend(true, config, defaultConfig);
		return this;
	},
	__initDOM: function(){
		var div = $('<div style="position:absolute;top:0;left:0;width:200px;background:red;border:1px solid green;"></div>');
		this.$wrap = div;
		div.appendTo('body');
		return this;
	},
	__initEvent: function(){
	}
});

$.extend(DivConsole.prototype, {
	log: function(str){
		this.$wrap.append('<p>' + str + '</p>');
	}
});

DivConsole.init = function(){
	return new DivConsole();
};

return DivConsole.init();

});
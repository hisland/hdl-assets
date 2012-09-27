define(['jquery', 'kissy', 'util'], function($, S, Util){

var i18n = {
	week: ['', '一', '二', '三', '四', '五', '六', '日'],
	clear: '清除',
	now: '现在',
	close: '关闭',
	prev: '前一页',
	next: '后一页'
};
var defaultConfig = {
	enableDetail : false,
	autoRefresh : {
		timeout: 5000,
		process: function(){
			
		}
	},
	ajax : {
		url: '',
		method: 'POST',
		dataType: 'json',
		param: null,
		lastParam: null
	},
	preProcess : null,
	theme : 'default',
	enablePager: true,
	pagerTheme : 'default',
	perPageNum: 15,
	perPageNumList: [8,10,15,20,25,40],
	enableCheck: true,
	singleCheck: false,
	enableMask: true,
	nowrap: true,
	enableColToggle : true,
	minColToggle : 1,
	autoResize: false,
	autoload: false
};
var defaultResult = {
	perPageNum : 15,
	currPage : 1,
	beginNum : 0,
	endNum : 0,
	totals : 0,
	currRecordNum : 0,
	allPage : 0,
	rows : []
};
var defaultRow = {
	enableCheck: true,
	disabled: false
};
var defaultCol = {
	align: 'left',//left right center
	alignHead: 'center',
	fixedTo: null,//left right null
	width: 'auto',//auto 15% 15
	minWidth: 10,
	maxWidth: 200,
	headText: 'col Head',
	hide: false,
	enableHide: false,
	enableSort: false,
	enableTip: false,
	process: null
};


function Popwin(config){
	this.__init(config).__initDOM().__initEvent();
}

//初始化, 事件
$.extend(Popwin.prototype, {
	__init: function(config){
		config = $.isPlainObject(config) ? config : {};
		this.config = $.extend(true, config, defaultConfig);
		return this;
	},
	__initDOM: function(){
		var div = $('<div class="calendar-wrap"><div class="cldr-top"></div><div class="cldr-arr"></div><div class="cldr-ipt-wrap"><div class="cldr-ipt-item cldr-div-year"><span class="cldr-ipt-up"></span><input class="cldr-ipt-year" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">-</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-month" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">-</div><div class="cldr-ipt-item cldr-div-date"><span class="cldr-ipt-up"></span><input class="cldr-ipt-date" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-hour" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">:</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-minute" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">:</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-second" value="" /><span class="cldr-ipt-down"></span></div></div><div class="cldr-lst-date"></div></div>');
		this.$wrap = div;
		this.$clear = $('<a href="javascript:;" class="btn-clear">' + i18n.clear + '</a>').appendTo(div.find('div.cldr-top'));
		this.$now = $('<a href="javascript:;" class="btn-now">' + i18n.now + '</a>').appendTo(div.find('div.cldr-top'));
		this.$close = $('<a href="javascript:;" class="btn-close">' + i18n.close + '</a>').appendTo(div.find('div.cldr-top'));
		this.$arr = div.find('div.cldr-arr');
		this.$iptWrap = div.find('div.cldr-ipt-wrap');
		this.$year = div.find('input.cldr-ipt-year');
		this.$month = div.find('input.cldr-ipt-month');
		this.$date = div.find('input.cldr-ipt-date');
		this.$hour = div.find('input.cldr-ipt-hour');
		this.$minute = div.find('input.cldr-ipt-minute');
		this.$second = div.find('input.cldr-ipt-second');
		this.$list = div.find('div.cldr-lst-date');
		div.appendTo('body');
		return this;
	},
	__initEvent: function(){
		var me = this;
		return this;
	}
});

//事件
$.extend(Popwin.prototype, {
	on: function(type, fn){
		$(this).on(type, fn);
		return this;
	},
	off: function(type, fn){
		$(this).off(type, fn);
		return this;
	},
	trigger: function(type){
		$(this).trigger(type);
		return this;
	}
});

//宽高
$.extend(Popwin.prototype, {
	setHeight: function(num){
		return this;
	},
	setWidth: function(num){
		return this;
	}
});

//设置数据
$.extend(Popwin.prototype, {
	setData: function(data){
		return this;
	},
	setHTML: function(obj){
		obj.col;
		obj.head;
		obj.body;
		return this;
	}
});

return Popwin;

});
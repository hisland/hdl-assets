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
	/** 是否选中后就关闭 */
	selectHide : false,
	/** 是否开启动画 */
	enableAnimate : false,
	/** 是否开启行的详细信息 */
	enableDetail : false,
	/** 是否使用间隔色 */
	enableGapBg : false,
	/** 是否开启动画 */
	enableAnimate : false,
	/** 是否开启动画 */
	enableAnimate : false,
	/** 是否开启动画 */
	enableAnimate : false,
	/** 自动刷新设置 */
	autoRefresh : {
		timeout: 5000,
		process: function(){
			
		}
	},
	/** 对响应结果预处理 */
	preProcess : null
};
var defaultRow = {
	align: 'left',
	enableSort: 'left',
	enableCheck: 'left',
	disabled: 'left'
};
var defaultCol = {
	align: 'left',
	alignHead: 'center',
	fixedTo: null,
	minWidth: 10,
	maxWidth: 200,
	headText: 'col Head',
	hide: false,
	width: 'auto',
	enableHide: 'left',
	enableSort: 'left',
	enableTip: 'left',
	process: null
};


function Grid(config){
	this.__init(config).__initDOM().__initEvent();
}

//初始化, 事件
$.extend(Grid.prototype, {
	__init: function(config){
		config = $.isPlainObject(config) ? config : {};
		this.config = $.extend(true, config, defaultConfig);
		this.fields = new Fields();
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
$.extend(Grid.prototype, {
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

return Grid;

});
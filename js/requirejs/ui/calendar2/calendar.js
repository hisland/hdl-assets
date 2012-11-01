define(['jquery', 'kissy', 'util/main', 'jquery-plugin/main', 'less!./main.less'], function($, S, Util){

function length1Prefix0(value) {
	value += '';
	return value.length == 1 ? '0' + value : value;
}

var i18n = {
	week: ['', '一', '二', '三', '四', '五', '六', '日'],
	clear: '清除',
	now: '现在',
	close: '关闭',
	prev: '前一页',
	next: '后一页'
};
var defaultConfig = {
	weekStart: 1,
	showWeek: false,
	enableClear: true,
	enableNow: true,
	enableAnimate: false,
	selectDateHide: false,
	prefix0: true
};

var monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Fields(){
}
$.extend(Fields.prototype, {
	item: function(field, value){
		if(arguments.length == 2){
			value = length1Prefix0(value);
			if(this[field] === 'any'){
				this.real(field, value);
			}else if(this[field] === 'end'){
				this.real(field, this.getMonthDays());
			}else{
				this[field] = value;
				this.real(field, value);
			}
			return this;
		}else if(arguments.length == 1){
			return this[field];
		}
	},
	real: function(field, value){
		var m;
		if(arguments.length == 2){
			value -= 0;
			this['real_' + field] = value;

			//为年时,要修改2月总天数
			if(field === 'year'){
				this.__repairMonth2();
			}

			//修正日期大于真实值的情况
			m = this.real('month');
			if(field === 'month' || (field === 'year' && m === 2)){
				if(this.real('date') > monthDays[m]){
					this.item('date', monthDays[m]);
				}
			}
			return this;
		}else if(arguments.length == 1){
			return this['real_' + field];
		}
	},
	setDate: function(date){
		this.item('year', date.getFullYear());
		this.item('month', date.getMonth()+1);
		this.item('date', date.getDate());
		this.item('hour', date.getHours());
		this.item('minute', date.getMinutes());
		this.item('second', date.getSeconds());
		return this;
	},
	getDate: function(){
		return new Date(this.real('year') + '/' + this.real('month') + '/' + this.real('date') + ' ' + this.real('hour') + ':' + this.real('minute') + ':' + this.real('second'));
	},
	getMonthDays: function(){
		return monthDays[this.real('month')];
	},
	__repairMonth2: function(){
		var year = this.real('year');
		monthDays[2] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;
		return this;
	}
});


function Calendar(config){
	this.__init(config).__initDOM().__initEvent();
}

//初始化, 事件
$.extend(Calendar.prototype, {
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
		//顶部按钮
			this.$clear.click(function(e){
				me.trigger('clear');
			});
			this.$now.click(function(e){
				me.setValue(new Date());
			});
			this.$close.click(function(e){
				me.hide();
			});

		//输入框点击
			this.$year.click(function(e){
				me.setCursor('year');
			});
			this.$month.click(function(e){
				me.setCursor('month');
			});
			this.$date.click(function(e){
				me.setCursor('date');
			});
			this.$hour.click(function(e){
				me.setCursor('hour');
			});
			this.$minute.click(function(e){
				me.setCursor('minute');
			});
			this.$second.click(function(e){
				me.setCursor('second');
			});

		//列表点击
			this.$wrap.on('click', '.cldr-lst-year .cldr-wrap a', function(e){
				me.setYear($(this).text() - 0);
			});
			this.$wrap.on('click', '.cldr-lst-date a', function(e){
				me.setDate($(this).text() - 0);
			});
			this.$wrap.on('click', '.cldr-lst-other a', function(e){
				if(me.__nowCursor === 'month'){
					me.setMonth($(this).text() - 0);
				}else if(me.__nowCursor === 'hour'){
					me.setHour($(this).text() - 0);
				}else if(me.__nowCursor === 'minute'){
					me.setMinute($(this).text() - 0);
				}else if(me.__nowCursor === 'second'){
					me.setSecond($(this).text() - 0);
				}
			});

		//列表mousewheel
			this.$wrap.on('mousewheel', '.cldr-lst-year', function(e, delta){
				if(delta > 0){
					me.yearUp();
				}else{
					me.yearDown();
				}
			});
			this.$wrap.on('mousewheel', '.cldr-lst-date', function(e, delta){
				if(delta > 0){
					me.dateUp();
				}else{
					me.dateDown();
				}
			});
			this.$wrap.on('mousewheel', '.cldr-lst-other', function(e, delta){
				if(delta > 0){
					me[me.__nowCursor + 'Up']();
				}else{
					me[me.__nowCursor + 'Down']();
				}
			});

		//year control
			this.$year.prev().click(function(e){
				me.yearUp();
			});
			this.$year.next().click(function(e){
				me.yearDown();
			});
			this.$year.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.yearUp();
				}else{
					me.yearDown();
				}
			});
			this.$year.keydown(function(e){
				if(e.keyCode === 38){
					me.yearUp();
				}else if(e.keyCode === 40){
					me.yearDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$year.hover(function(e){
			}, function(e){
			});

		//month control
			this.$month.prev().click(function(e){
				me.monthUp();
			});
			this.$month.next().click(function(e){
				me.monthDown();
			});
			this.$month.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.monthUp();
				}else{
					me.monthDown();
				}
			});
			this.$month.keydown(function(e){
				if(e.keyCode === 38){
					me.monthUp();
				}else if(e.keyCode === 40){
					me.monthDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$month.hover(function(e){
			}, function(e){
			});

		//date control
			this.$date.prev().click(function(e){
				me.dateUp();
			});
			this.$date.next().click(function(e){
				me.dateDown();
			});
			this.$date.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.dateUp();
				}else{
					me.dateDown();
				}
			});
			this.$date.keydown(function(e){
				if(e.keyCode === 38){
					me.dateUp();
				}else if(e.keyCode === 40){
					me.dateDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$date.hover(function(e){
			}, function(e){
			});

		//hour control
			this.$hour.prev().click(function(e){
				me.hourUp();
			});
			this.$hour.next().click(function(e){
				me.hourDown();
			});
			this.$hour.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.hourUp();
				}else{
					me.hourDown();
				}
			});
			this.$hour.keydown(function(e){
				if(e.keyCode === 38){
					me.hourUp();
				}else if(e.keyCode === 40){
					me.hourDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$hour.hover(function(e){
			}, function(e){
			});

		//minute control
			this.$minute.prev().click(function(e){
				me.minuteUp();
			});
			this.$minute.next().click(function(e){
				me.minuteDown();
			});
			this.$minute.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.minuteUp();
				}else{
					me.minuteDown();
				}
			});
			this.$minute.keydown(function(e){
				if(e.keyCode === 38){
					me.minuteUp();
				}else if(e.keyCode === 40){
					me.minuteDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$minute.hover(function(e){
			}, function(e){
			});

		//second control
			this.$second.prev().click(function(e){
				me.secondUp();
			});
			this.$second.next().click(function(e){
				me.secondDown();
			});
			this.$second.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.secondUp();
				}else{
					me.secondDown();
				}
			});
			this.$second.keydown(function(e){
				if(e.keyCode === 38){
					me.secondUp();
				}else if(e.keyCode === 40){
					me.secondDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$second.hover(function(e){
			}, function(e){
			});
		return this;
	}
});

//事件
$.extend(Calendar.prototype, {
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

//show/hide
$.extend(Calendar.prototype, {
	show: function(){
		this.$wrap.show();
		return this;
	},
	hide: function(){
		this.$wrap.hide();
		return this;
	}
});

//get/set value(real date value)
$.extend(Calendar.prototype, {
	setValue: function(date){
		if(date = Util.getDate(date)){
			this.fields.setDate(date);
			this.refreshField();
		}
		return this;
	},
	getValue: function(){
		return this.fields.getDate();
	}
});

//handle month days and firstday
$.extend(Calendar.prototype, {
	getMonthDays: function(){
		return this.fields.getMonthDays();
	},
	getMonthFirstDay: function(){
		return new Date(this.fields.real('year') + '/' + this.fields.real('month') + '/1').getDay();
	},
	getBlank: function(){
		//月第一行的空白 = monthfirstday - (weekstart - 7)
		var blank = this.getMonthFirstDay() - (this.config.weekStart - 7);
		//取值为0-6
		return blank % 7;
	}
});

//config的set
$.extend(Calendar.prototype, {
	setWeekStart: function(number){
		this.config.weekStart = number;
		return this;
	},
	setFixed: function(str){
		this.config.fixed = str;
		return this;
	},
	setEnableClear: function(state){
		this.config.enableClear = state;
		return this;
	},
	setEnableNow: function(state){
		this.config.enableNow = state;
		return this;
	},
	setEnableAnimate: function(state){
		this.config.enableAnimate = state;
		return this;
	}
});

//各种刷新
$.extend(Calendar.prototype, {
	getWeekList: function(){
		var n = this.config.weekStart, b = [];
		do{
			if(n === 6 || n === 7){
				b.push('<span class="cldr-weekend">', i18n.week[n], '</span>');
			}else{
				b.push('<span>', i18n.week[n], '</span>');
			}
			n++;
			if(n === 8){
				n = 1;
			}
		}while(n != this.config.weekStart);

		return b.join('');
	},
	refreshDateList: function(){
		var str = [], i,
			days = this.getMonthDays(),
			blank = this.getBlank(),
			today = this.fields.real('date');

		str.push('<div class="cldr-week">');
		str.push(this.getWeekList());
		str.push('</div>');
		str.push('<div class="cldr-date-wrap">');
		for(i = 0; i < blank; i++) {
			str.push('<span class="cldr-lst-no"></span>');
		}
		for(i = 1; i <= days; i++) {
			if(i !== today){
				str.push('<a href="javascript:;">' + i + '</a>');
			}else{
				str.push('<a href="javascript:;" class="cldr-lst-now">' + i + '</a>');
			}
		}
		str.push('</div>');

		this.$list.html(str.join(''));
		return this;
	},
	getYearPage: function(){
		var str = ['<div class="cldr-nav">'];
		str.push('<a href="javascript:;" class="cldr-year-prev">' + i18n.prev + '</a>');
		str.push('<a href="javascript:;" class="cldr-year-next">' + i18n.next + '</a>');
		str.push('</div>');
		return str.join('');
	},
	refreshYearList: function(){
		var from, to, now, str = [];
		now = this.fields.real('year');
		from = now - 17;
		to = now + 17;

		str.push('<div class="cldr-wrap">');
		for(; from <= to; from++) {
			if(from !== now){
				str.push('<a href="javascript:;">' + from + '</a>');
			}else{
				str.push('<a href="javascript:;" class="cldr-lst-now">' + from + '</a>');
			}
		}
		str.push('</div>');
		str.push(this.getYearPage());
		this.$list.html(str.join(''));

		return this;
	},
	refreshOtherList: function(){
		var from, to, now, field = this.__nowCursor, str = [];
		if(field === 'month'){
			from = 1;
			to = 12;
			now = this.fields.real('month');
		}else if(field === 'hour'){
			from = 0;
			to = 23;
			now = this.fields.real('hour');
		}else if(field === 'minute'){
			from = 0;
			to = 59;
			now = this.fields.real('minute');
		}else if(field === 'second'){
			from = 0;
			to = 59;
			now = this.fields.real('second');
		}

		for(; from <= to; from++) {
			if(from !== now){
				str.push('<a href="javascript:;">' + from + '</a>');
			}else{
				str.push('<a href="javascript:;" class="cldr-lst-now">' + from + '</a>');
			}
		}
		this.$list.html(str.join(''));

		return this;
	},
	refreshList: function(field){
		if(!field){
			field = this.__nowCursor;
		}
		if(field === 'year'){
			this.refreshYearList();
		}else if(field === 'date'){
			this.refreshDateList();
		}else{
			this.refreshOtherList();
		}
		return this;
	},
	refreshField: function(field){
		//all
		if(!field){
			this.$year.val(this.fields.item('year'));
			this.$month.val(this.fields.item('month'));
			this.$date.val(this.fields.item('date'));
			this.$hour.val(this.fields.item('hour'));
			this.$minute.val(this.fields.item('minute'));
			this.$second.val(this.fields.item('second'));
		}else{
			this['$' + field].val(this.fields.item(field));
			if(field === 'year' || field === 'month' ){
				this.$date.val(this.fields.item('date'));
			}
		}
		this.refreshList();
		return this;
	}
});

//年列表翻页
$.extend(Calendar.prototype, {
	yearPrev: function(){
		return this;
	},
	yearNext: function(){
		return this;
	}
});

//各field的set
$.extend(Calendar.prototype, {
	setYear: function(num){
		if(true){
			this.fields.item('year', num);
			this.refreshField('year');
		}else{
			S.log(['Calendar.setYear: invalid value: ', num]);
		}
		return this;
	},
	setMonth: function(num){
		if(num >= 1 && num <= 12){
			this.fields.item('month', num);
			this.refreshField('month');
		}else{
			S.log(['Calendar.setMonth: invalid value: ', num]);
		}
		return this;
	},
	setDate: function(num){
		if(num >= 1 && num <= this.getMonthDays()){
			this.fields.item('date', num);
			this.refreshField('date');
		}else{
			S.log(['Calendar.setDate: invalid value: ', num]);
		}
		return this;
	},
	setHour: function(num){
		if(num >= 0 && num <= 23){
			this.fields.item('hour', num);
			this.refreshField('hour');
		}else{
			S.log(['Calendar.setHour: invalid value: ', num]);
		}
		return this;
	},
	setMinute: function(num){
		if(num >= 0 && num <= 59){
			this.fields.item('minute', num);
			this.refreshField('minute');
		}else{
			S.log(['Calendar.setMinute: invalid value: ', num]);
		}
		return this;
	},
	setSecond: function(num){
		if(num >= 0 && num <= 59){
			this.fields.item('second', num);
			this.refreshField('second');
		}else{
			S.log(['Calendar.setSecond: invalid value: ', num]);
		}
		return this;
	}
});

//各field上下
$.extend(Calendar.prototype, {
	yearUp: function(){
		this.setYear(this.fields.real('year') + 1);
		return this;
	},
	yearDown: function(){
		this.setYear(this.fields.real('year') - 1);
		return this;
	},
	monthUp: function(){
		this.setMonth(this.fields.real('month') + 1);
		return this;
	},
	monthDown: function(){
		this.setMonth(this.fields.real('month') - 1);
		return this;
	},
	dateUp: function(){
		this.setDate(this.fields.real('date') + 1);
		return this;
	},
	dateDown: function(){
		this.setDate(this.fields.real('date') - 1);
		return this;
	},
	hourUp: function(){
		this.setHour(this.fields.real('hour') + 1);
		return this;
	},
	hourDown: function(){
		this.setHour(this.fields.real('hour') - 1);
		return this;
	},
	minuteUp: function(){
		this.setMinute(this.fields.real('minute') + 1);
		return this;
	},
	minuteDown: function(){
		this.setMinute(this.fields.real('minute') - 1);
		return this;
	},
	secondUp: function(){
		this.setSecond(this.fields.real('second') + 1);
		return this;
	},
	secondDown: function(){
		this.setSecond(this.fields.real('second') - 1);
		return this;
	}
});

//设置当前显示field, 操作箭头
var fieldOffset = {
	year: 19,
	month: 59,
	date: 93,
	hour: 124,
	minute: 159,
	second: 193
}
$.extend(Calendar.prototype, {
	setCursor: function(field){
		this.__nowCursor = field;
		this.__setArr(field);
		if(field === 'year'){
			this.$list.attr('class', 'cldr-lst-year');
		}else if(field === 'date'){
			this.$list.attr('class', 'cldr-lst-date');
		}else{
			this.$list.attr('class', 'cldr-lst-other');
		}
		this.refreshList(field);
		return this;
	},
	__setArr: function(field){
		this.$arr.css('left', fieldOffset[field]);
		return this;
	}
});

return Calendar;

});
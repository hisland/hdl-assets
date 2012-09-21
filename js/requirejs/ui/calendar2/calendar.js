define(['jquery', 'kissy', './config'], function($, S, Config){

function length1Prefix0(value) {
	value += '';
	return value.length == 1 ? '0' + value : value;
}

var filed = {
	year: true,
	month: true,
	date: true,
	hour: true,
	minute: true,
	second: true
}
var i18n = {
	week: ['', '一', '二', '三', '四', '五', '六', '日']
};
var util = {
	getWeekList: function(weekStart){//range: 1-7
		var n = weekStart, b = [];
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
		}while(n != weekStart);

		return b.join('');
	}
};

var monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function DataField(){
}
$.extend(DataField.prototype, {
	item: function(type, value){
		if(arguments.length == 2){
			value = length1Prefix0(value);
			if(this[type] == 'any'){
				this.real(type, value);
			}else if(this[type] == 'e'){
				this.real(type, this.getMonthDays());
			}else{
				this[type] = value;
				this.real(type, value);
			}
			return this;
		}else if(arguments.length == 1){
			return this[type];
		}
	},
	real: function(type, value){
		var m;
		if(arguments.length == 2){
			this['real_' + type] = value;

			//为年时,要修改2月总天数
			if(type === 'year'){
				this.__repairMonth2();
			}

			//修正日期大于真实值的情况
			m = this.real('month');
			if(type === 'month' || (type === 'year' && m === 2)){
				if(this.real('date') > monthDays[m]){
					this.item('date', monthDays[m]);
				}
			}
			return this;
		}else if(arguments.length == 1){
			return this['real_' + type];
		}
	},
	getMonthDays: function(){
		return monthDays[this.real('month')];
	},
	getMonthFirstDay: function(year, month){
		return new Date(year + '/' + month + '/1').getDay();
	},
	__repairMonth2: function(){
		var year = this.real('year');
		monthDays[2] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;
		return this;
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
	}
});


function Calendar(config){
	this.__init(config).__initDOM().__initEvent();
}

//初始化, 事件
$.extend(Calendar.prototype, {
	__init: function(config){
		return this;
	},
	__initDOM: function(){
		var div = $('<div class="calendar-wrap"><div class="cldr-top"></div><div class="cldr-arr"></div><div class="cldr-ipt-wrap"><div class="cldr-ipt-item cldr-div-year"><span class="cldr-ipt-up"></span><input class="cldr-ipt-year" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">-</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-month" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">-</div><div class="cldr-ipt-item cldr-div-date"><span class="cldr-ipt-up"></span><input class="cldr-ipt-date" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-hour" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">:</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-minute" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">:</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-second" value="" /><span class="cldr-ipt-down"></span></div></div><div class="cldr-lst-date"><div class="cldr-week"></div><div class="cldr-date-wrap"></div></div></div>');
		this.$wrap = div;
		this.$now = div.find('');
		this.$clear = div.find('');
		this.$close = div.find('');
		this.$arr = div.find('div.cldr-arr');
		this.$iptWrap = div.find('div.cldr-ipt-wrap');
		this.$year = div.find('input.cldr-ipt-year');
		this.$month = div.find('input.cldr-ipt-month');
		this.$date = div.find('input.cldr-ipt-date');
		this.$hour = div.find('input.cldr-ipt-hour');
		this.$minute = div.find('input.cldr-ipt-minute');
		this.$second = div.find('input.cldr-ipt-second');
		this.$listDate = div.find('div.cldr-lst-date');
		this.$listDrop = div.find('');
		this.$listYear = div.find('');
		div.appendTo('body');
		return this;
	},
	__initEvent: function(){
		var me = this;
		this.$now.click(function(e){
			me.setDate(new Date());
		});
		this.$clear.click(function(e){
			me.trigger('clear');
		});
		this.$close.click(function(e){
			me.hide();
		});

		//输入框点击
		this.$year.click(function(e){
			me.__setCursor('year');
		});
		this.$month.click(function(e){
			me.__setCursor('month');
		});
		this.$date.click(function(e){
			me.__setCursor('date');
		});
		this.$hour.click(function(e){
			me.__setCursor('hour');
		});
		this.$minute.click(function(e){
			me.__setCursor('minute');
		});
		this.$second.click(function(e){
			me.__setCursor('second');
		});

		this.$year.keypress(function(e){
		});
		this.$year.hover(function(e){
		}, function(e){
		});
		this.$year.prev().click(function(e){
		});
		this.$year.next().click(function(e){
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

//年列表翻页
$.extend(Calendar.prototype, {
	yearPrev: function(){
		return this;
	},
	yearNext: function(){
		return this;
	}
});

//各field上下及set
$.extend(Calendar.prototype, {
	yearUp: function(){
		return this;
	},
	yearDown: function(name){
		return $(this).data(name);
	},
	yearUp: function(){
		return this;
	},
	yearDown: function(name){
		return $(this).data(name);
	},
	yearUp: function(){
		return this;
	},
	yearDown: function(name){
		return $(this).data(name);
	},
	yearUp: function(){
		return this;
	},
	yearDown: function(name){
		return $(this).data(name);
	},
	yearUp: function(){
		return this;
	},
	yearDown: function(name){
		return $(this).data(name);
	},
	yearUp: function(){
		return this;
	},
	yearDown: function(name){
		return $(this).data(name);
	}
});

//设置当前显示field, 操作箭头
var fieldOffset = {
	year: 19,
	month: 59,
	date: 94,
	hour: 124,
	minute: 159,
	second: 193
}
$.extend(Calendar.prototype, {
	__setCursor: function(which){
		this.__nowCursor = which;
		this.__setArr(which);
		return this;
	},
	__setArr: function(which){
		this.$arr.css('left', fieldOffset[which]);
		return this;
	}
});

return Calendar;

});
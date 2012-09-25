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
	text: 'text',
	icon: 'default'
};

function Button(){
}
$.extend(Button.prototype, {
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

return Button;

});
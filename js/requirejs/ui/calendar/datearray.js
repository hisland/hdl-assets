/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	function length1Prefix0(value) {
		value += '';
		return value.length == 1 ? '0' + value : value;
	}

	/**
	 * @class
	 */
	function DateArray(){}

	/**
	 * @lends DateArray#
	 */
	S.augment(DateArray, {
		days_list: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		/**
		 * 设置/获得显示的值
		 * @param type 'year|month....'
		 * @param value Int|'any'|'e'
		 * @return this|Int|'any'|'e'
		 */
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
		/**
		 * 设置/获得真实值
		 * @param type 'year|month....'
		 * @param value Int
		 * @return this|Int
		 */
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
					if(this.real('date') > this.days_list[m]){
						this.item('date', this.days_list[m]);
					}
				}
				return this;
			}else if(arguments.length == 1){
				return this['real_' + type];
			}
		},
		/**
		 * 获得月天数
		 * @return Int
		 */
		getMonthDays: function(){
			return this.days_list[this.real('month')];
		},
		/**
		 * 获得某年某月1号为星期几
		 * @return Int 1-7
		 */
		getMonthFirstDay: function(year, month){
			return new Date(year + '/' + month + '/1').getDay();
		},
		/**
		 * 修正2月总天数
		 * @return this
		 */
		__repairMonth2: function(){
			var year = this.real('year');
			this.days_list[2] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;
			return this;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		setDate: function(date){
			this.item('year', date.getFullYear());
			this.item('month', date.getMonth()+1);
			this.item('date', date.getDate());
			this.item('hour', date.getHours());
			this.item('minute', date.getMinutes());
			this.item('second', date.getSeconds());
			return this;
		},
		/**
		 * 获得日期值
		 * @return Date
		 */
		getDate: function(){
			return new Date(this.real('year') + '/' + this.real('month') + '/' + this.real('date') + ' ' + this.real('hour') + ':' + this.real('minute') + ':' + this.real('second'));
		}
	});

	return DateArray;
});
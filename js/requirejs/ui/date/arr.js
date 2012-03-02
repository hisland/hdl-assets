/**
 * 此模块以数组方式存储日期的6个值,并提供方法进行修改
 * 修改年月的时候会修正日期的最大值
 */

define(['jquery', 'kissy', 'util'], function($, S, U){
	/**
	 * @class
	 */
	function Arr(){
		this._year = 0;
		this._month = 0;
		this._date = 0;
		this._hour = 0;
		this._minute = 0;
		this._second = 0;
	}

	/**
	 * @lends Arr#
	 */
	S.augment(Arr, {
		/**
		 * 设置年
		 * @param n Int
		 * @return this|Int
		 */
		year: function(n){
			if(n === undefined){
				return this._year;
			}else{
				this._year = n;
				this.__repairDate();
				return this;
			}
		},
		/**
		 * 设置月份
		 * @param n Int
		 * @return this|Int
		 */
		month: function(n){
			if(n === undefined){
				return this._month;
			}else{
				this._month = n;
				this.__repairDate();
				return this;
			}
		},
		/**
		 * 设置日期
		 * @param n Int
		 * @return this|Int
		 */
		date: function(n){
			if(n === undefined){
				return this._date;
			}else{
				this._date = n;
				return this;
			}
		},
		/**
		 * 设置小时
		 * @param n Int
		 * @return this|Int
		 */
		hour: function(n){
			if(n === undefined){
				return this._hour;
			}else{
				this._hour = n;
				return this;
			}
		},
		/**
		 * 设置分钟
		 * @param n Int
		 * @return this|Int
		 */
		minute: function(n){
			if(n === undefined){
				return this._minute;
			}else{
				this._minute = n;
				return this;
			}
		},
		/**
		 * 设置秒
		 * @param n Int
		 * @return this|Int
		 */
		second: function(n){
			if(n === undefined){
				return this._second;
			}else{
				this._second = n;
				return this;
			}
		},
		/**
		 * 设置日期对象
		 * @param date Date 需要设置的日期对象
		 * @return this
		 */
		setDate: function(date){
			this._year = date.getFullYear();
			this._month = date.getMonth() + 1;
			this._date = date.getDate();
			this._hour = date.getHours();
			this._minute = date.getMinutes();
			this._second = date.getSeconds();
			return this;
		},
		/**
		 * 返回日期对象
		 * @return Date
		 */
		getDate: function(){
			return new Date(this._year + '/' + this._month + '/' + this._date + ' ' + this._hour + ':' + this._minute + ':' + this._second);
		},
		/**
		 * 修正日期值
		 * @return this 
		 */
		__repairDate: function(){
			var max = this.getMonthDays();
			if(max < this._date){
				this._date = max;
			}
			return this;
		},
		days_list: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		/**
		 * 修正2月的最大天数
		 * @return this
		 */
		__repairMonth2: function(){
			this.days_list[2] = this._year%400===0 || (this._year%4===0 && this._year%100!==0) ? 29 : 28;
			return this;
		},
		/**
		 * 获得当月最大天数
		 * @return Int
		 */
		getMonthDays: function(){
			return this.__repairMonth2().days_list[this._month];
		},
		/**
		 * 返回日期字符串表示
		 * @return Int
		 */
		toString: function(){
			return U.dateTimeString(this.getDate());
		}
	});

	return Arr;
});
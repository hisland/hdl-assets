/**********************************************************************************************
 * 增加日期对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * NOTICE:
 *		设置时,前置0都可省略
 * 
 * API:
 *		var d = new Date();
 *		d.dateString();		//取得日期字符串,如:2011-09-20
 *		d.dateString('2010-09-1');		//将日期设置为2010-09-1
 *		d.dateString('2010/09/1');		//将日期设置为2010-09-1
 * 
 *		d.timeString();		//取得日期字符串,如:10:46:11
 *		d.timeString('10:46:11');		//将时间设置为10:46:11
 * 
 *		d.dateTimeString();		//取得日期字符串,如:2011-09-20 10:47:10
 *		d.dateTimeString('2011-09-20 10:47:10');		//将时间设置为2011-09-20 10:47:10
 *		d.dateTimeString('2011/09/20 10:47:10');		//将时间设置为2011-09-20 10:47:10
 *		
 *		d.isValid();	//检测日期是否合法,返回true|false
 *		
 *		d.add(123); d.add('1234'); d.add(-123) 增加或减少毫秒数,参数为可转化成数字的变量
 *		d.add('year'); d.add('month')  指定部分加1,参数为[year|month|date|hour|minute|second]
 *		d.add('year', 123); d.add('month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
 * 
 */

(function(){
	//将长度为1的字符串前置0
	function __length1Prefix0(value){
		value += '';
		return value.length==1 ? '0'+value : value;
	}
	//add具体的type
	function __add(type, value){
		if(type === 'year'){
			this.setFullYear(this.getFullYear() + value);
		}else if(type === 'month'){
			this.setMonth(this.getMonth() + value);
		}else if(type === 'date'){
			this.setDate(this.getDate() + value);
		}else if(type === 'hour'){
			this.setHours(this.getHours() + value);
		}else if(type === 'minute'){
			this.setMinutes(this.getMinutes() + value);
		}else if(type === 'second'){
			this.setSeconds(this.getSeconds() + value);
		}else if(type === 'millisecond'){
			this.setMillisecond(this.getMillisecond() + value);
		}
		return this;
	};

	Date.prototype.dateString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4})([-\/])(\d{1,2})\2(\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateString: setting error!');
			}
			this.setFullYear(arr[1]);
			this.setMonth(arr[3]-1);
			this.setDate(arr[4]);
			return this;
		}else{
			var y = this.getFullYear(),
				m = __length1Prefix0(this.getMonth()+1),
				d = __length1Prefix0(this.getDate());
			return y+'-'+m+'-'+d;
		}
	};
	Date.prototype.timeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/);
			if(!arr){
				alert('Date.prototype.timeString: setting error!');
			}
			this.setHours(arr[1]);
			this.setMinutes(arr[2]);
			this.setSeconds(arr[3]);
			return this;
		}else{
			var h = __length1Prefix0(this.getHours()),
				m = __length1Prefix0(this.getMinutes()),
				s = __length1Prefix0(this.getSeconds());
			return h+':'+m+':'+s;
		}
	};
	Date.prototype.dateTimeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateTimeString: setting error!');
			}
			this.dateString(arr[1]);
			this.timeString(arr[3]);
			return this;
		}else{
			return this.dateString()+' '+this.timeString();
		}
	};
	Date.prototype.getMonthStart = function(){
		//创建副本
		var rs = new Date(+this);
		rs.setDate(1);
		rs.timeString('00:00:00');
		return rs;
	};
	Date.prototype.getMonthEnd = function(){
		//创建副本
		var rs = new Date(+this),
			year = rs.getFullYear(),
			month_days_list = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		month_days_list[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;

		rs.setDate(month_days_list[rs.getMonth()]);
		rs.timeString('23:59:59');
		return rs;
	};
	Date.prototype.isValid = function(){
		if(/^NaN$|^Invalid Date$/.test(this.toString())){
			return false;
		}
		return true;
	};
	Date.prototype.add = function(type, value){
		var reg = /^(?:year|month|date|hour|minute|second)$/;

		if(type === undefined){
			alert('Date.prototype.add: type is undefined!');
		}else if(value === undefined){
			if(!isNaN(type)){
				type -= 0;
				this.setTime(this.getTime() + type);
			}else if(reg.test(type)){
				value = 1;
				__add.call(this, type, value);
			}
		}else{
			if(!isNaN(value) && reg.test(type)){
				value -= 0;
				__add.call(this, type, value);
			}
		}
		return this;
	};
})();


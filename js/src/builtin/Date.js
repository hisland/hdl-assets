/**********************************************************************************************
 * 
 * 增加日期对象方法
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

(function(){
	//将长度为1的字符串前置0
	function length1Prefix0(value){
		value += '';
		return value.length==1 ? '0'+value : value;
	}
	//内部add方法,,add具体的type
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

	//有value设置日期,无value读取日期
	//参数形式:'2010-09-01'|'2010/09/01' 前置0可省略
	Date.prototype.dateString = function(value){
		if(value){
			value += '';
			var arr = value.match(/\d{4}([-\/])\d{1,2}\1\d{1,2}/);
			if(!arr){
				alert('Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略');
				throw 'Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略';
			}
			this.setFullYear(arr[1]);
			this.setMonth(arr[2]-1);
			this.setDate(arr[3]);
			return this;
		}else{
			var  y = this.getFullYear()
				,m = length1Prefix0(this.getMonth()+1)
				,d = length1Prefix0(this.getDate());
			return y+'-'+m+'-'+d;
		}
	};
	Date.prototype.timeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/\d{1,2}:\d{1,2}:\d{1,2}/);
			if(!arr){
				alert('Date.prototype.timeString: 出错,请确保参数格式为 09:05:02 前置0可省略');
				throw 'Date.prototype.timeString: 出错,请确保参数格式为 09:05:02 前置0可省略';
			}
			this.setHours(arr[1]);
			this.setMinutes(arr[2]);
			this.setSeconds(arr[3]);
			return this;
		}else{
			var  h = length1Prefix0(this.getHours())
				,m = length1Prefix0(this.getMinutes())
				,s = length1Prefix0(this.getSeconds());
			return h+':'+m+':'+s;
		}
	};
	Date.prototype.dateTimeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateTimeString: 出错,请确保参数格式为 2010-09-01 09:05:02 或 2010/09/01 09:05:02 前置0可省略');
				throw 'Date.prototype.dateTimeString: 出错,请确保参数格式为 2010-09-01 09:05:02 或 2010/09/01 09:05:02 前置0可省略';
			}
			this.dateString(arr[1]);
			this.timeString(arr[3]);
			return this;
		}else{
			return this.dateString()+' '+this.timeString();
		}
	};
	Date.prototype.isValid = function(){
		if(/^NaN$|^Invalid Date$/.test(this.toString())){
			return false;
		}
		return true;
	};

	//var d = new Date()
	//d.add(123) d.add('1234') d.add(-123) 增加或减少毫秒数,参数为可转化成数字的变量
	//d.add('year) d.add('month')  指定部分加1,参数为[year|month|date|hour|minute|second]
	//d.add('year', 123) d.add('month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
	Date.prototype.add = function(type, value){
		var reg = /^(?:year|month|date|hour|minute|second)$/;

		if(type === undefined){
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

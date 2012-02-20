/**
 * date有用的工具
 */
define(['kissy'], function(S){
	//将长度为1的字符串前置0
	function __length1Prefix0(value){
		return value.length == 1 ? '0' + value : value;
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
	}

	return {
		/**
		 * 根据输入参数获取时间,不能转换返回null
		 * @param Object obj
		 * @return Date|null
		 */
		getDate: function(obj){
			//数字直接认为是毫秒数
			if(S.isNumber(obj)){
				return new Date(obj);
			}else if(S.isString(obj)){
				obj = new Date(obj.replace(/-/g,'/'));
				if(!this.isValidDate(obj)){
					obj = null;
				}
				return obj;
			}else if(S.isDate(obj)){
				return obj;
			}else{
				return null;
			}
		},
		/**
		 * 检测是否为正确的时间对象
		 * @param Object obj
		 * @return true|false
		 */
		isValidDate: function(obj){
			if(S.isDate(obj) && !/^NaN$|^Invalid Date$/.test(this.toString())){
				return true;
			}else{
				return false;
			}
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * <pre><code>
		 * var d = new Date();
		 * Tools.dateAdd(d, 123); Tools.dateAdd(d, '1234'); Tools.dateAdd(d, -123) 增加或减少毫秒数,参数为可转化成数字的变量
		 * Tools.dateAdd(d, 'year'); Tools.dateAdd(d, 'month')  指定部分加1,参数为[year|month|date|hour|minute|second]
		 * Tools.dateAdd(d, 'year', 123); Tools.dateAdd(d, 'month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
		 * </code></pre>
		 * @param Date date
		 * @param String type
		 * @param String|Number value
		 * @return Date
		 */
		dateAdd: function(date, type, value){
			var reg = /^(?:year|month|date|hour|minute|second)$/;

			if(value === undefined){
				if(!isNaN(type)){
					type -= 0;
					date.setTime(date.getTime() + type);
				}else if(reg.test(type)){
					value = 1;
					__add.call(date, type, value);
				}
			}else{
				if(!isNaN(value) && reg.test(type)){
					value -= 0;
					__add.call(date, type, value);
				}
			}
			return date;
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * @param Date date
		 * @param String value
		 * @return Date|String
		 */
		dateString: function(date, value){
			if(S.isString(value)){
				var arr = value.match(/(\d{4})([-\/])(\d{1,2})\2(\d{1,2})/);
				date.setFullYear(arr[1]);
				date.setMonth(arr[3]-1);
				date.setDate(arr[4]);
				return date;
			}else{
				var y = date.getFullYear(),
					m = __length1Prefix0(date.getMonth()+1),
					d = __length1Prefix0(date.getDate());
				return y + '-' + m + '-' + d;
			}
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * @param Date date
		 * @param String value
		 * @return Date|String
		 */
		timeString: function(date, value){
			if(S.isString(value)){
				var arr = value.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/);
				date.setHours(arr[1]);
				date.setMinutes(arr[2]);
				date.setSeconds(arr[3]);
				return date;
			}else{
				var h = __length1Prefix0(date.getHours()),
					m = __length1Prefix0(date.getMinutes()),
					s = __length1Prefix0(date.getSeconds());
				return h + ':' + m + ':' + s;
			}
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * @param Date date
		 * @param String value
		 * @return Date|String
		 */
		dateTimeString: function(date, value){
			if(S.isString(value)){
				var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
				this.dateString(date, arr[1]);
				this.timeString(date, arr[3]);
				return date;
			}else{
				return this.dateString(date) + ' ' + this.timeString(date);
			}
		},
		/**
		 * 取得月份开始日期对象
		 * @param Date date
		 * @return Date
		 */
		getMonthStart: function(date){
			//创建副本
			var rs = new Date(+this);
			rs.setDate(1);
			this.timeString(rs, '00:00:00');
			return rs;
		},
		/**
		 * 取得月份结束日期对象
		 * @param Date date
		 * @return Date
		 */
		getMonthEnd: function(date){
			//创建副本
			var rs = new Date(+date),
				year = rs.getFullYear(),
				month_days_list = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			month_days_list[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;

			rs.setDate(month_days_list[rs.getMonth()]);
			this.timeString(rs, '23:59:59');
			return rs;
		}
	};
});
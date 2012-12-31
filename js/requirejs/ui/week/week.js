/**
 * 周对象
 */

define(['jquery', 'kissy', 'css!./week'], function($, S){
	/**
	 * 周对象, 可方便传入年和周
	 * @class
	 */
	function Week(year, week){
		//从字符串预处理
		if(S.isString(year)){
			//可转换成日期对象
			if(year.getDate()){
				year = year.getDate();
			}
			//可转换成数字
			else if(S.isNumber(year-0)){
				year -= 0;
			}
			//其它情况
			else{
				year = null;
			}
		}

		//为日期对象,直接使用
		if(year instanceof Date){
			this.setDate(year);
		}
		//为数字设置年,默认第1周
		else if(S.isNumber(year)){
			this.year(year);
			this.week(week-0 || 1);
		}
		//其它情况使用当时时间
		else{
			this.setDate(new Date());
		}

		return this;
	}
	/**
	 * 设置原型方法
	 * @lends Week#
	 */
	S.augment(Week, {
		/**
		 * 传y表示设置, 不传y表示取值
		 * <pre><code>
		 * var w = $.week();
		 * w.year();   返回年数字
		 * w.year(2011);   设置为2011年, 返回this
		 * w.year('2011');   设置为2011年, 返回this
		 * </code></pre>
		 * @param n Int
		 * @return this|Int
		 */
		year: function(y){
			if(y !== undefined){
				this.__year = y-0;
				this.__baseDate();
				return this;
			}else{
				return this.__year;
			}
		},
		/**
		 * 传n表示设置, 不传n表示取值
		 * <pre><code>
		 * var w = $.week();
		 * w.week();   返回周数字
		 * w.week(3);   设置为第3周, 返回this
		 * w.week('3');   设置为第3周, 返回this
		 * </code></pre>
		 * @param n Int
		 * @return this|Int
		 */
		week: function(n, force){
			if(n !== undefined){
				n -= 0;
				if (n > 0 && n <= this.maxWeek()) {
					this.__week = n;
				}else if (n > this.maxWeek() && force) {
						this.year(this.year() + 1);
						this.__week = n - this.maxWeek();
				}
				return this;
			}else{
				return this.__week;
			}
		},
		/**
		 * 取得当年最大周
		 * @return Int
		 */
		maxWeek: function(){
			var bak = this.week(), max;
			//一年正常有53周,最多有54周,从52周开始增加,直到停止
			this.week(52);
			while(this.start().getFullYear() === this.year()){
				this.next();
			}
			max = this.prev().week();
			this.week(bak);
			return max;
		},
		/**
		 * 将对象的内部值后移n(默认1)周
		 * <pre><code>
		 * var w = $.week();
		 * w.week(3);   设置为第3周
		 * w.next();   后移一周
		 * w.week();   返回4
		 * w.next(5);   后移5周
		 * w.week();   返回9
		 * </code></pre>
		 * @param n Int
		 * @return this
		 */
		next: function(n){
			n = n<1 || 1;
			return this.week(this.__week + n);
		},
		/**
		 * 将对象的内部值前移n(默认1)周
		 * <pre><code>
		 * var w = $.week();
		 * w.week(10);   设置为第3周
		 * w.prev();   前移一周
		 * w.week();   返回9
		 * w.prev(3);   前移3周
		 * w.week();   返回6
		 * </code></pre>
		 * @param n Int
		 * @return this
		 */
		prev: function(n){
			n = n<1 || 1;
			return this.week(this.__week - n);
		},
		/**
		 * 将对象的内部值设置为指定日期对象
		 * @param date Date
		 * @return this
		 */
		setDate: function(date){
			//从String转换成Date
			if(S.isString(date)){
				date = date.getDate();
			}
			if(date instanceof Date){
				this.year(date.getFullYear());

				//1年最多53自然周
				for(var i=1; i<55; i++){
					this.week(i);
					//当start大于时,表示date属于上周
					if(this.start() > date){
						this.week(i-1);
						break;
					}
				}
			}else{
				S.log('$.week().setDate(date): date must be a valid Date or dateString!');
			}
			return this;
		},
		/**
		 * 返回当前周的开始日期对象
		 * @return Date
		 */
		start: function(){
			return new Date(+this.base_date + (this.__week-1)*7*86400000);
		},
		/**
		 * 返回当前周的结束日期对象
		 * @return Date
		 */
		end: function(){
			return new Date(+this.base_date + this.__week*7*86400000-1);
		},
		/**
		 * 修正某年1月1日所处的星期
		 * @return this
		 */
		__baseDate: function(){
			var base_date = new Date(this.__year+'/1/1'),
				first_day = base_date.getDay() || 7,
				lost_days = first_day > 1 ? 8-first_day : 0;

			//+base_date, 会将Date对象转换成数字值
			this.base_date = lost_days ? new Date(+base_date + (lost_days-7)*86400000) : base_date;
			return this;
		}
	});

	return Week;
});

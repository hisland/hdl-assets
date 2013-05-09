define(['kissy'], function(S){
function Week(year, week){
	//更改为构造方式
	if(!(this instanceof Week)){
		return new Week(year, week);
	}

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
S.augment(Week, {
	year: function(y){
		if(y !== undefined){
			this.__year = y-0;
			this.__baseDate();
			return this;
		}else{
			return this.__year;
		}
	},
	week: function(n){
		if(n !== undefined){
			this.__week = n-0;
			return this;
		}else{
			return this.__week;
		}
	},
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
	next: function(n){
		n = n<1 || 1;
		return this.week(this.__week + n);
	},
	prev: function(n){
		n = n<1 || 1;
		return this.week(this.__week - n);
	},
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
			S.log('week().setDate(date): date must be a valid Date or dateString!');
		}
		return this;
	},
	start: function(){
		return new Date(+this.base_date + (this.__week-1)*7*86400000);
	},
	end: function(){
		return new Date(+this.base_date + this.__week*7*86400000-1);
	},
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

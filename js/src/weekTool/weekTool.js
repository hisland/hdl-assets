/**********************************************************************************************
 * 名称: 周控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * 根据某年某周得到这周的开始和结束时间
 *
 * API:
 *		var w = $.weekTool()		获得一个周对象,默认为今年第1周
 *		var w2 = $.weekTool(2012)	获得一个周对象,初始化年为2012年,周还是默认第1周
 *		w.year(2013).week(3)		设置年,周
 *		w.year()					获得设置的年
 *		w.week()					获得设置的周
 *		w.start()					获得开始时间-为时间对象
 *		w.end()						获得结束时间-为时间对象
 *
 */

KISSY.add('weekTool', function(S, undef) {

	function weekTool(year){
		if(year !== undefined){
			return new init(year);
		}else{
			return new init(new Date().getFullYear());
		}
	}

	function init(y){
		this.year(y);
		this.__week = 1;
		return this;
	}

	$.extend(init.prototype, {
		 year: function(y){
			if(y !== undefined){
				this.__year = y-0;
				return this.__baseDate();
			}else{
				return this.__year;
			}
		}
		,week: function(n){
			if(n !== undefined){
				this.__week = n-0;
				return this;
			}else{
				return this.__week;
			}
		}
		,__baseDate: function(){
			var  base_date = new Date(this.__year+'/1/1')
				,first_day = base_date.getDay() || 7
				,lost_days = first_day > 1 ? 8-first_day : 0;

			this.base_date = lost_days ? new Date(+base_date + (lost_days-7)*86400000) : base_date;
			return this;
		}
		,start: function(){
			return new Date(+this.base_date + (this.__week-1)*7*86400000);
		}
		,end: function(){
			return new Date(+this.base_date + this.__week*7*86400000-1);
		}
	});

	$.weekTool = weekTool;
}, {
	requires: ['jquery-1.4.2']
});

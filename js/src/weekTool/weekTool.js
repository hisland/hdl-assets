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
	var  $ = jQuery
		,EMPTY_$ = $('')
		,ipt_now = EMPTY_$
		,ipt_start = EMPTY_$
		,ipt_end = EMPTY_$
		,div_pop = EMPTY_$
		,a_year = EMPTY_$
		,div_year_list = EMPTY_$
		,div_list = EMPTY_$;

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

	function makeList(year){
		var  w = new init(year)
			,b = []
			,i = 1, t;

		//按自然周算,一年正常有53周,最多有54周,最后一周根据年相同与否来判断
		for(; i<=54; i++){
			if(i<54 || w.week(i).start().getFullYear() == year){
				w.week(i);
				b.push('<li><span class="week-tool-col1">', i, '</span><a href="#" class="week-tool-col2">');
				t = w.start();
				b.push(t.dateTimeString());
				b.push('</a><a href="#" class="week-tool-col3">');
				t = w.end();
				b.push(t.dateTimeString());
				b.push('</a></li>');
			}
		}

		div_list.html(b.join(''));
	}
	function makeYearList(from, to){
		var  b = [];
		for(; from<to; from++){
			b.push('<a href="#" class="week-tool-yearli">', from, '</a> ');
		}
		div_year_list.html(b.join(''));
	}

	//公共显示隐藏函数
	function popShow(){
		//需要时再加载此层
		if(!div_pop.length){
			div_pop = $('<div class="week-tool-wrap"><div class="week-tool-yearw"><a href="#" class="week-tool-yearwp">&lt;</a><a href="#" class="week-tool-year">2011</a><a href="#" class="week-tool-yearwn">&gt;</a></div><div class="week-tool-yearp"><div class="week-tool-yearl"></div><div class="week-tool-yearlp"><a href="#" class="week-tool-yearlpp">上一页</a><a href="#" class="week-tool-yearlpn">下一页</a></div></div><div class="week-tool-head"><span class="week-tool-col1">周</span><span class="week-tool-col2">开始时间</span><span class="week-tool-col3">结束时间</span></div><ul class="week-tool-list"></ul></div>');
			div_pop.click(popClick).dblclick(popDblClick);
			a_year = div_pop.find('a.week-tool-year');
			div_year_list = div_pop.find('div.week-tool-yearl');
			div_list = div_pop.find('ul.week-tool-list');
			div_pop.appendTo('body');
		}
		div_pop.show().adjustElement(ipt_now);
	}
	function popHide(){
		div_year_list.parent().hide();
		div_pop.hide();
	}

	//输入框的一系列事件
	function iptFocus(e){
		var other;
		if(ipt_now[0] != this){
			ipt_now = $(this);
			if(other = ipt_now.attr('data-week-start')){
				ipt_start = $(other);
				ipt_end = ipt_now;
			}else if(other = ipt_now.attr('data-week-end')){
				ipt_start = ipt_now;
				ipt_end = $(other);
			}else{
				ipt_start = ipt_end = EMPTY_$;
			}
			popShow();
			makeList(2011);
		}else{
			popShow();
		}
	}
	function popClick(e){
		var  t = e.target
			,dt = $(t)
			,li_p, val;

		if(dt.is('a')){
			li_p = dt.parent();
			if(dt.is('.week-tool-col2')){//开始时间
				li_p.prevAll('.week-tool-selected').removeClass('week-tool-selected');
				if(li_p.nextAll('.week-tool-selected').length){
					li_p.nextUntil('.week-tool-selected').andSelf().addClass('week-tool-selected');
					ipt_start.val(dt.text());
				}else{
					li_p.addClass('week-tool-selected');
					ipt_start.val(dt.text());
					ipt_end.val(dt.next().text());
				}
			}else if(dt.is('.week-tool-col3')){//结束时间
				li_p.nextAll('.week-tool-selected').removeClass('week-tool-selected');
				if(li_p.prevAll('.week-tool-selected').length){
					li_p.prevUntil('.week-tool-selected').andSelf().addClass('week-tool-selected');
					ipt_end.val(dt.text());
				}else{
					li_p.addClass('week-tool-selected');
					ipt_end.val(dt.text());
					ipt_start.val(dt.prev().text());
				}
			}else if(dt.is('.week-tool-yearwp')){//年-
				val = a_year.text()-1;
				a_year.html(val);
				makeList(val);
			}else if(dt.is('.week-tool-yearwn')){//年+
				val = a_year.text()-0+1;
				a_year.html(val);
				makeList(val);
			}else if(dt.is('.week-tool-year')){//点击显示年
				val = dt.text()-0;
				makeYearList(val-12, val+12);
				div_year_list.parent().show();
			}else if(dt.is('.week-tool-yearli')){//年列表
				val = dt.text()-0;
				a_year.html(val);
				makeList(val);
			}else if(dt.is('.week-tool-yearlpp')){//年列表上一页
				val = div_year_list.find('a:first').text()-0;
				makeYearList(val-24, val);
			}else if(dt.is('.week-tool-yearlpn')){//年列表下一页
				val = div_year_list.find('a:last').text()-0;
				makeYearList(val+1, val+25);
			}
			dt.blur();
			e.preventDefault();
		}

		//内部隐藏年列表层
		if(!(dt.is('a.week-tool-year') || dt.closest('.week-tool-yearp').length)){
			div_year_list.parent().hide();
		}
	}
	function popDblClick(e){
		if($(e.target).is('a.week-tool-col2, a.week-tool-col3')){
			popHide()
		}
	}

	function isWeekInput(elm){
		var attr = elm.getAttribute('type');
		if(elm.tagName.toUpperCase() === 'INPUT' && attr === 'week'){
			return true;
		}else{
			return false;
		}
	}

	//注册事件,可用于手工注册
	function weekTool(){
		this.each(function(i, v){
			if(!v.__bind_week_tool){
				v.__bind_week_tool = true;

				$(v).focus(iptFocus);
			}
		});
		return this;
	}

	//文档上监听并注册事件
	function documentClick(e){
		var  t = e.target
			,dt = $(t);
		//如已注册则忽略
		if(!t.__bind_week_tool && isWeekInput(t)){
			dt.weekTool();
			dt.focus();
		}
		//顺带做隐藏操作
		if(!dt.closest('.week-tool-wrap').length && !isWeekInput(t)){
			popHide();
		}
	}
	$(document).click(documentClick);

	$.fn.extend({
		weekTool: weekTool
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});

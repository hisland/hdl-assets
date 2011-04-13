/**********************************************************************************************
 * 名称: 周选择控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * 选择的开始时间和另一周的结束时间
 *
 * 使用方法参见demo.html
 *
 */

KISSY.add('weekTool', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,ipt_now = EMPTY_$
		,ipt_start = EMPTY_$
		,ipt_end = EMPTY_$
		,a_year_from = EMPTY_$
		,a_year_to = EMPTY_$
		,div_pop = EMPTY_$
		,div_num_list = EMPTY_$
		,div_from_list = EMPTY_$
		,div_to_list = EMPTY_$
		,div_year_list = EMPTY_$;

	//周对象, 可方便传入年和周,周获得此周的开始结束时间
	function Week(year){
		if(year === undefined){
			year = new Date().getFullYear();
		}
		this.year(year);
		this.__week = 1;
		return this;
	}
	$.extend(Week.prototype, {
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
		,getList: function(){
			var  num = [], start = [], end = []
				,i = 1, t;

			//按自然周算,一年正常有53周,最多有54周,最后一周根据年相同与否来判断
			for(; i<=54; i++){
				if(i<54 || this.week(i).start().getFullYear() == this.__year){
					this.week(i);
					num.push('<span class="weektool-col1">', i, '</span>');
					t = this.start();
					start.push('<a href="#" class="weektool-col2">', t.dateTimeString(), '</a>');
					t = this.end();
					end.push('<a href="#" class="weektool-col2">', t.dateTimeString(), '</a>');
				}
			}
			return [num.join(''), start.join(''), end.join('')];
		}
	});

	function makeYearList(from, to, now){
		var  b = [];
		for(; from<to; from++){
			b.push('<a href="#" class="weektool-4-i">', from, '</a> ');
		}
		div_year_list.html(b.join(''));
	}

	//日期层显示/隐藏
	function wrapShow(){
		//需要时再加载此层
		if(!div_pop.length){
			div_pop = $('<div class="weektool-wrap"><div class="weektool-legend"><div class="weektool-div1"><span class="weektool-col1-0"></span><span class="weektool-col1-0">周</span></div><div class="weektool-div2"><span class="weektool-col2-0"><a href="#" class="weektool-yearp">&lt;</a><a href="#" class="weektool-year">2011</a><a href="#" class="weektool-yearn">&gt;</a><a href="#" class="weektool-yeart">今年</a></span><span class="weektool-col2-0">开始时间</span></div><div class="weektool-div3"><span class="weektool-col3-0"><a href="#" class="weektool-yearp">&lt;</a><a href="#" class="weektool-year">2011</a><a href="#" class="weektool-yearn">&gt;</a><a href="#" class="weektool-yeart">今年</a></span><span class="weektool-col3-0">结束时间</span></div></div><div class="weektool-content"><div class="weektool-col1w"></div><div class="weektool-col2w"></div><div class="weektool-col3w"></div></div><div class="weektool-div4"><div class="weektool-div4-1"><a href="#" class="weektool-4-i"></a></div><div class="weektool-div4-2"><a href="#" class="weektool-4-p">上一页</a><a href="#" class="weektool-4-n">下一页</a></div></div></div>');
			div_pop.click(popClick).dblclick(popDblClick);

			a_year_from = div_pop.find('a.weektool-year:eq(0)');
			a_year_to = div_pop.find('a.weektool-year:eq(1)');

			div_num_list = div_pop.find('div.weektool-col1w');
			div_from_list = div_pop.find('div.weektool-col2w');
			div_to_list = div_pop.find('div.weektool-col3w');
			div_year_list = div_pop.find('div.weektool-div4-1');

			div_pop.appendTo('body');
		}
		div_pop.show().adjustElement(ipt_now);
	}
	function wrapHide(){
		div_year_list.parent().hide();
		div_pop.hide();
	}

	//输入框的一系列事件
	function iptFocus(e){
		var other, list;
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
			wrapShow();

			list = (new Week()).getList();
			div_num_list.html(list[0]);
			div_from_list.html(list[1]);
			div_to_list.html(list[2]);
		}else{
			wrapShow();
		}
	}
	function popClick(e){
		var  t = e.target
			,dt = $(t)
			,li_p, val;

		if(dt.is('a')){
			if(dt.is('.weektool-col2')){//开始时间
				li_p.prevAll('.weektool-selected').removeClass('weektool-selected');
				if(li_p.nextAll('.weektool-selected').length){
					li_p.nextUntil('.weektool-selected').andSelf().addClass('weektool-selected');
					ipt_start.val(dt.text());
				}else{
					li_p.addClass('weektool-selected');
					ipt_start.val(dt.text());
					ipt_end.val(dt.next().text());
				}
			}else if(dt.is('.weektool-col3')){//结束时间
				li_p.nextAll('.weektool-selected').removeClass('weektool-selected');
				if(li_p.prevAll('.weektool-selected').length){
					li_p.prevUntil('.weektool-selected').andSelf().addClass('weektool-selected');
					ipt_end.val(dt.text());
				}else{
					li_p.addClass('weektool-selected');
					ipt_end.val(dt.text());
					ipt_start.val(dt.prev().text());
				}
			}else if(dt.is('.weektool-yearp')){//年-
				val = a_year.text()-1;
				a_year.html(val);
				makeList(val);
			}else if(dt.is('.weektool-yearn')){//年+
				val = a_year.text()-0+1;
				a_year.html(val);
				makeList(val);
			}else if(dt.is('.weektool-yeart')){//今年
				val = new Date().getFullYear();
				if(a_year.text() != val){
					a_year.html(val);
					makeList(val);
				}
			}else if(dt.is('.weektool-year')){//点击显示年
				val = dt.text()-0;
				makeYearList(val-12, val+12);
				div_year_list.parent().show();
			}else if(dt.is('.weektool-4-i')){//年列表
				val = dt.text()-0;
				a_year.html(val);
				makeList(val);
				div_year_list.parent().hide();
			}else if(dt.is('.weektool-4-p')){//年列表上一页
				val = div_year_list.find('a:first').text()-0;
				makeYearList(val-24, val);
			}else if(dt.is('.weektool-4-n')){//年列表下一页
				val = div_year_list.find('a:last').text()-0;
				makeYearList(val+1, val+25);
			}
			dt.blur();
			e.preventDefault();
		}

		//内部隐藏年列表层
		if(!(dt.is('a.weektool-year') || dt.closest('.weektool-div4').length)){
			div_year_list.parent().hide();
		}
	}
	//在日期上双击关闭
	function popDblClick(e){
		if($(e.target).is('a.weektool-col2, a.weektool-col3')){
			wrapHide();
		}
	}

	//检测目录是否为周选择控件
	function isWeekInput(elm){
		var attr = elm.getAttribute('type');
		if(elm.tagName.toUpperCase() === 'INPUT' && (attr === 'week-start' || attr === 'week-end')){
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
		if(!dt.closest('.weektool-wrap').length && !isWeekInput(t)){
			wrapHide();
		}
	}
	$(document).click(documentClick);

	$.fn.extend({
		weekTool: weekTool
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});

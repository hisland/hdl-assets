/**
 * @fileOverview
 * @module weekTool
 * @author hisland hisland@qq.com
 * @description 周选择控件
 * <pre><code>
 * API:
 *		$.week();	//获得对象,默认使用当前时间
 *		$.week(2001);, $.week('2001');	//获得对象,使用2001年和第1周
 *		$.week(2001, 5);, $.week('2001', 5);	//获得对象,使用2001年和第5周
 *		$.week('2011-5-6');	//获得对象,使用2011-5-6进行初始化
 * 
 *		var w = $.week();
 *		w.next();	//移动到下一周
 *		w.prev();	//移动到上一周
 *		w.next(5);	//移动到下5周
 *		w.prev(5);	//移动到上5周
 *		w.year(2010);, w.year('2010');	//设置年
 *		w.week(25);, w.week('25');	//设置周
 *		w.setDate('2009-5-4');	//设置时间
 *		w.setDate(new Date());	//设置时间,用日期对象
 *		w.year();	//取年
 *		w.week();	//取周
 *		w.maxWeek();	//当年最大周
 *		w.start();	//取当周的开始时间
 *		w.end();	//取当周的结束时间
 * 
 *		$(':text.start').weekTool();		//初始化周控件,有弹出层显示
 *		$(':text.start').weekTool({year_range: [2005, 2009]});		//初始化周控件,年范围为2005-2009
 *		$(':text.start').weekTool('off');	//禁用
 *		$(':text.start').weekTool('on');	//启用
 * 
 * TODO:
 *		2011-08-08 10:25:49:
 *			增加next(n), prev(n)方法进行周的移动
 * 
 *		2011-09-15 18:07:38:
 *			各方法的边界检测
 * </code></pre>
 */

KISSY.add('weekTool', function(S, undef) {
	var msg_please_check = '请选择',
		msg_ok = '确定',
		msg_close_title = '双击选择并关闭';
	
	//JS国际化信息覆盖
	if(window.JS_I18N){
		msg_please_check = JS_I18N['js.common.weekTool.msg_please_check'];
		msg_ok = JS_I18N['js.common.weekTool.msg_ok'];
		msg_close_title = JS_I18N['js.common.weekTool.msg_close_title'];
	}

	var $ = jQuery,
		$EMPTY = $(''),
		pop = $.popWin.init(),

		$box_left = $('<div class="weektool" style="width:100px;"></div>'),
		$box_wrap = $('<div class="weektool" style="margin-left:5px;width:340px;"></div>'),
		$box_mid = $('<div style="float:left;width:160px;"></div>').appendTo($box_wrap),
		$box_right = $('<div style="float:left;width:160px;" title="' + msg_close_title + '"></div>').appendTo($box_wrap),

		$btn_wrap = $('<div class="win1-btns"><input type="submit" value="' + msg_ok + '" class="win1-btn-ok"></div>'),
		$btn_ok = $btn_wrap.find('input'),

		$ipt_start = $EMPTY,
		$ipt_end = $EMPTY,
		setting;
	
	var default_setting = {
		year_range: [2000, 2030],
		enable: true
	}

	//周对象, 可方便传入年和周
	function WeekUtil(year, week){
		//更改为构造方式
		if(!(this instanceof WeekUtil)){
			return new WeekUtil(year, week);
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
	//设置原型方法
	S.augment(WeekUtil, {
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
				S.log('$.week().setDate(date): date must be a valid Date or dateString!');
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

	//初始化弹出层结构
	pop.$content.append($box_left).append($box_wrap).append($btn_wrap);
	pop.setTitle(msg_please_check);
	pop.setInnerWidth(450);
	pop.manager.$div.addClass('not-remove');

	//生成年列表
	function makeYearList(now){
		var b = [], from = setting.year_range[0], to = setting.year_range[1];
		//修正当前年
		if(now < from){
			now = from;
		}else if(now > to){
			now = to;
		}

		for(; from <= to; from++){
			if(from != now){
				b.push('<a href="#">', from, '</a>');
			}else{
				b.push('<a href="#" class="hover">', from, '</a>');
			}
		}
		$box_left.html(b.join(''));
	}

	//生成开始结束时间列表
	function makeOtherList(year){
		var week = WeekUtil(year), max = week.maxWeek();
		var b_start = [], b_end = [];
		for(var i=1; i<=max; i++){
			b_start.push('<a href="#"><strong>', i, '</strong><span>', week.week(i).start().dateTimeString(), '</span></a>')
			b_end.push('<a href="#"><strong>', i, '</strong><span>', week.end().dateTimeString(), '</span></a>')
		}
		$box_mid.html(b_start.join(''));
		$box_right.html(b_end.join(''));
	}

	//年点击更新右侧时间列表
	$box_left.click(function(e){
		var dt = $(e.target);
		if(dt.is('a')){
			dt.addClass('hover').siblings('.hover').removeClass('hover');

			//保存前面的索引
			var start = $box_mid.find('a.hover').index();
			var end = $box_right.find('a.hover').index();

			//修正在末尾的情况,因为从0开始,所以是53
			if(start == 53){
				start = 52;
			}
			if(end == 53){
				end = 52;
			}

			//生成列表并还原选中状态
			makeOtherList(dt.text());
			$box_mid.find('a').eq(start).click();
			$box_right.find('a').eq(end).click();

			dt.blur();
			e.preventDefault();
		}
	});

	//点击开始时间,修正结束时间范围
	function resetRight(i){
		var as = $box_right.find('a');
		as.eq(i).prevAll().addClass('disabled').end().nextAll().andSelf().removeClass('disabled');
		//当选中的是禁用的时候.修改为开始时间对应的结束时间
		if(as.filter('.hover').is('.disabled')){
			as.eq(i).click();
		}
	}
	$box_mid.click(function(e){
		var dt = $(e.target).closest('a', this);
		if(dt.is('a')){
			dt.addClass('hover').siblings('.hover').removeClass('hover');
			resetRight(dt.index());
			dt.blur();
			e.preventDefault();
		}
	});

	//点击结束时间的操作,双击填入并关闭
	$box_right.click(function(e){
		var dt = $(e.target).closest('a', this);
		if(dt.is('a')){
			if(!dt.is('.disabled')){
				dt.addClass('hover').siblings('.hover').removeClass('hover');
			}
			dt.blur();
			e.preventDefault();
		}
	}).dblclick(function(e){
		if(!$(e.target).closest('a', this).is('.disabled')){
			$btn_ok.click();
		}
	});

	//确定按钮点击时放回去
	$btn_ok.click(function(){
		var start = $box_mid.find('.hover');
		var end = $box_right.find('.hover');

		$ipt_start.val(start.find('span').text());
		$ipt_end.val(end.find('span').text());

		pop.hide();
		$ipt_start = $ipt_end = $EMPTY;
	});

	function showPop(){
		var date_start, date_end, week;
		setting = $ipt_start.data('week-tool-setting');
		//禁用时不打开
		if(!setting.enable){
			return ;
		}
		pop.show();

		//从输入框获得时间,不成功则使用当前时间
		if($ipt_start.val().isValidDate()){
			date_start = $ipt_start.val().getDate();
		}else{
			date_start = new Date();
		}
		if($ipt_end.val().isValidDate()){
			date_end = $ipt_end.val().getDate();
		}else{
			date_end = date_start;
		}

		//修正当前选择年
		week = WeekUtil(date_start);
		makeYearList(week.year());
		$box_left.find('.hover').focus().click();

		//填入对应的周
		$box_mid.find('a').eq(week.week()-1).click();
		week.setDate(date_end);
		$box_right.find('a').eq(week.week()-1).focus().click();
	}

	//开始或者结束时间点击时将内部变量设置为正确的引用
	function iptStartFocus(e){
		$ipt_start = $(this);
		$ipt_end = $ipt_start.next();
		showPop();
	}
	function iptEndFocus(e){
		$ipt_end = $(this);
		$ipt_start = $ipt_end.prev();
		showPop();
	}

	//注册事件
	function weekTool(setting){
		if(!S.isPlainObject(setting)){
			if(S.isUndefined(setting)){
				setting = {};
			}else if(setting === 'off'){
				setting = {enable: false};
			}else if(setting === 'on'){
				setting = {enable: true};
			}else{
				setting = {};
			}
		}

		return this.filter(':text').each(function(i, v){
			//初始化配置
			if(!$(v).data('week-tool-setting')){
				$(v).click(iptStartFocus).next().click(iptEndFocus);
				//copy一份新的.否则会导致使用默认对象
				$(v).data('week-tool-setting', S.mix({}, default_setting));
			}

			//修改配置,只能覆盖白名单指定的属性
			S.mix($(v).data('week-tool-setting'), setting, ['year_range', 'enable']);
		});
	}

	$.extend({
		week: WeekUtil
	});
	$.fn.extend({
		weekTool: weekTool
	});
}, {
	requires: ['jquery-1.4.2', 'builtin', 'adjustElement', 'popWin+css']
});

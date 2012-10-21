/**
 * @fileOverview
 * @module dateTool
 * @author hisland hisland@qq.com
 * @description 日期控件
 * <pre><code>
 * API:
 *		$(':text').dateTool();	//初始化, 返回值为date_setting
 *		$(':text').dateTool('year2011');	//初始化,固定住年为2011
 *		$(':text').dateTool('year2011, month9');	//初始化,固定住年为2011,固定住月为9月
 *		$(':text').dateTool({btn_clear_enable: true});	//初始化,可以使用清除按钮
 *		$(':text').dateTool().setWeekStart(7);	//设置周开始为周日
 *		$(':text').dateTool().setWeekStart(1);	//设置周开始为周一
 * 
 * 2011-09-28 10:56:16
 *		各种功能都有开关
 *		最大最小时间限制填充,不限制选择,方便实现, 开关确定是否填充
 *		周开始时间设置
 *		不同月份日期可能变化,e为有效最大值, 其它值不合法时设置为合法值,否则不变
 *		S.guid()控制层级
 * 
 * 2011-10-06 11:10:30
 *		超出时间范围由用户决定继续填充,并加个开关是否允许
 * </code></pre>
 */
define(['jquery', 'kissy', 'util', 'css!./dateTool', 'jquery-plugin'], function($, S, Util){
	var $ = jQuery,
		$EMPTY = $(''),
		$div_wrap,
		$btn_clear, $btn_now, $btn_complete,
		$ipt_year, $ipt_month, $ipt_date, $ipt_hour, $ipt_minute, $ipt_second,
		$div_ipt_list, $div_week_list, $div_date_list, $div_drop_list,
		$now_date, $now_drop,
		$drop_prev, $drop_next, $drop_close,
		$drop_arr, drop_arr_class,
		$target_ipt, $target_fill = $EMPTY,
		setting;

	var msg_week = getText('$calendar.weeklist'),
		msg_clear = getText('清除'),
		msg_now = getText('现在'),
		msg_complete = getText('完成'),
		msg_page_up = getText('上页'),
		msg_page_down = getText('下页'),
		msg_close = getText('关闭');

	//JS国际化信息的覆盖
	if(window.JS_I18N){
		for(var i=1;i<8;i++){
			msg_week[i] = JS_I18N['js.common.dateTool.msg_week' + i];
		}
		msg_clear = JS_I18N['js.common.dateTool.msg_clear'];
		msg_now = JS_I18N['js.common.dateTool.msg_now'];
		msg_complete = JS_I18N['js.common.dateTool.msg_complete'];
		msg_page_up = JS_I18N['js.common.dateTool.msg_page_up'];
		msg_page_down = JS_I18N['js.common.dateTool.msg_page_down'];
		msg_close = JS_I18N['js.common.dateTool.msg_close'];
	}

	function length1Prefix0(value) {
		value += '';
		return value.length == 1 ? '0' + value : value;
	}
	function now(time_offset) {
		time_offset = time_offset - 0 || 0;
		return new Date(+new Date() + time_offset);
	}

	//reg_date共5种形式
	// (^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$) yyyy/mm/dd hh:mm:ss
	// (^\d{4}\/\d{1,2}\/\d{1,2}$)	yyyy/mm/dd
	// (^\d{1,2}:\d{1,2}:\d{1,2}$)	hh:mm:ss
	// (^\d{4}\/\d{1,2}$)			yyyy/mm
	// (^\d{1,2}\/\d{1,2}$)		mm/dd
	var reg_date = /(^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$)|(^\d{4}\/\d{1,2}\/\d{1,2}$)|(^\d{1,2}:\d{1,2}:\d{1,2}$)|(^\d{4}\/\d{1,2}$)|(^\d{1,2}\/\d{1,2}$)/;
	function parseValueToDate(value, time_offset){
		var arr = value.replace(/-/g,'/').match(reg_date),
			date_now = now(time_offset),
			date_obj = null;

		//没有的时候,不做操作,返回当前时间
		if(!arr){

		//"2010/05/19 16:02:26"的形式 == 年/月/日 时:分:秒
		}else if(arr[1]){
			date_obj = new Date(arr[1]);

		//"2010/05/19"的形式 == 年/月/日
		}else if(arr[2]){
			date_obj = new Date(arr[2]);

		//"16:02:26"的形式 == 时:分:秒
		}else if(arr[3]){
			date_obj = new Date(Util.dateString(date_now).replace(/-/g,'/')+' '+arr[3]);

		//"2010/05"的形式 == 年/月
		}else if(arr[4]){
			date_obj = new Date(arr[4]+'/1');

		//"05/19"的形式 == 月/日
		}else if(arr[5]){
			date_obj = new Date(date_now.getFullYear()+'/'+arr[5]);
		}

		return date_obj;
	}

	//DateSetting类
	function DateSetting(){
		//更改为构造方式
		if(!(this instanceof DateSetting)){
			return new DateSetting();
		}

		//固定字符串
		this.fixed = '';

		//每周从周一开始
		this.__week_start = 1;

		//日期禁止
		this.__date_disabled = false;

		//是否禁用
		this.disabled = false;

		//时间偏移
		this.offset = 0;

		//时间范围
		this.min_time = null;
		this.max_time = null;

		//超过最大最小时间继续填充否
		this.over_fill = false;
	}
	S.mix(DateSetting, {
		reg_fixed: /(year|month|date|hour|minute|second)(e|\d*)/g,
		isFixedString: function(str){
			this.reg_fixed.lastIndex = 0;
			return this.reg_fixed.test(str);
		}
	});
	S.augment(DateSetting, {
		days_list: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		item: function(type, value){
			if(arguments.length == 2){
				value = length1Prefix0(value);
				if(this[type] == 'any'){
					this.real(type, value);
				}else if(this[type] == 'e'){
					this.real(type, this.getMonthDays());
				}else{
					this[type] = value;
					this.real(type, value);
				}
				return this;
			}else if(arguments.length == 1){
				return this[type];
			}
		},
		real: function(type, value){
			var m;
			if(arguments.length == 2){
				value -= 0;
				this['real_'+type] = value;
				if(type === 'year'){
					this.__repairMonth2();
				}
				//修正日期大于真实值的情况
				m = this.real('month');
				if(type === 'month' || (type === 'year' && m === 2)){
					if(this.real('date') > this.days_list[m]){
						this.item('date', this.days_list[m]);
					}
				}
				return this;
			}else if(arguments.length == 1){
				return this['real_'+type];
			}
		},
		getMonthDays: function(){
			return this.days_list[this.real('month')];
		},
		getMonthFirstDay: function(){
			return first_day = new Date(this.real('year')+'/'+this.real('month')+'/1').getDay();
		},
		__getBlank: function(){
			//月第一行的空白 = monthfirstday - (weekstart - 7)
			var blank = this.getMonthFirstDay() - (this.__week_start - 7);
			//取值为0-6
			return blank % 7;
		},
		__repairMonth2: function(){
			var year = this.real('year');
			this.days_list[2] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;
			return this;
		},
		setDate: function(date){
			if(date instanceof Date){
				this.item('year', date.getFullYear());
				this.item('month', date.getMonth()+1);
				this.item('date', date.getDate());
				this.item('hour', date.getHours());
				this.item('minute', date.getMinutes());
				this.item('second', date.getSeconds());
				this.__date = date;
			}
			return this;
		},
		getDate: function(){
			return this.__date;
		},
		refreshFixed: function(){
			var i, v, o = {}, $ipt_list = $ipt_year.parent();
			DateSetting.reg_fixed.lastIndex = 0;
			this.fixed.replace(DateSetting.reg_fixed, function(a, b, c){
				if(b && !o[b]){
					o[b] = c;
				}
			});
			$ipt_list.find(':disabled').attr('disabled', false).removeClass('disabled');
			for(i in o){
				if(o.hasOwnProperty(i)){
					v = o[i] || 'any';
					$ipt_list.find('input.hdt-' + i).attr('disabled',true).addClass('disabled');
					this[i] = v;
				}
			}

			//日期被禁用
			if(o['date'] !== undefined){
				this.__date_disabled = true;
			}else{
				this.__date_disabled = false;
			}
			return this;
		},
		refreshDataList: function(){
			var str = [], i,
				days = this.getMonthDays(),
				blank = this.__getBlank(),
				now_day = this.real('date');
			for(i = 0; i < blank; i++) {
				str.push('<span></span>');
			}
			if(this.__date_disabled || S.isFunction(this.itemFilter)){
				for(i = 1; i <= days; i++) {
					if(this.__date_disabled || !this.itemFilter(i)){
						str.push('<strong>' + i + '</strong>');
					}else{
						if(i !== now_day){
							str.push('<a href="#">' + i + '</a>');
						}else{
							str.push('<a href="#" class="hdt-date-now">' + i + '</a>');
						}
					}
				}
			}else{
				for(i = 1; i <= days; i++) {
					if(i !== now_day){
						str.push('<a href="#">' + i + '</a>');
					}else{
						str.push('<a href="#" class="hdt-date-now">' + i + '</a>');
					}
				}
			}
			$div_date_list.html(str.join(''));
			return this;
		},
		makeDropList: function(from, to, now){
			var str = [];

			//生成列表
			if(S.isFunction(this.itemFilter)){
				for( ; from <= to ; from++ ){
					if(this.itemFilter(from)){
						if(from !== now){
							str.push('<a href="#">' + from + '</a>');
						}else{
							str.push('<a href="#" class="hdt-drop-now">' + from + '</a>');
						}
					}else{
						str.push('<strong>' + from + '</strong>');
					}
				}
			}else{
				for( ; from <= to ; from++ ){
					if(from !== now){
						str.push('<a href="#">' + from + '</a>');
					}else{
						str.push('<a href="#" class="hdt-drop-now">' + from + '</a>');
					}
				}
			}

			$div_drop_list.html(str.join(''));
			return this;
		},
		refreshDropList: function(type){
			var str = [], from, to, now = this.real(type);

			//各种范围
			if(type === 'year'){
				from = now-12;
				to = now+12;
				$div_drop_list.removeClass('hdt-drop-list-l');
			}else if(type === 'month'){
				from = 1;
				to = 12;
				$div_drop_list.removeClass('hdt-drop-list-l');
			}else if(type === 'date'){
				from = 1;
				to = this.getMonthDays();
				$div_drop_list.addClass('hdt-drop-list-l');
			}else if(type === 'hour'){
				from = 0;
				to = 23;
				$div_drop_list.removeClass('hdt-drop-list-l');
			}else{
				from = 0;
				to = 59;
				$div_drop_list.addClass('hdt-drop-list-l');
			}

			//上下翻页按钮
			if(type === 'year'){
				$drop_prev.add($drop_next).css('visibility', '');
			}else{
				$drop_prev.add($drop_next).css('visibility', 'hidden');
			}

			this.makeDropList(from, to, now);
			return this;
		},
		refreshIpts: function(type){
			//refresh specify type
			if(type === 'year'){
				$ipt_year.val(this.item(type));
			}else if(type === 'month'){
				$ipt_month.val(this.item(type));
			}else if(type === 'date'){
				//有效末尾或者值超过最大值,使用有效值
				if(this.item(type) == 'e' || this.item(type) > this.getMonthDays()){
					$ipt_date.val(this.getMonthDays());
				}else{
					$ipt_date.val(this.item(type));
				}
			}else if(type === 'hour'){
				$ipt_hour.val(this.item(type));
			}else if(type === 'minute'){
				$ipt_minute.val(this.item(type));
			}else if(type === 'second'){
				$ipt_second.val(this.item(type));
			}
			
			//refresh all
			else{
				var arr = 'year,month,date,hour,minute,second'.split(','), i = 0;
				for (; i < arr.length; i++) {
					this.refreshIpts(arr[i]);
				}
			}
			return this;
		},
		fillTarget: function(){
			//从input取值,因为item的设置可能不正确
			var str, arr=[], ipts = $div_ipt_list.find('input'), me = this;
			ipts.filter(':lt(3)').each(function(i, v){
				if(this.value !== 'any'){
					arr.push(this.value);
				}
			});
			str = arr.join('-');
			arr.length = 0;

			ipts.filter(':gt(2)').each(function(i, v){
				if(this.value !== 'any'){
					arr.push(this.value);
				}
			});

			if(arr.length){
				str += ' '+arr.join(':');
			}

			$target_fill.val($.trim(str));
			return this;
		},
		setWeekStart: function(n){
			n = parseInt(n);
			if(n > 0 && n < 8){
				this.__week_start = n;
			}else{
				S.log('$.dateTool.setWeekStart: n must in 1-7!');
			}
			return this;
		},
		refreshWeekList: function(){
			var n = this.__week_start, b = [];
			do{
				if(n === 6 || n === 7){
					b.push('<span class="hdt-weekend">', msg_week[n], '</span>');
				}else{
					b.push('<span>', msg_week[n], '</span>');
				}
				n++;
				if(n === 8){
					n = 1;
				}
			}while(n != this.__week_start);

			$div_week_list.html(b.join(''));
			return this;
		},
		setMinTime: function(time){
			if(time instanceof Date){
				this.min_time = time;
			}else if(S.isString(time) && time.isValidDate()){
				time = time.getDate();
				this.min_time = time;
			}else{
				S.log('$.dateTool.setMinTime: time must be a time-string or date-object!');
			}
			return this;
		},
		setMaxTime: function(time){
			if(time instanceof Date){
				this.max_time = time;
			}else if(S.isString(time) && time.isValidDate()){
				time = time.getDate();
				this.max_time = time;
			}else{
				S.log('$.dateTool.setMaxTime: time must be a time-string or date-object!');
			}
			return this;
		},
		setTimeOffset: function(offset){
			if(S.isNumber(offset)){
				this.offset = offset;
			}else{
				S.log('$.dateTool.setTimeOffset: offset must be a number in ms!');
			}
			return this;
		},
		open: function(){
			//清除按钮可用与否
			if(this.btn_clear_enable){
				$btn_clear.show();
			}else{
				$btn_clear.hide();
			}
			//今天按钮可用与否
			if(this.btn_now_enable){
				$btn_now.show();
			}else{
				$btn_now.hide();
			}
			return this.refreshFixed().refreshIpts().refreshWeekList().refreshDataList();
		}
	});

	function dropOpen(){
		var type = $target_ipt[0].className.substring(4);
		$drop_arr.attr('class', drop_arr_class + type);
		setting.refreshDropList(type);
		$div_drop_list.parent().show();
	}
	function dropClose(){
		$div_drop_list.parent().hide();
	}
	function dropPrev(){
		var to = $div_drop_list.find('a:first').html()-0, from = to-24;
		setting.makeDropList(from, to, setting.real('year'));
	}
	function dropNext(){
		var from = $div_drop_list.find('a:last').html()-0, to = from+24;
		setting.makeDropList(from, to, setting.real('year'));
	}
	function dropSelect($t, no_close){
		var type = $target_ipt[0].className.substring(4);
		setting.item(type, $t.html()).refreshIpts(type);
		$t.addClass('hdt-drop-now').siblings('a.hdt-drop-now').removeClass('hdt-drop-now');
		if(type === 'year' || type === 'month' || type === 'date'){
			setting.refreshIpts('date').refreshDataList();
		}
		setting.fillTarget();
		if(!no_close){
			dropClose();
		}
	}
	function dateSelect($t){
		setting.item('date', $t.html()).refreshIpts('date').fillTarget();
		$t.addClass('hdt-date-now').siblings('a.hdt-date-now').removeClass('hdt-date-now');
	}

	function btnClearClick(){
		$target_fill.val('');
	}
	function btnNowClick(){
		setting.setDate(now());
		setting.refreshIpts();
		setting.fillTarget();
	}
	function btnCompleteClick(){
		toolClose();
	}


	//鼠标点击代理, 内部点击由此分发
	function divWrapClick(e, no_close){
		var t = e.target,
			$t = $(t);
		if($t.is('input') && !t.disabled){
			$target_ipt = $t;
			dropOpen();
		}else if($t.is('a')){
			if($t.closest('.hdt-drop-list').length){
				dropSelect($t, no_close);
			}else if($t.closest('.hdt-date-list').length){
				dateSelect($t);
			}else if(t === $btn_clear[0]){
				btnClearClick();
			}else if(t === $btn_now[0]){
				btnNowClick();
			}else if(t === $btn_complete[0]){
				btnCompleteClick();
			}else if(t === $drop_close[0]){
				dropClose();
			}else if(t === $drop_prev[0]){
				dropPrev();
			}else if(t === $drop_next[0]){
				dropNext();
			}
			e.preventDefault();
		}else if(!$t.closest('.hdt-drop-list-wrap').length){
			dropClose();
		}
	}
	//鼠标双代理
	function divWrapDblclick(e){
		if($(e.target).is('a') && $(e.target).parent().is('.hdt-date-list')){
			toolClose();
		}
	}
	//鼠标滚动代理
	function divWrapWheel(e, delta){
		var t = e.target,
			$t = $(t);
		//选择列表打开时滚动, 滚动点击不关闭层
		if($div_drop_list.is(':visible')){
			if(delta < 0){
				$div_wrap.find('.hdt-drop-now').nextAll('a:first').trigger('click', [true]);
			}else{
				//因为不是按DOM的排列顺序,所以还是第1个匹配的
				$div_wrap.find('.hdt-drop-now').prevAll('a:first').trigger('click', [true]);
			}
		}
		//在日期列表内滚动
		else if($t.closest('.hdt-date-list').length){
			if(delta < 0){
				$div_wrap.find('.hdt-date-now').nextAll('a:first').click();
			}else{
				//因为不是按DOM的排列顺序,所以还是第1个匹配的
				$div_wrap.find('.hdt-date-now').prevAll('a:first').click();
			}
		}
	}


	//初始化DOM结构, 各个节点的引用
	$div_wrap = $('<div class="hdt-wrap"><div class="hdt-ctrl"><div class="hdt-tips"></div><div class="hdt-btns"><a href="#" class="hdt-clear"></a><a href="#" class="hdt-now"></a><a href="#" class="hdt-complete"></a></div></div><div class="hdt-ipt-list"><input type="text" readonly="readonly" class="hdt-year" />-<input type="text" readonly="readonly" class="hdt-month" />-<input type="text" readonly="readonly" class="hdt-date" /><input type="text" readonly="readonly" class="hdt-hour" />:<input type="text" readonly="readonly" class="hdt-minute" />:<input type="text" readonly="readonly" class="hdt-second" /></div><div class="hdt-week-list"></div><div class="hdt-date-list"></div><div class="hdt-drop-list-wrap"><div class="hdt-drop-list"></div><p class="hdt-drop-list-ctrl"><a href="#"></a><a href="#"></a><a href="#"></a></p></div></div>');

	$btn_clear = $div_wrap.find('a.hdt-clear');
	$btn_now = $btn_clear.next();
	$btn_complete = $btn_now.next();

	$ipt_year = $div_wrap.find('input.hdt-year');
	$ipt_month = $div_wrap.find('input.hdt-month');
	$ipt_date = $div_wrap.find('input.hdt-date');
	$ipt_hour = $div_wrap.find('input.hdt-hour');
	$ipt_minute = $div_wrap.find('input.hdt-minute');
	$ipt_second = $div_wrap.find('input.hdt-second');

	$div_ipt_list = $div_wrap.find('div.hdt-ipt-list');
	$div_week_list = $div_ipt_list.next();
	$div_date_list = $div_week_list.next();
	$div_drop_list = $div_wrap.find('div.hdt-drop-list');

	$drop_prev = $div_wrap.find('p.hdt-drop-list-ctrl a:eq(0)');
	$drop_next = $drop_prev.next();
	$drop_close = $drop_next.next();

	//设置显示文字
	$btn_clear.html(msg_clear);
	$btn_now.html(msg_now);
	$btn_complete.html(msg_complete);
	$drop_prev.html(msg_page_up);
	$drop_next.html(msg_page_down);
	$drop_close.html(msg_close);

	//箭头, IE使用图片, 标准浏览器使用css3
	if(/*@cc_on!@*/!1){
		$drop_arr = $('<span class="hdt-drop-arr"></span>');
		drop_arr_class = 'hdt-drop-arr hdt-drop-arr-';
	}else{
		$drop_arr = $('<span class="hdt-drop-arr2"></span>');
		drop_arr_class = 'hdt-drop-arr2 hdt-drop-arr-';
	}
	$div_drop_list.parent().append($drop_arr);

	//放入body
	$div_wrap.appendTo('body');
	//事件代理
	$div_wrap.click(divWrapClick).dblclick(divWrapDblclick).mousewheel(divWrapWheel);


	function toolOpen(target){
		$target_fill = $(target);
		setting = target.date_setting;
		setting.open();
		$div_wrap.align(target).show();

		$div_wrap.css('z-index', S.guid());
	}
	function toolClose(){
		dropClose();
		$target_fill = $EMPTY;
		$div_wrap.hide();
	}
	//输入框获得焦点显示
	function iptFocus(e){
		if(this.disabled || this.date_setting.disabled){
		}else{
			$(document).click(docHide);
			toolOpen(this);
		}
	}
	//不在内部点击关闭
	function docHide(e){
		if(e.target['--bind-dateTool'] || $(e.target).closest('.hdt-wrap').length){
		}else{
			toolClose();
			$(document).unbind('click', docHide);
		}
	}

	$.fn.extend({
		dateTool: function(setting){
			//初始化, 只允许:text选择时间
			var ipts = this.filter(':text');
			ipts.each(function(i, v){
				if(!this['--bind-dateTool']){
					this['--bind-dateTool'] = true;
					this.date_setting = DateSetting();
					this.date_setting.setDate(parseValueToDate(this.value, this.date_setting.offset) || now(this.date_setting.offset));
					$(this).focus(iptFocus);
				}
				
				//有参为修改
				if(setting){
					//修改配置, 只修改需要的
					if(S.isPlainObject(setting)){
						ipts.each(function(i, v){
							S.mix(this.date_setting, setting, ['fixed', 'btn_clear_enable', 'btn_now_enable',  'itemFilter', 'over_fill', 'disabled']);
						});
					}
					//修改fixed字符串
					else if(DateSetting.isFixedString(setting)){
						ipts.each(function(i, v){
							this.date_setting.fixed = setting;
						});
					}
					//修改日期值
					else if((setting instanceof Date) && setting.isValid()){
						ipts.each(function(i, v){
							this.date_setting.setDate(setting);
						});
					}
					//例外提示
					else{
						S.log('$.fn.dateTool: setting must be a fixed-string or setting-object or date-object!');
					}
				}
			});

			//返回第一个元素的配置
			return ipts[0] && ipts[0].date_setting;
		}
	});
});
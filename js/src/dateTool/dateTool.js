/**********************************************************************************************
 * 名称: 日期控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * NOTICE:
 *		
 * API:
 *		使用方法参见demo.html
 * 
 */

KISSY.add('dateTool', function(S, undef) {
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

	var msg_week_1 = '一',
		msg_week_2 = '二',
		msg_week_3 = '三',
		msg_week_4 = '四',
		msg_week_5 = '五',
		msg_week_6 = '六',
		msg_week_7 = '日',
		msg_clear = '清除',
		msg_now = '现在',
		msg_ok = '完成',
		msg_page_up = '上页',
		msg_page_down = '下页',
		msg_close = '关闭';

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
			date_obj = date_now;

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
			date_obj = new Date(date_now.dateString().replace(/-/g,'/')+' '+arr[3]);

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

		this.fixed = '';
	}
	S.mix(DateSetting, {
		reg_fixed: /(year|month|date|hour|minute|second)([\de]*)/g,
		isFixedString: function(str){
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
					this.repairMonth2();
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
			var first_day = new Date(this.real('year')+'/'+this.real('month')+'/1').getDay();
			return first_day || 7;
		},
		repairMonth2: function(){
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
			return this.__data;
		},
		refreshFixed: function(){
			var i, v, o = {}, $ipt_list = $ipt_year.parent();
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
			return this;
		},
		refreshDataList: function(itemFilter){
			var  str = [], i
				,days = this.getMonthDays()
				,firstDay = this.getMonthFirstDay()
				,nowDay = this.real('date')
				,_date_disabled = this.fixed.hasOwnProperty('date') ? 1 : 0;
			for(i = 1; i < firstDay; i++) {
				str.push('<span></span>');
			}
			if(_date_disabled || S.isFunction(itemFilter)){
				for(i = 1; i <= days; i++) {
					if(_date_disabled || !itemFilter(i)){
						str.push('<strong>' + i + '</strong>');
					}else{
						if(i !== nowDay){
							str.push('<a href="#">' + i + '</a>');
						}else{
							str.push('<a href="#" class="hdt-date-now">' + i + '</a>');
						}
					}
				}
			}else{
				for(i = 1; i <= days; i++) {
					if(i !== nowDay){
						str.push('<a href="#">' + i + '</a>');
					}else{
						str.push('<a href="#" class="hdt-date-now">' + i + '</a>');
					}
				}
			}
			$div_date_list.html(str.join(''));
			return this;
		},
		refreshDropList: function(type, itemFilter){
			var str = [], from, to, now = this.real(type);

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

			if(type === 'year'){
				$drop_prev.add($drop_next).css('visibility', '');
			}else{
				$drop_prev.add($drop_next).css('visibility', 'hidden');
			}

			if(S.isFunction(itemFilter)){
				for( ; from <= to ; from++ ){
					if(itemFilter(from)){
						if(from !== now){
							str.push('<a href="#">' + from + '</a>');
						}else{
							str.push('<a href="#" class="hdt-drop-list-now">' + from + '</a>');
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
						str.push('<a href="#" class="hdt-drop-list-now">' + from + '</a>');
					}
				}
			}
			$div_drop_list.html(str.join(''));
			return this;
		},
		refreshIpts: function(type){
			//refresh specify type
			if(type === 'year'){
				$ipt_year.val(this.item(type));
			}else if(type === 'month'){
				$ipt_month.val(this.item(type));
			}else if(type === 'date'){
				if(this.item(type) == 'e'){
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
			var arr, str, temp, arr2=[], i;
			arr = 'year,month,date'.split(',');
			for(i=0;i<3;i++){
				temp = this.item(arr[i]);
				//日期末尾可能是e表示当月的最大值
				temp == 'any' ? 0 : (temp == 'e' ? arr2.push(this.getMonthDays()) : arr2.push(temp));
			}
			str = arr2.join('-');
			arr2.length = 0;

			arr = 'hour,minute,second'.split(',');
			for(i=0;i<3;i++){
				temp = this.item(arr[i]);
				temp == 'any' ? 0 : arr2.push(temp);
			}
			arr = arr2.join(':');
			arr ? str += ' '+arr : 0;

			$target_fill.val(str);
			return this;
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
		setting.real('year', $div_drop_list.find('a:first').html()-1).refreshDropList('year');
	}
	function dropNext(){
		setting.real('year', ($div_drop_list.find('a:last').html()-0)+1).refreshDropList('year');
	}
	function dropSelect($t){
		var type = $target_ipt[0].className.substring(4);
		setting.item(type, $t.html()).refreshIpts(type);
		$t.addClass('hdt-drop-list-now').siblings('a.hdt-drop-list-now').removeClass('hdt-drop-list-now');
		if(type === 'year' || type === 'month' || type === 'date'){
			setting.refreshIpts('date').refreshDataList();
		}
		setting.fillTarget();
		dropClose();
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


	function divWrapClick(e){
		var t = e.target,
			$t = $(t);
		if($t.is('input') && !t.disabled){
			$target_ipt = $t;
			dropOpen();
		}else if($t.is('a')){
			if($t.closest('.hdt-drop-list').length){
				dropSelect($t);
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
	function divWrapDblclick(e){
		if($(e.target).is('a') && $(e.target).parent().is('.hdt-date-list')){
			toolClose();
		}
	}
	function divWrapWheel(e, delta){
		var t = e.target,
			$t = $(t);
		if($div_wrap.find('.hdt-drop-list').is(':visible')){
			if(delta < 0){
				$div_wrap.find('.hdt-drop-now').next('a').click();
			}else{
				$div_wrap.find('.hdt-drop-now').prev('a').click();
			}
		}else{
			if(delta < 0){
				$div_wrap.find('.hdt-date-now').next('a').click();
			}else{
				$div_wrap.find('.hdt-date-now').prev('a').click();
			}
		}
	}


	//初始化DOM结构, 各个节点的引用
	$div_wrap = $('<div class="hdt-wrap"><div class="hdt-ctrl"><div class="hdt-tips"></div><div class="hdt-btns"><a href="#" class="hdt-clear">清除</a><a href="#" class="hdt-now">现在</a><a href="#" class="hdt-complete">完成</a></div></div><div class="hdt-ipt-list"><input type="text" class="hdt-year" />-<input type="text" class="hdt-month" />-<input type="text" class="hdt-date" /><input type="text" class="hdt-hour" />:<input type="text" class="hdt-minute" />:<input type="text" class="hdt-second" /></div><div class="hdt-week-list"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div><div class="hdt-date-list"></div><div class="hdt-drop-list-wrap"><div class="hdt-drop-list"></div><p class="hdt-drop-list-ctrl"><a href="#">上页</a><a href="#">下页</a><a href="#">关闭</a></p></div></div>');

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
		setting.refreshFixed().refreshIpts().refreshDataList();
		$div_wrap.adjustElement(target).show();
	}
	function toolClose(){
		dropClose();
		$target_fill = $EMPTY;
		$div_wrap.hide();
	}
	//输入框获得焦点显示
	function iptFocus(e){
		if(this.disabled){// || this.date_setting.disabled
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
					this.date_setting.setDate(parseValueToDate(this.value));
					$(this).focus(iptFocus);
				}
			});

			//有参为修改
			if(setting){
				//修改配置
				if(S.isPlainObject()){
					ipts.each(function(i, v){
						S.mix(this.date_setting, setting);
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

			//返回第一个元素的配置
			return ipts[0] && ipts[0].date_setting;
		}
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'builtin', 'jquery.mousewheel']
});

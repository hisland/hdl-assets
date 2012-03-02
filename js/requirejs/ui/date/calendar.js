/**
 * 
 */

define(['jquery', 'kissy', 'css!./date', 'jquery-plugin'], function($, S){
	var msg_week = ['', '一', '二', '三', '四', '五', '六', '日'],
		msg_clear = '清除',
		msg_now = '现在',
		msg_complete = '完成',
		msg_page_up = '上页',
		msg_page_down = '下页',
		msg_close = '关闭';

	//DateSetting类
	function DateSetting(){
		this.__init();
	}
	S.mix(DateSetting, {
		reg_fixed: /(year|month|date|hour|minute|second)(e|\d*)/g,
		isFixedString: function(str){
			return this.reg_fixed.test(str);
		}
	});
	S.augment(DateSetting, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__init: function()
			this.$div = $('<div class="hdt-wrap"><div class="hdt-ctrl"><div class="hdt-tips"></div><div class="hdt-btns"><a href="javascript:;" class="hdt-clear"></a><a href="javascript:;" class="hdt-now"></a><a href="javascript:;" class="hdt-complete"></a></div></div><div class="hdt-ipt-list"><input type="text" readonly="readonly" class="hdt-year" />-<input type="text" readonly="readonly" class="hdt-month" />-<input type="text" readonly="readonly" class="hdt-date" /><input type="text" readonly="readonly" class="hdt-hour" />:<input type="text" readonly="readonly" class="hdt-minute" />:<input type="text" readonly="readonly" class="hdt-second" /></div><div class="hdt-week-list"></div><div class="hdt-date-list"></div></div>');

			this.$dateList = this.$div.find('.hdt-date-list');
			this.$weekList = this.$div.find('.hdt-week-list');
			this.$dropList = this.$div.find('');

			this.$clear = this.$div.find('.hdt-clear');
			this.$now = this.$div.find('.hdt-now');
			this.$ok = this.$div.find('.hdt-complete');

			this.$year = this.$div.find('.hdt-year');
			this.$month = this.$div.find('.hdt-month');
			this.$date = this.$div.find('.hdt-date');
			this.$hour = this.$div.find('.hdt-hour');
			this.$minute = this.$div.find('.hdt-minute');
			this.$second = this.$div.find('.hdt-second');

			this.$div.appendTo('body');

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
			return this;
		},
		days_list: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		/**
		 * 设置显示的值
		 * @param type 'year|month....'
		 * @param value Int|'any'|'e'
		 * @return this|Int|'any'|'e'
		 */
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
		/**
		 * 设置真实值
		 * @param type 'year|month....'
		 * @param value Int
		 * @return this|Int
		 */
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
		/**
		 * 获得月天数
		 * @return Int
		 */
		getMonthDays: function(){
			return this.days_list[this.real('month')];
		},
		/**
		 * 获得月第一天的星期
		 * @return Int
		 */
		getMonthFirstDay: function(){
			return first_day = new Date(this.real('year')+'/'+this.real('month')+'/1').getDay();
		},
		/**
		 * 获得空白个数
		 * @return Int
		 */
		__getBlank: function(){
			//月第一行的空白 = monthfirstday - (weekstart - 7)
			var blank = this.getMonthFirstDay() - (this.__week_start - 7);
			//取值为0-6
			return blank % 7;
		},
		/**
		 * 修正2月总天数
		 * @return this
		 */
		__repairMonth2: function(){
			var year = this.real('year');
			this.days_list[2] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;
			return this;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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
		/**
		 * 获得日期值
		 * @return Date
		 */
		getDate: function(){
			return this.__date;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		refreshFixed: function(){
			var i, v, o = {}, this.$dateList = this.$year.parent();
			this.fixed.replace(DateSetting.reg_fixed, function(a, b, c){
				if(b && !o[b]){
					o[b] = c;
				}
			});
			this.$dateList.find(':disabled').attr('disabled', false).removeClass('disabled');
			for(i in o){
				if(o.hasOwnProperty(i)){
					v = o[i] || 'any';
					this.$dateList.find('input.hdt-' + i).attr('disabled',true).addClass('disabled');
					this[i] = v;
				}
			}

			//日期被禁用
			if(o['date']){
				this.__date_disabled = true;
			}else{
				this.__date_disabled = false;
			}
			return this;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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

			this.$dropList.html(str.join(''));
			return this;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		refreshDropList: function(type){
			var str = [], from, to, now = this.real(type);

			//各种范围
			if(type === 'year'){
				from = now-12;
				to = now+12;
				this.$dropList.removeClass('hdt-drop-list-l');
			}else if(type === 'month'){
				from = 1;
				to = 12;
				this.$dropList.removeClass('hdt-drop-list-l');
			}else if(type === 'date'){
				from = 1;
				to = this.getMonthDays();
				this.$dropList.addClass('hdt-drop-list-l');
			}else if(type === 'hour'){
				from = 0;
				to = 23;
				this.$dropList.removeClass('hdt-drop-list-l');
			}else{
				from = 0;
				to = 59;
				this.$dropList.addClass('hdt-drop-list-l');
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
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		refreshIpts: function(type){
			//refresh specify type
			if(type === 'year'){
				this.$year.val(this.item(type));
			}else if(type === 'month'){
				this.$month.val(this.item(type));
			}else if(type === 'date'){
				//有效末尾或者值超过最大值,使用有效值
				if(this.item(type) == 'e' || this.item(type) > this.getMonthDays()){
					this.$date.val(this.getMonthDays());
				}else{
					this.$date.val(this.item(type));
				}
			}else if(type === 'hour'){
				this.$hour.val(this.item(type));
			}else if(type === 'minute'){
				this.$minute.val(this.item(type));
			}else if(type === 'second'){
				this.$second.val(this.item(type));
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
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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

			$target_fill.val(str);
			return this;
		},
		/**
		 * 设置周开始于几
		 * @param n Int
		 * @return this
		 */
		setWeekStart: function(n){
			n = parseInt(n);
			if(n > 0 && n < 8){
				this.__week_start = n;
			}
			return this;
		},
		/**
		 * 刷新显示周列表
		 * @return this
		 */
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

			this.$weekList.html(b.join(''));
			return this;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		setTimeOffset: function(offset){
			if(S.isNumber(offset)){
				this.offset = offset;
			}else{
				S.log('$.dateTool.setTimeOffset: offset must be a number in ms!');
			}
			return this;
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
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

	return DateSetting;
});
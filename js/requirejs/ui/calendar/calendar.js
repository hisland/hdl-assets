/**
 * 
 */

define(['jquery', 'kissy', './msg', './datearray', 'css!./calendar', 'jquery-plugin'], function($, S, MSG, DateArray){
	var reg_fixed = /(year|month|date|hour|minute|second)(e|\d*)/g;
	function isFixedString(str){
		return this.reg_fixed.test(str);
	}

	/**
	 * @class
	 * @memberOf ui
	 */
	function Calendar(){
		this.__init().__initEvent();
	}
	/**
	 * @lends ui.Calendar#
	 */
	S.augment(Calendar, {
		/**
		 * 初始化基本信息
		 * @return this
		 */
		__init: function(){
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
		/**
		 * 初始化基本事件
		 * @return this
		 */
		__initEvent: function(){
			
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
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		setDate: function(date){
			return this;
		},
		/**
		 * 获得日期值
		 * @return Date
		 */
		getDate: function(){
			
		},
		/**
		 * 设置日期值
		 * @param date Date
		 * @return this
		 */
		refreshFixed: function(){
			var i, v, o = {};
			
			this.$dateList = this.$year.parent();
			this.fixed.replace(Calendar.reg_fixed, function(a, b, c){
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
		show: function(){
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
		},
		/**
		 * 隐藏日期控件
		 * @return this
		 */
		hide: function(){
			
		}
	});

	return Calendar;
});
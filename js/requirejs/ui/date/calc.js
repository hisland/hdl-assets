/**
 * 
 */

define(['jquery', 'kissy', './arr', 'css!./date', 'jquery-plugin'], function($, S, Arr){
	var msg_week = ['', '一', '二', '三', '四', '五', '六', '日'],
		msg_clear = '清除',
		msg_now = '现在',
		msg_complete = '完成',
		msg_page_up = '上页',
		msg_page_down = '下页',
		msg_close = '关闭';

	/**
	 * @class
	 */
	function Calc(){
		this.__init();
	}

	/**
	 * @lends Calc#
	 */
	S.augment(Calc, {
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

			this.__week_start = 1;
			this.refreshWeekList();
			this.arr = new Arr();

			return this;
		},
		__initEvent: function(){
			return this;
		},
		setData: function(data){
			this.arr.setDate(date);
			return this;
		},
		getDate: function(){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		attach: function(selector){
			this.selector = selector;
			$(selector).on('click', this, function(e){
				e.data.show();
			});
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		detach: function(){
			$(this.selector).off('click');
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		show: function(){
			this.$div.align(this.selector).show().css('z-index', S.guid());
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		hide: function(){
			this.$div.hide().off('outerclick');
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		makeDateList: function(){
			return this;
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

			//日期被禁用
			if(o['date']){
				this.__date_disabled = true;
			}else{
				this.__date_disabled = false;
			}
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return this
		 */
		setFixed: function(str){
			return this;
		},
		/**
		 * 设置周一开始于
		 * @param n Int
		 * @return this
		 */
		setWeekStart: function(n){
			n = parseInt(n);
			if(n > 0 && n < 8){
				this.__week_start = n;
				this.refreshWeekList();
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

			this.$weekList.html(b.join(''));
			return this;
		}
	});

	return Calc;
});
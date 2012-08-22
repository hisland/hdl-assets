define(['jquery', 'kissy'], function($, S){
	function Calendar(config){
		
	}

	S.augment(Calendar, {
		/**
		 * 初始化DOM
		 * @return this
		 */
		__initDOM: function(){
			return this;
		},
		/**
		 * 初始化事件
		 * @return this
		 */
		__initEvent: function(){
			
		},
		setWeekStart: function(n){
			n = parseInt(n);
			if(n > 0 && n < 8){
				this.__week_start = n;
			}
			return this;
		},
		attach: function(selector){
			return this;
		},
		detach: function(){
			return this;
		},
		on: function(name, fn){
			return this;
		},
		set: function(name, value){
			$(this).data(name, value);
			return this;
		},
		get: function(name){
			return $(this).data(name);
		},
		show: function(){
			return this;
		},
		hide: function(){
			return this;
		},
		refreshAll: function(){
			return this;
		},
		refreshDropList: function(){
			return this;
		},
		refreshDateList: function(){
			return this;
		},
		refreshWeekList: function(){
			return this;
		},
		refreshDripList: function(){
			return this;
		}
	});

	return Calendar;
});
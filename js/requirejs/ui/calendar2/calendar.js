define(['jquery', 'kissy', './config'], function($, S, Config){
	function Calendar(config){
		this.config = S.mix(config, Config);
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
		setConfig: function(config){
			this.config = config;
			return this;
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

	S.augment(Calendar, {
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
			$(this).on(name, fn);
			return this;
		},
		set: function(name, value){
			$(this).data(name, value);
			return this;
		},
		get: function(name){
			return $(this).data(name);
		}
	});

	return Calendar;
});
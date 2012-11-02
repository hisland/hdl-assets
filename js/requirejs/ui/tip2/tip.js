define(['jquery', 'kissy', 'util', 'jquery-plugin'], function($, S, Util){

function Tip(){
}
$.extend(Tip.prototype, {
	__init: function(config){
		config = $.isPlainObject(config) ? config : {};
		this.config = $.extend(true, config, defaultConfig);
		this.fields = new Fields();
		return this;
	},
	__initDOM: function(){
		var div = $('<div class="calendar-wrap"><div class="cldr-top"></div><div class="cldr-arr"></div><div class="cldr-ipt-wrap"><div class="cldr-ipt-item cldr-div-year"><span class="cldr-ipt-up"></span><input class="cldr-ipt-year" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">-</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-month" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">-</div><div class="cldr-ipt-item cldr-div-date"><span class="cldr-ipt-up"></span><input class="cldr-ipt-date" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-hour" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">:</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-minute" value="" /><span class="cldr-ipt-down"></span></div><div class="cldr-ipt-sep">:</div><div class="cldr-ipt-item"><span class="cldr-ipt-up"></span><input class="cldr-ipt-second" value="" /><span class="cldr-ipt-down"></span></div></div><div class="cldr-lst-date"></div></div>');
		this.$wrap = div;
		this.$clear = $('<a href="javascript:;" class="btn-clear">' + i18n.clear + '</a>').appendTo(div.find('div.cldr-top'));
		this.$now = $('<a href="javascript:;" class="btn-now">' + i18n.now + '</a>').appendTo(div.find('div.cldr-top'));
		this.$close = $('<a href="javascript:;" class="btn-close">' + i18n.close + '</a>').appendTo(div.find('div.cldr-top'));
		div.appendTo('body');
		return this;
	},
	__initEvent: function(){
		var me = this;
		//顶部按钮
			this.$clear.click(function(e){
				me.trigger('clear');
			});
			this.$now.click(function(e){
				me.setValue(new Date());
			});
			this.$close.click(function(e){
				me.hide();
			});

		//输入框点击
			this.$year.click(function(e){
				me.setCursor('year');
			});
			this.$month.click(function(e){
				me.setCursor('month');
			});
			this.$date.click(function(e){
				me.setCursor('date');
			});
			this.$hour.click(function(e){
				me.setCursor('hour');
			});
			this.$minute.click(function(e){
				me.setCursor('minute');
			});
			this.$second.click(function(e){
				me.setCursor('second');
			});

		//列表点击
			this.$wrap.on('click', '.cldr-lst-year .cldr-wrap a', function(e){
				me.setYear($(this).text() - 0);
			});
			this.$wrap.on('click', '.cldr-lst-date a', function(e){
				me.setDate($(this).text() - 0);
			});
			this.$wrap.on('click', '.cldr-lst-other a', function(e){
				if(me.__nowCursor === 'month'){
					me.setMonth($(this).text() - 0);
				}else if(me.__nowCursor === 'hour'){
					me.setHour($(this).text() - 0);
				}else if(me.__nowCursor === 'minute'){
					me.setMinute($(this).text() - 0);
				}else if(me.__nowCursor === 'second'){
					me.setSecond($(this).text() - 0);
				}
			});

		//列表mousewheel
			this.$wrap.on('mousewheel', '.cldr-lst-year', function(e, delta){
				if(delta > 0){
					me.yearUp();
				}else{
					me.yearDown();
				}
			});
			this.$wrap.on('mousewheel', '.cldr-lst-date', function(e, delta){
				if(delta > 0){
					me.dateUp();
				}else{
					me.dateDown();
				}
			});
			this.$wrap.on('mousewheel', '.cldr-lst-other', function(e, delta){
				if(delta > 0){
					me[me.__nowCursor + 'Up']();
				}else{
					me[me.__nowCursor + 'Down']();
				}
			});

		//year control
			this.$year.prev().click(function(e){
				me.yearUp();
			});
			this.$year.next().click(function(e){
				me.yearDown();
			});
			this.$year.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.yearUp();
				}else{
					me.yearDown();
				}
			});
			this.$year.keydown(function(e){
				if(e.keyCode === 38){
					me.yearUp();
				}else if(e.keyCode === 40){
					me.yearDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$year.hover(function(e){
			}, function(e){
			});

		//month control
			this.$month.prev().click(function(e){
				me.monthUp();
			});
			this.$month.next().click(function(e){
				me.monthDown();
			});
			this.$month.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.monthUp();
				}else{
					me.monthDown();
				}
			});
			this.$month.keydown(function(e){
				if(e.keyCode === 38){
					me.monthUp();
				}else if(e.keyCode === 40){
					me.monthDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$month.hover(function(e){
			}, function(e){
			});

		//date control
			this.$date.prev().click(function(e){
				me.dateUp();
			});
			this.$date.next().click(function(e){
				me.dateDown();
			});
			this.$date.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.dateUp();
				}else{
					me.dateDown();
				}
			});
			this.$date.keydown(function(e){
				if(e.keyCode === 38){
					me.dateUp();
				}else if(e.keyCode === 40){
					me.dateDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$date.hover(function(e){
			}, function(e){
			});

		//hour control
			this.$hour.prev().click(function(e){
				me.hourUp();
			});
			this.$hour.next().click(function(e){
				me.hourDown();
			});
			this.$hour.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.hourUp();
				}else{
					me.hourDown();
				}
			});
			this.$hour.keydown(function(e){
				if(e.keyCode === 38){
					me.hourUp();
				}else if(e.keyCode === 40){
					me.hourDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$hour.hover(function(e){
			}, function(e){
			});

		//minute control
			this.$minute.prev().click(function(e){
				me.minuteUp();
			});
			this.$minute.next().click(function(e){
				me.minuteDown();
			});
			this.$minute.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.minuteUp();
				}else{
					me.minuteDown();
				}
			});
			this.$minute.keydown(function(e){
				if(e.keyCode === 38){
					me.minuteUp();
				}else if(e.keyCode === 40){
					me.minuteDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$minute.hover(function(e){
			}, function(e){
			});

		//second control
			this.$second.prev().click(function(e){
				me.secondUp();
			});
			this.$second.next().click(function(e){
				me.secondDown();
			});
			this.$second.parent().mousewheel(function(e, delta){
				if(delta > 0){
					me.secondUp();
				}else{
					me.secondDown();
				}
			});
			this.$second.keydown(function(e){
				if(e.keyCode === 38){
					me.secondUp();
				}else if(e.keyCode === 40){
					me.secondDown();
				}else if(e.keyCode === 39){//cursor right
					
				}
			});
			this.$second.hover(function(e){
			}, function(e){
			});
		return this;
	}
});

$.extend(Tip.prototype, {
	setWidth: function(width){
		if(S.isNumber(width)){
			this.$div.width(width);
		}
		return this;
	},
	setHeight: function(height){
		if(S.isNumber(height)){
			this.$div.height(height);
		}
		return this;
	},
	setAutoClose: function(time){
		//已存在计时先清除
		if(this._auto_close){
			this._auto_close.cancel();
			this._auto_close_count.cancel();
			this._auto_close = this._auto_close_count = null;
		}

		//取消自动关闭
		if(time === false){
			this.$ok.val(MSG.ok);
		}
		//设置自动关闭
		else if(time > 0){

			this._auto_close = S.later(function(){
				this.hide();
				this.$ok.val(MSG.ok);
				this._auto_close_count.cancel();
				this._auto_close = this._auto_close_count = null;
			}, time*1000, false, this);

			//步长为1S的倒计时
			this.$ok.val(MSG.ok + '(' + time + ')');
			this._auto_close_count = S.later(function(){
				time--;
				this.$ok.val(MSG.ok + '(' + time + ')');
			}, 1000, true, this);
		}

		return this;
	},
	setCloseable: function(able){
		if(S.isBoolean(able)){
			this.closeable = able;
		}
		return this;
	},
	setDraggable: function(able){
		if(S.isBoolean(able)){
			this.draggable = able;
		}

		//更新拖动可用状态
		this.$div.hdlDrag({
			enable: this.draggable
		});

		return this;
	},
	setTitle: function(title){
		this.$title.html(title);
		return this;
	},
	setContent: function(content){
		this.$content.html(content);
		return this;
	},
	setType: function(type){
		switch(type){
			case 'error':
				this.$icon.attr('class', 'tipmsg-error');
				break;
			case 'notice':
				this.$icon.attr('class', 'tipmsg-notice');
				break;
			case 'confirm':
				this.$icon.attr('class', 'tipmsg-confirm');
				break;
			case 'alert':
				this.$icon.attr('class', 'tipmsg-alert');
				break;
		}
		return this;
	}
});

$.extend(Tip.prototype, {
	loading: function(){
		this.$div.css('display', 'none');
		this.manager.loading();
		return this;
	},
	loaded: function(){
		this.$div.css('display', 'block');
		this.manager.loaded();
		return this;
	},
	center: function(){
		this.$div.css({
			top: (document.documentElement.clientHeight - this.$div.height())/2,
			left: (document.documentElement.clientWidth - this.$div.width())/2
		});
		return this;
	},
	show: function(){
		if(this.slide){
			this.manager.show();
			this.$div.hide().fadeIn().css({
				top: (document.documentElement.clientHeight - this.$div.height())/2,
				left:(document.documentElement.clientWidth - this.$div.width())/2
			});
		}else{
			this.manager.show();
			this.$div.css('visibility', 'hidden').show().css({
				top: (document.documentElement.clientHeight - this.$div.height())/2,
				left:(document.documentElement.clientWidth - this.$div.width())/2,
				visibility: ''
			});
		}

		//确定按钮获得焦点
		this.$ok.focus();

		//显示时的回调
		if(S.isFunction(this.onShow)){
			this.onShow();
		}

		return this;
	},
	hide: function(){
		var tip = this;
		if(this.closeable){
			if(this.slide){
				this.$div.fadeOut(function(){
					tip.manager.hide();
				});
			}else{
				this.manager.hide();
			}

			//隐藏时的回调
			if(S.isFunction(this.onHide)){
				this.onHide();
			}
		}
		return this;
	},
	remove: function(){
		this.manager.remove();
		return this;
	}
});

$.extend(Tip.prototype, {
	shake: function(){
		this.$div.animate({
			left: '-=10',
			top: '-=10'
		}, 30).animate({
			top: '+=20'
		}, 30).animate({
			left: '+=20',
			top: '-=20'
		}, 30).animate({
			top: '+=20'
		}, 30).animate({
			left: '-=10',
			top: '-=10'
		}, 30);
		return this;
	}
});

return Tip;

});
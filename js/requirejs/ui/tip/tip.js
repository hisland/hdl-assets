/**
 * tip类
 */

define(['jquery', 'kissy', '../pop-manager', 'css!./tip'], function($, S, M){
	var msg_alert = '提示',
		msg_error = '错误',
		msg_notice = '警告',
		msg_confirm = '确认',
		msg_defalt = '未设置信息',
		msg_ok = '确定',
		msg_cancel = '取消';

	//JS国际化信息的覆盖
	if(window.JS_I18N){
		msg_alert = JS_I18N['js.common.hdlTipMsg.msg_alert'];
		msg_error = JS_I18N['js.common.hdlTipMsg.msg_error'];
		msg_notice = JS_I18N['js.common.hdlTipMsg.msg_notice'];
		msg_confirm = JS_I18N['js.common.hdlTipMsg.msg_confirm'];
		msg_defalt = JS_I18N['js.common.hdlTipMsg.msg_defalt'];
		msg_ok = JS_I18N['js.common.hdlTipMsg.msg_ok'];
		msg_cancel = JS_I18N['js.common.hdlTipMsg.msg_cancel'];
	}

	var html_string = '<div class="tipmsg-wrap"><div class="tipmsg-h1"><div class="tipmsg-h2"><div class="tipmsg-h3"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div></div></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg-b1"><div class="tipmsg-b2"><div class="tipmsg-b3"><input type="button" value="'+msg_ok+'" /></div></div></div></div>',
		html_css3 = '<div class="tipmsg-wrap"><div class="tipmsg2-h1"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg2-b1"><input type="button" value="'+msg_ok+'" /></div></div>',
		html_button = '<input type="button" />';

	/**
	 * @class
	 * @name ui.tip
	 * @param setting
	 * <pre><code>
		{
			slide: false,
			dragable: true,
			closeable: true
		}
	 * </code></pre>
	 */
	function init(setting){
		S.mix(this, {
			slide: false,
			dragable: true,
			closeable: true
		});
		return this.__init();
	}
	/**
	 * @lends ui.tip#
	 */
	S.augment(init, {
		/**
		 * 内部初始化
		 * @private
		 */
		__init: function(){
			var div;
			
			//根据不同浏览器使用css3或者图片
			if($.browser.msie){
				div = $(html_string);
			}else{
				div = $(html_css3);
			}

			//jquery元素的快捷方式
			S.mix(this, {
				$div: div,
				$close: div.find('a.tipmsg-close'),
				$ok: div.find('input'),
				$content: div.find('div.tipmsg-content'),
				$icon: div.find('div.tipmsg-alert'),
				$title: div.find('span.tipmsg-title')
			});

			//纳入pop管理
			this.manager = M.init();
			this.manager.$div.append(this.$div);

			//初始化拖动
			this.$div.hdlDrag({
				trigger_filter: function(e){
					if($(e.target).closest(':button, .tipmsg-content, .tipmsg-close').length){
						return false;
					}
				}
			});

			//右上角关闭事件
			this.$close.bind('click', this, function(e){
				e.data.hide();
				e.preventDefault();
			})
			//不能拖拽
			.bind('dragstart', function(e){
				e.preventDefault();
			});

			//点击确定按钮的处理
			this.$ok.bind('click', this, function(e){
				//点击确定的回调,会传入true
				if(S.isFunction(e.data.callback)){
					e.data.callback(true);
				}
				e.data.hide();
			});

			return this;
		},
		/**
		 * 显示出来
		 */
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
		/**
		 * 隐藏
		 */
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
		/**
		 * 从dom中删除
		 */
		remove: function(){
			this.manager.remove();
			return this;
		},
		/**
		 * 设置提示类型
		 * @param String type alert|notice|errorTip|confirm之一
		 */
		setType: function(type){
			switch(type){
				case 'errorTip':
					this.$icon.attr('class', 'tipmsg-errorTip');
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
		},
		/**
		 * 设置标题
		 * @param String|DOM|jQuery title
		 */
		setTitle: function(title){
			this.$title.html(title || msg_alert);
			return this;
		},
		/**
		 * 设置内容
		 * @param String|DOM|jQuery content
		 */
		setContent: function(content){
			this.$content.html(content);
			return this;
		},
		/**
		 * 设置回调函数
		 * @param callback 值为函数
		 */
		setCallback: function(callback){
			if(S.isFunction(callback)){
				this.callback = callback;
			}
			return this;
		},
		/**
		 * 设置可否关闭
		 * @param able 值为true|false
		 */
		setCloseable: function(able){
			if(S.isBoolean(able)){
				this.closeable = able;
			}
			return this;
		},
		/**
		 * 设置可否拖动
		 * @param able 值为true|false 可选
		 */
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
		/**
		 * 设置或取消自动关闭
		 * @param time 值为大于0的数字表示自动关闭时长,单位秒, 为false表示不自动关闭,并且取消正在进行的计时
		 */
		setAutoClose: function(time){
			//取消自动关闭
			if(time === false){
				this.$ok.val(msg_ok);
				this._auto_close.cancel();
				this._auto_close_count.cancel();
				this._auto_close = false;
			}

			//设置自动关闭
			if(time > 0){
				//已存在计时先清除
				if(this._auto_close){
					this._auto_close.cancel();
					this._auto_close_count.cancel();
				}

				this._auto_close = S.later(function(){
					this.hide();
					this.$ok.val(msg_ok);
					this._auto_close = false;
					this._auto_close_count.cancel();
				}, time*1000, false, this);

				//步长为1S的倒计时
				this.$ok.val(msg_ok + '(' + time + ')');
				this._auto_close_count = S.later(function(){
					time--;
					this.$ok.val(msg_ok + '(' + time + ')');
				}, 1000, true, this);
			}

			return this;
		},
		/**
		 * 设置是否淡入淡出
		 * @param slide 值为true|false
		 */
		setSlide: function(slide){
			if(S.isBoolean(slide)){
				this.slide = slide;
			}
			return this;
		},
		/**
		 * 设置宽度
		 * @param Number width 值为大于等于200的整数
		 */
		setWidth: function(width){
			if(S.isNumber(width) && width >= 200){
				this.$div.width(width);
			}
			return this;
		},
		/**
		 * 添加一个按钮
		 * @param Object setting 按钮设置
		 * <pre><code>
			{
				click: function(e){
					//e.data is tip
				},
				text: '按钮文字'
			}
		 * </code></pre>
		 */
		addButton: function(setting){
			if(S.isPlainObject(setting)){
				$(html_button).bind('click', this, setting.click).val(setting.text).appendTo(this.$ok.parent());
			}
			return this;
		},
		/**
		 * 设置显示回调
		 * @param fn 显示时的回调
		 */
		setOnShow: function(fn){
			if(S.isFunction(fn)){
				this.onShow = fn;
			}
			return this;
		},
		/**
		 * 设置关闭回调
		 * @param fn 关闭时的回调
		 */
		setOnHide: function(fn){
			if(S.isFunction(fn)){
				this.onHide = fn;
			}
			return this;
		}
	});

	return init;
});

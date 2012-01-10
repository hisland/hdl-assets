/**
 * @fileOverview
 * @module hdlTipMsg
 * @author hisland hisland@qq.com
 * @description 层模拟的提示信息插件
 * <pre><code>
 * TODO:
 * 		confirm点击是或否应该有 returnValue
 * 		2010-8-19 14:5:35
 * 			需要一个机制来控制不能关闭此层
 * 		2010-10-12 10:33:29
 * 			defaultFocus
 * 		2011-4-6 15:33:11
 * 			显示之后,焦点不能跑到后面去
 * 		2011-4-15 14:41:55
 * 			确定和X不能拖动
 * 		2011-06-01 13:15:55
 * 			Y/N快捷键支持
 * API:
 * 		$.alert('msg');
 * 		$.notice('msg');
 * 		$.errorTip('msg');
 * 		$.confirm('msg', function(){});
 * </code></pre>
 */

KISSY.add('hdlTipMsg', function(S, undef) {
	var $ = jQuery,
		msg_alert = '提示',
		msg_error = '错误',
		msg_notice = '警告',
		msg_confirm = '确认',
		msg_defalt = '默认信息',
		msg_ok = '确定',
		msg_cancle = '取消';

	//JS国际化信息的覆盖
	if(window.JS_I18N){
		msg_alert = JS_I18N['js.common.hdlTipMsg.msg_alert'];
		msg_error = JS_I18N['js.common.hdlTipMsg.msg_error'];
		msg_notice = JS_I18N['js.common.hdlTipMsg.msg_notice'];
		msg_confirm = JS_I18N['js.common.hdlTipMsg.msg_confirm'];
		msg_defalt = JS_I18N['js.common.hdlTipMsg.msg_defalt'];
		msg_ok = JS_I18N['js.common.hdlTipMsg.msg_ok'];
		msg_cancle = JS_I18N['js.common.hdlTipMsg.msg_cancle'];
	}
	
	var html_string = '<div class="tipmsg-wrap"><div class="tipmsg-h1"><div class="tipmsg-h2"><div class="tipmsg-h3"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div></div></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg-b1"><div class="tipmsg-b2"><div class="tipmsg-b3"><input type="button" value="'+msg_ok+'" /></div></div></div></div>',
		html_css3 = '<div class="tipmsg-wrap"><div class="tipmsg2-h1"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg2-b1"><input type="button" value="'+msg_ok+'" /></div></div>',
		pre_setting = {
			message: msg_defalt,
			type: 'alert',
			title: msg_alert,
			//自动隐藏,为数字,0表示不自动,大于0的整数表示多少秒后隐藏
			auto_hide: 0,
			//针对confirm的回调函数
			callback: 0,
			//在层打开之前的操作
			beforeShow: 0,
			//显示层时的操作
			onShow: 0,
			//在层关闭之前的操作
			beforeHide: 0,
			//关闭层时的操作
			onHide: 0,
			//是否可拖动
			dragable: 1,
			//是否淡入淡出
			slide: 0,
			//默认焦点在yes上
			focus_yes: 1
		};

	//提示打开时,不能用tab把焦点切换到遮罩后面, 仅在提示层上循环切换
	function documentKeydown(e){
		if(e.keyCode == 9){
			tabs.eq(tabi++).focus();
			if(tabi >= tabs.length){
				tabi = 0;
			}
			return false;
		}
	}

	function init(setting){
		S.mix(this, {
			dragable: true,
			slide: false,
			closeable: true
		});
		return this.__init();
	}
	S.augment(init, {
		/**
		 * 内部初始化
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
				$cancle: div.find('input'),
				$ok: div.find('input'),
				$content: div.find('div.tipmsg-content'),
				$icon: div.find('div.tipmsg-alert'),
				$title: div.find('span.tipmsg-title')
			});

			//纳入pop管理
			this.manager = $.popManager.init();
			this.manager.$div.append(this.$div);

			return this;
		},
		/**
		 * 显示出来
		 */
		show: function(){
			this.manager.show();
			//居中显示
			this.$div.css('visibility', 'hidden').show().css({
				top: (document.documentElement.clientHeight - this.$div.height())/2,
				left:(document.documentElement.clientWidth - this.$div.width())/2,
				visibility: ''
			});
			return this;
		},
		/**
		 * 隐藏
		 */
		hide: function(){
			if(this.closeable){
				this.manager.hide();
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
				default:
					S.log('hdlTipMsg: setType(type), type invalid!', 'warn');
					break;
			}
			return this;
		},
		/**
		 * 设置标题
		 */
		setTitle: function(title){
			this.$title.html(title);
			return this;
		},
		/**
		 * 设置内容
		 */
		setContent: function(content){
			this.$content.html(content);
			return this;
		},
		/**
		 * 设置回调函数
		 */
		setCallback: function(callback){
			if(S.isFunction(callback)){
				this.callback = callback;
			}
			return this;
		},
		/**
		 * 设置可否拖动
		 */
		setCloseable: function(able){
			if(S.isBoolean(able)){
				this.closeable = able;
			}
			return this;
		},
		/**
		 * 设置可否拖动
		 */
		setDraggable: function(able){
			if(S.isBoolean(able)){
				this.draggable = able;
			}
			return this;
		},
		/**
		 * 设置是否淡入淡出
		 */
		setSlide: function(state){
			if(S.isBoolean(state)){
				this.state = state;
			}
			return this;
		}
	});

	//内部功能函数 - 初始化
	function bbq(setting){
		var div = $(html_string);

		if($.browser.msie){
			div = $(html_string);
		}else{
			div = $(html_css3);
		}

		div.close = div.find('a.tipmsg-close');
		div.btn_cancle = div.btn_ok = div.find('input');
		div.content = div.find('div.tipmsg-content');
		div.icon = div.find('div.tipmsg-alert');
		div.title = div.find('span.tipmsg-title');

		switch(setting.type){
			case 'errorTip':
				div.icon.attr('class', 'tipmsg-errorTip');
				break;
			case 'notice':
				div.icon.attr('class', 'tipmsg-notice');
				break;
			case 'confirm':
				div.icon.attr('class', 'tipmsg-confirm');
				div.btn_ok = $('<input type="button" value='+msg_ok+' />').click(function(){
						if($.isFunction(setting.callback)){
							setting.callback(div);
						}
						close(div, setting);
					});
				div.btn_cancle.val(msg_cancle).before(div.btn_ok);
				break;
		}

		//设置关闭事件
		div.close.add(div.btn_cancle).click(function(e){
			close(div, setting);
			e.preventDefault();
		})
		//不能拖拽
		.bind('dragstart', function(e){
			e.preventDefault();
		});

		//设置标题
		div.title.html(setting.title);

		//放入内容
		div.content.html(setting.message);

		//设置弹出管理
		div.manager = $.popManager.init();
		div.appendTo(div.manager.$div);
		div.manager.show();
		div.remove = function(){
			this.manager.remove();
		};

		//居中
		div.css({
			top: (document.documentElement.clientHeight - div.height())/2,
			left:(document.documentElement.clientWidth - div.width())/2
		});

		//如果有显示之前的操作
		if($.isFunction(setting.beforeShow)){
			setting.beforeShow(div);
		}

		if(setting.slide){
			div.fadeIn();
		}else{
			div.show();
		}

		//确认按钮获得焦点
		if(setting.focus_yes){
			div.btn_ok.focus();
		}else{
			div.btn_cancle.focus();
		}

		//如果有显示之时的操作
		if($.isFunction(setting.onShow)){
			setting.onShow(div);
		}

		//拖动与否
		if(setting.dragable){
			div.hdlDrag({
				trigger_filter: function(e){
					if($(e.target).closest(':button, .tipmsg-content, .tipmsg-close').length){
						return false;
					}
				}
			});
		}

		//是否自动关闭
		if(setting.auto_hide > 0){
			setTimeout(function(){
				div.close.click();
			}, setting.auto_hide*1000);
		}
		div.show();

		return div;
	}

	//代理4种提示的初始化
	function wrap(message, title, callback, type){
		var tip = new init();

		//第2个参数为回调函数的时候,更正参数顺序
		if(S.isFunction(title)){
			callback = title;
			title = msg_confirm;
		}

		//无title时修改为默认值
		if(!title){
			title = msg_confirm;
		}

		//修正设置
		tip.setType(type);
		tip.setTitle(title);
		tip.setContent(message);
		tip.setCallback(callback);

		return tip;
	}

	$.extend({
		/**
		 * 一般提示
		 */
		alert: function(message, title, callback){
			return wrap(message, title, callback, 'alert');
		},
		/**
		 * 错误提示
		 */
		errorTip: function(message, title, callback){
			return wrap(message, title, callback, 'errorTip');
		},
		/**
		 * 警告提示
		 */
		notice: function(message, title, callback){
			return wrap(message, title, callback, 'notice');
		},
		/**
		 * 确认提示
		 */
		confirm: function(message, title, callback){
			return wrap(message, title, callback, 'confirm');
		}
	});
}, {
	requires: ['jquery-1.4.2', 'popManager', 'hdlDrag']
});
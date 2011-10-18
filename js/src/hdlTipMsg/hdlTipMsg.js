/**********************************************************************************************
 * 层模拟的提示信息插件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-9-25 14:52:5
 * 版本: v3
 * 
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
 * 
 */

KISSY.add('hdlTipMsg', function(S, undef) {
	var $ = jQuery,

		msg_alert = '提示',
		msg_error = '错误',
		msg_notice = '警告',
		msg_confirm = '确认',
		msg_defalt = '默认信息',
		msg_ok = '确定',
		msg_cancle = '取消',

		html_string = '<div class="tipmsg-wrap"><div class="tipmsg-h1"><div class="tipmsg-h2"><div class="tipmsg-h3"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div></div></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg-b1"><div class="tipmsg-b2"><div class="tipmsg-b3"><input type="button" value="'+msg_ok+'" /></div></div></div></div>',
		html_css3 = '<div class="tipmsg-wrap"><div class="tipmsg2-h1"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg2-b1"><input type="button" value="'+msg_ok+'" /></div></div>',
		pre_setting = {
			 message: msg_defalt
			,type: 'alert'
			,title: msg_alert
			//自动隐藏,为数字,0表示不自动,大于0的整数表示多少秒后隐藏
			,auto_hide: 0
			//针对confirm的回调函数
			,callback: 0
			//在层打开之前的操作
			,beforeShow: 0
			//显示层时的操作
			,onShow: 0
			//在层关闭之前的操作
			,beforeHide: 0
			//关闭层时的操作
			,onHide: 0
			//是否可拖动
			,dragable: 1
			//是否淡入淡出
			,slide: 0
			//默认焦点在yes上
			,focus_yes: 1
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

	//内部功能函数 - 关闭
	function close(div, setting){
		//关闭之前的操作
		if(S.isFunction(setting.onHide)){
			setting.onHide(div);
		}

		//消失,删除,并取消注册的事件
		if(setting.slide){
			div.fadeOut(function(){
				div.manager.remove();
			});
		}else{
			div.manager.remove();
		}
	}

	//内部功能函数 - 初始化
	function init(setting){
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
				div.icon.attr('class', 'tipmsg-error');
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
		div.appendTo(div.manager.div);
		div.hide();
		div.manager.div.appendTo('body').show();
		div.remove = function(){
			this.manager.remove();
		};

		//居中
		div.css({
			 top: (document.documentElement.clientHeight - div.height())/2
			,left:(document.documentElement.clientWidth - div.width())/2
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

	$.extend({
		 //提示
		 alert: function(str, title){
			var setting = {};
			if(typeof str === 'object'){
				$.extend(true, setting, pre_setting, str, {type:'alert'});
			}else{
				title = title || msg_alert;
				$.extend(true, setting, pre_setting, {type:'alert', title:title, message:str});
			}
			return init(setting);
		}

		//错误
		,errorTip: function(str, title){
			var setting = {};
			if(typeof str === 'object'){
				$.extend(true, setting, pre_setting, str, {type:'errorTip'});
			}else{
				title = title || msg_error;
				$.extend(true, setting, pre_setting, {type:'errorTip', title:title, message:str});
			}
			return init(setting);
		}

		//警告
		,notice: function(str, title){
			var setting = {};
			if(typeof str === 'object'){
				$.extend(true, setting, pre_setting, str, {type:'notice'});
			}else{
				title = title || msg_notice;
				$.extend(true, setting, pre_setting, {type:'notice', title:title, message:str});
			}
			return init(setting);
		}

		//确认
		,confirm: function(str, title, callback){
			var setting = {};
			if(typeof str === 'object'){
				$.extend(true, setting, pre_setting, str, {type:'confirm'});
			}else{
				//第2个参数为函数的时候,更正参数顺序
				if(typeof title == 'function'){
					callback = title;
					title = msg_confirm;
				}
				if(!title){
					title = msg_confirm;
				}
				$.extend(true, setting, pre_setting, {type:'confirm', title:title, message:str, callback:callback});
			}
			return init(setting);
		}
	});
}, {
	requires: ['jquery-1.4.2', 'popManager', 'hdlDrag']
});
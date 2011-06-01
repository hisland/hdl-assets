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
 * 
 * pre_setting = {
 * 		 message: '默认信息'	//字符串 提示内容,必填
 * 		,type: 'alert'			//字符串 提示类型,内部指定
 * 		,title: '提示'			//字符串 提示标题
 * 		,auto_hide: 0			//整数   自动隐藏,为数字,0表示不自动,大于0的整数表示多少秒后隐藏
 * 		,callback: 0			//函数   针对confirm的回调函数
 * 		,beforeShow: 0			//函数   在层打开之前的操作
 * 		,onShow: 0				//函数   显示层时的操作
 * 		,beforeHide: 0			//函数   在层关闭之前的操作
 * 		,onHide: 0				//函数   关闭层时的操作
 * 		,dragable: 1			//布尔值 是否可拖动
 * 		,slide: 0				//布尔值 是否淡入淡出
 * 		,focus: 0				//布尔值 是否淡入淡出
 * }
 */

KISSY.add('hdlTipMsg', function(S, undef) {
	var  $ = jQuery
		,html_string = '<div class="tipmsg-wrap"><div class="tipmsg-h1"><div class="tipmsg-h2"><div class="tipmsg-h3"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div></div></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg-b1"><div class="tipmsg-b2"><div class="tipmsg-b3"><input type="button" value="确定" /></div></div></div></div>'
		,html_css3 = '<div class="tipmsg-wrap"><div class="tipmsg2-h1"><span class="tipmsg-title"></span><a href="#" class="tipmsg-close"></a></div><div class="tipmsg-alert"></div><div class="tipmsg-c1"><div class="tipmsg-content"></div></div><div class="tipmsg2-b1"><input type="button" value="确定" /></div></div>'
		,pre_setting = {
			 message: '默认信息'
			,type: 'alert'
			,title: '提示'
			,auto_hide: 0
			,callback: 0
			,beforeShow: 0
			,onShow: 0
			,beforeHide: 0
			,onHide: 0
			,dragable: 1
			,slide: 0
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
		div.btn_ok = div.find('input');
		div.btn_cancle = div.btn_ok;
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
				div.btn_ok = $('<input type="button" value="确定" />').click(function(){
						if($.isFunction(setting.callback)){
							setting.callback(div);
						}
						close(div, setting);
					});
				div.btn_cancle.val('取消').before(div.btn_ok);
				break;
		}

		//设置标题
		div.title.html(setting.title);

		//放入内容
		div.content.html(setting.message);

		//设置弹出管理
		div.manager = $.popManager.init();
		div.appendTo(div.manager.div);
		div.manager.div.appendTo('body').show();

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
			div.hdlDrag();
		}

		//阻止内容里面点击时的拖动
		div.content.mousedown(function(e){
			e.stopPropagation();
		});

		//是否自动关闭
		if(setting.auto_hide > 0){
			setTimeout(function(){
				div.close.click();
			}, setting.auto_hide*1000);
		}

		return div;
	}

	$.extend({
		 //提示
		 alert: function(str, title){
			var setting = {};
			if(typeof str === 'object'){
				$.extend(true, setting, pre_setting, str, {type:'alert'});
			}else{
				title = title || '提示';
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
				title = title || '错误';
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
				title = title || '警告';
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
				if(typeof title == 'function'){//第2个参数为函数的时候,更正参数顺序
					callback = title;
					title = '确认';
				}
				if(!title){
					title = '确认';
				}
				$.extend(true, setting, pre_setting, {type:'confirm', title:title, message:str, callback:callback});
			}
			return init(setting);
		}
	});
}, {
	requires: ['jquery-1.4.2', 'popManager', 'hdlDrag']
});
/**********************************************************************************************
 * 层模拟的提示信息插件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-9-25 14:52:5
 * 版本: v3
 *
 * TODO:
 *		confirm点击是或否应该有 returnValue
 *		需要一个机制来控制不能关闭此层 - 2010-8-19 14:5:35
 *		defaultFocus - 2010-10-12 10:33:29
 */

KISSY.add('hdlTipMsg', function(S, undef) {
	var  $ = jQuery
		,html_string = '<div class="tipmsg_wrap"><!--[if lte IE 6]><iframe frameborder="no" scrolling="no" style="position:absolute;width:327px;filter:alpha(opacity=0);"></iframe><![endif]--><div class="tipmsg_title_wrap"><span class="tipmsg_title"></span><a href="#" class="tipmsg_close">&nbsp;</a></div><div class="tipmsg_content_wrap"><span class="tipmsg_ico"></span><div class="tipmsg_content"></div></div><div class="tipmsg_btn_wrap"><input type="button" value="确定" /></div></div>'//生成提示框用的原始html字符串
		,guid = 0//提示层计算器
		,pre_setting = {
						 message:'提示信息'	//字符串 提示内容,必填
						,type:'alert'		//字符串 提示类型,内部指定
						,title:'提示'		//字符串 提示标题
						,auto_hide:0		//整数   自动隐藏,为数字,0表示不自动,大于0的整数表示多少秒后隐藏
						,callback:0			//函数   针对confirm的回调函数
						,beforeShow:0		//函数   在层打开之前的操作
						,onShow:0			//函数   显示层时的操作
						,onHide:0			//函数   关闭层时的操作
						,dragable:true		//布尔值 是否可拖动
						,slide:false		//布尔值 是否淡入淡出
					};
	
	/* 内部功能函数 - 关闭 */
	function close(div, setting){
		if(typeof setting.onHide == 'function'){
			setting.onHide(div);
		}

		if(setting.slide === true){
			div.fadeOut(function(){
				div.remove();
			});
		}else{
			div.remove();
		}

		guid--;
		return false;
	}

	/* 内部功能函数 - z-index计数器 */
	zid = (function zid(base){
			return function(){
				return ++base;
			};
		})(3000);

	//构造函数
	function tipmsg(setting){
		//设置默认属性, 并用参数属性覆盖
		$.extend(this, {
						 message:'提示信息'	//字符串 提示内容,必填
						,type:'alert'		//字符串 提示类型,内部指定
						,title:'提示'		//字符串 提示标题
						,auto_hide:0		//整数   自动隐藏,为数字,0表示不自动,大于0的整数表示多少秒后隐藏
						,dragable:true		//布尔值 是否可拖动
						,slide:false		//布尔值 是否淡入淡出
						,__callback:[]		//函数列表   针对confirm的回调函数
						,__beforeShow:[]	//函数列表   在层打开之前的操作
						,__show:[]		//函数列表   显示层时的操作
						,__hide:[]		//函数列表   关闭层时的操作
					}, setting);
		//保存原始dom
		this.jqdom = $(tipmsg.html_string);
	}
	tipmsg.html_string = '<div class="tipmsg_wrap"><!--[if lte IE 6]><iframe frameborder="no" scrolling="no" style="position:absolute;width:327px;filter:alpha(opacity=0);"></iframe><![endif]--><div class="tipmsg_title_wrap"><span class="tipmsg_title"></span><a href="#" class="tipmsg_close">&nbsp;</a></div><div class="tipmsg_content_wrap"><span class="tipmsg_ico"></span><div class="tipmsg_content"></div></div><div class="tipmsg_btn_wrap"><input type="button" value="确定" /></div></div>',//生成提示框用的原始html字符串
	tipmsg.prototype = {
		 close: function(){
			
		}
		,bind: function(type, func){
			type = this['__'+type];
			for(var i=0;i<type.length;i++){
				if(type[i] === func){
					alert('以下函数已存在,不用重复注册:\n' + func);
					return false;
				}
			}
			type.push(func);
		}
		,unbind: function(type, func){
			type = this['__'+type];
			for(var i=0;i<type.length;i++){
				if(type[i] === func){
					type.splice(i, 1);
					break;
				}
			}
		}
		,trigger: function(type){
			type = this['__'+type];
			for(var i=0;i<type.length;i++){
				type[i]();
			}
		}
	}
	init.prototype.close = function (){
		
	}

	/* 内部功能函数 - 初始化 */
	function init(setting){
		/* 生成DOM */
		var div = $(html_string);
		/* 设置标题 */
		div.find('span.tipmsg_title').html(setting.title);
		/* 确定和关闭按钮注册关闭事件 */
		div.find('a.tipmsg_close,input').click(function(){
			return close(div, setting);
		});
		//判断提示类型,并设置图标,如果为confirm还要做特殊处理
		switch(setting.type){
			case 'alert':
				div.find('span.tipmsg_ico').addClass('tipmsg_ico1');
				break;
			case 'error':
				div.find('span.tipmsg_ico').addClass('tipmsg_ico2');
				break;
			case 'notice':
				div.find('span.tipmsg_ico').addClass('tipmsg_ico3');
				break;
			case 'confirm':
				div.find('span.tipmsg_ico').addClass('tipmsg_ico4');
				div.find('input').val('取消').before(
					$('<input type="button" value="确定" class="btn2" />')
					.click(function(){
						if(typeof setting.callback == 'function'){
							setting.callback(div);
						}
						close(div, setting);
					})
				);
				break;
		}
		/* 填入字符串 */
		div.find('div.tipmsg_content').html(setting.message);

		//添加到dom中
		div.css('visibility','hidden');
		$('body').append(div);
		div.find('iframe').height(div.height());

		//设置位置
		div.css({
					top :document.documentElement.scrollTop + (document.documentElement.clientHeight-div.height()-30)/2,
					left:document.documentElement.scrollLeft + (document.documentElement.clientWidth - div.width())/2,
					'z-index':zid()
				})
			.mousedown(function(){
				this.style.zIndex = zid();
			});

		//如果有显示之前的操作
		if(typeof setting.beforeShow == 'function'){
			setting.beforeShow(div);
		}

		div.hide().css('visibility','');
		if(setting.slide === true){
			div.fadeIn();
		}else{
			div.show();
		}
		//确认按钮获得焦点
		div.children('.tipmsg_btn_wrap').find('input:last').focus();

		//如果有显示之时的操作
		if(typeof setting.onShow == 'function'){
			setting.onShow(div);
		}

		//拖动与否
		if(setting.dragable === true){
			div.hdlDrag();
		}
		
		//阻止内容里面点击时的拖动
		div.find('div.tipmsg_content_wrap>div').mousedown(function(e){
			e.stopPropagation();
		});

		//是否自动关闭
		if(setting.auto_hide > 0){
			setTimeout(function(){
				div.find('a.tipmsg_close').click();
			}, setting.auto_hide*1000);
		}

		guid++;

		return div;
	}

	//提示
	function alert(str, title){
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
	function error(str, title){
		var setting = {};
		if(typeof str === 'object'){
			$.extend(true, setting, pre_setting, str, {type:'error'});
		}else{
			title = title || '错误';
			$.extend(true, setting, pre_setting, {type:'error', title:title, message:str});
		}
		return init(setting);
	}

	//警告
	function notice(str, title){
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
	function confirm(str, title, callback){
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

	$.extend({
		alert   : alert,
		errorTip   : error,
		notice  : notice,
		confirm : confirm
	});
}, {
	requires: ['jquery-1.4.2', 'hdlDrag']
});
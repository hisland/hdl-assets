/**********************************************************************************************
 * 名称: 拖动
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-09-14 15:17:59
 * 版本: v2
 *
 * API:
 *		$(selector).hdlDrag(); //初始化,拖动自己
 *		$(selector).hdlDrag(setting); //初始化,并传入设置, 或者修改设置
 *		$(selector).hdlDrag(selector); //初始化,使用字符串selector避免内存泄露
 *
 * TODO:
 *		ie嵌套注册时会有问题
 *		支持嵌套定位内部的移动,会计算offsetParent的top,left值
 * 
 * 2011-09-14 17:03:18:
 *		ie6,7,8需要setCapture
 * 
 * 2011-09-15 10:22:44:
 *		ie使用losecapture 检测焦点丢失时取消注册, ie的window.blur会在焦点失去再得到时触发,故不用它
 *		ff使用window.blur 检测焦点丢失时取消注册
 * 
 * 2011-10-01 11:31:29:
 *		多数操作都需要对等函数,如show,hide, mask,demask...
 *		启用停用
 * 
 */

KISSY.add('hdlDrag', function(S, undef) {
	var $ = jQuery,
		need_capture = /*@cc_on!@*/!1 && /msie [678].0/i.test(navigator.userAgent),
		trigger, target;

	var default_setting = {
			enable: true
		};

	function mouseDown(e){
		var filter = this.drag_setting.trigger_filter;

		//停用时,有检测函数且返回值为fasle时,不进行拖动
		if(!this.drag_setting.enable || (S.isFunction(filter) && filter.call(this, e) === false)){
			//do nothing
		}else{
			trigger = this;
			//修正target
			if(!this.drag_setting.target){
				target = this;
			}else{
				target = $(this.drag_setting.target)[0];
			}

			//设置位置
			var pos = $(target).position();
			var parent = document.documentElement;
			var w = parent.clientWidth - $(target).outerWidth();
			var h = parent.clientHeight - $(target).outerHeight();
			S.mix(this.drag_setting, {
				 old_mouse: [e.clientX, e.clientY]
				,old_pos: [pos.left, pos.top]
				,range: [[0, w], [0, h]]
			});

			start();
		}
	}
	function mouseMove(e){
		//快捷变量
		var old_mouse = target.drag_setting.old_mouse,
			old_pos = target.drag_setting.old_pos,
			range = target.drag_setting.range;

		//计算偏移与新位置
		var diff_mouse = [e.clientX - old_mouse[0], e.clientY - old_mouse[1]],
			new_pos = [old_pos[0] + diff_mouse[0], old_pos[1] + diff_mouse[1]];

		//修正水平垂直最小最大范围
		new_pos[0] = new_pos[0] < range[0][0] ? range[0][0] : new_pos[0] > range[0][1] ? range[0][1] : new_pos[0];
		new_pos[1] = new_pos[1] < range[1][0] ? range[1][0] : new_pos[1] > range[1][1] ? range[1][1] : new_pos[1];

		//设置新位置
		$(target).css({
			 left: new_pos[0]
			,top: new_pos[1]
		});
	}

	//可拖动目标不能让它拖拽与选择内容
	function noDrag(e){
		e.preventDefault();
	}

	//开始拖动,注册各种事件
	function start(){
		$(document).mousemove(mouseMove).mouseup(end).bind('dragstart', noDrag);

		//不能选中内容
		$('body').add(trigger).css('-moz-user-select', 'none');
		$(document).bind('selectstart', noDrag);

		//检测窗口失去[焦点|捕获]时,取消注册
		if(need_capture){
			//ie下setCapture会导致输入框焦点不会失去,延迟可以正常
			setTimeout(function() {
				//由于存在延迟,trigger也有清除操作,所以需要检测
				if(trigger){
					trigger.setCapture();
					$(trigger).bind('losecapture', end);
				}
			}, 1);
		}else{
			$(window).blur(end);
		}
	}

	//完成拖动,取消各种事件
	function end(){
		$(document).unbind('mousemove', mouseMove).unbind('mouseup', end).unbind('dragstart', noDrag);

		$('body').add(trigger).css('-moz-user-select', '');
		$(document).unbind('selectstart', noDrag);

		//取消检测
		if(need_capture){
			//releaseCapture会触发losecapture, 优先取消注册
			$(trigger).unbind('losecapture', end);
			trigger.releaseCapture();
		}else{
			$(window).unbind('blur', end);
		}

		//清除引用
		trigger = target = null;
	}

	//初始化或修改设置
	function hdlDrag(setting){
		var target;
		//setting为target选择器
		if(S.isString(setting)){
			target = setting;
			setting = {};
		}
		//配置对象时
		else if(S.isPlainObject(setting)){
			target = setting.target;
		}
		//其它情况
		else{
			setting = {};
		}

		//selector必须能选中元素
		if($(target).length){
			setting.target = target;
		}else{
			setting.target = null;
		}

		return this.each(function(i, v){
			//只注册一次事件
			if(!this['--bind-drag']){
				this['--bind-drag'] = true;
				$(this).mousedown(mouseDown);

				//新增设置
				this.drag_setting = S.mix(setting, default_setting, false);
			}
			//修改设置
			else{
				//只能修改[拖动目标, 过滤函数, 拖动与否]
				S.mix(this.drag_setting, setting, ['target', 'trigger_filter', 'enable']);
			}

			//鼠标状态
			if(this.drag_setting.enable){
				$(this).css('cursor', 'move');
			}else{
				$(this).css('cursor', 'default');
			}
		});
	}

	//放到jq原型链上
	$.fn.extend({
		hdlDrag: hdlDrag
	});
}, {
	requires: ['jquery-1.4.2']
});
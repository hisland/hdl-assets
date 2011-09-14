/**********************************************************************************************
 * 名称: 拖动
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-09-14 15:17:59
 * 版本: v2
 *
 * API:
 *		$(selector).hdlDrag(setting); //初始化并传入设置, 或者修改设置
 *		$(selector).hdlDrag(selector); //使用selector避免内存泄露
 * 
 * 2011-09-14 17:03:18:
 *		ie6,7,8需要setCapture
 * 
 */

KISSY.add('hdlDrag', function(S, undef) {
	var  $ = jQuery
		,need_capture = /*@cc_on!@*/!1 && /msie [678].0/i.test(navigator.userAgent)
		,trigger, target;

	var default_setting = {
			 target: null //String selecotr, 拖动的目标
			,filter: null //函数,鼠标按下时是否进行拖动的检测
		};

	function mouseDown(e){
		var filter = this.drag_setting.trigger_filter;
		if(S.isFunction(filter) && !filter()){
			//do nothing
		}else{
			trigger = this;

			if(!this.drag_setting.target){
				target = this;
			}else{
				target = $(this.drag_setting.target)[0];
			}

			if(need_capture){
				trigger.setCapture();
			}

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
		var old_mouse = target.drag_setting.old_mouse;
		var old_pos = target.drag_setting.old_pos;
		var range = target.drag_setting.range;

		//计算偏移与新位置
		var diff_mouse = [e.clientX - old_mouse[0], e.clientY - old_mouse[1]];
		var new_pos = [old_pos[0] + diff_mouse[0], old_pos[1] + diff_mouse[1]];

		//修正水平垂直最小最大范围
		new_pos[0] = new_pos[0] < range[0][0] ? range[0][0] : new_pos[0] > range[0][1] ? range[0][1] : new_pos[0];
		new_pos[1] = new_pos[1] < range[1][0] ? range[1][0] : new_pos[1] > range[1][1] ? range[1][1] : new_pos[1];

		//设置新位置
		$(target).css({
			 left: new_pos[0]
			,top: new_pos[1]
		});
	}

	//可拖动目录不能让它拖拽
	function dragStart(e){
		e.preventDefault();
	}

	//开始拖动,注册各种事件
	function start(){
		$(document).mousemove(mouseMove).mouseup(end).bind('dragstart', dragStart);
	}

	//完成拖动,取消各种事件
	function end(){
		$(document).unbind('mousemove', mouseMove).unbind('mouseup', end).unbind('dragstart', dragStart);
		if(need_capture){
			trigger.releaseCapture();
		}
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

		//selector能选中元素
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
				this.drag_setting = S.mix({}, setting);
			}
			//修改设置
			else{
				S.mix(this.drag_setting, setting, ['target', 'trigger_filter']); //只能拖动目录和过滤函数
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
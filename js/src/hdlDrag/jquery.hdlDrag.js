/**********************************************************************************************
 * 拖动代码
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-9-6 21:10:0
 * 版本: v2
 *
 * 前置脚本:
 *			jquery-1.4.2.min.js;
 *
 * 使用方法:
 *			$().hdlDrag();
 *			$().hdlDrag(target);
 * 参数说明:
 *			target : 为拖动目标的selector
 */

(function($) {
	var drag_elm = null;

	//鼠标按下,设置初始数据,注册在元素上

	function mouseDown(e) {
		//设置拖动元素
		drag_elm = this.drag_elm;

		//保存当前鼠标的位置
		drag_elm.oldMouse = [e.clientX, e.clientY];

		//保存当前元素的位置
		var pos = $(drag_elm).position();
		drag_elm.oldPos = [pos.left, pos.top];

		//测试是否可见并设置属性,否则元素不会有宽高
		var v;
		if (!(v = drag_elm.is(':visible'))) {
			drag_elm.css('visibility', 'hidden').show();
		}

		//获取需要的值
		var p = $(drag_elm[0].offsetParent);
		var w = p.outerWidth() - drag_elm.outerWidth();
		var h = p.outerHeight() - drag_elm.outerHeight();

		//如果前面保存的可见与否为不可见,则还原回去
		if (!v) {
			drag_elm.css('visibility', '').hide();
		}

		//更新拖动范围
		drag_elm.range = {
			x: [0, w],
			y: [0, h]
		};

		//防止拖动的时候选择文本
		document.body.onselectstart = function() {
			return false;
		}
		$('body').css('-moz-user-select', 'none');
		$(document).mousemove(mouseMove).mouseup(mouseUp);
	}

	//鼠标移动,设置新的坐标数据,注册在document上


	function mouseMove(e) {
		if (drag_elm.length) {
			var newPos = [e.clientX - drag_elm.oldMouse[0] + drag_elm.oldPos[0], e.clientY - drag_elm.oldMouse[1] + drag_elm.oldPos[1]];

			newPos[0] = newPos[0] < drag_elm.range.x[0] ? drag_elm.range.x[0] : newPos[0]; //更正水平方向的最小值
			newPos[0] = newPos[0] > drag_elm.range.x[1] ? drag_elm.range.x[1] : newPos[0]; //更正水平方向的最大值
			newPos[1] = newPos[1] < drag_elm.range.y[0] ? drag_elm.range.y[0] : newPos[1]; //更正垂直方向的最小值
			newPos[1] = newPos[1] > drag_elm.range.y[1] ? drag_elm.range.y[1] : newPos[1]; //更正垂直方向的最大值
			drag_elm.css({
				top: newPos[1],
				left: newPos[0]
			});
		}
	}

	//鼠标放开,去掉拖动数据,注册在document上


	function mouseUp(e) {
		//下面是鼠标放开时候的清除操作
		drag_elm = null;
		document.body.onselectstart = null;
		$('body').css('-moz-user-select', '');
		$(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
	}

	//jq原型方法
	function hdlDrag(target) {
		this.css('cursor', 'move');

		target = $(target);
		target = target.length ? target.eq(0) : this;

		this[0].drag_elm = target; //保存在dom上
		this.mousedown(mouseDown);
	}
	$.fn.hdlDrag = hdlDrag;
})(jQuery);
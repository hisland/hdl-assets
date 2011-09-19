/**********************************************************************************************
 * 名称: 鼠标移动提示
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-09-19 09:33:38
 * 版本: v1
 * 
 * API:
 *		$(selector).mouseTip(msg);	//注册提示,使用固定消息
 *		$(selector).mouseTip(fn);	//注册提示,使用函数返回值作为消息
 * 
 * 
 */

KISSY.add('mouseTip', function(S, undef) {
	var  $ = jQuery
		,div_wrap = $('<div style="display:none;position:absolute;width:100px;height:50px;border:1px solid #afcdea;background:#f0f5fb;"></div>');

	//放入DOM
	div_wrap.appendTo('body');

	//鼠标移动时调整位置
	function mouseMove(e){
		var  body = document.documentElement
			,scroll_left = body.scrollLeft
			,scroll_top = body.scrollTop
			,max_width = body.clientWidth + scroll_left - 20
			,max_height = body.clientHeight + scroll_top - 20
			,pos_x, pos_y, elm_width, elm_height;

		//修正鼠标相对文档位置
		if(e.pageX){
			pos_x = e.pageX;
			pos_y = e.pageY;
		}else{
			pos_x = e.clientX + scroll_left;
			pos_y = e.clientY + scroll_top;
		}

		//元素宽高
		elm_width = div_wrap.outerWidth();
		elm_height = div_wrap.outerHeight();

		//设置水平对齐
		if(max_width > pos_x + elm_width){
			div_wrap.css('left', pos_x + 12);
		}else{
			div_wrap.css('left', pos_x - elm_width);
		}

		//设置垂直对齐
		if(max_height > pos_y + elm_height){
			div_wrap.css('top', pos_y + 18);
		}else{
			div_wrap.css('top', pos_y - elm_height);
		}
	}

	//鼠标进入
	function enter(e){
		var msg = $(this).data('mouseTip');
		//根据函数计算显示值
		if(S.isFunction(msg)){
			div_wrap.html(msg.call($(this)));
		}

		//直接显示原始值
		else{
			div_wrap.html(msg);
		}

		//显示
		div_wrap.show();
		$(document).mousemove(mouseMove);
	}

	//鼠标离开隐藏
	function leave(e){
		div_wrap.hide();
		$(document).unbind('mousemove', mouseMove);
	}

	$.fn.extend({
		mouseTip: function(msg){
			return this.each(function(i, v){
				if(!this['--bind-mouseTip']){
					this['--bind-mouseTip'] = true;
					$(this).data('mouseTip', msg).hover(enter, leave);
				}else{
					S.log(this, 'has bind mouseTip!');
				}
			});
		}
	});
}, {
	requires: ['jquery-1.4.2']
});
/**
 * @fileOverview
 * @module mouseTip
 * @author hisland hisland@qq.com
 * @description 鼠标移动提示
 * <pre><code>
 * API:
 *		$(selector).mouseTip(msg);		//注册/修改提示,使用固定消息
 *		$(selector).mouseTip(fn);		//注册/修改提示,使用函数返回值作为消息
 *		$(selector).mouseTip(false);	//关闭鼠标移动提示
 * </code></pre>
 */

KISSY.add('mouseTip', function(S, undef) {
	var $ = jQuery,
		$div = $('<div style="display:none;position:absolute;width:100px;height:50px;padding:3px;border:1px solid #afcdea;background:#f0f5fb;"></div>');

	//鼠标移动时调整位置
	function mouseMove(e){
		var body = document.documentElement,
			scroll_left = body.scrollLeft,
			scroll_top = body.scrollTop,
			max_width = body.clientWidth + scroll_left - 10,
			max_height = body.clientHeight + scroll_top - 10,
			pos_x, pos_y, elm_width, elm_height;

		//修正鼠标相对文档位置
		if(e.pageX){
			pos_x = e.pageX;
			pos_y = e.pageY;
		}else{
			pos_x = e.clientX + scroll_left;
			pos_y = e.clientY + scroll_top;
		}

		//元素宽高
		elm_width = $div.outerWidth();
		elm_height = $div.outerHeight();

		//设置水平对齐
		if(max_width > pos_x + elm_width){
			$div.css('left', pos_x + 12);
		}else{
			$div.css('left', pos_x - elm_width - 5);
		}

		//设置垂直对齐
		if(max_height > pos_y + elm_height){
			$div.css('top', pos_y + 18);
		}else{
			$div.css('top', pos_y - elm_height);
		}
	}

	//鼠标进入
	function enter(e){
		var msg = $(this).data('mouseTip');
		//根据函数计算显示值
		if(S.isFunction(msg)){
			$div.html(msg.call($(this)));
		}
		//直接显示原始值
		else{
			$div.html(msg);
		}

		//显示
		$div.show();
		$(document).mousemove(mouseMove);
	}

	//鼠标离开隐藏
	function leave(e){
		$div.hide();
		$(document).unbind('mousemove', mouseMove);
	}

	//放入DOM
	$div.appendTo('body');

	$.fn.extend({
		mouseTip: function(msg){
			return this.each(function(i, v){
				//取消提示
				if(msg === false){
					this['--bind-mouseTip'] = false;
					$(this).removeData('mouseTip').unbind('mouseenter', enter).unbind('mouseleave', leave);
				}
				//添加或修改提示内容
				else{
					$(this).data('mouseTip', msg);

					//只绑定一次事件
					if(!this['--bind-mouseTip']){
						this['--bind-mouseTip'] = true;
						$(this).hover(enter, leave);
					}
				}
			});
		}
	});
}, {
	requires: ['jquery-1.4.2']
});
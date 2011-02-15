(function($){
	var  div_wrap = $('<div style="display:none;position:absolute;width:100px;height:50px;border:1px solid #afcdea;background:#f0f5fb;"></div>')
		,tip = {};

	function move(e){
		var  body = document.documentElement
			,scrollTop = body.scrollTop
			,scrollLeft = body.scrollLeft
			,maxWidth = body.clientWidth - 15
			,maxHeight = body.clientHeight - 20
			,offsetLeft, offsetTop;

		//修正鼠标相对窗口位置
		if(e.pageX){
			offsetLeft = e.pageX;
			offsetTop = e.pageY;
		}else{
			offsetLeft = e.clientX + scrollLeft;
			offsetTop = e.clientY + scrollTop;
		}

		//设置水平对齐
		if(maxWidth > offsetLeft+div_wrap.outerWidth()){
			div_wrap.css('left', offsetLeft + 15);
		}else{
			div_wrap.css({left:'auto',right: maxWidth - offsetLeft + 16});
		}

		//设置垂直对齐
		if(maxHeight > offsetTop+div_wrap.outerHeight()){
			div_wrap.css('top', offsetTop + 22);
		}else{
			div_wrap.css({top:'auto',bottom: maxHeight - offsetTop + 23});
		}
	}

	tip.show = function(e){
		if(e){
			move(e);
		}
		div_wrap.show();
		$(document).mousemove(move);
	}
	tip.hide = function(){
		div_wrap.hide();
		$(document).unbind('mousemove', move);
	}

	tip.div = div_wrap;

	//加载完之后添加到dom
	$(function(){
		div_wrap.appendTo('body');
	});

	window.mouseTip = tip;
})(jQuery);
/**
 * 
 */

define(['jquery', './page', './skin', './topmsg'], function($, Page){
	var ie = /*@cc_on!@*/!1,
		ie6 = ie && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent),
		docWidth, docHeight, wrapWidth, wrapHeight,
		minWidth = 800,
		maxWidth = 1000,
		minHeight = 300;

	//窗口变动修正尺寸
	$(window).resize(function(e){
		//ie6修正最大/小宽度
		if(ie6){
			docWidth = document.documentElement.clientWidth;
			//最小宽度
			if(docWidth < minWidth){
				$('.main-wrap').width(wrapWidth = minWidth);
			}
			//最大宽度
			else if(docWidth > maxWidth){
				$('.main-wrap').width(wrapWidth = maxWidth);
			}
			//自适应
			else{
				$('.main-wrap').width('auto');
				wrapWidth = docWidth;
			}
		}

		//修正高度
		docHeight = document.documentElement.clientHeight;
		if(docHeight < minHeight){
			$('#menu-wrap, #main-wrap').height(wrapHeight = minHeight - 40);
		}else{
			$('#menu-wrap, #main-wrap').height(wrapHeight = docHeight - 40);
		}

		//修正菜单高度
		$('#menu-wrap div.menu-wrap').height(wrapHeight - 135);

		//窗口变化时,修正tbody的高度
		$('div.hdlgrid-body').each(function(i, v){
			var me = $(this), height = me.parent().parent().height();
			
			//去掉分页区域高度
			if($(this).next().is(':visible')){
				height -= $(this).next().outerHeight();
			}
			
			//去掉表头区域高度
			if($(this).prev().is(':visible')){
				height -= $(this).prev().outerHeight();
			}
			
			//去掉按钮区域高度
			if($(this).prev().prev().is(':visible')){
				height -= $(this).prev().prev().outerHeight();
			}

			//避免每次都修改
			if(me.data('prev-height') !== height){
				me.height(height);
				me.data('prev-height', height);
			}
		});
	}).resize();

	return Page;
});

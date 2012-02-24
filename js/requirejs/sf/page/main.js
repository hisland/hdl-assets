/**
 * 
 */

define(['jquery', 'kissy', 'css!./page'], function($, S){
	var ie = /*@cc_on!@*/!1, ie6 = ie && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent),
		width, height;

	//窗口变动修正尺寸
	$(window).resize(function(e){
		//ie6修正最大/小宽度
		if(ie6){
			width = document.documentElement.clientWidth;
			if(width < 800){
				$('.main-wrap').width(800);
			}else if(width > 1100){
				$('.main-wrap').width(1100);
			}else{
				$('.main-wrap').width('auto');
			}
		}

		//修正高度
		height = document.documentElement.clientHeight;
		if(height < 500){
			$('.menu-bar, .main').height(500);
		}else{
			$('.menu-bar, .main').height(height - 25);
		}
	}).resize();

	return {
		loadMenu: function(){
			
		},
		loadUrl: function(url, param, fn){
			
		}
	};
});

define(['jquery'], function($){
	var ie = /*@cc_on!@*/!1,
		ie6 = ie && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent),
		docWidth, docHeight, wrapWidth, wrapHeight, mainHeight,
		minWidth = 1016,
		maxWidth = 1400,
		minHeight = 300;

	//窗口变动修正尺寸
	$(window).resize(function(e){
		//修正最大/小宽度
		docWidth = document.documentElement.clientWidth;
		//最小宽度
		if(docWidth < minWidth){
			wrapWidth = minWidth;
		}
		//自适应
		else{
			wrapWidth = docWidth;
		}
		$('#main-wrap').width(wrapWidth);

		//修正高度
		docHeight = document.documentElement.clientHeight;
		if(docHeight < minHeight){
			wrapHeight = minHeight - 61;
			$('#main-wrap').height(minHeight);
			$('body').css('overflow-y', 'scroll');
		}else{
			wrapHeight = docHeight - 61;
			$('#main-wrap').height(docHeight);
			$('body').css('overflow-y', 'hidden');
		}

		//修正菜单高度
		$('#menu-wrap').height(wrapHeight);
		$('#menu-toggle').height(wrapHeight);

		//修正内容高度
		$('#main').height(wrapHeight);
		mainHeight = wrapHeight - 29;
		$('#main-in').height(mainHeight);

		//单个查询结果高度
		$('#main div.reheight1').each(function(i, v){
			//去掉查询条件高度
			var height = mainHeight - $(this).prev().outerHeight() - 6;

			$(this).find('div.hdlgrid-body').each(function(i, v){
				var me = $(this);
				
				//去掉按钮区域高度
				if(me.prev().prev().is(':visible')){
					height -= me.prev().prev().outerHeight();
				}
				
				//去掉表头区域高度
				if(me.prev().is(':visible')){
					height -= me.prev().outerHeight();
				}
				
				//去掉分页区域高度
				if(me.next().is(':visible')){
					height -= me.next().outerHeight();
				}

				//下面需要留空白
				me.height(height - 4);
			});
		});

		//导出界面高度
		$('#main div.reheight-export').each(function(i, v){
			//去掉查询条件高度
			var height = mainHeight - 10;

			$(this).find('div.hdlgrid-body').each(function(i, v){
				var me = $(this);
				
				//去掉按钮区域高度
				height -= me.prev().prev().outerHeight();
				
				//去掉表头区域高度
				height -= me.prev().outerHeight();
				
				//去掉分页区域高度
				height -= me.next().outerHeight();

				//下面需要留空白
				me.height(height);
			});
		});

		//用户/用户组带树高度
		$('#main-in>div.reheight-sysroles').each(function(i, v){
			var height = mainHeight - $(this).prev().outerHeight() - 10;

			$(this).find('div.hdl-tree-wrap').height(height - 17);

			$(this).find('div.hdlgrid-body').each(function(i, v){
				var me = $(this);
				
				//去掉分页区域高度
				height -= me.next().outerHeight();
				
				//去掉表头区域高度
				height -= me.prev().outerHeight();
				
				//去掉按钮区域高度
				height -= me.prev().prev().outerHeight();

				//减掉自身的边框高度
				me.height(height + 1);
			});
		});

		//单个ajax-tab计算高度
		$('#main-in>div.reheight-onlytab').each(function(i, v){
			$(this).find('div.ui-tab-con').height(mainHeight - 35);
		});
	}).resize();
});

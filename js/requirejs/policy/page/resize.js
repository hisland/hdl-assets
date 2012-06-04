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
		$('#menu-wrap>div').height(wrapHeight-20);
		$('#menu-toggle').height(wrapHeight - 30);

		//修正内容高度
		$('#main').height(wrapHeight);
		mainHeight = wrapHeight - 29;
		$('#main-in').height(mainHeight);

		//单个查询结果高度
		$('#main-in>div.search-result').each(function(i, v){
			//去掉查询条件高度
			var height = mainHeight - $(this).prev().outerHeight() - 9;

			$(this).find('div.hdlgrid-body').each(function(i, v){
				var me = $(this);
				
				//去掉分页区域高度
				if(me.next().is(':visible')){
					height -= me.next().outerHeight();
				}
				
				//去掉表头区域高度
				if(me.prev().is(':visible')){
					height -= me.prev().outerHeight();
				}
				
				//去掉按钮区域高度
				if(me.prev().prev().is(':visible')){
					height -= me.prev().prev().outerHeight();
				}

				//减掉自身的边框高度
				me.height(height - 6);
			});
		});

		//用户组带树高度
		$('#main-in>div.reheight2').each(function(i, v){
			var height = mainHeight - 10;

			$(this).height(height);

			$(this).find('div.hdl-tree-wrap').height(height - 17);

			$(this).find('div.hdlgrid-body').each(function(i, v){
				var me = $(this);
				
				//去掉分页区域高度
				if(me.next().is(':visible')){
					height -= me.next().outerHeight();
				}
				
				//去掉表头区域高度
				if(me.prev().is(':visible')){
					height -= me.prev().outerHeight();
				}
				
				//去掉按钮区域高度
				if(me.prev().prev().is(':visible')){
					height -= me.prev().prev().outerHeight();
				}

				//减掉自身的边框高度
				me.height(height + 1);
			});
		});

		//用户带树高度
		$('#main-in>div.reheight3').each(function(i, v){
			var height = mainHeight - $(this).prev().outerHeight() - 10;

			$(this).height(height);

			$(this).find('div.hdl-tree-wrap').height(height - 17);

			$(this).find('div.hdlgrid-body').each(function(i, v){
				var me = $(this);
				
				//去掉分页区域高度
				if(me.next().is(':visible')){
					height -= me.next().outerHeight();
				}
				
				//去掉表头区域高度
				if(me.prev().is(':visible')){
					height -= me.prev().outerHeight();
				}
				
				//去掉按钮区域高度
				if(me.prev().prev().is(':visible')){
					height -= me.prev().prev().outerHeight();
				}

				//减掉自身的边框高度
				me.height(height + 1);
			});
		});

		//配置页面如果button一直保持在底部,需要动态计算高度
		$('#main-in div.config-wrap').each(function(i, v){
			var need_height = mainHeight,
				real_height = this.scrollHeight;

			//去掉外层padding
			need_height -= 10;
			//去掉自己的padding
			need_height -= 15;
			//去掉button区域高度
			need_height -= $(this).next().outerHeight();

			if(need_height < real_height){
				$(this).height(need_height);
			}else{
				$(this).height('auto');
			}
		});

		//导入导出页面,需要动态计算高度
		$('#main-in>.import-page').each(function(i, v){
			var height = mainHeight;

			//从上往下依次去掉固定高度
			height -= 5;
			height -= 25;
			height -= 34;
			height -= 22;
			height -= 29;
			height -= 10;

			$(this).find('div.hdlgrid-body').height(height);
		});

		//单独的表格,需要动态计算高度
		$('#main-in>.only-grid').each(function(i, v){
			var height = mainHeight;

			//从上往下依次去掉固定高度
			height -= 5;
			height -= 34;
			height -= 22;
			height -= 8;

			$(this).find('div.hdlgrid-body').height(height);
		});

		//单独的表格带分页,需要动态计算高度
		$('#main-in>.only-grid-page').each(function(i, v){
			var height = mainHeight;

			//从上往下依次去掉固定高度
			height -= 5;
			height -= 34;
			height -= 22;
			height -= 29;
			height -= 8;

			$(this).find('div.hdlgrid-body').height(height);
		});

		//tab的统计页面,需要动态计算高度
		$('#main-in .tab-report').each(function(i, v){
			var height = mainHeight - $(this).prev().outerHeight() - 9;

			//从上往下依次去掉固定高度
			height -= 25;
			height -= 22;
			height -= 29;
			height -= 8;

			$(this).find('div.hdlgrid-body').height(height);
		});
	}).resize();
});

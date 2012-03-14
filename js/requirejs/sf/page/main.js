/**
 * 
 */

define(['jquery', 'kissy', 'ui/pop-manager', 'css!./page'], function($, S, PM){
	var ie = /*@cc_on!@*/!1, ie6 = ie && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent),
		docWidth, docHeight, wrapWidth, wrapHeight,
		minWidth = 800,
		maxWidth = 1000,
		minHeight = 300;

	//窗口变动修正尺寸
	$(window).resize(function(e){
		//ie6修正最大/小宽度
		if(ie6){
			docWidth = document.documentElement.clientWidth;
			if(docWidth < minWidth){
				$('.main-wrap').width(wrapWidth = minWidth);
			}else if(docWidth > maxWidth){
				$('.main-wrap').width(wrapWidth = maxWidth);
			}else{
				$('.main-wrap').width('auto');
				wrapWidth = docWidth;
			}
		}

		//修正高度,最小高度为500,因为顶部是25,所以为475
		docHeight = document.documentElement.clientHeight;
		if(docHeight < minHeight){
			$('.aside, .main-in').height(wrapHeight = minHeight - 35);
		}else{
			$('.aside, .main-in').height(wrapHeight = docHeight - 35);
		}

		//修正菜单高度
		$('.menu-wrap').height(wrapHeight - 120);
	}).resize();

	return {
		/**
		 * 加载菜单
		 * @return this
		 */
		loadMenu: function(){
			return this;
		},
		/**
		 * 在右侧加载url, 网速慢多次使用只会加载最后一个
		 * @param url String
		 * @param param Param
		 * @param fn Function 完成的回调
		 * @return 
		 */
		loadUrl: function(url, param, fn){
			var me = this, html,
				timeOk, reqOk;

			//处理url
			if(url.charAt(0) === '#'){
				url = url.substr(1);
			}

			me.beforeLoad();
			$('.main-in').html('加载中...');

			//清除以前的弹出层
			PM.clean();

			//每次都需要重新计时
			if(me.__timer){
				me.__timer.cancel();
			}
			me.__timer = S.later(function(){
				me.__timer = null;
				timeOk = true;
				insert();
			}, 500);

			//保证最后一个请求
			if(me.__req){
				me.__req.abort();
			}
			me.__req = $.post(url, param, function(rs){
				me.__req = null;
				html = rs;
				reqOk = true;
				insert();
			});

			function insert(){
				if(timeOk && reqOk){
					$('.main-in').html(html);
					fn && fn();
					me.afterLoad();

					//触发修正高度的操作
					$(window).resize();
				}
			}
			return this;
		},
		/**
		 * 设置menu的宽度
		 * @param 
		 * @return 
		 */
		menuWidth: function(width){
			$('.aside').width(width);
			$('.main').css('padding-left', width);
			return this;
		},
		/**
		 * 设置最大宽度
		 * @param width Int|'100%'
		 * @return this
		 */
		maxWidth: function(width){
			maxWidth = width;
			$('.main-wrap').css('max-width', width);
			$(window).resize();
			return this;
		},
		/**
		 * 设置最小宽度
		 * @param width Int
		 * @return this
		 */
		minWidth: function(width){
			minWidth = width;
			$('.main-wrap').css('min-width', width);
			$(window).resize();
			return this;
		},
		/**
		 * 设置最小高度
		 * @param height Int
		 * @return this
		 */
		minHeight: function(height){
			minHeight = height;
			$('.main-wrap').css('min-height', height);
			$(window).resize();
			return this;
		},
		/**
		 * 设置请求前的操作
		 * @param fn Function
		 * @return this
		 */
		beforeLoad: function(fn){
			fn ? $(this).on('onBeforeLoad', fn) : $(this).trigger('onBeforeLoad');
			return this;
		},
		/**
		 * 设置请求后的操作
		 * @param fn Function
		 * @return this
		 */
		afterLoad: function(fn){
			fn ? $(this).on('onAfterLoad', fn) : $(this).trigger('onAfterLoad');
			return this;
		}
	};
});

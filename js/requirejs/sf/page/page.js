/**
 * 
 */

define(['jquery', 'kissy', 'ui/pop-manager', 'css!./page'], function($, S, PM){
	return {
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

			//如果含#号取hash值
			if(url.indexOf('#') !== -1){
				url = url.match(/.*#(.*)/)[1];
			}

			//清除选择内容, 避免选中内容后切换导致加载出来是选中状态
			if($.browser.msie){
				document.selection.empty();
			}else{
				window.getSelection().removeAllRanges();
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
			}, 300);

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
			$('#menu-wrap').width(width);
			$('#main-in').parent().css('padding-left', width);
			return this;
		},
		/**
		 * 设置最大宽度
		 * @param width Int|'100%'
		 * @return this
		 */
		maxWidth: function(width){
			maxWidth = width;
			$('#main-wrap').css('max-width', width);
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
			$('#main-wrap').css('min-width', width);
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
			$('#main-wrap').css('min-height', height);
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

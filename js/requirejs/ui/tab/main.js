define(['./tab'], function(Tab){
	return {
		/**
		 * 从已有结构生成简单切换的tab
		 * @param 
		 * @return 
		 */
		init: function(target, var2, var3){
			if(!var2){
				return this.initWrap(target);
			}else{
				return this.initSpecial(target, var2, var3);
			}
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		initWrap: function(target){
			$(target).each(function(i, v){
				var tabs = $(v).children('ul.ui-tab-nav').children(),
					cons = $(v).children('div.ui-tab-con');

				tabs.click(function(e){
					$(this).addClass('ui-tab-hover').siblings().removeClass('ui-tab-hover');
					cons.hide().eq($(this).index()).show();
					$(window).resize();
				});
				
				//默认显示第一个
				tabs.eq(0).click();
			});
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		initSpecial: function(tabs, cons, method){
			if (!tabs || !cons) return false;
			method = method || 'mouseover';

			//注册切换事件
			tabs[method](function(e) {
				tabs.parent('.tab-nav-now').removeClass('tab-nav-now');
				cons.removeClass('tab-con-now').empty();

				var i = $(this).parent().index();
				$(this).parent().addClass('tab-nav-now');

				//对应异步加载内容
				var href = this.href.match(/.*#([^#]*)/)[1];
				if(href){
					cons.eq(i).addClass('tab-con-now').loadURL(href);
				}else{
					cons.eq(i).addClass('tab-con-now').html(objCodesJsFrame['JsFrame2104']);	//链接不对,无法获取内容!
				}
			});
			
		},
		/**
		 * 初始化异步tab
		 * @param 
		 * @return 
		 */
		ajax: function(){
			return new Tab();
		}
	};
});

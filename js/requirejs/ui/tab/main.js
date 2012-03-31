/**
 * 
 */

define(['./tab'], function(Tab){
	return {
		/**
		 * 从已有结构生成简单切换的tab
		 * @param 
		 * @return 
		 */
		init: function(target){
			var tabs = $(target).children('ul.ui-tab-nav').children(),
				cons = $(target).children('div.ui-tab-con');

			tabs.click(function(e){
				$(this).addClass('ui-tab-hover').siblings().removeClass('ui-tab-hover');
				cons.hide().eq($(this).index()).show();
			}).eq(0).click();
		},
		/**
		 * 异步tab
		 * @param 
		 * @return 
		 */
		ajax: function(){
			return new Tab();
		}
	};
});

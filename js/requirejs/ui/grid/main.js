/**
 * 
 */

define(['./grid', 'jquery'], function(Grid, $){
	//窗口变化时,修正tbody的高度
	$(window).resize(function(e){
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
	});

	return {
		/**
		 * 
		 */
		init: function(setting){
			return new Grid(setting);
		}
	};
});
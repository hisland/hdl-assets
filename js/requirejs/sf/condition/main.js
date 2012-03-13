/**
 * 
 */

define(['jquery', 'css!./condition'], function($){
	//窗口变化时,修正查询结果的高度
	$(window).resize(function(e){
		$('div.search-result').each(function(i, v){
			var me = $(this), height = me.parent().height();
			
			//去掉查询条件高度
			if($(this).prev().is(':visible')){
				height -= $(this).prev().outerHeight();
			}

			//避免每次都修改
			if(me.data('prev-height') !== height){
				me.height(height);
				me.data('prev-height', height);
			}
		});
	});

	return {};
});

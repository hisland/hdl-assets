/**
 * 
 */

define(['jquery', 'sf/page', 'jquery-plugin', 'css!./condition'], function($, Page){
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

	//查询按钮, 弹出层确定按钮 点击触发对应form的submit事件
	$('input.popwin-ok, input.search-condition-ok').live('click', function(){
		$(this).parent().prev().submit();
	});

	//页面加载完成注册提示信息
	Page.afterLoad(function(){
		$('input.text-fuzzy').mouseTip('模糊匹配');
	});

	return {};
});

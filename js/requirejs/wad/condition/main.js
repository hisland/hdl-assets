define(['jquery', '../page/page', 'jquery-plugin', 'css!./main', '../button/main'], function($, Page){
	//查询按钮, 弹出层确定按钮 点击触发对应form的submit事件
	$(document).on('click', 'a.search-button-submit', function(e){
		$(this).parent().prev().submit();
	});

	//页面加载完成注册提示信息
	Page.afterLoad(function(){
		$('input.text-fuzzy').mouseTip('模糊匹配');
	});

	return {};
});

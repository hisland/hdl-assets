define(['jquery', '../page/page', 'jquery-plugin', 'css!./main', 'ui/button/main'], function($, Page){
	//查询按钮, 弹出层确定按钮 点击触发对应form的submit事件
	$(document).on('click', 'a.search-button-submit', function(e){
		$(this).parent().prev().submit();
	});

	//代理输入框里面的回车提交
	$(document).on('keyup', '.search-condition :text', function(e){
		if(e.keyCode === 13){
			$(this).parents('.search-condition').find('.search-button-submit').click();
		}
	});

	//页面加载完成注册提示信息
	Page.afterLoad(function(){
		$('input.text-fuzzy').mouseTip(getText('模糊匹配'));
	});

	return {};
});

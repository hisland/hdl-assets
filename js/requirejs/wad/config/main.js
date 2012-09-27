define(['jquery', '../condition/main', 'css!./main'], function($){
	$(document).on('click', 'a.wadconfig-submit', function(e){
		$(this).parents('form').submit();
	});
	$(document).on('click', 'a.popwin-submit', function(e){
		$(this).parent().prev().submit();
	});

	//代理输入框里面的回车提交
	$(document).on('keyup', '.popwin-content :text, .popwin-content :password', function(e){
		if(e.keyCode === 13){
			$(this).parents('.popwin-content').find('.popwin-submit').click();
		}
	});

	//代理输入框里面的回车提交
	$(document).on('keyup', '.wadconfig-wrap :text, .wadconfig-wrap :password', function(e){
		if(e.keyCode === 13){
			$(this).parents('form').find('.wadconfig-submit').click();
		}
	});

	return {};
});

define(['jquery', '../condition/main', 'css!./main'], function($){
	$(document).on('click', 'a.wadconfig-submit', function(e){
		$(this).parents('form').submit();
	});
	$(document).on('click', 'a.popwin-submit', function(e){
		$(this).parent().prev().submit();
	});

	return {};
});

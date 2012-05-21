define(['jquery', '../condition/main', 'css!./main'], function($){
	//触发form的submit事件
	$(document).on('click', 'a.wadconfig-submit', function(e){
		$(this).parents('form').submit();
	});

	return {};
});

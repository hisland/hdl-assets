define(['jquery', '../condition/main', 'css!./main'], function($){
	//触发form的submit事件
	$(document).on('click', 'a.addconfig-submit', function(e){
		$(this).parent().prev().submit();
	});

	return {};
});

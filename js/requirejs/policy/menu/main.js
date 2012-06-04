define(['jquery', 'kissy', './menu'], function($, S, Menu){
	//代理菜单的折叠
	var menuOpend = true,
		opendMarginLeft = '201px',
		closedMarginLeft = '0';
	$(document).on('click', '#menu-toggle', function(){
		console.log(3);
		if(menuOpend){
			$('#menu-wrap').hide();
			$('#main').css('margin-left', closedMarginLeft);
		}else{
			$('#menu-wrap').show();
			$('#main').css('margin-left', opendMarginLeft);
		}
		menuOpend = !menuOpend;
	});

	return {
		init: function(){
			return new Menu();
		}
	};
});

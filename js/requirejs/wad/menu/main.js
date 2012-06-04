define(['jquery', 'kissy', './menu'], function($, S, Menu){
	//代理菜单的折叠
	var menuOpend = true,
		opendMarginLeft = '205px',
		closedMarginLeft = '4px';
	$(document).on('click', '#menu-toggle', function(){
		if(menuOpend){
			$('#menu-wrap').hide();
			$('#main').css('margin-left', closedMarginLeft);
		}else{
			$('#menu-wrap').show();
			$('#main').css('margin-left', opendMarginLeft);
		}
		$(this).toggleClass('menu-toggle-off', menuOpend);
		menuOpend = !menuOpend;
	});

	return {
		init: function(){
			return new Menu();
		}
	};
});

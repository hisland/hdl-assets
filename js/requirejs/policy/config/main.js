/**
 * 
 */

define(['jquery', 'css!./main'], function($){
	//代理折叠功能
	$('div.config-line-toggle').live('click', function(e){
		var icon = $(this).find('>span>span:first');
		//已经是展开的要折叠
		if(icon.is('.config-minus')){
			icon.attr('class', 'config-plus');
			$(this).next().hide();
		}else if(icon.is('.config-plus')){
			icon.attr('class', 'config-minus');
			$(this).next().show();
		}
	});

	return {};
});

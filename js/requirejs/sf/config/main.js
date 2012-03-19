/**
 * 
 */

define(['jquery', 'css!./config'], function($){
	//如果button一直保持在底部,需要动态计算高度
	$(window).resize(function(e){
		$('div.config-wrap').each(function(i, v){
			var me = $(this),
				height = me.parent().parent().height(),
				height_in = me.children('div:first').height();

			//去掉按钮区域高度及padding
			height -= $(this).next().outerHeight() + 10;

			//此情况需要高度自适应
			if(height_in < height){
				height = 'auto';
			}

			//避免每次都修改
			if(me.data('prev-height') !== height){
				me.height(height);
				me.data('prev-height', height);
			}
		});
	});


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

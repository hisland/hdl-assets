/**
 * 
 */
define(['jquery', 'kissy', 'ui/popwin', './compare'], function($, S, Popwin, Compare){
	return {
		init: function(setting){
			S.mix(setting, {
				title: '对比',
				url: 'post.php',
				param: 'id=1&id=2',
				width: 500,
				height: 400
			}, false);

			var comp = new Compare(),
				pop = Popwin.init();

			comp.$div.appendTo(pop.$content);
			comp.$mid.width((setting.width - 40) / 2);

			pop.setTitle(setting.title);
			pop.setWidth(setting.width);
			pop.setHeight(setting.height);
			comp.$div.height(setting.height);
			pop.hide_action = 'remove';

			$.getJSON(setting.url, setting.param, function(rs){
				comp.setData(rs);
				pop.loaded();
			});

			pop.show().loading();

			return comp;
		}
	};
});

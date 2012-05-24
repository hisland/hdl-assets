define(['jquery', 'kissy', 'ui/popwin'], function($, S, Popwin){
	return {
		/**
		 * 根据url获取一段html并放在popwin里面显示出来
		 * @param config Object
		 * config.url String
		 * config.data postData
		 * config.fn callback
		 * @return ui/popwin
		 */
		showPop: function(config){
			S.mix(config, {
				grid: null,
				url: null,
				data: null,
				title: null,
				callback: null
			}, false);
			
			var pop = Popwin.init();
			pop.hide_action = 'remove';
			
			pop.show().loading();
			$.post(config.url, config.data, function(rs){
				pop.setTitle(config.title);
				pop.$content.html(rs);
				
				pop.center();
				pop.loaded();
				
				var $form = pop.$content.find('form');
				$form.attr('action', config.form_url);
				$form.data('grid', config.grid);
				$form.data('pop', pop);
				
				config.callback && config.callback();
			});
			return pop;
		}
	};
});
define(['jquery', 'kissy', 'ui/popwin'], function($, S, Popwin){
	return {
		/**
		 * 根据url获取一段html并放在popwin里面显示出来
		 * @param config Object
		 * config.url String
		 * config.data postData
		 * config.doQuery true|false
		 * @return ui/popwin
		 */
		showPop: function(config){
			S.mix(config, {
				url: null,
				data: null,
				form_url: null,
				title: null,
				width: null,
				height: null,
				onHide: null,
				onShow: null
			}, false);
			
			var pop = Popwin.init();
			pop.hide_action = 'remove';
			
			pop.show().loading();
			$.post(config.url, config.data, function(rs){
				pop.setTitle(config.title);
				pop.$content.html(rs);
				
				pop.setSize(config.width, config.height);
				
				pop.loaded();
				pop.center();
				
				var $form = pop.$content.find('form');
				
				if (config.form_url) {
					$form.attr('action', config.form_url);
				}
				
				$form.on('callback', function(){
					pop.hide();
					config.onHide();
				});
				
				config.onShow && config.onShow();
			});
			return pop;
		}
	};
});
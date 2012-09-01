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
				//如果返回为约定的字符串, 表示出错, 进行提示
				var match = null;
				if(match = /^<script type="text\/javascript">window\.ajaxError\((?:['"](.*)['"])?\);<\/script>$/.exec(rs)){
					window.ajaxError(match[1]);
					pop.hide();
					return ;
				}else if(match = /^<script type="text\/javascript">window\.noRightsError\((?:['"](.*)['"])?\);<\/script>$/.exec(rs)){
					window.noRightsError(match[1]);
					pop.hide();
					return ;
				}

				pop.setTitle(config.title);
				pop.$content.html(rs);
				if(/*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent) && !/msie [78].0/i.test(navigator.userAgent)){
					if(pop.$content.children().eq(0).length){
						pop.$div.width(pop.$content.children().eq(0).outerWidth()+pop.$content.parent().outerWidth());
					}else{
						pop.$div.width(300);
					}
				}
				pop.center();
				pop.loaded();
				
				var $form = pop.$content.find('form');
				$form.attr('action', config.form_url);
				$form.data('grid', config.grid);
				$form.data('pop', pop);
				$form.data('fn', config.fn);

				$('select').moniSelect();
				
				config.callback && config.callback();
			});
			return pop;
		}
	};
});
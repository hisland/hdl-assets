define(['jquery', 'kissy'], function($, S){
	return {
		/**
		 * 底层post方法
		 * @param config Object
		 * config.form Selector
		 * config.grid Gridtru
		 * config.doQuery true|false
		 * @return ui/tip
		 */
		initQuery: function(config){
			S.mix(config, {
				form: null,
				grid: null,
				doQuery: false
			}, false);
			
			$(config.form).submit(function(e) {
				e.preventDefault();
				config.grid.setParam($(this).serializeArray());
				config.grid.ajaxLoad();
			});
			
			//需要对表格进行初始化
			if (config.doQuery) {
				$(config.form).submit();
			}
		},
		/**
		 * 底层post方法
		 * @param config Object
		 * config.form Selector
		 * config.grid Grid
		 * config.doQuery true|false
		 * @return ui/tip
		 */
		initValid: function(config){
			S.mix(config, {
				form: null,
				onSuccess: null,
				errorFocus: null
			}, false);
			
			var $form = $(config.form);
			var Common = this;

			$form.submit(function(e){
				e.preventDefault();
				
				Common.save({
					url : $form.attr('action'),
					data : $form.serializeArray(),
					callback : $form.data('callback')
				});
			});
		}
	};
});
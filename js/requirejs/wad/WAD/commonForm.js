define(['jquery', 'kissy'], function($, S){
	return {
		/**
		 * 底层post方法
		 * @param config Object
		 * config.url String
		 * config.param postData
		 * config.fn callback
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
		 * config.url String
		 * config.param postData
		 * config.fn callback
		 * @return ui/tip
		 */
		initValid: function(config){
			S.mix(config, {
				form: null,
				callback: null,
				errorFocus: null
			}, false);
			
			var $form = $(config.form);

			$form.submit(function(e){
				e.preventDefault();
				
				var url = $form.attr('action'),
					data = $form.serializeArray(),
					callback = $form.data('callback');
				
				WAD.save({
					url : url,
					data : data,
					callback : callback
				});
			});
		},
		/**
		 * 底层post方法
		 * @param config Object
		 * config.url String
		 * config.param postData
		 * config.fn callback
		 * @return ui/tip
		 */
		initSave: function(config){
			S.mix(config, {
				form: null
			}, false);
			
			var $form = $(config.form);

			$form.submit(function(e){
				e.preventDefault();
				
				var url = $form.attr('action'),
					data = $form.serializeArray(),
					callback = $form.data('callback');
				
				WAD.save({
					url : url,
					data : data,
					callback : callback
				});
			});
		}
	};
});
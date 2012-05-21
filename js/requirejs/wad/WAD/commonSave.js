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
		__save: function(config){
			$.post(config.url, config.data, function(rs){
				WAD.showMsgWithLevel(rs.messageText, rs.level);
				if (rs.level === 1) {
					config.onSuccess && config.onSuccess();
				} else {
					config.onFail && config.onFail();
				}
			}, 'json');
		},
		/**
		 * 添加修改的保存方法
		 * @param config Object
		 * config.url String
		 * config.param postData
		 * config.fn callback
		 * @return ui/tip
		 */
		save: function(config){
			return this.__save(config);
		},
		/**
		 * 公共删除方法
		 * @param config Object
		 * config.url String
		 * config.param postData
		 * config.fn callback
		 * @return ui/tip
		 */
		'delete': function(config){
			return this.__save(config);
		},
		/**
		 * 公共导出方法
		 * 此处由于require的原因,export需要加引号,否则ie会报错
		 * @param config Object
		 * config.url String
		 * config.param postData
		 * config.fn callback
		 * @return ui/tip
		 */
		'export': function(config){
			return this.__save(config);
		}
	};
});
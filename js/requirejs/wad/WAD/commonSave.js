define(['jquery', 'kissy', 'ui/tip'], function($, S, Tip){
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
			var mask = Tip.alert();
			mask.loading();
			$.post(config.url, config.data, function(rs){
				if (rs.level < 3) {
					config.onSuccess && config.onSuccess(rs);
				} else {
					config.onFail && config.onFail(rs);
				}
				WAD.showMsgWithLevel(rs.messageText, rs.level);
				mask.remove();
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
		}
	};
});
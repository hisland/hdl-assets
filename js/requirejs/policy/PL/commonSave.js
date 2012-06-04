define(['jquery', 'kissy', 'ui/tip'], function($, S, Tip){
	return {
		/**
		 * 底层post方法
		 * @param config Object
		 * config.url String
		 * config.data postData
		 * config.onSuccess Function
		 * @return ui/tip
		 */
		__save: function(config){
			var Common = this;
			
			S.mix(config, {
				url: null,
				data: null,
				onSuccess: null,
				onFail: null,
				onComplete: null
			}, false);
			
			var tip = Tip.alert().loading();
			$.post(config.url, config.data, function(rs){
				tip.remove();
				Common.showMsgWithLevel(rs.messageText, rs.messageLevel);

				if (rs.messageLevel === 1) {
					config.onSuccess && config.onSuccess(rs);
				} else {
					config.onFail && config.onFail(rs);
				}
				config.onComplete && config.onComplete(rs);
			}, 'json');
		},
		/**
		 * 添加修改的保存方法
		 * @param config Object
		 * config.url String
		 * config.data postData
		 * config.onSuccess Function
		 * @return ui/tip
		 */
		save: function(config){
			return this.__save(config);
		},
		/**
		 * 公共删除方法
		 * @param config Object
		 * config.url String
		 * config.data postData
		 * config.onSuccess Function
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
		 * config.data postData
		 * config.onSuccess Function
		 * @return ui/tip
		 */
		'export': function(config){
			return this.__save(config);
		}
	};
});
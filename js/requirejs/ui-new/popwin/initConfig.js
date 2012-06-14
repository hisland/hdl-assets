define(['jquery', 'kissy', 'ui/pop-manager', './msg'], function($, S, PM, MSG){
	/**
	 * @namespace
	 * @memberOf ui.Popwin
	 */
	var Config = {
		/**
		 * Popwin所在的popManager实例
		 * @type ui.popManager
		 */
		manager: null,
		/**
		 * Popwin可否关闭
		 * @private
		 * @type Boolean
		 */
		closeAble: true,
		/**
		 * 右上角x的作用是关闭还是移除
		 * @default hide
		 * @type String hide|remove
		 */
		hideAction: 'hide',
		/**
		 * 默认标题
		 * @type String
		 */
		title: MSG.title,
		/**
		 * 默认皮肤
		 * @default blue
		 * @type String blue|gray
		 */
		theme: 'blue'
	};

	return function(o, config){
		o.config = S.mix(config || {}, Config, false);
		//每个层单独一个manager
		o.config.manager = PM.init();
		return o;
	};
});
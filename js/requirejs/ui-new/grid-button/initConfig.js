define(['jquery', 'kissy', 'ui/pop-manager', './msg'], function($, S, PM, MSG){
	/**
	 * @namespace
	 * @memberOf ui.Popwin
	 */
	var Config = {
		/**
		 * 按钮点击事件
		 * @default $.noop
		 * @type Function
		 */
		click: $.noop,
		/**
		 * 按钮文字
		 * @type String
		 */
		text: MSG.text,
		/**
		 * 按钮点击
		 * @type ui.popManager
		 */
		icon: null,
		/**
		 * 按钮点击
		 * @type ui.popManager
		 */
		tip: null,
		/**
		 * 按钮点击
		 * @type ui.popManager
		 */
		enable: false
	};

	return function(o, config){
		o.config = S.mix(config || {}, Config, false);
		return o;
	};
});
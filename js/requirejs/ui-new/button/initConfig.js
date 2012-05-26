define(['jquery', 'kissy', 'ui/pop-manager', './msg'], function($, S, PM, MSG){
	/**
	 * @namespace
	 * @memberOf ui.Popwin
	 */
	var Config = {
		/**
		 * 按钮点击事件
		 * @default $.noop
		 * @type $.noop
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
		click: $.noop,
		/**
		 * 按钮点击
		 * @type ui.popManager
		 */
		click: $.noop,
		/**
		 * 按钮点击
		 * @type ui.popManager
		 */
		click: $.noop,
		/**
		 * 按钮点击
		 * @type ui.popManager
		 */
		click: $.noop
	};

	return function(o, config){
		o.config = S.mix(config || {}, Config, false);
		return o;
	};
});
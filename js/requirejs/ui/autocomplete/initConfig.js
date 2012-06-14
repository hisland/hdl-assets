define(['jquery', 'kissy', 'ui/pop-manager', 'util/delay-req', './msg'], function($, S, PM, DelayReq, MSG){
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
		url: null,
		data: null,
		varSearch: 'keyword',
		varPage: 'currPage',
		varPagePerNum: 'perPageNum',
		enablePager: true,
		delay: 100,
		preProcess: null,
		process: null,
		click: null
	};

	return function(o, config){
		o.config = S.mix(config || {}, Config, false);
		o.delayReq = DelayReq.init();
		return o;
	};
});
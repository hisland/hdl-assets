define(['jquery', 'kissy', 'ui/pop-manager', 'util/delayReq', './msg'], function($, S, PM, DelayReq, MSG){
	/**
	 * @namespace
	 * @memberOf ui.Popwin
	 */
	var Config = {
		/**
		 * 请求数据的url
		 * @type String
		 */
		url: null,
		/**
		 * 请求时带的额外参数
		 * @type PostData
		 */
		data: null,
		/**
		 * 请求时动态改变的searchString
		 * @type String
		 */
		varSearch: 'keyword',
		/**
		 * 分页的名字
		 * @type String
		 */
		varPage: 'currPage',
		/**
		 * 每页条数的名字
		 * @type String
		 */
		varPagePerNum: 'perPageNum',
		/**
		 * 是否使用分页
		 * @type Boolean
		 */
		enablePage: true,
		/**
		 * 发送请求的延迟
		 * @type Int
		 */
		delay: 300,
		/**
		 * 对响应结果进行预处理
		 * @type Function
		 */
		preProcess: null,
		/**
		 * 对单个结果进行处理, 返回要显示的字符串
		 * @type Function
		 */
		process: null,
		/**
		 * item点击事件
		 * @type Function
		 */
		click: null,
		/**
		 * 输入框内容改变时的事件
		 * @type Function
		 */
		change: null
	};

	return function(o, config){
		o.config = S.mix(config || {}, Config, false);
		o.data = {
			perPageNum: 15,
			currPage: 1,
			beginNum: 0,
			endNum: 0,
			totals: 0,
			currRecordNum: 0,
			allPage: 1,
			rows: null
		};
		o.delayReq = DelayReq.init();
		return o;
	};
});
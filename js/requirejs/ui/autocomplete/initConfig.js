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
		 * 判断是否是点击还是输入
		 * @type Boolean
		 */
		isClick : false,
		/**
		 * 对响应结果进行预处理
		 * @type Obejct
		 */
		tempSelector : "",
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
		 * 是否对process后的结果[不]进行匹配高度处理
		 * @type Boolean
		 */
		processNoMatch: false,
		/**
		 * item点击事件
		 * @type Function
		 */
		click: null,
		/**
		 * 使用内部输入框还是外部输入框
		 * @type Function
		 */
		isInnerSearch: false,
		/**
		 * 实例的显示宽度
		 * @type Int
		 */
		width: 400,
		/**
		 * 实例的显示高度
		 * @type Int
		 */
		height: 300,
		/**
		 * 内部框获取焦点时，是否清空
		 * @type Boolean
		 */
		focusClear: false,
		/**
		 * 点击清空按钮时执行的操作
		 * @type Function
		 */
		clear: null
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
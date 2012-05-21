/**
 * 结果格式
 * 
 * @namespace
 * @name Data
 * @memberOf ui.Grid
 */
define([ './msg' ], function(MSG) {
	/**
	 * @lends ui.Grid.Data#
	 */
	return {
		/**
		 * 每页条数
		 * 
		 * @type Int
		 * @default 15
		 */
		perPageNum : 15,
		/**
		 * 当前页
		 * 
		 * @type Int
		 * @default 1
		 */
		currPage : 1,
		/**
		 * 开始记录
		 * 
		 * @type Int
		 * @default 0
		 */
		beginNum : 0,
		/**
		 * 结束记录
		 * 
		 * @type Int
		 * @default 0
		 */
		endNum : 0,
		/**
		 * 总条数
		 * 
		 * @type Int
		 * @default 0
		 */
		totals : 0,
		/**
		 * 当前读取记录
		 * 
		 * @type Int
		 * @default 0
		 */
		currRecordNum : 0,
		/**
		 * 总页数
		 * 
		 * @type Int
		 * @default 0
		 */
		allPage : 0,
		/**
		 * 结果集
		 * 
		 * @type Array
		 */
		rows : []
	};
});

/**
 * 表格预设置信息
 * 
 * @namespace
 * @name Row
 * @memberOf ui.Grid
 */
define([ './msg' ], function(MSG) {
	/**
	 * @lends ui.Grid.Row#
	 */
	return {
		/**
		 * 可否修改
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_edit : false,
		/**
		 * 可否删除
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_delete : false,
		/**
		 * 可否选择
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_select : false
	};
});
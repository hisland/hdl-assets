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
		 * @default true
		 * @type Boolean
		 */
		enable_edit : true,
		/**
		 * 可否删除
		 * 
		 * @default true
		 * @type Boolean
		 */
		enable_delete : true,
		/**
		 * 可否选择
		 * 
		 * @default true
		 * @type Boolean
		 */
		enable_check : true
	};
});
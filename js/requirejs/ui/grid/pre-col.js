/**
 * 表格预设置信息
 * 
 * @namespace
 * @name Col
 * @memberOf ui.Grid
 */
define([ './msg' ], function(MSG) {
	/**
	 * @lends ui.Grid.Col#
	 */
	return {
		/**
		 * 显示名称
		 * 
		 * @type String
		 */
		display : MSG.col_display,
		/**
		 * 对应的键名
		 * 
		 * @type String
		 */
		name : '',
		/**
		 * 显示与否
		 * 
		 * @default false
		 * @type Boolean
		 */
		hide : false,
		/**
		 * 列宽度,数字或 百分比('50%')
		 * 
		 * @default 50
		 * @type String|Int
		 */
		width : '50',
		/**
		 * 内容体对齐方式
		 * 
		 * @default left
		 * @type String
		 */
		align : 'left',
		/**
		 * 表头对齐方式
		 * 
		 * @default center
		 * @type String
		 */
		align_head : 'center',
		/**
		 * 可否排序
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_sort : false,
		/**
		 * 可否隐藏
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_hide : false,
		/**
		 * 列单元格处理, function(row, col, grid){return 'text or jquery in cell';}
		 * 
		 * @default null
		 * @type Function|null
		 */
		process : null
	};
});
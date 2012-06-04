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
		 * 单元格最小宽度
		 * 
		 * @default 150
		 * @type Int
		 */
		min_width : 150,
		/**
		 * 单元格最小高度
		 * 
		 * @default 100
		 * @type Int
		 */
		min_height : 100,
		/**
		 * 单元格最大宽度
		 * 
		 * @default 450
		 * @type Int
		 */
		max_width : 450,
		/**
		 * 单元格最大高度
		 * 
		 * @default 300
		 * @type Int
		 */
		max_height : 300,
		/**
		 * 内容体对齐方式
		 * 
		 * @default center
		 * @type String
		 */
		align : 'center',
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
		 * 是否加上title属性,用于可能有长字符串的地方
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_title : false,
		/**
		 * 列单元格处理, function(row, col, grid){return 'text or jquery in cell';}
		 * 
		 * @default null
		 * @type Function|null
		 */
		process : null,
		/**
		 * 排除在表头外,对于操作列等动态生成内容的可设置为true
		 * 
		 * @default false
		 * @type Boolean
		 */
		excludeHead : false
	};
});

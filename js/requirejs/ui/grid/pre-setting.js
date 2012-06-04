/**
 * 表格预设置信息
 * 
 * @namespace
 * @name Setting
 * @memberOf ui.Grid
 */
define([ './msg' ], function(MSG) {
	/**
	 * @lends ui.Grid.Setting#
	 */
	return {
		/**
		 * 可否左侧的checkbox
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_checkbox : false,
		/**
		 * 可否列拖动
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_drag : false,
		/**
		 * 可否列排序
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_sort : false,
		/**
		 * 可否列切换显示
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_toggle : true,
		/**
		 * 可否改变列宽度
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_col_resize : false,
		/**
		 * 可否表头
		 * 
		 * @default true
		 * @type Boolean
		 */
		enable_title : true,
		/**
		 * 可否控制按钮
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_button : false,
		/**
		 * 显示弹出的详细信息
		 * 
		 * @default false
		 * @type Boolean
		 */
		enable_pop_detail : false,
		/**
		 * 表格宽度
		 * 
		 * @default 150
		 * @type Int
		 */
		width : 'auto',
		/**
		 * 表格高度
		 * 
		 * @default 100
		 * @type Int
		 */
		height : 300,
		/**
		 * 是否使用分页
		 * 
		 * @default true
		 * @type Boolean
		 */
		enable_page : true,
		/**
		 * 分页类型
		 * 
		 * @default 'default'
		 * @type 'default'|'google'
		 */
		pageTheme : 'default',
		/**
		 * [0]为[1]的索引, [1]为可选择的页数量值
		 * 
		 * @default undefined
		 * @type Array
		 */
		num_per_page : [ 2, [ 5, 10, 15, 20 ] ],
		/**
		 * 可选的每页条数
		 * 
		 * @default [ 5, 10, 15, 20 ]
		 * @type Array
		 */
		perPageNums : [ 5, 10, 15, 20 ],
		/**
		 * 获取数据的地址
		 * 
		 * @default ''
		 * @type String|''
		 */
		url : '',
		/**
		 * 传递的额外参数, 可为函数, 函数命名空间[暂不支持]
		 * 
		 * @default undefined
		 * @type Array|undefined
		 */
		param : '',
		/**
		 * 自动加载
		 * 
		 * @default false
		 * @type Boolean
		 */
		auto_load : false,
		/**
		 * 文本强制在一行
		 * 
		 * @default true
		 * @type Boolean
		 */
		nowrap : true,
		/**
		 * 单行选中checkbox, 无全选checkbox
		 * 
		 * @default false
		 * @type Boolean
		 */
		single_check : false,
		/**
		 * 无数据时显示的内容
		 * 
		 * @type String
		 */
		msg_empty : MSG.empty,
		/**
		 * 加载时显示的内容
		 * 
		 * @type String
		 */
		msg_proc : MSG.proc,
		/**
		 * 间隔背景色设置
		 * 
		 * @default [ '#fff', '#f3f3f3' ]
		 * @type Array
		 */
		row_bgs : [ '#fff', '#f3f3f3' ],
		/**
		 * 选中行的背景色
		 * 
		 * @default '#d7dce3'
		 * @type String
		 */
		select_bg : '#d7dce3',
		/**
		 * 对响应结果进行预处理 function(rs){}
		 * 
		 * @default null
		 * @type Function|null
		 */
		preProcess : null,
		/**
		 * 自动调整高度适应包含块
		 * 
		 * @default true
		 * @type Boolean
		 */
		auto_resize : true
	};
});

/**
 * 异步pager的默认设置
 * 
 * @namespace
 * @name Setting
 * @memberOf ui.PagerAjax
 */
define([], function() {
	/**
	 * @lends ui.PagerAjax.Setting#
	 */
	return {
		perPageNum : 15,
		currPage : 1,
		beginNum : 0,
		endNum : 0,
		totals : 0,
		allPage : 1
	};
});

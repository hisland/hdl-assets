/**********************************************************************************************
 * 名称: 浏览器滚动条的宽度
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * 保存在window.SCROLL_BAR_WIDTH全局变量上
 *
 */
KISSY.add('scrollBarWidth', function(S, undef) {
	var div = $('<div style="visibility:hidden;position:absolute;overflow:scroll;width:50px;"></div>');
	div.appendTo('body');
	window.SCROLL_BAR_WIDTH = 50 - div[0].clientWidth;
	div.remove();
}, {
	requires: ['jquery-1.4.2']
});

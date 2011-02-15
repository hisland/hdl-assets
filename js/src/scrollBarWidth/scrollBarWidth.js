/**********************************************************************************************
 * 浏览器滚动条的宽度
 * 保存在window.SCROLL_BAR_WIDTH全局变量上
 * 
 * Time: @TIMESTAMP@
 */
$(function(){
	var div = $('<div style="visibility:hidden;position:absolute;overflow:scroll;width:50px;"></div>');
	div.appendTo('body');
	window.SCROLL_BAR_WIDTH = 50 - div[0].clientWidth;
	div.remove();
});
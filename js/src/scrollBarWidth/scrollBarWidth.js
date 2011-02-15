/**********************************************************************************************
 * 计算浏览器滚动条的宽度
 * 2011-2-11 17:39:11
 */
$(function(){
	var div = $('<div></div>');
	div.width(50).css({'visibility':'hidden', 'position':'absolute', 'overflow':'scroll'}).appendTo('body');
	window.SCROLL_BAR_WIDTH = 50 - div[0].clientWidth;
	div.remove();
});
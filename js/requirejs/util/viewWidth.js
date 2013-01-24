define(['jquery'], function($){

var div = $('<div class="check-view-length-hole" style="visibility:hidden;position:absolute;top:-20px;left:0;"></div>');
$(function(){
	div.appendTo('body');
});

return {
	/**
	 * 返回一个字符串的可见宽度
	 * @param str String
	 * @return Int
	 */
	viewWidth: function(str){
		str = div.html(str).width();
		div.empty();
		return str;
	}
};
});

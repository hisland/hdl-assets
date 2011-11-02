/**********************************************************************************************
 * 名称: ie6专用脚本
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * ie6的一些公共修改,让其更好用
 *
 */

KISSY.add('ie6', function(S, undef) {
	/* IE6 BackgroundImageCache */
	document.execCommand('BackgroundImageCache', false, true);

	//针对ie6加一层使修改[':text, :password, textarea']的[disabled,readonly]属性时更换class
	var oldAttr = $.fn.attr;
	var ie6_readonly = 'readonly';
	var ie6_disabled = 'disabled';
	$.fn.attr = function( name, value ) {
		//设置值的时候再进行操作
		if(arguments.length == 2){
			var ipts = this.filter(':text, :password, textarea');
			if (name == 'disabled') {
				if (value) {
					ipts.removeClass(ie6_readonly).addClass(ie6_disabled);
				} else {
					ipts.removeClass(ie6_disabled);
				}
			}else if (name == 'readonly') {
				if (value) {
					ipts.removeClass(ie6_disabled).addClass(ie6_readonly);
				} else {
					ipts.removeClass(ie6_readonly);
				}
			}
		}
		return oldAttr.call(this, name, value);
	};
}, {
	requires: ['jquery-1.4.2']
});

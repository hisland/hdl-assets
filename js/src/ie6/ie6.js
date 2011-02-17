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
});

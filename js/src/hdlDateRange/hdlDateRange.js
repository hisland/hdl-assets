/**********************************************************************************************
 * 日期范围控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-6-22 14:56:49
 * 版本: v4
 *
 * 前置脚本:
 *			../patch.javascript.js;
 *			../jquery-1.4.2.min.js
 *			../jquery.mousewheel.js;
 *			../hdlDateTool/jquery.hdlDateTool.js;
 */
(function($){
/**********************************************************************************************
*已经有了此函数则不用重复注册了
*/
	if($.fn.hdlDateRange){
		return false;
	}
	
/**********************************************************************************************
*代码正文
*/
	var pre_setting   = {
						
						//此参数形式为:
						//年 月 日 时 分 秒 毫秒对应下面
						//y  m  d  h  mi  s  ms
						//范围设置如 15y == 15年
						// 10d == 10天...
						range:'1y' //两个输入框相差1年
						input1:{
								 selector:''
								,setting:{
										
										}
								}
						input2:
						};

	function hdlDateRange(inputA, inputB, range){
		
	}
	function hdlDateRange(setting){
		
	}
/**********************************************************************************************
*注册到jq原型上
*/
	$.fn.hdlDateRange = hdlDateRange;
})(jQuery);
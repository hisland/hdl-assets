/**********************************************************************************************
 * 名称: 表单验证控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-18 9:15:24
 * 版本: v1
 *
 */

KISSY.add('hdlValidator', function(S, undef) {
	var $ = jQuery;

/**********************************************************************************************
 * 代码正文
 *
 * 事件:
 * 		focus	显示验证信息
 * 		keydown	控制输入
 * 		keyup	更正内容
 * 		change	检测
 * 属性:
 * 		maxlength	最大长度
 * 		minlength	最小长度
 * 		min/max		最小/最大值 - 表示此只能输入数字 同时指定一个step属性,否则默认增量为1
 * 		step		值的递增步长
 * 		pattern		输入内容需要匹配的模式
 * 		required	此项必填
 * 验证情况:
 * 		valiFunc	函数验证
 * 		valiReg		正则验证
 * 		valiNormal	一般验证
 * 
 */
	function hdlValidator(selector){
		var ipts = $(selector).find('input, select, textarea');
		ipts.each(function(idx, elm){
			if(this.type == 'input'){
				
			}else if(this.type == 'checkbox'){
				
			}

			if($(this).attr('required') != undefined){
				
			}

			if($(this).attr('min') != undefined){
				
			}
			if($(this).attr('max') != undefined){
				
			}
		})
	}

	$.fn.hdlValidator = hdlValidator;
}, {
	requires: ['jquery-1.4.2', 'hdlReg', 'hdlTest']
});

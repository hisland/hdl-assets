/**********************************************************************************************
 * 表单验证控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-9-8 14:24:27
 * 版本: v1
 *
 * 前置脚本:
 *			../patch.javascript.js;
 *			../jquery-1.4.2.min.js
 * 使用方法:
 *			$('input').hdlValidator();
 *			$('form').hdlValidator(submit);
 */
(function($){
/**********************************************************************************************
*已经有了此函数则不用重复注册了
*/
	if($.fn.hdlValidator){
		return false;
	}

/**********************************************************************************************
*代码正文
*/
/*
事件:
	focus	显示验证信息
	keydown	控制输入
	keyup	更正内容
	change	检测
属性:
	maxlength	最大长度
	minlength	最小长度
	min/max		最小/最大值 - 表示此只能输入数字 同时指定一个step属性,否则默认增量为1
	step		值的递增步长
	pattern		输入内容需要匹配的模式
	required	此项必填
验证情况:
	valiFunc	函数验证
	valiReg		正则验证
	valiNormal	一般验证

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

	hdlReg = {
		'regName1':{
			pattern: /regPattern/
			,desc: '此模式说明'
		}
	};

/**********************************************************************************************
*注册到jq原型上
*/
	$.fn.hdlValidator = hdlValidator;
})(jQuery);
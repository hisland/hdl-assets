/**********************************************************************************************
 * 名称: jQuery元素对齐某元素
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-17 15:7:59
 * 版本: v2
 *
 * callback第1个参数为对齐的元素
 * 仅在窗口中对齐,不设置在一个小范围内对齐
 *
 * 使用方法:
 *			$('').adjustElement(target);
 *			$('').adjustElement(target, callback);
 */

KISSY.add('adjustElement', function(S, undef) {
	var $ = jQuery;

	function adjustElement(target, callback){
		var elm = this.eq(0);
		target = $(target);

		if(!target.length || $.isFunction(target)){
			alert('adjustElement: 必须有个 target');
			return elm;
		}

		var  me_width = elm.outerWidth()
			,me_height = elm.outerHeight()

			,t_width = target.outerWidth()
			,t_height = target.outerHeight()
			,t_offset = target.offset()

			,p_width = document.documentElement.clientWidth
			,p_height = document.documentElement.clientHeight;

		//设置水平位置
		if(me_width + t_offset.left > p_width){
			elm.css('left', p_width - me_width - 5)//窗口右边线对齐
		}else{
			elm.css('left', t_offset.left);//target左对齐
		}

		//设置垂直位置
		if(me_height + t_offset.top > p_height){
			elm.css('top', t_offset.top - me_height -1)//target顶边对齐
		}else{
			elm.css('top', t_offset.top + t_height + 1);//target底边对齐
		}

		//有回调的回调
		if($.isFunction(target)){
			callback(elm);
		}

		return elm;
	}

	//注册到jq原型上
	$.fn.adjustElement = adjustElement;
}, {
	requires: ['jquery-1.4.2']
});

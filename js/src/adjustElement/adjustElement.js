/**********************************************************************************************
 * 对齐元素
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-8-26 16:8:5
 * 版本: v2
 *
 * 前置脚本:
 *			jquery-1.4.2.min.js;
 *
 * 参数说明:
 *			target: 相对此对齐
 *			callback: 对齐后的回调
 *			parent: 在此范围内对齐
 * 返 回 值:
 *			this.eq(0);
 *
 * 使用方法:
 *			$('').adjustElement(target);
 *			$('').adjustElement(target, parent);
 *			$('').adjustElement(target, callback);
 *			$('').adjustElement(target, parent, callback);
 */

(function($){
	//已经有了此函数则不用重复注册了
	if($.fn.adjustElement){
		return false;
	}

	function adjustElement(target, parent, callback){
		//检测第1个参数
		if(!target){
			alert('adjustElement: 必须有个 target');
			throw 'adjustElement: 必须有个 target';
		}
		//检测第1个参数是否为空
		target = $(target);
		if(!target.length){
			alert('adjustElement: target为空');
			throw 'adjustElement: target为空';
		}

		//修正第2个参数
		if(!parent){
			parent = document.documentElement;
		}else if(typeof parent == 'function'){
			callback = parent;
			parent = document.documentElement;
		}

		//检测第2个参数是否正确
		if(!$(parent).length){
			alert('adjustElement: parent没有选择任何元素');
			throw 'adjustElement: parent没有选择任何元素';
		}

		//首先要让其有尺寸和offsetParent,但是又不应该看见
		this.eq(0).css('visibility','hidden').show();

		var me_width = this.eq(0).outerWidth();
		var me_height = this.eq(0).outerHeight();

		var me_p_offset = {left:0, top:0};
		var me_p_width = document.documentElement.clientWidth;
		var me_p_height = document.documentElement.clientHeight;

		var t_width = target.outerWidth();
		var t_height = target.outerHeight();
		var t_offset = target.offset();

		var p_width = $(parent).outerWidth();
		var p_height = $(parent).outerHeight();

		//修正上级为html元素的时候的jq计算问题
		if(parent == document.documentElement){
			p_width = parent.clientWidth;
			p_height = parent.clientHeight;
		}

		if(!/body|html/i.test(this[0].offsetParent.tagName)){
			me_p_offset = $(this[0].offsetParent).offset();
			me_p_width = $(this[0].offsetParent).outerWidth();
			me_p_height = $(this[0].offsetParent).outerHeight();
		}

		//设置水平位置
		if(me_width + t_offset.left > p_width){
			this[0].style.left = 'auto';
			this[0].style.right = me_p_offset.left + me_p_width - t_offset.left - t_width + 'px';//右对齐 - p_width - t_offset.left - t_width - (p_width - me_p_offset.left - me_p_width)
		}else{
			this[0].style.right = 'auto';
			this[0].style.left = t_offset.left - me_p_offset.left + 'px';//左对齐
		}

		//设置垂直位置
		if(me_height + t_offset.top > p_height){
			this[0].style.top = 'auto';
			this[0].style.bottom = me_p_offset.top + me_p_height - t_offset.top +1 + 'px';//target顶边对齐 - p_height - t_offset.top - (p_height - me_p_offset.top - me_p_height)
		}else{
			this[0].style.bottom = 'auto';
			this[0].style.top = t_offset.top + t_height - me_p_offset.top + 1 + 'px';//target底边对齐
		}

		this.eq(0).hide().css('visibility','visible');

		//有回调的回调
		if(typeof callback == 'function'){
			callback();
		}

		//传递jq对象
		return this.eq(0);
	}

	//注册到jq原型上
	$.fn.adjustElement = adjustElement;
})(jQuery);

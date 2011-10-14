/**********************************************************************************************
 * 名称: 异步tab切换
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-09-11 10:28:58
 * 版本: v1
 * 
 * API:
 *		$.ajaxTab('#ajax-wrap') //初始化
 *		$.ajaxTab('#ajax-wrap', fn-callback) //初始化并在每次切换时回调
 *		$.ajaxTab('#ajax-wrap', 'mouseover') //初始化,触发事件为mouseover
 *		$.ajaxTab('#ajax-wrap', 'mouseover', fn-callback) //初始化,触发事件为mouseover,并在每次切换时回调
 * 
 */

KISSY.add('ajax-tab', function(S, undef) {
	var $ = jQuery;

	function void0(e) {
		this.blur();
		e.preventDefault();
	}

	//TAB切换初始化
	//如需改变切换方式,请传第3个参数 'click'或者其它jquery支持的方法,,默认是click
	function ajaxTab(selector, method, fn) {
		var wrap = $(selector);
		if (!wrap.is('.ajax-tab')){
			S.log('$.ajaxTab: selector must can select .ajax-tab class!');
			return false;
		}

		if(S.isFunction(method)){
			fn = method;
			method = 'click';
		}else{
			method = method || 'click';
		}

		var tabs = wrap.find('>ul>li>a'), content = wrap.find('>div');

		//点击取消默认事件
		tabs.click(void0);

		//注册切换事件
		tabs[method](function(e) {
			var me = $(this);
			content.load(this.href, function(){
				me.parent().addClass('hover').siblings('.hover').removeClass('hover');
				S.isFunction(fn) && fn();
			});
		});

		return this;
	}

	$.extend({
		ajaxTab: ajaxTab
	});
}, {
	requires: ['jquery-1.6.2']
});
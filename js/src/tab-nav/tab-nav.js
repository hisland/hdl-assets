/**********************************************************************************************
 * 名称: tab切换
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-5-18 9:51:11
 * 版本: v1
 *
 */

KISSY.add('tab-nav', function(S, undef) {
	var $ = jQuery;

	function void0(e) {
		this.blur();
		e.preventDefault();
	}

	//TAB切换初始化
	//如需改变切换方式,请传第3个参数 'click'或者其它jquery支持的方法,,默认是mouseover
	function initTabs(tabs, cons, method) {
		if (!tabs || !cons) return false;
		method = method || 'mouseover';

		//点击取消默认事件
		tabs.click(void0);

		//注册切换事件
		tabs[method](function(e) {
			tabs.parent('.tab-nav-now').removeClass('tab-nav-now');
			cons.removeClass('tab-con-now').empty();
			var i = $(this).parent().index();
			$(this).parent().addClass('tab-nav-now');

			//对应异步加载内容
			var href = this.href.match(/.*#([^#]*)/)[1];
			if(href){
				cons.eq(i).addClass('tab-con-now').loadURL(href);
			}else{
				cons.eq(i).addClass('tab-con-now').html(objCodesJsFrame['JsFrame2104']);	//链接不对,无法获取内容!
			}
		});

		//初始化后触发resize,否则因css没加载好tab-nav的高度不正确
		resizeFuncs();

		//触发第1个的事件,加载内容
		tabs.eq(0)[method]();
	}

	$.extend({
		initTabs: initTabs
	});
}, {
	requires: ['jquery-1.4.2']
});
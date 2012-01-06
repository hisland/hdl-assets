/**
 * @fileOverview
 * @module popTip
 * @author hisland hisland@qq.com
 * @description 弹出提示,带方向箭头
 * <pre><code>
 * API:
 *		var o = $.popTip();
 *		o.content 是弹出层的内容块
 *		o.div 是整个弹出层的外层
 *		o.manager 是弹出层管理对象
 * </code></pre>
 */

KISSY.add('popTip', function(S, undef) {
	var $ = jQuery, ie = /*@cc_on!@*/!1, html;

	if(ie){
		html = '<div class="hm-tip1-wrap"><div class="hm-tip1-h"><div class="hm-tip1-h2"><div class="hm-tip1-h3"></div></div></div><div class="hm-tip1-c"></div><div class="hm-tip1-b"><div class="hm-tip1-b2"><div class="hm-tip1-b3"></div></div></div><div class="hm-tip1-arr-b"></div></div>';
	}else{
		html = '<div class="hm-tip2-wrap"><div class="hm-tip2-c"></div><div class="hm-tip2-arr-b"></div></div>';
	}

	function popTip(){
		var o = {};
		o.div = $(html);
		o.div.appendTo('body');
		return o;
	}

	$.popTip = popTip;
}, {
	requires: ['jquery-1.4.2', 'popManager']
});

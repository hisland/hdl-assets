/**
 * @fileOverview
 * @module jquery.input
 * @author hisland hisland@qq.com
 * @description 输入框内容变化时触发的事件
 * <pre><code>
 * NOTICE:
 *		由于输入框文本改变方式有多种(键盘输入,右键操作...)
 *		IE使用propertychange事件
 *		FF使用input事件
 * 
 *		IE使用 this.onpropertychange = fn 形式
 * 
 * API:
 *		$(':text').bind('input', fn);	//绑定一个输入事件
 *		$(':text').input(fn);	//绑定一个输入事件
 *		$(':text').unbind('input', fn);	//取消绑定一个输入事件
 *		$(':text').unbind('input');	//取消绑定所有输入事件
 * </code></pre>
 */

KISSY.add('jquery.input', function(S, undef) {
	function handler(e) {
		e = e || window.event;

		//原生支持input事件的直接触发
		if(e.type === 'input'){
			e = $.event.fix(e);
			$.event.handle.apply(this, [e]);
		}
		//IE使用propertychange,检测change的为value才初始化并触发,不能先fix,因为会去掉propertyName属性
		else if(e.propertyName === 'value'){
			e = $.event.fix(e);
			e.type = 'input';
			e.propertyName = 'value';
			$.event.handle.apply(this, [e]);
		}
	}

	$.event.special.input = {
		setup: function() {
			if(this.addEventListener){
				this.addEventListener('input', handler, false);
			}else if(this.attachEvent){
				this.onpropertychange = handler;
			}
		},
		
		teardown: function() {
			if (this.removeEventListener){
				this.removeEventListener('input', handler, false);
			}else if(this.detachEvent){
				this.onpropertychange = null;
			}
		}
	};

	$.fn.extend({
		input: function(fn) {
			return fn ? this.bind("input", fn) : this.trigger("input");
		}
	});
}, {
	requires: ['jquery-1.4.2']
});
/**********************************************************************************************
 * ����: ��������ݱ仯ʱ�������¼�
 * ����: hisland
 * �ʼ�: hisland@qq.com
 * ʱ��: @TIMESTAMP@
 * �汾: @VERSION@
 * 
 * NOTICE:
 *		����������ı��ı䷽ʽ�ж���(��������,�Ҽ�����...)
 *		IEʹ��propertychange�¼�
 *		FFʹ��input�¼�
 * 
 * API:
 *		$(':text').bind('input', fn);
 * 
 */

KISSY.add('jquery.input', function(S, undef) {
	var types = ['input', 'propertychange'];

	function handler(e) {
		return $.event.handle.apply(this, e);
	}

	$.event.special.input = {
		setup: function() {
			if(this.addEventListener){
				target.addEventListener('input', handler, false);
			}else if(this.attachEvent){
				this.attachEvent('onpropertychange', handler);
			}else{
				var oldfunc = this.onpropertychange;
				target.onpropertychange = S.isFunction(oldfunc) ? function(){
					oldfunc(event);
					handler(event);
				} : handler;
			}
		},
		
		teardown: function() {
			if (this.removeEventListener){
				target.removeEventListener('input', handler, false);
			}else if(this.detachEvent){
				this.detachEvent('onpropertychange', handler);
			}else{
				this.onpropertychange = null;
			}
		}
	};

	$.fn.extend({
		input: function(fn) {
			return fn ? this.bind("input", fn) : this.trigger("input");
		},
		
		uninput: function(fn) {
			return this.unbind("input", fn);
		}
	});
}, {
	requires: ['jquery-1.4.2']
});
define(['kissy'], function(S){
	var msg = {
		ok: '确定'
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.popwin.' + i];
		});
	}

	return msg;
});
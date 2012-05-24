define(['kissy'], function(S){
	var msg = {
		alert: '提示',
		error: '错误',
		notice: '警告',
		confirm: '确认',
		defalt: '未设置信息',
		ok: '确定',
		cancel: '取消'
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.tip.' + i];
		});
	}

	return msg;
});
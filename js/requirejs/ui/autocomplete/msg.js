define(['kissy'], function(S){
	var msg = {
		loading: '加载中...',
		pagePrev: '上一页',
		pageNext: '下一页'
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.autocomplete.' + i];
		});
	}

	return msg;
});
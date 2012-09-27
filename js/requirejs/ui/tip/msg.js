define(['kissy'], function(S){
	var msg = {
		alert: getText('提示'),
		error: getText('错误'),
		notice: getText('警告'),
		confirm: getText('确认'),
		defalt: getText('未设置信息'),
		ok: getText('确定'),
		cancel: getText('取消')
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.tip.' + i];
		});
	}

	return msg;
});
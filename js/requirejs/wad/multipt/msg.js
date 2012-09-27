define(['kissy'], function(S){
	var msg = {
		alert_dataerror: getText('后台返回的IP数据已经超过最大限制{maxsize}个,请查看数据或配置是否正确')
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.popwin.' + i];
		});
	}

	return msg;
});
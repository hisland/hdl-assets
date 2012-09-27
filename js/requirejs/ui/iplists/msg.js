define(['kissy'], function(S){
	var msg = {
		alert_iprepeat: getText('IP地址已存在'),
		alert_iperror: getText('IP地址格式错误'),
		alert_ipnull: getText('IP地址不能为空'),
		alert_maxsize: getText('IP地址超过最大数{maxsize}个'),
		alert_dataerror: getText('后台查询返回的IP地址数已经超过最大限制{maxsize}个,请查看数据或设置是否正确')
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.popwin.' + i];
		});
	}

	return msg;
});
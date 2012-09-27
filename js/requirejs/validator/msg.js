define(['kissy'], function(S){
	var msg = {
		group: {
			len: getText('字符长度为{from}-{to}, 现在长度{len}'),
			utf8len: getText('字节(utf8)长度为{from}-{to}, 现在长度{len}'),
			intRange: getText('整数值为{from}-{to}'),
			numberRange: getText('数字值为{from}-{to}, {digit}位小数'),
			reg: getText('请设置此正则的描述'),
			fn: getText('请设置此函数的描述'),
			required: getText('此项必填')
		}
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg.group, function(v, i, o){
			o[i] = JS_I18N['js.validator.group.' + i];
		});
	}

	return msg;
});
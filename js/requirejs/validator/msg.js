define(['kissy'], function(S){
	var msg = {
		group: {
			len: '字符长度为{from}-{to}, 现在长度{len}',
			utf8len: '字节(utf8)长度为{from}-{to}, 现在长度{len}',
			intRange: '整数值为{from}-{to}',
			numberRange: '数字值为{from}-{to}, {digit}位小数',
			reg: '请设置此正则的描述',
			fn: '请设置此函数的描述',
			required: '此项必填'
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
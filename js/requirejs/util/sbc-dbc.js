define({
/**
 * 全角转半角(Single-Byte Character)
 */
toSBC: function(str){
	var c, tmp = [], i = 0, len = str.length, m = String.fromCharCode;
	for( ;i<len ;i++){
		c = str.charCodeAt(i);
		//空格需要特殊处理
		if(c === 12288){
			tmp.push(m(32));
		}else if(c > 65280 && c < 65375){
			tmp.push(m(c-65248));
		}else{
			tmp.push(str[i]);
		}
	}
	return tmp.join('');
},
/**
 * 半角转全角(Double-Byte Character)
 */
toDBC: function(str){
	var c, tmp = [], i = 0, len = str.length, m = String.fromCharCode;
	for( ;i<len ;i++){
		c = str.charCodeAt(i);
		//空格需要特殊处理
		if(c === 32){
			tmp.push(m(12288));
		}else if(c > 32 && c < 127){
			tmp.push(m(c+65248));
		}else{
			tmp.push(str[i]);
		}
	}
	return tmp.join('');
}
});
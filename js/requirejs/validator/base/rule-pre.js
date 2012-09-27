define(['./rule', 'kissy'], function(Rule, S){

	// 默认正则都可为空,不能为空请加上must规则
	Rule.add('must', /^.+$/, getText('此项必填'));

	// IPv4验证
	Rule.add(
		'ipv4',
		/^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[1-9])$/,
		getText('IPv4,点分十进制共四位,每个数字不能超过255')
	);
	Rule.add(
		'ipv4-prefix0',
		/^(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d\d|[1-9])$/,
		getText('IPv4,点分十进制,共四位,每个数字不能超过255,可有前置0')
	);
	Rule.add('log-path', function(str){
		if(str!=''){
			if(str.indexOf(':')==-1){ // linux
				var reg=/^[\w\\\/\.\-]+$/;
				if(reg.test(str)){
					return true;
				}else{
					return false;	
				}
			}else{ // windows
				var reg=/^(\w:){1}[\w\\\/\.\-]+$/;
				if(reg.test(str)){
					return true;
				}else{
					return false;	
				}
			}
		}else{
			return false;
		}
	}, getText('路径只能包含数字、字母、下划线,/和\\'));
	// Rule.add('log-path', /^((\w:){1}[\w\\\/\.\-]+)|(^[\w\\\/\.\-]+)$/,
	// '路径只能包含数字、字母、下划线,/和\\');

	
	// 字母验证
	Rule.add('letter', /^[a-z]+$/i, getText('字母,忽略大小写'));
	Rule.add('letter-lower', /^[a-z]+$/, getText('小写字母'));
	Rule.add('letter-upper', /^[A-Z]+$/, getText('大写字母'));

	
	// 数字验证
	Rule.add('only-number', /^\d+$/, getText('只能是纯数字'));

	Rule.add('integer', /^-?\d+$/, getText('整数(含正负)'));
	Rule.add('integer-positive', /^[1-9]\d*$/, getText('正整数'));
	Rule.add('0-and-integer-positive', /^(\d|[1-9]\d+)$/, getText('0和正整数'));
	Rule.add('integer-negative', /^-[1-9]\d*$/, getText('负整数'));
		
	Rule.add('decimal', /^-?\d+\.\d+$/, getText('小数(含正负)'));
	Rule.add('decimal-positive', /^\d+\.\d+$/, getText('正小数'));
	Rule.add('decimal-negative', /^-\d+\.\d+$/, getText('负小数'));
		
	Rule.add('number', /^-?\d+(?:\.\d+)?$/, getText('数字(含正负)'));
	Rule.add('number-positive', /^\d+(?:\.\d+)?$/, getText('正数字'));
	Rule.add('number-negative', /^-\d+(?:\.\d+)?$/, getText('负数字'));

	
	Rule.add('hex', /^[0-9a-f]{6}$/, getText('16进制数, 0-9A-E不区分大小写'));

	
	Rule.add('no-enter', /[\r\n]/, getText('不能包含回车换行符'), true);
	Rule.add('no-blank', / /, getText('不能包含空格'), true);
	Rule.add('no-quotes', /['"]/, getText('不能包含单引号和双引号'), true);
	Rule.add('no-pre-suf-blank', /^[\s\u3000]|[\s\u3000]$/, getText('不能包含前后空格'), true);

	
	Rule.add('lang-zh', /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/, getText('仅限中文'));
	Rule.add('number-letter', /^[0-9A-Za-z]+$/, getText('数字或字母'));

	
	Rule.add('money', /^[1-9]\d{,7}(\.\d{1,2})?$/, getText('余额整数部分8位,最多2位小数,不可为负数'));

	Rule.add('file-path', /^[\w\\\/]+$/, getText('路径只能包含数字、字母、下划线,/和\\'));
	Rule.add('no-2more-slash', /[\/\\]{2,}/, getText('不能包含连续两个或以上的\\或/字符'), true);

	
	Rule.add('operator-loc', /^[&|]|[&|]{2,}|[&|]$/, getText('操作符不能放在开头、结尾、不能存在两个连续操作符'), true);
	Rule.add('parenthese-match', /^(?=[^()]+$)|^(?=[^()]*\([^()]*\)[^()]*$)/, getText('括号必须配对,并且最多只能含有一对括号'));
	Rule.add('operator-content', /\((?![^|&]*([|&][^|&]+)*\))/, getText('括号内含有操作符时,操作符左右必需有内容'), true);

	
	Rule.add('email', /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, getText('E-mail地址'));

	
	Rule.add('username', /^[\x21-\x25\x27-\x3a\x3c-\x7e]+$/, getText('只能是可见的ascii字符, 不含&;两个字符'));
	Rule.add('is-visible-ascii', /^[\x21-\x7e]+$/, getText('只能是可见的ascii字符'));

	
	Rule.add('system-username', /[\\/:*?\"<>|.;,]+/, getText('不能包括\\/:*?\"<>|.;,的任意字符'), true);
	Rule.add('system-password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, getText('必须包含数字,大写字母与小写字母'));

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(Rule.getNames(), function(v, i, o){
			Rule.setDesc(v, JS_I18N['js.validator.rule.' + v]);
		});
	}

	return Rule;
});

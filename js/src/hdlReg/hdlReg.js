/**********************************************************************************************
 * 名称: 预定义正则测试
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * hdlReg.add('regName1', /regPattern/, '此模式说明'); 增加正则并给出说明
 * hdlReg.add('regName1', /regPattern/, true); 增加正则,使用相反值
 * hdlReg.add('regName1', /regPattern/, '此模式说明', true); 增加正则并给出说明并使用函数返回的相反值
 * 
 * hdlReg.test('regName1', 'test-string'); 使用验证
 * hdlReg.item('regName1').test('test-string'); 使用验证,此方式为正则自己的test方法,不能使用到相反值

 * 2011-06-10 14:30:10:
 * 		默认都可为空,如果验证非空,请加入must, 或者在自定义函数里面检测为空的情况
 */
KISSY.add('hdlReg', function(S, undef) {
	var hdlReg = {
		 add: function(name, pattern, desc, reverse) {
			if(!name || !pattern){
				return false;
			}
			if(typeof desc === 'boolean' && desc === true){
				reverse = true;
				desc = undefined;
			}
			pattern.desc = desc;
			pattern.reverse = reverse;
			this.item(name, pattern);
			return this;
		}
		,test: function(name, str) {
			var t, p;
			if(!name){
				S.log(['hdlReg: 正则名字不存在', name]);
				return false;
			}
			if(str === undefined){
				S.log(['hdlReg: 检测的字符串必填.']);
				return false;
			}
			p = this.item(name);
			t = p.test(str);
			p.reverse && (t = !t);
			return t;
		}
		,item: function(name, value) {
			if(value){
				this['reg-'+name] = value;
				return this;
			}else{
				return this['reg-'+name];
			}
		}
	};
	window.hdlReg = hdlReg;

	/* 加入正则 */
	hdlReg.add('ipv4'
				,/^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/
				,'IPv4,点分十进制,共四位,每个数字不能超过255,如:192.168.0.1');

	hdlReg.add('integer', /^-?\d+$/, '整数(含正负)');
	hdlReg.add('integer-positive', /^\d+$/, '正整数');
	hdlReg.add('integer-negative', /^-\d+$/, '负整数');
	hdlReg.add('decimal', /^-?\d+\.\d+$/, '小数(含正负)');
	hdlReg.add('decimal-positive', /^\d+\.\d+$/, '正小数');
	hdlReg.add('decimal-negative', /^-\d+\.\d+$/, '负小数');
	hdlReg.add('number', /^-?\d+(?:\.\d+)?$/, '数字(含正负)');
	hdlReg.add('number-positive', /^\d+(?:\.\d+)?$/, '正数字');
	hdlReg.add('number-negative', /^-\d+(?:\.\d+)?$/, '负数字');

	hdlReg.add('letter', /^[a-z]*$/i, '字母,忽略大小写');
	hdlReg.add('letter-lower', /^[a-z]*$/, '小写字母');
	hdlReg.add('letter-upper', /^[A-Z]*$/, '大写字母');

	hdlReg.add('momsc', /^[0-9A-E]*$/, '只能为数字0-9,大写字母A-E');

	hdlReg.add('file-path', /^[\w\\\/]*$/, '路径只能包含数字、下划线、字母,/和\\');
	hdlReg.add('no-2more-slash', /[\/\\]{2,}/, '不能包含连续两个或以上的\\或/字符', true);

	hdlReg.add('email', /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, 'E-mail 地址');

	hdlReg.add('is-visible-ascii', /^[\x21-\x7e]*$/, '只能是可见的ascii字符');

	hdlReg.add('must', /^.+$/, '此项必填');

	hdlReg.add('username', /^\w*$/, '数字、字母(含大小写)或下划线');
	hdlReg.add('system-username', /[\\/:*?"<>|.;]+/, '不能包括\/:*?\"<>|.;的任意字符', true);
	hdlReg.add('system-password', /^[^\d]*\d[^A-Z]*[A-Z].*$|^[^A-Z]*[A-Z][^\d]*\d.*$/, '必须包含数字与字母,且至少有一个大写字母');

	hdlReg.add('lang-zh', /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/, '仅限中文');

	hdlReg.add('no-enter', /[\r\n]+/, '不能包含回车换行符', true);

	hdlReg.add('color-hex', /^[0-9a-f]{6}$/i, 'HEX颜色值, 形式: 00ff00');
	hdlReg.add('color-rgb', /^rgb\((?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d),\s*(?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d),\s*(?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\)$/i, 'RGB颜色值, 形式: rgb(0, 255, 0)');

	hdlReg.add('operator', /^[&|]|[&|]{2,}|[&|]$/, '操作符不能放在开头、结尾、不能存在两个连续操作符', true);
	hdlReg.add('parenthese', /^\)|\((?![^()]+\)[^()]*$)|\($/, '括号必须配对,并且只能含有一对括号', true);
	hdlReg.add('op-content', /\((?![^|&]+(?:[|&][^|&]+)*\))/, '括号内含有操作符时,操作符左右必需有内容', true);
});

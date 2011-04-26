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
 * hdlReg.item('regName1').test('test-string'); 使用验证
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
			if(!name || !str){
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

	hdlReg.add('letter', /^[a-z]+$/i, '字母,忽略大小写');
	hdlReg.add('letter-lower', /^[a-z]+$/, '小写字母');
	hdlReg.add('letter-upper', /^[A-Z]+$/, '大写字母');

	hdlReg.add('email', /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, 'E-mail 地址');

	hdlReg.add('color-hex', /^[0-9a-f]{6}$/i, 'HEX颜色值, 形式: 00ff00');
	hdlReg.add('color-rgb', /^rgb\((?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d),\s*(?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d),\s*(?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\)$/i, 'RGB颜色值, 形式: rgb(0, 255, 0)');
});

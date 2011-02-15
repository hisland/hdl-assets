/**********************************************************************************************
 * 一系列的正则,成功返回true, 否则返回false
 * 
 * hdlReg.add('regName1', /regPattern/, '此模式说明'); 增加正则并给出说明
 * hdlReg.add('regName1', /regPattern/, true); 增加正则,使用相反值
 * hdlReg.add('regName1', /regPattern/, '此模式说明', true); 增加正则并给出说明并使用函数返回的相反值
 * 
 * hdlReg.test('regName1', 'test-string'); 使用验证
 * hdlReg.test('regName1', 'test-string', true); 使用验证取相反值
 */
(function(){
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
		,test: function(name, str, reverse) {
			var t, p;
			if(!name || !str){
				return false;
			}
			p = this.item(name);
			t = p.test(str);
			p.reverse && (t = !t);
			reverse && (t = !t);
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
				,'IPv4,点分十进制共四位,每个数字不能超过255');

	hdlReg.add('integer', /\d+/, '整数');
	hdlReg.add('integer_positive', /\d+/, '正整数');
	hdlReg.add('integer_negative', /\d+/, '负整数');
	hdlReg.add('decimal', /\d+/, '小数');
	hdlReg.add('decimal_positive', /\d+/, '正小数');
	hdlReg.add('decimal_negative', /\d+/, '负小数');
	hdlReg.add('number0', /^0$/, '数字0');

	hdlReg.add('email', /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, 'email');

	hdlReg.add('color_hex', /^[0-9a-f]{6}$/i, 'HEX颜色值, 形式: 00ff00');
	hdlReg.add('color_rgb', /^rgb\((?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d),\s*(?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d),\s*(?:25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\)$/i, 'RGB颜色值, 形式: rgb(0, 255, 0)');
})();

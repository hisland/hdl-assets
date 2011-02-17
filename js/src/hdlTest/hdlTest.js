/**********************************************************************************************
 * 一系列的测试函数,成功返回true, 否则返回false
 * 
 * hdlTest.add('testName', function(str){...}, '此测试说明'); 增加测试函数并给出说明
 * hdlTest.add('testName', function(str){...}, true); 增加测试函数使用函数返回的相反值
 * hdlTest.add('testName', function(str){...}, '此测试说明', true); 增加测试函数并给出说明并使用函数返回的相反值
 * 
 * hdlTest.test('testName', 'str'); 使用测试函数
 * hdlTest.test('testName', 'str', true); 使用测试函数,使用相反值
 */
KISSY.add('hdlTest', function(S, undef) {
	var  prefix = 'test-'
		,hdlTest = {
		 add: function(name, fn, desc, reverse) {
			if(!name || !pattern){
				return false;
			}
			if(typeof desc === 'boolean' && desc === true){
				reverse = true;
				desc = undefined;
			}
			fn.desc = desc;
			fn.reverse = reverse;
			this.item(name, fn);
			return this;
		}
		,test: function(name, str) {
			var t, p;
			if(!name || !str){
				return false;
			}
			p = this.item(name);
			t = p(str);
			p.reverse && (t = !t);
			return t;
		}
		,item: function(name, value) {
			if(value){
				this[prefix + name] = value;
				return this;
			}else{
				return this[prefix + name];
			}
		}
	};
	window.hdlTest = hdlTest;

	/* 加入验证函数 */
	hdlTest.add('ipv4'
				,/^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/
				,'IPv4,点分十进制共四位,每个数字不能超过255');

});

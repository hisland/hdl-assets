/**********************************************************************************************
 * 名称: 预定义字符串验证
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP[2011-09-24 16:45:53]@
 * 版本: @VERSION[1]@
 * 
 * NOTICE:
 *		此模块为前hdlReg, hdlTest的合并,统一api
 *		检测返回值为true表示成功, 其它值表示失败,字符串为检测提示信息
 * 
 * API:
 *		validString.add('xx', /xx/, 'xx');	添加一个正则规则
 *		validString.add('xx', /xx/, 'xx', true);	添加一个正则规则,取反向值
 *		validString.add('bb', function(str){}, 'bb');	添加一个函数规则
 *		validString.add('bb', function(str){}, 'bb', true);	添加一个函数规则,取反向值
 * 
 *		validString.setDesc('bb', 'cc');	修改bb的默认提示信息
 * 
 *		validString('ipv4', '192.168.0.1');	使用ipv4规则检测后面的字符串,此例子返回true
 * 
 */

KISSY.add('validString', function(S, undef) {
	//保存每个配置
	var items = {};

	function validString(name, str){
		if(!S.isString(name) || !str){
			S.log('window.validString: must have name[String] and str!');
			return false;
		}

		var item = items[name], rs = false;

		//函数验证
		if(S.isFunction(item.fn)){
			rs = item.fn(str);
		}else{
			rs = item.fn.test(str);
		}

		//取反
		if(item.reverse === true){
			rs = !rs;
		}

		return rs;
	}

	window.validString = {
		add: function(name, fn, desc, reverse){
			//检查名字为字符串
			if(!S.isString(name)){
				S.log('window.validString.add: name must be String!');
				return this;
			}

			//检查验证方法为函数或者正则
			if(!S.isFunction(fn) || !S.isRegExp(fn)){
				S.log('window.validString.add: fn must be a function or RegExp!');
				return this;
			}

			//检查验证方法为函数或者正则
			if(!S.isString(desc)){
				S.log('window.validString.add: desc must be String!');
				return this;
			}

			//取反值时,只能为undefind或者boolean值
			if(S.isUndefined(reverse)){
				reverse = false;
			}else if(S.isBoolean(reverse)){
				//do nothing
			}else{
				S.log('window.validString.add: reverse must be undefind or a boolean value!');
				return this;
			}

			//提示覆盖情况
			if(items[name]){
				S.log('window.validString.add: name already exist, override it!');
			}

			//保存设置
			items[name] = {
				fn: fn,
				desc: desc,
				reverse: reverse
			};
			return this;
		},

		//修改默认的描述信息
		setDesc: function(name, str){
			if(!S.isString(name) || !S.isString(str)){
				S.log('window.validString.setDesc: must have name[String] and str[String]!');
				return this;
			}

			items[name].desc = str;

			return this;
		}
	};

	//expose
	window.validString = validString;


	//add some default

	//默认正则都可为空,不能为空请加上must规则
	validString.add('must', /^.+$/, '此项必填');

	validString.add(
		'ipv4',
		/^$|^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,
		'IPv4,点分十进制共四位,每个数字不能超过255'
	);
	validString.add(
		'ipv4-prefix0',
		/^$|^(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)$/,
		'IPv4,点分十进制,共四位,每个数字不能超过255,可有前置0'
	);
});

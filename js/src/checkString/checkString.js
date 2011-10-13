/**********************************************************************************************
 * 名称: 预定义检测字符串工具
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP[2011-09-24 16:45:53]@
 * 版本: @VERSION[1]@
 * 
 * NOTICE:
 *		此模块为前hdlReg, hdlTest的合并,统一api
 * 
 * API:
 *		
 */

KISSY.add('checkString', function(S, undef) {
	//保存每个配置
	var items = {};

	window.checkString = {
		add: function(name, fn, desc, reverse){
			//检查名字为字符串
			if(!S.isString(name)){
				S.log('window.checkString.add: name must be String!');
				return this;
			}

			//检查验证方法为函数或者正则
			if(!S.isFunction(fn) || !S.isRegExp(fn)){
				S.log('window.checkString.add: fn must be a function or RegExp!');
				return this;
			}

			//检查验证方法为函数或者正则
			if(!S.isString(desc)){
				S.log('window.checkString.add: desc must be String!');
				return this;
			}

			//提示覆盖情况
			if(items[name]){
				S.log('window.checkString.add: name already exist, override it!');
			}

			//保存设置
			items[name] = {
				fn: fn,
				desc: desc,
				reverse: reverse
			};
			return this;
		},

		test: function(name, str){
			if(!S.isString(name) || !str){
				S.log('window.checkString.test: must have name[String] and str!');
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
	};

	checkString.add('ipv4', function(str){
					
				}, 'IPv4,点分十进制共四位,每个数字不能超过255');


	//默认正则都可为空,不能为空请加上must规则
	checkString.add('must', /^.+$/, '此项必填');
	checkString.add(
		'ipv4',
		/^$|^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,
		'IPv4,点分十进制共四位,每个数字不能超过255'
	);
	checkString.add(
		'ipv4-prefix0',
		/^$|^(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)$/,
		'IPv4,点分十进制,共四位,每个数字不能超过255,可有前置0'
	);
});

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
			if(!S.isString(name) || !fn){
				S.log('window.checkString: must have name[String] and fn or reg!');
				return false;
			}

			//取反向值
			if(desc === true){
				reverse = true;
				desc = undefined;
			}

			//保存设置
			items[name] = {
				type: 'function',
				item: fn,
				desc: desc,
				reverse: reverse
			};
			return this;
		},

		test: function(name, str){
			if(!S.isString(name) || !str){
				S.log('window.checkString: must have name[String] and str!');
				return false;
			}

			var item = items[name], rs = false;

			return rs;
		}
	};

	checkString.add('ipv4', function(str){
					
				}, 'IPv4,点分十进制共四位,每个数字不能超过255');
});

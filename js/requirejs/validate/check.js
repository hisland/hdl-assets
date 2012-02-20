/**
 * @fileOverview
 * @author hisland hisland@qq.com
 * @description 预定义字符串验证
 * <pre><code>
 * NOTICE:
 *		此模块为前hdlReg, hdlTest的合并,统一api
 *		检测返回值为true表示成功, 其它值表示失败,字符串为检测提示信息
 * </code></pre>
 */
define(['kissy'], function(S){
	//保存每个配置
	var items = {},
		//因为以map存,如果属性为length会导致each函数认为是数组,增加前缀避免
		__PREFIX = '-valid-';
	/**
	 * <pre><code>
	 * validString('ipv4', '192.168.0.1');	使用ipv4规则检测后面的字符串,此例子返回true
	 * </code></pre>
	 * @param name 字符串, 规则名字
	 * @param str 要验证的字符串
	 * @class
	 * @name validString
	 */
	function validString(name, str){
		if(!S.isString(name) || !str){
			S.log('window.validString: must have name[String] and str[String,Number]!', 'warn');
			return false;
		}

		var item = items[__PREFIX + name], rs = false;

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

	/**
	 * @lends validString
	 */
	S.mix(validString, {
		/**
		 * 添加一个验证规则
		 * <pre><code>
		 * validString.add('xx', /xx/, 'xx');	添加一个正则规则
		 * validString.add('xx', /xx/, 'xx', true);	添加一个正则规则,取反向值
		 * validString.add('bb', function(str){}, 'bb');	添加一个函数规则
		 * validString.add('bb', function(str){}, 'bb', true);	添加一个函数规则,取反向值
		 * </code></pre>
		 * @param name 字符串, 规则名字
		 * @param fn 函数或正则, 具体的验证处理
		 * @param desc 字符串, 规则描述
		 * @param reverse true|false, 是否使用验证的相反值, 默认为false
		 */
		add: function(name, fn, desc, reverse){
			//名字必须为字符串
			if(!S.isString(name)){
				S.log('window.validString.add: name must be String!', 'warn');
				return this;
			}

			//验证方法必须为函数或者正则
			if(!S.isFunction(fn) && !S.isRegExp(fn)){
				S.log('window.validString.add: fn must be a function or RegExp!', 'warn');
				return this;
			}

			//必须要有验证说明且为字符串
			if(!S.isString(desc)){
				S.log('window.validString.add: desc must be String!', 'warn');
				return this;
			}

			//取反值时,只能为undefind或者boolean值
			if(S.isUndefined(reverse)){
				reverse = false;
			}else if(S.isBoolean(reverse)){
				//do nothing
			}else{
				S.log('window.validString.add: reverse must be undefind or a boolean value!', 'warn');
				return this;
			}

			//提示覆盖情况
			if(items[__PREFIX + name]){
				S.log('window.validString.add: name already exist, override it!', 'warn');
			}

			//保存设置
			items[__PREFIX + name] = {
				fn: fn,
				desc: desc,
				reverse: reverse
			};
			return this;
		},
		/**
		 * 修改默认的描述信息
		 * <pre><code>
		 * validString.setDesc('bb', 'cc');	修改bb的默认提示信息
		 * </code></pre>
		 * @param name 字符串, 规则名字
		 * @param str 描述字符串
		 */
		setDesc: function(name, str){
			if(!S.isString(name) || !S.isString(str)){
				S.log('window.validString.setDesc: must have name[String] and str[String]!', 'warn');
				return this;
			}

			items[__PREFIX + name].desc = str;

			return this;
		},
		/**
		 * 取得默认的描述信息
		 * @param name 字符串, 规则名字
		 */
		getDesc: function(name){
			if(!S.isString(name)){
				S.log('window.validString.setDesc: must have name[String]', 'warn');
				return this;
			}
			return items[__PREFIX + name].desc;
		},
		/**
		 * 获得当前已经有的验证规则列表
		 */
		getitems: function(){
			return items;
		}
	});

	//默认正则都可为空,不能为空请加上must规则
	validString.add('must', /^.+$/, '此项必填');

	//不带前置0的ipv4, 如: 10.2.100.11
	validString.add(
		'ipv4',
		/^$|^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,
		'IPv4,点分十进制共四位,每个数字不能超过255'
	);

	//可带前置0的ipv4, 如: 010.002.100.011
	validString.add(
		'ipv4-prefix0',
		/^$|^(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)\.(25[0-5]|2[0-4]\d|[01]\d{2}|\d?\d)$/,
		'IPv4,点分十进制,共四位,每个数字不能超过255,可有前置0'
	);


	//此段保留在最底部,如果有JS国际化信息将进行覆盖
	//国际化key命名规则为: js.common.validString.规则名, 如: js.common.validString.ipv4
	if(window.JS_I18N){
		S.each(items, function(v, i, o){
			validString.setDesc(i, JS_I18N['js.common.validString.' + i]);
		});
	}

	return validString;
});

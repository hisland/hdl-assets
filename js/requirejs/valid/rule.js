/**
 * 验证规则工具
 */

define(['kissy'], function(S){
		//干净对象保存配置列表
	var items = {},
		//因为以map存,如果规则名为length会导致each函数认为是数组,增加前缀避免
		__PREFIX = '-valid-';

	/**
	 * @lends Rule
	 */
	return {
		/**
		 * 添加一个验证规则
		 * <pre><code>
		 * Rule.add('xx', /xx/, 'xx');	添加一个正则规则
		 * Rule.add('xx', /xx/, 'xx', true);	添加一个正则规则,取反向值
		 * Rule.add('bb', function(str){}, 'bb');	添加一个函数规则
		 * Rule.add('bb', function(str){}, 'bb', true);	添加一个函数规则,取反向值
		 * </code></pre>
		 * @param name String 规则名字
		 * @param fn Function|RegExp 具体的验证处理
		 * @param desc String 规则描述
		 * @param reverse true|false, 是否使用验证的相反值, 默认为false
		 */
		add: function(name, fn, desc, reverse){
			if(S.isString(name) && (S.isFunction(fn) && S.isRegExp(fn)) && S.isString(name)){
				if(reverse !== true){
					reverse = false;
				}

				//提示覆盖情况
				if(items[__PREFIX + name]){
					S.log('Rule.add: name already exist, override it!', 'warn');
				}

				//保存设置
				items[__PREFIX + name] = {
					fn: fn,
					desc: desc,
					reverse: reverse
				};
			}
			return this;
		},
		/**
		 * <pre><code>
		 * Rule('ipv4', '192.168.0.1');	使用ipv4规则检测后面的字符串,此例子返回true
		 * </code></pre>
		 * @param name String 规则名字
		 * @param str 要验证的字符串
		 */
		test: function(name, str){
			if(S.isString(name) && str){
				var item = items[__PREFIX + name], rs = false;

				if(S.isFunction(item.fn)){
					rs = item.fn(str);
				}else{
					rs = item.fn.test(str);
				}

				//取反
				if(item.reverse){
					rs = !rs;
				}

				return rs;
			}
			return false;
		},
		/**
		 * 修改默认的描述信息
		 * <pre><code>
		 * Rule.setDesc('bb', 'cc');	修改bb的默认提示信息
		 * </code></pre>
		 * @param name String 规则名字
		 * @param desc String 描述字符串
		 */
		setDesc: function(name, desc){
			if(S.isString(name) && S.isString(desc)){
				items[__PREFIX + name].desc = desc;
			}
			return this;
		},
		/**
		 * 取得默认的描述信息
		 * @param String name 规则名字
		 */
		getDesc: function(name){
			return items[__PREFIX + name].desc;
		},
		/**
		 * 获得当前已经有的验证名字数组
		 * @return Array
		 */
		getNames: function(){
			var arr = [];
			S.each(items, function(v, i, o){
				arr.push(i.replace(__PREFIX, ''));
			});
			return arr;
		},
		/**
		 * 获得指定的验证, 可用于检测是否存在指定的验证
		 * @param String name 规则名字
		 * @return Object|undefined
		 */
		getItem: function(name){
			return items[__PREFIX + name];
		}
	};
});

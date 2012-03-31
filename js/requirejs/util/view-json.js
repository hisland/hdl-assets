/**
 * 查看json的工具
 */

define(function(){
	//转义\"2个字符
	function __escapeDashQuote(str){
		return str.replace(/[\\"]|\r\n|\r|\n/g, function(m){
			switch(m){
				case '\\':
					return '\\\\';
				case '"':
					return '\\"';
				case '\n':
					return '\\\n';
				case '\r\n':
					return '\\\r\n';
				case '\r':
					return '\\\r';
			}
		});
	}
	//底层递归函数
	function __viewJSON(obj, tabs, lvmax, lv){
		var isArr = Object.prototype.toString.apply(obj) === '[object Array]',
			bracket  = isArr ? '[' : '{',
			buff = [], i, type, tmp;
		tabs = tabs || '';
		lv = lv || 1;
		var indent = tabs + '\t';
		for(i in obj){
			//只显示自己的属性,不显示原型链上的属性
			if (obj.hasOwnProperty && !obj.hasOwnProperty(i)){
				continue;
			}

			tmp = obj[i];
			type = typeof tmp;
			
			if(type === 'number'){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + tmp);
			}

			else if(type === 'string'){
				buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + __escapeDashQuote(tmp) + '"');
			}

			else if(type === 'boolean'){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + tmp + '');
			}

			//typeof null === 'object', so check the real value first
			else if(tmp === null){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + 'null');
			}

			else if(type === 'object'){
				buff.push((isArr ? '' : '\n'+indent+'"'+i+'":') + (lvmax > lv ? __viewJSON(tmp, indent, lvmax, lv+1) : '"[object]"'));
			}

			else if(type === 'function'){
				buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + '[function]"');
			}

			else if(tmp === undefined){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + 'undefined');
			}

			else{
				buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + '[unKnownType]"');
			}
		}
		bracket += buff.join(',');
		bracket += '\n' + tabs + (isArr ? ']' : '}');
		return bracket ;
	}

	/**
	 * @lends util
	 */
	return {
		/**
		 * 指定查看几层
		 * <pre><code>
		 * API:
		 *	Tools.viewJSONlv({}, 2);		//查看对象的2级
		 * </code></pre>
		 * @param Object obj
		 * @param Number lvmax
		 * @return String
		 */
		viewJSONlv: function(obj, lvmax){
			if(lvmax > 0){
				return __viewJSON(obj, '', lvmax);
			}else{
				alert('viewJSONlv: lvmax must be in 1,2,3,4..10');
			}
		},
		/**
		 * 递归查看所有,只查看10层,避免循环引用导致无限查看
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON({});		//查看对象的JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON: function(obj){
			return __viewJSON(obj, '', 10);
		},
		/**
		 * 只查看第一级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON1({});		//查看对象的第一级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON1: function(obj){
			return __viewJSON(obj, '', 1);
		},
		/**
		 * 只查看第二级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON2({});		//查看对象的前2级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON2: function(obj){
			return __viewJSON(obj, '', 2);
		},
		/**
		 * 只查看第三级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON3({});		//查看对象的前3级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON3: function(obj){
			return __viewJSON(obj, '', 3);
		},
		/**
		 * 只查看第四级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON4({});		//查看对象的前4级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON4: function(obj){
			return __viewJSON(obj, '', 4);
		}
	};
});
define(function(){
var entityHTML_reg = /[&<>'"]/g,
	entityHTML_obj = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'\'': '&#39;',
		'"': '&quot;',
		'`': '&#60;'
	},
	unentityHTML_reg = /&amp;|&lt;|&gt;|&#39;|&quot;|&#34;|&#60;/g,
	unentityHTML_obj = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&#39;': '\'',
		'&quot;': '"',
		'&#34;': '"',
		'&#60;': '`'
	};

/**
 * @lends util#
 */
return {
	/**
	 * trim左空白字符
	 * @param String str 原始字符串
	 * @return String
	 */
	lTrim: function(str){
		return str.replace(/^[\s\u3000]+/, '');
	},
	/**
	 * trim右空白字符
	 * @param String str 原始字符串
	 * @return String
	 */
	rTrim: function(str){
		return str.replace(/[\s\u3000]+$/, '');
	},
	/**
	 * trim左右空白字符
	 * @param String str 原始字符串
	 * @return String
	 */
	trim: function(str){
		return str.replace(/^[\s\u3000]*|[\s\u3000]*$/g, '');
	},
	/**
	 * trim全部(包括中间)空白字符
	 * @param String str 原始字符串
	 * @return String
	 */
	trimAll: function(str){
		return str.replace(/[\s\u3000]*/g, '');
	},
	/**
	 * trim开头结尾的\t和换行
	 * @param String str 原始字符串
	 * @return String
	 */
	trimBlank: function(selector){
		$(selector).html(($(selector).html() || '').replace(/\n\t+|\t+\r|^\t+|\t+$|\r|\n/g, ''));
		return this;
	},

	/**
	 * 把 !'()*-._~ 这些不会编码的一起使用%XXX的形式编码
	 * @param String str 原始字符串
	 * @return String
	 */
	encodeAll: function(str){
		return encodeURIComponent(str).replace(/[!'()*-._~]/g, function(a){
			return "%"+a.charCodeAt(0).toString(16).toUpperCase();
		});
	},
	/**
	 * 把 *+-./@_ 这些不会编码的一起使用%XXX的形式编码
	 * @param String str 原始字符串
	 * @return String
	 */
	escapeAll: function(str){
		return escape(str).replace(/[*+-.\/@_]/g, function(a){
			return "%"+a.charCodeAt(0).toString(16).toUpperCase();
		});
	},
	/**
	 * 将含正常字符串换成实体的字符串转
	 * <p>
	 * 实测FF对于"'的处理是不编码直接显示(在firebug中查看html,实际源码还是实体)
	 * IE不支持'转换成&apos; ,故使用实体编号&#39;
	 * </p>
	 * @param String str 原始字符串
	 * @return String
	 */
	entityHTML: function(str){
		return str.replace(entityHTML_reg, function(v){
			return entityHTML_obj[v];
		});
	},
	/**
	 * 将含实体的字符串转换成正常字符串
	 * @param String str 原始字符串
	 * @return String
	 */
	unentityHTML: function(str){
		return str.replace(unentityHTML_reg, function(v){
			return unentityHTML_obj[v];
		});
	},
	/**
	 * 取得utf8长度
	 * @param String str 原始字符串
	 * @return Number
	 */
	lengthUTF8: function(str){
		var i = 0, code, len = 0;
		for (; i < str.length; i++) {
			code = str.charCodeAt(i);
			if (code < 0x007f) {
				len += 1;
			} else if (code >= 0x0080 && code <= 0x07ff) {
				len += 2;
			} else if (code >= 0x0800 && code <= 0xffff) {
				len += 3;
			}
		}
		return len;
	}
};
});

/**
 * @description 查看一个对象的json表示
 */

/**
 * 挂载jQuery的命名空间
 * @class
 * @name jQuery
 */

/**
 * 挂载window的命名空间
 * @class
 * @name window
 */

(function(){
	function __escapeDashQuote(str){
		return str.replace(/[\\"]/, function(m){
			if(m == '\\'){
				return '\\\\';
			}else{
				return '\\"';
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
	 * 指定查看几层
	 */
	window.viewJSONlv = function(obj, lvmax){
		if(lvmax > 0){
			return __viewJSON(obj, '', lvmax);
		}else{
			alert('viewJSONlv: lvmax must be in 1,2,3,4..10');
		}
	}

	/**
	 * 递归查看所有,只查看10层,避免循环引用导致无限查看
	 */
	window.viewJSON = function(obj){
		return __viewJSON(obj, '', 10);
	}

	/**
	 * 只查看第一级
	 */
	window.viewJSON1 = function(obj){
		return __viewJSON(obj, '', 1);
	}

	/**
	 * 只查看第二级
	 */
	window.viewJSON2 = function(obj){
		return __viewJSON(obj, '', 2);
	}

	/**
	 * 只查看第三级
	 */
	window.viewJSON3 = function(obj){
		return __viewJSON(obj, '', 3);
	}

	/**
	 * 只查看第四级
	 */
	window.viewJSON4 = function(obj){
		return __viewJSON(obj, '', 4);
	}

})();

/**
 * @description 增加日期对象方法
 * 设置时,前置0都可省略
 */

(function(){
	//将长度为1的字符串前置0
	function __length1Prefix0(value){
		value += '';
		return value.length==1 ? '0'+value : value;
	}
	//add具体的type
	function __add(type, value){
		if(type === 'year'){
			this.setFullYear(this.getFullYear() + value);
		}else if(type === 'month'){
			this.setMonth(this.getMonth() + value);
		}else if(type === 'date'){
			this.setDate(this.getDate() + value);
		}else if(type === 'hour'){
			this.setHours(this.getHours() + value);
		}else if(type === 'minute'){
			this.setMinutes(this.getMinutes() + value);
		}else if(type === 'second'){
			this.setSeconds(this.getSeconds() + value);
		}else if(type === 'millisecond'){
			this.setMillisecond(this.getMillisecond() + value);
		}
		return this;
	};
	/**
	 * 传value表示设置, 不传value表示取值
	 * <pre><code>
	 * var d = new Date();
	 * d.dateString();   返回日期字符串,如:2011-09-20
	 * d.dateString('2010-09-1');   将日期设置为2010-09-1 返回this
	 * d.dateString('2010/09/1');   将日期设置为2010-09-1 返回this
	 * </code></pre>
	 */
	Date.prototype.dateString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4})([-\/])(\d{1,2})\2(\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateString: setting error!');
			}
			this.setFullYear(arr[1]);
			this.setMonth(arr[3]-1);
			this.setDate(arr[4]);
			return this;
		}else{
			var y = this.getFullYear(),
				m = __length1Prefix0(this.getMonth()+1),
				d = __length1Prefix0(this.getDate());
			return y + '-' + m + '-' + d;
		}
	};
	/**
	 * 传value表示设置, 不传value表示取值
	 * <pre><code>
	 * var d = new Date();
	 * d.timeString();   返回时间字符串,如:10:46:11
	 * d.timeString('10:46:11');   将时间设置为10:46:11, 返回this
	 * </code></pre>
	 */
	Date.prototype.timeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/);
			if(!arr){
				alert('Date.prototype.timeString: setting error!');
			}
			this.setHours(arr[1]);
			this.setMinutes(arr[2]);
			this.setSeconds(arr[3]);
			return this;
		}else{
			var h = __length1Prefix0(this.getHours()),
				m = __length1Prefix0(this.getMinutes()),
				s = __length1Prefix0(this.getSeconds());
			return h + ':' + m + ':' + s;
		}
	};
	/**
	 * 传value表示设置, 不传value表示取值
	 * <pre><code>
	 * var d = new Date();
	 * d.dateTimeString();   返回日期字符串,如:2011-09-20 10:47:10
	 * d.dateTimeString('2011-09-20 10:47:10');   将时间设置为2011-09-20 10:47:10, 返回this
	 * d.dateTimeString('2011/09/20 10:47:10');   将时间设置为2011-09-20 10:47:10, 返回this
	 * </code></pre>
	 */
	Date.prototype.dateTimeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateTimeString: setting error!');
			}
			this.dateString(arr[1]);
			this.timeString(arr[3]);
			return this;
		}else{
			return this.dateString() + ' ' + this.timeString();
		}
	};
	/**
	 * 取得月份开始时间, 如2012-01-1 00:00:00
	 */
	Date.prototype.getMonthStart = function(){
		//创建副本
		var rs = new Date(+this);
		rs.setDate(1);
		rs.timeString('00:00:00');
		return rs;
	};
	/**
	 * 取得月份结束时间, 如2012-01-31 23:59:59
	 */
	Date.prototype.getMonthEnd = function(){
		//创建副本
		var rs = new Date(+this),
			year = rs.getFullYear(),
			month_days_list = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		month_days_list[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;

		rs.setDate(month_days_list[rs.getMonth()]);
		rs.timeString('23:59:59');
		return rs;
	};
	/**
	 * 检测日期是否合法,返回true|false
	 */
	Date.prototype.isValid = function(){
		if(/^NaN$|^Invalid Date$/.test(this.toString())){
			return false;
		}
		return true;
	};
	/**
	 * 统一采用加法, 传负数为减
	 * <pre><code>
	 * d.add(123); d.add('1234'); d.add(-123) 增加或减少毫秒数,参数为可转化成数字的变量
	 * d.add('year'); d.add('month')  指定部分加1,参数为[year|month|date|hour|minute|second]
	 * d.add('year', 123); d.add('month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
	 * </code></pre>
	 */
	Date.prototype.add = function(type, value){
		var reg = /^(?:year|month|date|hour|minute|second)$/;

		if(type === undefined){
			alert('Date.prototype.add: type is undefined!');
		}else if(value === undefined){
			if(!isNaN(type)){
				type -= 0;
				this.setTime(this.getTime() + type);
			}else if(reg.test(type)){
				value = 1;
				__add.call(this, type, value);
			}
		}else{
			if(!isNaN(value) && reg.test(type)){
				value -= 0;
				__add.call(this, type, value);
			}
		}
		return this;
	};
})();

/**
 * @description 增加字符串对象方法
 * <pre><code>
 * API:
 *		var d = '2011-09-20'.getDate();		//从日期字符串获得Date对象
 *		var d = '2011/09/20'.getDate();		//从日期字符串获得Date对象
 *		var d = '2011-09-20 10:58:37'.getDate();		//从日期字符串获得Date对象
 *		var d = '2011/09/20 10:58:37'.getDate();		//从日期字符串获得Date对象
 * 
 *		var d = 'xx'.getDate();		//值为null, 字符串必须能转换成日期对象
 *		var rs = 'xx'.isValidDate();		//值为true|false, 检测字符串能否转换成日期对象
 * 
 *		var rs = '()*-'.encodeAll();		//把 !'()*-._~ 这些不会编码的一起使用%XXX的形式编码
 *		var rs = '()*-'.escapeAll();		//把 *+-./@_ 这些不会编码的一起使用%XXX的形式编码
 * 
 *		var rs = '  jj  '.lTrim();			//去左空白字符
 *		var rs = '  jj  '.rTrim();			//去右空白字符
 *		var rs = '  jj  '.trim();			//去左右空白字符
 *		var rs = '  jj  '.trimAll();			//去全部(包括中间)空白字符
 * 
 *		var rs = '  jj  '.entityHTML();			//对字符串进行实体编码|编号转换
 *		var rs = '  jj  '.unentityHTML();			//上一函数的反向操作
 * </code></pre>
 */

(function(){
	/**
	 * 根据字符串获取时间,不能转换返回null
	 */
	String.prototype.getDate = function(){
		var val = this.replace(/-/g,'/'), date = new Date(val);
		if(date.isValid()){
			return date;
		}else{
			return null;
		}
	};

	/**
	 * 否可以返回正确时间
	 */
	String.prototype.isValidDate = function(){return this.getDate() === null ? false : true};

	/**
	 * 把 !'()*-._~ 这些不会编码的一起使用%XXX的形式编码
	 */
	String.prototype.encodeAll = function(){
		return encodeURIComponent(this).replace(/[!'()*-._~]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
	};
	/**
	 * 把 *+-./@_ 这些不会编码的一起使用%XXX的形式编码
	 */
	String.prototype.escapeAll = function(){
		return escape(this).replace(/[*+-.\/@_]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
	};

	/**
	 * Trim左空白字符
	 */
	String.prototype.lTrim = function(){return this.replace(/^[\s\u3000]*/,'')};
	/**
	 * Trim右空白字符
	 */
	String.prototype.rTrim = function(){return this.replace(/[\s\u3000]*$/,'')};
	/**
	 * Trim左右空白字符
	 */
	String.prototype.trim = function(){return this.replace(/^[\s\u3000]*|[\s\u3000]*$/g,'')};
	/**
	 * Trim全部(包括中间)空白字符
	 */
	String.prototype.trimAll = function(){return this.replace(/[\s\u3000]*/g,'')};

	var entityHTML_reg = /[&<>'"]/g;
	var entityHTML_obj = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'\'': '&#39;',
		'"': '&quot;'
	};
	/**
	 * 将含正常字符串换成实体的字符串转
	 * <p>
	 * 实测FF对于"'的处理是不编码直接显示(在firebug中查看html,实际源码还是实体)
	 * IE不支持'转换成&apos; ,故使用实体编号&#39;
	 * </p>
	 */
	String.prototype.entityHTML = function(){
		return this.replace(entityHTML_reg, function(v){
			return entityHTML_obj[v];
		});
	}
	var unentityHTML_reg = /&amp;|&lt;|&gt;|&#39;|&quot;|&#34;/g;
	var unentityHTML_obj = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&#39;': '\'',
		'&quot;': '"',
		'&#34;': '"'
	};
	/**
	 * 将含实体的字符串转换成正常字符串
	 */
	String.prototype.unentityHTML = function(){
		return this.replace(unentityHTML_reg, function(v){
			return unentityHTML_obj[v];
		});
	}
})();

/**
 * @description 数组对象方法
 * <pre><code>
 * API:
 *		var rs = [1,1,3].unique();	//rs为 [1,3]
 * </code></pre>
 */
(function(){
	/**
	 * 剔除数组里面的重复项, 仅能用于简单对象数组
	*/
	Array.prototype.unique = function(){
		this.sort();
		for(var i=1; i<this.length ; ){
			if(this[i] === this[i-1]){
				this.splice(i, 1);
				continue;
			}
			i++;
		}
		return this;
	};


	var t_array_rang = /^(\d+)\.\.(\d+)$/;
	/**
	 * 根据字符串'a..b'的形式生成从a-b的数字数组
	 * @param str 'a..b'形式, a,b为整数
	 */
	Array.fromString = function(str){
		var tmp = t_array_rang.exec(str), arr, from, to;
		if(tmp){
			arr = [], from = tmp[1]-0, to = tmp[2]-0;
			if(from < to){
				for(; from<=to; from++){
					arr.push(from);
				}
				return arr;
			}
		}
		return null;
	}
})();/**
 * @description 增强Math对象方法
 */

(function(){
	var oldRandom = Math.random;
	/**
	 * 修改了random方法, 可以传入from, to 得到范围内的整数
	 * <pre><code>
	 * API:
	 *		var num = Math.random();		//得到原始的随机数
	 *		var num = Math.random(100);		//得到0-100的随机数
	 *		var num = Math.random(5, 100);	//得到5-100的随机数
	 *		var num = Math.random(100, 5);	//得到5-100的随机数
	 * </code></pre>
	 */
	Math.random= function(from, to){
		var temp = 0, len = arguments.length;
		from -= 0;
		to -= 0;
		if(len === 0){
			return oldRandom();
		}else if(len === 1){
			if(isNaN(from)){
				alert('Math.random: from is error!');
				return null;
			}else{
				to = from;
				from = 0;
			}
		}else{
			if(isNaN(from) && isNaN(to)){
				alert('Math.random: from and to are error!');
				return null;
			}else if(isNaN(from)){
				from = 0;
			}else if(isNaN(to)){
				to = from;
				from = 0;
			}
		}
		if(from > to){
			temp = from;
			from = to;
			to = temp;
		}
		temp = to - from;
		temp = Math.round(oldRandom() * (temp+100) % temp);
		return from + temp;
	};
})();

/**
 * @description 增加数字对象方法
 */
/**
 * @description 增加正则对象方法
 */


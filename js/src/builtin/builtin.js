/**********************************************************************************************
 * 查看一个对象的json表示
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
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

	//指定查看几层
	window.viewJSONlv = function(obj, lvmax){
		if(lvmax > 0){
			return __viewJSON(obj, '', lvmax);
		}else{
			alert('viewJSONlv: lvmax must be 1,2,3,4...');
		}
	}

	//递归查看所有,只查看20层,避免循环引用导致无限查看
	window.viewJSON = function(obj){
		return __viewJSON(obj, '', 20);
	}

	//只查看第一级
	window.viewJSON1 = function(obj){
		return __viewJSON(obj, '', 1);
	}

	//只查看第二级
	window.viewJSON2 = function(obj){
		return __viewJSON(obj, '', 2);
	}

	//只查看第三级
	window.viewJSON3 = function(obj){
		return __viewJSON(obj, '', 3);
	}

	//只查看第四级
	window.viewJSON3 = function(obj){
		return __viewJSON(obj, '', 4);
	}

})();

/**********************************************************************************************
 * 增加日期对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * NOTICE:
 *		设置时,前置0都可省略
 * 
 * API:
 *		var d = new Date();
 *		d.dateString();		//取得日期字符串,如:2011-09-20
 *		d.dateString('2010-09-1');		//将日期设置为2010-09-1
 *		d.dateString('2010/09/1');		//将日期设置为2010-09-1
 * 
 *		d.timeString();		//取得日期字符串,如:10:46:11
 *		d.timeString('10:46:11');		//将时间设置为10:46:11
 * 
 *		d.dateTimeString();		//取得日期字符串,如:2011-09-20 10:47:10
 *		d.dateTimeString('2011-09-20 10:47:10');		//将时间设置为2011-09-20 10:47:10
 *		d.dateTimeString('2011/09/20 10:47:10');		//将时间设置为2011-09-20 10:47:10
 *		
 *		d.isValid();	//检测日期是否合法,返回true|false
 *		
 *		d.add(123); d.add('1234'); d.add(-123) 增加或减少毫秒数,参数为可转化成数字的变量
 *		d.add('year'); d.add('month')  指定部分加1,参数为[year|month|date|hour|minute|second]
 *		d.add('year', 123); d.add('month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
 * 
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
			return y+'-'+m+'-'+d;
		}
	};
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
			return h+':'+m+':'+s;
		}
	};
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
			return this.dateString()+' '+this.timeString();
		}
	};
	Date.prototype.isValid = function(){
		if(/^NaN$|^Invalid Date$/.test(this.toString())){
			return false;
		}
		return true;
	};
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

/**********************************************************************************************
 * 增加字符串对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
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
 * 
 */

(function(){
	//根据字符串获取时间,不能转换返回null
	String.prototype.getDate = function(){
		var val = this.replace(/-/g,'/'), date = new Date(val);
		if(date.isValid()){
			return date;
		}else{
			return null;
		}
	};

	//否可以返回正确时间
	String.prototype.isValidDate = function(){return this.getDate() === null ? false : true};

	//把 !'()*-._~ 这些不会编码的一起使用%XXX的形式编码
	String.prototype.encodeAll = function(){
		return encodeURIComponent(this).replace(/[!'()*-._~]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
	};
	//把 *+-./@_ 这些不会编码的一起使用%XXX的形式编码
	String.prototype.escapeAll = function(){
		return escape(this).replace(/[*+-.\/@_]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
	};

	//给String类加上trim函数 (\u3000为中文空格-IE下的\s不包含它,FF包含)
	String.prototype.lTrim = function(){return this.replace(/^[\s\u3000]*/,'')};	//左空白字符
	String.prototype.rTrim = function(){return this.replace(/[\s\u3000]*$/,'')};	//右空白字符
	String.prototype.trim = function(){return this.replace(/^[\s\u3000]*|[\s\u3000]*$/g,'')};	//左右空白字符
	String.prototype.trimAll = function(){return this.replace(/[\s\u3000]*/g,'')};	//全部(包括中间)空白字符

	//note:实测FF对于"'的处理是不编码直接显示(在firebug中查看html,实际源码还是实体)
	//note:IE不支持'转换成&apos; ,故使用实体编号&#39;
	var entityHTML_reg = /[&<>'"]/g;
	var entityHTML_obj = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'\'': '&#39;',
		'"': '&quot;'
	};
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
	String.prototype.unentityHTML = function(){
		return this.replace(unentityHTML_reg, function(v){
			return unentityHTML_obj[v];
		});
	}
})();

/**********************************************************************************************
 * 数组对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 *		var rs = [1,1,3].unique();	//rs为 [1,3]
 * 
 */

//剔除数组里面的重复项
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

/**********************************************************************************************
 * 增强Math对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 *		var num = Math.random();		//得到原始的随机数
 *		var num = Math.random(100);		//得到0-100的随机数
 *		var num = Math.random(5, 100);	//得到5-100的随机数
 *		var num = Math.random(100, 5);	//得到5-100的随机数
 * 
 */

(function(){
	var oldRandom = Math.random;
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

/**********************************************************************************************
 * 增加数字对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 *		5.doTimes(fn);	//执行fn5次, fn的第1个参数为n
 * 
 */

Number.prototype.doTimes = function(fn){
	for(var i=0; i<this; i++){
		fn(i);
	}
}

/**********************************************************************************************
 * 增加正则对象方法
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */


/**********************************************************************************************
 * 查看一个对象的json表示
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

function viewJSON(obj,tabs){
	var isArr = Object.prototype.toString.apply(obj) === '[object Array]';
	var str = isArr ? '[' : '{';
	var arr = [];
	tabs = tabs ? tabs : '';
	var tabs2 = tabs ? tabs+'\t' : '\t';
	for(var i in obj){
		//只显示自己的属性,不显示原型链上的属性
		if (!obj.hasOwnProperty(i)){
			continue;
		}

		var type = typeof obj[i];
		
		if(type === 'number'){
			arr.push('\n', tabs2, (isArr ? '' : '"'+i+'":'), obj[i]);
		}

		else if(type === 'string'){
			arr.push('\n', tabs2, (isArr ? '"' : '"'+i+'":"'), obj[i], '"');
		}

		else if(type === 'boolean'){
			arr.push('\n', tabs2, (isArr ? '' : '"'+i+'":'), obj[i], '');
		}
		
		else if(type === 'object'){
			arr.push((isArr ? '' : '\n'+tabs2+'"'+i+'":'), viewJSON(obj[i],tabs2));
		}
		
		else if(type === 'function'){
			arr.push('\n', tabs2, (isArr ? '"' : '"'+i+'":"'), '[function]"');
		}

		else if(obj[i] === null){
			arr.push('\n', tabs2, (isArr ? '' : '"'+i+'":'), 'null');
		}

		else if(obj[i] === undefined){
			arr.push('\n', tabs2, (isArr ? '' : '"'+i+'":'), 'undefined');
		}
		
		else{
			arr.push('\n', tabs2, (isArr ? '"' : '"'+i+'":"'), '[unKnownType]"');
		}
	}
	str += arr.join(',');
	str += isArr ? '\n'+tabs+']' : '\n'+tabs+'}';
	return str;
}

/**********************************************************************************************
 * 
 * 增加日期对象方法
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

(function(){
	//将长度为1的字符串前置0
	function length1Prefix0(value){
		value += '';
		return value.length==1 ? '0'+value : value;
	}
	//内部add方法,,add具体的type
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

	//有value设置日期,无value读取日期
	//参数形式:'2010-09-01'|'2010/09/01' 前置0可省略
	Date.prototype.dateString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4})([-\/])(\d{1,2})\2(\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略');
				throw 'Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略';
			}
			this.setFullYear(arr[1]);
			this.setMonth(arr[3]-1);
			this.setDate(arr[4]);
			return this;
		}else{
			var  y = this.getFullYear()
				,m = length1Prefix0(this.getMonth()+1)
				,d = length1Prefix0(this.getDate());
			return y+'-'+m+'-'+d;
		}
	};
	Date.prototype.timeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/);
			if(!arr){
				alert('Date.prototype.timeString: 出错,请确保参数格式为 09:05:02 前置0可省略');
				throw 'Date.prototype.timeString: 出错,请确保参数格式为 09:05:02 前置0可省略';
			}
			this.setHours(arr[1]);
			this.setMinutes(arr[2]);
			this.setSeconds(arr[3]);
			return this;
		}else{
			var  h = length1Prefix0(this.getHours())
				,m = length1Prefix0(this.getMinutes())
				,s = length1Prefix0(this.getSeconds());
			return h+':'+m+':'+s;
		}
	};
	Date.prototype.dateTimeString = function(value){
		if(value){
			value += '';
			var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
			if(!arr){
				alert('Date.prototype.dateTimeString: 出错,请确保参数格式为 2010-09-01 09:05:02 或 2010/09/01 09:05:02 前置0可省略');
				throw 'Date.prototype.dateTimeString: 出错,请确保参数格式为 2010-09-01 09:05:02 或 2010/09/01 09:05:02 前置0可省略';
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

	//var d = new Date()
	//d.add(123) d.add('1234') d.add(-123) 增加或减少毫秒数,参数为可转化成数字的变量
	//d.add('year') d.add('month')  指定部分加1,参数为[year|month|date|hour|minute|second]
	//d.add('year', 123) d.add('month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
	Date.prototype.add = function(type, value){
		var reg = /^(?:year|month|date|hour|minute|second)$/;

		if(type === undefined){
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
 * 
 * 增加字符串对象方法
 * 
 * 先引入Date模块
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
	var entityHTMLReg = /[&<>'"]/g;
	String.prototype.entityHTML = function(){
		return this.replace(entityHTMLReg, function(v){
			if(v === '&'){
				return '&amp;';
			}else if(v === '<'){
				return '&lt;';
			}else if(v === '>'){
				return '&gt;';
			}else if(v === "'"){
				return '&#39;';
			}else if(v === '"'){
				return '&quot;';
			}
			return v;
		});
	}
	var unentityHTMLReg = /&amp;|&lt;|&gt;|&#39;|&quot;|&#34;/g;
	String.prototype.unentityHTML = function(){
		return this.replace(unentityHTMLReg, function(v){
			if(v === '&amp;'){
				return '&';
			}else if(v === '&lt;'){
				return '<';
			}else if(v === '&gt;'){
				return '>';
			}else if(v === '&#39;'){
				return "'";
			}else if(v === '&quot;' || v === '&#34;'){
				return '"';
			}
			return v;
		});
	}
})();

/**********************************************************************************************
 * 数组对象方法
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
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
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

(function(){

	//增强Math.random
	//产生一个from 到 to的随机整数
	var oldRandom = Math.random;
	Math.random= function(from, to){
		var temp = 0, len = arguments.length;
		from -= 0;
		to -= 0;
		if(len === 0){
			return oldRandom();
		}else if(len === 1){
			if(isNaN(from)){
				return oldRandom();
			}else{
				to = from;
				from = 0;
			}
		}else{
			if(isNaN(from) && isNaN(to)){
				return oldRandom();
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
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

Number.prototype.doTimes = function(fn){
	for(var i=0; i<this; i++){
		fn(i);
	}
}

/**********************************************************************************************
 * 
 * 增加正则对象方法
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */


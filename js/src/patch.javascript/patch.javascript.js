/**********************************************************************************************
 * 给javascript的内置函数的原型上增加一些方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-1-26 15:11:10
 * 版本: v1
 *
 *********************************************************************************************/

//将长度为1的字符串前置0
function length1Prefix0(value){
	value += '';
	return value.length==1 ? '0'+value : value;
}

//返回当前毫秒数
function timestamp(){
	return new Date().valueOf();
}

//显示错误 - 并抛出异常
function sayError(message){
	if(window['console'] && console.error){
		console.error(message);
	}else{
		alert(message);
	}
	throw message;
}
//测试断言,失败抛异常
function assert(test, message){
	if(!test){
		sayError(message);
	}
}

//显示通知
function sayNotice(message){
	if(window['console'] && console.info){
		console.info(message);
	}else{
		alert(message);
	}
}
//测试提示,不正常给出提示
function notice(test, message){
	if(!test){
		sayInfo(message);
	}
}

//显示日志
function sayLog(message){
	if(window['console'] && console.log){
		console.log(message);
	}
}


/**********************************************************************************************
 *
 * 增加日期对象方法
 *
 *********************************************************************************************/
//有value设置日期,无value读取日期
//参数形式:'2010-09-01'|'2010/09/01' 前置0可省略
Date.prototype.dateString = function(value){
	if(value){
		value += '';
		var arr = value.match(/\d{4}([-\/])\d{1,2}\1\d{1,2}/);
		if(!arr){
			alert('Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略');
			throw 'Date.prototype.dateString: 出错,请确保参数格式为 2010-09-01 或 2010/09/01 前置0可省略';
		}
		this.setFullYear(arr[1]);
		this.setMonth(arr[2]-1);
		this.setDate(arr[3]);
		return this;
	}else{
		var  y = this.getFullYear()
			,m = length1Prefix0(this.getMonth()+1)
			,d = length1Prefix0(this.getDate());
		return y+'-'+m+'-'+d;
	}
};
//有value设置时间,无value读取时间
//参数形式:'09:05:02' 前置0可省略
Date.prototype.timeString = function(value){
	if(value){
		value += '';
		var arr = value.match(/\d{1,2}:\d{1,2}:\d{1,2}/);
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
//有value设置日期时间,无value读取日期时间
//参数形式:'2010-09-01 09:05:02'|'2010/09/01 09:05:02' 前置0可省略
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
//是否是正确时间
Date.prototype.isValid = function(){
	if(/^NaN$|^Invalid Date$/.test(this.toString())){
		return false;
	}
	return true;
};


/**********************************************************************************************
 *
 * 增加字符串对象方法
 *
 *********************************************************************************************/
//根据字符串获取时间,不能转换返回null
String.prototype.getDate = function(){
	var val = this.replace(/-/g,'/');
	var date = new Date(val);
	if(date.isValid()){
		return date;
	}else{
		return null;
	}
};
//否可以返回正确时间
String.prototype.isValidDate = function(){return this.getDate() === null ? false : true};
//从字符串获取日期
String.prototype.dateString = function(){
	if(this.isValidDate()){
		return this.getDate().dateString();
	}else{
		return null;
	}
};
//从字符串获取时间
String.prototype.timeString = function(){
	if(this.isValidDate()){
		return this.getDate().timeString();
	}else{
		return null;
	}
};
//从字符串获取日期时间
String.prototype.dateTimeString = function(){
	if(this.isValidDate()){
		return this.getDate().dateTimeString();
	}else{
		return null;
	}
};

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

//按c标签的输出进行转换, ["']这两个使用实体编号,其它3个使用实体名称
String.entityHTMLReg = /[&<>"']/g;
String.prototype.entityHTML = function(){
	return this.replace(String.entityHTMLReg, function(v){
		if(v === '&'){
			return '&amp;';
		}else if(v === '<'){
			return '&lt;';
		}else if(v === '>'){
			return '&gt;';
		}else if(v === '"'){
			return '&#34;';
		}else if(v === "'"){
			return '&#39;';
		}
		return v;
	});
}
String.unentityHTMLReg = /&lt;|&gt;|&amp;|&#34;|&#39;/g;
String.prototype.unentityHTML = function(){
	return this.replace(String.unentityHTMLReg, function(v){
		if(v === '&amp;'){
			return '&';
		}else if(v === '&lt;'){
			return '<';
		}else if(v === '&gt;'){
			return '>';
		}else if(v === '&#34;'){
			return '"';
		}else if(v === '&#39;'){
			return "'";
		}
		return v;
	});
}



/**********************************************************************************************
 *
 * 增加数组对象方法
 *
 *********************************************************************************************/
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

//产生一个from 到 to的随机整数
//使用方式:
//randomNum(from, to)
//randomNum(to)
function randomNum(from, to){
	if(!from || isNaN(from-0)){
		alert('randomNum: 至少得有一个可转换成数字的参数');
		throw 'randomNum: 至少得有一个可转换成数字的参数';
	}
	if(!to){
		to = from;
		from = 0;
	}
	if(isNaN(to-0)){
		alert('randomNum: to参数必须可转换成数字');
		throw 'randomNum: to参数必须可转换成数字';
	}

	var temp = 0;
	if(from > to){
		temp = from;
		from = to;
		to = temp;
	}

	temp = to - from;
	temp = Math.round(Math.random() * (temp+100) % temp);
	return from + temp;
}

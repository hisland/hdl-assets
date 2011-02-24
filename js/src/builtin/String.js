/**********************************************************************************************
 * 
 * 增加字符串对象方法
 * 
 * 根据字符串获取时间,不能转换返回null
 */
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

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


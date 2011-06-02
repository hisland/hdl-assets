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

	//按c标签的输出进行转换, ["']这两个使用实体编号,其它3个使用实体名称
	//note:实测FF对于"'的处理是不编码直接显示
	var entityHTMLReg = /[&<>]/g;
	String.prototype.entityHTML = function(){
		return this.replace(entityHTMLReg, function(v){
			if(v === '&'){
				return '&amp;';
			}else if(v === '<'){
				return '&lt;';
			}else if(v === '>'){
				return '&gt;';
			}
			return v;
		});
	}
	var unentityHTMLReg = /&lt;|&gt;|&amp;/g;
	String.prototype.unentityHTML = function(){
		return this.replace(unentityHTMLReg, function(v){
			if(v === '&amp;'){
				return '&';
			}else if(v === '&lt;'){
				return '<';
			}else if(v === '&gt;'){
				return '>';
			}
			return v;
		});
	}
})();


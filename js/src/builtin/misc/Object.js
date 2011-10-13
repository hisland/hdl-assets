/**********************************************************************************************
 * 查看一个对象的json表示
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

function __escapeDashQuote(str){
	return str.replace(/[\\"]/, function(m){
		if(m == '\\'){
			return '\\\\';
		}else{
			return '\\"';
		}
	});
}

//递归生成json
function viewJSON(obj, tabs){
	var isArr = Object.prototype.toString.apply(obj) === '[object Array]',
		bracket  = isArr ? '[' : '{',
		buff = [], i, type, tmp;
	tabs = tabs || '';
	var indent = tabs + '\t';
	for(i in obj){
		//只显示自己的属性,不显示原型链上的属性
		if (!obj.hasOwnProperty(i)){
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
			buff.push((isArr ? '' : '\n'+indent+'"'+i+'":') + viewJSON(tmp,indent));
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

//只查看第一级,不递归
function viewJSON1(obj, tabs){
	var isArr = Object.prototype.toString.apply(obj) === '[object Array]',
		bracket  = isArr ? '[' : '{',
		buff = [], i, type, tmp;
	tabs = tabs || '';
	var indent = tabs + '\t';
	for(i in obj){
		//只显示自己的属性,不显示原型链上的属性
		if (!obj.hasOwnProperty(i)){
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
			buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + '[object]"');
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

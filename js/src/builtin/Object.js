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


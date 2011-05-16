/**********************************************************************************************
 *
 * 查看一个对象的json表示
 * 
 */

Object.prototype.viewJSON = function(obj,tabs){
	var isArr = Object.prototype.toString.apply(obj) === '[object Array]';
	var str = isArr ? '[' : '{';
	var arr = [];
	tabs = tabs ? tabs : '';
	var tabs2 = tabs ? tabs+'\t' : '\t';
	for(var i in obj){
		if (!obj.hasOwnProperty(i)){
			continue;
		}
		if(typeof obj[i] == 'number'){//返回 'key':val|数组val;
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+obj[i]);
		}else if(typeof obj[i] == 'string'){//返回 'key':'val'|数组'val';
			arr.push('\n'+tabs2+(isArr ? '"' : '"'+i+'":"')+obj[i]+'"');
		}else if(typeof obj[i] == 'boolean'){//返回 'key':'val'|数组'val';
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+obj[i]+'');
		}else if(obj[i] == null){//返回 'key':null|数组null;
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+'null');
		}else if(obj[i] == undefined){//返回 'key':undefined|数组undefined;
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+'undefined');
		}else if(typeof obj[i] == 'object'){
			arr.push((isArr ? '' : '\n'+tabs2+'"'+i+'":')+viewJSON(obj[i],tabs2));
		}else if(typeof obj[i] == 'function'){
			arr.push('\n'+tabs2+(isArr ? '"' : '"'+i+'":"')+'[function]"');
		}else{
			throw ('出错: '+obj[i]);
		}
	}
	str += arr.join(',');
	str += isArr ? '\n'+tabs+']' : '\n'+tabs+'}';
	return str;
}


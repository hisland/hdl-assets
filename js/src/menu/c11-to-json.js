var mw = $('.menu_list');
var h3s = mw.find('h3');
var uls = mw.find('ul');

var m = [{
	"text": "根节点",
	"children": []}];


h3s.each(function(i, v){
	v = $(v);
	var o = {
		"text": v.find('span:eq(0)').text(),
		"children": []};
	
	uls.eq(i).find('a').each(function(i, v){
		v = $(v);
		var o2 = {
			"text": v.text(),
			"url": v.attr('href'),
			"prefix": v.attr('rightsprex'),
			"id": v.attr('id')
		};
		
		o.children.push(o2);
	});
	m[0].children.push(o);
});

viewJSON = function(obj,tabs){
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

$('body').prepend('<textarea>'+viewJSON(m)+'</textarea>');

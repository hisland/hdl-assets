/**
 * @fileOverview
 * @module mod-template
 * @author hisland hisland@qq.com
 * @description 查看一个对象的json表示
 * <pre><code>
 * 
 * </code></pre>
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


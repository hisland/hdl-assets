//使用$(id)获取元素,来自prototype.js
function $(element) {
	if (arguments.length > 1) {
		for (var i = 0, elements = [], length = arguments.length; i < length; i++)
			elements.push($(arguments[i]));
		return elements;
	}
	if (typeof element == 'string' || typeof element == 'number')
		element = document.getElementById(element);
	return element;
}

//给元素添加DOM事件监听
function addEvent(target,evtType,func){
	if(target.addEventListener){//适用于W3C标准浏览器
		target.addEventListener(evtType,func,false);
	}else if(target.attachEvent){//适用于IE浏览器
		target.attachEvent('on'+evtType,func);
	}else{//适用于不支持2级DOM的浏览器,使用0级DOM,并且避免被覆盖
		var oldfunc = target['on'+evtType];
		target['on'+evtType] = oldfunc ? function(){oldfunc();func()} : func;
	}
}

//同步请求
function sendRequest(url,postData){
	var req = 0;
	var XMLHttpFactories = [
		function(){return new XMLHttpRequest()},
		function(){return new ActiveXObject("Msxml2.XMLHTTP")},
		function(){return new ActiveXObject("Msxml3.XMLHTTP")},
		function(){return new ActiveXObject("Microsoft.XMLHTTP")}
	];
	for(var i=0;i<XMLHttpFactories.length;i++){
		try{
			req = XMLHttpFactories[i]();
		}catch(e){
			continue;
		}
		break;
	}
	if(!req) return;
	var method = (postData) ? "POST":"GET";
	req.open(method,url,false);//同步请求
	req.setRequestHeader("CONTENT-TYPE","charset=gb2312");
	req.send();
	return req;
}

//每次需要的时候自动生成 形式是 farmKey=fd73ecbbd8501a1baa551cc5f774827c&farmTime=1247637920
function getKey(){
	var farmTime = new Date();
	farmTime = Math.floor(farmTime.getTime()/1000);
	var key = "sdoit78sdopig7w34057";
	var farmKey = hex_md5(farmTime + key.substr(parseInt(farmTime) % 10, 20));
	key = "farmKey=" + farmKey + "&farmTime=" + farmTime;
	return key;
}

//生成指定数字范围内的一个整数
function numBetween(a,b){
	return a + Math.floor(Math.random()*(b-a));
}

//把字符全部编码成%AE%3C%AC的形式
function encodeAll(str){
	str = encodeURIComponent(str);
	return str.replace(/[!'()*-._~]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
}

//把字符全部编码成%u3389%2C的形式
function escapeAll(str){
	str = escape(str);
	return str.replace(/[*+-./@_]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
}


//添加元素的一个class属性
function addClassName(e,name){
	var oName = e.className;
	var reg = new RegExp('^'+name+'$|^'+name+'\\s|\\s'+name+'$|\\s'+name+'\\s');
	
	//如果元素没有这个class属性则添加上去
	if(!reg.test(oName)){
		name = oName ? oName+' '+name : name;
		e.className = name;
	}
}

//去掉元素的一个class属性
function removeClassName(e,name){
	var oName = e.className;
	var reg = new RegExp(name+'\\s?|\\s?'+name);
	e.className = oName.replace(reg,'');
}

//tab切换
function tabs(navs,elms,className){

	//如果两者都是数组且长度相等才开始做事情
	if(navs instanceof Array && elms instanceof Array && navs.length == elms.length){
		for(var i=0;i<navs.length;i++){
			nav[i].onclick = (function(j){
				return function(){
					for(var i=0;i<elms.length;i++)
						i==j ? addClassName(elms[i],className) : removeClassName(elms[i],className);
				}
			})(i);
		}
	}
}

//设置失去焦点并无返回值
function void0(){this.blur();return false;}

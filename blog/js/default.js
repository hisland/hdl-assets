/*============================================================
	this js collected and powerd by hisland
	version 0.0.0.4 2009.5.11
	http://www.hisland.cn/
============================================================*/

//使用$(id)获取元素,来自prototype.js
function $(element) {//使用$(id)获取元素,来自prototype.js
	if (arguments.length > 1) {
		for (var i = 0, elements = [], length = arguments.length; i < length; i++)
			elements.push($(arguments[i]));
		return elements;
	}
	if (typeof element == 'string')
		element = document.getElementById(element);
	return element;
}

//添加onload事件,只需在需要添加的相应函数后面使用该函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
//2级DOM事件模型
function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {//适用于FF
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {//适用于IE
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {//都不行就使用0级DOM模型
        oTarget["on" + sEventType] = fnHandler;
    }
}

//此函数是上面2个函数和组合,首选使用2级DOM,如果都没有才使用0级DOM
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

//把一个元素添加到目标元素的后面,insertBefore的增强版
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


//--以下3个函数来自PPK谈JS,建立XMLHTTP对象并获取数据--
var XMLHttpFactories = [
	function(){return new XMLHttpRequest()},//标准对象
	function(){return new ActiveXObject("Msxml2.XMLHTTP")},//微软的activex插件,顺序创建,直到成功
	function(){return new ActiveXObject("Msxml3.XMLHTTP")},
	function(){return new ActiveXObject("Microsoft.XMLHTTP")}
];
function createXMLHTTPObject(){
	var xmlhttp = false;
	for(var i=0;i<XMLHttpFactories.length;i++){
		try{
			xmlhttp = XMLHttpFactories[i]();
		}catch(e){
			continue;
		}
		break;
	}
	return xmlhttp;
}
function sendRequest(url,callback,postData){
	var req = createXMLHTTPObject();
	if(!req) return;
	var method = (postData) ? "POST":"GET";
	req.open(method,url,true);
	req.setRequestHeader('User-Agent','XMLHTTP');
	if(postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function(){
		if(req.readyState != 4) return;
		if(req.status != 200 && req.status != 304){
			alert('HTTP error '+req.status);
			return;
		}
		callback(req);
	}
	if(req.readyState == 4) return;
	req.send(postData);
}

//复制函数,需要_clipboard.swf保证兼容
function copyValue(value){
	if(window.clipboardData){
		window.clipboardData.setData('Text',value);
	}else{
		if(!document.getElementById('flashcopier')){
			var flashcopier = document.createElement('div');
			flashcopier.id = 'flashcopier';
			document.body.appendChild(flashcopier);
		}
		document.getElementById('flashcopier').innerHTML = '<embed src="_clipboard.swf" FlashVars="clipboard='+escape(value)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
	}
}

//此函数是兼容IE,FF的下一个兄弟节点的
function next(e){
	if(!e) return;
	do e = e.nextSibling;
	while(e && e.nodeType != 1)
	return e;
}

//此函数给元素设置两个属性,分别是它们在文档的左上角的距离
function getPos(e){
	var p = e;
	e.left = e.top = 0;
	while(p.offsetParent){
		e.left += p.offsetLeft;
		e.top += p.offsetTop;
		p = p.offsetParent;
	}
}
//获取鼠标的位置信息
function getMousePos(evt){
	if(evt.pageX)//此为标准浏览器使用
		return {x:evt.pageX,y:evt.pageY};
	else{//此为IE浏览器使用
		var body = document.documentElement;
		return {
			x:evt.clientX + body.scrollLeft - body.clientLeft,
			y:evt.clientY + body.scrollTop - body.clientTop
		}
	}
}

var Handler = {};
if(document.addEventListener){//W3C事件模型注册
	Handler.add = function(elm,evtType,handler){
		elm.addEventListener(evtType,handler,false);
	};
	Handler.remove = function(elm,evtType,handler){
		elm.removeEventListener(evtType,handler,false);
	};
}else if(document.attachEvent){
	Handler.add = function(elm,evtType,handler){
		if(Handler._find(elm,evtType,handler) != -1) return;
		var wrappedHandler = function(e){
			e = e || window.event;
			var event = {
				_event:e,
				type:e.type,
				target:e.srcElement,//此为发生事件的元素
				currentTarget:elm,//此为定义事件处理函数的元素
				relatedTarget:e.fromElement || e.toElement || null,//对于mouseover,是鼠标离开的那个节点fromElement,对于mouseout,是鼠标进入的节点toElement,对于其它事件没有用,返回null
				eventPhase:(e.srcElement == elm)?2:3,

				//鼠标和屏幕信息
				clientX:e.clientX,clientY:e.clientY,
				screenX:e.screenX,screenY:e.screenY,

				//按键信息
				altKey:e.altKey,ctrlKey:e.ctrlKey,
				shiftKey:e.shiftKey,charCode:e.keyCode,

				//事件阻止
				stopPropagation:function(){this._event.cancelBubble = true},
				preventDefault:function(){this._event.returnValue = false}
			}
			if(Function.prototype.call)
				handler.call(elm,event);
			else{
				elm._currentHandler = handler;
				elm._currentHandler(event);
				elm._currentHandler = null;
			}
		};
		elm.attachEvent('on'+evtType,wrappedHandler);
		var h = {
			elm:elm,
			evtType:evtType,
			handler:handler,
			wrappedHandler:wrappedHandler
		};
		var d = elm.document || elm;
		var w = d.parentWindow;
		var id = Handler._uid();
		if(!w._allHandlers) w._allHandlers = {};
		w._allHandlers[id] = h;
		if(!elm._handlers) elm._handlers = [];
		elm._handlers.push(id);
		if(!w._onunloadHandlerRegistered){
			w._onunloadHandlerRegistered = true;
			w.attachEvent('onunload',Handler._removeAllHandlers);
		}
	};
	Handler.remove = function(elm,evtType,handler){
		var i = Handler._find(elm,evtType,handler);
		if(i == -1) return;
		var d = elm.document || elm;
		var w = d.parentWindow;
		var handlerId = elm._handlers[i];
		var h = w._allHandlers[handlerId];
		elm.detachEvent('on'+evtType,h.wrappedHandler);
		elm._handlers.splice(i,1);
		delete w._allHandlers[handlerId];
	};
	Handler._find = function(elm,evtType,handler){
		var handlers = elm._handlers;
		if(!handlers) return -1;
		var d = elm.document || elm;
		var w = d.parentWindow;
		for(var i=handlers.length-1;i>=0;i--){
			var handlerId = handlers[i];
			var h = w._allHandlers[handlerId];
			if(h.evtType == evtType && h.handler == handler)
				return i;
		}
		return -1;
	};
	Handler._removeAllHandlers = function(){
		var w = this;
		for(id in w._allHandlers){
			var h = w._allHandlers[id];
			h.elm.detachEvent('on'+h.evtType,h.wrappedHandler);
			delete w._allHandlers[id];
		}
	};
	Handler._counter = (function(){var i=0;return function(){return i++}})();
	Handler._uid = function(){return 'h'+Handler._counter()};
}
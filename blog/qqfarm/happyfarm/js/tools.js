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

//给字符串加上去左,右,首尾空格的方法
String.prototype.lTrim = function(){return this.replace(/^\s*/,'')}
String.prototype.rTrim = function(){return this.replace(/\s*$/,'')}
String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,'')}

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

//替换元素的一个class属性
function changeClassName(e,old,name){
	var oName = e.className;
	e.className = oName.replace(old,name);
}

//tab切换
function tabs(navs,elms,className){
	for(var i=0;i<navs.length;i++){
		navs[i].onclick = (function(j){
			return function(){
				for(var i=0;i<elms.length;i++)
					i==j ? (addClassName(elms[i],className),addClassName(navs[i],className)) : (removeClassName(elms[i],className),removeClassName(navs[i],className));
			}
		})(i);
	}
}

//设置失去焦点并无返回值
function void0(){this.blur();return false;}

//新建一个标签
function makeTag(tag,text,id,className){
	var tag = document.createElement(tag);
	if(typeof text == 'string' || typeof text == 'number'){
		tag.innerHTML = text;
	}else if(text.constructor == Array){
		for(var i=0;i<text.length;i++){
			tag.appendChild(text[i]);
		}
	}else{
		throw '标签'+tag+'#'+id+'.'+className+'内容不是文本也不是元素数组,没有添加';
	}
	if(id) tag.id = id;
	if(className) addClassName(tag,className);
	return tag;
}



//浏览器名称及版本,放在window.ua下
(function(){
	window.ua = {};
	var str = navigator.userAgent;
	var s;
	(s = str.match(/msie ([\d.]+)/i))?ua.ie = s[1]:
	(s = str.match(/firefox\/([\d.]+)/i))?ua.firefox = s[1]:
	(s = str.match(/chrome\/([\d.]+)/i))?ua.chrome = s[1]:
	(s = str.match(/opera\/([\d.]+)/i))?ua.opera = s[1]:
	(s = str.match(/version\/([\d.]+).*safari/i))?ua.safari  = s[1]:0;
})();

//颜色类,包含rgb值
function Color(){
	var args = arguments;
	
	if(args.length == 1){
		//是#aaafff形式
		if((/^#[\da-f]{6}$/i).test(args[0])){
			this.parseRgb(args[0]);

		//是#f00形式
		}else if((/^#[\da-f]{3}$/i).test(args[0])){
			args[0] = args[0].replace(/([\da-f])/gi,'$1$1');
			this.parseRgb(args[0]);

		//是rgb(255,255,255)形式
		}else if((/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/i).test(args[0])){
			var aa = args[0].match(/\d{1,3}/g);
			args.length = 3;
			args[0] = parseInt(aa[0],10);
			args[1] = parseInt(aa[1],10);
			args[2] = parseInt(aa[2],10);
		
		//是颜色名称表示
		}else if((/^[a-z]{3,11}$/i).test(args[0])){
			for(var i=0;i<Color.NtoH.length;i++){
				if(args[0] == Color.NtoH[i][0]){
					this.parseRgb(Color.NtoH[i][1]);
				}
			}
			if(!this.hasOwnProperty('r'))
				throw '颜色参数 '+args[0]+' 可能不在对换列表中,请使用常用的颜色名称!';
		}else{
			throw '颜色参数 '+args[0]+' 可能不正确,请检查!';
		}
	}

	//RGB3数字表示
	if(args.length == 3){
		for(var i=0;i<args.length;i++){
			if(args[i]>255 || args[i]<0)
				throw '颜色参数 '+args[0]+','+args[1]+','+args[2]+' 可能不正确,请检查!';
		}
		this.r=args[0];
		this.g=args[1];
		this.b=args[2];
	}
}
//颜色名称对照表
Color.NtoH = [['red','#ff0000'],['green','#008000'],['blue','#0000ff'],['yellow','#ffff00'],['purple','#800080'],['gray','#808080'],['silver','#c0c0c0'],['pink','#ffc0cb'],['black','#000000'],['white','#ffffff'],['lime','#00ff00'],['aqua','#00ffff'],['fuchsia','#ff00ff'],['teal','#008080'],['maroon','#800000'],['olive','#808000']];
Color.prototype.parseRgb = function(hex){
	this.r = parseInt(hex.substr(1,2),16);
	this.g = parseInt(hex.substr(3,2),16);
	this.b = parseInt(hex.substr(5,2),16);
}
//转换成HEX字符串#ff00cc
Color.prototype.toHex = function(){
	var sr = this.r.toString(16);
	var sg = this.g.toString(16);
	var sb = this.b.toString(16);
	if(sr.length==1){sr="0"+sr};
	if(sg.length==1){sg="0"+sg};
	if(sb.length==1){sb="0"+sb};
	return "#"+sr+sg+sb;
}
//转换成RGB字符串rgb(254,33,58)
Color.prototype.toRgb = function(){return 'rgb('+this.r+','+this.g+','+this.b+')';}


//褪色类,可设置褪色类型(背景,字体颜色,透明度),褪色速度,褪色开关,自定义速度函数
//参数形式('elmid','red',{from:'green',speed:80})
function Fade(elm,from,to,args){
/*args是一个对象包含可能值:
	to		:	如果直接褪色到to值,需要在此设定,否则被视为from
	type	:	变色类型,有alpha,color,backgroundColor三个可选
	speed	:	变色速度,默认50ms
	toggle	:	开关,控制是否变色后又变回
	method	:	自定义变化速度函数
*/
	//检查元素
	if(typeof elm == 'string') elm = document.getElementById(elm);
	if(typeof elm != 'object') throw '没有找到要变色的元素';

	//设置了一个颜色为目标色
	if(to instanceof Object){
		args = to;
		to = undefined;

	//没有设置颜色则为褪掉颜色
	}else if(from instanceof Object){
		args = from;
		to = undefined;
		from = undefined;
	}

	//设置一系列可能参数
	var type = 'backgroundColor';
	var speed = 10;
	var toggle = 0;
	var method = function(a,b){return (a-b>0) ? Math.ceil((a-b)/50) : Math.floor((a-b)/50)}
	if(args){
		to = args.to || to;
		type = args.type || type;
		speed = args.speed || speed;
		toggle = args.toggle ? 1 : 0;
		method = args.method || method;
	}
	var temp;
	//颜色
	if(type != 'alpha'){
		//对没有from或者to做初始化
		var tmpc,tmpe;
		if(!from || !to){
			tmpe = elm;
			do{
				if(tmpe.currentStyle) tmpc = tmpe.currentStyle.backgroundColor;
				else if(window.getComputedStyle) tmpc = window.getComputedStyle(tmpe,null).backgroundColor;
				if(!from && tmpc != 'transparent'){
					from = tmpc;
				}else if(tmpe != elm && !to && tmpc != 'transparent'){
					to = tmpc;
					break;
				}
				if(tmpe.nodeName == 'HTML') break;
			}while(tmpe = tmpe.parentNode);
			from = from || '#fff';
			to = to || '#fff';
		}

		try{
			temp = new Color(from);
			from = new Color(from);
			to = new Color(to);
		}catch(e){
			alert(e);
		}
	}
	//透明度
	else{
		//IE使用滤镜
		if(ua.ie){
			type = 'filter';
		//标准浏览器则使用CSS3属性:opacity
		}else{
			type = 'opacity';
		}
		from *= 100;
		to *= 100;
		temp = from;
	}

	function appendColor(){
		var colorString;
		if(!(/opacity|filter/).test(type)){
			colorString = temp.toHex();
			//将样式加到元素上
			elm.style[type] = colorString;

			//如果没有褪色完毕,则计时
			if(!(temp.r==to.r && temp.g==to.g && temp.b==to.b)){setTimeout(appendColor,speed)}

			//设置增量
			temp.r -= method(temp.r,to.r);
			temp.g -= method(temp.g,to.g);
			temp.b -= method(temp.b,to.b);
			if(toggle && temp.r==to.r && temp.g==to.g && temp.b==to.b){to = from}
			if((!toggle || to == from) && temp.r==to.r && temp.g==to.g && temp.b==to.b){elm.style[type] = 'transparent'}
		}else{
			colorString = ua.ie ? 'alpha(opacity='+temp+')' : temp/100;

			//将样式加到元素上
			elm.style[type] = colorString;

			//如果没有褪色完毕,则计时
			if(temp != to){setTimeout(appendColor,50)}

			//设置增量
			temp -= method(temp,to);
			if(toggle && temp==to){to = from}
		}
	}
	appendColor();
}


//读写本地文件类
(function(){

	//fileName 是相对于当前文件的相对路径,如 user/userid/user.xml
	window.file = function(fileName){
		return new init(fileName);
	}
	function init(fileName){
		//获取文件相对于此文件的目录
		var root =decodeURI(window.location.href);
		this.root = root = root.substring(8,root.lastIndexOf('/')+1);

		//相关参数
		var path = this.path = root + fileName;
		var fso = this.fso = createFso();
		var file;
		var temp;

		//打开文件就已读取内容
		if(fso.FileExists(path)){
			file = fso.OpenTextFile(path,1);
			this.content = file.AtEndOfStream ? '' : file.ReadAll();
		
		//文件不存在则建立
		}else if(confirm('文件不存在,是否要创建?')){
			temp = fileName.substring(0,root.lastIndexOf('/')).split('/');
			path = root;
			for(var i=0;i<temp.length-1;i++){
				path += temp[i]+'/';
				if(!fso.FolderExists(path)){
					fso.CreateFolder(path);
				}
			}
			path += temp[temp.length-1];
			
			file = fso.CreateTextFile(path,true);
			this.content = '';
		}
		else{
			alert('要打开的文件不存在');
		}
		file.Close();
	}

	//建立FSO
	function createFso(){
		var fso = '';
		try{
			fso = new ActiveXObject('scripting.fileSystemObject');
		}catch(e){
			alert("你必须点击【是】才能使用文件操作");
			return createFso();
		}
		if(fso) return fso;
		else alert('不能建立FSO');
	}
	//建立CMD
	function createCMD(){
		var cmd = '';
		try{
			cmd = new ActiveXObject('WScript.Shell');
		}catch(e){
			alert("你必须点击【是】才能使用文件操作");
			return createCMD();
		}
		if(cmd) return cmd;
		else alert('不能建立CMD');
	}

	//保存内容到文件,如文件已存在需要确认
	init.prototype.save = function(content){
		var file = this.fso.OpenTextFile(this.path,2,true);
		if(confirm('文件会被覆盖,是否继续?')){
			file.Write(content);
		}
		file.Close();
	}

	//删除文件,需要确认
	init.prototype.del = function(){}

	//移动文件,需要确认
	init.prototype.move = function(to){}

	//重写文件类的toString方法
	init.prototype.toString = function(){
		return this.content;
	}
})();


//XHR请求,对象方式
(function(){

//注册到window下,方便调用
window.sendRequest = function(url){
	return new init(url);
}
var XMLHttpFactories = [
	function(){return new XMLHttpRequest()},
	function(){return new ActiveXObject("Msxml2.XMLHTTP")},
	function(){return new ActiveXObject("Msxml3.XMLHTTP")},
	function(){return new ActiveXObject("Microsoft.XMLHTTP")}
];

function init(url){
	this.info = {async:true,
				 post:'',
				 callback:'',
				 checker:function(){
					if(this.req.status == 200 || this.req.status == 304){
						if(this.info.callback)
							this.info.callback(this.req);
						else
							return this.req;
					}else{
						throw 'HTTP Error: ' + this.req.status;
					}
				 },
				 header:[]
				 }
	this.url = url;
	this.getReq();
}
init.prototype = {
	//建立XHR对象
	getReq:function(){
		for(var i=0;i<XMLHttpFactories.length;i++){
			try{
				this.req = XMLHttpFactories[i]();
			}catch(e){
				continue;
			}
			break;
		}
	},

	//设置同步或者异步
	async:function(flag){
		if(flag) this.info.async = true;
		else this.info.async = false;
		return this;
	},
	//增加请求的POST数据
	post:function(data){
		if(data) this.info.post += this.info.post ? ('&'+data) : data;
		return this;
	},
	//设置请求的回调函数
	callback:function(func){
		if(typeof func == 'function') this.info.callback = func;
		return this;
	},
	//检查函数,可自定义
	checker:function(func){
		if(typeof func == 'function') this.info.checker = func;
		return this;
	},
	//设置请求头
	header:function(mime){
		if(mime.constructor == Array) this.info.header.push(mime);
		return this;
	},
	//发送请求,要发送请求都需要使用这个函数
	send:function(){
		var method = this.info.post ? "POST":"GET";
		this.info.async = this.info.callback ? this.info.async : false;
		this.req.open(method,this.url,this.info.async);

		//使用者设置的mime头
		for(var i=0;i<this.info.header.length;i++)
			this.req.setRequestHeader(this.info.header[i][0],this.info.header[i][1]);

		//POST方式需要的mime头
		if(this.info.post)
			this.req.setRequestHeader('Content-type','application/x-www-form-urlencoded');

		if(confirm(this.url + '-----' + this.info.post)) return;

		//提交请求,异步或者同步
		if(this.info.async){
			this.req.onreadystatechange = (function(self){
				return function(){
					if(self.req.readyState == 4){
						self.info.checker.call(self);
					}
				}
			})(this);
			this.req.send(this.info.post);
		}else{
			this.req.send(this.info.post);
			return this.info.checker.call(this);
		}
	}}
init.prototype.constructor = init;
})();


//获取元素相对元素或文档位置
function getPos(e,p){
	var bigp = document.documentElement || document.body;
	p = p || bigp;
	var left = 0;
	var top = 0;
	while(e.offsetParent && e.offsetParent != p){
		left += e.offsetLeft;
		top += e.offsetTop;
		e = e.offsetParent;
	}
	left += e.offsetLeft;
	top += e.offsetTop;
	return {x:left,y:top};
}

//获取鼠标相对文档位置
function getMousePos(ev){
	ev = ev || window.event;
	if(ev.pageX)//此为标准浏览器使用
		return {x:ev.pageX,y:ev.pageY};
	else{//此为IE浏览器使用
		var body = document.documentElement;
		return {
			x:ev.clientX + body.scrollLeft - body.clientLeft,
			y:ev.clientY + body.scrollTop - body.clientTop
		}
	}
}

//获取鼠标相对元素位置
function getMouseOffset(obj, ev){
	ev = ev || window.event;
	var docPos    = getPos(obj);
	var mousePos  = getMousePos(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
} 

//移动一个元素(获取事件,移动元素)
function drag(getobj,obj){
	var dragObj = obj || getobj;
	var stop = 1;
	var mouseOffset = {};
	var mousePos = {};
	var pOffset = {};
	getobj.onmousedown = function(ev){
		stop = 0;
		mouseOffset = getMouseOffset(dragObj,ev);
		mousePos = getMousePos(ev);
		pOffset = getPos(dragObj,$('wrap'));
		$('move_escape').style.display = 'block';
		$('move_escape').style.top = mouseOffset.y - 100+'px';
		$('move_escape').style.left = mouseOffset.x - 100+'px';
		return false;
	}
	$('move_escape').onmouseup = function(){stop = 1;$('move_escape').style.display = 'none';};
	document.onmousemove = function(ev){
		if(!stop){
			var detaPos = getMousePos(ev);
			dragObj.style.top = detaPos.y - mousePos.y + pOffset.y + 'px';
			dragObj.style.left = detaPos.x - mousePos.x + pOffset.x + 'px';
		}
	}
}
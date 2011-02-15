//ʹ��$(id)��ȡԪ��,����prototype.js
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

//���ַ�������ȥ��,��,��β�ո�ķ���
String.prototype.lTrim = function(){return this.replace(/^\s*/,'')}
String.prototype.rTrim = function(){return this.replace(/\s*$/,'')}
String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,'')}

//��Ԫ�����DOM�¼�����
function addEvent(target,evtType,func){
	if(target.addEventListener){//������W3C��׼�����
		target.addEventListener(evtType,func,false);
	}else if(target.attachEvent){//������IE�����
		target.attachEvent('on'+evtType,func);
	}else{//�����ڲ�֧��2��DOM�������,ʹ��0��DOM,���ұ��ⱻ����
		var oldfunc = target['on'+evtType];
		target['on'+evtType] = oldfunc ? function(){oldfunc();func()} : func;
	}
}

//ÿ����Ҫ��ʱ���Զ����� ��ʽ�� farmKey=fd73ecbbd8501a1baa551cc5f774827c&farmTime=1247637920
function getKey(){
	var farmTime = new Date();
	farmTime = Math.floor(farmTime.getTime()/1000);
	var key = "sdoit78sdopig7w34057";
	var farmKey = hex_md5(farmTime + key.substr(parseInt(farmTime) % 10, 20));
	key = "farmKey=" + farmKey + "&farmTime=" + farmTime;
	return key;
}

//����ָ�����ַ�Χ�ڵ�һ������
function numBetween(a,b){
	return a + Math.floor(Math.random()*(b-a));
}

//���ַ�ȫ�������%AE%3C%AC����ʽ
function encodeAll(str){
	str = encodeURIComponent(str);
	return str.replace(/[!'()*-._~]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
}

//���ַ�ȫ�������%u3389%2C����ʽ
function escapeAll(str){
	str = escape(str);
	return str.replace(/[*+-./@_]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
}


//���Ԫ�ص�һ��class����
function addClassName(e,name){
	var oName = e.className;
	var reg = new RegExp('^'+name+'$|^'+name+'\\s|\\s'+name+'$|\\s'+name+'\\s');
	
	//���Ԫ��û�����class�����������ȥ
	if(!reg.test(oName)){
		name = oName ? oName+' '+name : name;
		e.className = name;
	}
}

//ȥ��Ԫ�ص�һ��class����
function removeClassName(e,name){
	var oName = e.className;
	var reg = new RegExp(name+'\\s?|\\s?'+name);
	e.className = oName.replace(reg,'');
}

//�滻Ԫ�ص�һ��class����
function changeClassName(e,old,name){
	var oName = e.className;
	e.className = oName.replace(old,name);
}

//tab�л�
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

//����ʧȥ���㲢�޷���ֵ
function void0(){this.blur();return false;}

//�½�һ����ǩ
function makeTag(tag,text,id,className){
	var tag = document.createElement(tag);
	if(typeof text == 'string' || typeof text == 'number'){
		tag.innerHTML = text;
	}else if(text.constructor == Array){
		for(var i=0;i<text.length;i++){
			tag.appendChild(text[i]);
		}
	}else{
		throw '��ǩ'+tag+'#'+id+'.'+className+'���ݲ����ı�Ҳ����Ԫ������,û�����';
	}
	if(id) tag.id = id;
	if(className) addClassName(tag,className);
	return tag;
}



//��������Ƽ��汾,����window.ua��
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

//��ɫ��,����rgbֵ
function Color(){
	var args = arguments;
	
	if(args.length == 1){
		//��#aaafff��ʽ
		if((/^#[\da-f]{6}$/i).test(args[0])){
			this.parseRgb(args[0]);

		//��#f00��ʽ
		}else if((/^#[\da-f]{3}$/i).test(args[0])){
			args[0] = args[0].replace(/([\da-f])/gi,'$1$1');
			this.parseRgb(args[0]);

		//��rgb(255,255,255)��ʽ
		}else if((/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/i).test(args[0])){
			var aa = args[0].match(/\d{1,3}/g);
			args.length = 3;
			args[0] = parseInt(aa[0],10);
			args[1] = parseInt(aa[1],10);
			args[2] = parseInt(aa[2],10);
		
		//����ɫ���Ʊ�ʾ
		}else if((/^[a-z]{3,11}$/i).test(args[0])){
			for(var i=0;i<Color.NtoH.length;i++){
				if(args[0] == Color.NtoH[i][0]){
					this.parseRgb(Color.NtoH[i][1]);
				}
			}
			if(!this.hasOwnProperty('r'))
				throw '��ɫ���� '+args[0]+' ���ܲ��ڶԻ��б���,��ʹ�ó��õ���ɫ����!';
		}else{
			throw '��ɫ���� '+args[0]+' ���ܲ���ȷ,����!';
		}
	}

	//RGB3���ֱ�ʾ
	if(args.length == 3){
		for(var i=0;i<args.length;i++){
			if(args[i]>255 || args[i]<0)
				throw '��ɫ���� '+args[0]+','+args[1]+','+args[2]+' ���ܲ���ȷ,����!';
		}
		this.r=args[0];
		this.g=args[1];
		this.b=args[2];
	}
}
//��ɫ���ƶ��ձ�
Color.NtoH = [['red','#ff0000'],['green','#008000'],['blue','#0000ff'],['yellow','#ffff00'],['purple','#800080'],['gray','#808080'],['silver','#c0c0c0'],['pink','#ffc0cb'],['black','#000000'],['white','#ffffff'],['lime','#00ff00'],['aqua','#00ffff'],['fuchsia','#ff00ff'],['teal','#008080'],['maroon','#800000'],['olive','#808000']];
Color.prototype.parseRgb = function(hex){
	this.r = parseInt(hex.substr(1,2),16);
	this.g = parseInt(hex.substr(3,2),16);
	this.b = parseInt(hex.substr(5,2),16);
}
//ת����HEX�ַ���#ff00cc
Color.prototype.toHex = function(){
	var sr = this.r.toString(16);
	var sg = this.g.toString(16);
	var sb = this.b.toString(16);
	if(sr.length==1){sr="0"+sr};
	if(sg.length==1){sg="0"+sg};
	if(sb.length==1){sb="0"+sb};
	return "#"+sr+sg+sb;
}
//ת����RGB�ַ���rgb(254,33,58)
Color.prototype.toRgb = function(){return 'rgb('+this.r+','+this.g+','+this.b+')';}


//��ɫ��,��������ɫ����(����,������ɫ,͸����),��ɫ�ٶ�,��ɫ����,�Զ����ٶȺ���
//������ʽ('elmid','red',{from:'green',speed:80})
function Fade(elm,from,to,args){
/*args��һ�������������ֵ:
	to		:	���ֱ����ɫ��toֵ,��Ҫ�ڴ��趨,������Ϊfrom
	type	:	��ɫ����,��alpha,color,backgroundColor������ѡ
	speed	:	��ɫ�ٶ�,Ĭ��50ms
	toggle	:	����,�����Ƿ��ɫ���ֱ��
	method	:	�Զ���仯�ٶȺ���
*/
	//���Ԫ��
	if(typeof elm == 'string') elm = document.getElementById(elm);
	if(typeof elm != 'object') throw 'û���ҵ�Ҫ��ɫ��Ԫ��';

	//������һ����ɫΪĿ��ɫ
	if(to instanceof Object){
		args = to;
		to = undefined;

	//û��������ɫ��Ϊ�ʵ���ɫ
	}else if(from instanceof Object){
		args = from;
		to = undefined;
		from = undefined;
	}

	//����һϵ�п��ܲ���
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
	//��ɫ
	if(type != 'alpha'){
		//��û��from����to����ʼ��
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
	//͸����
	else{
		//IEʹ���˾�
		if(ua.ie){
			type = 'filter';
		//��׼�������ʹ��CSS3����:opacity
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
			//����ʽ�ӵ�Ԫ����
			elm.style[type] = colorString;

			//���û����ɫ���,���ʱ
			if(!(temp.r==to.r && temp.g==to.g && temp.b==to.b)){setTimeout(appendColor,speed)}

			//��������
			temp.r -= method(temp.r,to.r);
			temp.g -= method(temp.g,to.g);
			temp.b -= method(temp.b,to.b);
			if(toggle && temp.r==to.r && temp.g==to.g && temp.b==to.b){to = from}
			if((!toggle || to == from) && temp.r==to.r && temp.g==to.g && temp.b==to.b){elm.style[type] = 'transparent'}
		}else{
			colorString = ua.ie ? 'alpha(opacity='+temp+')' : temp/100;

			//����ʽ�ӵ�Ԫ����
			elm.style[type] = colorString;

			//���û����ɫ���,���ʱ
			if(temp != to){setTimeout(appendColor,50)}

			//��������
			temp -= method(temp,to);
			if(toggle && temp==to){to = from}
		}
	}
	appendColor();
}


//��д�����ļ���
(function(){

	//fileName ������ڵ�ǰ�ļ������·��,�� user/userid/user.xml
	window.file = function(fileName){
		return new init(fileName);
	}
	function init(fileName){
		//��ȡ�ļ�����ڴ��ļ���Ŀ¼
		var root =decodeURI(window.location.href);
		this.root = root = root.substring(8,root.lastIndexOf('/')+1);

		//��ز���
		var path = this.path = root + fileName;
		var fso = this.fso = createFso();
		var file;
		var temp;

		//���ļ����Ѷ�ȡ����
		if(fso.FileExists(path)){
			file = fso.OpenTextFile(path,1);
			this.content = file.AtEndOfStream ? '' : file.ReadAll();
		
		//�ļ�����������
		}else if(confirm('�ļ�������,�Ƿ�Ҫ����?')){
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
			alert('Ҫ�򿪵��ļ�������');
		}
		file.Close();
	}

	//����FSO
	function createFso(){
		var fso = '';
		try{
			fso = new ActiveXObject('scripting.fileSystemObject');
		}catch(e){
			alert("����������ǡ�����ʹ���ļ�����");
			return createFso();
		}
		if(fso) return fso;
		else alert('���ܽ���FSO');
	}
	//����CMD
	function createCMD(){
		var cmd = '';
		try{
			cmd = new ActiveXObject('WScript.Shell');
		}catch(e){
			alert("����������ǡ�����ʹ���ļ�����");
			return createCMD();
		}
		if(cmd) return cmd;
		else alert('���ܽ���CMD');
	}

	//�������ݵ��ļ�,���ļ��Ѵ�����Ҫȷ��
	init.prototype.save = function(content){
		var file = this.fso.OpenTextFile(this.path,2,true);
		if(confirm('�ļ��ᱻ����,�Ƿ����?')){
			file.Write(content);
		}
		file.Close();
	}

	//ɾ���ļ�,��Ҫȷ��
	init.prototype.del = function(){}

	//�ƶ��ļ�,��Ҫȷ��
	init.prototype.move = function(to){}

	//��д�ļ����toString����
	init.prototype.toString = function(){
		return this.content;
	}
})();


//XHR����,����ʽ
(function(){

//ע�ᵽwindow��,�������
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
	//����XHR����
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

	//����ͬ�������첽
	async:function(flag){
		if(flag) this.info.async = true;
		else this.info.async = false;
		return this;
	},
	//���������POST����
	post:function(data){
		if(data) this.info.post += this.info.post ? ('&'+data) : data;
		return this;
	},
	//��������Ļص�����
	callback:function(func){
		if(typeof func == 'function') this.info.callback = func;
		return this;
	},
	//��麯��,���Զ���
	checker:function(func){
		if(typeof func == 'function') this.info.checker = func;
		return this;
	},
	//��������ͷ
	header:function(mime){
		if(mime.constructor == Array) this.info.header.push(mime);
		return this;
	},
	//��������,Ҫ����������Ҫʹ���������
	send:function(){
		var method = this.info.post ? "POST":"GET";
		this.info.async = this.info.callback ? this.info.async : false;
		this.req.open(method,this.url,this.info.async);

		//ʹ�������õ�mimeͷ
		for(var i=0;i<this.info.header.length;i++)
			this.req.setRequestHeader(this.info.header[i][0],this.info.header[i][1]);

		//POST��ʽ��Ҫ��mimeͷ
		if(this.info.post)
			this.req.setRequestHeader('Content-type','application/x-www-form-urlencoded');

		if(confirm(this.url + '-----' + this.info.post)) return;

		//�ύ����,�첽����ͬ��
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


//��ȡԪ�����Ԫ�ػ��ĵ�λ��
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

//��ȡ�������ĵ�λ��
function getMousePos(ev){
	ev = ev || window.event;
	if(ev.pageX)//��Ϊ��׼�����ʹ��
		return {x:ev.pageX,y:ev.pageY};
	else{//��ΪIE�����ʹ��
		var body = document.documentElement;
		return {
			x:ev.clientX + body.scrollLeft - body.clientLeft,
			y:ev.clientY + body.scrollTop - body.clientTop
		}
	}
}

//��ȡ������Ԫ��λ��
function getMouseOffset(obj, ev){
	ev = ev || window.event;
	var docPos    = getPos(obj);
	var mousePos  = getMousePos(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
} 

//�ƶ�һ��Ԫ��(��ȡ�¼�,�ƶ�Ԫ��)
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
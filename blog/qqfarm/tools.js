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

//ͬ������
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
	req.open(method,url,false);//ͬ������
	req.setRequestHeader("CONTENT-TYPE","charset=gb2312");
	req.send();
	return req;
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

//tab�л�
function tabs(navs,elms,className){

	//������߶��������ҳ�����Ȳſ�ʼ������
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

//����ʧȥ���㲢�޷���ֵ
function void0(){this.blur();return false;}

//-------------------------------------------------copyright by hisland
function addLoadEvent(func){//添加onload事件,只需在需要添加的相应函数后面使用该函数
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
//-------------------------------------------------
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
//-------------------------------------------------
function doClick(elm){//模拟用户点击
	if(elm.click) elm.click();//此用于IE
	if(document.createEvent){ //此用于FF
		var evObj = document.createEvent('MouseEvents');
		evObj.initEvent( 'click', false, false );
		elm.dispatchEvent(evObj);
	}
}
//-------------------------------------------------
function addEvent(elm,evType,fn,useCapture){//添加事件处理函数
	if(elm.addEventListener){
		elm.addEventListener(evType,fn,useCapture);
		return true;
	}else if(elm,attachEvent){
		var r = elm.attachEvent('on' + evType,fn);
		return r;
	}else{
		elm['on' + evType] = fn;
	}
}
//---------------------------------------------------getElementById("")//getElementsByTagName("")//alert("hello");
imgRoll = {
	timer : 2000,//默认自动滚动时间
	speed : 30,//滚动速度,数值越小越快
	clearA : function(){//检索出列表里所有A元素,并设置点击不跳转
		var elma = $("imgroll_list").getElementsByTagName("a");
		for(var i=0;i<elma.length;i++){
			elma[i].onclick = function(){
				this.blur();
				return false;
	}}},
	init : function(){
		imgRoll.clearA();
		imgRoll.setImg();
		imgRoll.setCtrl();
		imgRoll.auto();
	},
	roll : {//滚动函数
		init : function(elm){//初始化滚动高度并设置循环
			if(!elm.index) return;//没有设置索引,不执行
			if(elm.actTimer) clearInterval(elm.actTimer);//如果有计时则清除
			var topNeed = (elm.index - 3) * 44;//最小卷去高度
			var topMax = (elm.getElementsByTagName("img").length - 5)*44;//最大卷去高度
			if(topNeed < 0 ) topNeed = 0;
			if(topNeed > topMax) topNeed = topMax;
			elm.actTimer = setInterval(function(){imgRoll.roll.act(elm,topNeed)},imgRoll.speed);//循环
		},
		act : function(elm,topNeed){//滚动函数主体
			var topNow = elm.scrollTop;
			if(topNeed > topNow) elm.scrollTop += Math.ceil((topNeed - topNow)/5);//判断并向上滚动
			else if(topNeed < topNow) elm.scrollTop -= Math.ceil((topNow - topNeed)/5);//判断并向下滚动
			else clearInterval(elm.actTimer);//完成滚动
		}
	},
	auto : function(){
		var elm = $("imgroll_list");
		var list = $("imgroll_list").getElementsByTagName("img");
		if(!elm.stop) elm.rollTimer = setInterval(function(){doClick(list[elm.index])},imgRoll.timer);
	},
	setImg : function(){//切换图片,就把它设置为当前
		var list = $("imgroll_list").getElementsByTagName("img");
		for(var i=0;i<list.length;i++){
			list[i].onclick = function(){
				$("imgroll_img").getElementsByTagName("img")[0].src = this.src;//设置左边的图片为当前图片
				$("imgroll_img").getElementsByTagName("a")[0].href = this.parentNode.href;//设置左边图片的链接为当前图片的链接
				$("imgroll_img").getElementsByTagName("a")[0].title = this.alt;//将链接标题设置为当前图片的说明文字
				var elm = $("imgroll_list");
				var list = $("imgroll_list").getElementsByTagName("img");
				for(var j=0;j<list.length;j++){
					if(list[j] == this){
						list[j].className = "imgroll_now";//设置当前图片
						if(j == list.length-1) elm.index = 0;
						else elm.index = j+1;
					}else{
						list[j].className = "";
					}
				}
				imgRoll.roll.init(elm);//此设置滚动
			}
			list[i].onmouseover = function(){$("imgroll_list").stop = true;clearInterval($("imgroll_list").rollTimer);}
			list[i].onmouseout = function(){$("imgroll_list").stop = false;imgRoll.auto();}
		}
		doClick(list[0]);
		var srcImg = $("imgroll_img").getElementsByTagName("img")[0];
		srcImg.onmouseover = function(){$("imgroll_list").stop = true;clearInterval($("imgroll_list").rollTimer);}
		srcImg.onmouseout = function(){$("imgroll_list").stop = false;imgRoll.auto();}
	},
	setCtrl : function(){
		var ctrl = $("imgroll_up","imgroll_down");
		ctrl[0].onmouseover = function(){
			this.oldSrc = this.src;
			this.src = this.src.replace(".gif","_on.gif");
			clearInterval($("imgroll_list").rollTimer);
		}
		ctrl[0].onmouseout = function(){
			this.src = this.oldSrc;
			imgRoll.auto();
		}
		ctrl[0].onclick = function(){
			var list = $("imgroll_list").getElementsByTagName("img");
			if($("imgroll_list").index-2 == -1){
				doClick(list[list.length-1]);
				$("imgroll_list").actTimer = setInterval(function(){imgRoll.roll.act($("imgroll_list"),(list.length-5)*44)},imgRoll.speed);
				return;
			}
			if($("imgroll_list").index-2 == -2) $("imgroll_list").index = list.length;
			doClick(list[$("imgroll_list").index-2]);
		}
		ctrl[1].onmouseover = function(){
			this.oldSrc = this.src;
			this.src = this.src.replace(".gif","_on.gif");
			clearInterval($("imgroll_list").rollTimer);
		}
		ctrl[1].onmouseout = function(){
			this.src = this.oldSrc;
			imgRoll.auto();
		}
		ctrl[1].onclick = function(){
			var list = $("imgroll_list").getElementsByTagName("img");
			doClick(list[$("imgroll_list").index]);
		}
	}
}
addLoadEvent(imgRoll.init);
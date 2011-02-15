/**********************************************************************************************
 * 在jq上放一个颜色构造函数,支持下列使用形式
 * 需要首先引入 jquery 脚本
 * 1个参数时:
 *		'#ffaa00'
 *		'#fa0'
 *		'rgb(15,16,17)'
 *		'rgb(15, 16, 17)' - 此为firefox生成颜色时的值,参数间有空格
 *		'red' - 常用的颜色名,下面的对应的列表,需要的可加
 * 3个参数时:
 *		155, 158, 138 - 应为正常的值,即每个值都在0-255间
 * 生成对象后:
 *		obj.toHex()可获得当前颜色的16进制表示:'#ffaa00'
 *		obj.toRgb()可获得当前颜色的16进制表示:'rgb(15,16,17)'
 *		obj.r\
 *		obj.g  --这3个分别对应颜色的RGB值
 *		obj.b/
 */

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
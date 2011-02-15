/**********************************************************************************************
 * 给jquery增加一些通用函数
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-7-5 15:59:32
 * 版本: v1
 *
 * 前置脚本:
 *			patch.javascript.js;
 *			jquery-1.4.2.min.js;
 *			
 */

(function($){

	//from到to由快到慢的增量函数,
	//返回当前from到to需要增加的数字(为负则是需要减去的数字,统一用加法)
	function tween(from,to,speed){
		speed = speed>10 ? speed : 10;
		return from>to ? Math.floor((to-from)/speed) : Math.ceil((to-from)/speed);
	}

	//from到to由快到慢的增量数组,
	//返回当前from到to需要增加的数字的列表(为负则是需要减去的数字,统一用加法)
	function tweenArr(from,to,speed){
		var arr = [];
		var tmp;
		while(from != to){
			tmp = tween(from,to,speed);
			arr.push(tmp);
			from += tmp;
		}
		return arr;
	}

	//返回false值的空函数
	function noopFalse(){
		return false;
	}

	/* 设置cookie */
	function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure){
		var sCookie = sName + '=' + encodeURIComponent(sValue);
		if(oExpires){
			sCookie += '; expires=' + oExpires.toGMTString();
		}
		if(sPath){
			sCookie += '; path=' + sPath;
		}
		if(sDomain){
			sCookie += '; domain=' + sDomain;
		}
		if(bSecure){
			sCookie += '; secure';
		}
		document.cookie = sCookie;
	}
	/* 获取cookie */
	function getCookie(sName){
		var sRE = '(?:; )?' + sName + '=([^;]*);?';
		var oRE = new RegExp(sRE);

		if(oRE.test(document.cookie)){
			return decodeURIComponent(RegExp['$1']);
		}else{
			return null;
		}
	}
	/* 获取cookie */
	function deleteCookie(sName, sPath, sDomain){
		setCookie(sName, '', new Date(0), sPath, sDomain);
	}

	//注册到jq命名空间上
	$.extend({
				 tween      : tween
				,tweenArr   : tweenArr
				,noopFalse  : noopFalse
				,setCookie  : setCookie
				,getCookie  : getCookie
				,deleteCookie  : deleteCookie
			})
})(jQuery);
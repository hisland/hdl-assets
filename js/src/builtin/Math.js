/**********************************************************************************************
 * 增强Math对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 *		var num = Math.random();		//得到原始的随机数
 *		var num = Math.random(100);		//得到0-100的随机数
 *		var num = Math.random(5, 100);	//得到5-100的随机数
 *		var num = Math.random(100, 5);	//得到5-100的随机数
 * 
 */

(function(){
	var oldRandom = Math.random;
	Math.random= function(from, to){
		var temp = 0, len = arguments.length;
		from -= 0;
		to -= 0;
		if(len === 0){
			return oldRandom();
		}else if(len === 1){
			if(isNaN(from)){
				alert('Math.random: from is error!');
				return null;
			}else{
				to = from;
				from = 0;
			}
		}else{
			if(isNaN(from) && isNaN(to)){
				alert('Math.random: from and to are error!');
				return null;
			}else if(isNaN(from)){
				from = 0;
			}else if(isNaN(to)){
				to = from;
				from = 0;
			}
		}
		if(from > to){
			temp = from;
			from = to;
			to = temp;
		}
		temp = to - from;
		temp = Math.round(oldRandom() * (temp+100) % temp);
		return from + temp;
	};
})();


/**********************************************************************************************
 * 增强Math对象方法
 */
//增强Math.random
//产生一个from 到 to的随机整数
(function(){
	var old = Math.random;
	Math.random= function(from, to){
		var temp = 0, len = arguments.length;
		from -= 0;
		to -= 0;
		if(len === 0){
			return old();
		}else if(len === 1){
			if(isNaN(from)){
				return old();
			}else{
				to = from;
				from = 0;
			}
		}else{
			if(isNaN(from) && isNaN(to)){
				return old();
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
		temp = Math.round(old() * (temp+100) % temp);
		return from + temp;
	};
})();
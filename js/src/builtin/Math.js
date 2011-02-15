//增强Math.random
//产生一个from 到 to的随机整数
(function(){
	var old = Math.random;
	Math.random= function(from, to){
		var temp = 0, len = arguments.length;
		if(len === 0){
			return old();
		}else if(len === 1){
			if(isNaN(from-0)){
				return old();
			}else{
				to = from;
				from = 0;
			}
		}else{
			if(isNaN(from-0) && isNaN(to-0)){
				return old();
			}else if(isNaN(from-0)){
				from = 0;
			}else if(isNaN(to-0)){
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
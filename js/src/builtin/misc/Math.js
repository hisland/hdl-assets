/**
 * @description 增强Math对象方法
 */

(function(){
	var oldRandom = Math.random;
	/**
	 * 修改了random方法, 可以传入from, to 得到范围内的整数
	 * <pre><code>
	 * API:
	 *		var num = Math.random();		//得到原始的随机数
	 *		var num = Math.random(100);		//得到0-100的随机数
	 *		var num = Math.random(5, 100);	//得到5-100的随机数
	 *		var num = Math.random(100, 5);	//得到5-100的随机数
	 * </code></pre>
	 */
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


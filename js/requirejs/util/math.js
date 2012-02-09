/**
 * math有用的工具
 */
define({
	/**
	 * 得到from, to范围内的整数
	 * <pre><code>
	 * API:
	 *	var num = Tools.random();		//得到原始的随机数
	 *	var num = Tools.random(100);	//得到0-100的随机数
	 *	var num = Tools.random(5, 100);	//得到5-100的随机数
	 *	var num = Tools.random(100, 5);	//得到5-100的随机数
	 * </code></pre>
	 * @param Number from
	 * @param Number to
	 * @return Number
	 */
	random: function(from, to){
		var temp = 0, len = arguments.length;
		from -= 0;
		to -= 0;
		if(len === 0){
			return Math.random();
		}else if(len === 1){
			if(isNaN(from)){
				return null;
			}else{
				to = from;
				from = 0;
			}
		}else{
			if(isNaN(from) && isNaN(to)){
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
		temp = Math.round(Math.random() * (temp+100) % temp);
		return from + temp;
	}
});

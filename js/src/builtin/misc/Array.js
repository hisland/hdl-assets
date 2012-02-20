/**
 * @description 数组对象方法
 * <pre><code>
 * API:
 *		var rs = [1,1,3].unique();	//rs为 [1,3]
 * </code></pre>
 */
(function(){
	/**
	 * 剔除数组里面的重复项, 仅能用于简单对象数组
	*/
	Array.prototype.unique = function(){
		this.sort();
		for(var i=1; i<this.length ; ){
			if(this[i] === this[i-1]){
				this.splice(i, 1);
				continue;
			}
			i++;
		}
		return this;
	};


	var t_array_rang = /^(\d+)\.\.(\d+)$/;
	/**
	 * 根据字符串'a..b'的形式生成从a-b的数字数组
	 * @param str 'a..b'形式, a,b为整数
	 */
	Array.fromString = function(str){
		var tmp = t_array_rang.exec(str), arr, from, to;
		if(tmp){
			arr = [], from = tmp[1]-0, to = tmp[2]-0;
			if(from < to){
				for(; from<=to; from++){
					arr.push(from);
				}
				return arr;
			}
		}
		return null;
	}
})();
/**********************************************************************************************
 * 给String 增加一个静态的 buffer 函数
 * 它返回一个对象,可以push N个字符串,并且最后可以join连接起来
 *
 * 用法:
 * var b = String.buffer(); 初始化一个buffer
 * b.push('this is a string') 一次传入1个string
 * b.push('this is a string', 'with 2 strings') 一次传入2个string
 * b.push('this is a string', 'with 2 strings', 'with 3 strings') 一次传入3个string
 * b.push('this is a string', 'with 2 strings', 'with 3 strings', ...) 一次传入N个string
 * var result = b.join(); 默认是,连接
 * var result = b.join('--'); 使用--连接
 * 
 * 内容缓存在 b.arr 数组里面
 * 
 */
(function(){
	function push(/* str1, str2, str3, ... */){
		var i = 0, a = arguments, l = a.length;
		for (; i < l; i++) {
			this.arr.push(a[i]);
		}
		return this;
	}
	function join(sep){
		return this.arr.join(sep);
	}

	String.buffer = function(){
		return {
			 arr: []
			,push: push
			,join: join
		};
	}
})();
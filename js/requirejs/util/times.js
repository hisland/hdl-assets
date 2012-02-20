/**
 * 执行次数
 */
define({
	/**
	 * 执行n次
	 * @param fn 需要执行的函数, 参数1接收第几次执行, 从0开始计数
	 * @param n 大于0的数字, 执行次数
	 */
	run: function(fn, n){
		for(var i=0; i<n; i++){
			fn(i);
		}
	},
	/**
	 * 延迟执行n次, 采用setTimeout保证串行执行
	 * @param fn 需要执行的函数, 参数1接收第几次执行, 从0开始计数
	 * @param n 大于0的数字, 执行次数
	 * @param delay 大于10的数字, 间隔时间,单位ms, 默认为10ms
	 */
	delay: function(fn, n, delay){
		var i = 0;
		delay = delay > 10 ? delay : 10;
		function callback(){
			if(i < n){
				fn(i);
				setTimeout(callback, delay);
			}
		}
		callback();
	}
});
define({
	/**
	 * 测试fn的执行时间
	 * @param {Function} fn
	 */
	runTime: function(fn){
		if(window.console && console.profile){
			console.profile(fn);
		}else{
			var t1 = new Date();
			fn();
			var t2 = new Date();
			alert(t2-t1);
		}
	}
});

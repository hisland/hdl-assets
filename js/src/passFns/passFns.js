/**********************************************************************************************
 * 测试value可否通过所有fns
 * 返回true | false表示是否全部通过
 *
 * 用法:
 * var fns = [fn1, fn2, fn3]; 初始化一个fns
 * passFns(fns, value) 测试是否全部通过
 * 
 */
(function(){
	function passFns(fns, value){
		var i = 0, len = fns.length, fn = fns[i], back = false;
		for (; i < len; fn = fns[++i]) {
			if(typeof fn === 'function' && fn(value)){
				back = true;
			}else{
				back = false;
				break;
			}
		}
		return back;
	}
	window.passFns = passFns;
})();
//注册全局变量
function laterTimer(func, delay, params){
	if(params){
		func = function(){
			func.apply(window, params);
		}
	}
	return setTimeout(func, delay*1000);
}

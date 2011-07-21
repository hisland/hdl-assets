/**********************************************************************************************
 * 名称: 工具集
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-07-06 11:30:39
 * 版本: v1
 * 
 * API:
 *		
 */

KISSY.add('Tools', function(S, undef) {
	var Tools = window.Tools = {};

	//执行n次
	Tools.doTimes = function(n ,fn){
		for(var i=0; i<n; i++){
			fn(i);
		}
	}

	//延迟执行n次
	Tools.delayTimes = function(n, fn, delay){
		var i = 0;
		delay -= 0;
		delay = delay > 10 ? delay : 10;
		function callback(){
			if(i < n){
				fn(i);
				setTimeout(callback, delay);
			}
		}
		callback();
	}

	//测试fn的执行时间
	Tools.runTime = function(fn){
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
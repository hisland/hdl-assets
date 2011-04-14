/**********************************************************************************************
 * 名称: 循环函数列表
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * 获得一个函数, 运行可执行里面的函数列表
 * 函数列表可增加,删除
 * 可自动循环执行,停止,并设置循环间隔
 * 默认自动生成了一个loopFuncs在全局上
 *
 * API:
 *	o = getLoopFuncs() 获得一个实例
 *	o = getLoopFuncs(fn) 获得一个实例并传入第一个函数
 *	o() 运行函数列表里面的每个函数
 *	o(fn) 运行函数列表里面的每个函数,并完成后回调fn
 *	o.add(fn) 同 o.add(fn, true) 添加函数并立即执行一次
 *	o.add(fn, false) 添加函数不立即执行
 *	o.remove(fn) 删除指定函数
 *	o.remove() 删除所有函数
 *	o.start() 开始自动运行
 *	o.stop() 停止自动运行
 *	o.interval(num) 设置间隔, 单位毫秒(ms)
 */

KISSY.add('loopFuncs', function(S, undef) {
	function getLoopFuncs(fn_first){
		var  _timer
			,_stopped = true
			,funcs = []
			,interval = 500;

		if(typeof fn_first === 'function'){
			funcs.push(fn_first);
		}
		function init(callback){
			for(var i=0; i < funcs.length; i++){
				funcs[i]();
			}
			if(typeof callback === 'function'){
				callback();
			}
		}
		function act(){
			if(!_stopped){
				_timer = setTimeout(function(){
					init(act);
				}, interval);
			}
		}
		init.add = function(fn, doit){
			doit = doit === false ? doit : true;
			var i=0, has=false;
			if(typeof fn === 'function'){
				for(; i < funcs.length; i++){
					if(funcs[i] === fn){
						has = true;
						break;
					}
				}
				if(!has){
					funcs.push(fn);
				}
				if(doit){
					fn();
				}
			}
		}
		init.remove = function(fn){
			var i=0;
			if(fn){
				for(; i < funcs.length; i++){
					if(funcs[i] === fn){
						funcs.splice(i, 1);
					}
				}
			}else{
				funcs.length = 0;
			}
		}
		init.start = function(){
			if(_stopped){
				_stopped = false;
				init(act);
			}
		}
		init.stop = function(){
			if(!_stopped){
				_stopped = true;
				clearTimeout(_timer);
			}
		}
		init.interval = function(delay){
			if(!isNaN(delay) && delay > 10){
				interval = delay-0;
			}
		}
		return init;
	}

	window.getLoopFuncs = getLoopFuncs;

	//默认初始化一个
	window.loopFuncs = getLoopFuncs();
});

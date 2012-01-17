/**
 * @fileOverview
 * @module mod-template
 * @author hisland hisland@qq.com
 * @description 增加数字对象方法
 * <pre><code>
 * API:
 *		5.doTimes(fn);	//执行fn5次, fn的第1个参数为n
 * </code></pre>
 */

Number.prototype.doTimes = function(fn){
	for(var i=0; i<this; i++){
		fn(i);
	}
}


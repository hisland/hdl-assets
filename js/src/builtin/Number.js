/**********************************************************************************************
 * 增加数字对象方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 *		5.doTimes(fn);	//执行fn5次, fn的第1个参数为n
 * 
 */

Number.prototype.doTimes = function(fn){
	for(var i=0; i<this; i++){
		fn(i);
	}
}


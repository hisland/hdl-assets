/**********************************************************************************************
 * 给javascript的内置函数的原型上增加一些方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-1-26 15:11:10
 * 版本: v1
 *
 *********************************************************************************************/

//返回当前毫秒数
function timestamp(){
	return new Date().valueOf();
}

//显示错误 - 并抛出异常
function sayError(message){
	if(window['console'] && console.error){
		console.error(message);
	}else{
		alert(message);
	}
	throw message;
}
//测试断言,失败抛异常
function assert(test, message){
	if(!test){
		sayError(message);
	}
}

//显示通知
function sayNotice(message){
	if(window['console'] && console.info){
		console.info(message);
	}else{
		alert(message);
	}
}
//测试提示,不正常给出提示
function notice(test, message){
	if(!test){
		sayInfo(message);
	}
}

//显示日志
function sayLog(message){
	if(window['console'] && console.log){
		console.log(message);
	}
}

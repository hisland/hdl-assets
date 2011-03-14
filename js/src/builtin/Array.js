/**********************************************************************************************
 * 
 * 增加数组对象方法
 * 
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 */

//剔除数组里面的重复项
Array.prototype.unique = function(){
	this.sort();
	for(var i=1; i<this.length ; ){
		if(this[i] === this[i-1]){
			this.splice(i, 1);
			continue;
		}
		i++;
	}
	return this;
};

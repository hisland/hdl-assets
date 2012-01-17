/**
 * @fileOverview
 * @module mod-template
 * @author hisland hisland@qq.com
 * @description 数组对象方法
 * <pre><code>
 * API:
 *		var rs = [1,1,3].unique();	//rs为 [1,3]
 * </code></pre>
 */

/**
 * 剔除数组里面的重复项
*/
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


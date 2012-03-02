/**
 * 自定义按钮对象
 * <pre><code>
 * 
 * </code></pre>
 */

define(['./week'], function(Week){
	return {
		init: function(setting){
			return new Week(setting);
		}
	};
});

/**********************************************************************************************
 * 名称: zIndex管理工具
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 * 		$.zindexManager.base 基础数字
 * 		$.zindexManager.up() 返回++base
 * 		$.zindexManager.down() 返回--base
 * 
 */

KISSY.add('zindexManager', function(S, undef) {
	jQuery.extend({
		zindexManager: {
			 base: 1000
			,up: function(){
				return ++this.base;
			}
			,down: function(){
				return --this.base;
			}
		}
	});
}, {
	requires: ['jquery-1.4.2']
});
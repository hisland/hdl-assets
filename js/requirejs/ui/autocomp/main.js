/**
 * <pre><code>
 * API:
 *		$('selecotr').autoComplete();
 * 
 * 2011-4-11 15:30:28
 *		数据html实体转义
 * 
 * 2011-5-24 17:44:39
 *		取内容传送
 *			将输入内容传送1
 *		取ID传送
 *			无输入传 - ''
 *			输入无选择无匹配 - 传 -1
 *			输入无选择有匹配 - 第一个完整匹配的ID
 *			输入并选择 - 选择的ID
 *			输入无匹配 - 传 -1
 * 
 * 2011-09-24 14:45:16
 *		自动完成匹配后再进行html实体转义,否则会出现实体内部字符被截断从而显示出实体编码的问题
 * 
 * </code></pre>
 */

define(['jquery', 'kissy', './autocomp'], function($, S, Autocomp){
	return {
		init: function(setting){
			return new Autocomp(setting);
		}
	};
});
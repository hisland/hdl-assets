/**
 * 弹出层管理工具 - 统一控制层级,遮罩
 * <pre><code>
 * API:
 * 		popManager.clean(true) 清除所有的弹出层包含块, 包括.not-remove的div
 * 		popManager.clean() 清除所有的弹出层包含块, 不会清除含.not-remove的div
 * 
 * 		p = popManager.init() 初始化一个弹出层包含块
 * 		p.front() 将此层放到最前面
 * 		p.show() 显示
 * 		p.hide() 隐藏
 * 		p.mask() 显示遮罩
 * 		p.demask() 隐藏遮罩
 * 		p.loading() 显示loading状态
 * 		p.loaded() 隐藏loading状态
 * 		p.remove() 删除此层
 * 
 * 		p.$div 最外层元素
 * 		p.$mask 遮罩元素 - css3使用的半透明背景,无此属性
 * 
 * TODO:
 * 		2011-08-09 09:15:49
 * 			IE6的内存泄露问题
 * 		2011-09-16 18:56:51
 * 			ESC隐藏控制
 * 		2012-01-16 11:18:21
 * 			弹出层需要禁止焦点跑到层后面去
 * </code></pre>
 */
define(['jquery', 'kissy', './pop-manager'], function($, S, PM){
	return {
		/**
		 * 清除所有的弹出层包含块
		 * @param {boolean} force 为true时强制删除所有,其它值不会删除.not-remove的层
		 * @return popManager
		 */
		clean: function(force){
			if(force === true){
				$('div.pop-manager-wrap').remove();
			}else{
				$('div.pop-manager-wrap').not('.not-remove').remove();
			}
			return this;
		},
		/**
		 * 初始化一个弹出层包含块
		 * @return popManager
		 */
		init: function(){
			return new PM();
		}
	};
});
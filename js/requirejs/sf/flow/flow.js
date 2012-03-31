/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	function Flow(){
		this.__init().__initEvent();
	}

	S.augment(Flow, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__init: function(){
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__initEvent: function(){
			return this;
		},
		/**
		 * 将某个div作为一个状态保存
		 * @param 
		 * @return 
		 */
		push: function(selector){
			return this;
		},
		/**
		 * 加载指定名字与url
		 * @param 
		 * @return 
		 */
		load: function(name, url){
			return this;
		},
		/**
		 * 返回上一个状态
		 * @param 
		 * @return 
		 */
		back: function(){
			return this;
		}
	});

	return Flow;
});
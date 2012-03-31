/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	return {
		/**
		 * 函数列表, 采用map结构存
		 * @type Array
		 */
		fns: {},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		run: function(){
			S.each(this.fns, function(v, i, o){
				v && v();
			});
		},
		/**
		 * 放入一个函数
		 * @param fn Function
		 * @return this
		 */
		put: function(fn){
			fn.id = S.guid('fns');
			this.fns[fn.id] = fn;
			return this;
		},
		/**
		 * 删除一个函数
		 * @param fn Function
		 * @return this
		 */
		remove: function(fn){
			delete this.fns[fn.id];
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		empty: function(){
			this.fns = {};
			return this;
		}
	};
});
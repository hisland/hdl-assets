/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	return {
		/**
		 * 函数列表
		 * @type Array
		 */
		fns: {},
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
		 * 开始计时
		 * @return this
		 */
		start: function(){
			if(!this.timer){
				//1秒的定时器
				this.timer = S.later(function(){
					S.each(this.fns, function(v, i, o){
						v && v();
					});
				}, 1000, true, this);
			}
			return this;
		},
		/**
		 * 停止计时
		 * @return this
		 */
		stop: function(){
			if(this.timer){
				this.timer.cancel();
				this.timer = null;
			}
			return this;
		}
	};
});
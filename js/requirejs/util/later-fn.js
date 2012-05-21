/**
 * 延迟执行函数的工具
 */
define(['kissy'], function(S){
	/**
	 * 过一会儿执行函数,且在执行之前可以重新设置函数与延迟并重新开始计时
	 * @class 
	 * @memberOf util
	 * @param fn 需要执行的函数
	 * @param delay 大于50的数字, 间隔时间,单位ms, 默认为50ms
	 */
	function laterOne(fn, delay){
		this.fn = fn;
		this.delay = delay;
	}
	/**
	 * @lends util.laterOne#
	 */
	S.augment(laterOne, {
		/**
		 * 开始
		 */
		start: function (){
			if(!this._timer){
				this._timer = S.later(function(){
					this.fn();
				}, this.delay, false, this);
			}
			return this;
		},
		/**
		 * 停止
		 */
		stop: function (){
			this._timer.cancle();
			delete this._timer;
			return this;
		},
		/**
		 * 设置执行的函数, 停止上一个函数并重新开始计时
		 * @param fn 需要执行的函数
		 */
		setFn: function (fn){
			this.fn = fn;
			this.stop().start();
			return this;
		},
		/**
		 * 设置执行的延迟, 停止并重新开始计时
		 * @param fn 延迟,正整数,单位ms
		 */
		setDelay: function (delay){
			delay = delay > 30 ? delay : 30;
			this.delay = delay;
			this.stop().start();
			return this;
		}
	});

	return {
		laterOne: function(fn, delay){
			return new laterOne(fn, delay);
		}
	};
});
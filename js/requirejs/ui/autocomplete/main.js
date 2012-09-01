define(function(require, exports, module){
	require('css!./main');

	/**
	 * @lends ui.Popwin
	 */
	return {
		/**
		 * 初始化一个弹出层
		 * @return ui.popwin
		 */
		init: function(config){
			var o = {};
			require('./initConfig')(o, config);
			require('./initProto')(o);
			require('./initDOM')(o);
			return o;
		}
	};
});
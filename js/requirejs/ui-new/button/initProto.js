define(['jquery', 'kissy'], function($, S){
	/**
	 * @lends ui.Popwin#
	 */
	var Proto = {
		/**
		 * 设置样式
		 * @param str String
		 * @return this
		 */
		setTheme: function(str){
			this.$title.html(str);
			return this;
		},
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		setText: function(str){
			this.$span.html(str);
			return this;
		}
	};

	return function(o){
		S.mix(o, Proto);
		return o;
	};
});
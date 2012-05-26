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
		setIcon: function(str){
			this.$span.attr('class', 'grid-button-' + str);
			return this;
		},
		/**
		 * 设置样式
		 * @param str String
		 * @return this
		 */
		setTip: function(str){
			this.$div.attr('title', str);
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
		},
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		setEnable: function(state){
			this.$div.toggleClass('grid-button-dis', state);
			return this;
		}
	};

	return function(o){
		S.mix(o, Proto);
		return o;
	};
});
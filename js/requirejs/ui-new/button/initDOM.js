define(['jquery', 'kissy'], function($, S){
	return function(o){
		var div = $('<a class="ui-button" href="javascript:;" hidefocus="true"><span></span></a>');
		/**
		 * @lends ui.Popwin#
		 */
		S.mix(o, {
			/**
			 * Popwin的包含层
			 * @type jQuery
			 */
			$div: div,
			/**
			 * Popwin右上角的关闭X
			 * @type jQuery
			 */
			$span: div.find('span').html(o.config.text)
		});

		return o;
	};
});
define(['jquery', 'kissy', './msg'], function($, S, MSG){
	return function(o){
		var div = $('<a href="javascript:;" class="grid-button" hidefocus="true"><span class="grid-button1"><span></span></span></a>');
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
			$span: div.find('span>span')
		});

		o.setText(o.config.text);
		o.setIcon(o.config.icon);
		o.setTip(o.config.tip || MSG['tip_' + o.config.icon]);
		o.setEnable(o.config.enable);

		return o;
	};
});
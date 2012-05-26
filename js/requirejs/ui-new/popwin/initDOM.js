define(['jquery', 'kissy'], function($, S){
	return function(o){
		var div = $('<div class="popwin-wrap"><div class="popwin-title-wrap"><div class="popwin-title"></div><a class="popwin-close" href="javascript:;" hidefocus="true"></a></div><div class="popwin-content-wrap"></div></div>');
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
			$close: div.find('.popwin-close'),
			/**
			 * Popwin的标题层
			 * @type jQuery
			 */
			$title: div.find('.popwin-title').html(o.config.title),
			/**
			 * Popwin的内容层
			 * @type jQuery
			 */
			$content: div.find('.popwin-content-wrap')
		});

		o.config.manager.$div.append(div);

		return o;
	};
});
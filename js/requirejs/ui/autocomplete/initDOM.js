define(['jquery', 'kissy', 'ui/popup'], function($, S, Popup){
	var popup = Popup.init();

	return function(o){
		var div = $('<div class="autocomp-pop"><div class="autocomp-loading"></div><div class="autocomp-as"></div><div class="autocomp-page"><a class="autocomp-prev" href="javascript:;"></a><a class="autocomp-next" href="javascript:;"></a><span class="autocomp-tip"></span></div></div>');
		/**
		 * @lends ui.Popwin#
		 */
		S.mix(o, {
			/**
			 * Popwin的包含层
			 * @type jQuery
			 */
			$div: div,
			$loading: div.find('div.autocomp-loading'),
			$prev: div.find('div.autocomp-prev'),
			$next: div.find('div.autocomp-next'),
			popup: popup
		});

		popup.$content.append(div);

		return o;
	};
});
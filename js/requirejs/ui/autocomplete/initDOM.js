define(['jquery', 'kissy', 'ui/popup', './msg'], function($, S, Popup, MSG){
	var popup = Popup.init();
	var div = $('<div class="autocomp-pop"><div class="autocomp-loading"></div><div class="autocomp-as"></div><div class="autocomp-page"><a class="autocomp-prev" href="javascript:;"></a><a class="autocomp-next" href="javascript:;"></a><span class="autocomp-tip"></span></div></div>');
	var DOM = {
		$div: div,
		$content: div.find('div.autocomp-as'),
		$loading: div.find('div.autocomp-loading').text(MSG.loading),
		$prev: div.find('div.autocomp-prev').text(MSG.pagePrev),
		$next: div.find('div.autocomp-next').text(MSG.pageNext),
		$tip: div.find('div.autocomp-tip'),
		popup: popup
	};
	popup.$content.append(div);

	return function(o){
		S.mix(o, DOM);
		return o;
	};
});
define(['jquery', 'kissy', 'ui/popup', './msg'], function($, S, Popup, MSG){
	var popup = Popup.init();
	var div = $('<div class="autocomp-pop"><div class="autocomp-loading"></div><div class="autocomp-input"><input class="text1" type="text"/><a class="autocomp-clear" href="javascript:;"></a></div><div class="autocomp-as"></div><div class="autocomp-page"><a class="autocomp-prev" href="javascript:;"></a><a class="autocomp-next" href="javascript:;"></a><span class="autocomp-tip"></span></div></div>');
	var DOM = {
		$div: div,
		$input: div.find('div.autocomp-input').find("input"),
		$clear: div.find("div.autocomp-input").find('a.autocomp-clear').text(MSG.clear),
		$content: div.find('div.autocomp-as'),
		$loading: div.find('div.autocomp-loading').text(MSG.loading),
		$prev: div.find('a.autocomp-prev').text(MSG.pagePrev),
		$next: div.find('a.autocomp-next').text(MSG.pageNext),
		$tip: div.find('span.autocomp-tip'),
		popup: popup
	};
	popup.$content.append(div);

	return function(o){
		S.mix(o, DOM);
		return o;
	};
});
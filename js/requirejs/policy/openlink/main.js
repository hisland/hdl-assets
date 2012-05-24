define(['jquery', 'kissy', 'ui/popup', 'util/delay-req', 'css!./main'], function($, S, Popup, delayReq){
	$('div.openlink-wrap').on({
		mouseenter: function(e){
			$(this).addClass('openlink-hover');
		},
		mouseleave: function(e){
			$(this).removeClass('openlink-hover');
		}
	}, '.openlink');

	var req = delayReq.init();
	var pop = Popup.init();
	pop.setSize(180, 100);

	function makeLinks(rs){
		var html = [];
		S.each($.parseJSON(rs), function(v, i, o){
			html.push('<a href="', v.provinceConnectAddress, '" class="blue openlink-link">', v.provinceConnectName, '</a>');
		});
		return html.join('');
	}
	
	$(window).on('click', 'span.openlink-login', function(e){
		pop.align(this).show();
		pop.$content.html('加载中...');

		req.load('provincePolicy/provinceLogin!getProvinceConnectByProvinceId.do', {
			'provinceId': $(this).parent().attr('data-id')
		}, function(rs){
			pop.$content.html(makeLinks(rs));

			pop.$div.one('outerclick', function(e, reale) {
				pop.hide();
			});
		});
	});

	$('div.openlink-wrap').on('click', 'span.openlink-modify', function(e){
		PL.showPop({
			url: 'provincePolicy/provinceLogin!modifyView.do',
			data: {
				'provinceId': $(this).parent().attr('data-id')
			},
			title: null
		});
	});
});

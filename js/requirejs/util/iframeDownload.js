define(['jquery', 'kissy'], function($, S){
	return {
		startDownload: function(url){
			var ifr = $('<iframe class="download-iframe" width="0" height="0" src="' + url + '" frameborder="no" scrolling="no" allowtransparency="yes"></iframe>');
			ifr.on('load', function(e) {
				ifr.remove();
			});
			ifr.appendTo('body');
		},
		postDownload: function(url, data){
			var name = S.guid('download-iframe-');
			var form = $('<form method="post" target="' + name + '" action="' + url + '"></form>');
			var ifr = $('<iframe name="' + name + '" class="download-iframe" width="0" height="0" src="javascript:void(0);" frameborder="no" scrolling="no" allowtransparency="yes"></iframe>');

			form.appendTo('body');
			S.each(S.unparam($.param(data)), function(v, i, o){
				form.append('<input type="hidden" name=" src="' + i + '"" value=" src="' + v + '"" />');
			});

			ifr.on('load', function(e) {
				form.remove();
				ifr.remove();
			});
			ifr.appendTo('body');
		}
	};
});
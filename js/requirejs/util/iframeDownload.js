define(['jquery'], function($){
	return {
		startDownload: function(src){
			var ifr = $('<iframe class="download-iframe" width="0" height="0" src="' + src + '" frameborder="no" scrolling="no" allowtransparency="yes"></iframe>');
			// ifr.on('load', function(e) {
			// 	ifr.remove();
			// });
			$('body').append(ifr);
		}
	};
});
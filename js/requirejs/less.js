define(['jquery', 'less-1.3.0'], function($){

function load(url){
	$(function(){
		var link = $('<link rel="stylesheet/less" type="text/css" href="' + url + '">');
		$('head').append(link);
		less.sheets.push(link[0]);
		less.refresh();
	});
}

//load reset.css before any other css
// $(function(){
// 	var node = document.createElement('link');
// 	node.href = require.toUrl('reset.css');
// 	node.rel = 'stylesheet';
// 	node.charset = 'utf-8';
// 	document.getElementsByTagName("head")[0].appendChild(node);
// });

return {
	load: function(name, req, onLoad, config){
		load(req.toUrl(name));
		onLoad();
	}
}

});
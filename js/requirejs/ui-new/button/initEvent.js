define(['jquery', 'kissy', 'jquery-plugin'], function($, S){
	return function(o){

		o.$div.on('click', o.config.click);

		return o;
	};
});
define(['jquery', 'kissy', 'jquery-plugin'], function($, S){
	return function(o){
		o.$content.on('click', 'a', function(e){
			var idx = $(this).attr('data-idx'),
				item = o.data.rows[idx],
				str = o.config.process ? o.config.process(item) : item;

			$(o.selector).val(str);
			setTimeout(function(){
				o.str = str;
				o.refreshData();
			}, 10);

			o.config.click && o.config.click(item);
		});
		return o;
	};
});
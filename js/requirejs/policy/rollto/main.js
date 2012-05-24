define(['jquery', 'kissy', 'css!./main'], function($, S){
	return {
		init: function(selector){
			$(selector).on('click', 'a.rolltoprobtn', function(){
				var seltop = $(selector).find(".rollto-main").scrollTop();
				var dataid = $(this).attr("data-id");
				var ptop = $(selector).find("#"+dataid).position().top;
				

				$(selector).find(".rollto-item").removeClass("item-selected");
				$(selector).find("#"+dataid).addClass("item-selected");

				$(selector).find(".rollto-main").scrollTop(ptop+seltop);
			});
		}
	};
});

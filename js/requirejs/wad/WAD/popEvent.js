define(['jquery', './popConfig'], function($, popup){
	// show/hide popup
	$(document).on('click', this, function(e){
		if($(e.target).closest("a").hasClass("tempfileexp") && !$(e.target).closest("a").hasClass("hdlgrid-btn-dis")){
			popup.$div.show();
		}else{
			popup.$div.hide();
		}
	});
});
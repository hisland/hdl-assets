/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	var OTHER_CLICK = 'otherClick', map = {};

	$.data(document, OTHER_CLICK, {});

	$(document).on('click', function(e){
		S.each($.data(document, OTHER_CLICK), function(v, i, o){
			if(check(e.target, map[i][0])){
				map[i][1]();
			}
		});
		$.data(document, OTHER_CLICK, {});
	});

	function check(target, arr){
		var out = true, tmp = target;
		S.each(arr, function(v, i, o){
			if(S.inArray(v, $(target).parents().andSelf().get())){
				out = false;
			}
		});
		return out;
	}

	$.fn[OTHER_CLICK] = function(fn){
		var uid = S.guid(OTHER_CLICK);

		map[uid] = [this.get(), fn];

		this.click(function(){
			$.data(document, OTHER_CLICK)[uid] = true;
		});

		return this;
	};
});
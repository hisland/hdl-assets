define(['jquery', 'kissy', 'css!./main'], function($, S){
	return {
		init: function(selector){
			$(selector).on('click', 'a.mulbtn-add', function(){
				var muicontent = 
					    $('<div class="multilink-show">'
							+'<div class="multilink-name"><input type="text" class="text1 name-text" name="form.connectName" /></div>'
							+'<div class="multilink-link"><input type="text" class="text1 link-text" name="form.connectUrl" /></div>'
							+'<a class="multilink-del" href="javascript:;">删除</a>'
						+'</div>'
					 );
				$(selector).find(".multilink-content").append(muicontent);
			});


			$(selector).on('click', 'a.multilink-del', function(){
				$(this).parent().remove();
			});
		}
	};
});

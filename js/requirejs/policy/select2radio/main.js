define(['jquery', 'kissy', 'css!./main'], function($, S){
	return {
		init: function(selector){
			$(selector).on('click', 'a.srbtn-allbei', function(){
				$(selector).find(".srcontent-radio").find(":radio:eq(0)").attr("checked",true);
			});

			$(selector).on('click', 'a.srbtn-allpi', function(){
				$(selector).find(".srcontent-radio").find(":radio:eq(1)").attr("checked",true);
			});

			$(selector).on('click', 'a.srbtn-op', function(){
				$(selector).find(".srcontent-radio").find("input:checked").parent("label").siblings().children("input").attr("checked",true);
			});
		}
	};
});

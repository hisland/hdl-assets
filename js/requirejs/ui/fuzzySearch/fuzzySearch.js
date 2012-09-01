/**
 * 
 */

define(['jquery', 'wad/page/main', 'css!./fuzzySearch'], function($, Page){
	Page.afterLoad(function(){  //页面加载完成后执行
		var $searchDiv = $(".search-condition").find(".fuzzySearch"),   //模糊查询的div
		$fuzzyCheck = $(".search-condition").find(".fuzzyCheck");   //模糊查询按钮
		
		if($searchDiv.length && $fuzzyCheck.length){
			if(!$fuzzyCheck.attr("checked")){
				$searchDiv.removeClass("fuzzySearch");
			}
		
			$fuzzyCheck.on('click',this,function(){
				if($(this).attr("checked")){
					$searchDiv.addClass("fuzzySearch");
				}else{
					$searchDiv.removeClass("fuzzySearch");
				}
			});
		}else if(!$searchDiv.length && !$fuzzyCheck.length){
			
		}else{
			alert("the fuzzy-search's div or checkbox is not init");
		}
	});
});
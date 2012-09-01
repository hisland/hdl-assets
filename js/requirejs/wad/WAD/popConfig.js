define(['jquery', './initFileType', 'ui/popup', 'css!ui/autocomplete/main'], function($, FileTypes, Popup){
	var popup = Popup.init(),
		$div = $('<div class="fileexp"></div>'),
		selstr ="";
	
	$.each(FileTypes,function(v,i){
		selstr+= '<a class="autocomp-a wad-link" type_id="'+v+'" href="javascript:;">'+i+' 文件</a>';
	});
	
	$div.html(selstr);
	popup.$content.empty().append($div);
	
	return popup;
});
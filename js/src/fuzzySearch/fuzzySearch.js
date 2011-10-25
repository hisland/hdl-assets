/**********************************************************************************************
 * 名称: fuzzySearch
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * API:
 *		无特殊api,只需要给相应的checkbox加上data-fuzzy-ids="#id1, #id2"即可
 * 
 */

KISSY.add('fuzzySearch', function(S, undef) {
	var $ = jQuery;

	$(':checkbox[data-fuzzy-ids]').live('change', function(e){
		var ids = $(this).attr('data-fuzzy-ids');
		if(ids){
			if(this.checked){
				$(ids).addClass('fuzzySearch');
				$(this).parent().prev().addClass('fuzzySearch');
			}else{
				$(ids).removeClass('fuzzySearch');
				$(this).parent().prev().removeClass('fuzzySearch');
			}
		}
	});
}, {
	requires: ['jquery-1.4.2']
});

/**********************************************************************************************
 * 名称: 分页组件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-5-18 18:55:54
 * 版本: v1
 * 
 * 分页纯逻辑处理
 * 
 * 
 * 
 * 
 */


KISSY.add('pager', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('');

	function pager(){
		this.data = [];
		this.per_num = 10;
		this.page_now = 1;
		this.btn_next = EMPTY_$;
		this.btn_prev = EMPTY_$;
		this.btn_first = EMPTY_$;
		this.btn_last = EMPTY_$;
	}

	$.extend(pager.prototype, {
		
	});

	//放到jq命名空间上
	$.extend({
		 pager: pager
	});
}, {
	requires: ['jquery-1.4.2']
});

/**********************************************************************************************
 * 名称: 右侧加载统一控制
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-05-25 16:20:55
 * 版本: v1.0
 * 
 * API:
 * 		$(selector).loadURL(url)
 * 		$(selector).loadURL(url, param)
 * 		$(selector).loadURL(url, callback)
 * 		$(selector).loadURL(url, param, callback)
 * 
 * 		$.loadURL == $('#mod-wrap').loadURL
 * 		$.loadURL(url)
 * 		$.loadURL(url, param)
 * 		$.loadURL(url, callback)
 * 		$.loadURL(url, param, callback)
 * 
 */


KISSY.add('load-url', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('');

	//载入前的清理操作
	function beforeLoad(){
		
	}
	//载入后的初始化操作
	function afterLoad(){

		//进行resize处理
		resizeFuncs();

		//是否显示高级查询
		if($('p.search-more').parent().prev().height() > 30){
			$('p.search-more').show();
		}else{
			$('p.search-more').hide();
		}
	}
	function loadURL(url, param, callback){
		if(!url){
			S.log('loadURL必须有链接!');
		}
		if(!param || $.isFunction(param)){
			callback = param;
			param = [];
		}
		beforeLoad();
		this.eq(0).load(url, param, function(){
			afterLoad();
			S.isFunction(callback) && callback();
		});
	}

	$.fn.extend({
		 loadURL: loadURL
		,beforeLoad: beforeLoad
		,afterLoad: afterLoad
	});
	$.extend({
		loadURL: function(url, param, callback){
			$('#mod-wrap').loadURL(url, param, callback);
		}
	});
}, {
	requires: ['jquery-1.4.2', 'loopFuncs']
});

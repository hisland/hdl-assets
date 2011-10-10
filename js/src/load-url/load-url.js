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
 * 2011-06-01 19:53:34:
 *		loadURL同时多个请求时,取消前面的请求
 * 
 */


KISSY.add('load-url', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,msg_loading = '加载中...'
		,msg_load_url_err = 'loadURL必须有链接!';

	//载入前的清理操作
	var beforeLoad = getLoopFuncs();
	beforeLoad.add(function(){
		//清理popManager
		$.popManager.clean();
	});

	//载入后的初始化操作
	var afterLoad = getLoopFuncs();
	afterLoad.add(function(){

		//进行resize处理
		resizeFuncs();

		//是否显示高级查询
		if($('p.search-more').parent().prev().height() > 30){
			$('p.search-more').show();
		}else{
			$('p.search-more').hide();
		}
	});

	function loadURL(url, param, callback){
		if(!url){
			S.log(msg_load_url_err);
		}
		if(!param || $.isFunction(param)){
			callback = param;
			param = [];
		}
		beforeLoad();
		this.eq(0).html(msg_loading).load(url, param, function(){
			afterLoad();
			S.isFunction(callback) && callback();
		});
	}

	$.fn.extend({
		 loadURL: loadURL
	});
	$.extend({
		loadURL: function(url, param, callback){
			$('#mod-wrap').html(msg_loading).loadURL(url, param, callback);
		}
		,beforeLoad: beforeLoad
		,afterLoad: afterLoad
	});
}, {
	requires: ['jquery-1.4.2', 'loopFuncs', 'popManager']
});

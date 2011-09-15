/**********************************************************************************************
 * flash上传控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-8-21 16:58:32
 * 版本: v1
 *
 */
KISSY.add('flashUpload', function(S, undef) {
	var $ = jQuery;
	//已经有了此函数则不用重复注册了
	if($.flashUpload){
		return false;
	}

	window.uploadAlertDiv = null;
	var maskDiv = null;
	var fileSize = 10;
	window.uploadSelected = function (){
		uploadAlertDiv = $.alert({
									 message:'<p>正在上传,请稍等...</p><p>上传进度: <span id="uploadPercent">0</span>%</p>'
									,type:'alert'
									,title:'上传状态'
									,onHide:function(){maskDiv.remove();}
								});
		uploadAlertDiv.find('input:last').attr('disabled','disabled').css('color','#ccc');
		uploadAlertDiv.find('a.tipmsg_close').hide();
		maskDiv = $('<div style="position:fixed;top:0;left:0;z-index:1000;width:100%;height:100%;background:#000;opacity:0.2;filter:alpha(opacity=20);_position:absolute;"></div>').appendTo('body');
	}
	window.makeData = function(){
		return 'userName=aa&userID=bb';
	}
	window.uploadOutSize = function(){
		$.alert('文件超过限制大小'+fileSize+'M!');
	}
	window.uploadProgress = function(percent){
		$('#uploadPercent').html(percent);
	}
	window.funcUploaded = function(){
		uploadAlertDiv.find('div.tipmsg_content').append('<p>后台正在处理,请稍等...</p>');
	}
	window.uploadComplete = function(data){
		if(data){
			uploadAlertDiv.find('div.tipmsg_content').append('<p>OK</p>');
		}else{
			uploadAlertDiv.find('div.tipmsg_content').append('<p>后台没有返回数据,可能出错.</p>');
		}
		uploadAlertDiv.find('input:last').removeAttr('disabled').css('color','');
		uploadAlertDiv.find('a.tipmsg_close').show();
	}

	function flashUpload(params){
//		params参数形式
		var pre_params = {
				 url:''	//文件上传的路径
				,filter:'*.xls;*.xlsx'	//过滤类型
				,upload_name:'fileUp'	//过滤类型
				,max_size:10			//文件最大大小,单位M
				,hole:'span.input_file'	//embed元素放入的位置, embed为全透明宽高100%
				,flex_src:'flex-debug/file_upload.swf'	//flash存放路径
				,funcData:'makeData'
				,funcSelected:'uploadSelected'
				,funcOutSize:'uploadOutSize'
				,funcProgress:'uploadProgress'
				,funcUploaded:'funcUploaded'
				,funcComplete:'uploadComplete'
				}
		params = $.extend(true, pre_params, params);
		fileSize = params.max_size;
		
//		var flashvars = 
//			'url=' + params.url + 
//			'&filter=' + params.filter + 
//			'&upload_name=' + params.upload_name + 
//			'&max_size=' + (fileSize*1024*1024) + 
//			'&funcData=' + params.funcData + 
//			'&funcSelected=' + params.funcSelected + 
//			'&funcOutSize=' + params.funcOutSize + 
//			'&funcProgress=' + params.funcProgress + 
//			'&funcUploaded=' + params.funcUploaded + 
//			'&funcComplete=' + params.funcComplete;
//		
//		var str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
//		+'		style="opacity:1;filter:alpha(opacity=100);position:absolute;top:0;left:0;"'
//		+'		id="flex_upload" width="100%" height="100%"'
//		+'		codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">'
//		+'		<param name="movie" value="'+ params.flex_src +'" />'
//		+'		<param name="src" value="'+ params.flex_src +'" />'
//		+'		<param name="quality" value="high" />'
//		+'		<param name="bgcolor" value="#fff" />'
//		+'		<param name="wmode" value="transparent" />'
//		+'		<param name="flashvars" value="'+flashvars+'" />'
//		+'		<param name="allowScriptAccess" value="sameDomain" />'
//		+'		<embed src="'+ params.flex_src +'" name="flex_upload"'
//		+'			quality="high" bgcolor="#fff" width="100%" height="100%" align="middle"'
//		+'			play="true" loop="false" quality="high" allowScriptAccess="sameDomain"'
//		+'			type="application/x-shockwave-flash" flashvars="'+flashvars+'"'
//		+'			pluginspage="http://www.adobe.com/go/getflashplayer">'
//		+'		</embed>'
//		+'</object>';
//		var embed = $(str);
//		$(params.hole).append(embed);
		
	var so = new SWFObject("flex-debug/file_upload.swf", "flex_upload", "100%", "100%", "8", "#336699");
		so.setAttribute("style", 'opacity:1;filter:alpha(opacity=100);position:absolute;top:0;left:0;');
		so.addParam("wmode", 'transparent');
		so.addVariable("url", params.url);
		so.addVariable("filter", params.filter);
		so.addVariable("upload_name", params.upload_name);
		so.addVariable("max_size", (fileSize*1024*1024));
		so.addVariable("funcData", params.funcData);
		so.addVariable("funcSelected", params.funcSelected);
		so.addVariable("funcOutSize", params.funcOutSize);
		so.addVariable("funcProgress", params.funcProgress);
		so.addVariable("funcUploaded", params.funcUploaded);
		so.addVariable("funcComplete", params.funcComplete);
	so.write(params.hole);
	}

	//注册到jq命名空间上
	$.flashUpload = flashUpload;
}, {
	requires: ['jquery-1.4.2', 'hdlTipMsg', 'swfobject']
});
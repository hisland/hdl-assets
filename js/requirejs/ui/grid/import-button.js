define(['jquery', 'kissy', 'ui/swfobject', 'ui/tip'], function($, S, SWFObject, Tip){
	window.importFunc = {
		funcSelected: function (){
			uploadAlertDiv = Tip.alert({
										 message:'<p>正在上传,请稍等...</p><p>上传进度: <span id="uploadPercent">0</span>%</p>'
										,type:'alert'
										,title:'上传状态'
										,onHide:function(){window.startRefresh();}
									});
			uploadAlertDiv.$btn_ok.attr('disabled', true);
			uploadAlertDiv.$close.hide();
		},
		funcCheck: function(){
			return true;
		},
		funcData: function(){
			return '';
		},
		funcOutSize: function(){
			Tip.error('文件超过限制大小'+fileSize+'M!');
		},
		funcProgress: function(percent){
			$('#uploadPercent').html(percent);
		},
		funcUploaded: function(){
			uploadAlertDiv.find('div.tipmsg-content').append('<p>后台正在处理,请稍等...</p>');
		},
		funcComplete: function(data){
			//[0]放处理结果,[1]放处理的文件
			var data1 = data.split('&&');
			if(data1[0]){
				uploadAlertDiv.find('div.tipmsg-content').append('<p>'+data1[0]+'</p>');
				$('#spmFilename').val(data1[1]);
			}else{
				uploadAlertDiv.find('div.tipmsg-content').append('<p>后台没有返回数据,可能出错.</p>');
			}
			uploadAlertDiv.btn_ok.attr('disabled', false).css('color','');
			uploadAlertDiv.close.show();
		},
		funcError: function(){
			Tip.error('页面出现异常,请刷新页面重试!');
		}
	}

	return {
		init: function(setting){
			S.mix(setting.flashvars, {
				funcCheck: "importFunc.funcCheck",
				funcData: "importFunc.funcData",
				funcSelected: "importFunc.funcSelected",
				funcOutSize: "importFunc.funcOutSize",
				funcProgress: "importFunc.funcProgress",
				funcUploaded: "importFunc.funcUploaded",
				funcComplete: "importFunc.funcComplete",
				funcError: "importFunc.funcError",
				funcCancel: "importFunc.funcCancel"
			});

			SWFObject.init(setting);
		}
	};
});
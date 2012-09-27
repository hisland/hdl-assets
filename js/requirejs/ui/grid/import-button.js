define(['jquery', 'kissy', 'ui/swfobject', 'ui/tip'], function($, S, SWFObject, Tip){
	window.uploadAlert = Tip.notice('', getText('上传状态'));
	uploadAlert.hide();
	uploadAlert.manager.notremove(true);

	window.importFunc = {
		funcSelected: function (){
			uploadAlert.setCloseable(false);
			uploadAlert.$close.css('display', 'none');
			uploadAlert.$ok.css('display', 'none');
			uploadAlert.$content.html('<p>正在上传,请稍等...</p><p>上传进度: <span id="uploadPercent">0</span>%</p>');
			uploadAlert.show();
		},
		funcCheck: function(){
			return true;
		},
		funcData: function(){
			return '';
		},
		funcOutSize: function(){
			Tip.error(getText('文件超过限制大小!'));
		},
		funcProgress: function(percent){
			$('#uploadPercent').html(percent);
		},
		funcUploaded: function(){
			uploadAlert.$content.append('<p>后台正在处理,请稍等...</p>');
		},
		funcComplete: function(rs){
			if(rs){
				uploadAlert.$content.append('<p>' + rs + '</p>');
			}else{
				uploadAlert.$content.append('<p>后台没有返回数据,可能出错.</p>');
			}

			uploadAlert.setCloseable(true);
			uploadAlert.$close.css('display', '');
			uploadAlert.$ok.css('display', '');
		},
		funcError: function(){
			Tip.error(getText('导入文件选择框已经打开或出现异常，请刷新页面重试！'));
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
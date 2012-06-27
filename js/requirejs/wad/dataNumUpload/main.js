define(['jquery', 'kissy', 'ui/swfobject', 'ui/tip'], function($, S, SWFObject, Tip){
	var Proto = {
		funcSelected: function (){
			this.div.find('span:eq(1)').css('visibility', 'hidden');
		},
		funcCheck: function(){
			return true;
		},
		funcData: function(){
			return '';
		},
		funcOutSize: function(){
			Tip.error('文件超过限制大小!');
		},
		funcProgress: function(percent){
			if(percent == 100){
				this.div.find('span:first').html('上传完成,等待处理...');
			}else{
				this.div.find('span:first').html('正在上传: ' + percent + '%');
			}
		},
		funcUploaded: function(){
			this.div.find('span:first').html('上传完成,等待处理...');
		},
		funcComplete: function(mark){
			mark = $.parseJSON(mark);
			if(mark.resultCode == 1){
				this.div.html('<span>文件名:</span><span style="margin-right:5px;width:60px;overflow:hidden;display:inline-block;text-overflow:ellipsis;" title="' + mark.fileName + '">' + mark.fileName + '</span><span>行数:</span><span>' + mark.lineCount + '</span><input type="hidden" name="key" value="' + mark.key + '" />');
			}else{
				this.div.html('<span class="red">' + mark.resultMsg + '</span>');
			}
		},
		funcError: function(){
			Tip.error('导入文件选择框已经打开或出现异常，请刷新页面重试！');
		}
	}

	return {
		init: function(setting){
			S.mix(setting, {
				hole: null,
				posturl: 'post.php',
				upload_name: null,
				max_size: 10240,
				filter: '*',
				width: 64,
				height: 24,
				text: null,
				flashid: null,
				handles: {}
			}, false);

			var flash_setting = {
				flashid: S.guid('flash-'),
				flashurl: require.toUrl('ui/swfobject/file-upload.swf'),
				flashvars: {
					url: escape(setting.posturl),
					filter: setting.filter,
					upload_name: setting.upload_name,
					max_size: setting.max_size
				},
				attributes: {
					style: 'opacity:0;filter:alpha(opacity=0);position:absolute;top:0;left:0;'
				},
				width: setting.width,
				height: setting.height
			};
			S.mix(flash_setting.flashvars, {
				funcCheck: "dataNumUpload.funcCheck",
				funcData: "dataNumUpload.funcData",
				funcSelected: "dataNumUpload.funcSelected",
				funcOutSize: "dataNumUpload.funcOutSize",
				funcProgress: "dataNumUpload.funcProgress",
				funcUploaded: "dataNumUpload.funcUploaded",
				funcComplete: "dataNumUpload.funcComplete",
				funcError: "dataNumUpload.funcError",
				funcCancel: "dataNumUpload.funcCancel"
			});
			window.dataNumUpload = S.mix({
				div: $(setting.hole)
			}, Proto, false);

			$(setting.hole).append('<span style="line-height:' + flash_setting.height + 'px;">' + setting.text + '</span>').append('<span id="' + flash_setting.flashid + '"></span>');

			SWFObject.init(flash_setting);
		},
		clearFns: function(){
			window.createTask = {};
		}
	};
});
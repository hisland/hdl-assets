define(['jquery', 'kissy', 'ui/swfobject', 'ui/tip'], function($, S, SWFObject, Tip){
	var Proto = {
		funcSelected: function (){
			this.div.children(':first').siblings().remove();
			this.gg = $('<span></span>').appendTo(this.div);
		},
		funcCheck: function(){
			return true;
		},
		funcData: function(){
			return 'fileForm.numRource=' + this.numRource + '&fileForm.msgRource=' + this.msgRource;
		},
		funcOutSize: function(){
			Tip.error(getText('文件超过限制大小!'));
		},
		funcProgress: function(percent){
			this.gg.html(getText('正在上传: ') + percent + '%');
		},
		funcUploaded: function(){
			this.gg.html(getText('上传完成,等待处理...'));
		},
		funcComplete: function(mark){
			mark = $.parseJSON(mark);
			this.gg.html(this.makeFileMark(mark));
			if(mark.resultCode == 1){
				this.div.data('mark', mark);
				this.div.addClass('upload-ok');
			}
			this.div.children(':first').css('visibility', 'hidden');
		},
		funcError: function(){
			Tip.error(getText('导入文件选择框已经打开或出现异常，请刷新页面重试！'));
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

			var uid = S.guid();
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
				funcCheck: "createTask[" + uid + "].funcCheck",
				funcData: "createTask[" + uid + "].funcData",
				funcSelected: "createTask[" + uid + "].funcSelected",
				funcOutSize: "createTask[" + uid + "].funcOutSize",
				funcProgress: "createTask[" + uid + "].funcProgress",
				funcUploaded: "createTask[" + uid + "].funcUploaded",
				funcComplete: "createTask[" + uid + "].funcComplete",
				funcError: "createTask[" + uid + "].funcError",
				funcCancel: "createTask[" + uid + "].funcCancel"
			});
			window.createTask[uid] = S.mix({
				div: setting.p,
				makeFileMark: setting.makeFileMark,
				numRource: setting.numRource,
				msgRource: setting.msgRource
			}, Proto, false);

			$(setting.hole).attr('id', flash_setting.flashid);

			SWFObject.init(flash_setting);
		},
		clearFns: function(){
			window.createTask = {};
		}
	};
});
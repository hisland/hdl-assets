define(['jquery', 'kissy', 'ui/swfobject', 'ui/tip'], function($, S, SWFObject, Tip){
	var Proto = {
		funcSelected: function (){
//			this.div.find('div:eq(1)').css('visibility', 'hidden');
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
				this.div.find('div:first').html('上传完成,等待处理...');
			}else{
				this.div.find('div:first').html('正在上传: ' + percent + '%');
			}
		},
		funcUploaded: function(){
			this.div.find('div:first').html('上传完成,等待处理...');
		},
		funcComplete: function(mark){
			mark = $.parseJSON(mark);
			if(mark.resultCode == 1){
				this.div.find('div:first').html('<span style="overflow:hidden;display:inline-block;">文件名:</span><span style="margin-right:5px;width:50px;overflow:hidden;display:inline-block;text-overflow:ellipsis;" title="' + mark.fileName + '">' + mark.fileName + '</span><span style="overflow:hidden;display:inline-block;">行数:</span><span style="width: 29px; overflow: hidden; display: inline-block; text-overflow: ellipsis;" title="'+mark.lineCount+'">' + mark.lineCount + '</span><input type="hidden" name="key" value="' + mark.key + '" />');
			}else{
				this.div.find('div:first').html('<span class="red" style="display: inline-block;overflow: hidden; width: 144px; white-space: nowrap;" title="'+mark.resultMsg+'">' + cutString(mark.resultMsg, 20) + '</span>');
			}
			//下拉按钮可以使用
			$("#numType").attr("disabled",false);
			
			//截取字符串 ，自动加点
			function bLength(str){
				if (!str) {
					return 0;
				}
				var aMatch = str.match(/[^\x00-\xff]/g);
				return (str.length + (!aMatch ? 0 : aMatch.length));
			}

			function cutString(str, lens){
				var a =str;
				var s = str.replace(/\*/g, ' ').replace(/[^\x00-\xff]/g, '**');
				str = str.slice(0, s.slice(0, lens).replace(/\*\*/g, ' ').replace(/\*/g, '').length);

				if (bLength(a) > lens && lens > 0) {
					str+="...";
				}
				return str;
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
				height: 25,
				btntext: null,
				filetext: null,
				filecount: null,
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

			var showmsg ="";
			if(setting.filetext !="" && setting.filecount != ""){
				showmsg = '<span style="overflow:hidden;display:inline-block;">文件名:</span><span style="margin-right:5px;width:50px;overflow:hidden;display:inline-block;text-overflow:ellipsis;" title="' + setting.filetext + '">' + setting.filetext + '</span><span style="overflow:hidden;display:inline-block;">行数:</span><span style="width: 29px; overflow: hidden; display: inline-block; text-overflow: ellipsis;" title="'+setting.filecount+'">' + setting.filecount + '</span>';
			}
			$(setting.hole).append('<a class="hdlgrid-btn uploadbtn-a" href="javascript:;"><span class="hdlgrid-btn2 uploadbtn-span"><span class="hdlgrid-import"></span></span></a>').append('<div style="height:'+ flash_setting.height +'px;line-height:' + flash_setting.height + 'px;" id="showMsg">'+showmsg+'</div>').append('<span id="' + flash_setting.flashid + '"></span>');

			SWFObject.init(flash_setting);
		},
		clearFns: function(){
			window.createTask = {};
		}
	};
});
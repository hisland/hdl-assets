define(['jquery', 'kissy', 'ui/swfobject', 'ui/tip'], function($, S, SWFObject, Tip){
	var Proto = {
		funcSelected: function (){
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
		},
		funcUploaded: function(){
		},
		funcComplete: function(mark){
		},
		funcError: function(){
			Tip.error('导入文件选择框已经打开或出现异常，请刷新页面重试！');
		}
	}

	window.createTask = {};

	return {
		init: function(config){
			S.mix(config, {
				selector: null,
				posturl: 'post.php',
				upload_name: 'uploadFile',
				max_size: 10240,
				filter: '*',
				width: 64,
				height: 24,
				text: null,
				flashid: null,
				handles: {}
			}, false);

			var uid = S.guid(),
				flash_setting = {
					flashid: S.guid('flash-'),
					flashurl: require.toUrl('ui/swfobject/file-upload.swf'),
					flashvars: {
						url: escape(config.posturl),
						filter: config.filter,
						upload_name: config.upload_name,
						max_size: config.max_size
					},
					attributes: {
						style: 'opacity:0;filter:alpha(opacity=0);position:absolute;top:0;left:0;'
					},
					width: config.width,
					height: config.height
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

			window.createTask[uid] = S.mix(config.handles, Proto, false);

			$(config.selector).attr('id', flash_setting.flashid);

			SWFObject.init(flash_setting);
		},
		clearFns: function(){
			window.createTask = {};
		}
	};
});
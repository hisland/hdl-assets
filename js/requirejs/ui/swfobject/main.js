define([ 'jquery', 'kissy', './swfobject2.2', './swfobject1.5'],
function($, S, SWFObject22, SWFObject15) {
	return {
		/**
		 * 使用SWFObject2.2版本
		 */
		init : function(setting) {
			S.mix(setting, {
				flashurl : '',
				flashid : '',
				flashver : '9.0.0',
				flashinstall : 'expressInstall.swf',
				flashvars : {},
				params : {},
				attributes : {},
				width : 100,
				height : 50
			}, false);

			// 2种浏览器使用不同的wmode属性
			setting.params.wmode = 'transparent';
//			if ($.browser.msie) {
//				setting.params.wmode = 'transparent';
//			} else {
//				delete setting.params.wmode;
//			}

			SWFObject22.embedSWF(
				setting.flashurl,
				setting.flashid,
				setting.width,
				setting.height,
				setting.flashver,
				setting.flashinstall,
				setting.flashvars,
				setting.params,
				setting.attributes
			);
		},
		/**
		 * 使用SWFObject1.5版本
		 * 
		 * @param
		 * @return
		 */
		init15 : function(setting) {
			var so = new SWFObject15(setting.flashurl, setting.flashid,
					setting.width, setting.height, "8", "#336699");
			so.addVariable("url", 'aa');
			so.addVariable("filter", '*.xls');
			so.addVariable("upload_name", 'god');
			so.addVariable("max_size", '1024');
			so.addVariable("funcCheck", "funcCheck");
			so.addVariable("funcData", "funcData");
			so.addVariable("funcSelected", "funcSelected");
			so.addVariable("funcOutSize", "funcOutSize");
			so.addVariable("funcProgress", "funcProgress");
			so.addVariable("funcUploaded", "funcUploaded");
			so.addVariable("funcComplete", "funcComplete");
			so.addVariable("funcError", "funcError");
			so.addVariable("funcCancel", "funcCancel");
			so.write('#aa1');
		}
	};
});

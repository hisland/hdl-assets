define(['jquery', 'kissy', './swfupload/swfupload'], function($, S){

//SWFUpload默认全部参数
var basicDefaultSetting = {
	// Upload backend settings
	upload_url: null,
	file_post_name: 'FileUp',
	preserve_relative_urls: false,
	post_params: {},
	use_query_string: false,
	requeue_on_error: false,
	http_success: [],
	assume_success_timeout: 0,

	// File Settings
	file_types: '*',
	file_types_description: 'All Files',
	file_size_limit: 0,	// Default zero means "unlimited"
	file_upload_limit: 0,
	file_queue_limit: 0,

	// Flash Settings
	flash_url: require.toUrl('swfupload/swfupload/swfupload.swf'),
	prevent_swf_caching: true,

	// Button Settings
	button_image_url: '',
	button_width: 1,
	button_height: 1,
	button_text: '',
	button_text_style: 'color: #000000; font-size: 16pt;',
	button_text_top_padding: 0,
	button_text_left_padding: 0,
	button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
	button_disabled: false,
	button_placeholder_id: '',
	button_placeholder: null,
	button_cursor: SWFUpload.CURSOR.ARROW,
	button_window_mode: SWFUpload.WINDOW_MODE.WINDOW,

	// Debug Settings
	debug: false,

	// Event Handlers
	swfupload_loaded_handler: null,
	file_dialog_start_handler: null,
	file_queued_handler: null,
	file_queue_error_handler: null,
	file_dialog_complete_handler: null,

	upload_start_handler: null,
	upload_progress_handler: null,
	upload_error_handler: null,
	upload_success_handler: null,
	upload_complete_handler: null,

	button_action_handler: null,

	debug_handler: null,

	custom_settings: {}
};

//之前项目的参数
var oldDefaultSetting = {
	url: null,
	upload_name: 'fileUp',
	param: null,
	max_size: 20*1024*1024,

	filter: '*',
	filter_desc: 'All File',
	multi: false,

	wmode: null,
	prevent_swf_caching: true,
	debug: false,

	placeholder_id: null,
	handlers: {
		funcCheck: "importFunc.funcCheck",
		funcData: "importFunc.funcData",
		funcSelected: "importFunc.funcSelected",
		funcOutSize: "importFunc.funcOutSize",
		funcProgress: "importFunc.funcProgress",
		funcUploaded: "importFunc.funcUploaded",
		funcComplete: "importFunc.funcComplete",
		funcError: "importFunc.funcError",
		funcCancel: "importFunc.funcCancel",

		swfupload_loaded_handler: null,
		file_dialog_start_handler: null,
		file_queued_handler: null,
		file_queue_error_handler: null,
		file_dialog_complete_handler: null,

		upload_start_handler: null,
		upload_progress_handler: null,
		upload_error_handler: null,
		upload_success_handler: null,
		upload_complete_handler: null,

		button_action_handler: null
	},
	/*
	button: {
		img: '',
		text: '',
		width: 1,
		height: 1,
		disabled: false
	},
	button: 'preDefName'
	*/
	button: null
};

//预定义的button
var preButton = {
	xpWithText: {
		button_image_url: require.toUrl('swfupload/img/XPButtonTextUpload_61x22.png'),
		button_width: 61,
		button_height: 22,
		button_text: '',
		button_text_style: '',
		button_text_top_padding: 0,
		button_text_left_padding: 0,
		button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
		button_disabled: false,
		button_placeholder_id: '',
		button_placeholder: null,
		button_cursor: SWFUpload.CURSOR.ARROW,
		button_window_mode: SWFUpload.WINDOW_MODE.WINDOW
	},
	xpNoText: {
		button_image_url: require.toUrl('swfupload/img/XPButtonNoText_61x22.png'),
		button_width: 61,
		button_height: 22,
		button_text: '<span class="theFont">text</span>',
		button_text_style: ".theFont { font-size: 16; text-align:center; font-family: sans-serif;}",
		button_text_top_padding: 0,
		button_text_left_padding: 0,
		button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
		button_disabled: false,
		button_placeholder_id: '',
		button_placeholder: null,
		button_cursor: SWFUpload.CURSOR.ARROW,
		button_window_mode: SWFUpload.WINDOW_MODE.WINDOW
	}
};

return {

initOld: function(setting){
	//补全默认参数
	S.mix(setting, oldDefaultSetting, false);

	//button处理
		if(S.isString(setting.button)){
			if(!preButton[setting.button]){
				S.log('button theme: [' + setting.button + '] not found! use default [xpWithText] instead.');
				setting.button = 'xpWithText';
			}
			S.mix(setting, preButton[setting.button]);
		}else if(S.isPlainObject(setting.button)){
			S.mix(setting, preButton['xpWithText']);
			setting.button_image_url = setting.button.img;
			setting.button_width = setting.button.width;
			setting.button_height = setting.button.height;
			setting.button_text = setting.button.text;
			setting.button_disabled = setting.button.disabled;
		}else{
			S.mix(setting, preButton['xpWithText']);
		}
		delete setting.button;

	//修正属性名 - 因为现有项目的属性名与swfupload的不一致
		setting.button_action = setting.multi ? SWFUpload.BUTTON_ACTION.SELECT_FILES : SWFUpload.BUTTON_ACTION.SELECT_FILE;
		delete setting.multi;
		setting.button_window_mode = setting.wmode;
		delete setting.wmode;
		setting.button_placeholder_id = setting.placeholder_id;
		delete setting.placeholder_id;
		setting.upload_url = setting.url;
		delete setting.url;
		setting.file_post_name = setting.upload_name;
		delete setting.upload_name;
		setting.post_params = setting.param;
		delete setting.param;
		setting.file_types = setting.filter;
		delete setting.filter;
		setting.file_types_description = setting.filter_desc;
		delete setting.filter_desc;
		setting.file_size_limit = setting.max_size + ' B';
		delete setting.max_size;

	return this.initBasic(setting);
},
initBasic: function(setting){
//	//补全默认参数
//	S.mix(setting, basicDefaultSetting, false);
	//只需修正flash_url为模块内部的swf文件
	setting.flash_url = basicDefaultSetting.flash_url;
	return new SWFUpload(setting);
}

};

});
define(['jquery', 'kissy', './swfupload/swfupload'], function($, S){

//SWFUpload默认全部参数
var basicDefaultSetting = {
	// Upload backend settings
	upload_url: null,
	file_post_name: 'Filedata',
	preserve_relative_urls: false,
	post_params: {},
	use_query_string: false,
	requeue_on_error: false,
	http_success: [],
	assume_success_timeout: 0,

	// File Settings
	file_types: '*.*',
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

var oldDefaultSetting = {
	url: null,
	upload_name: null,
	placeholder_id: null,
	url: null,
	url: null
};

//现有项目的属性名与swfupload的不一致而使用的map
var nameMap = {
	url: 'upload_url',
	upload_name: 'file_post_name',
	placeholder_id: 'button_placeholder_id',

	preserve_relative_urls: 'preserve_relative_urls',
	post_params: 'post_params',
	use_query_string: 'use_query_string',
	requeue_on_error: 'requeue_on_error',
	http_success: 'http_success',
	assume_success_timeout: 'assume_success_timeout',
	file_types: 'file_types',
	file_types_description: 'file_types_description',
	file_size_limit: 'file_size_limit',
	file_upload_limit: 'file_upload_limit',
	file_queue_limit: 'file_queue_limit',
	flash_url: 'flash_url',
	prevent_swf_caching: 'prevent_swf_caching',
	button_image_url: 'button_image_url',
	button_width: 'button_width',
	button_height: 'button_height',
	button_text: 'button_text',
	button_text_style: 'button_text_style',
	button_text_top_padding: 'button_text_top_padding',
	button_text_left_padding: 'button_text_left_padding',
	button_action: 'button_action',
	button_disabled: 'button_disabled',
	button_placeholder: 'button_placeholder',
	button_cursor: 'button_cursor',
	button_window_mode: 'button_window_mode',
	debug: 'debug',
	swfupload_loaded_handler: 'swfupload_loaded_handler',
	file_dialog_start_handler: 'file_dialog_start_handler',
	file_queued_handler: 'file_queued_handler',
	file_dialog_complete_handler: 'file_dialog_complete_handler',
	upload_start_handler: 'upload_start_handler',
	upload_progress_handler: 'upload_progress_handler',
	upload_error_handler: 'upload_error_handler',
	upload_success_handler: 'upload_success_handler',
	upload_complete_handler: 'upload_complete_handler',
	button_action_handler: 'button_action_handler',
	debug_handler: 'debug_handler',
	custom_settings: 'custom_settings'
};

//预定义的button
var buttonMap = {
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

	//默认使用xp样式的button
	if(!setting.button){
		setting.button = 'xpWithText';
	}
	//使用预定义的button
	if(S.isString(setting.button)){
		if(!buttonMap[setting.button]){
			S.log('button theme: [' + setting.button + '] not found! use default [xpWithText] instead.');
			setting.button = 'xpWithText';
		}

		S.mix(setting, buttonMap[setting.button]);
		setting.button_placeholder_id = setting.placeholder_id;
		delete setting.placeholder_id;
		delete setting.button;
	}

	//修正属性名 - 因为现有项目的属性名与swfupload的不一致
	S.each(setting, function(v, i, o){
		if(nameMap[i]){
			if(i !== nameMap[i]){
				setting[nameMap[i]] = v;
				delete setting[i];
			}
		}
	});

	//补全默认参数
	S.mix(setting, basicDefaultSetting, false);

	return new SWFUpload(setting);
},
initBasic: function(setting){
	//补全默认参数
	S.mix(setting, basicDefaultSetting, false);
	return new SWFUpload(setting);
}

};

});
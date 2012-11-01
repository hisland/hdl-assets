define(['jquery', 'kissy', './swfupload/swfupload'], function($, S){

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
		button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
		button_disabled: false,
		button_placeholder_id: null,
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
		button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
		button_disabled: false,
		button_placeholder_id: null,
		button_placeholder: null,
		button_cursor: SWFUpload.CURSOR.ARROW,
		button_window_mode: SWFUpload.WINDOW_MODE.WINDOW
	}
};

return {

initOneFile: function(setting){

//button处理
	if(S.isString(setting.button)){
		if(!preButton[setting.button]){
			alert('button theme: [' + setting.button + '] not found!');
			return false;
		}
		S.mix(setting, preButton[setting.button]);
	}else if(S.isPlainObject(setting.button)){
		S.mix(setting, setting.button);
	}else{
		S.mix(setting, preButton['xpWithText']);
	}
	delete setting.button;

//修正与swfupload的不一致属性名
	setting.button_placeholder_id = setting.placeholder_id;
	delete setting.placeholder_id;

	return this.initBasic(setting);

},
initBasic: function(setting){

	//只需修正flash_url为模块内部的swf文件
	setting.flash_url = require.toUrl('swfupload/swfupload/swfupload.swf');
	return new SWFUpload(setting);

}

};

});
/**
 * 合并为一个package
 * @class jQuery
 */
define(['./adjust', './dragmove', './hashchange', './mousetip', './otherclick',
		'./mousewheel', './outerclick'], function(){
	return {
		version: '0.2',
		desc: 'load jquery-plugin as package'
	};
});

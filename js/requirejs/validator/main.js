/**
 * 验证工具主模块
 * @namespace
 * @name validator
 */
define(['./validator', './base/rule-pre', 'css!./validator'], function(Validator, Rule){
	return {
		init: function(setting){
			return new Validator(setting);
		}
	};
});

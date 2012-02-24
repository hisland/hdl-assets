/**
 * 验证工具主模块
 */
define(['./validator', './rule', './item', './pre-def', 'css!./valid'], function(Validator, Rule, Item){
	return {
		init: function(){
			return new Validator();
		}
	};
});

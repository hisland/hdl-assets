define(['jquery', 'kissy', 'util'], function($, S, Util){
var defaultConfig = {
	text: 'text',
	icon: 'default',
	countDown: null
};

function Button(){
}
$.extend(Button.prototype, {
	__init: function(config){
		return this;
	},
	__initDOM: function(){
		return this;
	},
	__initEvent: function(){
		return this;
	}
});

return Button;

});
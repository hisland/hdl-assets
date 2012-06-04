define(['jquery', 'kissy', 'css!./main'], function($, S){
	function Button(){
		this.$div = $('<a href="javascript:;" class="ui-button">button</a>');
	}

	S.augment(Button, {
		appendTo: function(target){
			this.$div.appendTo(target);
			return this;
		},
		click: function(fn){
			fn ? this.$div.on('click', fn) : this.$div.trigger('click');
			return this;
		},
		disable: function(state){
			this.$div.attr('disabled', state);
			return this;
		}
	});

	return {
		init: function(){
			return new Button();
		}
	};
});
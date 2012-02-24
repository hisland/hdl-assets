/**
 * 自定义按钮对象
 * <pre><code>
 * 
 * </code></pre>
 */

define(['jquery', 'kissy', 'css!./button'], function($, S){
	function Button(setting){
		this.$div = $('<a href="javascript:;" class="ui-button">button</a>');
	}

	S.augment(Button, {
		appendTo: function(target){
			this.$div.appendTo(target);
			return this;
		},
		click: function(fn){
			this.$div.click(fn);
			return this;
		}
	});

	return {
		init: function(setting){
			return new Button(setting);
		}
	};
});
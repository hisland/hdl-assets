/**
 * 自定义按钮对象
 * <pre><code>
 * 
 * </code></pre>
 */

define(['jquery', 'kissy', 'css!./button'], function($, S){
	function Button(setting){
		this.$div = $('<a href="#" class="ui-button">button</a>');
	}

	S.augment(Button, {
		appendTo: function(target){
			$(target).append(this.$div);
		},
		onClick: function(fn){
			this.$div.click(fn);
		}
	});

	return {
		init: function(setting){
			return new Button(setting);
		}
	};
});
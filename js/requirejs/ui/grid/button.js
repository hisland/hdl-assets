define(['jquery', 'kissy', './msg'], function($, S, MSG){
	/**
	 * @class
	 * @memberOf ui.Grid
	 */
	function Button(setting){
		this.__init(setting).__initEvent();
	}

	/**
	 * @lends ui.Grid.Button#
	 */
	S.augment(Button, {
		/**
		 * 初始化table基本结构,并设置引用
		 * @private
		 * @return this
		 */
		__init: function(setting){
			this.$div = $('<a href="javascript:;" class="hdlgrid-btn"><span class="hdlgrid-btn2"><span></span></span></a>');
			this.$span = this.$div.find('>span>span');

			//按钮文字
			this.$span.html(setting.text || MSG.btn_text);

			//按钮icon
			this.$span.addClass('hdlgrid-' + setting.icon);

			//按钮title
			this.$div.attr('title', setting.title || MSG['btn_' + setting.icon]);

			return this;
		},
		/**
		 * 初始化事件
		 * @private
		 * @return this
		 */
		__initEvent: function(){
			return this;
		}
	});

	return Button;
});
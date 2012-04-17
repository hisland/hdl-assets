define([ 'jquery', 'kissy' ], function($, S) {
	/**
	 * @class
	 * @memberOf sf
	 */
	function DragSort(target) {
		this.__init(target).__initEvent();
	}

	function nodrag(e){
		e.preventDefault();
	}

	/**
	 * @lends sf.DragSort#
	 */
	S.augment(DragSort, {
		/**
		 * @private
		 * @return this
		 */
		__init : function(target) {
			this.$div = $(target);
			return this;
		},
		/**
		 * @private
		 * @return this
		 */
		__initEvent : function() {
			// 绑定自己的事件
			this.start = S.bind(this.start, this);
			this.move = S.bind(this.move, this);
			this.end = S.bind(this.end, this);

			this.$div.children().mousedown(this.start);
			return this;
		},
		/**
		 * @private
		 */
		start : function(e) {
			this.$div.children().mousemove(this.move);
			this.$div.on('selectstart', nodrag);
			$(document).mouseup(this.end);
			this.__target = $(e.target).addClass('drag-move');
			this.__lastY = 0;
		},
		/**
		 * @private
		 */
		move : function(e) {
			var dir_up = e.pageY - this.__lastY < 0;
			this.__lastY = e.pageY;

			if (e.target !== this.__target[0]) {
				if (dir_up) {
					$(e.target).before(this.__target);
				} else {
					$(e.target).after(this.__target);
				}
			}
		},
		/**
		 * @private
		 */
		end : function(e) {
			this.$div.children().off('mousemove', this.move);
			this.$div.off('selectstart', nodrag);
			$(document).off('mouseup', this.end);
			this.__target.removeClass('drag-move');

			// 触发排序事件
			this.onSort();
		},
		/**
		 * 排序事件, 不传参表示触发
		 * 
		 * @param fn
		 *            Function
		 * @event
		 * @return this
		 */
		onSort : function(fn) {
			fn ? $(this).on('sort', fn) : $(this).trigger('sort');
			return this;
		}
	});

	return DragSort;
});
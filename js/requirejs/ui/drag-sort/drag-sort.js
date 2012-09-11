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
			this.$div.children().on('mousedown', this, this.start);
			return this;
		},
		/**
		 * @private
		 */
		start : function(e) {
			var me = e.data;
			if(e.target === this || $(e.target).is('div,p')){
				me.$div.children().on('mousemove', me, me.move);
				me.$div.on('selectstart', nodrag);
				me.$div.css('-moz-user-select', 'none');
				$(document).on('mouseup', me, me.end);
				me.__target = $(this).addClass('drag-move');
				me.__lastY = 0;
			}
		},
		/**
		 * @private
		 */
		move : function(e) {
			var me = e.data;
			var dir_up = e.pageY - me.__lastY < 0;
			me.__lastY = e.pageY;

			if (this !== me.__target[0]) {
				if (dir_up) {
					$(this).before(me.__target);
				} else {
					$(this).after(me.__target);
				}
			}
		},
		/**
		 * @private
		 */
		end : function(e) {
			var me = e.data;
			me.$div.children().off('mousemove', me.move);
			me.$div.off('selectstart', nodrag);
			me.$div.css('-moz-user-select', '');
			$(document).off('mouseup', me.end);
			me.__target.removeClass('drag-move');

			// 触发排序事件
			me.onSort();
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
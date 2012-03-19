/**
 * 
 */

define(['jquery', 'kissy', 'css!./compare'], function($, S){
	/**
	 * @class
	 * @memberOf sf
	 */
	function Compare(){
		this.__init().__initEvent();
	}

	/**
	 * @lends sf.Compare#
	 */
	S.augment(Compare, {
		/**
		 * @return this
		 */
		__init: function(){
			this.$div = $('<div class="compare-wrap"><div class="compare-wrap-in"></div></div>');
			return this;
		},
		/**
		 * @return this
		 */
		__initEvent: function(){

			//点击-号折叠
			this.$div.on('click', 'div.compare-sub-minus', this, function(e){
				//修正符号状态
				$(this).parent().siblings().find('.compare-sub-minus').add(this).attr('class', 'compare-sub-plus');
				//隐藏下级
				$(this).parent().parent().next().hide();
			});

			//点击+号展开
			this.$div.on('click', 'div.compare-sub-plus', this, function(e){
				//修正符号状态
				$(this).parent().siblings().find('.compare-sub-minus').add(this).attr('class', 'compare-sub-minus');
				//显示下级
				$(this).parent().parent().next().show();
			});

			return this;
		},
		/**
		 * 对比2个数据
		 * @param a Object
		 * @param b Object
		 * @return 
		 */
		setData: function(a, b){
			//采用递归进行对比
			function recursion(a, b, div){
				var row, col1, col2, used = {};

				for(var i in a){
					used[i] = true;

					row = $('<div class="compare-row"></div>').appendTo(div);

					col1 = $('<div class="compare-col1"><div class="compare-item"><span class="compare-label">' + i + ':</span><span>' + a[i] + '</span></div></div>').appendTo(row);

					//b有相同的属性
					if(b.hasOwnProperty(i)){
						col2 = $('<div class="compare-col2"><div class="compare-item"><span class="compare-label">' + i + ':</span><span>' + b[i] + '</span></div></div>').appendTo(row);
					}

					//它们的属性值相同
					if(a[i] !== b[i]){
						col1.add(col2).find('span:eq(1)').addClass('compare-orange');
					}
				}
			}

			//递归前将数据清空
			recursion(a, b, this.$div.children().empty());
			return this;
		},
		/**
		 * 设置大小
		 * @param width Int
		 * @param height Int
		 * @return this
		 */
		setSize: function(width, height){
			this.$div.width(width);
			this.$div.width(height);
			return this;
		}
	});

	return Compare;
});
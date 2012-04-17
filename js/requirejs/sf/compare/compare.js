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
			this.$div = $('<div class="compare-wrap"><div class="compare-mid-line"></div><div class="compare-wrap-in"></div></div>');
			this.$mid = this.$div.children(':first');
			this.$wrap = this.$mid.next();
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
				$(this).parent().siblings().find('.compare-sub-plus').add(this).attr('class', 'compare-sub-minus');
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
		setData: function(data){
			var legend = data[0],
				a = data[1],
				b = data[2];

			//采用递归进行对比
			function recursion(legend, a, b, div){
				S.each(legend, function(v, i, o){
					var wrap;
					if(S.isArray(v)){
						i = v.shift();
						makeTitle(i, a && a[i] && a[i][v[0][0]], b && b[i] && b[i][v[0][0]], div);
						wrap = $('<div class="compare-sub-wrap"></div>').appendTo(div);
						S.each(v, function(r, j, o){
							makeTitle(r[0], a && a[i] && a[i][r[0]], b && b[i] && b[i][r[0]], wrap);
							recursion(r[1], a && a[i] && a[i][r[0]], b && b[i] && b[i][r[0]], $('<div class="compare-sub-wrap"></div>').appendTo(wrap));
						});
					}else{
						makeRow(v, a && a[v], b && b[v], div);
					}
				});
			}

			function makeRow(key, val1, val2, div){
				var col1 = $(''), col2 = $(''), row;
				row = $('<div class="compare-row"></div>').appendTo(div);
				if(val1){
					col1 = $('<div class="compare-col1"><div class="compare-item"><span class="compare-label">' + key + ':</span><span>' + val1 + '</span></div></div>').appendTo(row);
				}
				if(val2){
					col2 = $('<div class="compare-col2"><div class="compare-item"><span class="compare-label">' + key + ':</span><span>' + val2 + '</span></div></div>').appendTo(row);
				}
				//它们的属性值不同
				if(val1 !== val2){
					col1.add(col2).find('span:eq(1)').addClass('compare-orange');
				}
			}
			function makeTitle(key, a, b, div){
				var row;
				row = $('<div class="compare-row"></div>').appendTo(div);
				if(a){
					$('<div class="compare-col1"><div class="compare-sub-minus">' + key + '</div></div>').appendTo(row);
				}
				if(b){
					$('<div class="compare-col2"><div class="compare-sub-minus">' + key + '</div></div>').appendTo(row);
				}
			}

			//递归前将数据清空
			recursion(legend, a, b, this.$wrap.empty());
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
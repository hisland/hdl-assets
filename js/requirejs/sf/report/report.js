/**
 * 
 */

define(['jquery', 'kissy', 'ui/grid/grid'], function($, S, Grid){
	/**
	 * @class
	 * @memberOf sf
	 */
	function Report(setting){
		this.__init(setting).__initEvent();

		//初始化列
		this.__initCol();

		//默认开启分页
		this.enable_page = true;
		this.$pager.css('display', 'block');
	}

	/**
	 * @lends sf.Report#
	 */
	S.augment(Report, Grid, {
		/**
		 * 初始化表头
		 * @private
		 * @return this
		 */
		__initCol: function(){
			var total_width = 0;

			this.$colgrouphead.empty();
			this.$colgroupbody.empty();

			S.each(this.colModel, function(v, i, o){
				this.addCol(v);
				total_width += (v.width-0);
			}, this);

			this.$div.find('table').width(total_width);
			return this;
		},
		/**
		 * 添加一列数据
		 * @return this
		 */
		addCol: function(col_setting){

			//增加col标签
			this.$colgrouphead.append('<col style="width:' + col_setting.width + 'px;" />');
			this.$colgroupbody.append('<col style="width:' + col_setting.width + 'px;" />');

			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setData: function(data){
			var grid = this;

			//隐藏无数据提示
			grid.$nodata.hide();

			//保存数据引用
			grid.data = data;

			grid.$thead.html(data.headHTML);
			grid.$tbody.html(data.bodyHTML);

			if(data.colModel){
				this.colModel = data.colModel;
				this.__initCol();
			}

			//生成分页数据
			if(this.enable_page){
				this.makePager();
			}

			return this;
		}
	});

	return Report;
});
/**
 * @fileOverview
 * @module popManager
 * @author hisland hisland@qq.com
 * @description 表格插件
 * <pre><code>
 * API:
 * 		var g = $.hdlGrid(setting); - 生成一个表格对象并传入预设置
 * 		g.setting(setting); - 修改设置
 * 		g.setData(data); - 修改内容
 * 		g.refresh(); - 刷新表格显示
 * 
 *		g.addCol(col_set); - 添加一列
 * 		g.setCol(n, [fn|col_set]); - 修改n列, 传入修改函数或者设置
 * 		g.addRow(data); - 添加一行
 * 		g.setRow(n, fn); - 修改n行, 传入修改函数
 * 
 * 		g.$div - 指向表格的最外层元素,为一个jq对象
 * 

2011-4-23 16:35:4:
	3步走:
		1.初始化一个空壳
		2.填充数据
		3.修正宽高
		3.drag位置及初始化[如果有]

	表格生成之后可以:
		1.增加行/列
		2.修改行/列
		3.遍历行/列
		4.修改设置[grid, col, row]
		5.嵌入html要注意html实体的转义,除非特殊指明使用原始数据

2011-06-20 16:43:51
	single_check, chekckbox只能选择一个, 没有全选checkbox, 也就是一次只能操作1行数据
	动态改变列
	动态改变行
	checkbox
	编辑
	scrollbar_width
	合并单元格

2011-07-21 11:02:27
	按住shift键选择范围

2011-09-02 14:17:37
	动态增加删除列
	动态隐藏显示列

2011-09-22 20:15:08
	反选操作

2011-10-09 11:15:48
	双击拖动自动适应宽度

 * </code></pre>
 */
KISSY.add('hdlGrid', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $('');

	/**
	 * 表格预设置,需要修改时可参考
	 */
	var pre_setting = {
			/** 是否启用左侧的checkbox */
			enable_checkbox: true,
			/** checkbox的name, 对应后台接收 */
			var_checkbox: 'ckb-name',

			/** 是否启用列拖动 */
			enable_drag: true,
			/** 是否启用列排序 */
			enable_sort: true,
			/** 是否启用列切换显示 */
			enable_toggle: true,
			/** 是否可编辑 */
			enable_edit: true,
			/** 是否可改变列宽度 */
			enable_col_resize: true,

			/** 是否启用表头 */
			enable_title: true,
			/** 是否启用控制按钮 */
			enable_button: true,

			/** 是否显示弹出的详细信息 */
			enable_pop_detail: true,

			/** 最小宽度 */
			min_width: 150,
			/** 最小高度 */
			min_height: 100,
			/** 最大宽度 */
			max_width: 450,
			/** 最大高度 */
			max_height: 300,
			/** 初始化时,自动调整宽度 */
			auto_size: true,

			/** 是否使用分页 */
			enable_page: true,
			/** 当前页 */
			page_curr: 0,
			/** page_curr的name, 对应后台接收 */
			var_page: 'page',
			/** 每页显示数量的name, 对应后台接收 */
			var_num_per_page: 'perPageNum',
			/** 总页数 */
			page_total: 0,
			/** [0]为[1]的索引, [1]为可选择的页数量值 */
			num_per_page: [2, [5, 10, 15, 20]],

			/** 获取数据的地址 */
			url: '',
			/** 传递的额外参数, 可为函数, 函数命名空间[暂不支持] */
			param: '',
			/** 上次请求时的参数列表, 不含var_page, var_num_per_page */
			last_param: '',
			/** 是否自动加载 */
			auto_load: true,

			/** 文本强制在一行 */
			nowrap: true,

			/** 单行选中checkbox, 无全选 */
			single_check: false,
			/** 单行选择 */
			single_select: true,

			/** 无数据时显示的内容 */
			msg_empty: '暂无数据,根据内容填充后的大小居中显示',
			/** 加载时显示的内容 */
			msg_proc: '正在加载,请稍等...',

			/** 间隔背景色设置 */
			row_bgs: ['#fff', '#f00'],

			/** 对响应结果进行预处理 */
			preProcess: null
		};

	/**
	 * 列预设置,需要修改时可参考
	 */
	var pre_col_model = {
			/** 显示名称 */
			display: '列名',
			/** 对应的键名 */
			name: '',
			/** 显示与否 */
			hide: false,
			/** 列宽度,数字或 百分比('50%') */
			width: '50',
			/** 对齐方式 */
			align: 'left',
			/** 表头对齐方式 */
			align_head: 'center',
			/** 可否排序 */
			enable_sort: true,
			/** 可否隐藏 */
			enable_hide: true,
			/** 列单元格处理, function(cell){} */
			process: null
		};

	/**
	 * 行预设置,需要修改时可参考
	 */
	var pre_row = {
			enable_edit: true,
			enable_delete: true,
			enable_select: true
		};

	/**
	 * @class
	 * @name hdlGrid
	 */
	function Grid(setting){
		//更改为构造方式
		if(!(this instanceof Grid)){
			return new Grid(setting);
		}

		this.setting = {};
		S.mix(this.setting, pre_setting);
		//初始化参数配置
		this.setSetting(setting);

		//初始化DOM结构
		this.__initDOM();

		//初始化事件
		this.__initEvent();

		//文本强制在一行
		if(this.setting.nowrap){
			this.$div.addClass('hdlgrid-nowrap');
		}

		//初始化事件
		this.__initHead();

		return this;
	}

	/**
	 * @lends hdlGrid#
	 */
	S.augment(Grid, {
		/**
		 * 初始化table基本结构,并设置引用
		 * @private
		 */
		__initDOM: function(){
			var div = $('<div class="hdlgrid-wrap"><div class="hdlgrid-head"><div class="hdlgrid-head-in"><table><thead><tr></tr></thead></table></div></div><div class="hdlgrid-body"><div class="hdlgrid-body-in"><table><colgroup></colgroup><tbody></tbody></table></div></div><div class="hdlgrid-pager"></div><div class="hdlgrid-resizer"><div class="hdlgrid-resizer-i"></div></div><div class="hdlgrid-toggle-div"><table><tbody></tbody></table></div><div class="hdlgrid-toggle-btn"></div><div class="hdlgrid-mask"></div><div class="hdlgrid-nodata"></div><div class="hdlgrid-loading"></div></div>');

			S.mix(this, {
				$div: div,

				$divtitle: div.find('div.hdlgrid-title'),
				$divbutton: div.find('div.hdlgrid-button'),

				$divhead: div.find('div.hdlgrid-head'),
				$divbody: div.find('div.hdlgrid-body'),
				$divpager: div.find('div.hdlgrid-pager'),

				$thead: div.find('div.hdlgrid-head thead'),
				$tbody: div.find('div.hdlgrid-body tbody'),

				$colgrouphead: div.find('div.hdlgrid-head colgroup'),
				$colgroupbody: div.find('div.hdlgrid-body colgroup'),

				$tablehead: div.find('div.hdlgrid-head table'),
				$tablebody: div.find('div.hdlgrid-head table'),

				$mask: div.find('div.hdlgrid-mask'),
				$nodata: div.find('div.hdlgrid-nodata'),
				$loading: div.find('div.hdlgrid-loading')
			});

			return this;
		},
		/**
		 * 初始化表头
		 * @private
		 */
		__initHead: function(){
			var grid = this;
			S.each(this.setting.colModel, function(v, i, o){
				grid.addCol(v);
			});
			return this;
		},
		/**
		 * 初始化各事件
		 * @private
		 */
		__initEvent: function(){
			//body滚动同步head
			this.$div.$wbody.scroll(function(e){
				$(this).prev().find('table').css('left', -this.scrollLeft);
			});
			return this;
		},
		/**
		 * 无数据时填充空白行,使水平滚动条显示出来
		 * @private
		 */
		__blankLine: function(){
			var b = ['<tr>'];
			this.$div.$colgroup.find('col').each(function(i, v){
				b.push('<td></td>');
			});
			b.push('</tr>');
			this.$div.$tbody.html(b.join(''));
			return this;
		},
		/**
		 * 获得当前行的背景色
		 * @private
		 */
		__getRowBg: function(n){
			var len = this.row_bgs.length;
			return this.row_bgs[n % len];
		},
		/**
		 * 更新拖动条位置
		 * @private
		 */
		__fixDragPos: function(){
			
			return this;
		},
		/**
		 * 设置配置
		 */
		setSetting: function(setting){
			if(S.isPlainObject(setting)){
				 S.mix(this.setting, setting);
			}
			return this;
		},
		/**
		 * 生成/更新拖动条
		 */
		setDrag: function(){
			
			return this;
		},
		/**
		 * 添加一列数据
		 */
		addCol: function(col_setting){
			//不覆盖相同的设置,只copy不存在的设置
			S.mix(col_setting, pre_col_model, false);

			this.$div.$thead.find('tr').append('<th>'+ col_setting.display+'</th>');
			this.$div.$colgroup.append('<col />');
			return this;
		},
		/**
		 * 修改一列数据
		 */
		setCol: function(n, fn){
			
			return this;
		},
		/**
		 * 交换两个索引指向的列,从0开始计数
		 */
		swapCol: function(n1, n2){
			//n1小, n2大
			var tmp = [n1, n2].sort();
			n1 = tmp[0];
			n2 = tmp[1];
			tmp = n2-n1-1;//标记是否相邻,相邻为0为false

			var head = this.$div.$thead,
				ths = head.find('th'),
				th1 = ths.filter('th:eq('+n1+')'),
				th2 = ths.filter('th:eq('+n2+')'),
				trs = this.$div.$tbody.find('tr');

			//需要交换的两列都存在才做操作
			if(th1.length && th2.length){
				th2.after(th1);
				tmp && head.find('th:eq('+n1+')').before(th2);//相邻不作此操作
				trs.each(function(i, v){
					v = $(v);
					var td1 = v.find('td:eq('+n1+')');
					var td2 = v.find('td:eq('+n2+')');
					td2.after(td1);
					tmp && v.find('td:eq('+n1+')').before(td2);//相邻不作此操作
				});
			}
			//todo:
			//同时修改colModel里面的位置

			return this;
		},
		/**
		 * 添加一行数据
		 */
		addRow: function(row_data){
			
			return this;
		},
		/**
		 * 修改一行数据
		 */
		setRow: function(n, fn){
			
			return this;
		},
		/**
		 * 交换两个索引指向的行,从0开始计数
		 */
		swapRow: function(n1, n2){
			return this;
		},
		/**
		 * 遍历表头
		 * fn: this->grid, (th, idx)
		 */
		walkHead: function(fn){
			
			return this;
		},
		/**
		 * 遍历某行的单元格
		 * fn: this->grid, (td, idx)
		 */
		walkCell: function(row_n, fn){
			
			return this;
		},
		/**
		 * 遍历列
		 * fn: this->grid, (th, td, idx)
		 */
		walkCol: function(col_n, fn){
			
			return this;
		},
		/**
		 * 遍历行
		 * fn: this->grid, (tr, idx)
		 */
		walkRow: function(fn){
			
			return this;
		},
		/**
		 * 修改数据
		 */
		setData: function(data){
			if(S.isArray(data)){
				$.each(data, function(i, v){
					
				});
			}else{
				S.log('$.Grid.setData: data must be an array!');
			}
			return this;
		},
		/**
		 * 更新宽高
		 */
		fixSize: function(){
			var ths = this.$div.$thead.find('th'),
				tds = this.$div.$tbody.find('tr:eq(0)').find('td'),
				headnbody = this.$div.$head.add(this.$div.$body),
				w_head_sum = 0, w_body_sum = 0;

			ths.each(function(i, v){
				v = $(v);
				var td = tds.eq(i), w1 = v.outerWidth(), w2 = td.outerWidth();
				w_head_sum += w1;
				w_body_sum += w2;
				if(w1 > w2){
					v.add(td).width(w1);
				}else{
					v.add(td).width(w2);
				}
			});
			if(w_head_sum > w_body_sum){
				headnbody.width(w_head_sum);
			}else{
				headnbody.width(w_body_sum);
			}

			headnbody.css('table-layout', 'fixed');

			this.$div.$wbody.height(this.$div.parent().outerHeight() - this.$div.$whead.outerHeight() - this.$div.$wpager.outerHeight())

			return this;
		},
		/**
		 * 获得显示的列名称,以标准键值对返回
		 */
		getDisplayColNames: function(var_name){
			var_name = var_name || 'colName';

			var param = [];
			return param;
		},
		/**
		 * 刷新显示
		 */
		refresh: function(){
		},
		/**
		 * 加载中
		 */
		loading: function(){
			this.$div.$mask.add(this.$div.$loading).show();
			return this;
		},
		/**
		 * 加载完成
		 */
		loaded: function(){
			this.$div.$mask.add(this.$div.$loading).hide();
			return this;
		},
		/**
		 * 无数据显示文本
		 */
		noData: function(str){
			this.$div.$nodata.html(str || this.msg_empty);
			return this;
		},
		/**
		 * 转到某页
		 */
		goPage: function(n){
			return this;
		},
		/**
		 * 合并单元格, 默认合并col,如果指定row则合并row
		 */
		merge: function(type){
			if(type === 'row'){
				
			}else{
				
			}
			return this;
		},
		/**
		 * 刷新显示
		 */
		ajaxLoad: function(fn){
			var grid = this;

			grid.loading();
			$.getJSON(this.setting.url, function(data){
				var b = [];

				$.each(data.rows, function(i, v){
					b.push('<tr>');
					$.each(grid.setting.colModel, function(i1, v1){
						b.push('<td>', v[v1.name], '</td>');
					});
					b.push('</tr>');
				});

				grid.$div.$tbody.html(b.join(''));
				grid._data = data;

				$.isFunction(fn) && fn.call(grid);

				grid.loaded();
			});
		}
	});

	$.extend({
		Grid: Grid
	});

	$.fn.extend({
		hdlGrid: function(setting){
			var elm = this.eq(0),
				width = elm.width(),
				height = elm.height(),
				grid = elm.data('hdlGrid');

			//没有就初始化一个
			if(!grid){
				grid = Grid(setting);
				elm.empty().append(grid.$div);

				//异步加载数据
				if(grid.setting.url && grid.setting.auto_load){
					grid.ajaxLoad();
				}
			}else{
				grid.setSetting(setting);
			}

			return grid;
		}
	});
}, {
	requires: ['jquery-1.4.2']
});
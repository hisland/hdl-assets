/**
 * @fileOverview
 * @module popManager
 * @author hisland hisland@qq.com
 * @description 表格插件
 * <pre><code>
 * API:
 * 		var g = $.hdlGrid(setting); - 生成一个表格对象并传入预设置
 * 		g.setSetting(setting); - 修改设置
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
define(['jquery', 'kissy', './msg', './pre-setting', './pre-col', './pre-row', './pre-data', './button', 'util', './import-button', 'css!./grid'], function($, S, MSG, Setting, Col, Row, PreData, Button, Util, importButton){
	/**
	 * @class
	 * @memberOf ui
	 */
	function Grid(setting){
		this.__init(setting).__initEvent();

		//初始化列
		this.__initCol();

		//文本强制在一行
		if(this.nowrap){
			this.$div.addClass('hdlgrid-nowrap');
		}

		//使用分页
		if(this.enable_page){
			this.$pager.css('display', 'block');
		}

		//自动加载数据
		if(this.auto_load){
			this.ajaxLoad();
		}

		return this;
	}

	/**
	 * @lends ui.Grid#
	 */
	S.augment(Grid, {
		/**
		 * 初始化table基本结构,并设置引用
		 * @private
		 * @return this
		 */
		__init: function(setting){
			var div = $('<div class="hdlgrid-wrap"><div class="hdlgrid-button"></div><div class="hdlgrid-head"><div class="hdlgrid-head-in"><table><colgroup></colgroup><thead><tr></tr></thead></table></div></div><div class="hdlgrid-body"><div class="hdlgrid-body-in"><table><colgroup></colgroup><tbody></tbody></table></div></div><div class="hdlgrid-pager"></div><div class="hdlgrid-resizer"><div class="hdlgrid-resizer-i"></div></div><div class="hdlgrid-toggle-div"><table><tbody></tbody></table></div><div class="hdlgrid-toggle-btn"></div><div class="hdlgrid-mask"></div><div class="hdlgrid-nodata"></div><div class="hdlgrid-loading"></div></div>');

			S.mix(this, {
				$div: div,

				$title: div.find('div.hdlgrid-title'),
				$button: div.find('div.hdlgrid-button'),

				$head: div.find('div.hdlgrid-head'),
				$body: div.find('div.hdlgrid-body'),
				$pager: div.find('div.hdlgrid-pager'),

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

			//默认配置
			S.mix(this, Setting);
			S.mix(this, {
				data: S.clone(PreData)
			});

			//初始化参数配置
			S.mix(this, setting);

			return this;
		},
		/**
		 * 初始化事件
		 * @private
		 * @return this
		 */
		__initEvent: function(){
			//body滚动同步head
			this.$body.scroll(function(e){
				$(this).prev().find('table').css('left', -this.scrollLeft);
			});

			//全选checkbox
			this.$div.on('change', 'input.check-all', this, function(e){
				if(this.checked){
					e.data.$tbody.find('input.check-one').attr('checked', true).parent().parent().css('background-color', e.data.select_bg);
				}else{
					e.data.$tbody.find('input.check-one').attr('checked', false).parent().parent().css('background-color', '');
				}
				//触发内部事件
				e.data.onSelect();
			});
			//单个checkbox
			this.$div.on('change', 'input.check-one', this, function(e){
				var grid = e.data;
				//只能单个选择
				if(grid.single_check){
					$(this).parent().parent().siblings().find('input:checked').attr('checked', false).parent().parent().css('background-color', '');
					//修正背景色
					if(this.checked){
						$(this).parent().parent().css('background-color', e.data.select_bg);
					}else{
						$(this).parent().parent().css('background-color', '');
					}
				}else{
					//修正全选选中状态
					if(grid.$tbody.find('input.check-one').not(':checked').length){
						grid.$thead.find('input.check-all').attr('checked', false);
					}else{
						grid.$thead.find('input.check-all').attr('checked', true);
					}
					//修正背景色
					if(this.checked){
						$(this).parent().parent().css('background-color', e.data.select_bg);
					}else{
						$(this).parent().parent().css('background-color', '');
					}
				}
				//触发内部事件
				e.data.onSelect();
			});

			//点击分页区域
			this.$pager.on('click', 'a.hdlgrid-item:not(.hdlgrid-hover)', this, function(e){
				var grid = e.data;
				grid.data.currPage = $(this).text();
				grid.ajaxLoad();
			});

			return this;
		},
		/**
		 * 初始化表头
		 * @private
		 * @return this
		 */
		__initCol: function(){
			var total_width = 0;

			//需要生成checkbox的情况
			if(this.enable_checkbox){
				if(!this.single_check){
					this.$thead.find('tr').append('<th class="td-center"><input type="checkbox" class="check-all" value="" /></th>');
				}else{
					this.$thead.find('tr').append('<th class="td-center"></th>');
				}
				this.$colgrouphead.append('<col style="width:24px;" />');
				this.$colgroupbody.append('<col style="width:24px;" />');

				total_width = 24;
			}

			S.each(this.colModel, function(v, i, o){
				this.addCol(v);
				total_width += (v.width-0);
			}, this);

			this.$div.find('table').width(total_width);
			return this;
		},
		/**
		 * 无数据时填充空白行,使水平滚动条显示出来
		 * @private
		 * @return this
		 */
		__blankLine: function(){
			var str = '<tr style="visibility:hidden;">';

			//checkbox需要占一列
			if(this.enable_checkbox){
				str += '<td></td>';
			}

			//根据colModel计算需要多少列
			str += S.map(this.colModel, function(v, i, o){
				return '<td></td>';
			}).join('');
			str += '</tr>';

			this.$tbody.html(str);
			return this;
		},
		/**
		 * 获得当前行的背景色
		 * @param n Int 当前行数
		 * @private
		 * @return String
		 */
		__getRowBg: function(n){
			return this.row_bgs[n % this.row_bgs.length];
		},
		/**
		 * 添加一列数据
		 * @return this
		 */
		addCol: function(col_setting){
			//不覆盖相同的设置,只copy不存在的设置
			S.mix(col_setting, Col, false);

			//设置表头
			if(col_setting.align_head !== 'center'){
				this.$thead.find('tr').append('<th class="td-' + col_setting.align_head + '">'+ col_setting.display+'</th>');
			}else{
				this.$thead.find('tr').append('<th>'+ col_setting.display+'</th>');
			}

			//增加col标签
			this.$colgrouphead.append('<col style="width:' + col_setting.width + 'px;" />');
			this.$colgroupbody.append('<col style="width:' + col_setting.width + 'px;" />');

			return this;
		},
		/**
		 * 设置数据
		 * @return this
		 */
		setData: function(data){
			var grid = this;

			//清空原有数据
			grid.$tbody.empty();

			//隐藏无数据提示
			grid.$nodata.hide();

			//将全选取消
			grid.$thead.find(':checkbox').attr('checked', false);
			
			//对数据进行预处理
			if(grid.preProcess){
				grid.preProcess(data);
			}

			//读取数据出错并返回
			if(!data.rows){
				this.noData(MSG.error);
				//填充空行使滚动条出现
				this.__blankLine();
				S.log(['error, grid.setData: ', data]);
			}

			//没有数据
			else if(!data.rows.length){
				this.noData();
				//填充空行使滚动条出现
				this.__blankLine();

				//保存数据引用
				grid.data = data;
			}else{

				//保存数据引用
				grid.data = data;

				//生成表格填充到tbody
				S.each(data.rows, function(row, i){
					//bg是对行的背景色处理
					var bg = grid.__getRowBg(i),
						tr = $('<tr style="background:' + bg + ';"></tr>');

					//使用checkbox列
					if(grid.enable_checkbox){
						//行上禁用checkbox
						if(row.enable_check !== false){
							tr.append('<td class="td-center"><input type="checkbox" class="check-one" value="" /></td>');
						}else{
							tr.append('<td class="td-center"></td>');
						}
					}

					S.each(grid.colModel, function(col, j){
						var val, td;

						//单元格对齐方式
						if(col.align !== 'left'){
							td = $('<td class="td-' + col.align + '"></td>');
						}else{
							td = $('<td></td>');
						}

						//单元格预处理
						if(col.process){
							val = col.process(row, col, td, tr);
						}else{
							val = row[col.name];
							//string转实体
							if(S.isString(val)){
								val = Util.entityHTML(val);
							}
						}

						//NOTICE:此与process偶尔会冲突,请自行解决,比如返回的内容包在另外一个标签内自己加title
						if(col.enable_title){
							tr.append(td.attr('title', val).html(val));
						}else{
							tr.append(td.html(val));
						}
					});

					tr[0].rawData = row;
					grid.$tbody.append(tr);
				});
			}

			//触发选择事件,修正按钮状态
			this.onSelect();

			//生成分页数据
			if(this.enable_page){
				this.makePager();
			}

			//触发修正高度操作
			$(window).resize();

			return this;
		},
		/**
		 * 设置请求url
		 * @param url String
		 * @return this
		 */
		setUrl: function(url){
			this.url = url;
			return this;
		},
		/**
		 * 设置请求参数
		 * @param param Array|String|Object
		 * @return this
		 */
		setParam: function(param){
			this.param = param;
			return this;
		},
		/**
		 * 显示遮罩与loading状态
		 * @return this
		 */
		loading: function(){
			this.$mask.add(this.$loading).css('display', 'block');
			return this;
		},
		/**
		 * 取消遮罩与loading状态
		 * @return this
		 */
		loaded: function(){
			this.$mask.add(this.$loading).css('display', '');
			return this;
		},
		/**
		 * 无数据显示文本, 不传使用默认文本
		 * @param str String|undefined
		 * @return this
		 */
		noData: function(str){
			this.$nodata.html(str || MSG.empty).show();
			return this;
		},
		/**
		 * 异步加载数据
		 * @return this
		 */
		ajaxLoad: function(fn){
			var grid = this, param = S.clone(grid.param) || [];

			//加入分页参数
			if(grid.data){
				param.push({
					name: 'perPageNum',
					value: grid.data.perPageNum
				});
				param.push({
					name: 'currPage',
					value: grid.data.currPage
				});
			}

			//发送请求
			grid.loading();
			$.post(grid.url, param, function(data){
				grid.setData(data);

				S.isFunction(fn) && fn.call(grid);
				grid.loaded();
			}, 'json');
			return this;
		},
		/**
		 * 添加一个按钮
		 * @param setting Object
		 * @return this
		 */
		addButton: function(setting){
			var button = new Button(setting), m;

			//按钮的禁用状态切换
			if(S.isFunction(setting.enable)){
				this.onSelect(function(e, items){
					//返回true表示要禁用按钮
					button.$div.toggleClass('hdlgrid-btn-dis', !setting.enable(items, button.$div));
				});
			}else if(S.isString(setting.enable)){
				if(m = setting.enable.match(/([=<>])(\d+)/)){
					switch(m[1]){
						case '=':
							this.onSelect(function(e, items){
								button.$div.toggleClass('hdlgrid-btn-dis', items.length != m[2]);
							});
							break;
						case '>':
							this.onSelect(function(e, items){
								button.$div.toggleClass('hdlgrid-btn-dis', items.length <= m[2]);
							});
							break;
						case '<':
							this.onSelect(function(e, items){
								button.$div.toggleClass('hdlgrid-btn-dis', items.length >= m[2]);
							});
					}
				}
			}

			//点击事件
			button.$div.click(this, function(e){
				//非禁用状态下点击才执行回调
				if(!$(this).is('.hdlgrid-btn-dis')){
					setting.click.call(this, e, e.data.getChecked());
				}
			});

			//按钮区域显示出来
			this.$button.append(button.$div).css('display', 'block');
			return this;
		},
		/**
		 * 由于需要使用flash进行上传, 单独写一个方法
		 * @param setting Object
		 * @return this
		 */
		addImportButton: function(setting){
			var button, flash_setting;

			//修正个别参数
			S.mix(setting, {
				posturl: 'post.php',
				max_size: '10240',
				filter: '*'
			}, false);

			//flash设置
			flash_setting = {
				flashid: S.guid('flash-'),
				flashurl: require.toUrl('ui/swfobject/file-upload.swf'),
				flashvars: {
					//参数要转实体再传入flash
					url: escape(setting.posturl),
					filter: setting.filter,
					upload_name: setting.upload_name,
					max_size: setting.max_size,
				},
				attributes: {
					style: 'opacity:0;filter:alpha(opacity=0);position:absolute;top:0;left:0;'
				},
				width: 64,
				height: 24
			};

			//按钮
			button = new Button({
				icon: 'import',
				text: setting.text
			});

			button.$div.css('position', 'relative').append('<span id="' + flash_setting.flashid + '"></span>');

			//按钮区域显示出来
			this.$button.append(button.$div).css('display', 'block');

			//初始化导入按钮的flash
			//TODO
			setTimeout(function(){
				importButton.init(flash_setting);
			}, 100);
		},
		/**
		 * 获得选中checkbox对应行的rawData数组
		 * @return Array
		 */
		getChecked: function(){
			return this.$tbody.find('.check-one:checked').parent().parent().map(function(i, v){
				return this.rawData;
			});
		},
		/**
		 * checkbox选择状态修改 事件
		 * @param fn Function
		 * @return this
		 */
		onSelect: function(fn){
			fn ? $(this).on('select', fn) : $(this).trigger('select', [this.getChecked()]) ;
			return this;
		},
		/**
		 * 生成分页数据
		 * @return this
		 */
		makePager: function(){
			var grid = this,
				rs = [],
				num = [],
				curr = grid.data.currPage - 0,
				all = grid.data.allPage - 0;

			//少于10页全部显示出来
			if(all < 10){
				Util.run(function(n){
					n++;
					if(n !== curr){
						rs.push('<a class="hdlgrid-item" href="javascript:;">', n, '</a>');
					}else{
						rs.push('<a class="hdlgrid-item hdlgrid-hover" href="javascript:;">', n, '</a>');
					}
				}, all);
			}else{
				//值: 1表示要显示, 2表示为当前页

				//前面3页做标记
				num[1] = 1;
				num[2] = 1;
				num[3] = 1;

				//后面3页做标记
				num[all - 2] = 1;
				num[all - 1] = 1;
				num[all] = 1;

				//当前页做标记, 要在上面2个之后,否则会被覆盖
				num[curr] = 2;

				//当前页2侧标记
				if(curr > 2 && curr < (all - 1)){
					num[curr - 1] = 1;
					num[curr + 1] = 1;
				}

				//因为是从1开始, 去掉第0个元素
				num.shift();

				S.each(num, function(v, i, o){
					i++;
					if(!v){
						//o.last标记是否已经放置了'...'
						if(!o.last){
							o.last = true;
							rs.push('<span class="hdlgrid-item">...</span>');
						}
					}else{
						o.last = false;
						if(v === 1){
							rs.push('<a class="hdlgrid-item" href="javascript:;">', i, '</a>');
						}else if(v === 2){
							rs.push('<a class="hdlgrid-item hdlgrid-hover" href="javascript:;">', i, '</a>');
						}
					}
				});
			}
			this.$pager.html(rs.join(''));

			return this;
		}
	});

	return Grid;
});
/**
 * 
 */

define(['jquery', 'kissy', 'ui/grid', './count-down', './fns', 'css!./audit'], function($, S, Grid, CD, FNS){
	/**
	 * 组合ui.grid模块,修改一些实现
	 * @class
	 * @memberOf sf
	 */
	function Audit(setting){
		this.__init(setting);
	}

	/**
	 * @lends sf.Audit#
	 */
	S.augment(Audit, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__init: function(setting){
			var me = this;

			me.delay = setting.delay || 30;
			me.numPerPage = setting.numPerPage || 50;
			me.refreshUrl = setting.refreshUrl;
			me.postUrl = setting.postUrl;
			me.makeParam = setting.makeParam;

			var $left = $('<div class="audit-button-left"><span>提交延迟<select></select>秒</span><span>每页显示<select></select>条</span></div>'),
				$right = $('<div class="audit-button-right"></div>'),
				$delay = $left.find('select').eq(0),
				$numPerPage = $left.find('select').eq(1),
				$button_refresh = $('<a href="javascript:;" class="hdlgrid-btn"><span class="hdlgrid-btn2"><span class="hdlgrid-refresh">刷新</span></span></a>'),
				$button_post = $('<a href="javascript:;" class="hdlgrid-btn"><span class="hdlgrid-btn2"><span class="hdlgrid-post">全部提交</span></span></a>');

			//提交延迟
			$delay.append(S.map(setting.numPerPages, function(v, i, o){
				return '<option value="' + v + '">' + v + '</option>';
			}).join('')).change(function(){
				me.delay = this.value;
			});

			//分页条数
			$numPerPage.append(S.map(setting.delays, function(v, i, o){
				return '<option value="' + v + '">' + v + '</option>';
			}).join('')).change(function(){
				me.numPerPage = this.value;
			});

			//刷新按钮点击
			$button_refresh.click(S.bind(this.refresh, this));
			//全部提交按钮点击
			$button_post.click(S.bind(this.postAll, this));

			//按钮
			$right.append($button_post);

			this.types = setting.types;

			setting.grid.colModel.push(
				{
					display: '操作',
					width: 100,
					align: 'center',
					process: function(row, col){
						//生成选择框
						var select = $('<select style="width:80px;border:1px solid #dbdada;"></select>').append(S.map(setting.types, function(v, i, o){
								return '<option value="' + v[0] + '">' + v[1] + '</option>';
							}).join(''));

						//作用域应该在这里
						var count;

						//去掉10秒的延迟
						row.timeout -= 10;
						//检查消息超时
						function checkTimeout(){
							//超时时间小于20秒时进行提示
							if(row.timeout-- < 20){
								//有计时且大于超时时间, 直接设置为超时时间
								if(count > -1){
									if(count > row.timeout){
										count = row.timeout;
									}
								}else{
									//过期倒计时
									if(row.timeout > 0){
										select.parent().next().html('<span style="color:#ff8604;">' + row.timeout + '秒后过期</span>');
									}
									//过期进行提示
									else{
										select.parent().next().html('<span style="color:#ff8604;">已过期</span>');
										select.remove();
										CD.remove(checkTimeout);
									}
								}
							}
						}
						CD.put(checkTimeout);

						select.change(function(e){
							//选择 请选择不做操作
							if(this.value === '-1'){
								return ;
							}
							count = me.delay;

							var span = $('<span style="color:#green;">' + count + '秒后提交</span>'),
								cancel = $('<a class="audit-cancel" href="javascript:;">取消</a>'),
								dt = me.makeParam(row, this.value),
								f = function(){
									//不为0修正倒计时
									if(count-- > 0){
										span.html(count + '秒后提交');
									}
									//计时为0时提交
									else{
										post();
									}
								},
								post = function(){
									$.post(me.postUrl, dt);
									cancel.parent().html('已提交');
									CD.remove(f);
									CD.remove(checkTimeout);
									FNS.remove(post);
								};

							CD.put(f);
							FNS.put(post);

							//点击取消
							cancel.click(function(e){
								CD.remove(f);
								FNS.remove(post);
								count = undefined;
								select.attr('disabled', false);
								$(this).parent().html('无操作');
							});

							//修改状态栏
							$(this).parent().next().empty().append(span, cancel);

							select.attr('disabled', true);
						});

						return select;
					}
				},{
					display: '状态',
					width: 100,
					align: 'center',
					process: function(row, col){
						return '无操作';
					}
				}
			);

			//表格可以换行
			setting.grid.nowrap = false;
			//表格可以换行
			setting.grid.enable_page = false;

			//初始化表格并放入按钮等内容
			this.grid = Grid.init(setting.grid);
			this.grid.$button.css('display', 'block').append($left).append($right);
			this.grid.$body.addClass('audit-table');

			//开始计时器
			CD.start();

			this.grid.addData = function(data){
				var grid = this;

				//将全选取消
				grid.$thead.find(':checkbox').attr('checked', false);

				//没有数据时返回
				if(!data.rows.length){
					return this;
				}

				//对数据进行预处理
				if(grid.preProcess){
					data = grid.preProcess(data);
				}

				//生成表格填充到tbody
				S.each(data.rows, function(row, i){
					//bg是对行的背景色处理
					var bg = grid.__getRowBg(i), tr = $('<tr style="background:' + bg + ';"></tr>');

					//需要生成checkbox的情况
					if(grid.enable_checkbox){
						tr.append('<td><input type="checkbox" class="check-one" value="" /></td>');
					}

					S.each(grid.colModel, function(col, j){
						var val;
						//单元格预处理
						if(col.process){
							val = col.process(row, col);
						}else{
							val = row[col.name];
						}

						//单元格对齐方式
						if(col.align !== 'left'){
							tr.append($('<td class="td-' + col.align + '"></td>').append(val));
						}else{
							tr.append($('<td></td>').append(val));
						}
					});

					tr[0].rawData = row;
					grid.$tbody.append(tr);
				});

				return this;
			}
			this.grid.clean = function(){
				this.$tbody.find('tr').each(function(i, v){
					var text = $(v).find('td:last').text();
					if(text === '已过期' || text === '已提交'){
						$(v).remove();
					}
				});
				this.$body[0].scrollTop = 0;
			}

			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		refresh: function(){
			var grid = this.grid,
				dt = S.clone(this.param) || [];
			grid.clean();

			dt.push({
				name: 'perPageNum',
				value: this.numPerPage
			});
			
			grid.loading();
			$.post(this.refreshUrl, dt, function(rs){
				grid.setData(rs);
				grid.loaded();
			}, 'json');
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		postAll: function(){
			FNS.run();
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setParam: function(param){
			this.param = param;
			return this;
		}
	});

	return Audit;
});
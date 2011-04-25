/**********************************************************************************************
 * 名称: 表格插件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-21 15:32:38
 * 版本: v1
 * 
 * var g = $.hdlGrid(setting); - 生成一个表格对象并传入预设置
 * g.setting(setting); - 修改设置
 * g.data(data); - 修改内容
 * g.refresh(); - 刷新表格显示
 * 
 * g.addCol(col_set); - 添加一列
 * g.setCol(n, [fn|col_set]); - 修改n列, 传入修改函数或者设置
 * g.addRow(data); - 添加一行
 * g.setRow(n, fn); - 修改n行, 传入修改函数
 * 
 * g.div - 指向表格的最外层元素,为一个jq对象
 * 
 * 2011-4-23 16:35:4:
 * 		3步走:
 * 			1.初始化一个空壳
 * 			2.填充数据
 * 			3.修正宽高
 * 			3.drag位置及初始化[如果有]
 * 
 * 		表格生成之后可以:
 * 			1.增加行/列
 * 			2.修改行/列
 * 			3.遍历行/列
 * 			4.修改设置[grid, col, row]
 * 
 */

KISSY.add('hdlGrid', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('');
	
/**********************************************************************************************
*代码正文
*	动态改变列
*	动态改变行
*	checkbox
*	编辑
*	scrollbar_width
*	合并单元格
*	
*	
*/

	//表格预设置,需要修改时可参考
	var pre_setting = {
			 enable_checkbox: true		//是否启用左侧的checkbox
			,var_checkbox: 'ckb-name'	//checkbox的name, 对应后台接收

			,enable_drag: true			//是否启用列拖动
			,enable_sort: true			//是否启用列排序
			,enable_toggle: true		//是否启用列切换显示
			,enable_edit: true			//是否可编辑
			,enable_col_resize: true	//是否可改变列宽度

			,enable_pop_detail: true	//是否显示弹出的详细信息

			,min_width: 150				//最小宽度
			,min_height: 100			//最小高度

			,max_width: 1500			//最大宽度
			,max_height: 1000			//最大高度

			,enable_page: true			//是否使用分页
			,page_curr: 0				//当前页
			,var_page: 'page'			//page_curr的name, 对应后台接收
			,page_total: 0				//总页数
			,num_per_page: [15, [5, 10, 15, 20]]//[0]为每页显示数量, [1]为可选择的页数量值
			,var_num_per_page: 'perPageNum'	//每页显示数量的name, 对应后台接收

			,url: ''					//获取数据的地址
			,param: ''					//传递的额外参数, 可为函数, 函数命名空间[暂不支持]
			,last_param: ''				//上次请求时的参数列表, 不含var_page, var_num_per_page
			,auto_load: true			//是否自动加载

			,single_check: false		//单列选中
			,single_select: false		//单列选择

			,msg_empty: '暂无数据,根据内容填充后的大小居中显示'	//无数据时显示的内容
			,msg_proc: '正在加载,请稍等...'	//加载时显示的内容

			,row_colors: ['#fff', '#f00']		 //间隔色设置
		};

	//表头预设置,需要修改时可参考
	var pre_col_model = {
			 display: '列名'				//显示名称
			,name: ''						//对应的键名
			,width: '50'					//列宽度,数字或 百分比('50%')
			,align: 'left'					//对齐方式
			,align_head: 'center'			//表头对齐方式
			,enable_sort: true				//可否排序
			,enable_hide: true				//可否隐藏
			,col_process: function(cell){}	//列单元格处理
		}

	//行预设置,需要修改时可参考
	var pre_row = {
			 enable_edit: true
			,enable_delete: true
			,enable_select: true
		};

	//内部类,方便数据存储与处理
	function Grid(setting){
		//更改为构造方式
		if(!(this instanceof Grid)){
			return new Grid(setting);
		}

		var grid = this;

		this.__initTable();

		this._col = [];
		$.each(setting.col_model, function(i, v){
			grid.addCol(v);
		});

		delete setting.col_model;
		this._setting = $.extend({}, pre_setting, setting);

		if(this._setting.auto_load){
			this.ajaxLoad();
		}

		this._data = [];
		this._refresh_cache = [];//刷新表格时需要执行的动作,每更新一个动作加入一条,刷新后置空

		return this;
	}
	$.extend(Grid.prototype, {
		 //添加一列定义
		 addCol: function(col_setting){
			this._col.push(S.mix(col_setting, pre_col_model, false));//不覆盖相同的设置,只copy不存在的设置
			this.div.thead.find('tr').append('<th>'+ col_setting.display+'</th>');
		}
		//修改一列定义
		,setCol: function(n, fn){
			
		}
		//修改一列定义
		,__initTable: function(){
			var div = $('<div class="hdlgrid-wrap"><div class="hdlgrid-head"><table><thead><tr></tr></thead></table></div><div class="hdlgrid-body"><div class="hdlgrid-body-in"><table><tbody></tbody></table></div></div><div class="hdlgrid-pager"><span class="hdlgrid-prev hdlgrid-prev-gray"></span><span class="hdlgrid-next hdlgrid-next-gray"></span><span class="hdlgrid-first hdlgrid-first-gray"></span><span class="hdlgrid-last hdlgrid-last-gray"></span><span class="hdlgrid-sep"></span><span class="hdlgrid-text"></span><span class="hdlgrid-sum"></span></div><div class="hdlgrid-resizer"></div><div class="hdlgrid-toggle-div"></div><div class="hdlgrid-toggle-btn"></div><div class="hdlgrid-mask"></div><div class="hdlgrid-nodata"></div><div class="hdlgrid-loading"></div></div>');

			div.whead = div.find('div.hdlgrid-head');
			div.wbody = div.whead.next();
			div.pager = div.wbody.next();

			div.thead = div.whead.find('thead:eq(0)');
			div.tbody = div.wbody.find('tbody:eq(0)');

			div.head = div.thead.parent();
			div.body = div.tbody.parent();

			div.mask = div.find('div.hdlgrid-mask');
			div.nodata = div.mask.next();
			div.loading = div.nodata.next();

			this.div = div;

			return this;
		}
		//交换两个索引指向的列
		,swapCol: function(n1, n2){
			
			//n1小, n2大
			var tmp = [n1-1, n2-1].sort();
			n1 = tmp[0];
			n2 = tmp[1];
			tmp = n2-n1-1;//标记是否相邻

			var  head = this.div.thead
				,ths = head.find('th')
				,th1 = ths.filter('th:eq('+n1+')')
				,th2 = ths.filter('th:eq('+n2+')')
				,trs = this.div.tbody.find('tr');

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

			return this;
		}

		//添加一行数据
		,addRow: function(row_data){
			
		}
		//修改一行数据
		,setRow: function(n, fn){
			
		}

		//遍历表头
		,walkHead: function(fn){
			
		}
		//遍历某行的单元格
		,walkCell: function(row_n, fn){
			
		}
		//遍历行
		,walkRow: function(fn){
			
		}
		//遍历列
		,walkCol: function(fn){
			
		}

		//修改设置
		,setting: function(setting){
			
		}
		//修改数据
		,data: function(data){
			
		}

		//更新拖动条位置
		,fixDragPos: function(){
			
		}
		//更新宽高
		,fixSize: function(){
			//body有无滚动条的情况
			//thead,tbody相互修正宽度
		}

		//刷新显示
		,refresh: function(){
			
		}
		//遮罩的显示与否
		,loading: function(status){
			if(status){
				div.mask.add(div.loading).show();
			}else{
				div.mask.add(div.loading).hide();
			}
		}
		//转到某页
		,goPage: function(n){
			
		}
		//刷新显示
		,ajaxLoad: function(fn){
			var grid = this;

			grid.div.mask.show();
			grid.div.loading.show();
			$.getJSON(this._setting.url, function(data){
				var b = [];

				$.each(data.rows, function(i, v){
					b.push('<tr>');
					$.each(grid._col, function(i1, v1){
						b.push('<td>', v[v1.name], '</td>');
					});
					b.push('</tr>');
				});

				grid.div.tbody.html(b.join(''));
				grid._data = data;

				$.isFunction(fn) && fn();

				grid.div.mask.hide();
				grid.div.loading.hide();
			});
		}
		//将表格放入selector的位置
		,fillInto: function(selector){
			var elm = $(selector).eq(0);
			var width = elm.width();
			var height = elm.height();
			var div = this.div;

			elm.empty().append(div);
			div.width(width).height(height);
			div.wbody.height(height - div.whead.outerHeight() -div.pager.outerHeight());

			var wb = div.wbody[0];
			var whead = div.whead;
			
			setTimeout(function(){
				console.log(wb.clientHeight, wb.scrollHeight);
				if(wb.clientHeight < wb.scrollHeight){
					whead.css('padding-right', 17);
				}
			}, 10);
			return this;
		}
	});

	//tbody滚动同步thead
	function tbodyScroll(grid){
		grid.thead.parent().css('left', this.scrollLeft);
	}

	$.extend({
		hdlGrid: Grid
	});
}, {
	requires: ['jquery-1.4.2']
});
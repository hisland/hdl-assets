/**********************************************************************************************
 * 名称: 表格插件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-21 15:32:38
 * 版本: v1
 *
 */

KISSY.add('hdlDrag', function(S, undef) {
	var  $ = jQuery;
	
/**********************************************************************************************
*代码正文
*	动态改变列
*	动态改变行
*	checkbox
*	编辑
*	colResize
*	scrollbar_width
*	合并单元格
*	null-data:空数据替代值
*	
*	
*	
*	getHead()
*	getBody()
*	attr(key)
*	attr(key, val)
*	
*	
*	
*/
	var pre_setting = {
					,page_curr: 0		//当前页
					,page_total: 0		//总页数
					,num_per_page: 15		//每页显示数量

					,onDragCol: 0		//拖动列时的操作
					,onToggleCol: 0		//切换列显示时的操作

					,enable_checkbox: 0	//是否启用左侧的checkbox
					,enable_drag: 0	//是否启用列拖动
					,enable_sort: 0	//是否启用列排序
					,enable_toggle: 0	//是否启用列切换显示/
					,enable_edit: 0	//是否可编辑

					,single_check: false
					,single_select: false

					,rowColors: ['#fff', '#f00'] //间隔色设置

					//列模式
					,colModel: [
						//1列
						 {display: 'display-name'	//显示名称
						,name: ''		//对应的键名
						,width: ''		//列宽度,数字或 百分比('50%')
						,sortable: ''	//可否排序
						,align: ''		//对齐方式
						,hide_able: ''		//可否隐藏
						}
						//2列
						,{display: 'display-name'	//显示名称
						,name: ''		//对应的键名
						,width: ''		//列宽度,数字或 百分比('50%')
						,sortable: ''	//可否排序
						,align: ''		//对齐方式
						,hide_able: ''		//可否隐藏
						}
					]
				};

				//请求返回结果
				rows = [
						//1行
						{
							 id: 0
							,enable_edit: true
							,enable_delete: true
							,enable_select: true
							,rowspan: 0
							,cols: [
									{//1列
										 colspan: 0
										,content: ''
									}
									,{//2列
										
									}
								]
						}
						//2行
						,{
							
						}
					];
	$.fn.hdlGrid = hdlGrid;
}, {
	requires: ['jquery-1.4.2']
});
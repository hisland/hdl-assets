/**********************************************************************************************
 * 名称: 弹出选择框
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-21 12:36:50
 * 版本: v1
 *
 *
 * 使用方法:
 *			
 */

KISSY.add('popSelect', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,div_pop = EMPTY_$
		,ipt_target = EMPTY_$;

	//输入框点击事件
	function iptClick(e){
		var me = $(this);
		ipt_target = me;
		popShow();
	}
	//弹出层点击作相应操作
	function divPopClick(e){
		var  t = e.target
			,dt = $(t)
			,str = [];

		if(dt.is('a')){
			//选择某个市
			if(dt.parent().is('.pop-select-td3')){
				str.push(dt.parent().prev().html());
				$(ipt_target.attr('data-province')).val(dt.parent().prev().attr('data-id'));
				str.push(dt.html());
				$(ipt_target.attr('data-city')).val(dt.attr('data-id'));
				ipt_target.val(str.join('-'));

			//跳到相应位置
			}else if(dt.parent().is('.pop-select-legend')){
				div_pop.find('td.pop-select-td1').each(function(i, v, len){
					if(v.innerHTML === t.innerHTML){
						v = $(v);
						t = v.parents('.pop-select-in');
						len = t[0].scrollTop + v.position().top - 10;

						t.animate({'scrollTop': len}, 'fast');
						return false;
					}
				});
			}
			e.preventDefault();
		}
	}
	//弹出层双击关闭
	function divPopDblClick(e){
		if($(e.target).parent().is('.pop-select-td3')){
			popHide();
		}
	}

	//公共显示隐藏函数
	function popShow(){
		if(!div_pop.length){
			//根据省按字母排序
			PCList.sort(function(a, b){
				if(a.prefix > b.prefix){
					return 1;
				}else{
					return -1;
				}
			});
			//根据需要建立弹出层并初始化引用与事件
			var b = [], c, last_p, legend_arr = [];
			b.push('<div class="pop-select"><div class="pop-select-legend"></div><div class="pop-select-in"><table class="pop-select-t"><tbody>');
			$.each(PCList, function(i, v, k){
				if(last_p != v.prefix){
					last_p = v.prefix;
					k = v.prefix.toUpperCase();
					legend_arr.push('<a href="#">', k, '</a>');
					b.push('<tr><td class="pop-select-td1" colspan="2">', k, '</td></tr>');
				}
				b.push('<tr><td class="pop-select-td2" data-id="', v.id, '">', v.name, '</td><td class="pop-select-td3">');
				i = v.cities;
				$.each(i, function(i, v){
					b.push('<a href="#" data-id="', v.id, '">', v.name, '</a>');
				});
				b.push('</td></tr>');
			});
			b.push('<body></tbody></table></div></div>');
			div_pop = $(b.join(''));
			div_pop.find('div.pop-select-legend').html(legend_arr.join(''));
			div_pop.click(divPopClick).dblclick(divPopDblClick);
			div_pop.appendTo('body');
		}
		div_pop.show().adjustElement(ipt_target);//先show再adjustElement可避免闪烁,可能和jq计算宽高有关;
		return div_pop;
	}
	function popHide(){
		return div_pop.hide();
	}

	//注册事件,可用于手工注册
	function popSelect(){
		this.each(function(i, v){
			if(!v.__bind_pop_select){
				v.__bind_pop_select = true;
				$(v).click(iptClick);
			}
		});
	}

	//放到jq原型链上
	$.fn.extend({
		popSelect: popSelect
	});

	//文档上监听并注册事件,如已注册则忽略, 顺带做隐藏操作
	function documentClick(e){
		var  t = e.target
			,dt = $(t);
		if(dt.is('input[data-province],input[data-city]') && !t.__bind_pop_select){
			dt.popSelect();
			dt.click();
		}
		if(!dt.closest('.pop-select, input[data-province], input[data-city]').length){
			popHide();
		}
	}
	$(document).click(documentClick);
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});

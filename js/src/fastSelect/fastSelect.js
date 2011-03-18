/**********************************************************************************************
 * 名称: 快速选择控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-18 14:10:40
 * 版本: v1
 *
 */

KISSY.add('fastSelect', function(S, undef) {
	var  $ = jQuery
		,div_pop, ipt_target
		,start, end, step, now
		,reg_num = /\d+(?:\.\d+)?/g
		,num_per_page;

	//输入框点击事件
	function iptClick(e){
		var me = $(this), range = me.attr('data-fast-select').match(reg_num);
		if(range.length == 3){
			start = range[0]-0;
			end = range[1]-0;
			step = range[2]-0;
			now = this.value-0;

			div_pop.find('div.fast-select-is').html(makeList(start, end, step, now));

			ipt_target = me;
			div_pop.show().adjustElement(me);//先show再adjustElement可避免闪烁,可能和jq计算宽高有关
		}
	}

	//弹出层点击事件
	function divPopClick(e){
		var  t = e.target
			,dt = $(t);

		if(dt.is('a')){
			//点击值
			if(dt.is('.fast-select-i')){
				ipt_target.val(dt.html());
				dt.addClass('hover').siblings('.hover').removeClass('hover');

			//上一页
			}else if(dt.is('.fast-select-pp')){
				

			//下一页
			}else if(dt.is('.fast-select-pn')){
				
			}
			e.preventDefault();
		}
	}

	//生成下拉框内容
	function makeList(start, end, step, now){
		var  b = []
			,step_len = (step+'').length
			,dot_pos = (step+'').indexOf('.')
			,dec_places = step_len-dot_pos-1;

		if(dot_pos != -1){
			for( ; start <= end; ){
				start = start.toFixed(dec_places);
				if(start != now){
					b.push('<a class="fast-select-i" href="#" data-value="', start, '">', start, '</a>');
				}else{
					b.push('<a class="fast-select-i hover" href="#" data-value="', start, '">', start, '</a>');
				}
				start -= 0;
				start += step;
			}
		}else{
			for( ; start <= end; ){
				if(start != now){
					b.push('<a class="fast-select-i" href="#" data-value="', start, '">', start, '</a>');
				}else{
					b.push('<a class="fast-select-i hover" href="#" data-value="', start, '">', start, '</a>');
				}
				start += step;
			}
		}
		return b.join('');
	}

	//注册事件,可用于手工注册
	function fastSelect(){
		this.each(function(i, v){
			if(!v.__bind_fast_select){
				v.__bind_fast_select = true;
				$(v).click(iptClick);
			}
		});
	}

	//放到jq原型链上
	$.fn.extend({
		fastSelect: fastSelect
	});

	//文档上监听并注册事件,如已注册则忽略, 顺带做隐藏操作
	function documentClick(e){
		var  t = e.target
			,dt = $(t);
		if(dt.is('input[data-fast-select]') && !t.__bind_fast_select){
			dt.fastSelect();
			dt.click();
		}
		if(!dt.closest('.fast-select-p, input[data-fast-select]').length){
			div_pop.hide();
		}
	}
	$(document).click(documentClick);

	//文档加载完成建立弹出层
	$(function(){
		div_pop = $('<div class="fast-select-p"><div class="fast-select-loading">加载中...</div><div class="fast-select-is"></div><div class="fast-select-pm"><a class="fast-select-pp" href="#">上一页</a><a class="fast-select-pn" href="#">下一页</a></div></div>');
		div_pop.click(divPopClick);
		div_pop.appendTo('body');
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});

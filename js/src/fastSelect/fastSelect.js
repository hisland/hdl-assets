/**********************************************************************************************
 * 名称: 快速选择控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-18 14:10:40
 * 版本: v1
 *
 */

KISSY.add('fastSelect', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $(''),
		div_pop, aprev, anext, span_start, span_end,
		ipt_target = $EMPTY,
		range, last_read, now,
		reg_num = /\d+(?:\.\d+)?/g,
		num_per_page = 50;

	//输入框点击事件
	function iptClick(e){
		var me = $(this);
		if(ipt_target[0] == this){
			popShow();
			return ;
		}

		range = me.attr('data-fast-select').match(reg_num);
		if(range.length == 3 || range.length == 4){
			$.each(range, function(i, v){
				range[i] = v-0;
			});
			last_read = [0, 0];
			now = this.value-0 || range[0];

			showPage();

			ipt_target = me;
			popShow();
		}
	}
	function prevClick(e){
		showPage('prev');
	}
	function nextClick(e){
		showPage('next');
	}

	//弹出层点击作相应操作
	function divPopClick(e){
		var t = e.target,
			dt = $(t);

		if(dt.is('a')){
			//点击值
			if(dt.is('.fast-select-i')){
				ipt_target.val(dt.html()).change();//修改值并触发change,如果有验证一般会在change上验证一次
				dt.addClass('hover').siblings('.hover').removeClass('hover');

			//上一页
			}else if(dt.is('.fast-select-pp')){
				

			//下一页
			}else if(dt.is('.fast-select-pn')){
				
			}
			e.preventDefault();
		}
	}
	//弹出层双击关闭
	function divPopDblClick(e){
		if($(e.target).is('a.fast-select-i')){
			popHide();
		}
	}

	function showPage(n){
		var num = range[3] || num_per_page,
			step = range[2],
			start, end;

		if(n == 'next'){
			start = last_read[1];
			end = start+num*step < range[1] ? start+num*step : range[1];
		}else if(n == 'prev'){
			end = last_read[0];
			start = end-num*step < range[0] ? range[0] : end-num*step;
		}else{
			start = now;
			end = start+num*step < range[1] ? start+num*step : range[1];
		}

		last_read = [start, end];
		div_pop.find('div.fast-select-is').html(makeList(start, end, step, now));

		if(start>range[0]){
			aprev.css('visibility', 'visible');
		}else{
			aprev.css('visibility', '');
		}
		if(end<range[1]){
			anext.css('visibility', 'visible');
		}else{
			anext.css('visibility', '');
		}
	}
	//生成下拉框内容
	function makeList(start, end, step, now){
		var b = [],
			step_len = (step+'').length,
			dot_pos = (step+'').indexOf('.'),
			dec_places = step_len-dot_pos-1;

		dec_places = (dot_pos != -1 ? dec_places : dec_places-1 );
		span_start.html(start.toFixed(dec_places));
		span_end.html(end.toFixed(dec_places));
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

	//公共显示隐藏函数
	function popShow(){
		div_pop.show().adjustElement(ipt_target);//先show再adjustElement可避免闪烁,可能和jq计算宽高有关;
		return div_pop;
	}
	function popHide(){
		return div_pop.hide();
	}
	function popReset(){
		aprev.add(anext).css('visibility', 'hidden');
		return div_pop;
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
		var t = e.target,
			dt = $(t);
		if(dt.is('input[data-fast-select]') && !t.__bind_fast_select){
			dt.fastSelect();
			dt.click();
		}
		if(!dt.closest('.fast-select-p, input[data-fast-select]').length){
			popHide();
		}
	}
	$(document).click(documentClick);

	//文档加载完成建立弹出层并初始化引用与事件
	$(function(){
		div_pop = $('<div class="fast-select-p"><div class="fast-select-loading">加载中...</div><div class="fast-select-is"></div><div class="fast-select-pm"><a class="fast-select-pp" href="#">上页</a><a class="fast-select-pn" href="#">下页</a><span>[<span class="fast-select-ps">0.0001</span>-<span class="fast-select-ps">0.0010</span>]</span></div></div>');
		aprev = div_pop.find('a.fast-select-pp');
		anext = aprev.next();
		span_start = div_pop.find('span.fast-select-ps').eq(0);
		span_end = div_pop.find('span.fast-select-ps').eq(1);

		aprev.click(prevClick);
		anext.click(nextClick);
		div_pop.click(divPopClick).dblclick(divPopDblClick);
		div_pop.appendTo('body');
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});

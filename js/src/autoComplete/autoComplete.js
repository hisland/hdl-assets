/**********************************************************************************************
 * 名称: 自动完成控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-1 14:11:31
 * 版本: v2
 * 
 * 2011-4-11 15:30:28:
 *		数据html实体转义
 * 
 * 2011-5-24 17:44:39:
 *		取内容传送
 *			将输入内容传送
 *		取ID传送
 *			无输入传 - ''
 *			输入无选择 - 第一个的ID
 *			输入并选择 - 选择的ID
 *			输入无匹配 - 传 -1
 * 
 */

KISSY.add('autoComplete', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,target = EMPTY_$, pager
		,div_pop, div_loading, div_list, a_prev, a_next, e_match, e_from, e_to, e_totals
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)
		,delay = 300, delay_handler = 0
		,sever_num_per_page = 450, num_per_page = 10
		,msg_loading = '加载中...', msg_prev = '上一页', msg_next = '下一页', msg_count = '条';

	function popShow(){
		div_pop.adjustElement(target.parent()).show();
	}
	function popHide(){
		div_pop.hide();
		target = EMPTY_$;
	}

	function iptKeyDown(e){
		if(e.keyCode === 13 && div_pop.is(':visible')){
			return false;
		}
	}
	function iptKeyUp(e){
		var a = div_list.find('.hover'), tmp = e.keyCode, val;
		//向上
		if(e.keyCode === 38){
			if(!div_pop.is(':visible')){
				div_pop.show();
				pager.makeList();
			}else if(a.length){
				tmp = a.prev();
				tmp.length ? tmp.addClass('hover').focus().end().removeClass('hover') : 0;
			}else{
				a = div_list.find('a:first');
				a.addClass('hover');
			}

		//向下
		}else if(e.keyCode === 40){
			if(!div_pop.is(':visible')){
				div_pop.show();
				pager.makeList();
			}else if(a.length){
				tmp = a.next();
				tmp.length ? tmp.addClass('hover').focus().end().removeClass('hover') : 0;
			}else{
				a = div_list.find('a:first');
				a.addClass('hover');
			}

		//回车
		}else if(e.keyCode === 13 && div_pop.is(':visible')){
			a.length ? a.click() : popHide();
			e.stopPropagation();

		//下面这些情况,重新进行匹配
		}else if((tmp >= 48 && tmp <= 90) ||//[0-9;a-z]
					tmp == 32 ||//空格
					tmp == 8 ||//backspace
					tmp == 46 ||//delete
					(tmp >= 96 && tmp <= 111) ||//小键盘
					(tmp >= 186 && tmp <= 192) ||//一些符号
					(tmp >= 219 && tmp <= 222)){//一些括号

			val = this.value;
			clearTimeout(delay_handler);
			delay_handler = setTimeout(function(){
				pager.changeText(val);
			}, delay);
		}
		this.focus();
	}
	function elmClick(e){
		var  me = $(this)
			,t = e.target
			,dt = $(t);

		if(me.is('.auto-comp-disabled')){
			popHide();
			dt.blur();
		}else if(dt.is('a')){
			dt = dt.prev();
			pager = getPager(this);
			if(target[0] != dt[0]){
				pager.text = '';
			}
			target = dt;
			popShow();
			pager.changeText('');
			target.focus();
		}else if(dt.is('input')){
			pager = getPager(this);
			if(target[0] != dt[0]){
				pager.text = '';
			}
			target = dt;
			popShow();
			pager.changeText(dt.val());
		}
	}

	//下拉层内部事件代理
	function divPopClick(e){
		var  t = e.target
			,dt = $(t);
		if(dt.is('a')){
			//上一页
			if(dt.is('.auto-comp-pp')){
				pager.prev();
			//下一页
			}else if(dt.is('.auto-comp-pn')){
				pager.next();
			//选中某个
			}else if(dt.closest('.auto-comp-pis').length){
				target.val(dt.text());
				popHide();
			}
			dt.blur();
			e.preventDefault();
		}
	}
	//注册自动完成,可内部call调用也可放到$.fn上
	function autoComplete(){
		this.data('auto-comp-bind', true);
		this.click(elmClick).find('input').keyup(iptKeyUp).keydown(iptKeyDown);
	}

	//生成下拉层并设置内部变量的引用
	div_pop = $('<div class="auto-comp-pop" style="display:block;"><div class="auto-comp-loading">'+msg_loading+'</div><div class="auto-comp-as"><a class="auto-comp-a" href="#" data-value="1">1</a><a class="auto-comp-a" href="#" data-value="2">2</a><a class="auto-comp-a" href="#" data-value="3">3</a><a class="auto-comp-a" href="#" data-value="4">4</a><a class="auto-comp-a" href="#" data-value="5">5</a></div><div class="auto-comp-page"><a class="auto-comp-prev" href="#">'+msg_prev+'</a><a class="auto-comp-next" href="#">'+msg_next+'</a><span class="auto-comp-tip">[<span class="auto-comp-match">1</span>]<span class="auto-comp-from">1</span>-<span class="auto-comp-to">15</span>/<span class="auto-comp-totals">450</span>'+msg_count+'</span></div></div>');

	div_loading = div_pop.find('div.auto-comp-loading');
	div_list = div_loading.next();
	a_prev = div_pop.find('a.auto-comp-prev');
	a_next = a_prev.next();

	e_match = div_pop.find('span.auto-comp-match');
	e_from = div_pop.find('span.auto-comp-from');
	e_to = div_pop.find('span.auto-comp-to');
	e_totals = div_pop.find('span.auto-comp-totals');

	div_pop.click(divPopClick);
	div_pop.appendTo('body');

	$.fn.extend({
		autoComplete: autoComplete
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'pager']
});
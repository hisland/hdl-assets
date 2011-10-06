/**********************************************************************************************
 * 名称: 自动完成控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-1 14:11:31
 * 版本: v2
 * 
 * API:
 *		$('selecotr').autoComplete();
 * 
 * 2011-4-11 15:30:28:
 *		数据html实体转义
 * 
 * 2011-5-24 17:44:39:
 *		取内容传送
 *			将输入内容传送
 *		取ID传送
 *			无输入传 - ''
 *			输入无选择无匹配 - 传 -1
 *			输入无选择有匹配 - 第一个完整匹配的ID
 *			输入并选择 - 选择的ID
 *			输入无匹配 - 传 -1
 * 
 * 2011-09-24 14:45:16:
 *		自动完成匹配后再进行html实体转义,否则会出现实体内部字符被截断从而显示出实体编码的问题
 * 
 */

KISSY.add('autoComplete', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,target = EMPTY_$, div_opened
		,div_pop, div_loading, div_list, a_prev, a_next, e_match, e_from, e_to, e_totals
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)
		,delay = 300, delay_handler = 0
		,sever_num_per_page = 450, num_per_page = 10
		,msg_loading = '加载中...', msg_prev = '上一页', msg_next = '下一页', msg_count = '条'
		,pager_local = $.pagerLocal()
		,pager_ajax = $.pagerAjax();

	pager_local.last_read = 0;
	pager_local.num_per_page = 10;
	pager_ajax.loading = function(rs){
		if(rs){
			div_loading.show();
		}else{
			div_loading.hide();
		}
	}

	//全局监听关闭
	function docClick(e){
		if(!$(e.target).closest('.auto-comp-pop, .auto-comp').length){
			popHide();
		}
	}
	function popShow(){
		if(!div_opened){
			div_opened = true;
			div_pop.show();
			$(document).click(docClick);
		}
		div_pop.adjustElement(target.parent());
	}
	function popHide(){
		if(div_opened){
			div_opened = false;
			div_pop.hide();
			target.removeData('prev-val');
			target = EMPTY_$;
			$(document).unbind('click', docClick);
		}
	}

	//上下选择及匹配操作
	function iptKeyPress(e){
		var a = div_list.find('.hover'), key_code = e.keyCode || e.charCode;

		if(!div_opened){
			target = $(this);
			popShow();
		}else{
			if(key_code === 13){
				a.click();
				popHide();
				e.stopPropagation();
			}
		}

		//向上
		if(key_code === 38){
			if(a.length){
				tmp = a.prev();
				tmp.length ? tmp.addClass('hover').focus().end().removeClass('hover') : 0;
			}else{
				a = div_list.find('a:first');
				a.addClass('hover');
			}

		//向下
		}else if(key_code === 40){
			if(a.length){
				tmp = a.next();
				tmp.length ? tmp.addClass('hover').focus().end().removeClass('hover') : 0;
			}else{
				a = div_list.find('a:first');
				a.addClass('hover');
			}

		//下面这些情况,重新进行匹配
		}else if((key_code >= 48 && key_code <= 90)//[0-9a-z]
					|| key_code == 32//空格
					|| key_code == 8//backspace
					|| key_code == 46//delete
					|| (key_code >= 96 && key_code <= 111)//小键盘
					|| (key_code >= 186 && key_code <= 192)//一些符号
					|| (key_code >= 219 && key_code <= 222)){//一些括号

			doMatch(this.value);
		}

		target.focus();
	}

	//得到焦点或点击相同处理
	function iptClick(e, val){
		if(target[0] != this){
			target.removeData('prev-val');
			target = $(this);
		}
		popShow();
		val = val != undefined ? val : this.value;
		doMatch(val);
	}
	//点击展开所有
	function spanClick(e){
		$(this).prev().trigger('focus', ['']);
	}

	//下拉层单击
	function divPopClick(e){
		var  t = e.target
			,dt = $(t);

		target.focus();

		if(dt.is('a')){
			//上一页
			if(t == a_prev[0]){
				pager.prev();
			//下一页
			}else if(t == a_next[0]){
				pager.next();
			//选中某个
			}else if(dt.is('.auto-comp-a')){
				dt.addClass('hover').siblings('.hover').removeClass('hover');
				target.val(dt.text());
			}
			e.preventDefault();
		}
	}
	//下拉层双击
	function divPopDblClick(e){
		if($(e.target).is('a.auto-comp-a')){
			popHide();
		}
	}

	function doMatch(val){
		if(target.data('prev-val') !== val){
			target.data('prev-val', val);

			clearTimeout(delay_handler);
			delay_handler = setTimeout(function(){
				changeText(val);
			}, delay);
		}
	}
	function changeText(val){
		pager_local.reset();
		pager_ajax.reset();
		var dt = [
			 {name: 'keyContent', value: val}
			,{name: 'currPage', value: 1}
		];
		pager_ajax.param = dt;
		pager_ajax.getPage(1, function(){
			makeList(val, 1);
		});
	}
	function makeList(val, page){
		var  n = pager_local.last_read
			,m = 0
			,b = [], v;

		//匹配数据并记录条数
		for( v = pager_local.data[n] ; v !== undefined && m < pager_local.num_per_page; ){
			if(v.indexOf(val) != -1){
				m++;
				b.push('<a class="auto-comp-a" href="#">', v.replace(val, '<strong>'+val+'</strong>'), '</a>');
			}
			v = pager_local.data[++n];
		}
		//条数不够并且服务器还有数据时,读取数据后再进行,并且这里直接返回
		if(m < pager_local.num_per_page && pager_local.totals < pager_ajax.totals){
			pager_ajax.next(function(p){
				makeList(val, page);
			});
			return ;
		}

		pager_local.data.push({
			 matches: m
			,from: pager_local.last_read+1
			,to: n
			,content: b
		});

		div_list.html(b.join(''));
		e_match.html(m);
		e_from.html(pager_local.last_read+1);
		e_to.html(n);
		e_totals.html(pager_ajax.totals);

		pager_local.last_read = n;

		//修正翻页显示状态
		if(pager_local.page_now+1 < pager_local.pages.length || n < pager_local.totals || pager_local.totals < pager_ajax.totals){
			a_next.css('visibility', 'visible');
		}else{
			a_next.css('visibility', '');
		}
		if(pager_local.now_page > 1){
			a_prev.css('visibility', 'visible');
		}else{
			a_prev.css('visibility', '');
		}
	}

	function autoComplete(){
		this.each(function(i, v){
			v = $(v);
			var binded = v.data('auto-comp-bind');
			if(!binded){
				v.data('auto-comp-bind', true);
				v.find('input').click(iptClick).focus(iptClick).keypress(iptKeyPress).next().click(spanClick);
			}else{
				S.log([v, 'has binded autoComplete']);
			}
		});
	}

	//生成下拉层并设置内部变量的引用
	div_pop = $('<div class="auto-comp-pop"><div class="auto-comp-loading">'+msg_loading+'</div><div class="auto-comp-as"><a class="auto-comp-a" href="#" data-value="1">1</a><a class="auto-comp-a" href="#" data-value="2">2</a><a class="auto-comp-a" href="#" data-value="3">3</a><a class="auto-comp-a" href="#" data-value="4">4</a><a class="auto-comp-a" href="#" data-value="5">5</a></div><div class="auto-comp-page"><a class="auto-comp-prev" href="#">'+msg_prev+'</a><a class="auto-comp-next" href="#">'+msg_next+'</a><span class="auto-comp-tip">[<span class="auto-comp-match">1</span>]<span class="auto-comp-from">1</span>-<span class="auto-comp-to">15</span>/<span class="auto-comp-totals">450</span>'+msg_count+'</span></div></div>');

	div_loading = div_pop.find('div.auto-comp-loading');
	div_list = div_loading.next();
	a_prev = div_pop.find('a.auto-comp-prev');
	a_next = a_prev.next();

	e_match = div_pop.find('span.auto-comp-match');
	e_from = div_pop.find('span.auto-comp-from');
	e_to = div_pop.find('span.auto-comp-to');
	e_totals = div_pop.find('span.auto-comp-totals');

	div_pop.click(divPopClick).dblclick(divPopDblClick);
	div_pop.appendTo('body');

	$.fn.extend({
		autoComplete: autoComplete
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'pager']
});
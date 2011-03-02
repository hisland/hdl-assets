/**********************************************************************************************
 * 名称: 自动完成控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-1 14:11:31
 * 版本: v2
 * 
 */

KISSY.add('autoComplete', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,target = EMPTY_$, pager
		,div_pop, div_loading, div_list, a_prev, a_next, entry0, entry1, entry2, entry3
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)
		,delay = 300, delay_handler = 0
		,sever_num_per_page = 450, num_per_page = 10;

	//内部使用的分页对象
	function Pager(){
		this.reset();
		this.ajax_url = '';
	}
	$.extend(Pager.prototype, {
		 prev: function(){
			this.makeList(--this.now_page);
		}
		,next: function(){
			this.makeList(++this.now_page);
		}
		,reset: function(){
			this.last_read = 0;
			this.now_page = 0;
			this.sever_now_page = 0;
			this.data = [];
			this.pages = [];
			this.text = '';
			this.totals = 0;
			this.sever_totals = 0;
			return this;
		}
		,changeText: function(val){
			var p;
			//进行本地匹配
			if(!this.ajax_url || (this.data.length && val.length && val.indexOf(this.text) == 0 && this.totals < sever_num_per_page)){
				this.last_read = 0;
				this.now_page = 0;
				this.pages = [];
				this.text = val;
				this.makeList();

			//进行异步匹配
			}else{
				this.reset();
				this.text = val;
				p = this;
				this.readData(function(){
					p.makeList();
				});
			}
		}
		,makeList: function(page){
			var  n = this.last_read
				,m = 0
				,b = [], v, txt = this.text;

			page = page || 0;
			if(this.pages.length > page){
				div_list.html(this.pages[page]);
			}else{
				entry1.html(n+1);
				for( ; (v = this.data[n]) && m < num_per_page; n++){
					if(v.indexOf(txt) != -1){
						m++;
						b.push('<a class="auto-comp-i" href="#">', v.replace(txt, '<strong>'+txt+'</strong>'), '</a>');
					}
				}
				this.last_read = n;
				entry0.html(m);
				entry2.html(n);
				entry3.html(this.totals);
				this.pages.push(b.join(''));
				div_list.html(b.join(''));
			}

			if(this.now_page+1 < this.pages.length || n < this.totals){
				a_next.css('visibility', 'visible');
			}else{
				a_next.css('visibility', '');
			}
			if(this.now_page > 0){
				a_prev.css('visibility', 'visible');
			}else{
				a_prev.css('visibility', '');
			}
		}
		,readData: function(fn){
			var p = this;
			div_loading.show();
			//参数形式: ?keyContent=www&currPage=2
			$.get(p.ajax_url + '?keyContent=' + this.text + '&currPage=' + (++this.sever_now_page), function(rs){
				try{
					var data = eval('(' + rs + ')');
					p.data = p.data.concat(data.rows);
					p.totals = p.data.length;
					(typeof fn === 'function') ? fn() : 0;
				}catch(e){
					alert('autoComplete: 获取数据出错!\n数据前1000字符是:\n\n' + rs.substr(0, 1000));
				}
				div_loading.hide();
			});
		}
	});

	//如果window上的命名空间存在则返回,否则返回undefined
	function getNS(str){
		var arr = (''+str).split('.'), i=1, o;
		for(o = window[arr[0]] ; o && i<arr.length;i++){
			o = o[arr[i]];
		}
		return o;
	}
	//(获得|生成)span上保存的pager对象
	function getPager(elm){
		if(!elm.pager){
			pager = new Pager();
			elm.pager = pager;

			elm = $(elm);
			data = getNS(elm.attr('data-data-ns'));
			url = elm.attr('data-data-url');
			if(data){
				pager.data = data.rows;
				pager.totals = data.rows.length;
			}else if(url){
				pager.ajax_url = url;
			}else{
				alert('autoComplete: 此元素无正确数据或者数据url');
			}
		}else{
			pager = elm.pager;
		}
		return pager;
	}
	function popShow(){
		div_pop.adjustElement(target.parent()).show();
	}
	function popHide(){
		div_pop.hide();
		target = EMPTY_$;
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
			target = dt.prev();
			pager = getPager(me);
			div_list.empty();
			popShow();
			pager.changeText('');
			target.focus();
		}else if(dt.is('input')){
			target = dt;
			pager = getPager(me);
			div_list.empty();
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
	//全局监听并自动绑带事件,顺带做隐藏下拉层操作
	function documentClick(e){
		var  t = e.target
			,elm = $(t).closest('.auto-comp');

		if(elm.length && !elm.data('auto-comp-bind')){
			elm.data('auto-comp-bind', true);
			elm.click(elmClick).find('input').keyup(iptKeyUp);
		}
		if(!$(t).closest('.auto-comp-p, .auto-comp').length){
			popHide();
		}
	}

	div_pop = $('<div class="auto-comp-p"><div class="auto-comp-loading">加载中...</div><div class="auto-comp-pis"></div><div class="auto-comp-pm"><a class="auto-comp-pp" href="#">上页</a><a class="auto-comp-pn" href="#">下页</a><span class="auto-comp-ew">[<span class="auto-comp-ec">0</span>]<span class="auto-comp-ef">0</span>-<span class="auto-comp-el">0</span>/<span class="auto-comp-et">0</span>条</span></div></div>');
	div_loading = div_pop.find('div.auto-comp-loading');
	div_list = div_loading.next();
	a_prev = div_pop.find('a.auto-comp-pp');
	a_next = a_prev.next();
	entry0 = div_pop.find('span.auto-comp-ec');
	entry1 = div_pop.find('span.auto-comp-ef');
	entry2 = div_pop.find('span.auto-comp-el');
	entry3 = div_pop.find('span.auto-comp-et');
	div_pop.click(divPopClick);
	div_pop.appendTo('body');

	$(document).mousedown(documentClick);
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});
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
		this.text = '';
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
			this.totals = 0;
			this.server_totals = 0;
			return this;
		}
		,changeText: function(val){
			//文本相同时不做处理
			if(val == this.text && val.length){
				return ;
			//进行本地匹配
			}else if(!this.ajax_url || (this.data.length && val.length && val.indexOf(this.text) == 0 && this.server_totals < sever_num_per_page)){
				this.last_read = 0;
				this.now_page = 0;
				this.pages = [];
				this.text = val;
				this.makeList();

			//进行异步匹配
			}else{
				this.reset();
				this.text = val;
				this.readData(function(p){
					p.makeList();
				});
			}
		}
		,makeList: function(page){
			var  n = this.last_read
				,m = 0
				,b = [], v, txt = this.text;

			page = page || 0;

			//已有分页数据填充
			if(this.pages.length > page){
				page = this.pages[page];
				entry0.html(page[0]);
				entry1.html(page[1]);
				entry2.html(page[2]);
				div_list.html(page[3]);

			//获得分页数据填充
			}else{
				//匹配数据并记录条数
				for( v = this.data[n] ; v !== undefined && m < num_per_page; ){
					if(v.indexOf(txt) != -1){
						m++;
						b.push('<a class="auto-comp-i" href="#">', v.replace(txt, '<strong>'+txt+'</strong>'), '</a>');
					}
					v = this.data[++n];
				}

				//是异步获取数据并且条数不够并且服务器还有数据时,读取数据后再进行,并且这里直接返回
				if(this.ajax_url && m < num_per_page && this.totals < this.server_totals){
					this.readData(function(p){
						p.makeList(page);
					});
					return ;
				}

				//填充并保存分页数据
				entry0.html(m);
				entry1.html(this.last_read+1);
				entry2.html(n);
				entry3.html(this.server_totals);
				this.pages.push([m, this.last_read+1, n, b.join('')]);
				div_list.html(b.join(''));

				//记录读取点
				this.last_read = n;
			}

			//修正翻页显示状态
			if(this.now_page+1 < this.pages.length || n < this.totals || this.totals < this.server_totals){
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
			div_list.empty();
			//参数形式: ?keyContent=www&currPage=2
			$.post(p.ajax_url, 'keyContent=' + p.text + '&currPage=' + (++p.sever_now_page), function(rs){
				div_loading.hide();
				try{
					var data = eval('(' + rs + ')');
					p.data = p.data.concat(data.rows);
					p.totals = p.data.length;
					p.server_totals = data.totals;
					(typeof fn === 'function') ? fn(p) : 0;
				}catch(e){
					alert('autoComplete: 获取数据出错!\n数据前1000字符是:\n\n' + rs.substr(0, 1000));
				}
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
				pager.server_totals = data.totals;
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
	//全局监听并自动绑带事件,顺带做隐藏下拉层操作
	function documentClick(e){
		var  t = e.target
			,elm = $(t).closest('.auto-comp');

		if(elm.length && !elm.data('auto-comp-bind')){
			autoComplete.call(elm);
		}
		if(!$(t).closest('.auto-comp-p, .auto-comp').length){
			popHide();
		}
	}

	//生成下拉层并设置内部变量的引用
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
	$.fn.extend({
		autoComplete: autoComplete
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});
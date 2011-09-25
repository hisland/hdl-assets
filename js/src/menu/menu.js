/**********************************************************************************************
 * 名称: 菜单
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-22 12:54:1
 * 版本: v1
 *
 */

KISSY.add('menu', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)
		,menu_ul, menu_wrap, view_wrap
		,timer_handle, show_delay = 300, default_width = 170
		,welcome_page = 'welcome.jsp'
		,in_menu = false;

	//菜单内部点击代理
	function menuClick(e){
		var elm = $(e.target), href, str;
		//点击链接
		if(elm.is('a')){
			href = e.target.href.match(/.*#(.*)/);
			href = href ? href[1] : false;
			if(href){
				menu_ul.find('a.hover').removeClass('hover');
				elm.addClass('hover');
				$.loadURL(href, function(){
					str = elm.parents('ul', menu_wrap).prev().find('span').add(elm).map(function(i, v){
								return this.innerHTML;
							}).get().join(' &gt; ');
					$('#u-are-here').html('您当前所在位置:' + str);
				});
			}else{
				alert('此页面正在建设中……');
				e.preventDefault();
			}
			elm.blur();

		//点击展开按钮
		}else if(elm.is('span')){
			if(/menu-lv1/.test(elm.parent().attr('class'))){
				if(elm.parent().hasClass('menu-lv1-opened')){
					elm.parent().next().slideUp('fast', function(){
							$(this).prev().removeClass('menu-lv1-opened');
							fixMenuWidth();
						});
				}else{
					menu_ul.find('div.menu-lv1-opened').removeClass('menu-lv1-opened')
						.next().slideUp('fast');
					elm.parent().addClass('menu-lv1-opened')
						.next().slideDown('fast', fixMenuWidth);
				}
			}else{
				if(elm.parent().hasClass('menu-lv2-opened')){
					elm.parent().next().slideUp('fast', function(){
						$(this).prev().removeClass('menu-lv2-opened');
						fixMenuWidth();
					});
				}else{
					elm.parent().addClass('menu-lv2-opened').next().slideDown('fast', fixMenuWidth);
				}
			}
		}
	}

	//鼠标滑入滑出的宽度处理
	function outerIn(e){
		in_menu = true;
		timer_handle = setTimeout(function(){
			fixMenuWidth();
		}, show_delay);
		if(ie6){
			menu_wrap.width('');
		}
	}
	function outerOut(e){
		in_menu = false;
		clearTimeout(timer_handle);
		view_wrap.width(default_width);
		if(ie6){
			menu_wrap.width(default_width);
		}
	}

	//更新菜单宽度函数
	function fixMenuWidth(){
		if(!in_menu){
			return false;
		}
		var  wrap = menu_wrap[0]
			,h = wrap.scrollHeight>wrap.clientHeight ? 17 : 0
			,w;

		view_wrap.width(default_width);
		w = wrap.scrollWidth;
		if(w > default_width){
			view_wrap.width(w + h + 5);
		}else{
			view_wrap.width(w + h);
		}
	}

	//生成菜单html
	function makeMenu(tree){
		var b = [];
		b.push('<ul class="menu-ul">');
		$.each(tree.children, function(i, v){
			i += 2;
			b.push('<li>');
			b.push('<div class="menu-lv1"><span class="menu-ico', i, '">', v.text, '</span></div><ul class="menu-lv1-wrap">');
			makeSubMenu(b, v.children);
			b.push('</ul>');
			b.push('</li>');
		});
		b.push('</ul>');
		return b.join('');
	}
	//用于递归生成2级以下目录
	function makeSubMenu(b, tree){
		$.each(tree, function(i, v){
			b.push('<li>');
			if(v.children){
				b.push('<div class="menu-lv2"><span>', v.text, '</span></div><ul class="menu-lv2-wrap">');
				makeSubMenu(b, v.children);
				b.push('</ul>');
			}else{
				b.push('<div class="menu-lv2"><a id="', v.id, '" href="', v.url, '" rightsPrex="', v.prefix, '">', v.text, '</a></div>');
			}
			b.push('</li>');
		});
	}

	//获取菜单数据
	function getMenu(selector, url, callback){
		$.post(url, 'rights='+$('#rights').val(), function(rs){
			try{
				var tree = $.parseJSON(rs);
				menu_ul = $(makeMenu(tree));
				$(selector).empty().append(menu_ul);

				menu_wrap = menu_ul.parent();
				view_wrap = menu_wrap.parent();

				view_wrap.width(default_width);
				view_wrap.next().css('margin-left', default_width+8);

				menu_ul.click(menuClick);
				view_wrap.hover(outerIn, outerOut);

				//载入上次页面或者欢迎页面
				var hash = location.hash, a = $('');
				if(hash){
					a = menu_ul.find('a[href='+hash+']');
					a.length ? 0 : a = menu_ul.find('a[href='+location.href+']');//ie动态载入的代码会自动补全url
				}
				if(a.length > 1){
					alert('有2个菜单相同,请用firebug查看控制台输出');
					a = a.eq(0);
				}

				if(a.length){
					a.parents('ul', menu_wrap).show()
						.filter('.menu-lv1-wrap').prev().addClass('menu-lv1-opened')
						.end().end().filter('.menu-lv2-wrap').prev().addClass('menu-lv2-opened');
					a.click();
				}else{
					$.loadURL(welcome_page);
				}

				//做完动作后回调
				$.isFunction(callback) && callback();
			}catch(e){
				alert(e.message + '\n获取菜单出错:\n信息前300字符:\n' + rs.substr(0, 300));
			}
		});
	}

	$.extend({
		getMenu: getMenu
	});
}, {
	requires: ['jquery-1.4.2', 'load-url']
});
/**********************************************************************************************
 * 名称: 菜单,取自demo
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
		,menu_ul
		,menu_wrap
		,view_wrap
		,timer_handle
		,in_menu = false;

	//菜单内部点击代理
	function menuClick(e){
		var elm = $(e.target), href, str;
		//点击链接
		if(elm.is('a')){
			beforeLoad();
			href = e.target.href.match(/.*#(.*)/);
			href = href ? href[1] : false;
			if(href){
				$('#mod-wrap').load(href, function(){
					str = elm.parents('ul', this).prev().find('span').add(elm).map(function(i, v){
								return this.innerHTML;
							}).get().join(' &gt; ');
					$('#u-are-here').html('您当前所在位置：' + str);
					afterLoad();
				});
				$(this).find('a.hover').removeClass('hover');
				elm.addClass('hover');
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
					$('#menu').find('div.menu-lv1-opened').removeClass('menu-lv1-opened')
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
		}, 300);
		if(ie6){
			menu_wrap.width('auto');
		}
	}
	function outerOut(e){
		in_menu = false;
		clearTimeout(timer_handle);
		$(this).width(150);
		if(ie6){
			menu_wrap.width(148);
		}
	}

	//更新菜单宽度函数
	function fixMenuWidth(){
		if(!in_menu){
			return false;
		}
		var  wrap = menu_wrap[0]
			,h = wrap.scrollHeight>wrap.clientHeight ? 19 : 2
			,wrap2 = view_wrap.parent();
		wrap2.width(150);
		if(wrap.scrollWidth > wrap.clientWidth){
			wrap2.width(wrap.scrollWidth + h + 5);
		}else{
			wrap2.width(wrap.clientWidth + h);
		}
	}

	//生成菜单html
	function makeMenu(tree){
		var b = [];
		b.push('<div class="menu"><div class="menu-head"><span class="menu-head-in">导航菜单</span></div>');
		b.push('<div class="menu-wrap"><ul class="menu-ul">');
		$.each(tree[0].children, function(i, v){
			i += 2;
			b.push('<li>');
			b.push('<div class="menu-lv1"><span class="menu-ico', i, '">', v.text, '</span></div><ul class="menu-lv1-wrap">');
			makeSubMenu(b, v.children);
			b.push('</ul>');
			b.push('</li>');
		});
		b.push('</ul></div></div>');
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
				b.push('<div class="menu-lv2"><a class="" href="', v.url, '">', v.text, '</a></div>');
			}
			b.push('</li>');
		});
	}

	//获取菜单数据
	function getMenu(selector, url, callback){
		$.get(url, function(rs){
			try{
				var tree = eval("(" + rs + ")");
				view_wrap = $(makeMenu(tree));
				menu_ul = view_wrap.find('>div>ul');
				menu_wrap = menu_ul.parent();

				menu_ul.click(menuClick);
				$(selector).append(view_wrap).hover(outerIn, outerOut);

				//ie6下修正menu展开的宽度
				if(ie6){
					menu_wrap.width(148);
				}

				//做完动作后回调
				$.isFunction(callback) && callback();
			}catch(e){
				alert('获取菜单出错:\n信息前300字符:\n' + rs.substr(300));
			}
		});
	}

	//初始化函数
	function initMenu(){
		
		//做完动作后回调
		$.isFunction(callback) && callback();
	}

	$.fn.extend({
		 initMenu: initMenu
	});
	$.extend({
		getMenu: getMenu
	});
}, {
	requires: ['jquery-1.4.2']
});
/**********************************************************************************************
 * 名称: 菜单,取自demo
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-22 12:54:1
 * 版本: v1
 *
 */

KISSY.add('hdlValidator', function(S, undef) {
	var $ = jQuery;
	var ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent);

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
	
	var timer_handle, in_menu = false;
	$('#menu-wrap').parent().parent().hover(function(e){
		in_menu = true;
		timer_handle = setTimeout(function(){
			fixMenuWidth();
		}, 300);
		if(ie6){
			$('#menu-wrap').width('auto');
		}
	}, function(e){
		in_menu = false;
		clearTimeout(timer_handle);
		$(this).width(150);
		if(ie6){
			$('#menu-wrap').width(148);
		}
	});

	//ie6下修正menu展开的宽度
	if(ie6){
		$('#menu-wrap').width(148);
	}

	//更新菜单宽度函数
	function fixMenuWidth(){
		if(!in_menu){
			return false;
		}
		var  wrap = $('#menu').parent()[0]
			,h = wrap.scrollHeight>wrap.clientHeight ? 19 : 2
			,wrap2 = $('#menu-wrap').parent().parent();
		wrap2.width(150);
		if(wrap.scrollWidth > wrap.clientWidth){
			wrap2.width(wrap.scrollWidth + h + 5);
		}else{
			wrap2.width(wrap.clientWidth + h);
		}
	}

	//载入上次页面或者欢迎页面
	var hash = location.hash, a = $('');
	if(hash){
		a = $('#menu-wrap a[href='+hash+']');
		a.length ? 0 : a = $('#menu-wrap a[href='+location.href+']');//ie动态载入的代码会自动补全url
	}
	if(a.length > 1){
		alert('有2个菜单相同,请用firebug查看控制台输出');
		a = a.eq(0);
	}

	if(a.length){
		a.parents('ul', '#menu').show()
			.filter('.menu-lv1-wrap').prev().addClass('menu-lv1-opened')
			.end().end().filter('.menu-lv2-wrap').prev().addClass('menu-lv2-opened');
		a.click();
	}else{
		beforeLoad();
		$('#mod-wrap').load('welcome.html', afterLoad);
	}

	//初始化函数
	function initMenu(selector, url, callback){
		
		//做完动作后回调
		$.isFunction(callback) && callback();
	}

	$.extend({
		initMenu: initMenu
	});
}, {
	requires: ['jquery-1.4.2']
});
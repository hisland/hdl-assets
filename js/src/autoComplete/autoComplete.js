/**********************************************************************************************
 * select模拟控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-11-29 10:30:33
 * 版本: v1
 *
 * 前置脚本:
 *			../patch.javascript.js;
 *			../jquery-1.4.2.min.js
 */
(function($){
	var  target = $(''), list
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)
		,delay_timer = 0
		, i = 0;

	function iptKeyUp(e){
		clearTimeout(delay_timer);
		var val = this.value;
		delay_timer = setTimeout(function(){
			document.getElementById('aaa').innerHTML += '<br />' + (i++);
			makeList(val);
		}, 500);
	}
	function iptKeyDown(e){
		var a;
		if(e.keyCode === 13){//回车
			a = list.find('a.auto-comp-selected');
			target.find('select')[0].value = a.attr('data-value');
			target.find('input').val(a.text());
			closeList();
		}
	}
	function iptBlur(e){
		var a = list.find('a.auto-comp-selected');
		if(this.value !== ''){
			target.find('select')[0].value = a.attr('data-value');
			target.find('input').val(a.text());
		}
	}

	function showList(){
		var t_w = target.outerWidth();
		list.css('visibility', 'hidden').show();
		list.height(30);
		list.width(t_w - 2);
		if(list[0].scrollWidth < t_w){
			list.css('overflow-x', 'hidden');
		}else{
			list.css('overflow-x', 'scroll');
		}

		if(list[0].scrollHeight > 200){
			list.height(200);
			list.css('overflow-y', 'scroll');
		}else{
			list.css('height', '');
			list.css('overflow-y', 'hidden');
		}
		list[0].scrollTop = 0;
		list.adjustElement(target).css('visibility', '').show();
		list.find('a').width(list[0].scrollWidth - 2);
		target.addClass('auto-comp-opened');
		target.find('input').blur(iptBlur).keyup(iptKeyUp).keydown(iptKeyDown);
		$(document).click(closeList);
	}

	function closeList(e){
		if(e && $(e.target).closest('.auto-comp-wrap, .auto-comp').length){
			e.preventDefault();
		}else{
			list.hide();
			target.removeClass('auto-comp-opened');
			target.find('input').unbind('blur', iptBlur).unbind('keyup', iptKeyUp).unbind('keydown', iptKeyDown);
			$(document).unbind('click', closeList);
		}
	}

	function listClick(e){
		var elm;
		if(e.target.tagName.toUpperCase() === 'A'){
			elm = $(e.target);
			if(!elm.is('.auto-comp-selected')){
				target.find('select')[0].value = elm.attr('data-value');
				target.find('input').val(elm.text());
			}
			e.preventDefault();
			closeList();
		}
	}

	function makeList(str){
		var  select = target.find('select')
			,str1 = [], str2 = [], a1;

		select.find('option').map(function(i, v){
				var val = v.innerHTML;
				if(i != 0){
					if(val.indexOf(str) != -1){
						val = val.replace(str, '<strong>'+str+'</strong>');
						str1.push('<a class="auto-comp-item" href="#" data-value="'+ v.value +'">' + val + '</a>');
					}else{
						str2.push('<a class="auto-comp-item" href="#" data-value="'+ v.value +'">' + val + '</a>');
					}
				}else{
					str1.push('<a style="padding-left:40px;" class="auto-comp-item" href="#" data-value="'+ v.value +'">' + val + '</a>');
				}
			});
		if(ie6){
			list.find('div').html(str1.join('') + str2.join(''));
		}else{
			list.html(str1.join('') + str2.join(''));
		}

		if(select[0].selectedIndex <= 0){
			list.find('a:eq(0)').addClass('auto-comp-selected');
		}else{
			list.find('a:eq(1)').addClass('auto-comp-selected');
		}
	}

	$(function(){
		list = $('<div class="auto-comp-wrap"></div>').appendTo('body');
		if(ie6){
			list.html('<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);" frameborder="no" scrolling="no"></iframe><div style="position:relative;z-index:10;zoom:1;"></div>');
		}
		list.click(listClick);
	});

	$(document).mousedown(function(e){
		if((elm = $(e.target).closest('span.auto-comp')).length){
			target.removeClass('auto-comp-opened');
			target = elm;
			makeList(target.find('input').val());
			target.find('input').focus();
			showList();
		}
	});
})(jQuery);
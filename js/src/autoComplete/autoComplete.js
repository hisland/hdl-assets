/**********************************************************************************************
 * select模拟控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-11-29 10:30:33
 * 版本: v1
 *
 */

KISSY.add('autoComplete', function(S, undef) {
	var  $ = jQuery
		,target = $(''), input, select
		,list
		,ie6 = /*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)
		,delay_timer = 0
		,prev_val;

	//按c标签的输出进行转换, ["']这两个使用实体编号,其它3个使用实体名称
	String.entityHTMLReg = /[&<>"']/g;
	String.prototype.entityHTML = function(){
		return this.replace(String.entityHTMLReg, function(v){
			if(v === '&'){
				return '&amp;';
			}else if(v === '<'){
				return '&lt;';
			}else if(v === '>'){
				return '&gt;';
			}else if(v === '"'){
				return '&#34;';
			}else if(v === "'"){
				return '&#39;';
			}
			return v;
		});
	}
	String.unentityHTMLReg = /&lt;|&gt;|&amp;|&#34;|&#39;/g;
	String.prototype.unentityHTML = function(){
		return this.replace(String.unentityHTMLReg, function(v){
			if(v === '&amp;'){
				return '&';
			}else if(v === '&lt;'){
				return '<';
			}else if(v === '&gt;'){
				return '>';
			}else if(v === '&#34;'){
				return '"';
			}else if(v === '&#39;'){
				return "'";
			}
			return v;
		});
	}

	function targetKeyUp(e){
		var val = $(this).find('input').val();
		if(prev_val != val && (e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 32 || e.keyCode == 8 || e.keyCode == 46 || (e.keyCode >= 96 && e.keyCode <= 111) || (e.keyCode >= 186 && e.keyCode <= 192) || (e.keyCode >= 219 && e.keyCode <= 222)){
			clearTimeout(delay_timer);
			delay_timer = setTimeout(function(){
				makeList(val);
				prev_val = val;
			}, 50);
		}
	}
	function targetKeyDown(e){
		var a;
		if(e.keyCode === 13){//回车
			a = list.find('.auto-comp-selected');
			target.find('select')[0].value = a.attr('data-value');
			target.find('input').val(a.text());
			closeList();
			e.stopPropagation();
		}
	}

	function fixWidth(){
		var t_w = target.outerWidth();
		list.height(30);
		list.width(t_w - 2);
		if(list[0].scrollWidth < t_w){
			list.css('overflow-x', 'hidden');
		}else{
			list.css('overflow-x', 'scroll');
		}

		//ie6在这里读取一下list[0].scrollHeight, 有时候读不到,下面那个就能读取到了
		if(ie6){
			list[0].scrollHeight > 200 ? 0: 0;
		}

		if(list[0].scrollHeight > 200){
			list.height(200);
			list.css('overflow-y', 'scroll');
		}else{
			list.css('height', '');
			list.css('overflow-y', 'hidden');
		}
	}
	function showList(){
		var t_w = target.outerWidth();
		list.adjustElement(target).show();
		if(ie6){
			fixWidth();
		}else{
			list.width(t_w - 2);
		}
		list[0].scrollTop = 0;
		target.addClass('auto-comp-opened');
		$(document).click(closeList);
	}

	function openList(e){
		var  t = e.target
			,elm = $(t).closest('.auto-comp')
			,tag_name = t.tagName.toUpperCase();

		if(elm.length){
			if(elm[0] !== target[0] || !elm.hasClass('auto-comp-opened')){
				target.removeClass('auto-comp-opened');
				target = elm;
				input = target.find('input');
				select = target.find('select');
				showList();
			}

			if(tag_name === 'A'){
				makeList();
			}else{
				makeList(input.val());
			}

			if(!target[0].bind_select){
				target.keyup(targetKeyUp).keydown(targetKeyDown);
				target[0].bind_select = true;
			}
		}
	}
	function closeList(e){
		if(e && $(e.target).closest('.auto-comp-wrap, .auto-comp').length){
			e.preventDefault();
		}else{
			if(e){
				if(input.val() === '全部'){
					select[0].selectedIndex = 1;
				}else if(select[0].selectedIndex !== 0 ){
					input.val(select[0].options[select[0].selectedIndex].innerHTML.unentityHTML());
				}
			}
			list.hide();
			target.removeClass('auto-comp-opened');
			$(document).unbind('click', closeList);
		}
	}

	function makeList(str){
		var  opts = select[0].options
			,str1 = []
			,i ,ret ,len, val, text, match;

		if(!select[0].opts){
			ret = [];
			for (i = 0, len = opts.length; i < len; i++) {
				ret[i] = [opts[i].innerHTML, opts[i].value];
			}
			select[0].opts = ret;
		}
		opts = select[0].opts;

		if(str === undefined){//显示全部
			if(!select[0].str1){
				for (i = 2, len = opts.length; i < len; i++) {
					text = opts[i][0];
					val = opts[i][1];
					str1.push('<a class="auto-comp-item" href="#" data-value="'+ val +'" title="' + text + '">' + text + '</a>');
				}
				str1.unshift('<a style="padding-left:40px;" class="auto-comp-item" href="#" data-value="">全部</a>');
				str1.unshift('<span>共' + (str1.length-1) + '条</span>');
				select[0].str1 = str1;
			}else{
				str1 = select[0].str1;
			}
		}else if(str === ''){//不进行操作
			str1.push('<span>请输入进行匹配</span>');
		}else{//显示匹配的
			str = str.entityHTML();
			for (i = 2, len = opts.length; i < len; i++) {
				text = opts[i][0];
				if(text.indexOf(str) != -1){
					if(!match){
						match = opts[i];
					}
					val = opts[i][1];
					str1.push('<a class="auto-comp-item" href="#" data-value="'+ val +'" title="' + text + '">' + text.replace(str, '<strong>'+str+'</strong>') + '</a>');
				}
			}
			str1.unshift('<span>匹配' + str1.length + '条</span>');
		}

		if(match){
			select[0].value = match[1];
		}else{
			select[0].selectedIndex = 0;
		}
		list.html(str1.join(''));
		if(ie6){
			fixWidth();
		}
	}

	function moveUp(){
		
	}
	function moveDown(){
		
	}

	function documentMouseDown(e){
		var  t = e.target
			,elm = $(t).closest('.auto-comp')
			,tag_name;

		if(elm.length){
			tag_name = t.tagName.toUpperCase();

			if(elm.hasClass('auto-comp-disabled')){
				if(tag_name === 'A' || tag_name === 'INPUT'){
					$(t).blur();
					e.preventDefault();
				}
			}else{
				if(elm[0] !== target[0] || !elm.hasClass('auto-comp-opened')){
					target.removeClass('auto-comp-opened');
					target = elm;
					input = target.find('input');
					select = target.find('select');
					showList();
				}

				if(tag_name === 'A'){
					makeList();
				}else{
					makeList(input.val());
				}

				if(!target[0].bind_select){
					target.keyup(targetKeyUp).keydown(targetKeyDown);
					target[0].bind_select = true;
				}
			}
		}
	}

	function listClick(e){
		var elm = $(e.target).closest('a');
		if(elm.length){
			target.find('select')[0].value = elm.attr('data-value');
			target.find('input').val(elm.text());
			e.preventDefault();
			closeList();
		}
	}

	$(function(){
		list = $('<div class="auto-comp-wrap"></div>').appendTo('body');
		list.click(listClick);
	});

	$(document).mousedown(documentMouseDown);
}, {
	requires: ['jquery-1.4.2', 'adjustElement']
});
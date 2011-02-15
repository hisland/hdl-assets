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
	var target = $(''), list, _list_opened = false;

	function listClick(e){
		var elm;
		if(e.target.tagName.toUpperCase() === 'A'){
			elm = $(e.target);
			if(!elm.is('.drop-select-selected')){
				target.find('span').html(elm.html());
				target.find('select').val(elm.attr('data-value'));
				closeList();
			}
			e.preventDefault();
		}
	}

	function makeList(){
		var  i = 0, str = []
			,data = target.find('option')
			,select_idx = target.find('select')[0].selectedIndex
			,len = data.length, value;

		for( ; i < len; i++){
			value = data[i];
			str.push('<a class="drop-select-item" href="javascript:void(0)" data-value="'+value.value+'">'+value.innerHTML+'</a>');
		}

		list.html(str.join(''));
	}

	function showList(){
		if(list.outerWidth() < target.outerWidth()){
			list.width(target.outerWidth()-2);
		}
		list.find('a:eq('+target.find('select')[0].selectedIndex+')').addClass('drop-select-selected').siblings('.drop-select-selected').removeClass('drop-select-selected')
		list.adjustElement(target).show();
		target.addClass('drop-select-opened');
		_list_opened = true;
	}

	function closeList(){
		list.hide();
		target.removeClass('drop-select-opened');
		_list_opened = false;
	}

	function documentClick(e){
		var elm = $(e.target).closest('.drop-select');
		if(elm.length && !elm.hasClass('drop-select-disabled')){
			if(elm[0] != target[0]){
				closeList();
				target = elm;
				makeList();
			}
			showList();
			target.blur();
		}else if(_list_opened){
			closeList();
		}
	}

	$.fn.setDropDisabled = function(d){
		
	}
	$.fn.addDropOption = function(name, value){
		
	}

	$(function(){
		list = $('<div class="drop-select-wrap" />');
		list.click(listClick).appendTo('body');
	});

	//在文档上进行监听
	$(document).click(documentClick);
})(jQuery);
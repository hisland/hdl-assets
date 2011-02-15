(function($){
	var target = $(''), list = target, select = list;

	function listClick(e){
		var elm;
		if(e.target.tagName.toUpperCase() === 'A'){
			elm = $(e.target);
			if(!elm.is('.ie67-select-selected')){
				target.find('span').html(elm.html());
				elm.addClass('ie67-select-selected').siblings('.ie67-select-selected').removeClass('ie67-select-selected');
				select[0].selectedIndex = elm.index();
				//触发change事件
				select.change();
			}
			//触发click事件
			select.click();
			e.preventDefault();
		}
	}

	function makeList(){
		list = $('<div class="ie67-select-wrap" />');
		select = target.find('select');

		var i=0
			, data = target.find('option')
			, select_idx = select[0].selectedIndex
			, len=data.length, value=data[i];

		while(value){
			value = value.innerHTML;
			$('<a class="ie67-select-item" href="#"">'+value+'</a>').appendTo(list);
			value = data[++i];
		}

		list.find('a:eq('+select_idx+')').addClass('ie67-select-selected');
		list.click(listClick);
		list.appendTo('body');
	}

	function showList(){
		list.css('visibility', 'hidden').show();
		if(list.outerWidth() < target.outerWidth()){
			list.width(target.outerWidth()-2);
		}
		list.adjustElement(target).css('visibility', '').show();
		target.addClass('ie67-select-opened');
		$(document).click(closeList);
	}

	function closeList(e){
		if($(e.target).closest('a.ie67-select').length){
			e.preventDefault();
		}else{
			list.hide();
			target.removeClass('ie67-select-opened');
			$(document).unbind('click', closeList);
		}
	}

	function aClick(e){
		var elm;
		if((elm = $(e.target).closest('a.ie67-select')).length && elm.not('.ie67-select-disabled').length){
			if(elm[0] != target[0]){
				target.removeClass('ie67-select-opened');
				target = elm;
				list.unbind('click', listClick).remove();
				makeList();
			}
			showList();
			target.blur();
			e.preventDefault();
		}
	}

	//在文档上进行监听
	$(document).click(aClick);
})(jQuery);
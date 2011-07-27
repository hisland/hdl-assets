KISSY.add('moni-select', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,target = EMPTY_$
		,list = EMPTY_$
		,select = EMPTY_$;

	function listClick(e){
		var elm;
		if(e.target.tagName.toUpperCase() === 'A'){
			elm = $(e.target);
			if(!elm.is('.moni-select-selected')){
				target.find('span').html(elm.html());
				elm.addClass('moni-select-selected').siblings('.moni-select-selected').removeClass('moni-select-selected');
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
		list = $('<div class="moni-select-wrap" />');
		select = target.find('select');

		var i=0
			, data = target.find('option')
			, select_idx = select[0].selectedIndex
			, len=data.length, value=data[i];

		while(value){
			value = value.innerHTML;
			$('<a class="moni-select-item" href="#"">'+value+'</a>').appendTo(list);
			value = data[++i];
		}

		list.find('a:eq('+select_idx+')').addClass('moni-select-selected');
		list.click(listClick);
		list.appendTo('body');
	}

	function showList(){
		list.css('visibility', 'hidden').show();
		if(list.outerWidth() < target.outerWidth()){
			list.width(target.outerWidth()-2);
		}
		list.adjustElement(target).css('visibility', '').show();
		target.addClass('moni-select-opened');
		$(document).click(closeList);
	}

	function closeList(e){
		if($(e.target).closest('a.moni-select').length){
			e.preventDefault();
		}else{
			list.hide();
			target.removeClass('moni-select-opened');
			$(document).unbind('click', closeList);
		}
	}

	function aClick(e){
		var elm;
		if((elm = $(e.target).closest('a.moni-select')).length && elm.not('.moni-select-disabled').length){
			if(elm[0] != target[0]){
				target.removeClass('moni-select-opened');
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
}, {
	requires: ['jquery-1.4.2']
});
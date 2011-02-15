(function($){
	var  EMPTY_$ = $('')
		,div_wrap
		,btn_complete
		,ipt_year, ipt_week
		,div_drop_list
		,now_date, now_drop
		,drop_prev, drop_next, drop_close
		,drop_arr, drop_arr_class
		,target_ipt, target_fill = EMPTY_$
		,_is_opened = false;

	var  ie = /*@cc_on!@*/!1;


	function now(time_offset) {
		time_offset = time_offset - 0 || 0;
		return new Date(new Date().valueOf() + time_offset);
	}

	function btnNowClick(){
		date_arr.setDate(now());
		date_arr.refreshIpts();
		date_arr.fillTarget();
	}
	function btnCompleteClick(){
		closeTool();
	}


	function dropOpen(){
		div_drop_list.parent().show();
	}
	function dropClose(){
		div_drop_list.parent().hide();
	}
	function dropPrev(){
		
	}
	function dropNext(){
		
	}
	function dropSelect(dt){
		var type = target_ipt[0].className.substring(4);
		date_arr.item(type, dt.html()).refreshIpts(type).fillTarget();
		dt.addClass('week-drop-list-now').siblings('a.week-drop-list-now').removeClass('week-drop-list-now');
		if(type === 'year' || type === 'month' || type === 'date'){
			date_arr.refreshIpts('date').refreshDataList();
		}
		dropClose();
	}

	function divWrapClick(e){
		var	 t = e.target
			,dt = $(t)
			,tag_name = t.tagName.toUpperCase()
			,parent_class = t.parentNode.className;
		if(tag_name === 'SPAN' && dt.closest('.week-ctrl').length){
			target_ipt = dt;
			dropOpen();
		}else if(tag_name === 'A'){
			if(dt.closest('.week-drop-list').length){
				dropSelect(dt);
			}else if(dt.closest('.week-date-list').length){
				dateSelect(dt);
			}else if(t === btn_clear[0]){
				btnClearClick();
			}else if(t === btn_now[0]){
				btnNowClick();
			}else if(t === btn_complete[0]){
				btnCompleteClick();
			}else if(t === drop_close[0]){
				dropClose();
			}else if(t === drop_prev[0]){
				
			}else if(t === drop_next[0]){
				
			}
			e.preventDefault();
		}else if(!dt.closest('.week-drop-list-wrap').length){
			dropClose();
		}
	}

	function openTool(){
		//TODO:对齐
		div_wrap.show();
	}
	function closeTool(){
		dropClose();
		target_fill = EMPTY_$;
		div_wrap.hide();
	}

	function isDateInput(elm){
		var attr = elm.getAttribute('type');
		if(elm.tagName.toUpperCase() === 'INPUT' && attr === 'week'){
			return true;
		}else{
			return false;
		}
	}
	function documentClick(e){
		var t = e.target;
		if(isDateInput(t)){
			if(t !== target_fill[0]){
				openTool();
				_is_opened = true;
			}
		}else if(!$(t).closest('.week-wrap').length && _is_opened){
			_is_opened = false;
			closeTool();
		}
	}

	//设置各个节点的引用
	div_wrap = $('<div class="week-wrap"><div class="week-ctrl"><strong><span class="week-year">2011</span>年</strong><strong><span class="week-week">1</span>周</strong><a class="week-ok" href="#">完成</a></div><div class="week-drop-list-wrap"><div class="week-drop-list"></div><p class="week-drop-list-ctrl"><a href="#">上页</a><a href="#">下页</a><a href="#">关闭</a></p></div></div>');

	btn_complete = div_wrap.find('a.week-ok');

	ipt_year = div_wrap.find('span.week-year');
	ipt_week = div_wrap.find('span.week-week');

	div_drop_list = div_wrap.find('div.week-drop-list');

	drop_prev = div_wrap.find('p.week-drop-list-ctrl a:eq(0)');
	drop_next = drop_prev.next();
	drop_close = drop_next.next();

	//文档加载完成后放入body
	$(function(){
		div_wrap.appendTo('body');
		div_wrap.click(divWrapClick);
	});

	//在文档上监听是否打开日期控件以及何时关闭日期控件
	$(document).click(documentClick);
})(jQuery);
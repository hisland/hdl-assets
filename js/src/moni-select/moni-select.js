/**********************************************************************************************
 * 名称: 模拟的selct下拉控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-08-15 11:09:06
 * 版本: v1.0
 * 
 * API:
 * 		$('select').moniSelect(); //初始化, 有标记,不会重复初始化
 * 		$('select').refreshSelect(); //更新select的状态到moni-select,包括[显示文件,disabled状态]
 * 
 * 2011-09-09 17:17:02:
 * 		ie[6,7,8,9],修改select的值后, 紧接着触发click会同时触发change事件
 *			修改后再改回去,[不会]同时触发change事件
 *			解决: 加标记位,如果已改变且没有change, 触发change事件
 */
KISSY.add('moni-select', function(S, undef) {
	var $ = jQuery,
		EMPTY_$ = $(''),
		target = EMPTY_$,
		list = EMPTY_$,
		select = EMPTY_$;

	function listClick(e){
		var elm = $(e.target), changed = false;
		if(elm.is('a')){
			if(!elm.is('.moni-select-selected')){
				target.find('em').html(elm.html());
				elm.addClass('moni-select-selected').siblings('.moni-select-selected').removeClass('moni-select-selected');
				select[0].selectedIndex = elm.index();
				select[0]['--changed'] = false;
				select.bind('change', checkChanged);
				changed = true;
			}
			//触发click事件
			select.click();
			//已改变且没有change, 触发change事件
			if(changed && !select[0]['--changed']){
				select.change();
			}
			select.unbind('change', checkChanged);
			e.preventDefault();
		}
	}

	function checkChanged(){
		this['--changed'] = true;
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
			$('<a class="moni-select-item" href="#">'+value+'</a>').appendTo(list);
			value = data[++i];
		}

		list.find('a:eq('+select_idx+')').addClass('moni-select-selected');
		list.click(listClick);
		list.appendTo('body');
	}

	function showList(){
		list.css('visibility', 'hidden').show();
		if(list[0].scrollHeight > 300){
			list.height(300);
		}
		var tw = target.outerWidth();
		var lw = list[0].scrollWidth;
		if(lw > 300){
			list.width(300);
		}else if (lw < tw) {
			list.width(tw);
		}
		list.adjustElement(target).css('visibility', '').show();
		$(document).click(closeList);
	}

	function closeList(e){
		if($(e.target).closest('a.moni-select').length){
			e.preventDefault();
		}else{
			list.hide();
			target = EMPTY_$;
			$(document).unbind('click', closeList);
		}
	}

	function aClick(e){
		var elm;
		//鼠标左键且是模拟select且不是disabled的,才打开
		if(e.button == 0 && (elm = $(e.target).closest('a.moni-select')).length && elm.not('.moni-select-disabled').length){
			if(elm[0] != target[0]){
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
	$.fn.extend({
		//将select包装成moni-select
		moniSelect: function() {
			this.filter('select').each(function(i, v) {
				//只生成一次
				if (this.__bound_moni) {
					return;
				}
				this.__bound_moni = true;
				v = $(v);
				var width = v.width(), height = v.height()-2;
				width = (width <= 0 ? this.style.width.replace('px', '') || 117 : width)-18;
				height = (height <= 0 ? this.style.height.replace('px', '') || 14 : height)-2;
				v.wrap('<a class="moni-select" style="width:'+width+'px;" href="javascript:void(0)"></a>').before('<em class="moni-select-text"></em>');
			}).refreshSelect();
		}
		//使用此方法同步真实select到moni-select
		,refreshSelect: function() {
			this.filter('select').each(function(i, v) {
				var  disabled = this.disabled
					,idx = this.selectedIndex
					,text = idx == -1 ? '' : this.options[idx].innerHTML
					,me = $(this);
				
				//修正禁用状态
				if (disabled) {
					me.parent().attr('disabled', true).addClass('moni-select-disabled');
				}else {
					me.parent().attr('disabled', false).removeClass('moni-select-disabled');
				}
				
				//修正显示文本
				me.prev().html(text);
			});
		}
	});
}, {
	requires: ['jquery-1.4.2', 'builtin']
});
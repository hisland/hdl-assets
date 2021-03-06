define(['jquery', 'kissy', 'jquery-plugin', 'css!./main'], function($, S){
	var $EMPTY = $(''),
		target = $EMPTY,
		list = $('<div class="moni-select-wrap" />'),
		select = $EMPTY;

	list.click(listClick).appendTo('body');

	function checkChanged(){
		this['--changed'] = true;
	}
	function listClick(e){
		var elm = $(e.target), changed = false;
		if(elm.is('a.moni-select-item')){
			if(!elm.is('.moni-select-selected')){
				changed = true;

				target.find('em').html(elm.html());
				elm.addClass('moni-select-selected').siblings('.moni-select-selected').removeClass('moni-select-selected');

				select.bind('change', checkChanged);
				select[0]['--changed'] = false;

				$(select).val($(elm).attr("optval"));
			}

			//触发click事件
			select.triggerHandler('click');
			//已改变且没有change, 触发change事件
			if(changed && !select[0]['--changed']){
				select.change();
			}
			select.unbind('change', checkChanged);

			closeList();

			e.preventDefault();
		}
	}

	function makeList(){
		list.empty();
		select = target.find('select');

		var str = [], select_idx = $(select).val();
		if(target.find('optgroup').length){ //存在optgroup
			target.find('optgroup').each(function(i, v){
				str.push('<div class="moni-select-optiongroup" href="#">' + $(v).attr("label") + '</div>');
				$(this).find("option").each(function(i, v){
					str.push('<a class="moni-select-item moni-select-hasgroup" href="#" optval='+$(v).val()+'>' + v.innerHTML + '</a>');
				});
			});
		}else{
			target.find('option').each(function(i, v){
				str.push('<a class="moni-select-item" href="#" optval='+$(v).val()+'>' + v.innerHTML + '</a>');
			});
		}
		list.html(str.join(''));

		list.find('a[optval="'+select_idx+'"]').addClass('moni-select-selected');
	}

	function showList(){
		//重置宽高
		list.css({
			width: 'auto',
			height: 'auto',
			'overflow-x': 'auto',
			visibility: 'hidden',
			'z-index': S.guid()
		}).show();

		//修正高度
		if(list[0].scrollHeight > 300){
			list.height(300);
		}

		//修正宽度
		var tw = target.outerWidth(), lw = list[0].scrollWidth;
		if(lw > 300){
			list.width(300).css('overflow-x', 'scroll');
			list.children().width(lw);
		}else if(lw <= tw-2) {
			list.width(tw-2);
		}

		list.align(target).css('visibility', '').show();
		$(document).mousedown(closeList);
	}

	function closeList(e){
		if(e && $(e.target).closest('.moni-select, .moni-select-wrap').length){
			e.preventDefault();
		}else{
			list.hide();
			target = $EMPTY;
			$(document).unbind('mousedown', closeList);
		}
	}

	function aClick(e){
		var elm = $(this);
		//鼠标左键且是模拟select且不是disabled的,才打开
		if(e.button == 0 && !elm.is('.moni-select-disabled')){
			//不是自己,重新生成列表
			if(elm[0] != target[0]){
				target = elm;
				makeList();
			}
			showList();
			target.blur();
			e.preventDefault();
		}
	}

	$.fn.extend({
		//将select包装成moni-select
		moniSelect: function() {
			this.filter('select').each(function(i, v) {
				//只生成一次
				if (!this['--bound-moni']) {
					this['--bound-moni'] = true;
					v = $(v);
					var width = v.width(), height = v.height()-2;
					width = (width <= 0 ? this.style.width.replace('px', '') || 122 : width)-18;
					height = (height <= 0 ? this.style.height.replace('px', '') || 14 : height)-2;
					v.wrap('<a class="moni-select" style="width:'+width+'px;" href="javascript:void(0)"></a>').before('<em class="moni-select-text"></em>');
					//注册事件
					$(v).parent().click(aClick);
				}
			}).refreshSelect();
		},
		//使用此方法同步真实select到moni-select
		refreshSelect: function() {
			this.filter('select').each(function(i, v) {
				var disabled = this.disabled,
					idx = this.selectedIndex,
					text = idx == -1 ? '' : this.options[idx].innerHTML,
					me = $(this);
				
				//修正禁用状态
				if (disabled) {
					me.parent('a').attr('disabled', true).addClass('moni-select-disabled');
				}else {
					me.parent('a').attr('disabled', false).removeClass('moni-select-disabled');
				}
				
				//修正显示文本
				me.prev().html(text);
			});
		}
	});
});
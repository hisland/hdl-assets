(function($){
	var  str_html = '<a class="ie7-select-box" href="#"><span></span></a>'
		,div_drop = $('<div class="ie7-select-drop"></div>')
		,target, g_div_select;

	//页面加载完成后放入dom
	$(function(){
		div_drop.appendTo('body');
	});

	div_drop.mouseover(function(e){
		if(e.target.tagName.toUpperCase() == 'A'){
			div_drop.children().removeClass('selected');
			$(e.target).addClass('selected').focus();
		}
	});

	div_drop.click(function(e){
		if(e.target.tagName.toUpperCase() == 'A'){
			if(div_drop.children().index(e.target) != target[0].selectedIndex){//点击的为不同的元素时,修改并触发select的change事件
				target[0].selectedIndex = div_drop.children().index(e.target);
				target.change();
			}
		}
		div_drop.hide();
		g_div_select.hide();
		e.preventDefault();
	});

	function divSelectClick(e){
			//设置下拉目标
			target = $(this).prev();

			//目标不可用时直接返回
			if(target.attr('disabled')){
				return false;
			}

			var  me = $(this)
				,top = this.offsetTop
				,left = this.offsetLeft
				,height = me.height()-2
				,width = me.width()-2
				,list = target.children().map(function(){
											return '<a href=""' + (this.selected ? ' class="selected"' : '') + ' data="'+ this.value +'">'+ this.innerHTML +'</a>';
										}).get().join('');
			div_drop.html(list).css({left:left, top:top+height+7}).show();
			div_drop.width() <= width ? div_drop.width(width) : div_drop.width('auto');//设置最小宽度为select的宽度
			div_drop.height() > 300 ? div_drop.height(300) : div_drop.height('auto');//最高300px

			$(document).click(documentClick);

			//阻止默认动作
			e.preventDefault();
		}

	function documentClick(e){
		if(!($(e.target).closest('.ie7-select-drop, .ie7-select-box').length)){
			div_drop.empty().hide();
			$(document).unbind('click', documentClick);
		}
	}

	function selectMouseover(e){
		var me = $(this), div_select = me.next();
		fixPos(me, div_select);
	}
	function divSelectMouseover(e){
		var me = $(this), select = me.prev();
		fixPos(select, me);
	}
	function fixPos(select, div_select){
		var  top = select[0].offsetTop
			,left = select[0].offsetLeft
			,multi = $.browser.msie ? 4 : 2
			,width = select.width() + multi -20
			,height = select.height() + multi - 4;
		div_select.css({width:width, height:height, top:top, left:left});
	}


	$.fn.ie7Select = function(){
		return this.each(function(){
			//如果已经注册过,就不再注册了
			if(this.has_ie7_select){
				return;
			}
			this.has_ie7_select = true;

			var  me = $(this)
				,div_select = $(str_html)
				,top = this.offsetTop
				,left = this.offsetLeft
				,multi = $.browser.msie ? 4 : 2
				,width = me.width()+multi-23
				,height = me.height()+multi-4;

			div_select.css({width:width, height:height, top:top, left:left});
			me.after(div_select);

			if(/*@cc_on!@*/!1 && /msie 6.0/i.test(navigator.userAgent)){
				div_select.hide();
				me.mouseover(function(e){
					$(this).css('visibility', 'hidden');
					div_select.show();
					div_select.find('span').html(me.find(':selected').html());
					g_div_select = div_select;
				});
				div_select.mouseout(function(){
					div_select.hide();
					me.css('visibility', '');
				});
				div_select.click(divSelectClick);

			}else{
				div_select.fadeTo(0, 0);
				div_select.click(divSelectClick).mouseover(divSelectMouseover);
				me.mouseover(selectMouseover);
			}
		});
	}
})(jQuery);
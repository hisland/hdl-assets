(function($){
	//已经有了此函数则不用重复注册了
	if($.fn.hdlDropSelect){
		return false;
	}

	function hdlDropSelect(){

		var target;
		var div_drop = $('<div class="ie67_select_drop"></div>');
		var css = $('<style type="text/css">.ie67_select_box{filter:alpha(opacity=0);position:absolute;background:#fff;border:1px solid #7f9db9;overflow:hidden;}.ie67_select_box img{position:absolute;top:0px;right:0px;height:100%;}.ie67_select_box span{cursor:default;white-space:nowrap;padding-left:2px;}.ie67_select_drop{position:absolute;border:1px solid #000;background:#fff;font-family:Arial;}.ie67_select_drop a{display:block;padding:1px 2px 0;text-decoration:none;color:#000;white-space:nowrap;}.ie67_select_drop a:hover{text-decoration:none;}.ie67_select_drop a.selected{background:#316ac5;color:#fff;}</style>');
		div_drop.appendTo('body').hide();
		css.appendTo('body');

		div_drop.mouseover(function(e){
			if(e.target.tagName.toUpperCase() == 'A'){
				div_drop.children().removeClass('selected');
				$(e.target).addClass('selected').focus();
			}
		});

		div_drop.click(function(e){
			if(e.target.tagName.toUpperCase() == 'A'){
				if(div_drop.children().index(e.target) != target.selectedIndex){//点击的为不同的元素时,修改并触发select的change事件
					target.selectedIndex = div_drop.children().index(e.target);
					target.instead_span.html(e.target.innerHTML);
					target.instead_span.attr('title', e.target.innerHTML);
					$(target).change();
				}
			}
			div_drop.hide();
			return false;
		});

		//其它地方点击关闭这个层
		$(document).click(function(e){
			div_drop.hide();
		});

		return this.each(function(){
			//如果已经注册过,就不再注册了
			if(this.has_ie67_select){
				return;
			}
			this.has_ie67_select = true;

			var me = $(this);
			var div_select = $('<div class="ie67_select_box"><img src="'+img1+'" /><span></span></div>');
			var top = this.offsetTop;
			var left = this.offsetLeft;
			var width = $.browser.msie ? me.width()+2 : me.width();
			var height = $.browser.msie ? me.height()+2 : me.height();
			div_select.css({width:width, height:height, top:top, left:left, 'line-height':height+'px'});
			me.after(div_select);
			this.instead_span = div_select.find('span');
			this.instead_span.html(me.find(':selected').html());
			me.css('visibility','hidden');

			div_select.click(function(e){
				target = me[0];//设置下拉目标
				var top = this.offsetTop;
				var left = this.offsetLeft;
				var height = $.browser.msie ? me.height()+2 : me.height();
				var width = $.browser.msie ? me.width()+2 : me.width();
				var list = me.children().map(function(){
					return '<a href=""' + (this.selected ? ' class="selected"' : '') + ' data="'+ this.value +'">'+ this.innerHTML +'</a>';
				}).get().join('');
				div_drop.html(list).css({left:left, top:top+height+3}).show();//初始显示IE会没有边框,在下面第3行再设置一次就有了
				div_drop.width() <= width ? div_drop.width(width) : div_drop.width('auto');//设置最小宽度为select的宽度
				div_drop.hide();
				div_drop.show().find('.selected').focus();

				return false;//阻止事件冒泡
			});

			//鼠标切换模拟的下拉的显示状态
			div_select.mouseover(function(e){
				div_select.find('img').attr('src', img2);
			}).mouseout(function(e){
				div_select.find('img').attr('src', img1);
			});
		})
	}

	//注册到jq的原型上
	$.fn.hdlDropSelect = hdlDropSelect;
})(jQuery);
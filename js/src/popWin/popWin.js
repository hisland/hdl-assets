/**********************************************************************************************
 * 名称: 弹出窗口
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-17 16:28:10
 */

KISSY.add('popWin', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,html_string = '<div class="win1-wrap"><div class="win1-title-wrap"><span class="win1-title"></span><a class="win1-close" href="#"></a></div><div class="win1-content"></div><div class="win1-btns"><input class="win1-btn-ok" type="button" value="确定" /><input class="win1-btn-cancle" type="button" value="取消" /></div></div>'
		,popWin = {};
	
	popWin.divs = EMPTY_$;
	popWin.init = function(){
		return new init();
	}
	popWin.clean = function(){
		popManager.clean();
	}

	function init(){
		var self = this;
		this.div = $(html_string);
		popWin.divs = popWin.divs.add(this.div);
		this.close = this.div.find('a.win1-close');
		this.title = this.div.find('span.win1-title');
		this.content = this.div.find('div.win1-content');
		this.btn_ok = this.div.find('input.win1-btn-ok');
		this.btn_cancle = this.div.find('input.win1-btn-cancle');
		this.close_able = true;

		this.mask = $.mask.init();
		this.manager = popManager.init();
		this.manager.div.append(this.mask.div.show()).append(this.div).hide().appendTo('body');
		this.div.width(500);
		this.div.hdlDrag();

		this.close.add(this.btn_cancle).click(function(e){
			self.hide();
			e.preventDefault();
		}).mousedown(function(e){
			return false;
		});

		this.content.mousedown(function(e){
			e.stopPropagation();
		});

	}
	init.prototype.show = function(){
		this.manager.div.show();
		this.div.css({
			 top: (document.documentElement.clientHeight-this.div.height())/2
			,left:(document.documentElement.clientWidth-this.div.width())/2
		});
	}
	init.prototype.hide = function(){
		if(this.close_able){
			this.manager.div.hide();
		}
	}
	init.prototype.remove = function(){
		this.manager.div.remove();
	}

	$.popWin = popWin;
}, {
	requires: ['popManager', 'hdlDrag']
});
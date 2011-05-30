/**********************************************************************************************
 * 名称: 弹出窗口
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-17 16:28:10
 * 
 * API:
 * 		$.popWin.clean() 清除所有的弹出层
 * 
 * 		var p = $.popWin.init() 初始化一个弹出层
 * 		p.front() 将此层放到最前面
 * 		p.mask() 使用遮罩
 * 		p.mask(false) 去除遮罩
 * 		p.remove() 删除此层
 * 
 * 		p.div 最外层元素的jquery对象
 * 		p.show() 显示弹出窗口
 * 		p.hide() 隐藏弹出窗口
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
		$.popManager.clean();
	}

	function init(){
		var  self = this
			,div = $(html_string);

		//保存到全局
		popWin.divs = popWin.divs.add(div);

		//设置属性
		self.div = div;
		self.close = div.find('a.win1-close');
		self.title = div.find('span.win1-title');
		self.content = div.find('div.win1-content');
		self.btn_ok = div.find('input.win1-btn-ok');
		self.btn_cancle = div.find('input.win1-btn-cancle');
		self.close_able = true;

		self.manager = $.popManager.init().mask();
		self.manager.div.append(div).appendTo('body');
		self.div.width(400);
		self.div.hdlDrag();

		//设置关闭按钮
		self.close.add(self.btn_cancle).click(function(e){
			self.hide();
			e.preventDefault();
		})

		//设置不能拖动的内容
		self.content.add(self.close).add(self.btn_ok).add(self.btn_cancle).mousedown(function(e){
			e.stopPropagation();
		});
	}

	$.extend(init.prototype, {
		 front: function(){
			this.manager.front();
			return this;
		}
		,mask: function(use){
			this.manager.mask(use);
			return this;
		}
		,show: function(){
			this.manager.div.show();
			this.div.css({
				 top: (document.documentElement.clientHeight-this.div.height())/2
				,left:(document.documentElement.clientWidth-this.div.width())/2
			});
			return this;
		}
		,hide: function(){
			if(this.close_able){
				this.manager.div.hide();
			}
			return this;
		}
		,remove: function(){
			this.manager.div.remove();
			return this;
		}
	});

	$.extend({
		popWin: popWin
	});
}, {
	requires: ['jquery-1.4.2', 'popManager', 'hdlDrag']
});
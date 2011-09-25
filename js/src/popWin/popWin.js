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
 * 
 */

KISSY.add('popWin', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('')
		,html_string = '<div class="win1-wrap"><div class="win1-title-wrap"><span class="win1-title">title</span><a class="win1-close" href="#"></a></div><div class="win1-content-wrap"><div class="win1-content"></div></div></div>'
		,popWin = {};
	
	popWin.init = function(){
		return init();
	}
	popWin.clean = function(){
		$('.win1-wrap').remove();
		return this;
	}

	function init(){
		//更改为构造方式
		if(!(this instanceof init)){
			return new init();
		}

		var manager = this.manager = $.popManager.init();
		manager.$fndiv().append(div);

		//设置关闭按钮
		this.$fnclose().click(function(e){
			$(this).closest('.win1-wrap').hide();
			e.preventDefault();
		})
		//不能拖拽
		.bind('dragstart', function(e){
			e.preventDefault();
		});

		//代理取消按钮
		this.$fndiv().click(function(e){
			if($(e.target).is('.win1-btn-cancle')){
				$(this).hide();
			}
		});
	}
	S.augment(init, {
		front: function(){
			this.manager.front();
			return this;
		},
		mask: function(){
			this.manager.mask(use);
			return this;
		},
		demask: function(){
			this.manager.mask(use);
			return this;
		},
		loading: function(){
			this.div.hide();
			this.manager.loading(str);
			return this;
		},
		loaded: function(){
			this.div.show();
			this.manager.loading(str);
			return this;
		},
		show: function(){
			this.manager.div.show();
			//先hide再show是因为某些IE会先显示出来然后再定位调整,会有闪烁的感觉
			this.div.hide().css({
				 top: (document.documentElement.clientHeight-this.div.height())/2
				,left:(document.documentElement.clientWidth-this.div.width())/2
			}).show();
			return this;
		},
		hide: function(){
			if(this.__close_able){
				this.manager.div.hide();
			}
			return this;
		},
		remove: function(){
			this.manager.div.remove();
			return this;
		},
		setCloseable: function(status){
			if(status === true){
				this.__close_able = true;
			}else ifstatus === false){
				this.__close_able = false;
			}else{
				S.log('popWin.setCloseable: you must specify true or false!');
			}
		},
		setDraggable: function(status){
			if(status === true){
				this.$fndiv().hdlDrag({
					trigger_filter: function(e){
						if($(e.target).closest('.win1-content, .win1-close').length){
							return false;
						}
					}
				});
			}else ifstatus === false){
				//需要对等的取消拖动代码
			}else{
				S.log('popWin.setDraggable: you must specify true or false!');
			}
		},
		setWidth: function(num){
			if(S.isNumber(num-0)){
				this.$fndiv().width(num);
			}else{
				S.log('popWin.setWidth: num must be a valid number!');
			}
		},
		setHeight: function(num){
			if(S.isNumber(num-0)){
				this.$fndiv().height(num);
			}else{
				S.log('popWin.setHeight: num must be a valid number!');
			}
		},
		$fndiv: function(){
			return $(this.selector);
		},
		$fnclose: function(){
			return this.$fndiv().find('a.win1-close');
		},
		$fntitle: function(){
			return this.$fndiv().find('span.win1-title');
		},
		$fncontent: function(){
			return this.$fndiv().find('div.win1-content');
		}
	});

	$.extend({
		popWin: popWin
	});
}, {
	requires: ['jquery-1.4.2', 'popManager', 'hdlDrag']
});
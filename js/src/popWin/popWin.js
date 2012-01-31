/**
 * @fileOverview
 * @module popManager
 * @author hisland hisland@qq.com
 * @description 弹出窗口
 * <pre><code>
 * API:
 * 		$.popWin.clean() 清除所有的弹出层
 * 
 * 		var p = $.popWin.init() 初始化一个弹出层
 * 		p.front() 将此层放到最前面
 * 		p.mask() 使用遮罩
 * 		p.demask() 去除遮罩
 * 		p.remove() 删除此层
 * 		p.show() 显示弹出窗口
 * 		p.hide() 隐藏弹出窗口
 * 
 * 		p.$div 最外层元素
 * 		p.$close 右上关闭X
 * 		p.$title 标题层
 * 		p.$content 内容层
 * 		p.manager 弹出管理对象
 * </code></pre>
 */

KISSY.add('popWin', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $(''),
		html_string = '<div class="win1-wrap"><div class="win1-title-wrap"><span class="win1-title">title</span><a class="win1-close" href="#"></a></div><div class="win1-content-wrap"><div class="win1-content"></div></div></div>',
		/**
		 * 弹出窗口命名空间
		 * @namespace popWin
		 */
		popWin = {},
		default_width = 400;
	
	/**
	 * 清除所有的popWin
	 * @return popWin
	 */
	popWin.clean = function(){
		$('div.win1-wrap').parent().remove();
		return this;
	}

	/**
	 * 初始化一个popWin
	 */
	popWin.init = function(){
		return new init();
	}

	function init(){
		var div = $(html_string);

		/**
		 * @lends popWin#
		 */
		S.mix(this, {
			/**
			 * popWin的包含层
			 * @type jQuery
			 */
			$div: div,
			/**
			 * popWin右上角的关闭X
			 * @type jQuery
			 */
			$close: div.find('a.win1-close'),
			/**
			 * popWin的标题层
			 * @type jQuery
			 */
			$title: div.find('span.win1-title'),
			/**
			 * popWin的内容层
			 * @type jQuery
			 */
			$content: div.find('div.win1-content'),
			/**
			 * popWin所在的popManager实例
			 * @type popManager
			 */
			manager: $.popManager.init(),
			__close_able: true
		});

		this.manager.$div.append(div);

		//默认宽高
		this.setWidth(default_width);

		//设置关闭按钮
		this.$close.click(function(e){
			$(this).closest('.win1-wrap').parent().hide();
			e.preventDefault();
		})
		//不能拖拽
		.bind('dragstart', function(e){
			e.preventDefault();
		});

		//代理取消按钮
		div.click(function(e){
			if($(e.target).is('.win1-btn-cancel')){
				$(this).parent().hide();
			}
		});

		//拖动初始化
		div.hdlDrag({
			trigger_filter: function(e){
				//在IE下,内部有disabled的input时,点击input文本会导致e.target.parentNode为undefined, 前一个规则值为false,所以需要||单独处理
				if($(e.target).closest('.win1-content, .win1-close').length || !e.target.parentNode){
					return false;
				}
			}
		});
	}

	/**
	 * @lends popWin#
	 */
	S.augment(init, {
		/**
		 * 增加z-index放到最前
		 * @return this
		 */
		front: function(){
			this.manager.front();
			return this;
		},
		/**
		 * 显示manager的遮罩层
		 * @return this
		 */
		mask: function(){
			this.manager.mask();
			return this;
		},
		/**
		 * 隐藏manager的遮罩层
		 * @return this
		 */
		demask: function(){
			this.manager.demask();
			return this;
		},
		/**
		 * 显示loading状态,隐藏内容层
		 * @return this
		 */
		loading: function(){
			this.$div.hide();
			this.manager.loading();
			return this;
		},
		/**
		 * 隐藏loading状态,显示内容层
		 * @return this
		 */
		loaded: function(){
			this.$div.show();
			this.manager.loaded();
			return this;
		},
		/**
		 * 显示, 会同时强制manager显示
		 * @return this
		 */
		show: function(){
			this.manager.show();
			//某些IE会先显示出来然后再定位调整,会有闪烁的感觉, 定位完成后再显示出来
			this.$div.css('visibility', 'hidden').show().css({
				top: (document.documentElement.clientHeight - this.$div.height())/2,
				left:(document.documentElement.clientWidth - this.$div.width())/2,
				visibility: ''
			});
			return this;
		},
		/**
		 * 隐藏最外层
		 * @return this
		 */
		hide: function(){
			if(this.__close_able){
				this.manager.hide();
			}
			return this;
		},
		/**
		 * 从DOM中删除
		 * @return this
		 */
		remove: function(){
			this.manager.remove();
			return this;
		},
		/**
		 * 是否可被关闭
		 * @param {boolean} status true|false
		 * @return this
		 */
		setCloseable: function(status){
			if(S.isBoolean(status)){
				this.__close_able = status;
				if(status){
					this.$close.add(this.$div.find('.win1-btn-cancel')).show();
				}else{
					this.$close.add(this.$div.find('.win1-btn-cancel')).hide();
				}
			}else{
				S.log('popWin.setCloseable: status must be true or false!');
			}
			return this;
		},
		/**
		 * 是否可被拖动
		 * @param {boolean} status true|false
		 * @return this
		 */
		setDraggable: function(status){
			if(S.isBoolean(status)){
				this.$div.hdlDrag({enable: status});
			}else{
				S.log('popWin.setDraggable: status must be true or false!');
			}
			return this;
		},
		/**
		 * 设置宽度, 会减掉边距, 实际比设置的要小
		 * @param {number} num
		 * @return this
		 */
		setWidth: function(num){
			if(S.isNumber(num-0)){
				this.$title.width(num-35);
				this.$content.width(num-18);
			}else{
				S.log('popWin.setWidth: num must be a valid number!');
			}
			return this;
		},
		/**
		 * 设置内容宽度
		 * @param {number} num
		 * @return this
		 */
		setInnerWidth: function(num){
			if(S.isNumber(num-0)){
				this.$title.width(num-17);
				this.$content.width(num);
			}else{
				S.log('popWin.setWidth: num must be a valid number!');
			}
			return this;
		},
		/**
		 * 设置内容高度
		 * @param {number} num
		 * @return this
		 */
		setHeight: function(num){
			if(S.isNumber(num-0)){
				this.$content.height(num);
			}else{
				S.log('popWin.setHeight: num must be a valid number!');
			}
			return this;
		},
		/**
		 * 设置标题
		 * @param {string} str
		 * @return this
		 */
		setTitle: function(str){
			this.$title.html(str);
			return this;
		}
	});

	$.extend({
		popWin: popWin
	});
}, {
	requires: ['jquery-1.4.2', 'popManager', 'hdlDrag']
});
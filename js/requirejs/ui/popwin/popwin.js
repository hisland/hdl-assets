/**
 * 弹出层管理工具 - 统一控制层级,遮罩
 * <pre><code>
 * API:
 * 		$.popManager.clean(true) 清除所有的弹出层包含块, 包括.not-remove的div
 * 		$.popManager.clean() 清除所有的弹出层包含块, 不会清除含.not-remove的div
 * 
 * 		p = $.popManager.init() 初始化一个弹出层包含块
 * 		p.front() 将此层放到最前面
 * 		p.show() 显示
 * 		p.hide() 隐藏
 * 		p.mask() 使用遮罩
 * 		p.demask() 去除遮罩
 * 		p.loading() 显示loading状态
 * 		p.loaded() 去除loading状态
 * 		p.remove() 删除此层
 * 
 * 		p.$div 最外层元素
 * 		p.$mask 遮罩元素 - css3使用的半透明背景,无此属性
 * 
 * TODO:
 * 		2011-08-09 09:15:49
 * 			IE6的内存泄露问题
 * 		2011-09-16 18:56:51
 * 			ESC隐藏控制
 * 		2012-01-16 11:18:21
 * 			弹出层需要禁止焦点跑到层后面去
 * </code></pre>
 */
define(['jquery', 'kissy', './msg', 'ui/pop-manager', 'jquery-plugin', 'css!./popwin'], function($, S, MSG, PM){
	var $EMPTY = $(''),
		html_string = '<div class="popwin-wrap"><div class="popwin-title-wrap"><span class="popwin-title">title</span><a class="popwin-close" href="#"></a></div><div class="popwin-content-wrap"><div class="popwin-content"></div></div></div>',
		button_string = '<div class="popwin-btns"><input class="button4" type="button" name="" value="确定" /></div>',
		default_width = 400;

	/**
	 * 弹出层包含块
	 * @class
	 * @memberOf ui
	 */
	function Popwin(){
		var div = $(html_string);

		/**
		 * @lends ui.Popwin#
		 */
		S.mix(this, {
			/**
			 * Popwin的包含层
			 * @type jQuery
			 */
			$div: div,
			/**
			 * Popwin右上角的关闭X
			 * @type jQuery
			 */
			$close: div.find('a.popwin-close'),
			/**
			 * Popwin的标题层
			 * @type jQuery
			 */
			$title: div.find('span.popwin-title'),
			/**
			 * Popwin的内容层
			 * @type jQuery
			 */
			$content: div.find('div.popwin-content'),
			/**
			 * Popwin所在的popManager实例
			 * @type popManager
			 */
			manager: PM.init(),
			/**
			 * Popwin可否关闭
			 * @private
			 * @type popManager
			 */
			__close_able: true,
			/**
			 * 右上角x的作用是关闭还是移除
			 * @default close
			 * @type String close|remove
			 */
			close_action: 'close',
			/**
			 * 默认是否初始化下面的按钮
			 * @type Boolean
			 */
			use_button: true
		});

		this.manager.$div.append(div);

		//默认宽高
		this.setWidth(default_width);

		//设置关闭按钮
		this.$close.on('click', this, function(e){
			e.data.manager.hide();
			e.preventDefault();
		})
		//不能拖拽
		.bind('dragstart', function(e){
			e.preventDefault();
		});

		//代理取消按钮, 关闭层
		div.on('click', '.popwin-cancel', this, function(e){
			e.data.manager.hide();
		});

		//代理确定按钮, 触发内容form的submit事件
		div.on('click', '.popwin-ok', this, function(e){
			e.data.$content.submit();
		});

		//拖动初始化
		div.hdlDrag({
			trigger_filter: function(e){
				//在IE下,内部有disabled的input时,点击input文本会导致e.target.parentNode为undefined, 前一个规则值为false,所以需要||单独处理
				if($(e.target).closest('.popwin-content, .popwin-close').length || !e.target.parentNode){
					return false;
				}
			}
		});
	}

	/**
	 * @lends Popwin#
	 */
	S.augment(Popwin, {
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
		 * @param status true|false
		 * @return this
		 */
		setCloseable: function(status){
			if(S.isBoolean(status)){
				this.__close_able = status;
				if(status){
					this.$close.add(this.$div.find('.popwin-btn-cancel')).show();
				}else{
					this.$close.add(this.$div.find('.popwin-btn-cancel')).hide();
				}
			}
			return this;
		},
		/**
		 * 是否可被拖动
		 * @param status true|false
		 * @return this
		 */
		setDraggable: function(status){
			if(S.isBoolean(status)){
				this.$div.hdlDrag({enable: status});
			}
			return this;
		},
		/**
		 * 设置宽度, 会减掉边距, 实际比设置的要小
		 * @param num Int
		 * @return this
		 */
		setWidth: function(num){
			if(S.isNumber(num-0)){
				this.$title.width(num-30);
				this.$content.width(num-2);
			}
			return this;
		},
		/**
		 * 设置内容宽度
		 * @param num Int
		 * @return this
		 */
		setInnerWidth: function(num){
			if(S.isNumber(num-0)){
				this.$title.width(num-28);
				this.$content.width(num);
			}
			return this;
		},
		/**
		 * 设置内容高度
		 * @param num Int
		 * @return this
		 */
		setHeight: function(num){
			if(S.isNumber(num-0)){
				this.$content.height(num);
			}
			return this;
		},
		/**
		 * 设置标题
		 * @param str String
		 * @return this
		 */
		setTitle: function(str){
			this.$title.html(str);
			return this;
		},
		/**
		 * 增加按钮
		 * @param setting Object
		 * @return this
		 */
		addButton: function(setting){
			return this;
		}
	});

	return Popwin;
});
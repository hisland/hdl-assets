/**
 * 
 */

define(['jquery', 'kissy', 'jquery-plugin', 'css!./popup'], function($, S){
	var ie = /*@cc_on!@*/!1;

	/**
	 * @class
	 * @memberOf ui
	 */
	function Popup(){
		this.__init();
	}

	/**
	 * @lends ui.Popup#
	 */
	S.augment(Popup, {
		/**
		 * 初始化
		 * @private
		 */
		__init: function(div){
			if(ie){
				div = $('<div class="popup-img"><div class="popup-arr-u"></div><div class="popup-img-hl"><div class="popup-img-hr"><div class="popup-img-ht"></div></div></div><div class="popup-content-wrap"><div class="popup-content"></div></div><div class="popup-img-bl"><div class="popup-img-br"><div class="popup-img-bb"></div></div></div></div>');
			}else{
				div = $('<div class="popup-css3"><div class="popup-arr-u"></div><div class="popup-content"></div></div>');
			}

			S.mix(this, {
				$div: div,
				$content: div.find('.popup-content'),
				$arr: div.find('.popup-arr-u'),
				dir: 'up'
			});

			div.appendTo('body');

			return this;
		},
		/**
		 * 设置内容
		 * @param content jQuery|DOM|string
		 * @return this
		 */
		setContent: function(content){
			this.$content.html(content);
			return this;
		},
		/**
		 * 设置箭头方向
		 * @param dir up|right|down|left|[Any Other] 设置箭头方向
		 * @param num Number|String 将调用moveArrow方法进行初始偏移
		 * @return this
		 */
		setDir: function(dir, num){
			this.dir = dir;
			this.$arr.css({
				display: 'block',
				left: '',
				top: ''
			});

			switch(dir){
				case 'up':
					this.$arr.attr('class', 'popup-arr-u');
					break;
				case 'right':
					this.$arr.attr('class', 'popup-arr-r');
					break;
				case 'down':
					this.$arr.attr('class', 'popup-arr-d');
					break;
				case 'left':
					this.$arr.attr('class', 'popup-arr-l');
					break;
				default:
					this.dir = null;
					this.$arr.css('display', 'none');
			}

			this.moveArrow(num);
			return this;
		},
		/**
		 * 移动箭头
		 * 为数字时: 设置为指定位置
		 * 为字符串时: 设置偏移如 '-=10' '+=20'
		 * @param num Number|String
		 * @return this
		 */
		moveArrow: function(num){
			switch(this.dir){
				case 'up':
				case 'down':
					this.$arr.css('left',  num);
					break;
				case 'right':
				case 'left':
					this.$arr.css('top', num);
					break;
			}
			return this;
		},
		/**
		 * 设置边线和背景色, 只在标准浏览器下有效果
		 * @param color color-string
		 * @param bg color-string
		 * @return this
		 */
		setTheme: function(border, bg){
			this.$div.add(this.$arr).css({
				'border-color': border,
				'background': bg
			});
			return this;
		},
		/**
		 * 设置内容宽度
		 * @param width Number
		 * @return this
		 */
		setWidth: function(width){
			if(ie){
				this.$content.width(width);
				this.$div.width(width + 12);
			}else{
				this.$content.width(width);
			}
			return this;
		},
		/**
		 * 设置内容高度
		 * @param height Number
		 * @return this
		 */
		setHeight: function(height){
			if(ie){
				this.$content.height(height);
				this.$div.height(height + 12);
			}else{
				this.$content.height(height);
			}
			return this;
		},
		/**
		 * 设置内容尺寸,含宽高
		 * @param width Number
		 * @param height Number
		 * @return this
		 */
		setSize: function(width, height){
			if(ie){
				this.$content.height(height).width(width);
				this.$div.height(height + 12).width(width + 12);
			}else{
				this.$content.height(height).width(width);
			}
			return this;
		},
		/**
		 * 对齐某元素显示
		 * @param target jQuery|DOM|string
		 * @param position up|right|down|left
		 * @param callback Function
		 * @return this
		 */
		align: function(target, position, callback){
			var me = this;

			//修正参数
			if(S.isFunction(position)){
				callback = position;
				position = null;
			}
			position = position || 'down';

			//对齐后设置箭头方向
			this.$div.align({
				target: target,
				position: position,
				callback: function(position){
					switch(position){
						case 'up':
							me.setDir('down').$div.css('top', '-=5');
							break;
						case 'right':
							me.setDir('left').$div.css('left', '+=5');
							break;
						case 'down':
							me.setDir('up').$div.css('top', '+=5');
							break;
						case 'left':
							me.setDir('right').$div.css('left', '-=5');
							break;
					}

					//完成后回调
					S.isFunction(callback) && callback.call(me, position);
				}
			});

			return this;
		},
		/**
		 * 显示
		 * @return this
		 */
		show: function(){
			this.$div.css('z-index', S.guid()).show();
			return this;
		},
		/**
		 * 隐藏
		 * @return this
		 */
		hide: function(){
			this.$div.hide();
			return this;
		}
	});

	return Popup;
});
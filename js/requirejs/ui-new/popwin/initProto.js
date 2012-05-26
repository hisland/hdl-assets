define(['jquery', 'kissy'], function($, S){
	/**
	 * @lends ui.Popwin#
	 */
	var Proto = {
		/**
		 * 增加z-index放到最前
		 * @return this
		 */
		front: function(){
			this.config.manager.front();
			return this;
		},
		/**
		 * 显示manager的遮罩层
		 * @return this
		 */
		mask: function(){
			this.config.manager.mask();
			return this;
		},
		/**
		 * 隐藏manager的遮罩层
		 * @return this
		 */
		demask: function(){
			this.config.manager.demask();
			return this;
		},
		/**
		 * 显示loading状态,隐藏内容层
		 * @return this
		 */
		loading: function(){
			this.$div.css('display', 'none');
			this.config.manager.loading();
			return this;
		},
		/**
		 * 隐藏loading状态,显示内容层
		 * @return this
		 */
		loaded: function(){
			this.$div.css('display', 'block');
			this.config.manager.loaded();
			return this;
		},
		/**
		 * 将弹出层居中
		 * @return this
		 */
		center: function(){
			this.$div.css({
				top: (document.documentElement.clientHeight - this.$div.height())/2,
				left: (document.documentElement.clientWidth - this.$div.width())/2
			});
			return this;
		},
		/**
		 * 显示, 会同时强制manager显示
		 * @return this
		 */
		show: function(){
			this.config.manager.show();
			//某些IE会先显示出来然后再定位调整,会有闪烁的感觉, 定位完成后再显示出来
			this.$div.css('visibility', 'hidden').css('display', 'block');
			this.center();
			this.$div.css('visibility', '');
			return this;
		},
		/**
		 * 隐藏最外层
		 * @return this
		 */
		hide: function(){
			if(this.config.closeAble){
				if(this.config.hideAction === 'hide'){
					this.config.manager.hide();
				}else{
					this.remove();
				}
			}
			return this;
		},
		/**
		 * 从DOM中删除
		 * @return this
		 */
		remove: function(){
			this.config.manager.remove();
			return this;
		},
		/**
		 * 是否可被关闭
		 * @param status true|false
		 * @return this
		 */
		setCloseable: function(status){
			if(S.isBoolean(status)){
				this.config.closeAble = status;
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
		 * 设置内容宽度
		 * @param num Int
		 * @return this
		 */
		setWidth: function(num){
			this.$content.width(num);
			return this;
		},
		/**
		 * 设置内容高度
		 * @param num Int
		 * @return this
		 */
		setHeight: function(num){
			this.$content.height(num);
			return this;
		},
		/**
		 * 设置内容宽高
		 * @param width Int
		 * @param height Int
		 * @return this
		 */
		setSize: function(width, height){
			return this.setWidth(width).setHeight(height);
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
		 * 设置此实例会不会被clean清除
		 * @param 
		 * @return 
		 */
		notremove: function(state){
			this.config.manager.notremove(state);
		}
	};

	return function(o){
		S.mix(o, Proto);
		return o;
	};
});
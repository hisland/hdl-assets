/**
 * 
 */

define(['jquery', 'kissy', 'sf/page', 'css!./menu'], function($, S, Page){
	function Menu(){
		this.__init().__initEvent();
	}

	S.augment(Menu, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__init: function(){
			var div = $('<div class="menu-now"><p>系统通信告警</p></div><div class="menu-search"><p><input type="text" name="" value="" placeholder="搜索" /></p></div><div class="menu-wrap"></div>');
			this.$div = div;
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		__initEvent: function(){
			//菜单折叠
			this.$div.on('click', '.menu-lv1>p', function(e){
				$(this).parent().next().toggle();
			});

			//菜单点击, 加载页面
			this.$div.on('click', 'a', this, function(e){
				Page.loadUrl($(this).attr('href'));
				e.data.setNow($(this).text());
			});
			return this;
		},
		/**
		 * 设置菜单数据
		 * @param data Array
		 * @return this
		 */
		setData: function(data){
			var buff = [], menu = this;
			
			//生成1级结构
			S.each(data, function(v, i, o){
				buff.push('<div class="menu-lv1">');
				buff.push('<p class="menu-lv1-icon', i+1, '">');
				buff.push(v.text);
				buff.push('</p>');
				buff.push('</div>');
				buff.push('<div class="menu-sub-wrap">');
				menu.makeSubMenu(buff, v.children);
				buff.push('</div>');
			});
			this.$div.filter('.menu-wrap').html(buff.join(''));

			//修正高度
			$(window).resize();

			//保存菜单数据
			this.data = data;
			return this;
		},
		/**
		 * 生成2级以下结构, 用于递归
		 * @param buff Array
		 * @param data Array
		 * @return this
		 */
		makeSubMenu: function(buff, data){
			var menu = this;
			S.each(data, function(v, i, o){
				if(v.children){
					buff.push('<div class="menu-lv2">');
					buff.push('<a hidefocus="true">');
					buff.push(v.text);
					buff.push('</a>');
					buff.push('</div>');
					buff.push('<div class="menu-sub-wrap">');
					buff.push(menu.makeSubMenu(buff, v.children));
					buff.push('</div>');
				}else{
					buff.push('<div class="menu-lv2">');
					buff.push('<a href="', v.url, '" hidefocus="true">');
					buff.push(v.text);
					buff.push('</a>');
					buff.push('</div>');
				}
			});
			return this;
		},
		/**
		 * @param str String
		 * @return Array
		 */
		search: function(str){
			return [];
		},
		/**
		 * 设置当前菜单的文字
		 * @param str String
		 * @return this
		 */
		setNow: function(str){
			this.$div.filter('.menu-now').find('p').html(str);
			return this;
		}
	});

	return Menu;
});
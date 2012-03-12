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
			var div = $('<div class="menu-now"><p>系统通信告警</p></div><div class="menu-search"><p><input type="text" name="" value="" placeholder="搜索" /></p></div><div class="menu-wrap"><div class="menu-lv1"><p class="menu-lv1-icon1">常用菜单</p></div><div class="menu-lv1"><p class="menu-lv1-icon2">用户管理</p></div><div class="menu-lv1"><p class="menu-lv1-icon3">系统管理</p></div><div class="menu-sub-wrap"><div class="menu-lv2"><a href="" hidefocus="true">运行状态管理</a></div><div class="menu-lv2"><a class="hover" href="" hidefocus="true">系统通信告警</a></div><div class="menu-lv2"><a href="" hidefocus="true">接口配置管理</a></div></div><div class="menu-lv1"><p class="menu-lv1-icon4">业务管理</p></div></div>');
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
				$(this).parent().next().toggle();;
			});

			//菜单点击, 加载页面
			this.$div.on('click', 'a', function(e){
				Page.loadUrl;
			});
			return this;
		},
		/**
		 * 
		 * @param data Array
		 * @return this
		 */
		setData: function(data){
			var buff = [], menu = this;
			
			//生成dom结构
			S.each(data, function(v, i, o){
				buff.push('<div class="menu-lv1">');
				buff.push('<p class="menu-lv1-icon', i+1, '">');
				buff.push(v.text);
				buff.push('</p>');
				buff.push('</div>');
				buff.push('<div class="menu-sub-wrap">');
				buff.push(menu.makeSubMenu(buff, v.children));
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
		 * 
		 * @param 
		 * @return 
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
		},
		/**
		 * @param str
		 * @return Array
		 */
		search: function(str){
			return [];
		}
	});

	return Menu;
});
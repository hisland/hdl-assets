/**
 * 
 */

define(['jquery', 'kissy', '../page/main', 'css!./menu'], function($, S, Page){
	function Menu(){
		this.__init().__initEvent();
	}

	S.augment(Menu, {
		/**
		 * 初始化div
		 * @return 
		 */
		__init: function(){
			var div = $('<div class="menu-wrap"></div>');
			this.$div = div;
			return this;
		},
		/**
		 * 初始化事件
		 * @return this
		 */
		__initEvent: function(){
			//1级菜单折叠
			this.$div.on('click', '.menu-lv1', function(e){
				var opened = !$(this).is('.menu-lv1-opened');
				$(this).toggleClass('menu-lv1-opened', opened);
				$(this).next('.menu-sub-wrap').toggle(opened);
			});
			//2级菜单折叠
			this.$div.on('click', '.menu-lv2', function(e){
				var opened = !$(this).is('.menu-lv2-opened');
				$(this).toggleClass('menu-lv2-opened', opened);
				$(this).next('.menu-sub-wrap').toggle(opened);
			});

			//菜单点击, 加载页面
			this.$div.on('click', 'a', this, function(e){

				Page.loadUrl(this.href);

				var list = [], p;

				list.push($(this).text());
				p = $(this).parent();

				while(!p.is('.menu-wrap')){
					list.push(p.prev().text());
					p = p.parent();
				}

				$('#uarehere').html(list.reverse().join(' &gt; '));

				e.data.$div.find('.menu-item-hover').removeClass('menu-item-hover');
				$(this).addClass('menu-item-hover');
			});
			return this;
		},
		/**
		 * 从指定url加载菜单
		 * @param url String
		 * @param fn Function
		 * @return this
		 */
		load: function(url, fn){
			var m = this;
			$.getJSON(url, function(rs){
				m.setData(rs.children);
				fn && fn();
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
				buff.push(v.text);
				buff.push('</div>');
				buff.push('<div class="menu-sub-wrap">');
				menu.makeSubMenu(buff, v.children);
				buff.push('</div>');
			});
			this.$div.html(buff.join(''));

			//修正高度
			$(window).resize();

			//保存菜单数据
			this.data = data;

			//加载已存在的菜单
			var now_link = this.$div.find('a[href="' + location.hash + '"], a[href="' + location.href + '"]').first();
			if(now_link.length){
				now_link.click();
				var p = now_link.parent();

				while(!p.is('.menu-wrap')){
					p.prev().click();
					p = p.parent();
				}
			}else{
				//加载欢迎页面
				Page.loadUrl('welcome.jsp');
			}
			
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
					buff.push(v.text);
					buff.push('</div>');
					buff.push('<div class="menu-sub-wrap">');
					menu.makeSubMenu(buff, v.children);
					buff.push('</div>');
				}else{
					buff.push('<a class="menu-item" href="' + v.url + '" hidefocus="true">' + v.text + '</a>')
				}
			});
			return this;
		},
		/**
		 * 菜单切换时触发的事件, 只执行一次
		 * @param fn Function
		 * @return this
		 */
		onChange: function(fn){
			$(this).on('change', fn);
			return this;
		}
	});

	return Menu;
});
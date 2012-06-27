/**
 * 
 */

define(['jquery', 'kissy', '../page/main', 'css!./menu'], function($, S, Page){
	//每次ajax请求都要向后台传送当前所在页面的moduleName, 即菜单名
	var moduleName;
	$.ajaxSetup({
		beforeSend: function(xhr, setting){
			if(setting.type === 'GET'){
				if(setting.url.indexOf('?') === -1){
					setting.url += '?moduleName=' + moduleName;
				}else{
					setting.url += '&moduleName=' + moduleName;
				}
			}else if(setting.type === 'POST'){
				if(setting.data){
					setting.data += '&moduleName=' + moduleName;
				}else{
					setting.data = 'moduleName=' + moduleName;
				}
			}
		}
	});


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

				//在load之前修改moduleName
				moduleName = encodeURI($(this).text());

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
				this.clickItem(now_link);
			}else{
				//加载欢迎页面
				if(this.welcomeUrl){
					Page.loadUrl(this.welcomeUrl);
				}
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
					buff.push('<a class="menu-item" href="' + v.url + '" hidefocus="true" ');
					if(v.prefix){
						buff.push('id="menu-' + v.prefix + '"');
					}else{
						buff.push('id="' + v.id + '"');
					}
					buff.push('>' + v.text + '</a>');
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
		},
		/**
		 * 设置欢迎菜单的url
		 * @param url String
		 * @return this
		 */
		setWelcomeUrl: function(url){
			this.welcomeUrl = url;
		},
		/**
		 * 模拟点击某个菜单,并展开其上层
		 * @param selector jQuery 菜单项对应的选择器或dom
		 * @return this
		 */
		clickItem: function(selector){
			var now_link =$(selector);
			now_link.click();

			location.href = now_link.attr('href');

			var p = now_link.parent();
			while(!p.is('.menu-wrap')){
				if(p.prev().is('.menu-lv1')){
					p.prev().toggleClass('menu-lv1-opened', true);
					p.show();
				}else{
					p.prev().toggleClass('menu-lv2-opened', true);
					p.show();
				}
				p = p.parent();
			}
			return this;
		}
	});

	return Menu;
});
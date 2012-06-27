/**
 * 
 */

define(['jquery', 'kissy', 'sf/page', 'css!./menu'], function($, S, Page){
	//每次ajax请求都要向后台传送当前所在页面的moduleName, 即菜单名
	var moduleName;
	$.ajaxSetup({
		beforeSend: function(xhr, setting){
			if(setting.type === 'GET'){
				if(setting.url.indexOf('?') === -1){
					setting.url += '?modelName=' + moduleName;
				}else{
					setting.url += '&modelName=' + moduleName;
				}
			}else if(setting.type === 'POST'){
				if(setting.data){
					setting.data += '&modelName=' + moduleName;
				}else{
					setting.data = 'modelName=' + moduleName;
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
			var div = $('<div class="menu-now"><p></p></div><div class="menu-search"><p><input class="menu-search-input" type="text" name="" value="" placeholder="搜索菜单" /></p></div><div class="menu-wrap"></div>');
			this.$div = div;
			return this;
		},
		/**
		 * 初始化事件
		 * @return this
		 */
		__initEvent: function(){
			//菜单折叠
			this.$div.on('click', '.menu-lv1>p', function(e){
				$(this).parent().next().toggle();
			});

			//菜单点击, 加载页面
			this.$div.on('click', 'a', this, function(e){

				//在load之前修改moduleName
				moduleName = encodeURI($(this).text());

				Page.loadUrl($(this).attr('href'));
				e.data.setNow($(this).text());

				e.data.$div.find('.hover').removeClass('hover');
				$(this).addClass('hover');
			});

			//查询菜单
			this.$div.on('input', '.menu-search-input', this, function(e){
				var list = [], val = $.trim(this.value);
				if(val){
					list = S.map(e.data.search(val), function(v, i, o){
						return '<div class="menu-lv2"><a hidefocus="true" href="' + v.url + '">' + v.text + '</a></div>';
					});
				}
				e.data.$div.find('.menu-search-hole').html(list.join('')).parent()[0].scrollTop = 0;
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
				m.setData(rs);
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
			var buff = ['<div class="menu-search-hole"></div>'], menu = this;
			
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

			//加载已存在的菜单
			try{
				var now_link = this.$div.filter('.menu-wrap').find('a[href="' + location.hash + '"], a[href="' + location.href + '"]').first();
				if(now_link.length){
					now_link.click();
				}else{
					Page.loadUrl('welcome.jsp');
				}
			}catch(e){}
			
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
					menu.makeSubMenu(buff, v.children);
					buff.push('</div>');
				}else{
					buff.push('<div class="menu-lv2">');
					buff.push('<a href="', v.url, '"');
					if (v.id) {
						buff.push(' id="', v.id, '"');
					}
					
					// 权限前缀放在菜单上
					if (v.privilegeCodes) {
						buff.push(' privilegecodes="', v.privilegeCodes, '"');
					}
					
					buff.push(' hidefocus="true">');
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
			var rs = [];
			function loop(arr){
				S.each(arr, function(v, i, o){
					if(v.children){
						loop(v.children);
					}else{
						if(v.text.toUpperCase().indexOf(str.toUpperCase()) !== -1){
							rs.push(v);
						}
					}
				});
			}
			loop(this.data);
			return rs;
		},
		/**
		 * 设置当前菜单的文字
		 * @param str String
		 * @return this
		 */
		setNow: function(str){
			this.$div.filter('.menu-now').find('p').html(str);
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
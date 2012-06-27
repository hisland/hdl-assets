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
			var div = $('<div class="menu-wrap"></div>');
			this.$div = div;
			return this;
		},
		/**
		 * 初始化事件
		 * @return this
		 */
		__initEvent: function(){
			//菜单折叠
			this.$div.on('click', '.menu-lv1', function(e){
				$(this).toggleClass('menu-lv1-selected').next().toggle();
				$(this).siblings('.menu-lv1-selected').removeClass('menu-lv1-selected').next().hide();
			});

			//菜单点击, 加载页面
			this.$div.on('click', 'a', this, function(e){

				//在load之前修改moduleName
				moduleName = encodeURI($(this).text());

				Page.loadUrl($(this).attr('href'));
				var list = [], p;

				list.push($(this).text());
				list.push($(this).parent().parent().prev().text());

				$('#uarehere').html(list.reverse().join(' &gt; '));

				e.data.$div.find('.menu-lv2-selected').removeClass('menu-lv2-selected');
				$(this).parent().addClass('menu-lv2-selected');
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
			var buff = [], menu = this;
			
			//生成1级结构
			S.each(data, function(v, i, o){
				buff.push('<div class="menu-lv1">');
				buff.push('<p class="menu-lv1-icon', i+1, '">');
				buff.push(v.text);
				buff.push('</p>');
				buff.push('</div>');
				buff.push('<div class="menu-sub-wrap" style="display:none;">');
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
				var now_link = this.$div.find('a[href="' + location.hash + '"], a[href="' + location.href + '"]').first();
				if(now_link.length){
					now_link.click();
					now_link.parent().parent().prev().click();
				}else{
					//加载欢迎页面
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
					buff.push(v.text);
					buff.push('</div>');
					buff.push('<div class="menu-sub-wrap" style="display:none;">');
					menu.makeSubMenu(buff, v.children);
					buff.push('</div>');
				}else{
					buff.push('<div class="menu-lv2">');
					buff.push('<a href="', v.url, '"');
					if (v.id) {
						buff.push(' id="', v.id, '"');
					}
					
					// TODO: 权限前缀放在菜单上
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
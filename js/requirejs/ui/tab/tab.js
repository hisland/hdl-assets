/**
 * 
 */

define(['jquery', 'kissy', 'css!./tab'], function($, S){
	var wrap = '<div class="ui-tab"><ul class="ui-tab-nav"></ul><div class="ui-tab-con"></div></div>',
		li = '<li><a href="javascript:;"><span></span></a></li>';

	/**
	 * @class
	 */
	function Tab(){
		this.__init().__initEvent();
	}

	/**
	 * @lends Tab#
	 */
	S.augment(Tab, {
		__init: function(){
			this.$div = $(wrap);
			this.$nav = this.$div.find('>ul.ui-tab-nav');
			this.$con = this.$div.find('>div.ui-tab-con');
			return this;
		},
		__initEvent: function(){
			//链接点击阻止默认动作
			this.$nav.on('click', 'a', function(e){
				this.blur();
				e.preventDefault();
			});

			this.$nav.on('click', 'li', this, function(e){
				var idx = $(this).index(),
					href = $(this).find('a').attr('href'),
					me = this;

				//当前已经显示了且没有按住ctrl键则直接退出
				if($(this).is('.ui-tab-hover') && !e.ctrlKey){
					return ;
				}

				function load(){
					//修正当前tab状态
					$(me).addClass('ui-tab-hover').siblings('.ui-tab-hover').removeClass('ui-tab-hover');

					//调用内部函数进行加载
					e.data.__load(href);
				}

				if(!e.isTrigger && e.data.confirmText){
					Tip.confirm(e.data.confirmText, function(rs){
						if(rs){
							load();
						}
					});
				}else{
					load();
				}
			});
			return this;
		},
		/**
		 * 保证顺序加载,避免网络延时导致多个加载的情况
		 * @param 
		 * @return 
		 */
		__load: function(href){
			var me = this, html,
				timeOk, reqOk;

			me.$con.html('加载中...');

			//每次都需要重新计时
			if(me.__timer){
				me.__timer.cancel();
			}
			me.__timer = S.later(function(){
				me.__timer = null;
				timeOk = true;
				insert();
			}, 500);

			//保证最后一个请求
			if(me.__req){
				me.__req.abort();
			}
			me.__req = $.get(href, function(rs){
				me.__req = null;
				html = rs;
				reqOk = true;
				insert();
			});

			function insert(){
				if(timeOk && reqOk){
					me.$con.html(html);
				}
			}
		},
		/**
		 * 增加一个条目
		 * @param name String
		 * @param url String
		 * @return this
		 */
		add: function(name, url){
			var $li = $(li);
			this.$nav.append($li);
			$li.find('a').attr('href', url).find('span').html(name);
			return this;
		},
		/**
		 * 加载指定的条目
		 * @param n Int
		 * @return this
		 */
		load: function(n){
			this.$nav.find('li:eq(' + n + ')').click();
			return this;
		},
		/**
		 * 删除指定的条目
		 * @param n Int
		 * @return this
		 */
		remove: function(n){
			this.$nav.find('li:eq(' + n + ')').remove();
			return this;
		},
		/**
		 * 设置内容区域的高度
		 * @param n Int
		 * @return this
		 */
		setHeight: function(n){
			this.$div.find('div.ui-tab-con').height(n);
			return this;
		},
		/**
		 * 设置切换时的提示文字
		 * @param str String
		 * @return this
		 */
		setConfirmText: function(str){
			this.confirmText = str;
			return this;
		}
	});

	return Tab;
});
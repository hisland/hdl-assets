/**
 * <pre><code>
 * API:
 *		$('selecotr').autoComplete();
 * 
 * 2011-4-11 15:30:28
 *		数据html实体转义
 * 
 * 2011-5-24 17:44:39
 *		取内容传送
 *			将输入内容传送1
 *		取ID传送
 *			无输入传 - ''
 *			输入无选择无匹配 - 传 -1
 *			输入无选择有匹配 - 第一个完整匹配的ID
 *			输入并选择 - 选择的ID
 *			输入无匹配 - 传 -1
 * 
 * 2011-09-24 14:45:16
 *		自动完成匹配后再进行html实体转义,否则会出现实体内部字符被截断从而显示出实体编码的问题
 * 
 * </code></pre>
 */

define(['jquery', 'kissy', 'ui/popup', 'css!./autocomp'], function($, S, Popup){
	
	/**
	 * @class
	 * @memberOf ui
	 */
	function Autocomp(setting){
		this.__init(setting).__initEvent();
	}
	
	/**
	 * @lends ui.Autocomp#
	 */
	S.augment(Autocomp, {
		/**
		 * 初始化基本信息
		 * @return this
		 */
		__init: function(setting){
			S.mix(this, setting || {});

			this.value = '';
			if(setting.target){
				this.$div = $(setting.target);
			}else{
				this.$div = $('<span class="autocomp"><input type="text" value="this is text" /><span></span><input type="hidden" name="" value="" /></span>');
			}
			this.$text = this.$div.find(':text');
			this.$span = this.$div.find('span');
			this.$hidden = this.$div.find('input:hidden');

			this.pop = Popup.init();
			this.pop.setSize(202, 205);
			this.pop.$content.html('<div class="autocomp-pop"><div class="autocomp-loading">加载中...</div><div class="autocomp-as"><a class="autocomp-a" href="javascript:;" data-value="1" title="1">1<strong>dddddd</strong></a><a class="autocomp-a" href="javascript:;" data-value="上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页" title="上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页">上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页上一页</a><a class="autocomp-a" href="javascript:;" data-value="在要枯在要枯在要枯在要枯在要枯" title="在要枯在要枯在要枯在要枯在要枯">在要枯在要枯在要枯在要枯在要枯</a><a class="autocomp-a" href="javascript:;" data-value="4" title="4">4</a><a class="autocomp-a" href="javascript:;" data-value="5" title="5">5</a></div><div class="autocomp-page"><a class="autocomp-prev" href="javascript:;">上一页</a><a class="autocomp-next" href="javascript:;">下一页</a><span class="autocomp-tip"></span></div></div>');
			this.$loading = this.pop.$content.find('div.autocomp-loading');
			this.$content = this.pop.$content.find('div.autocomp-as');
			this.$prev = this.pop.$content.find('a.autocomp-prev');
			this.$next = this.pop.$content.find('a.autocomp-next');

			this.currPage = 1;
			this.text = '';
			this.param = [];

			return this;
		},
		/**
		 * 初始化事件
		 * @return this
		 */
		__initEvent: function(){
			//输入框点击
			this.$text.click(this, function(e){
				var ac = e.data;
				ac.currPage = 1;
				ac.text = this.value;
				ac.pop.align(this, function(){
					this.$div.css('left', '-=5');
					this.$arr.css('left', '+=5');
				}).show();
				ac.ajaxLoad();
			});

			//下拉箭头点击
			this.$span.click(this, function(e){
				var ac = e.data;
				ac.currPage = 1;
				ac.text = '';
				ac.pop.align(this, function(){
					this.$div.css('left', '-=109').css('top', '+=1');
					this.$arr.css('left', '+=103');
				}).show();
				ac.ajaxLoad();
			});

			//上一页
			this.$prev.click(this, function(e){
				e.data.prev();
			});

			//下一页
			this.$next.click(this, function(e){
				e.data.next();
			});
			return this;
		},
		/**
		 * 加载数据
		 * @return this
		 */
		ajaxLoad: function(){
			var param = S.clone(this.param),
				ac = this;

			//加入额外参数
			param.push({name: 'currPage', value: this.currPage});
			param.push({name: 'search', value: this.text});

			$.getJSON(this.url, param, function(rs){
				ac.setData(rs);
			});
			return this;
		},
		/**
		 * 跳到某页
		 * @param n Int
		 * @return this
		 */
		goPage: function(n){
			if(n === undefined || (n >= 1 && n <= this.allPage)){
				this.currPage = n;
				this.ajaxLoad();
			}
			return this;
		},
		/**
		 * 上一页
		 * @return this
		 */
		prev: function(){
			return this.goPage(--this.currPage);
		},
		/**
		 * 下一页
		 * @return this
		 */
		next: function(){
			return this.goPage(++this.currPage);
		},
		/**
		 * 设置数据
		 * @param data Object
		 * @return this
		 */
		setData: function(data){
			//设置数据
			this.$content.empty();
			S.each(data.rows, function(v, i, o){
				var a = $('<a class="autocomp-a" href="javascript:;">' + v + '</a>');
				a[0].rawData = v;
				this.$content.append(a);
			}, this);

			if(data.allPage <= 1){
				this.$prev.add(this.$next).hide();
			}else{
				//控制上一页按钮
				if(data.currPage <= 1){
					this.$prev.css('visibility', 'hidden');
				}else{
					this.$prev.css('visibility', '');
				}

				//控制下一页按钮
				if(data.currPage >= data.allPage){
					this.$next.css('visibility', 'hidden');
				}else{
					this.$next.css('visibility', '');
				}
			}

			S.mix(this, data);
			
			return this;
		},
		/**
		 * 处理单个要显示的文字
		 * @return this
		 */
		itemProcess: function(item){
			return this;
		},
		/**
		 * 内容修改时触发
		 * @return this
		 */
		change: function(){
			return this;
		},
		/**
		 * 设置请求地址
		 * @param url String
		 * @return this
		 */
		setUrl: function(url){
			
		},
		/**
		 * 设置请求参数
		 * @param param Object
		 * @return this
		 */
		setParam: function(param){
			
		}
	});

	return Autocomp;
});
define(['jquery', 'kissy', './pager-ajax-setting'], function($, S, Setting){
	/**
	 * @class
	 * @memberOf ui
	 */
	function PagerAjax(url, param){
		this.data = S.clone(Setting);
		this.setUrl(url);
		this.setParam(param);
	}
	/**
	 * @lends ui.PagerAjax#
	 */
	S.augment(PagerAjax, {
		/**
		 * 跳到某页
		 * @param page Int
		 * @return this
		 */
		goPage: function(page){
			var me = this,
				url = me.url,
				param = me.param;

			//url, param是动态生成的处理
			if(S.isFunction(url)){
				url = me.url();
			}
			if(S.isFunction(param)){
				param = me.param();
			}else{
				param = S.clone(param) || [];
			}

			//保存参数
			me.last_param = S.clone(param);

			//获取的是指定页
			param.push({
				name: 'currPage',
				value: page
			}, {
				name: 'perPageNum',
				value: this.data.perPageNum
			});

			//已经在加载中,取消上次
			if(this.__is_loading){
				this.__req.abort();
			}else{
				this.__is_loading = true;
				this.onLoading();
			}

			this.__req = $.post(url, param, function(rs){
				me.__is_loading = false;
				if(rs && rs.currPage){
					me.data = rs;
				}else{
					me.data = S.clone(Setting);
				}
				me.onLoaded();
				me.onCallback();
			}, 'json');

			return this;
		},
		/**
		 * 上一页
		 * @return this
		 */
		prev: function(){
			return this.goPage(this.data.currPage - 1);
		},
		/**
		 * 下一页
		 * @return this
		 */
		next: function(){
			return this.goPage(this.data.currPage + 1);
		},
		/**
		 * 刷新
		 * @return this
		 */
		refresh: function(){
			this.goPage(this.data.currPage);
			return this;
		},
		/**
		 * 取消请求
		 * @return this
		 */
		abort: function(){
			if(this.__is_loading){
				this.__req.abort();
				this.__is_loading = false;
			}
			return this;
		},
		/**
		 * 设置单页显示条数,不会自动刷新
		 * @param num Int
		 * @return this
		 */
		setPerPageNum: function(num){
			this.data.perPageNum = num;
			return this;
		},
		/**
		 * 设置请求地址
		 * @param url String
		 * @return this
		 */
		setUrl: function(url){
			this.url = url;
			return this;
		},
		/**
		 * 设置请求额外参数
		 * @param param query-array
		 * @return this
		 */
		setParam: function(param){
			this.param = param;
			return this;
		},
		/**
		 * 设置loading的回调
		 * @param fn Function|undefined
		 * @return this
		 */
		onLoading: function(fn){
			fn ? $(this).on('onloading', fn) : $(this).trigger('onloading');
			return this;
		},
		/**
		 * 设置onLoaded的回调
		 * @param fn Function|undefined
		 * @return this
		 */
		onLoaded: function(fn){
			fn ? $(this).on('onloaded', fn) : $(this).trigger('onloaded');
			return this;
		},
		/**
		 * 设置回调
		 * @param fn Function|undefined
		 * @return this
		 */
		onCallback: function(fn){
			fn ? $(this).on('oncallback', fn) : $(this).trigger('oncallback');
			return this;
		}
	});

	return PagerAjax;
});
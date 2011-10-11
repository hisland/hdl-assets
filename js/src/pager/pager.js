/**********************************************************************************************
 * 名称: 分页纯逻辑处理
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-05-30 10:20:41
 * 版本: v1
 * 
 * API:
 *		
 * 
 * 
 * 
 */

KISSY.add('pager', function(S, undef) {
	var  $ = jQuery
		,EMPTY_$ = $('');

	//本地数据分页
	function pagerLocal(data){
		//更改为构造方式
		if(!(this instanceof pagerLocal)){
			return new pagerLocal(data);
		}

		this.num_per_page = 15;
		if(S.isArray(data)){
			this.setData(data);
		}else{
			this.reset();
		}
	}
	S.augment(pagerLocal, {
		reset: function(){
			this.data = [];
			this.totals = 0;
			this.page_now = 1;
			this.page_totals = 1;
			return this;
		},
		setData: function(data){
			if($.isArray(data)){
				this.data = data;
				this.totals = data.length;
				this.page_now = 1;
				this.page_totals = Math.ceil(this.totals / this.num_per_page);
			}else{
				S.log('$.pagerLocal.setData: data must be an array!');
			}
			return this;
		},
		setNumPerPage: function(num){
			if(num > 1){
				this.num_per_page = num;
				this.page_totals = Math.ceil(this.totals / this.num_per_page);
			}else{
				S.log('$.pagerLocal.setNumPerPage: num must gt 1!');
			}
			return this;
		},
		prev: function(){
			return this.getPage(this.page_now - 1);
		},
		next: function(){
			return this.getPage(this.page_now + 1);
		},
		getPage: function(page){
			if(page < 1){
				S.log('$.pagerLocal.getPage: page must gt 1');
				return null;
			}else if(page > this.page_totals){
				S.log('$.pagerLocal.getPage: page must lt max!');
				return null;
			}else if(S.isNumber(page-=0)){
				this.page_now = page;
				return this.data.slice((page-1)*this.num_per_page, page*this.num_per_page);
			}else{
				S.log('$.pagerLocal.getPage: page invalid!');
				return null;
			}
		}
	});

	//异步数据分页
	function pagerAjax(url, param){
		//更改为构造方式
		if(!(this instanceof pagerAjax)){
			return new pagerAjax(url, param);
		}

		this.setUrl(url);
		if(param){
			this.setParam(param);
		}
		this.reset();

		//后台对应属性名
		this.var_page = 'currPage';

		//读取中/完成的回调
		this.__loading = this.__loaded = this.__callback = $.noop;
	}
	S.augment(pagerAjax, {
		reset: function(){
			this.currPage = 1;
			this.allPage = 1;
			this.perPageNum = 15;
			return this;
		},
		prev: function(){
			return this.getPage(this.currPage - 1);
		},
		next: function(){
			return this.getPage(this.currPage + 1);
		},
		getPage: function(page){
			var param, me = this;

			if(page < 1){
				S.log('$.pagerAjax.getPage: page must gt 1');
			}else if(this.allPage && page > this.allPage){
				S.log('$.pagerAjax.getPage: page must lt max!');
			}else if(S.isNumber(page-=0)){
				this.currPage = page;

				param = S.isFunction(this.__param) ? this.__param() : this.__param;

				//TODO:param为String, Array, Object的时候的统一处理
				if(S.isString(param)){
					param = S.unparam(param);
				}
				param = $.param(param);
				param = (param ? param + '&' : '') + this.var_page + '=' + page;

				//已经在加载中,取消上次
				if(this.loading){
					this.__req.abort();
				}else{
					this.__loading();
					this.loading = true;
				}

				this.__req = $.post(this.__url, param, function(rs){
					me.loading = false;
					me.__loaded();
					S.mix(me, rs);
					me.__callback(me);
				}, 'json');
			}else{
				S.log('$.pagerAjax.getPage: page invalid!');
			}

			return this;
		},
		abort: function(){
			if(this.loading){
				this.__req.abort();
			}
			return this;
		},
		setNumPerPage: function(num){
			if(num > 1){
				this.num_per_page = num;
				this.page_totals = Math.ceil(this.totals / this.num_per_page);
			}else{
				S.log('$.pagerAjax.setNumPerPage: num must gt 1!');
			}
			return this;
		},
		setVarPage: function(str){
			if(S.isString(str)){
				this.var_page = str;
			}else{
				S.log('$.pagerAjax.setVarPage: str must be a string!');
			}
			return this;
		},
		setUrl: function(url){
			if(S.isFunction(url) || S.isString(url)){
				this.__url = url;
			}else{
				S.log('$.pagerAjax.setUrl: url must be a function or string!');
			}
			return this;
		},
		setParam: function(param){
			if(S.isFunction(param) || S.isString(param)){
				this.__param = param;
			}else{
				S.log('$.pagerAjax.setParam: param must be a function or string!');
			}
			return this;
		},
		setCallback: function(fn){
			if(S.isFunction(fn)){
				this.__callback = fn;
			}else{
				S.log('$.pagerAjax.setCallback: fn must be a function!');
			}
			return this;
		},
		setLoading: function(fn){
			if(S.isFunction(fn)){
				this.__loading = fn;
			}else{
				S.log('$.pagerAjax.setLoading: fn must be a function!');
			}
			return this;
		},
		setLoaded: function(fn){
			if(S.isFunction(fn)){
				this.__loaded = fn;
			}else{
				S.log('$.pagerAjax.setLoaded: fn must be a function!');
			}
			return this;
		}
	});

	$.extend({
		pagerLocal: pagerLocal,
		pagerAjax: pagerAjax
	});
}, {
	requires: ['jquery-1.4.2']
});

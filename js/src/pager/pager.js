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
				S.log('pagerLocal.setData: data must be an array!');
			}
			return this;
		},
		setNumPerPage: function(num){
			if(num > 1){
				this.num_per_page = num;
				this.page_totals = Math.ceil(this.totals / this.num_per_page);
			}else{
				S.log('pagerLocal.setNumPerPage: num must gt 1!');
			}
			return this;
		},
		prev: function(){
			return this.getPage(this.page_now--);
		},
		next: function(){
			return this.getPage(this.page_now++);
		},
		getPage: function(p){
			if(p < 1){
				S.log('pagerLocal.getPage: page must gt 1');
				return null;
			}else if(p > this.page_totals){
				S.log('pagerLocal.getPage: page must lt max!');
				return null;
			}else if(S.isNumber(p-=0)){
				this.page_now = p;
				return this.data.slice((p-1)*this.num_per_page, p*this.num_per_page);
			}else{
				S.log('pagerLocal.getPage: page invalid!');
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

		this.reset(url, param);

		//后台对应属性名
		this.var_page = 'page';

		//读取中的回调
		this.loading = null;
		this.loaded = null;
	}
	S.augment(pagerAjax, {
		reset: function(url, param){
			if(url){
				this.url = url;
			}
			if(param){
				this.param = param;
			}
			this.currPage = 1;
			this.allPage = 1;
			return this;
		},
		prev: function(callback){
			this.getPage(this.currPage--, callback);
		},
		next: function(callback){
			this.getPage(this.currPage++, callback);
		},
		getPage: function(p, callback){
			var param, me = this;
			if(p < 1){
				this.currPage = 0;
				S.log('pagerAjax.getPage: page must gt 1');
				return null;
			}else if(this.allPage && p > this.allPage){
				this.currPage = this.allPage;
				S.log('pagerAjax.getPage: page must lt max!');
				return null;
			}else{
				param = $.isFunction(this.param) ? this.param() : param;
				param = $.param(param);
				param = (param ? param + '&' : '') + this.var_page + '=' + p;

				$.isFunction(this.loading) && this.loading();
				$.post(this.url, param, function(data){
					$.isFunction(me.loaded) && me.loaded();
					$.extend(me, data);
					$.isFunction(callback) && callback(me);
				}, 'json');
			}
		}
	});

	$.extend({
		pagerLocal: pagerLocal,
		pagerAjax: pagerAjax
	});
}, {
	requires: ['jquery-1.4.2']
});

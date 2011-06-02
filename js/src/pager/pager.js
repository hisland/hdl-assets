/**********************************************************************************************
 * 名称: 分页组件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-05-30 10:20:41
 * 版本: v1
 * 
 * 分页纯逻辑处理
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
		if(data){
			this.setData(data);
		}else{
			this.reset();
		}
	}
	$.extend(pagerLocal.prototype, {
		 reset: function(){
			this.data = [];
			this.totals = 0;
			this.page_now = 0;
			this.page_totals = 0;
			return this;
		}
		,setData: function(data){
			if($.isArray(data)){
				this.data = data;
				this.totals = data.length;
				this.page_now = 0;
				this.page_totals = Math.ceil(this.totals / this.num_per_page);
			}else{
				S.log('pagerLocal.setData: data应该是一个数组');
			}
			return this;
		}
		,setNumPerPage: function(num){
			if($.isArray(num) && num > 1){
				this.num_per_page = num;
				this.page_totals = Math.ceil(this.totals / this.num_per_page);
			}else{
				S.log('pagerLocal.setNumPerPage: num应该是一个大于1数字');
			}
			return this;
		}
		,prev: function(){
			if(this.page_now > 1){
				return this.getPage(this.page_now--);
			}
		}
		,next: function(){
			if(this.page_now < this.page_totals){
				return this.getPage(this.page_now++);
			}
		}
		,getPage: function(p){
			if(p < 1){
				S.log('pagerLocal.getPage: 读取页数应大于等于1');
				return null;
			}else if(p > this.page_totals){
				S.log('pagerLocal.getPage: 读取页数超过最大页数!');
				return null;
			}else{
				this.page_now = p;
				return this.data.slice((p-1)*this.num_per_page, p*this.num_per_page);
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
	}
	$.extend(pagerAjax.prototype, {
		 reset: function(url, param){
			if(url){
				this.url = url;
			}
			if(param){
				this.param = param;
			}
			this.currPage = 0;
			this.allPage = 0;
			return this;
		}
		,prev: function(callback){
			this.getPage(this.currPage--, callback);
		}
		,next: function(callback){
			this.getPage(this.currPage++, callback);
		}
		,getPage: function(p, callback){
			var param, me = this;
			if(p < 1){
				this.currPage = 0;
				S.log('pagerAjax.getPage: 读取页数应大于等于1');
				return null;
			}else if(this.allPage && p > this.allPage){
				this.currPage = this.allPage;
				S.log('pagerAjax.getPage: 读取页数超过最大页数!');
				return null;
			}else{
				param = $.isFunction(this.param) ? this.param() : param;
				param = $.param(param);
				param = (param ? param + '&' : '') + this.var_page + '=' + p;

				$.isFunction(this.loading) && this.loading(true);
				$.post(this.url, param, function(data){
					$.isFunction(me.loading) && me.loading(false);
					$.extend(me, data);
					$.isFunction(callback) && callback(me);
				}, 'json');
			}
		}
	});

	//放到jquery命名空间上
	$.extend({
		 pagerLocal: pagerLocal
		,pagerAjax: pagerAjax
	});
}, {
	requires: ['jquery-1.4.2']
});

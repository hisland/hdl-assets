define(['jquery', 'kissy', 'util'], function($, S, Util){

var defaultConfig = {
	enableDetail: false,
	autoRefresh: {
		timeout: 5000,
		process: function(){
			
		}
	},

	url: '',
	data: null,
	lastData: null,
	delay: 50,//延迟加载,避免一直按住回车不停请求,只加载最后一次

	preProcess: null,
	theme: 'default',

	enablePage: true,
	pageTheme: 'default',
	perPageNum: 15,
	perPageNumList: [8,10,15,20,25,40],

	enableCheckbox: true,
	checkboxFixto: null,
	clickCheck: true,//点击行便选中checkobx
	singleCheck: false,

	enableMask: true,
	nowrap: true,//不换行
	cellWrap: false,//是否单元格用div包裹起来

	enableFixCol: false,

	enableColToggle: true,
	minColToggle: 1,

	width: 'auto',
	height: 'auto',

	autoResize: false,
	autoload: false
};
var defaultCol = {
	align: 'left',//'left' 'right' 'center'
	alignHead: 'center',//'left' 'right' 'center'

	fixTo: null,//'left' 'right' 'null'

	width: 'auto',//'auto' '15%' 15
	minWidth: 10,
	maxWidth: 200,

	headText: 'Head Text',
	textStyle: null,

	enableHide: true,
	hide: false,

	enableSort: false,
	sortType: 'alpha', //'number' 'alpha'

	enableTip: false,
	tipType: 'default',//'default' 'mouse'

	process: null
};
var defaultRow = {
	align: null,
	enableCheck: true,
	disabled: false
};
var defaultResult = {
	perPageNum: 15,
	currPage: 1,
	beginNum: 0,
	endNum: 0,
	totals: 0,
	currRecordNum: 0,
	allPage: 0,
	rows: []
};


function Grid(config){
	this.__initConfig(config).__initDOM().__initEvent().__init();
}

//初始化, 事件
$.extend(Grid.prototype, {
	__initConfig: function(config){
		config = $.isPlainObject(config) ? config : {};
		this.config = S.mix(config, defaultConfig, false);
		S.each(config.colModel, function(v, i, o){
			$.extend(true, v, defaultCol);
		});
		return this;
	},
	__initDOM: function(){
		var div = $('<div class="grid-wrap"><div class="grid-title-wrap"></div><div class="grid-button-wrap"></div><div class="grid-table-wrap nofixcol"><div class="grid-table table-left"></div><div class="grid-table table-center"><div class="grid-head-wrap"><table><thead></thead></table></div><div class="grid-body-wrap"><table><tbody></tbody></table></div></div><div class="grid-table table-right"></div><div class="clear-left"></div></div><div class="grid-page-wrap"></div></div>');
		this.$wrap = div;
		this.$titleDiv = div.find('div.grid-title-wrap');
		this.$buttonDiv = div.find('div.grid-button-wrap');
		this.$tableWrapDiv = div.find('div.grid-table-wrap');
		this.$centerHeadDiv = div.find('div.table-center>.grid-head-wrap');
		this.$centerTHead = this.$centerHeadDiv.find('thead');
		this.$centerBodyDiv = div.find('div.table-center>.grid-body-wrap');
		this.$centerTBody = this.$centerBodyDiv.find('tbody');
		this.$pageDiv = div.find('div.grid-page-wrap');
		return this;
	},
	__initEvent: function(){
		var me = this;
		return this;
	},
	__init: function(){
		return this;
	}
});

//宽高
$.extend(Grid.prototype, {
	setWidth: function(num){
		return this;
	},
	setHeight: function(num){
		this.setBodyHeight();
		return this;
	},
	setBodyHeight: function(num){
		return this;
	}
});

//生成各种内容
$.extend(Grid.prototype, {
	makeCol: function(){
		return this;
	},
	makeHead: function(){
		return this;
	},
	makeBoby: function(){
		return this;
	},
	makePage: function(){
		return this;
	},
	makeHTML: function(){
		return this;
	},
	calcData: function(){
		var cols = this.colModel, data = this.data;
		this.$tmpTable.html();
		return this;
	},
	calcDimension: function(){
		var width = [], height = [];
		this.$tmpTable.find('col').each(function(i, v){
			width.push($(v).width());
		});
		this.$tmpTable.find('tbody tr').each(function(i, v){
			height.push($(v).height());
		});

		this.__width = width;
		this.__height = height;
		return this;
	}
});

//设置数据
$.extend(Grid.prototype, {
	setData: function(data){
		if($.isPlainObject(data)){
			this.data = data;
		}else{
			throw {
				message: 'error: Grid.setData:',
				data: data
			}
		}
		return this;
	},
	setHTMLData: function(obj){
		obj.col;
		obj.head;
		obj.body;
		return this;
	},
	ajaxLoad: function(fn){
		this.__delay && this.__delay.cancel();
		this.__req && this.__req.abort();

		this.__delay = S.later(function(){
			this.__delay = null;

			this.loading();
			this.__req = $.ajax({
				url: this.config.url,
				data: this.config.data,
				dataType: 'json',
				context: this,
				success: function(data){
					this.setData(data);
					$.isFunction(fn) && fn();
					this.loaded();
				}
			});
		}, this.delay, false, this);
		return this;
	},
	render: function(){
		return this;
	},
	blankLine: function(){
		var str = ['<tr style="visibility:hidden;">'];

		//checkbox需要占一列
		if(this.enableCheckbox){
			str.push('<td></td>');
		}

		//根据colModel计算需要多少列
		str.push(S.map(this.colModel, function(v, i, o){
			return '<td></td>';
		}).join(''), '</tr>');

		this.$centerTBody.html(str.join(''));
		return this;
	}
});

//加载状态
$.extend(Grid.prototype, {
	loading: function(){
		this.__loading = true;
		return this;
	},
	loaded: function(){
		this.__loading = false;
		this.__req = null;
		return this;
	}
});

//加载分页
$.extend(Grid.prototype, {
	loadPage: function(n){
		if(n >= 1 && n <= this.data.allPage){
			this.data.currPage = n;
			this.ajaxLoad();
		}else{
			S.log(['error: Grid.loadPage: ', n]);
		}
		return this;
	},
	refresh: function(){
		this.loadPage(this.data.currPage);
		return this;
	},
	nextPage: function(){
		this.loadPage(this.data.currPage + 1);
		return this;
	},
	prevPage: function(){
		this.loadPage(this.data.currPage - 1);
		return this;
	},
	firstPage: function(){
		this.loadPage(1);
		return this;
	},
	lastPage: function(){
		this.loadPage(this.data.allPage);
		return this;
	}
});

return Grid;

});
define(['jquery', 'kissy', 'css!./main'], function($, S){
	var  $ = jQuery
		,global_msgr = window['hdl_msgr'] = [];

	function close(e){
		$(this).closest('.hdl-msgr-wrap').slideUp('fast', function(){
			global_msgr[$(this).attr('data-hdl-msgr')].hide();
		});
		return false;
	}

	function Messager(){
		this.jq_dom = $(Messager.str_html);
		this.jq_title = this.jq_dom.find('span:eq(0)');
		this.jq_close = this.jq_dom.find('a:eq(0)');
		this.jq_content = this.jq_dom.find('div.hdl-msgr-con-inner:eq(0)');

		this.jq_close.click(close);
		this.jq_dom.hide().appendTo('body');
	}
	Messager.prototype = {
		 init: function(){
			this.uid = Messager.uid();
			global_msgr[this.uid] = this;
			this.jq_dom.attr('data-hdl-msgr', this.uid);
			this.jq_title.html(this.title);
			this.jq_dom.css({width: this.width, height: this.height});
			this.jq_content.css('height', this.height-36);
			if(this.auto_close){
				this.setAutoClose(this.auto_close);
				this.autoClose();
			}
			return this;
		}
		,show: function(){
			this.jq_dom.slideDown('fast');
			if(this.auto_close){
				this.autoClose();
			}
			return this;
		}
		,hide: function(){
			this.jq_dom.slideUp('fast');
			return this;
		}
		,autoClose: function(){
			var me = this;
			clearTimeout(this._close_timer);
			this._close_timer = setTimeout(function(){
				if(me.auto_close && !me._in){
					me.hide();
				}
			}, this.auto_close * 1000);
			return this;
		}
		,setContent: function(content){
			this.jq_content.html(content);
			return this;
		}
		,setTitle: function(title){
			this.jq_title.html(title);
			return this;
		}
		,setAutoClose: function(time){
			this.auto_close = time;
			this.autoClose();
			if(!this._auto_close_bind){
				this.jq_dom.hover(function(e){
					global_msgr[$(this).attr('data-hdl-msgr')]._in = true;
				}
				,function(e){
					global_msgr[$(this).attr('data-hdl-msgr')]._in = false;
				});
				this._auto_close_bind = true;
			}
			return this;
		}
	}

	//Tree静态属性|方法
	$.extend(Messager, {
		 _uid: 0
		,uid: function(){
			return 'hdlmsgr' + (++this._uid);
		}
		,str_html: '<div class="hdl-msgr-wrap"><!--[if IE 6]><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);" frameborder="no" scrolling="no"></iframe><![endif]--><div class="hdl-msgr-head"><div class="hdl-msgr-head-inner"><span></span><a href="#"></a></div></div><div class="hdl-msgr-con"><div class="hdl-msgr-con-inner"></div></div></div>'
	});


	function hdlMessager(setting, content){
		var msgr = new Messager();
		$.extend(msgr, {
			title: null, 
			width: 300,
			height: 170
		});

		if(typeof setting === 'object'){
			$.extend(msgr, setting);
		}else if(typeof setting === 'string'){
			$.extend(msgr, {title: setting});
		}

		if(content){
			msgr.setContent(content);
		}

		msgr.init();

		return msgr;
	}

	return hdlMessager;
});
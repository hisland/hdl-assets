/**********************************************************************************************
 * 右下角提示层
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-10-20 12:46:36
 * 版本: v1
 *
 * 前置脚本:
 *			../patch.javascript.js;
 *			../jquery-1.4.2.min.js
 */
(function($){
/**********************************************************************************************
*已经有了此函数则不用重复注册了
*/
	if($.hdlMessager){
		return false;
	}

/**********************************************************************************************
*代码正文
*/

	var global_msgr = window['hdl_msgr'] = [];
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
			this._close_timer = setTimeout(function(){
				me.hide();
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
					clearTimeout(global_msgr[$(this).attr('data-hdl-msgr')]._close_timer);
				}
				,function(e){
					global_msgr[$(this).attr('data-hdl-msgr')].autoClose();
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
		,str_html: '<div class="hdl-msgr-wrap"><div class="hdl-msgr-head"><div class="hdl-msgr-head-inner"><span></span><a href="#"></a></div></div><div class="hdl-msgr-con"><div class="hdl-msgr-con-inner"></div></div></div>'
	});

/**********************************************************************************************
*注册到jq原型上
*/
	function hdlMessager(setting, content){
		var msgr = new Messager();
		$.extend(msgr, {
			 title: '提示'
			,width: 300
			,height: 170
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

	$.hdlMessager = hdlMessager;
})(jQuery);
/**********************************************************************************************
 *	层模拟的提示信息插件
 *	需要jquery, hdlDrag 两个JS
 *	需要css文件夹里面的hdlTipMsg文件夹
 *使用方法:
 *	$.alert(str, [title])
 *	$.error(str, [title])
 *	$.notice(str, [title])
 *	$.confirm(str, [title], [callback])
 */

(function($){
	//原始的html代码,方便生成dom
	var htmlString = '<div class="tipmsg_wrap"><div class="tipmsg_title_wrap"><span class="tipmsg_title"></span><a href="#" class="tipmsg_close">&nbsp;</a></div><div class="tipmsg_content_wrap tipmsg_ico1"><p></p></div><div class="tipmsg_btn_wrap"><input type="button" value="确定" /></div></div>';//生成提示框用的原始html字符串

	/* 内部功能函数 - 关闭 */
	function close(me){
		$(me).parents('.tipmsg_wrap').remove();
		return false;
	}

	/* 内部功能函数 - 初始化 */
	function init(title, str, type, callback){
		/* 生成DOM */
		var div = $(htmlString);
		/* 设置标题 */
		div.find('span.tipmsg_title').html(title);
		/* 填入字符串 */
		div.find('div.tipmsg_content_wrap p').html(str);
		/* 确定和关闭按钮注册关闭事件 */
		div.find('a.tipmsg_close,input').click(function(){
			return close(this);
		});

		//判断提示类型,并设置图标,如果为confirm还要做特殊处理
		switch(type){
			case 'alert':
				div.find('div.tipmsg_content_wrap').addClass('tipmsg_ico1');
				break;
			case 'error':
				div.find('div.tipmsg_content_wrap').addClass('tipmsg_ico2');
				break;
			case 'notice':
				div.find('div.tipmsg_content_wrap').addClass('tipmsg_ico3');
				break;
			case 'confirm':
				div.find('div.tipmsg_content_wrap').addClass('tipmsg_ico4');
				div.find('input').val('取消').before(
					$('<input type="button" value="确定" class="btn2" />')
					.click(function(){
						close(this);
						if(typeof callback == 'function'){
							callback();
						}
					})
				);
				break;
		}

		//加入html
		$('body').append(div);
		//设置位置
		div.css({
					top :(document.documentElement.clientHeight-div.outerHeight()-30)/2,
					left:(document.documentElement.clientWidth-div.outerWidth())/2
				}).hdlDrag();
		
		//阻止内容里面点击时的拖动
		div.find('div.tipmsg_content_wrap>p').mousedown(function(e){
			e.stopPropagation();
		});
		return div;
	}

	/**********************************************************************************************
	 *提示信息 - 提示
	 *str   : 显示的信息字符串
	 *title : 可选的标题,默认为 '提示'
	 */
	function alert(str, title){
		title = title || '提示';
		return init(title, str, 'alert');
	}

	/**********************************************************************************************
	 *提示信息 - 错误
	 *str : 显示的信息字符串
	 *title : 可选的标题,默认为 '错误'
	 */
	function error(str, title){
		title = title || '错误';
		return init(title, str, 'error');
	}

	/**********************************************************************************************
	 *提示信息 - 警告
	 *str : 显示的信息字符串
	 *title : 可选的标题,默认为 '警告'
	 */
	function notice(str, title){
		title = title || '警告';
		return init(title, str, 'notice');
	}

	/**********************************************************************************************
	 *提示信息 - 确认
	 *str      : 显示的信息字符串
	 *title : 可选的标题,默认为 '确认'
	 *callback : 点击确定的回调函数
	 */
	function confirm(str, title, callback){
		if(typeof title == 'function'){//第2个参数为函数的时候,更正参数顺序
			callback = title;
			title = '确认';
		}
		if(!title){
			title = '确认';
		}
		return init(title, str, 'confirm', callback);
	}

	//注册到jq命名空间上
	$.extend({
		alert   : alert,
		error   : error,
		notice  : notice,
		confirm : confirm
	});
})(jQuery);
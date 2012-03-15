/**
 * 模拟的提示框
 * <pre><code>
 * TODO:
 * 		2010-8-19 14:5:35
 * 			需要一个机制来控制不能关闭此层
 * 		2010-10-12 10:33:29
 * 			defaultFocus
 * 		2011-4-6 15:33:11
 * 			显示之后,焦点不能跑到后面去
 * 		2011-4-15 14:41:55
 * 			确定和X不能拖动
 * 		2011-06-01 13:15:55
 * 			Y/N快捷键支持
 * 		2012-01-16 11:13:20
 * 			每个都有回调,confirm的回调接收第一个参数为true,false
 * </code></pre>
 */

define(['kissy', './tip', './msg'], function(S, T, MSG){
	//代理4种提示的初始化
	function wrap(message, title, callback, type){
		var tip = new T();

		//第2个参数为回调函数的时候,更正参数顺序
		if(S.isFunction(title)){
			callback = title;
			title = null;
		}

		//修正设置
		tip.setType(type)
			.setTitle(title)
			.setContent(message)
			.setCallback(callback);

		//生成即显示出来
		tip.show();

		return tip;
	}

	/**
	 * @lends ui.Tip
	 */
	return {
		/**
		 * 一般提示
		 * @param message String|DOM|jQuery
		 * @param title String|DOM|jQuery, 可选
		 * @param callback 值为函数
		 * @param callback 值为函数
		 * @return ui.Tip
		 */
		alert: function(message, title, callback){
			return wrap(message, title || MSG.alert, callback, 'alert');
		},
		/**
		 * 错误提示
		 * @param message String|DOM|jQuery
		 * @param title String|DOM|jQuery, 可选
		 * @param callback 值为函数
		 * @return ui.Tip
		 */
		error: function(message, title, callback){
			return wrap(message, title || MSG.error, callback, 'error');
		},
		/**
		 * 警告提示
		 * @param message String|DOM|jQuery
		 * @param title String|DOM|jQuery, 可选
		 * @param callback 值为函数
		 * @return ui.Tip
		 */
		notice: function(message, title, callback){
			return wrap(message, title || MSG.notice, callback, 'notice');
		},
		/**
		 * 确认提示
		 * @param message String|DOM|jQuery
		 * @param title String|DOM|jQuery, 可选
		 * @param callback 值为函数
		 * @return ui.Tip
		 */
		confirm: function(message, title, callback){
			return wrap(message, title || MSG.confirm, callback, 'confirm').addButton({
				click: function(e){
					//点击取消的回调,会传入false
					if(S.isFunction(e.data.callback)){
						e.data.callback(false);
					}
					e.data.hide();
				},
				text: MSG.cancel
			});
		}
	};
});

/**
 * @fileOverview
 * @module hdlTipMsg
 * @author hisland hisland@qq.com
 * @description 模拟的提示框
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
 * API:
 * 		alert('msg');
 * 		alert('msg', 'this is title');
 * 		alert('msg', function(){//do more});
 * 		alert('msg', 'this is title', function(){//do more});
 * 
 * 		notice('msg');
 * 		notice('msg', 'this is title');
 * 		notice('msg', function(){//do more});
 * 		notice('msg', 'this is title', function(){//do more});
 * 
 * 		errorTip('msg');
 * 		errorTip('msg', 'this is title');
 * 		errorTip('msg', function(){//do more});
 * 		errorTip('msg', 'this is title', function(){//do more});
 * 
 * 		confirm('msg', function(rs){//rs is true or false});
 * 		confirm('msg', 'this is title', function(rs){//rs is true or false});
 * </code></pre>
 */

define(['kissy', './tip', 'jquery-plugin'], function(S, T){
	//代理4种提示的初始化
	function wrap(message, title, callback, type){
		var tip = new T();

		//第2个参数为回调函数的时候,更正参数顺序
		if(S.isFunction(title)){
			callback = title;
			title = null;
		}

		//修正设置
		tip.setType(type);
		tip.setTitle(title);
		tip.setContent(message);
		tip.setCallback(callback);

		//生成即显示出来
		tip.show();

		return tip;
	}

	return {
		/**
		 * 一般提示
		 * @param message 值为字符串或者dom元素及jquery元素
		 * @param title 值为字符串或者dom元素及jquery元素, 可选
		 * @param callback 值为函数
		 */
		alert: function(message, title, callback){
			return wrap(message, title, callback, 'alert');
		},
		/**
		 * 错误提示
		 * @param message 值为字符串或者dom元素及jquery元素
		 * @param title 值为字符串或者dom元素及jquery元素, 可选
		 * @param callback 值为函数
		 */
		errorTip: function(message, title, callback){
			return wrap(message, title, callback, 'errorTip');
		},
		/**
		 * 警告提示
		 * @param message 值为字符串或者dom元素及jquery元素
		 * @param title 值为字符串或者dom元素及jquery元素, 可选
		 * @param callback 值为函数
		 */
		notice: function(message, title, callback){
			return wrap(message, title, callback, 'notice');
		},
		/**
		 * 确认提示
		 * @param message 值为字符串或者dom元素及jquery元素
		 * @param title 值为字符串或者dom元素及jquery元素, 可选
		 * @param callback 值为函数
		 */
		confirm: function(message, title, callback){
			var tip = wrap(message, title, callback, 'confirm');
			//增加一个取消按钮
			tip.addButton({
				click: function(e){
					//点击取消的回调,会传入false
					if(S.isFunction(e.data.callback)){
						e.data.callback(false);
					}
					e.data.hide();
				},
				text: msg_cancel
			});
			return tip;
		}
	};
});

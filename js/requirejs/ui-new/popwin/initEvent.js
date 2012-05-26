define(['jquery', 'kissy', 'jquery-plugin'], function($, S){
	return function(o){
		//设置关闭按钮
		o.$close.on('click', o, function(e){
			e.data.hide();
			e.preventDefault();
		});
		//不能拖拽
		o.$close.on('dragstart', function(e){
			e.preventDefault();
		});

		//代理取消按钮, 关闭层
		o.$div.on('click', '.popwin-cancel', o, function(e){
			e.data.hide();
		});

		//拖动初始化
		o.$div.hdlDrag({
			trigger_filter: function(e){
				//在IE下,内部有disabled的input时,点击input文本会导致e.target.parentNode为undefined, 前一个规则值为false,所以需要||单独处理
				if($(e.target).closest('.popwin-content, .popwin-close').length || !e.target.parentNode){
					return false;
				}
			}
		});

		return o;
	};
});
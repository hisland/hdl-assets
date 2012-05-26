define(['jquery', 'kissy', 'jquery-plugin'], function($, S){
	return function(o){

		o.$div.on('click', function(){
			//非禁用状态下点击才执行回调
			if(!$(this).is('.grid-button-dis')){
				o.config.click();
			}
		});

		return o;
	};
});
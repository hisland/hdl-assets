define(['jquery', 'kissy', 'ui/popup', 'css!./skin'], function($, S, Popup){
	var div = $('<a id="skin" href="javascript:;">换肤</a>');
	var pop = Popup.init();
	var name_map = {
		gray: '灰色',
		blue: '蓝色',
		red: '红色'
	};
	var Skin = {
		/**
		 * @return this
		 */
		$div: div,
		/**
		 * @return this
		 */
		pop: pop,
		/**
		 * @return this
		 */
		setSkin: function(type){
			$('#main-wrap').attr('class', 'main-wrap theme-' + type);
			return this;
		}
	};


	//生成皮肤列表
	S.each(name_map, function(v, i, o){
		pop.$content.append('<p class="skin-item" data-theme="' + i + '"><span class="skin-' + i + '"></span><span>' + v + '</span></p>');
	});
	pop.$content.find('p:first').css('border-top', 'none');
	pop.setWidth(70);

	//修改皮肤事件
	pop.$content.on('click', 'p', this, function(e){
		Skin.setSkin($(this).attr('data-theme'));
	});

	//挂在document上,与outerclick同级,否则会导致此函数先执行而看不到效果
	$(document).on('click', '#skin', function(e){
		pop.align(this);
		pop.$arr.css('left', '+=5');
		pop.show();
		pop.$div.one('outerclick', function(e, reale) {
			pop.hide();
		});
	});

	return Skin;
});
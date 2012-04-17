/**
 * 
 */
define(['jquery', 'kissy', 'ui/popwin', './compare', 'util'], function($, S, Popwin, Compare, Util){
	return {
		init: function(setting){
			S.mix(setting, {
				title: '对比',
				url: 'post.php',
				param: 'id=1&id=2',
				width: 500,
				height: 400
			}, false);

			var comp = new Compare(),
				pop = Popwin.init();

			comp.$div.appendTo(pop.$content);
			comp.$mid.width((setting.width - 40) / 2);

			pop.setTitle(setting.title);
			pop.setWidth(setting.width);
			pop.setHeight(setting.height);
			comp.$div.height(setting.height);
			pop.hide_action = 'remove';

			pop.show().loading();
			$.getJSON(setting.url, setting.param, function(rs){
				comp.setData(rs);
				pop.loaded();
				pop.$content.append('<form style="display:none;" action="policy/strategyCom!exportCompareInfo.do" method="post"><textarea name="compareInfo">' + Util.entityHTML('<div class="compare-wrap" style="height: 600px;width:600px;">' + comp.$div.html() + '</div>') + '</textarea></form>');
				pop.$title.append($('<a href="javascript:;" class="blue" style="margin-left:10px;">下载对比报告</a>').click(function(e){
					pop.$content.find('form').submit();
				}));
			});

			return comp;
		},
		/**
		 * 查看详情
		 * @param 
		 * @return 
		 */
		detail: function(setting){
			S.mix(setting, {
				title: '对比',
				url: 'post.php',
				param: 'id=1&id=2',
				width: 500,
				height: 400
			}, false);

			var comp = new Compare(),
				pop = Popwin.init();

			comp.$div.appendTo(pop.$content);
			comp.$mid.remove();

			pop.setTitle(setting.title);
			pop.setWidth(setting.width);
			pop.setHeight(setting.height);
			comp.$div.height(setting.height);
			comp.$div.addClass('compare-detail');
			pop.hide_action = 'remove';

			pop.show().loading();
			$.getJSON(setting.url, setting.param, function(rs){
				comp.setData(rs);
				pop.loaded();
			});

			return comp;
		}
	};
});

define(['jquery', 'kissy', 'ui/popup', 'ui/popwin', 'ui/grid', 'sf/compare'], function($, S, Popup, Popwin, Grid, Compare) {
	var pop = Popup.init();

	pop.setSize(200, 100);
	pop.setTheme('#e8bf30', '#fff5d4');
	pop.$div.css('box-shadow', '0 3px 10px #999');

	var opened = false;
	var map = {
		1: '策略集修改',
		2: '策略集删除',
		3: '策略集增加'
	};
	var ColSetting = [ {
		display : '策略集ID',
		name : 'scId',
		width : 110,
		align : 'center'
	}, {
		display : '策略集名称',
		name : 'scName',
		width : 140,
		align : 'center'
	}, {
		display : '策略集状态',
		name : 'scStatusName',
		width : 90,
		align : 'center'
	}, {
		display : '生效时间',
		name : 'bgnTime',
		width : 130,
		align : 'center'
	}, {
		display : '失效时间',
		name : 'endTime',
		width : 130,
		align : 'center'
	}, {
		display : '是否启用',
		name : 'flagName',
		width : 60,
		align : 'center'
	}, {
		display : '修改人',
		name : 'modifyOptName',
		width : 90,
		align : 'center'
	}, {
		display : '修改时间',
		name : 'modTime',
		width : 130,
		align : 'center'
	}, {
		display : '创建人',
		name : 'crtOptName',
		width : 90,
		align : 'center'
	}, {
		display : '创建时间',
		name : 'crtOptTime',
		width : 130,
		align : 'center'
	}, {
		display : '操作来源',
		name : 'optSourceName',
		width : 60,
		align : 'center'
	}, {
		display : '策略集类型',
		name : 'scTypeName',
		width : 90,
		align : 'center'
	} ];

	var popwin = Popwin.init();
	popwin.notremove(true);
	popwin.setWidth(700);

	function viewPolicyModify() {
		var col = S.clone(ColSetting);
		col.unshift({
			display : '操作',
			width : 90,
			align : 'center',
			process: function(row){
				var a = $('<a href="javascript:;" class="blue">对比</a>');
				a.click(function(e){
					Compare.init( {
						title : '策略集历史对比',
						url : 'msgNotify/messageNotify!compare.do',
						param : 'scIds=' + row.scId + '&scIds=' + row.scId + '&alterNumber=' + row.alterNumber,
						width : 600,
						height : 350
					});
				});
				return a;
			}
		});
		var grid = Grid.init({
			url: 'msgNotify/messageNotify!find.do?msgQueryForm.msgType=1',
			colModel: col,
			auto_load: true
		});
		popwin.$content.empty().append(grid.$div);
		popwin.setTitle('查看修改的策略集');
		popwin.front().show();
		pop.hide();
	}

	function viewPolicyDel() {
		var col = S.clone(ColSetting);
		col.unshift({
			display : '操作',
			width : 30,
			align : 'center',
			process: function(row){
				var a = $('<a href="javascript:;" class="blue">查看</a>');
				a.click(function(e){
					Compare.init( {
						title : '策略集信息',
						url : 'msgNotify/messageNotify!queryDelStrategyInfo.do',
						param : 'scIds=' + row.scId + '&scIds=' + row.scId + '&alterNumber=' + row.alterNumber,
						width : 600,
						height : 350
					});
				});
				return a;
			}
		});
		var grid = Grid.init({
			url: 'msgNotify/messageNotify!find.do?msgQueryForm.msgType=2',
			colModel: col,
			auto_load: true
		});
		popwin.$content.empty().append(grid.$div);
		popwin.setTitle('查看删除的策略集');
		popwin.front().show();
		pop.hide();
	}

	function viewPolicyAdd() {
		var col = S.clone(ColSetting);
		col.unshift({
			display : '操作',
			width : 30,
			align : 'center',
			process: function(row){
				var a = $('<a href="javascript:;" class="blue">查看</a>');
				a.click(function(e){
					Compare.init( {
						title : '策略集信息',
						url : 'msgNotify/messageNotify!queryAddStrategyInfo.do',
						param : 'scIds=' + row.scId + '&scIds=' + row.scId + '&alterNumber=' + row.alterNumber,
						width : 600,
						height : 350
					});
				});
				return a;
			}
		});
		var grid = Grid.init({
			url: 'msgNotify/messageNotify!find.do?msgQueryForm.msgType=3',
			colModel: col,
			auto_load: true
		});
		popwin.$content.empty().append(grid.$div);
		popwin.setTitle('查看增加的策略集');
		popwin.front().show();
		pop.hide();
	}

	//挂在document上,与outerclick同级,否则会导致此函数先执行而看不到效果
	$(document).on('click', '#message', function(e) {
		pop.align('#message');
		pop.$div.css('left', '-=90');
		pop.$arr.css('left', '+=100');
		pop.show();
		$('#message-count').show();

		//取得消息分类数目
		$.getJSON('msgNotify/messageNotify!countNotifyByType.do', function(rs) {
			pop.$content.empty();
			var p;
			S.each(
			rs, function(v, i, o) {
				p = $('<p>' + map[v[0]] + '<span class="orange">' + v[1] + '</span>条</p>');
				pop.$content.append(p);
				switch (v[0]) {
				case 1:
					p.append($('<a class="blue" href="javascript:;">查看</a>').click(viewPolicyModify));
					break;
				case 2:
					p.append($('<a class="blue" href="javascript:;">查看</a>').click(viewPolicyDel));
					break;
				case 3:
					p.append($('<a class="blue" href="javascript:;">查看</a>').click(viewPolicyAdd));
					break;
				}
			});
		});
		opened = true;

		pop.$div.one('outerclick', function(e, reale) {
			pop.hide();
			opened = false;
		});
	});

	//定时取得消息总数
//	var timer_handler = setInterval(function() {
//		if (!opened) {
//			$.get('msgNotify/messageNotify!countNotifyNum.do', function(rs){
//				if(rs !== '0'){
//					$('#message-count').html(rs);
//				}else{
//					$('#message-count').empty();
//				}
//			});
//		}
//	}, 3000);
});
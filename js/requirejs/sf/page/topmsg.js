
define([ 'jquery', 'kissy', 'ui/popup' ], function($, S, Popup) {
	window.pop = Popup.init();

	pop.setTheme('#e8bf30', '#fff5d4');
	pop.$div.css('box-shadow', '3px 3px 6px #999');

	pop.$div.outerclick(function(e, reale) {
		if (!$(reale.target).closest('#message').length) {
			pop.hide();
		}
	});

	$('#message').click(function(e) {
		pop.align('#message');
		pop.$div.css('left', '-=100');
		pop.$arr.css('left', '+=100');
		pop.show();
		$('#message span').show();
	});
	
	//定时闪烁
	function doNotification() {
		
		//用户没有点击消息进行查看处理或消息大于0条，就闪烁
		if(pop.$content.is(":hidden") && $('#message span').text() > 0){
			$('#message span').toggle($('#message span').is(":hidden"));
		}
		setTimeout(doNotification, 500);
	}
	var timer_handler = null;
	//定时刷新消息
	function doMessageFlush() {
		
		//用户没有点击消息进行查看处理，就5秒刷消息
		if(pop.$content.is(":hidden") || pop.$content.text()==''){
			$.getJSON("notify/messageNotify!obtainNoticeMsgDetail.do", function(
					data) {
				
				$(".top-bubble").html(data.notifyInfoAmount);
	
				pop.$content.empty();
				var a, p;
				
				//待审数据显示
				S.each(data.auditAmountMsgNotices, function(v, i, o){
					a = $('<a href="javascript:;" class="orange">' + v.auditAmount + '</a>');
					p = $('<p></p>');
					a.click(function(e){
						$('#' + v.menuId).click();
					});
					pop.$content.append(p.append('<span>' + v.audit + '数据<span>', a, '<span>条</span>'));
				});
				
				//稽核数据显示
				S.each(data.rearbMsgNotices, function(v, i, o){
					a =  $('<a href="javascript:;" class="orange">' + v.rearbSender + '</a>');
					p = $('<p></p>');
					
					a.click(function(){
						//将服务缓存消息移除
						$.post("notify/messageNotify!disposeMessageNotice.do",[{'name':'recordName','value':v.noticId}], function(data){
							clearTimeout(timer_handler);
							//立即刷新页面通知消息
							doMessageFlush();						
						});
						
						//跳转到仲裁结果查询页面
						$('#' + v.menuId).click();
					});
					
					pop.$content.append(p.append('<span>' + v.rearbUserName + '稽核用户'+v.audit+'主叫号码',a,'</span>'));
				});
				
			});
		}
		timer_handler = setTimeout(doMessageFlush, 6000);
	}
	
	doNotification();
	doMessageFlush();
});

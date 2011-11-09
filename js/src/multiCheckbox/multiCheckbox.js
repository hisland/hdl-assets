/**********************************************************************************************
 * 名称: multiCheckbox
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * NOTICE:
 * 
 * API:
 * 
 */

KISSY.add('multiCheckbox', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $(''),

		msg_please_check = '请选择',
		msg_select_all = '全选',
		msg_select_rev = '反选',
		msg_select_no = '不选',
		msg_ok = '确定',

		pop = $.popWin.init(),

		$ctrl = $('<p style="padding:0 0 5px;"><input type="button" class="button" value="' + msg_select_all + '" />&nbsp;&nbsp;<input type="button" class="button" value="' + msg_select_rev + '" />&nbsp;&nbsp;<input type="button" class="button" value="' + msg_select_no + '" /></p>'),
		$select_all = $ctrl.find('input:first'),
		$select_rev = $select_all.next(),
		$select_no = $select_rev.next(),

		$box = $('<div style="height:230px;overflow:auto;border:1px solid #92B1DC;padding:2px;"></div>'),

		$btn_wrap = $('<div class="win1-btns"><input type="submit" value="' + msg_ok + '" class="win1-btn-ok"></div>'),
		$btn_ok = $btn_wrap.find('input'),

		$ipt_target = $EMPTY;

	//初始化弹出层结构
	pop.$content.append($ctrl).append($box).append($btn_wrap);
	pop.setTitle(msg_please_check);
	pop.$close.hide();
	pop.manager.$div.addClass('not-remove');

	//全选
	$select_all.click(function(e){
		$(this).parent().next().find(':checkbox').attr('checked', true);
	});

	//反选
	$select_rev.click(function(e){
		var ckb = $(this).parent().next().find(':checkbox');
		var on = ckb.filter(':checked');
		var off = ckb.not(on);

		on.attr('checked', false);
		off.attr('checked', true);
	});

	//不选
	$select_no.click(function(e){
		$(this).parent().next().find(':checkbox').attr('checked', false);
	});

	//确定按钮点击时放回去
	$btn_ok.click(function(){
		var text = $box.find(':checked').parent().map(function(i, v){
			return $(v).text();
		}).get().join('+');
		$ipt_target.val(text).after($box.children().hide());

		pop.hide();
		$ipt_target = $EMPTY;
	});

	//点击输入框时显示多选
	function iptclick(e){
		$ipt_target = $(this);
		$box.append($ipt_target.next().show());
		pop.front().show();
	}

	$.fn.extend({
		multiCheckbox: function(){
			return this.filter(':text').each(function(i, v){
				if($(v).next().is('div')){
					$(v).click(iptclick);
				}
			});
		}
	});
}, {
	requires: ['jquery-1.4.2', 'popWin+css']
});

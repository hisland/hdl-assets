/**********************************************************************************************
 * 名称: provinceCity
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

KISSY.add('provinceCity', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $(''),

		msg_please_check = '请选择',
		msg_ok = '确定',

		pop = $.popWin.init(),

		$box_left = $('<div style="width:230px;float:left;height:150px;overflow:auto;"></div>'),
		$box_right = $('<div style="width:230px;float:left;height:150px;overflow:auto;"></div>'),

		$btn_wrap = $('<div class="win1-btns"><input type="submit" value="' + msg_ok + '" class="win1-btn-ok"></div>'),
		$btn_ok = $btn_wrap.find('input'),

		$ipt_target = $EMPTY;

	//初始化弹出层结构
	pop.$content.append($box_left).append($box_right).append($btn_wrap);
	pop.setTitle(msg_please_check);
	pop.$close.hide();

	//确定按钮点击时放回去
	$btn_ok.click(function(){
		

		pop.hide();
		$ipt_target = $EMPTY;
	});

	function iptclick(e){
		$ipt_target = $(this);
		var pid = $ipt_target.next().val();
		var cid = $ipt_target.next().next().val();

		pop.front().show();
	}

	function provinceCity(){
		return this.filter(':text').each(function(i, v){
			if($(v).next().is('div')){
				$(v).click(iptclick);
			}
		});
	}

	$.fn.extend({
		provinceCity: provinceCity
	});
}, {
	requires: ['jquery-1.4.2']
});

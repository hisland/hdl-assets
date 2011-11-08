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

		$box_left = $('<div class="province-city-left"></div>'),
		$box_right = $('<div class="province-city-right"></div>'),

		$btn_wrap = $('<div class="win1-btns"><input type="submit" value="' + msg_ok + '" class="win1-btn-ok"></div>'),
		$btn_ok = $btn_wrap.find('input'),

		$ipt_target = $EMPTY;
	
	var pList = [];
	var cList = [];

	//初始化省列表
	var sb = [];
	S.each(pList, function(i, v){
		sb.push('<a href="#" data-id="', v.id, '">', v.text, '</a>');
	});
	$box_left.html(sb.join(''));

	//初始化市列表
	function changeProvince(pid){
		//初始化省列表
		var sb = [];
		S.each(pList[pid], function(i, v){
			sb.push('<a href="#" data-id="', v.id, '">', v.text, '</a>');
		});
		$box_right.html(sb.join(''));
	}

	//初始化弹出层结构
	pop.$content.append($box_left).append($box_right).append($btn_wrap);
	pop.setTitle(msg_please_check);
	pop.setInnerWidth(400);
	pop.$close.hide();

	//左侧点击,切换并且更新右侧
	$box_left.click(function(e){
		var dt = $(e.target);
		if(dt.is('a')){
			dt.addClass('hover').siblings('.hover').removeClass('hover');
			changeProvince(dt.attr('data-id'));
		}
	});

	//右侧点击,切换
	$box_right.click(function(e){
		var dt = $(e.target);
		if(dt.is('a')){
			dt.addClass('hover').siblings('.hover').removeClass('hover');
		}
	});

	//确定按钮点击时放回去
	$btn_ok.click(function(){
		var p = $box_left.find('.hover');
		var c = $box_right.find('.hover');
		var pid = p.attr('data-id');
		var cid = c.attr('data-id');

		$ipt_target.next().val(pid);
		$ipt_target.next().next().val(cid);

		$ipt_target.val(p.text() + '-' + c.text());

		pop.hide();
		$ipt_target = $EMPTY;
	});

	//输入框点击
	function iptclick(e){
		$ipt_target = $(this);
		var pid = $ipt_target.next().val();
		var cid = $ipt_target.next().next().val();

		$box_left.add($box_right).find('.hover').removeClass('hover');

		$box_left.find('[data-id='+pid+']').addClass('hover');
		$box_right.find('[data-id='+cid+']').addClass('hover');

		pop.front().show();
	}

	//注册
	function provinceCity(setting){
		return this.filter(':text').each(function(i, v){
			$(v).after('<input type="hidden" name="province" value="" /><input type="hidden" name="city" value="" />').click(iptclick);
		});
	}

	$.fn.extend({
		provinceCity: provinceCity
	});
}, {
	requires: ['jquery-1.4.2', 'popWin+css']
});

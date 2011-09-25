/**********************************************************************************************
 * 名称: 弹出选择框
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-21 12:36:50
 * 版本: v1
 *
 * API:
 *		
 */

KISSY.add('popSelect', function(S, undef) {
	var $ = jQuery,
		EMPTY_$ = $(''),
		div_pop = EMPTY_$,
		ipt_target = EMPTY_$,
		pop = $.popWin.init();

	var default_setting = {
		//对应值,显示文本的属性名
		var_id: 'id',
		var_text: 'name',
		title: 'please select',
		//是否复选
		multi: false,
		//点击回调
		onClick: null,
		//显示前回调
		onShow: null,
		//隐藏前回调
		onHide: null,
		//生成列表时的生成item函数
		itemMaker: null,
		//是否异步取数据
		is_ajax: false,
	}

	//显示
	function popShow(){
		pop.manager.show();
		pop.show();
	}
	//隐藏
	function popHide(){
		pop.manager.hide();
	}

	//初始化包含层
	function initDiv(){
		//建立弹出层并初始化事件
		div_pop = $('<div class="pop-select"><div class="pop-select-legend"></div><div class="pop-select-in"><table class="pop-select-t"><tbody><body></tbody></table></div></div>');
		div_pop.click(divPopClick).dblclick(divPopDblClick);
		pop.content.empty().append(div_pop);
	}

	//输入框点击事件
	function iptClick(e){
		ipt_target = $(this);
		//onShow
		popShow();
	}
	//弹出层点击作相应操作
	function divPopClick(e){
		var t = e.target,
			dt = $(t),
			str = [];

		if(dt.is('a')){
			//选择某个市
			if(dt.parent().is('.pop-select-td3')){
				str.push(dt.parent().prev().html());
				$(ipt_target.attr('data-province')).val(dt.parent().prev().attr('data-id'));
				str.push(dt.html());
				$(ipt_target.attr('data-city')).val(dt.attr('data-id'));
				ipt_target.val(str.join('-'));

			//跳到相应位置
			}else if(dt.parent().is('.pop-select-legend')){
				div_pop.find('td.pop-select-td1').each(function(i, v, len){
					if(v.innerHTML === t.innerHTML){
						v = $(v);
						t = v.parents('.pop-select-in');
						len = t[0].scrollTop + v.position().top - 10;

						t.animate({'scrollTop': len}, 'fast');
						return false;
					}
				});
			}
			e.preventDefault();
		}
	}
	//弹出层双击关闭
	function divPopDblClick(e){
		if($(e.target).parent().is('.pop-select-td3')){
			popHide();
		}
	}

	function popSelect(setting){
		this.each(function(i, v){
			//初始化
			if(!v['--bind_pop_select']){
				v['--bind_pop_select'] = true;
				$(v).click(iptClick).data('setting', S.merge(default_setting, setting));
			}
			//修改配置
			else{
				S.mix($(v).data('setting'), setting);
			}
		});
	}

	$.fn.extend({
		popSelect: popSelect
	});
}, {
	requires: ['jquery-1.4.2', 'popWin']
});

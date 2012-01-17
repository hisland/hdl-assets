/**********************************************************************************************
 * 名称: 自动完成控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-3-1 14:11:31
 * 版本: v2
 * 
 * API:
 *		$('selecotr').autoComplete();
 * 
 * 2011-4-11 15:30:28
 *		数据html实体转义
 * 
 * 2011-5-24 17:44:39
 *		取内容传送
 *			将输入内容传送
 *		取ID传送
 *			无输入传 - ''
 *			输入无选择无匹配 - 传 -1
 *			输入无选择有匹配 - 第一个完整匹配的ID
 *			输入并选择 - 选择的ID
 *			输入无匹配 - 传 -1
 * 
 * 2011-09-24 14:45:16
 *		自动完成匹配后再进行html实体转义,否则会出现实体内部字符被截断从而显示出实体编码的问题
 * 
 */

KISSY.add('autoComplete', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $(''),
		div_pop, div_loading, div_list, a_prev, a_next, span_state,
		delay = 300, delay_handler = null,
		msg_loading = '加载中...',
		msg_prev = '上一页',
		msg_next = '下一页',
		msg_count = '{beginNum}-{endNum}/{totals}条',
		pager_ajax = $.pagerAjax(),
		target_ipt, target_setting;

	var default_setting = {
		url: '',
		param: '',
		disabled: false,
		loading: $.noop,
		loaded: $.noop,
		filter: $.noop,
		click: $.noop,
		change: $.noop,
		callback: $.noop
	}

	//加载中各状态
	pager_ajax.setLoading(function(){
		div_list.css('opacity', 0.3);
		div_loading.show();
		a_next.add(a_prev).css('visibility', 'hidden');
		span_state.hide();
	}).setLoaded(function(){
		div_list.css('opacity', 1);
		div_loading.hide();

		if(this.currPage < this.allPage){
			a_next.css('visibility', '');
		}else{
			a_next.css('visibility', 'hidden');
		}
		if(this.currPage > 1){
			a_prev.css('visibility', '');
		}else{
			a_prev.css('visibility', 'hidden');
		}

		span_state.show().html(S.substitute(msg_count, this));
	});

	//按键延迟过滤
	function delayPress(val){
		if(target_setting.prev_val !== val){
			clearTimeout(delay_handler);
			delay_handler = setTimeout(function(){
				changeText(val);
			}, delay);
		}else{
			clearTimeout(delay_handler);
		}
	}

	//此会保存prev_val值
	function changeText(val){
		pager_ajax.setParam("keycontent="+val).setCallback(function(rs){
			target_setting.prev_val = val;
			makeList(rs.rows);
		}).getPage(1);
	}

	//点击展开所有
	function spanClick(e){
		//禁用时直接退出
		if($(this).parent().is('.auto-comp-disabled')){
			return ;
		}
		div_pop.adjustElement($(this).parent()).show();
		$(document).mousedown(docClose);
		target_ipt = $(this).prev()[0];
		target_setting = $(target_ipt).data('--auto-comp-setting');
		pager_ajax.setUrl(target_setting.url);
		changeText('');
	}

	//选择某个选项
	function userSelect(dt){
		$(target_ipt).val(dt.text());
	}

	//生成下拉列表
	function makeList(rows){
		var b = [];
		S.each(rows, function(v, k, o){
			b.push('<a class="auto-comp-a" href="javascript:;">', v, '</a>');
		});
		div_list.html(b.join('')).fadeTo('fast', 1);
	}

	//打开时阻止回车,否则可能导致form提交
	function iptKeyDown(e){
		if(e.keyCode === 13 && div_pop.is(':visible')){
			e.stopPropagation();
		}
	}

	//全局监听关闭
	function docClose(e){
		if(!$(e.target).closest('.auto-comp-pop, .auto-comp').length){
			popHide();
		}
	}
	//获得焦点的时候初始化
	function iptFocus(e){
		div_pop.css('z-index', S.guid()).adjustElement($(this).parent()).show();
		$(document).mousedown(docClose);
		target_ipt = this;
		target_setting = $(target_ipt).data('--auto-comp-setting');
		pager_ajax.setUrl(target_setting.url);
		changeText(this.value);
	}
	//失去焦点需要最后执行一次,因为有可能速度非常快
	function iptBlur(e){
		changeText(this.value);
	}
	//采用input事件.当内容有变化时执行,不管是怎么变化的(键盘,右键还是其它的...)
	function iptInput(e){
		delayPress(this.value);
	}
	function popHide(){
		$(document).unbind('mousedown', docClose);
		div_pop.hide();
	}

	//生成下拉层
	div_pop = $('<div class="auto-comp-pop"><div class="auto-comp-loading"></div><div class="auto-comp-as"></div><div class="auto-comp-page"><a class="auto-comp-prev" href="#"></a><a class="auto-comp-next" href="#"></a><span class="auto-comp-tip"></span></div></div>');
	//内部变量的引用
	div_loading = div_pop.find('div.auto-comp-loading').html(msg_loading);
	div_list = div_loading.next().click(function(e){
		var dt = $(e.target).closest('a', this);
		//点中a标签时处理
		if(dt.length){
			userSelect(dt);
		}
	});
	a_prev = div_pop.find('a.auto-comp-prev').html(msg_prev).click(function(e){
		pager_ajax.prev();
	});
	a_next = a_prev.next().html(msg_next).click(function(e){
		pager_ajax.next();
	});
	span_state = a_next.next();
	//事件注册
	div_pop.appendTo('body');

	//初始化函数
	function autoComplete(setting){
		setting = setting || {};
		if(setting === 'disabled'){
			setting = {disabled: true};
		}else if(setting === 'enable'){
			setting = {disabled: false};
		}

		return this.filter(':text').each(function(i, v){
			if(!$(this).data('--auto-comp-setting')){
				$(this).data('--auto-comp-setting', S.mix(setting, default_setting, false));
				$(this).wrap('<span class="auto-comp"></span>').after('<span></span>')
					.focus(iptFocus).keydown(iptKeyDown).input(iptInput)
					.next().mousedown(spanClick);
			}else{
				S.mix($(this).data('--auto-comp-setting'), setting);
			}

			setting = $(this).data('--auto-comp-setting');

			//禁用状态
			if(setting.disabled){
				$(this).attr('disabled', true).parent().addClass('auto-comp-disabled');
			}else{
				$(this).attr('disabled', false).parent().removeClass('auto-comp-disabled');
			}
		});
	}

	$.fn.extend({
		autoComplete: autoComplete
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'pager', 'jquery.input']
});
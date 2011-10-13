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
 * 2011-4-11 15:30:28:
 *		数据html实体转义
 * 
 * 2011-5-24 17:44:39:
 *		取内容传送
 *			将输入内容传送
 *		取ID传送
 *			无输入传 - ''
 *			输入无选择无匹配 - 传 -1
 *			输入无选择有匹配 - 第一个完整匹配的ID
 *			输入并选择 - 选择的ID
 *			输入无匹配 - 传 -1
 * 
 * 2011-09-24 14:45:16:
 *		自动完成匹配后再进行html实体转义,否则会出现实体内部字符被截断从而显示出实体编码的问题
 * 
 */

KISSY.add('autoComplete', function(S, undef) {
	var $ = jQuery,
		EMPTY_$ = $(''),
		div_pop, div_loading, div_list, a_prev, a_next, span_state,
		delay = 300, delay_handler = null,
		msg_loading = '加载中...',
		msg_prev = '上一页',
		msg_next = '下一页',
		msg_count = '${from}-${to}/${totals}条',
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
		div_loading.show();
	}).setLoaded(function(){
		div_loading.hide();
	});

	//按键延迟过滤
	function doPress(val){
		if(target_setting.prev_val !== val){
			div_list.fadeTo('fast', 0.1);
			clearTimeout(delay_handler);
			delay_handler = setTimeout(function(){
				changeText(val);
			}, delay);
		}else{
			div_list.fadeTo('fast', 1);
		}
	}
	//此会保存prev_val值
	function changeText(val){
		pager_ajax.setCallback(function(rs){
			target_setting.prev_val = val;
			makeList(rs.rows);
		}).getPage(1);
	}

	//点击展开所有
	function spanClick(e){
		pager_ajax.setCallback(function(rs){
			makeList(rs.rows);
		}).getPage(1);
	}

	//选择某个选项
	function userSelect(dt){
		
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

	//上下选择及匹配操作
	function iptKeyPress(e){
		var a = div_list.find('.hover'), key_code = e.keyCode || e.charCode, tmp;

		if(!div_opened){
			target = $(this);
			popShow();
		}else if(key_code === 13){
			a.click();
			popHide();
		}

		//向上
		if(key_code === 38){
			tmp = a.prev();
			if(a.length && tmp.length){
				tmp.addClass('hover');
				a.removeClass('hover');
			}else{
				div_list.find('a:last').addClass('hover');
			}
		}
		//向下
		else if(key_code === 40){
			tmp = a.next();
			if(a.length && tmp.length){
				tmp.addClass('hover');
				a.removeClass('hover');
			}else{
				div_list.find('a:first').addClass('hover');
			}
		}
		//下面这些情况,重新进行匹配
		else if((key_code >= 48 && key_code <= 90)//[0-9a-z]
					|| key_code == 32//空格
					|| key_code == 8//backspace
					|| key_code == 46//delete
					|| (key_code >= 96 && key_code <= 111)//小键盘0-9+-*/.
					|| (key_code >= 186 && key_code <= 192)//<>,./?~` ie:+=-_
					|| (key_code >= 219 && key_code <= 222)){//{}[]\|'"

			doPress(this.value);
		}
	}

	//全局监听关闭
	function docClose(e){
		if(!$(e.target).closest('.auto-comp-pop, .auto-comp').length){
			popHide();
		}
	}
	function iptFocus(){
		div_pop.adjustElement($(this).parent());
		$(document).mousedown(docClose);
		target_ipt = this;
		target_setting = this.auto_comp;
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
		a_next.show();
		if(pager_ajax.currPage === 2){
			$(this).hide();
		}
		pager_ajax.prev();
	});
	a_next = a_prev.next().html(msg_next).click(function(e){
		a_prev.show();
		if(pager_ajax.currPage+1 === pager_ajax.allPage){
			$(this).hide();
		}
		pager_ajax.next();
	});
	span_state = a_next.next();
	//事件注册
	div_pop.appendTo('body');

	//初始化函数
	function autoComplete(setting){
		return this.filter(':text').each(function(i, v){
			if(!this['--auto-comp-bind']){
				this['--auto-comp-bind'] = true;
				$(this).wrap('<span class="auto-comp"></span>').after('<span></span>')
					.focus(iptFocus).keypress(iptKeyPress).keydown(iptKeyDown)
					.next();//.mousedown(elmClick);
			}
		});
	}
	//切换可用状态
	function autoCompleteDisable(state){
		return this.each(function(i, v){
			if(this['--auto-comp-bind']){
				if(state === false){
					$(this).attr('disabled', false).parent().removeClass('auto-comp-disabled');
				}else{
					$(this).attr('disabled', true).parent().addClass('auto-comp-disabled');
				}
			}
		});
	}

	$.fn.extend({
		autoComplete: autoComplete,
		autoCompleteDisable: autoCompleteDisable
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'pager']
});
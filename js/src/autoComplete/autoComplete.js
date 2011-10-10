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
		delay = 300, delay_handler = 0,
		msg_loading = '加载中...',
		msg_prev = '上一页',
		msg_next = '下一页',
		msg_count = '${from}-${to}/${totals}条',
		pager_ajax = $.pagerAjax();

	//上下选择及匹配操作
	function iptKeyPress(e){
		var a = div_list.find('.hover'), key_code = e.keyCode || e.charCode;

		if(!div_opened){
			target = $(this);
			popShow();
		}else{
			if(key_code === 13){
				a.click();
				popHide();
				e.stopPropagation();
			}
		}

		//向上
		if(key_code === 38){
			if(a.length){
				tmp = a.prev();
				tmp.length ? tmp.addClass('hover').focus().end().removeClass('hover') : 0;
			}else{
				a = div_list.find('a:first');
				a.addClass('hover');
			}

		//向下
		}else if(key_code === 40){
			if(a.length){
				tmp = a.next();
				tmp.length ? tmp.addClass('hover').focus().end().removeClass('hover') : 0;
			}else{
				a = div_list.find('a:first');
				a.addClass('hover');
			}

		//下面这些情况,重新进行匹配
		}else if((key_code >= 48 && key_code <= 90)//[0-9a-z]
					|| key_code == 32//空格
					|| key_code == 8//backspace
					|| key_code == 46//delete
					|| (key_code >= 96 && key_code <= 111)//小键盘
					|| (key_code >= 186 && key_code <= 192)//一些符号
					|| (key_code >= 219 && key_code <= 222)){//一些括号

			doMatch(this.value);
		}

		target.focus();
	}

	//得到焦点或点击相同处理
	function iptClick(e, val){
		
	}
	//打开时回车阻止,否则可能导致form提交
	function iptKeyDown(e){
		if(e.keyCode === 13 && div_pop.is(':visible')){
			e.stopPropagation();
		}
	}

	//点击展开所有
	function spanClick(e){
		
	}

	//下拉层单击
	function divPopClick(e){
		
	}
	//下拉层双击
	function divPopDblClick(e){
		
	}

	function doMatch(val){
		
	}
	function changeText(val){
		
	}
	function makeList(val, page){
		
	}

	//全局监听关闭
	function docClose(e){
		if(!$(e.target).closest('.auto-comp-pop, .auto-comp').length){
			popHide();
		}
	}
	function iptFocus(){
		div_pop.adjustElement($(this).parent());
		$(document).click(docClose);
	}
	function popHide(){
		$(document).unbind('click', docClose);
		div_pop.hide();
	}

	//生成下拉层
	div_pop = $('<div class="auto-comp-pop"><div class="auto-comp-loading"></div><div class="auto-comp-as"></div><div class="auto-comp-page"><a class="auto-comp-prev" href="#"></a><a class="auto-comp-next" href="#"></a><span class="auto-comp-tip"></span></div></div>');
	//内部变量的引用
	div_loading = div_pop.find('div.auto-comp-loading').html(msg_loading);
	div_list = div_loading.next();
	a_prev = div_pop.find('a.auto-comp-prev').html(msg_prev);
	a_next = a_prev.next().html(msg_next);
	span_state = a_next.next();
	//事件注册
	div_pop.click(divPopClick).dblclick(divPopDblClick).appendTo('body');

	//初始化函数
	function autoComplete(){
		console.log(this);
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
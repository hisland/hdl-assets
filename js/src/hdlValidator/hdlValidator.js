/**********************************************************************************************
 * 名称: 表单验证控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-18 9:15:24
 * 版本: v1
 *
 * 注册可分3种形式:
 *		全局监听 - 局限性大,需要有事件来触发才能完成注册[默认]
 *		手工注册 - 最通用,手工写初始化代码,每个页面都会有初始化代码
 *		ajaxLoad后手工注册 - 需要整站框架支持,在一个公共地方使用手工注册
 *
 */

KISSY.add('hdlValidator', function(S, undef) {
	var $ = jQuery;

/**********************************************************************************************
 * 代码正文
 *
 * 触发事件:
 * 		focus	显示验证信息
 * 		keydown	控制输入
 * 		keyup	更正内容
 * 		change	检测
 * 属性:
 * 		maxlength	最大长度
 * 		minlength	最小长度
 * 		min/max		最小/最大值 - 表示此只能输入数字 同时指定一个step属性,否则默认增量为1
 * 		step		值的递增步长
 * 		pattern		输入内容需要匹配的模式
 * 		required	此项必填
 * 验证情况:
 * 		valiFunc	函数验证
 * 		valiReg		正则验证
 * 		valiNormal	一般验证
 * 自定义事件:
 * 		textChange	函数

	2011-3-21 12:40:50考虑
	usage:
		data-valid-type="pattern, pattern, pattern"
		pattern间使用', '分隔, 若在pattern内要使用(正则,对比验证时可能有),号,请加\进行转义/,,/, comp=#id1,id2 ==> /\,\,/, comp=#id1\,id2
		see demo.html

	pattern:
		regName					正则: 已定义的正则,在hdlReg模块中定义或者任意位置直接使用hdlReg.add(...)定义
		testName				函数: 已定义的函数,在hdlTest模块中定义或者任意位置直接使用hdlTest.add(...)定义
		ln-m					长度: 任意字符长度n-m
		lan-m					长度: 字母(含大小写)长度n-m
		lnn-m					长度: 数字长度n-m
		nn-m					数字: 值从n-m
		// //i //g				简单正则,复杂请使用regName
		ajax					异步验证,此则需要设置 data-ajax-url, data-ajax-data(可选)属性

		下面这3个可考虑 eq,gt,lt来实现
		comp=selector			对比==selector值
		comp<selector			对比<selector值
		comp>selector			对比>selector值

 */
	
	//内部类,方便数据存储与处理
	function Validator((){
		this.items = [];
	}
	$.extend(Validator.prototype, {
		 add: function(){
			
		}
		,valid: function(){
			
		}
	});

	function iptFocus(e){
		
	}
	function iptClick(e){
		
	}
	function iptKeyDown(e){
		
	}
	function iptPress(e){
		
	}
	function iptKeyUp(e){
		
	}
	function iptChange(e){
		
	}
	function paste(e){
		
	}
	function beforePaste(e){
		
	}

	//公共显示隐藏函数
	function popShow(){
		
	}
	function popHide(){
		
	}

	//注册事件,可用于手工注册
	function hdlValidator(){
		this.each(function(i, v){
			if(!v.__bind_hdl_valid){
				v.__bind_hdl_valid = true;
				$(v).click(iptClick);
			}
		});
	}

	//文档上监听并注册事件,如已注册则忽略,顺带做隐藏操作
	function documentClick(e){
		var  t = e.target
			,dt = $(t);
		if(dt.is('input[data-valid-type]') && !t.__bind_hdl_valid){
			dt.hdlValidator();
			dt.click();
		}
		if(!dt.closest('.hdl-vali-wrap, input[data-valid-type]').length){
			popHide();
		}
	}
	$(document).click(documentClick);

	//放到jq原型链上
	$.fn.extend({
		hdlValidator: hdlValidator
	});
}, {
	requires: ['jquery-1.4.2', 'hdlReg', 'hdlTest']
});

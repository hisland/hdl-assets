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
	var  $ = jQuery
		,EMPTY_$ = $('')
		,ipt_now = EMPTY_$
		,div_pop = EMPTY_$
		,validator;

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
		pattern间使用', '分隔, 若在pattern内要使用','号(正则,selector里面可能有),请加\进行转义,如:/,,/, eq#id1,id2 ==> /\,\,/, eq#id1\,id2
		see demo.html

	pattern:
		rName					正则: 已定义的正则,在hdlReg模块中定义或者任意位置直接使用hdlReg.add(...)定义
		tName					函数: 已定义的函数,在hdlTest模块中定义或者任意位置直接使用hdlTest.add(...)定义
		ln-m					长度: 任意字符长度n-m
		lan-m					长度: 字母(含大小写)长度n-m
		lnn-m					长度: 数字长度n-m
		nn-m					数字: 值从n-m
		// //i //g				简单正则,复杂请使用regName
		ajax					异步验证,此则需要设置 data-ajax-url, data-ajax-data(可选)属性

		大于等于小于对比
		comp=selector			对比==selector值
		comp>selector			对比>selector值
		comp<selector			对比<selector值
		考虑 eq,gt,lt来实现
		eqselector				对比==selector值
		gtselector				对比>selector值
		ltselector				对比<selector值

 */
	
	//内部类,方便数据存储与处理
	function Validator(){
		this.items = [];
	}
	$.extend(Validator.prototype, {
		 add: function(item){
			this.items.push(item);
			return this;
		}
		//逐个验证同时更新提示层内部html
		,valid: function(){
			var b = [];
			$.each(this.items, function(i, v){
				if(v.type == 'reg'){
					i = hdlReg.item(v.name);
					if(i.test(ipt_now.val())){
						b.push('<p class="hdl-vali-ok">', i.desc, '</p>');
					}else{
						b.push('<p class="hdl-vali-err">', i.desc, '</p>');
					}
				}else if(v.type == 'test'){
					
				}else if(v.type == 'len'){
					i = ipt_now.val().length;
					if(i >= v.from && i <= v.to){
						b.push('<p class="hdl-vali-ok">字符串长度在', v.from, '-', v.to, '之间,现在长度[', i, ']</p>');
					}else{
						b.push('<p class="hdl-vali-err">字符串长度在', v.from, '-', v.to, '之间,现在长度[', i, ']</p>');
					}
				}else if(v.type == 'lena'){
					i = ipt_now.val().length;
					if(/^[a-z]+$/i.test(ipt_now.val()) && i >= v.from && i <= v.to){
						b.push('<p class="hdl-vali-ok">a-z大小写,长度在', v.from, '-', v.to, '之间,现在长度[', i, ']</p>');
					}else{
						b.push('<p class="hdl-vali-err">a-z大小写,长度在', v.from, '-', v.to, '之间,现在长度[', i, ']</p>');
					}
				}else if(v.type == 'lenn'){
					i = ipt_now.val().length;
					if(/^\d+$/i.test(ipt_now.val()) && i >= v.from && i <= v.to){
						b.push('<p class="hdl-vali-ok">数字,长度在', v.from, '-', v.to, '之间,现在长度[', i, ']</p>');
					}else{
						b.push('<p class="hdl-vali-err">数字,长度在', v.from, '-', v.to, '之间,现在长度[', i, ']</p>');
					}
				}else if(v.type == 'num'){
					i = ipt_now.val()-0;
					if(!isNaN(i) && i >= v.from && i <= v.to){
						b.push('<p class="hdl-vali-ok">数字,大小在', v.from, '-', v.to, '之间</p>');
					}else{
						b.push('<p class="hdl-vali-err">数字,大小在', v.from, '-', v.to, '之间</p>');
					}
				}
			});
			div_pop.html(b.join(''));
			return this;
		}
	});

	//解析时使用的正则,只生成一份放置在这里.
	var  p_reg = /^(r)(.*)$/
		,p_test = /^(t)(.*)$/
		,p_len = /^(l)(\d+)(?:-(\d+))?$/
		,p_lena = /^(la)(\d+)(?:-(\d+))?$/
		,p_lenn = /^(ln)(\d+)(?:-(\d+))?$/
		,p_num = /^(n)(\d+)(?:-(\d+))?$/
		,p_reg2 = /^\/.*\/[ig]?$/
		,p_eq = /^(eq)(.*)$/
		,p_gt = /^(gt)(.*)$/
		,p_lt = /^(lt)(.*)$/;
	//解析pattern
	function parsePattern(str){
		var vali = new Validator();
		str = splitPattern(str);
		//各种不同的验证push入不同需求的item,根据type识别
		$.each(str, function(i, v){
			if(v === 'ajax'){
				vali.add({
					 type: 'ajax'
					,url: i[2]
				});
			}else if(i = v.match(p_reg)){
				vali.add({
					 type: 'reg'
					,name: i[2]
				});
			}else if(i = v.match(p_test)){
				vali.add({
					 type: 'test'
					,name: i[2]
				});
			}else if(i = v.match(p_len)){
				vali.add({
					 type: 'len'
					,from: i[2]
					,to: i[3]
				});
			}else if(i = v.match(p_lena)){
				vali.add({
					 type: 'lena'
					,from: i[2]
					,to: i[3]
				});
			}else if(i = v.match(p_lenn)){
				vali.add({
					 type: 'lenn'
					,from: i[2]
					,to: i[3]
				});
			}else if(i = v.match(p_num)){
				vali.add({
					 type: 'num'
					,from: i[2]
					,to: i[3]
				});
			}else if(i = v.match(p_reg2)){
				vali.add({
					 type: 'reg2'
					,pattern: i[0]
				});
			}else if(i = v.match(p_eq)){
				vali.add({
					 type: 'eq'
					,other: i[2]
				});
			}else if(i = v.match(p_gt)){
				vali.add({
					 type: 'gt'
					,other: i[2]
				});
			}else if(i = v.match(p_lt)){
				vali.add({
					 type: 'lt'
					,other: i[2]
				});
			}
		});
		return vali;
	}
	//将由逗号分隔的pattern进行分割,并判断'\'转义
	function splitPattern(str){
		var  idx = 0, last_idx = 0
			,arr = [], p;

		//循环每个','号
		while(idx != -1){
			idx = str.indexOf(',', idx);
			if(idx != -1){
				//有转义符号'\'向前移动1位并继续下一次
				if(str[idx-1] == '\\'){
					idx += 1;
					continue;
				//否则截取pattern
				}else{
					p = str.substring(last_idx, idx);
					idx += 1;
					last_idx = idx;
				}
			//最后一个pattern(可能也是仅有的一个)
			}else{
				p = str.substring(last_idx);
			}
			//过滤掉前后空格并将转义的'\,'换成正常的','
			arr.push(p.replace(/^\s*|\s*$/g, '').replace('\\,', ','));
		}
		return arr;
	}

	//输入框的一系列事件
	function iptFocus(e){
		ipt_now = $(this);
		popShow();
		validator = parsePattern($(this).attr('data-valid-type')).valid();
	}
	function iptClick(e){
		
	}
	function iptKeyDown(e){
		
	}
	function iptPress(e){
		
	}
	function iptKeyUp(e){
		validator.valid();
	}
	function iptChange(e){
		
	}
	function paste(e){
		
	}
	function beforePaste(e){
		
	}

	//公共显示隐藏函数
	function popShow(){
		//需要时再加载此层
		if(!div_pop.length){
			div_pop = $('<div class="hdl-vali-wrap"></div>');
			div_pop.appendTo('body');
		}
		div_pop.show().adjustElement(ipt_now);
	}
	function popHide(){
		div_pop.hide();
	}

	//注册事件,可用于手工注册
	function hdlValidator(){
		this.each(function(i, v){
			if(!v.__bind_hdl_valid){
				v.__bind_hdl_valid = true;
				$(v).focus(iptFocus).keyup(iptKeyUp);
			}
		});
	}

	//文档上监听并注册事件
	function documentClick(e){
		var  t = e.target
			,dt = $(t);
		//如已注册则忽略
		if(dt.is('input[data-valid-type]') && !t.__bind_hdl_valid){
			dt.hdlValidator();
			dt.focus();
		}
		//顺带做隐藏操作
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
	requires: ['jquery-1.4.2', 'adjustElement', 'hdlReg', 'hdlTest']
});

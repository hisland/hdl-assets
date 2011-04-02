/**********************************************************************************************
 * 名称: 表单验证控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-2-18 9:15:24
 * 版本: v1
 *
 * 注册可分3种形式:
 *		全局监听 - 局限性大,需要有事件[默认是点击]来触发才能完成注册[默认]
 *		手工注册 - 最通用,手工写初始化代码,每个页面都会有初始化代码
 *		ajaxLoad后自动注册 - 需要整站框架支持,在一个公共地方使用手工注册
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
		pattern间使用', '分隔, 若在pattern内要使用','号(正则,selector里面可能有),请加\进行转义(\自身不需要转义),如:/,,/, eq#id1,id2 ==> /\,\,/, eq#id1\,id2
		see demo.html

	pattern:
		rName					正则: 已定义的正则,在hdlReg模块中定义或者任意位置直接使用hdlReg.add(...)定义
		tName					函数: 已定义的函数,在hdlTest模块中定义或者任意位置直接使用hdlTest.add(...)定义
		ln-m					长度: 任意字符长度n-m
		lun-m					UTF8长度: 任意字符长度n-m
		lan-m					长度: 字母(含大小写)长度n-m
		lnn-m					长度: 数字长度n-m
		nn-m					数字: 值从n-m
		// //i //g				简单正则,复杂请使用regName
		ajax					异步验证,此则需要设置 data-ajax-url, data-ajax-data(可选)属性

		eqselector				对比==selector值
		gtselector				对比>selector值
		ltselector				对比<selector值

	init -> fn(pattern) -> fn(value) -> refresh:
		首先初始化一个验证方式,接受pattern来判断是否属于此方式
		如果符合则生成一个接受value来进行验证的函数,执行此函数刷新显示数据并验证通过返回true, 否则false
		通过valid方法来批量验证

	js调用,规则全部在属性上定义:
		var v = Validator(elem); 生成验证内容
		v.valid() 更新验证信息

 */

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

	//内部类,方便数据存储与处理
	function Validator(elem){
		//更改为构造方式
		if(!(this instanceof Validator)){
			return new Validator(elem);
		}

		//继续处理
		elem = $(elem);
		div_pop.empty();
		var  arr = splitPattern(elem.attr('data-valid-type'))
			,items = []
			,instance = this;

		//这两个引用放到实例上
		this.elem = elem;
		this.items = items;
		
		$.each(arr, function(i, p){
			//如果没有找到需要提示
			var found = false;
			$.each(Validator.__vali_type, function(name, fn){
				i = fn.call(instance, p);//判断函数的this指向Validator实例
				if(i){
					items.push(i);
					found = true;
					return false;//跳出循环
				}
			});
			if(!found){
				div_pop.append('<p class="hdl-vali-caution">未知验证方式: ' + p + '</p>');
			}
		});
		return this;
	}
	$.extend(Validator, {
		 __vali_type: {}
		,addValiType: function(name, initFn){//注意第一个参数不能为length, 与jquery的each方法实现有关
			this.__vali_type[name] = initFn();
			return this;
		}
	});
	$.extend(Validator.prototype, {
		valid: function(fn){//验证后可执行回调,使用回调可支持同步与异步处理
			var  i = 0
				,len = this.items.length
				,v = this.elem.val()
				,ok = true
				,rs, async;

			for(; i < len; i++){
				rs = this.items[i].call(this, v, fn);//回调函数的this指向Validator实例
				if(!rs || rs == 'loading'){
					ok = false;
				}
				if(rs == 'loading'){
					async = true;
				}
			}

			//更新输入框的红色边框
			if(!async){
				if(ok){
					this.elem.removeClass('hdl-vali-ipt-err');
				}else{
					this.elem.addClass('hdl-vali-ipt-err');
				}
				S.isFunction(fn) ? fn(ok) : 0;//所有验证成功的回调
				return ok;
			}
			//异步验证成功并检测全部成功后也回调
		}
	});

	//增加正则验证方式 - rName - 依赖hdlReg模块
	Validator.addValiType('pre-defined-reg', function(){
		var p_reg = /^(r)(.*)$/;
		return function(pattern){
				var p, reg, match = pattern.match(p_reg);
				if(match){
					reg = hdlReg.item(match[2]);
					p = $('<p class="hdl-vali-ok">' + reg.desc + '</p>');
					div_pop.append(p);
					return function(value){
						if(reg.test(value)){
							p.attr('class', 'hdl-vali-ok');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err');
							return false;
						}
					}
				}
			};
	});

	//增加自定义函数验证方式 - tName - 依赖hdlTest模块
	Validator.addValiType('self-defined-function', function(){
		var p_reg = /^(t)(.*)$/;
		return function(pattern){
				var p, reg, match = pattern.match(p_reg);
				if(match){
					reg = hdlTest.item(match[2]);
					p = $('<p class="hdl-vali-ok">' + reg.desc + '</p>');
					div_pop.append(p);
					return function(value){
						if(reg.test(value)){
							p.attr('class', 'hdl-vali-ok');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err');
							return false;
						}
					}
				}
			};
	});

	//增加异步验证方式 - ajax - 需要指定url - TODO
	Validator.addValiType('ajax', function(){
		return function(name){
				var p, url, data, msg, req, last_val, timer = 0, post_delay = 500;
				if(name === 'ajax'){
					msg = this.elem.attr('data-valid-msg') || '不能与服务器数据相同';
					p = $('<p class="hdl-vali-loading">' + msg + '</p>');
					div_pop.append(p);
					url = this.elem.attr('data-ajax-url');
					data = this.elem.attr('data-ajax-data');
					if(data && data.indexOf('fn:') == 0){
						data = S.getNS(data.replace('fn:', ''));
					}
					return function(value, callback){
						var ipt = this.elem;

						//值为空不与服务器通信,并设置输入框状态
						if(!value){
							p.attr('class', 'hdl-vali-err');
							return false;
						}
						//值没改变时不与服务器通信,并设置输入框状态
						if(value == last_val){
							if(p.is('.hdl-vali-ok') && !p.siblings('.hdl-vali-err').length){
								return true;
							}
							return false;
						}
						last_val = value;

						if(!url){
							p.attr('class', 'hdl-vali-err').html('此异步验证url不正确!');
							return false;
						}else{
							data = S.isFunction(data) ? data() : data;
							data = (data ? data + '&' : '') + this.elem.attr('name') + '=' + this.elem.val();
							p.attr('class', 'hdl-vali-loading');
							ipt.addClass('hdl-vali-ipt-err');
							clearTimeout(timer);
							if(req){
								try{
									req.abort();
									req = null;
								}catch(e){}//ie调用abort方法会出错,这里阻止出错提示,可考虑改jquery ajax 方法实现中 oldAbort.call 的调用
							}
							S.isFunction(callback) ? callback(false) : 0;
							timer = setTimeout(function(){
								req = $.post(url, data, function(data){
									if(data == 'true'){
										p.attr('class', 'hdl-vali-ok');
										if(!p.siblings('.hdl-vali-err').length){
											ipt.removeClass('hdl-vali-ipt-err');
											S.isFunction(callback) ? callback(true) : 0;
										}
										S.isFunction(callback) ? callback(false) : 0;
									}else{
										p.attr('class', 'hdl-vali-err');
										S.isFunction(callback) ? callback(false) : 0;
									}
								});
							}, post_delay);
							return 'loading';
						}
					}
				}
			};
	});

	//增加任意字符长度验证方式 - ln-m
	Validator.addValiType('length-all', function(){//注意第一个参数不能为length, 与jquery的each方法实现有关
		var p_reg = /^(l)(\d+)(?:-(\d+))?$/;
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2];
					to = match[3];
					p = $('<p class="hdl-vali-ok">字符串长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return function(value, length){
						length = value.length;
						if(length >= from && length <= to){
							p.attr('class', 'hdl-vali-ok').html('字符串长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err').html('字符串长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return false;
						}
					}
				}
			};
	});

	//增加任意字符UTF8长度验证方式 - lun-m
	Validator.addValiType('length-utf8', function(){
		var p_reg = /^(lu)(\d+)(?:-(\d+))?$/;

		//得到字符串utf8长度
		function lengthUTF8(str) {
			var i = 0, code, len = 0;
			for (; i < str.length; i++) {
				code = str.charCodeAt(i);
				if (code < 0x007f) {
					len += 1;
				} else if (code >= 0x0080 && code <= 0x07ff) {
					len += 2;
				} else if (code >= 0x0800 && code <= 0xffff) {
					len += 3;
				}
			}
			return len;
		}
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2];
					to = match[3];
					p = $('<p class="hdl-vali-ok">字符串UTF8长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return function(value, length){
						length = lengthUTF8(value);
						if(length >= from && length <= to){
							p.attr('class', 'hdl-vali-ok').html('字符串UTF8长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err').html('字符串UTF8长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return false;
						}
					}
				}
			};
	});

	//增加字母(含大小写)长度验证方式 - lan-m
	Validator.addValiType('length-[a-z]-ignore-case', function(){
		var p_reg = /^(la)(\d+)(?:-(\d+))?$/;
		var p_az = /^[a-z]+$/i;
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2];
					to = match[3];
					p = $('<p class="hdl-vali-ok">a-z大小写,长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return function(value, length){
						length = value.length;
						if(p_az.test(value) && length >= from && length <= to){
							p.attr('class', 'hdl-vali-ok').html('a-z大小写,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err').html('a-z大小写,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return false;
						}
					}
				}
			};
	});

	//增加数字长度验证方式 - lnn-m
	Validator.addValiType('length-number', function(){
		var p_reg = /^(ln)(\d+)(?:-(\d+))?$/;
		var p_num = /^\d+$/i;
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2];
					to = match[3];
					p = $('<p class="hdl-vali-ok">数字,长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return function(value, length){
						length = value.length;
						if(p_num.test(value) && length >= from && length <= to){
							p.attr('class', 'hdl-vali-ok').html('数字,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err').html('数字,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
							return false;
						}
					}
				}
			};
	});

	//增加数字值大小验证方式 - nn-m
	Validator.addValiType('number-value', function(){
		var p_reg = /^(n)(\d+)(?:-(\d+))?$/;
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2];
					to = match[3];
					p = $('<p class="hdl-vali-ok">数字,长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return function(value, length){
						value -= 0;
						if(!isNaN(value) && value >= from && value <= to){
							p.attr('class', 'hdl-vali-ok').html('数字,大小在' + from + '-' + to + '之间');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err').html('数字,大小在' + from + '-' + to + '之间');
							return false;
						}
					}
				}
			};
	});

	//增加自定义正则验证方式 - // //i //g - 为正则字面量的写法,最好简单点,复杂的在hdlReg中增加并使用正则验证方式
	Validator.addValiType('self-defined-reg', function(){
		var p_reg = /^\/(.*)\/(g|i|gi|ig)?$/;
		return function(pattern){
				var p, reg, match = pattern.match(p_reg);
				if(match){
					reg = new RegExp(match[1], match[2]);
					p = $('<p class="hdl-vali-ok">' + (this.elem.attr('data-valid-msg') || '自定义正则验证') + '</p>');
					div_pop.append(p);
					return function(value){
						if(reg.test(value)){
							p.attr('class', 'hdl-vali-ok');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err');
							return false;
						}
					}
				}
			};
	});

	//增加对比验证-等于 - eqselector - eq某个selector的值
	Validator.addValiType('eq-selector', function(){
		var p_reg = /^(eq)(.*)$/;
		return function(pattern){
				var p, other, match = pattern.match(p_reg);
				if(match){
					other = $(match[2]);
					p = $('<p class="hdl-vali-ok">等于验证: 应等于' + other.val() + '</p>');
					div_pop.append(p);
					return function(value){
						value -= 0;
						if(value == other.val()){
							p.attr('class', 'hdl-vali-ok');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err');
							return false;
						}
					}
				}
			};
	});

	//增加对比验证-大于 - gtselector - gt某个selector的值
	Validator.addValiType('gt-selector', function(){
		var p_reg = /^(gt)(.*)$/;
		return function(pattern){
				var p, other, match = pattern.match(p_reg);
				if(match){
					other = $(match[2]);
					p = $('<p class="hdl-vali-ok">应该大于' + other.val() + '</p>');
					div_pop.append(p);
					return function(value){
						value -= 0;
						if(value > other.val()){
							p.attr('class', 'hdl-vali-ok');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err');
							return false;
						}
					}
				}
			};
	});

	//增加对比验证-小于 - ltselector - lt某个selector的值
	Validator.addValiType('lt-selector', function(){
		var p_reg = /^(lt)(.*)$/;
		return function(pattern){
				var p, other, match = pattern.match(p_reg);
				if(match){
					other = $(match[2]);
					p = $('<p class="hdl-vali-ok">应该小于' + other.val() + '</p>');
					div_pop.append(p);
					return function(value){
						value -= 0;
						if(value < other.val()){
							p.attr('class', 'hdl-vali-ok');
							return true;
						}else{
							p.attr('class', 'hdl-vali-err');
							return false;
						}
					}
				}
			};
	});

	//输入框的一系列事件
	function iptFocus(e){
		if(ipt_now[0] != this){
			ipt_now = $(this);
			popShow();
			validator = Validator(this);
			validator.valid();
		}else{
			popShow();
		}
	}
	function iptKeyUp(e){
		validator.valid();
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
	function hdlValidator(callback){
		this.each(function(i, v){
			if(!v.__bind_hdl_valid){
				v.__bind_hdl_valid = true;

				//注册的时候更新状态信息
				Validator(v).valid(callback);

				//ctrl+v ie在keyup中判断,ff在paste中判断
				//右键菜单粘贴 都在paste中判断
				$(v).focus(iptFocus).keyup(iptKeyUp).bind('paste',iptKeyUp);//paste 与 keyup处理一样,使用同一个函数
			}
		});
		return this;
	}

	//文档上监听并注册事件
	function documentClick(e){
		var  t = e.target
			,dt = $(t);
		//如已注册则忽略
		if(!t.__bind_hdl_valid && dt.is('input[data-valid-type], textarea[data-valid-type]')){
			dt.hdlValidator();
			dt.focus();
		}
		//顺带做隐藏操作
		if(!dt.closest('.hdl-vali-wrap, input[data-valid-type], textarea[data-valid-type]').length){
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

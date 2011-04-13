/**********************************************************************************************
 * 名称: 表单验证控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-4-12 17:9:55
 * 版本: v1.1
 * 
 * 2011-4-11 14:35:14 - 多异步支持
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
		pattern间使用[, ]分隔, 若在pattern内要使用','号(正则,selector里面可能有),请加\进行转义(\自身不需要转义),
			如:/,,/ ==> /\,\,/ 和 eq#id1,id2 ==> eq#id1\,id2
		更多查看 demo.html

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

	Validator.addValiType -> fn(pattern) -> fn(value, fn2) -> fn2(rs):
		首先初始化一个验证方式,接受pattern来判断是否属于此方式
		如果符合则生成一个接受value来进行验证的函数,
		执行此函数进行验证并将结果传入回调fn2

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
	function Validator(success){
		//更改为构造方式
		if(!(this instanceof Validator)){
			return new Validator(success);
		}

		this.items = [];
		this.inputs = $('');
		this.success = success;

		return this;
	}
	$.extend(Validator, {
		 __vali_type: {}
		,addValiType: function(name, initFn){//注意第一个参数[name]不能为length, 与jquery的each方法实现有关
			this.__vali_type[name] = initFn();
			return this;
		}
	});
	$.extend(Validator.prototype, {
		 valid: function(input){
			var  timer = 0
				,instance = this
				,ok = true
				,async = false;

			//不传参表示检测所有input,使用递归
			if(!input){
				this.inputs.each(function(i, v){
					instance.valid(v);
				});
				return this;
			}

			$.each(input.items, function(i, v){
				v.fn(v.input.val(), check);
			});

			function check(rs){
				if(rs === false){
					ok = false;
				}
				if(rs === 'loading'){
					async = true;
				}
				if(rs === 'async-true' || rs === 'async-false'){//异步返回
					async = false;
					if(rs === 'async-false'){//同步和异步都在false的情况下修改为false其它情况不动,保证有不通过的时候回调传出都为false
						ok = false;
					}
				}
				clearTimeout(timer);
				timer = setTimeout(delayCheck, 10);//使用延迟避免同一个输入多个pattern的执行多次调用delayCheck
			}
			function delayCheck(){
				if(!async && ok){
					$(input).removeClass('hdl-vali-ipt-err');
					instance.success(true);
				}else{
					$(input).addClass('hdl-vali-ipt-err');
					instance.success(false);
				}
			}

			return this;
		}
		,add: function(elem, pattern){//给某元素添加一个[批]验证方式
			var  instance = this
				,arr = splitPattern(pattern)
				,items = elem[0].items || (elem[0].items = []);

			$.each(arr, function(i, p){
				var found = false;
				$.each(Validator.__vali_type, function(name, fn){
					i = fn.call(instance, p, elem);//判断函数的this指向Validator实例
					if(i){
						found = true;
						return false;//找到即跳出循环
					}
				});

				//未知验证使用空函数替代
				if(!found){
					i = {fn: function(){}};
					i.p = $('<p class="hdl-vali-caution">未知验证方式: ' + p + '</p>');
				}

				i = {
					 input: elem
					,validator: instance
					,passed: 0//通过与否状态, 0未通过, 1通过
					,fn: i.fn
					,p: i.p
				};
				items.push(i);
				instance.items.push(i);
				instance.inputs = instance.inputs.add(elem);
			});

			return this;
		}
		,allPassed: function(){//检查是否全部通过
			var passed = 1;
			$.each(this.items, function(i, v){
				if(!v.passed){
					passed = 0;
					return false;
				}
			});
			return passed;
		}
	});

	//增加正则验证方式 - rName - 依赖hdlReg模块
	Validator.addValiType('pre-defined-reg', function(){
		var p_reg = /^(r)(.*)$/;
		return function(pattern){
				var p, reg, match = pattern.match(p_reg);
				if(match){
					reg = hdlReg.item(match[2]);
					p = $('<p class="hdl-vali-err">' + reg.desc + '</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								if(reg.test(value)){
									p.attr('class', 'hdl-vali-ok');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					p = $('<p class="hdl-vali-err">' + reg.desc + '</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								if(reg.test(value)){
									p.attr('class', 'hdl-vali-ok');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
				}
			};
	});

	//增加异步验证方式 - ajax - 需要指定url
	Validator.addValiType('ajax', function(){
		return function(name, elem){
				var p, url, msg, req, last_val, timer = 0, post_delay = 500;
				if(name === 'ajax'){
					msg = elem.attr('data-valid-msg') || '不能与服务器数据相同';
					p = $('<p class="hdl-vali-loading">' + msg + '</p>');
					div_pop.append(p);
					url = elem.attr('data-ajax-url');
					data = elem.attr('data-ajax-data');
					if(data && data.indexOf('fn:') == 0){
						data = S.getNS(data.replace('fn:', ''));
					}
					return {
							fn: function(value, fn){
								var item = this, data;

								//值为空不与服务器通信,并设置输入框状态
								if(!value){
									p.attr('class', 'hdl-vali-err');
									item.passed = 0;
									fn(false);
									return ;
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
									p.attr('class', 'hdl-vali-err').html('此异步验证url未设置!');
									item.passed = 0;
									fn(false);
								}else{
									//拼凑请求参数
									data = S.isFunction(data) ? data() : data;
									data = (data ? data + '&' : '') + elem.attr('name') + '=' + elem.val();

									//设置异步状态
									item.passed = 0;
									fn('loading');
									p.attr('class', 'hdl-vali-loading');

									//设置异步状态
									clearTimeout(timer);
									if(req){
										try{
											req.abort();
											req = null;
										}catch(e){}//ie调用abort方法会出错,这里阻止出错提示,可考虑改jquery ajax 方法实现中 oldAbort.call 的调用
									}
									timer = setTimeout(function(){
										req = $.post(url, data, function(data){
											if(data == 'true'){
												p.attr('class', 'hdl-vali-ok');
												console.log(!p.siblings('.hdl-vali-err').length);
												if(!p.siblings('.hdl-vali-err').length){
													item.passed = 1;
													fn('async-true');
												}else{
													item.passed = 0;
													fn('async-false');
												}
											}else{
												p.attr('class', 'hdl-vali-err');
												item.passed = 0;
												fn('async-false');
											}
										});
									}, post_delay);
								}
							}
							,p: p
					};
				}
			};
	});

	//增加任意字符长度验证方式 - ln-m
	Validator.addValiType('length-all', function(){//注意第一个参数不能为length, 与jquery的each方法实现有关
		var p_reg = /^(l)(\d+)(?:-(\d+))?$/;
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2]-0;
					to = match[3]-0;
					p = $('<p class="hdl-vali-err">字符串长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn, length){
								length = value.length;
								if(length >= from && length <= to){
									p.attr('class', 'hdl-vali-ok').html('字符串长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('字符串长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					from = match[2]-0;
					to = match[3]-0;
					p = $('<p class="hdl-vali-err">字符串UTF8长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn, length){
								length = lengthUTF8(value);
								if(length >= from && length <= to){
									p.attr('class', 'hdl-vali-ok').html('字符串UTF8长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('字符串UTF8长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					from = match[2]-0;
					to = match[3]-0;
					p = $('<p class="hdl-vali-err">a-z大小写,长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn, length){
								length = value.length;
								if(p_az.test(value) && length >= from && length <= to){
									p.attr('class', 'hdl-vali-ok').html('a-z大小写,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('a-z大小写,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					from = match[2]-0;
					to = match[3]-0;
					p = $('<p class="hdl-vali-err">数字,长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn, length){
								length = value.length;
								if(p_num.test(value) && length >= from && length <= to){
									p.attr('class', 'hdl-vali-ok').html('数字,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('数字,长度在' + from + '-' + to + '之间,现在长度[' + length +']');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
				}
			};
	});

	//增加数字值大小验证方式 - nn-m
	Validator.addValiType('number-value', function(){
		var p_reg = /^(n)(\d+)(?:-(\d+))?$/;
		return function(pattern){
				var p, from, to, match = pattern.match(p_reg);
				if(match){
					from = match[2]-0;
					to = match[3]-0;
					p = $('<p class="hdl-vali-err">数字,长度在' + from + '-' + to + '之间,现在长度[0]</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								value -= 0;
								if(!isNaN(value) && value >= from && value <= to){
									p.attr('class', 'hdl-vali-ok').html('数字,大小在' + from + '-' + to + '之间');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('数字,大小在' + from + '-' + to + '之间');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
				}
			};
	});

	//增加自定义正则验证方式 - // //i //g - 为正则字面量的写法,最好简单点,复杂的在hdlReg中增加并使用正则验证方式
	Validator.addValiType('self-defined-reg', function(){
		var p_reg = /^\/(.*)\/(g|i|gi|ig)?$/;
		return function(pattern, elem){
				var p, reg, match = pattern.match(p_reg);
				if(match){
					reg = new RegExp(match[1], match[2]);
					p = $('<p class="hdl-vali-err">' + (elem.attr('data-valid-msg') || '自定义正则验证') + '</p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								if(reg.test(value)){
									p.attr('class', 'hdl-vali-ok');
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err');
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					p = $('<p class="hdl-vali-err"></p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								value -= 0;
								if(value == other.val()){
									p.attr('class', 'hdl-vali-ok').html('应该等于' + other.val());
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('应该等于' + other.val());
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					p = $('<p class="hdl-vali-err"></p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								value -= 0;
								if(value > other.val()){
									p.attr('class', 'hdl-vali-ok').html('应该大于' + other.val());
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('应该大于' + other.val());
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
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
					p = $('<p class="hdl-vali-err"></p>');
					div_pop.append(p);
					return {
							fn: function(value, fn){
								value -= 0;
								if(value < other.val()){
									p.attr('class', 'hdl-vali-ok').html('应该小于' + other.val());
									this.passed = 1;
									fn(true);
								}else{
									p.attr('class', 'hdl-vali-err').html('应该小于' + other.val());
									this.passed = 0;
									fn(false);
								}
							}
							,p: p
					};
				}
			};
	});

	//输入框的一系列事件
	function iptFocus(e){
		//需要时再加载此层
		if(!div_pop.length){
			div_pop = $('<div class="hdl-vali-wrap"></div>');
			div_pop.appendTo('body');
		}
		if(ipt_now[0] != this){
			ipt_now = $(this);
			div_pop.empty();
			$.each(this.items, function(i, v){
				div_pop.append(v.p);
			});
		}
		popShow();
	}
	function iptKeyUp(e){
		var ipt = $(this);
		this.validator.valid(this);
	}
	function formSubmit(e){
		if(!this.validator.allPassed()){
			S.log('not all passed!');
			return false;
		}
	}

	//公共显示隐藏函数
	function popShow(){
		div_pop.show().adjustElement(ipt_now);
	}
	function popHide(){
		div_pop.hide();
	}

	//全局隐藏操作
	function documentClick(e){
		//不在此范围内做隐藏操作
		if(!$(e.target).closest('.hdl-vali-wrap, input[data-valid-type], textarea[data-valid-type]').length){
			popHide();
		}
	}
	$(document).click(documentClick);

	//给form注册验证
	function hdlValidator(callback){
		return this.each(function(i, v){
			var dv = $(v), fn, validator, btn_submit;
			if(dv.is('form')){
				//保留submit的引用,方便控制disabled状态
				btn_submit = $(dv.attr('data-submit-button')).add(dv.find(':submit'));

				//验证成功与否的回调, 用于修改submit的disabled状态, this被指向validator
				fn = function(rs){
					if(rs && this.allPassed()){
						btn_submit.attr('disabled', false);
					}else{
						btn_submit.attr('disabled', true);
					}
				}

				//生成一个验证对象并保存引用
				this.validator = validator = Validator(fn);

				//循环form内的每个输入框并注册事件
				dv.find('input[data-valid-type], textarea[data-valid-type]').each(function(i, v){
					if(!v.__bind_hdl_valid){
						v.__bind_hdl_valid = true;

						//input上也保存一个引用
						this.validator = validator;

						//提取验证信息
						v = $(v);
						validator.add(v, v.attr('data-valid-type'));

						//ctrl+v ie在keyup中判断,ff在paste中判断
						//右键菜单粘贴 都在paste中判断
						//paste 与 keyup处理一样,使用同一个函数
						v.focus(iptFocus).keyup(iptKeyUp).bind('paste',iptKeyUp);
					}
				});

				//在input里面回车也可提交,统一在submit事件里面进行控制
				dv.bind('submit', formSubmit);

				//初始化测试,设置input的状态
				validator.valid();
			}else{
				S.log(['hdlValidator错误: ', v, '应该是一个form']);
			}
		});
	}
	//添加一个验证方式
	function addValiType(pattern){
		return this.each(function(i, v){
			if($.isString(pattern)){
				
			}
		});
	}
	//删除一个验证方式
	function removeValiType(pattern){//pattern为具体名称或编号[从0开始]
		return this.each(function(i, v){
			if($.isString(pattern)){
				
			}else if($.isNumber(pattern)){
				
			}else{
				S.log(['removeValiType错误: ', pattern]);
			}
		});
	}

	//放到jq原型链上
	$.fn.extend({
		 hdlValidator: hdlValidator
		,addValiType: addValiType
		,removeValiType: removeValiType
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'hdlReg', 'hdlTest']
});

/**********************************************************************************************
 * 名称: 表单验证控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-07-07 11:45:42
 * 版本: v2
 * 
 * NOTICE:
	触发事件:
			focus	显示验证信息
			keydown	控制输入
			keyup	更正内容
			change	检测
	属性:
			maxlength	最大长度
			minlength	最小长度
			min/max		最小/最大值 - 表示此只能输入数字 同时指定一个step属性,否则默认增量为1
			step		值的递增步长
			pattern		输入内容需要匹配的模式
			required	此项必填
	验证情况:
			valiFunc	函数验证
			valiReg		正则验证
			valiNormal	一般验证
	自定义事件:
			textChange	函数

	TODO:
	2011-3-21 12:40:50考虑
	usage:
		data-valid-type="pattern, pattern, pattern"
		pattern使用[, ]分隔, 若在pattern内要使用','号(正则,selector里面可能有),请加\进行转义(\自身不需要转义),
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

		=selector				对比==selector值
		!=selector				对比!=selector值
		>selector				对比>selector值
		<selector				对比<selector值

	Validator.addValiType -> fn(pattern) -> fn(value, fn2) -> fn2(rs):
		首先初始化一个验证方式,接受pattern来判断是否属于此方式
		如果符合则生成一个接受value来进行验证的函数,
		执行此函数进行验证并将结果传入回调fn2

	2011-4-11 14:35:14:
		多异步支持

	2011-4-15 9:4:38:
		pattern 使用 a && (b || c) 将每个pattern等量替换执行可得结果, 此设置为属性, 将对应abc的值算出来再代入此计算,简化设计
			data-valid-rule="a && (b || c)"
		nn-m数字设置为实数
		nn-m自定义提示,使用{from} {to}引用值

	2011-5-5 10:50:43:
		完成触发input的change事件

	2011-5-14 16:54:0:
		滚动的时候消失
		属性指定不显示提示层cnotip
		全局控制不显示提示层form的属性data-valid-notip="true"

	2011-5-25 10:47:32:
		直接js代码直接添加验证方式,类似formValidator的实现
		firefox右键粘贴,鼠标点击自动完成的填充无法触发事件(或者是触发的事件的时候值还没被修改)
		数字长度可以为0时,不测试值是否为数字
		验证失去焦点后,自动把值修正,如去首尾空格...
		pattern里面可以带c前缀的设置,如ctrim
		可以在层上面写验证,验证内部的一个结构,如checkbox至少选2个,这里需要在hover上显示验证消息
		取pattern时,过滤掉错误以及异常

	2011-05-31 19:00:56:
		层上初始化验证,指定触发按钮
	2011-06-10 10:54:53:
		使用函数验证时,根据返回的文本内容进行提示,而不是固定的提示,只有返回true表示成功
		考虑验证方式的判定使用多个字符,避免出现某个方式判定在另一个方式里导致错误,如: l, ln, 
			以前的l -> lenall:
			以前的lu -> lenutf8:
			以前的la -> lenletter:
			以前的ln -> lenint:
			以前的n -> int:
			以前的r -> reg:
			以前的t -> fn:
		对比验证,单向联动,双向联动
		提交时统一验证一次,并设置状态

	2011-06-28 09:09:52:
		数字值验证注意含[eE]的情况会被当作指数处理

	2011-07-04 18:15:58:
		禁用和readonly的都应该[不检测]且[通过]也[不显示验证状态]
		每个item的状态可选择[显示|不显示]
		input验证成功或失败使用回调[每次回调|状态切换回调]
		form验证成功或失败使用回调[每次回调|状态切换回调]

	2011-07-07 11:11:36:
		ie使用 propertychange 事件进行监听,避免autocomplete填充导致没有监听到
		或者在注册时就设置autocomplete为false
		
	2011-07-18 12:45:46:
		需要验证的input或form禁止浏览器的autocomplete

	2011-08-05 09:22:37:
		增加验证规则使用方法形式:
			must(patterns)增加必填项
			optional(patterns)增加可选项,如果输入还是要符合规则
	
	2011-09-11 15:31:08:
		ie不支持[]方式取子字符串,使用substr方式取, 改为使用charAt(n)
	
	2011-10-03 16:30:41:
		数字验证先使用正则检测是否为全数字再进行转换
		前置0, 前置0x, eE指数, 后置0
	
	2011-10-09 17:12:43:
		调用canEmpty()可以为空 - 使用required()方法
	
	2011-10-19 15:53:59:
		各种验证可以直接在外面调用
	
	2011-11-08 22:31:38:
		采用js代码方式进行注册,不使用html属性
		charlen(n, m);				//字符长度n-m, n<=m, 整数
		utf8len(n, m);				//utf8长度n-m, n<=m, 整数

		intRange(n, m);				//整数值范围n-m
		numberRange(n, m);			//数字值范围n-m, 整数小数皆可, 不含指数的情况

		reg(reg, rev);				//正则正则, 是否取反
		fn(a, b, c...);				//自定义函数,可一次性提供多个,全部通过才行
		fnOr(a, b, c...);			//自定义函数,可一次性提供多个,任意一个通过都可以
		pre(name, name...);			//预定义验证规则,由validString模块提供,可一次性提供多个,全部通过才行
		preOr(name, name...);			//预定义验证规则,由validString模块提供,可一次性提供多个,任意一个通过都可以

		trimBefore(true|false);		//验证前是否去前后空格,默认不去
		required(true|false);		//是否必填,默认可为空

		gt(selector);				//大于另一个
			gt(selector, 'double');	//大于另一个,双向触发
			gt(selector, 'single');	//大于另一个,单向触发
		lt(selector|string|number);	//小于另一个
		eq(selector|string|number)	//等于另一个
		neq(selector|string|number)	//不能等于另一个

		group(n);					//设置当前验证的上下文,默认是1

		setMsg('charlen', '长度为${from}-${to}');				//设置某种验证的说明信息
	2011-11-14 14:28:18:
		对于某些提示里面可以出现变量的情况,使用${xxx}方式进行提供,如 ${from}, ${to}, ${length}, ...
 */

KISSY.add('hdlValidator', function(S, undef) {
	var $ = jQuery,
		__prefix = '-hdl-validator-',
		EMPTY = '';

	function itemSetting(){
		this.__init();
	}
	S.augment(itemSetting, {
		__init: function(){
			this._group = 1;
			return this;
		},
		__group: function(){
			if(!this['group' + this._group]){
				this['group' + this._group] = {};
			}
			return this['group' + this._group];
		},
		group: function(n){
			if(S.isNumber(n)){
				this._group = n;
			}else{
				S.log('$().hdlValidator().group(n): n must be a number!', 'warn');
			}
			return this;
		},
		charlen: function(n, m){
			if(n > m){
				S.log('$().hdlValidator().charlen(n, m): n must <= m!', 'warn');
				return ;
			}
			if(this.__group()[__prefix + 'charlen']){
				S.log('$().hdlValidator().charlen(n, m): charlen has been set!', 'warn');
				return ;
			}

			this.__group()[__prefix + 'charlen'] = {
				fn: function(str){
					var len = (EMPTY + str).length;
					if(len >= n && len <= m){
						this.valid = true;
					}else{
						this.valid = false;
					}
				}
			};

			return this;
		},
		valid: function(str){
			//外面的组都是且关系,全部通过才验证成功
			S.each(this.__group(), function(v, i, o){
				//为数组时,表示或关系,只要有一个通过该组就通过
				if(S.isArray(v)){
					S.each(v, function(v, i, o){
						v.fn(str);
					});
				}else{
					v.fn(str);
				}
			});
			return this;
		},
		isValid: function(){
			var ok = true;
			//外面的组都是且关系,全部通过才验证成功
			S.each(this.__group(), function(v, i, o){
				//为数组时,表示或关系,只要有一个通过该组就通过
				if(S.isArray(v)){
					var ok2 = false;
					S.each(v, function(v, i, o){
						if(v.valid){
							ok2 = true;
							return false;//break;
						}
					});
					if(!ok2){
						ok = false;
						return false;//break;
					}
				}else if(!v.valid){
					ok = false;
					return false;//break;
				}
			});
			return ok;
		}
	});

	function formSubmit(e){
		if(this.allValid){
			
		}else{
			e.preventDefault();
		}
	}

	function iptFocus(e){
		
	}
	function iptInput(e){
		$(this).data('--valid-setting').valid(this.value);
	}
	function iptBlur(e){
		
	}

	$.fn.extend({
		hdlValidator: function(setting){
			if(S.isFunction(setting)){
				setting = {callback: setting};
			}else if(S.isPlainObject(setting)){
				
			}else if(S.isString(setting)){
				
			}

			this.each(function(i, v){
				//只初始化一次
				if(!$(this).data('--valid-setting')){
					$(this).data('--valid-setting', new itemSetting());
					$(this).focus(iptFocus).input(iptInput).blur(iptBlur);
				}
			});

			return this.data('--valid-setting');
		}
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'validString', 'jquery.input']
});

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
 */

KISSY.add('hdlValidator', function(S, undef) {
	//将由逗号分隔的pattern进行分割,并判断'\'转义
	function splitPattern(str){
		var  idx = 0, last_idx = 0
			,arr = [], p;

		//循环每个','号
		while(idx != -1){
			idx = str.indexOf(',', idx);
			if(idx != -1){
				//有转义符号'\'向前移动1位并继续下一次
				//ie不支持[]方式取子字符串,改为使用charAt(n)
				if(str.charAt(idx-1) == '\\'){
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
			arr.push(p.replace(/^\s*|\s*$/g, '').replace(/\\,/g, ','));
		}
		return arr;
	}

	//执行生成uid, native与dom都通过id进行交流
	//使用kissy的guid
	var uid = function(){
		return S.guid('hdl-validator-');
	};

	function Validator(setting){
		//更改为构造方式
		if(!(this instanceof Validator)){
			return new Validator(setting);
		}

		//设置回调函数
		this.statusChange = setting.statusChange;
		this.doValide = setting.doValide;

		//设置内部属性
		this.form_id = setting.form_id;
		this.error_focus = setting.error_focus;
		this.enable_tips = setting.enable_tips;

		//内部属性
		this.items = [];
		this.last_passed = 0;
	}
	S.mix(Validator, {
		 __vali_types: {}
		,addValiType: function(name, initFn){//注意第一个参数[name]不能为length, 与jquery的each方法实现有关
			this.__vali_types[name] = initFn();
			return this;
		}
	});
	S.augment(Validator, {
		 validate: function(){
			var i = 0, items = this.items, len = items.length;
			for(var i=0; i<len; i++){
				items[i].validate();
			}
		}
		//添加item
		,add: function(item){
			this.items.push(item);
		}
		//删除指定的item
		,remove: function(idx){
			var item = this.items.splice(idx, 1);
			delete $('#' + item.elem_id)[0].valid_items;
		}
		//检查是否全部通过
		,allPassed: function(){
			var passed = 1;
			$.each(this.items, function(i, v){
				if(!v.passed && v.active){
					passed = 0;
					return false;
				}
			});
			return passed;
		}
	});

	function Items(setting){
		//更改为构造方式
		if(!(this instanceof Items)){
			return new Items(setting);
		}

		this.items = [];
		this.active = true;
		this.elem_id = '';

		this.__linkageFns = [];
		this.__validateFns = [];
		this.__last_passed = 0;
	}
	S.augment(Items, {
		 setRule: function(rule){
			this.rule = rule;
		}
		,add: function(str){
			this.items.push(str);
		}
		,remove: function(idx){
			this.items = this.items.splice(idx, 1);
		}
		,validate: function(str){
			var i = 0, items = this.items, len = items.length;
			for(var i=0; i<len; i++){
				items[i].fn(str);
			}
		}
	});


	var  $ = jQuery
		,EMPTY_$ = $('');

	$.fn.extend({
		 //初始化或者修改验证设置
		 hdlValidator: function(setting){
			return this.each(function(i, v){
				var dv = $(v), fn, validator, btn_submit, btn_type_submit;
				if(dv.is('form')){
					//保留submit的引用,方便控制disabled状态
					btn_submit = $(dv.attr('data-submit-button'));
					btn_type_submit = dv.find(':submit');

					//代提交按钮点击需要触发form的submit事件
					$(btn_submit).click(function(){
						dv.submit();
					});

					//验证成功与否的回调, 用于修改submit的disabled状态, this被指向validator
					fn = function(rs){
						//this指向validator
						if(rs && this.allPassed()){
							btn_submit.add(btn_type_submit).attr('disabled', false);
							S.isFunction(callback) && callback(false);
						}else{
							btn_submit.add(btn_type_submit).attr('disabled', true);
							S.isFunction(callback) && callback(true);
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
							v.focus(iptFocus).blur(iptBlur).keyup(iptKeyUp).bind('paste',iptKeyUp);
						}
					});

					//在input里面回车也可提交,统一在formSubmit函数里面进行控制
					dv.bind('submit', formSubmit);

					//初始化测试,设置input的状态
					validator.valid();
				}else{
					S.log(['hdlValidator错误: ', v, '应该是一个form']);
				}
			});
		}
		//添加一个验证
		,addValiType: function(pattern){
			return this.each(function(i, v){
				if($.isString(pattern)){
					v.valid_items.add(pattern);
				}else{
					S.log('error at addValiType: pattern must be a valid string');
				}
			});
		}
		//删除指定位置的验证
		,removeValiType: function(num){
			return this.each(function(i, v){
				if($.isNumber(num)){
					v.valid_items.remove(num);
				}else{
					S.log('error at removeValiType: num must be a number');
				}
			});
		}
		//修改input上验证的启用与否,不传参表示取反
		,toggleValiActive: function(active){
			return this.each(function(i, v){
				v.valid_items.active = S.isUndefined(active) ? 
										(v.valid_items.active ? false : true)
										: (active ? true : false);
			});
		}
		//执行一次验证
		,validate: function(){
			return this.each(function(i, v){
				me = $(v);
				if(me.is('form') && v.validator){
					v.validator.validate();
				}else if(me.is('[data-valid-type]') && v.valid_items){
					v.valid_items.validate();
				}
			});
		}
	});
}, {
	requires: ['jquery-1.4.2', 'adjustElement', 'hdlReg', 'hdlTest']
});

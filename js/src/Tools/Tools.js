/**
 * @fileOverview
 * @author hisland hisland@qq.com
 * @description 工具集
 */

KISSY.add('Tools', function(S, undef) {
	/**
	 * 工具集
	 * @namespace
	 * @name Tools
	 */
	var Tools = window.Tools = {};

	/**
	 * 执行n次
	 * @param fn 需要执行的函数, 参数1接收第几次执行, 从0开始计数
	 * @param n 大于0的数字, 执行次数
	 */
	Tools.doTimes = function(fn, n){
		for(var i=0; i<n; i++){
			fn(i);
		}
	}

	/**
	 * 延迟执行n次, 采用setTimeout保证串行执行
	 * @param fn 需要执行的函数, 参数1接收第几次执行, 从0开始计数
	 * @param n 大于0的数字, 执行次数
	 * @param delay 大于10的数字, 间隔时间,单位ms, 默认为10ms
	 */
	Tools.delayTimes = function(fn, n, delay){
		var i = 0;
		delay = delay > 10 ? delay : 10;
		function callback(){
			if(i < n){
				fn(i);
				setTimeout(callback, delay);
			}
		}
		callback();
	}


	/**
	 * 过一会儿执行函数,且在执行之前可以重新设置函数与延迟并重新开始计时
	 * @class 
	 * @param fn 需要执行的函数
	 * @param delay 大于50的数字, 间隔时间,单位ms, 默认为50ms
	 */
	Tools.laterOne = function(fn, delay){
		return new laterOne(fn, delay);
	}
	function laterOne(fn, delay){
		this.setFn(fn).setDelay(delay);
	}
	/**
	 * @lends Tools.laterOne#
	 */
	S.augment(laterOne, {
		/**
		 * 开始
		 */
		start: function (){
			if(!this._timer){
				this._timer = S.later(function(){
					this.fn();
				}, this.delay, false, this);
			}
			return this;
		},
		/**
		 * 停止
		 */
		stop: function (){
			this._timer.cancle();
			delete this._timer;
			return this;
		},
		/**
		 * 设置执行的函数, 停止上一个函数并重新开始计时
		 * @param fn 需要执行的函数
		 */
		setFn: function (fn){
			this.fn = fn;
			this.stop().start();
			return this;
		},
		/**
		 * 设置执行的延迟, 停止并重新开始计时
		 * @param fn 延迟,正整数,单位ms
		 */
		setDelay: function (delay){
			delay = delay > 50 ? delay : 50;
			this.delay = delay;
			this.stop().start();
			return this;
		}
	});


	/**
	 * 测试fn的执行时间
	 * @param {Function} fn
	 */
	Tools.runTime = function(fn){
		if(window.console && console.profile){
			console.profile(fn);
		}else{
			var t1 = new Date();
			fn();
			var t2 = new Date();
			alert(t2-t1);
		}
	}

	/**
	 * 将扁平的数组生成树状结构
	 * 扁平:数据库用id,pid表示上下级关系查询出来的结果
	 * @function
	 */
	Tools.dataToTree = (function(){
		var map, rs, has_root;

		//将数组转换成map避免使用indexOf来确定元素
		function toMap(arr, var_id){
			map = {};
			S.each(arr, function(v, i){
				map[v[var_id]] = v;
			});
		}
		//生成树状结构
		function makeHierarchy(o, var_children, var_pid){
			var p = map[o[var_pid]];
			if(p && p!==o){
				if(!p[var_children]){
					p[var_children] = [o];
				}else{
					p[var_children].push(o);
				}
			}else{
				//没有父节点表示是顶层节点
				rs.push(o);
				//做标记,后面可以根据此知道是否进入过此分支,即是否有结果放到顶层结构中
				has_root = true;
			}
		}

		return function(data, var_children, var_id, var_pid){
			if(!S.isArray(data)){
				S.log('Tools.dataToTree: data must be an array!');
				return null;
			}
			if(!var_children){
				S.log('Tools.dataToTree: you must specify must var_children!');
				return null;
			}
			if(!var_id){
				S.log('Tools.dataToTree: you must specify must var_id!');
				return null;
			}
			if(!var_pid){
				S.log('Tools.dataToTree: you must specify must var_pid!');
				return null;
			}

			//初始化结果集与map
			rs = [];
			toMap(data, var_id);

			//生成树状结构
			S.each(data, function(v, i){
				makeHierarchy(v, var_children, var_pid);
			});

			//无结果集提示
			if(!has_root){
				S.log('Tools.dataToTree: root element\' pid must be null or can not select other node!');
				return null;
			}
			has_root = false;

			return rs;
		};
	})();

	/**
	 * @lends Tools
	 */
	S.mix(Tools, {
		/**
		 * trim左空白字符
		 * @param String str 需要处理的字符串
		 * @return String 异常情况返回空字符串
		 */
		lTrim: function(str){
			return str.replace(/^[\s\u3000]+/,'');
		},
		/**
		 * trim右空白字符
		 * @param String str 需要处理的字符串
		 * @return String 异常情况返回空字符串
		 */
		rTrim: function(str){
			return str.replace(/[\s\u3000]+$/,'');
		},
		/**
		 * trim左右空白字符
		 * @param String str 需要处理的字符串
		 * @return String 异常情况返回空字符串
		 */
		trim: function(str){
			return str.replace(/^[\s\u3000]*|[\s\u3000]*$/g,'');
		},
		/**
		 * trim全部(包括中间)空白字符
		 * @param String str 需要处理的字符串
		 * @return String 异常情况返回空字符串
		 */
		trimAll: function(str){
			return str.replace(/[\s\u3000]*/g,'');
		},

		/**
		 * 把 !'()*-._~ 这些不会编码的一起使用%XXX的形式编码
		 * @param String str 需要处理的字符串
		 * @return String 异常情况返回空字符串
		 */
		encodeAll: function(str){
			return encodeURIComponent(str).replace(/[!'()*-._~]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
		},
		/**
		 * 把 *+-./@_ 这些不会编码的一起使用%XXX的形式编码
		 * @param String str 需要处理的字符串
		 * @return String 异常情况返回空字符串
		 */
		escapeAll: function(str){
			return escape(str).replace(/[*+-.\/@_]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
		}
	});

	var entityHTML_reg = /[&<>'"]/g,
		entityHTML_obj = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'\'': '&#39;',
			'"': '&quot;'
		},
		unentityHTML_reg = /&amp;|&lt;|&gt;|&#39;|&quot;|&#34;/g,
		unentityHTML_obj = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&#39;': '\'',
			'&quot;': '"',
			'&#34;': '"'
		};
	/**
	 * @lends Tools
	 */
	S.mix(Tools, {
		/**
		 * 将含正常字符串换成实体的字符串转
		 * <p>
		 * 实测FF对于"'的处理是不编码直接显示(在firebug中查看html,实际源码还是实体)
		 * IE不支持'转换成&apos; ,故使用实体编号&#39;
		 * </p>
		 */
		entityHTML: function(str){
			return str.replace(entityHTML_reg, function(v){
				return entityHTML_obj[v];
			});
		},
		/**
		 * 将含实体的字符串转换成正常字符串
		 */
		unentityHTML: function(str){
			return str.replace(unentityHTML_reg, function(v){
				return unentityHTML_obj[v];
			});
		}
	});

	//将长度为1的字符串前置0
	function __length1Prefix0(value){
		return value.length == 1 ? '0' + value : value;
	}
	//add具体的type
	function __add(type, value){
		if(type === 'year'){
			this.setFullYear(this.getFullYear() + value);
		}else if(type === 'month'){
			this.setMonth(this.getMonth() + value);
		}else if(type === 'date'){
			this.setDate(this.getDate() + value);
		}else if(type === 'hour'){
			this.setHours(this.getHours() + value);
		}else if(type === 'minute'){
			this.setMinutes(this.getMinutes() + value);
		}else if(type === 'second'){
			this.setSeconds(this.getSeconds() + value);
		}else if(type === 'millisecond'){
			this.setMillisecond(this.getMillisecond() + value);
		}
		return this;
	};
	/**
	 * @lends Tools
	 */
	S.mix(Tools, {
		/**
		 * 根据输入参数获取时间,不能转换返回null
		 * @param Object obj
		 * @return Date|null
		 */
		getDate: function(obj){
			//数字直接认为是毫秒数
			if(S.isNumber(obj)){
				return new Date(obj);
			}else if(S.isString(obj)){
				obj = new Date(obj.replace(/-/g,'/'));
				if(!this.isValidDate(obj)){
					obj = null;
				}
				return obj;
			}else if(S.isDate(obj)){
				return obj;
			}else{
				return null;
			}
		},
		/**
		 * 检测是否为正确的时间对象
		 * @param Object obj
		 * @return true|false
		 */
		isValidDate: function(obj){
			if(S.isDate(obj) && !/^NaN$|^Invalid Date$/.test(this.toString())){
				return true;
			}else{
				return false;
			}
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * <pre><code>
		 * var d = new Date();
		 * Tools.dateAdd(d, 123); Tools.dateAdd(d, '1234'); Tools.dateAdd(d, -123) 增加或减少毫秒数,参数为可转化成数字的变量
		 * Tools.dateAdd(d, 'year'); Tools.dateAdd(d, 'month')  指定部分加1,参数为[year|month|date|hour|minute|second]
		 * Tools.dateAdd(d, 'year', 123); Tools.dateAdd(d, 'month', '1234')  增加或减少指定部分[year|month|date|hour|minute|second],参数为可转化成数字的变量其余的忽略
		 * </code></pre>
		 * @param Date date
		 * @param String type
		 * @param String|Number value
		 * @return Date
		 */
		dateAdd: function(date, type, value){
			var reg = /^(?:year|month|date|hour|minute|second)$/;

			if(value === undefined){
				if(!isNaN(type)){
					type -= 0;
					date.setTime(date.getTime() + type);
				}else if(reg.test(type)){
					value = 1;
					__add.call(date, type, value);
				}
			}else{
				if(!isNaN(value) && reg.test(type)){
					value -= 0;
					__add.call(date, type, value);
				}
			}
			return date;
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * @param Date date
		 * @param String value
		 * @return Date|String
		 */
		dateString: function(date, value){
			if(S.isString(value)){
				var arr = value.match(/(\d{4})([-\/])(\d{1,2})\2(\d{1,2})/);
				date.setFullYear(arr[1]);
				date.setMonth(arr[3]-1);
				date.setDate(arr[4]);
				return date;
			}else{
				var y = date.getFullYear(),
					m = __length1Prefix0(date.getMonth()+1),
					d = __length1Prefix0(date.getDate());
				return y + '-' + m + '-' + d;
			}
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * @param Date date
		 * @param String value
		 * @return Date|String
		 */
		timeString: function(date, value){
			if(S.isString(value)){
				var arr = value.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/);
				date.setHours(arr[1]);
				date.setMinutes(arr[2]);
				date.setSeconds(arr[3]);
				return date;
			}else{
				var h = __length1Prefix0(date.getHours()),
					m = __length1Prefix0(date.getMinutes()),
					s = __length1Prefix0(date.getSeconds());
				return h + ':' + m + ':' + s;
			}
		},
		/**
		 * 传value表示设置date, 不传表示取字符串
		 * @param Date date
		 * @param String value
		 * @return Date|String
		 */
		dateTimeString: function(date, value){
			if(S.isString(value)){
				var arr = value.match(/(\d{4}([-\/])\d{1,2}\2\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2})/);
				this.dateString(date, arr[1]);
				this.timeString(date, arr[3]);
				return date;
			}else{
				return this.dateString(date) + ' ' + this.timeString(date);
			}
		},
		/**
		 * 取得月份开始日期对象
		 * @param Date date
		 * @return Date
		 */
		getMonthStart: function(date){
			//创建副本
			var rs = new Date(+this);
			rs.setDate(1);
			this.timeString(rs, '00:00:00');
			return rs;
		},
		/**
		 * 取得月份结束日期对象
		 * @param Date date
		 * @return Date
		 */
		getMonthEnd: function(date){
			//创建副本
			var rs = new Date(+date),
				year = rs.getFullYear(),
				month_days_list = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			month_days_list[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;

			rs.setDate(month_days_list[rs.getMonth()]);
			this.timeString(rs, '23:59:59');
			return rs;
		}
	});
	
	/**
	 * @lends Tools
	 */
	S.mix(Tools, {
		/**
		 * 得到from, to范围内的整数
		 * <pre><code>
		 * API:
		 *	var num = Tools.random();		//得到原始的随机数
		 *	var num = Tools.random(100);	//得到0-100的随机数
		 *	var num = Tools.random(5, 100);	//得到5-100的随机数
		 *	var num = Tools.random(100, 5);	//得到5-100的随机数
		 * </code></pre>
		 * @param Number from
		 * @param Number to
		 * @return Number
		 */
		random: function(from, to){
			var temp = 0, len = arguments.length;
			from -= 0;
			to -= 0;
			if(len === 0){
				return Math.random();
			}else if(len === 1){
				if(isNaN(from)){
					return null;
				}else{
					to = from;
					from = 0;
				}
			}else{
				if(isNaN(from) && isNaN(to)){
					return null;
				}else if(isNaN(from)){
					from = 0;
				}else if(isNaN(to)){
					to = from;
					from = 0;
				}
			}
			if(from > to){
				temp = from;
				from = to;
				to = temp;
			}
			temp = to - from;
			temp = Math.round(Math.random() * (temp+100) % temp);
			return from + temp;
		}
	});

	function __escapeDashQuote(str){
		return str.replace(/[\\"]/, function(m){
			if(m == '\\'){
				return '\\\\';
			}else{
				return '\\"';
			}
		});
	}
	//底层递归函数
	function __viewJSON(obj, tabs, lvmax, lv){
		var isArr = Object.prototype.toString.apply(obj) === '[object Array]',
			bracket  = isArr ? '[' : '{',
			buff = [], i, type, tmp;
		tabs = tabs || '';
		lv = lv || 1;
		var indent = tabs + '\t';
		for(i in obj){
			//只显示自己的属性,不显示原型链上的属性
			if (obj.hasOwnProperty && !obj.hasOwnProperty(i)){
				continue;
			}

			tmp = obj[i];
			type = typeof tmp;
			
			if(type === 'number'){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + tmp);
			}

			else if(type === 'string'){
				buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + __escapeDashQuote(tmp) + '"');
			}

			else if(type === 'boolean'){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + tmp + '');
			}

			//typeof null === 'object', so check the real value first
			else if(tmp === null){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + 'null');
			}

			else if(type === 'object'){
				buff.push((isArr ? '' : '\n'+indent+'"'+i+'":') + (lvmax > lv ? __viewJSON(tmp, indent, lvmax, lv+1) : '"[object]"'));
			}

			else if(type === 'function'){
				buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + '[function]"');
			}

			else if(tmp === undefined){
				buff.push('\n' + indent + (isArr ? '' : '"'+i+'":') + 'undefined');
			}

			else{
				buff.push('\n' + indent + (isArr ? '"' : '"'+i+'":"') + '[unKnownType]"');
			}
		}
		bracket += buff.join(',');
		bracket += '\n' + tabs + (isArr ? ']' : '}');
		return bracket ;
	}
	/**
	 * @lends Tools
	 */
	S.mix(Tools, {
		/**
		 * 指定查看几层
		 * <pre><code>
		 * API:
		 *	Tools.viewJSONlv({}, 2);		//查看对象的2级
		 * </code></pre>
		 * @param Object obj
		 * @param Number lvmax
		 * @return String
		 */
		viewJSONlv: function(obj, lvmax){
			if(lvmax > 0){
				return __viewJSON(obj, '', lvmax);
			}else{
				alert('viewJSONlv: lvmax must be in 1,2,3,4..10');
			}
		},
		/**
		 * 递归查看所有,只查看10层,避免循环引用导致无限查看
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON({});		//查看对象的JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON: function(obj){
			return __viewJSON(obj, '', 10);
		},
		/**
		 * 只查看第一级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON1({});		//查看对象的第一级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON1: function(obj){
			return __viewJSON(obj, '', 1);
		},
		/**
		 * 只查看第二级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON2({});		//查看对象的前2级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON2: function(obj){
			return __viewJSON(obj, '', 2);
		},
		/**
		 * 只查看第三级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON3({});		//查看对象的前3级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON3: function(obj){
			return __viewJSON(obj, '', 3);
		},
		/**
		 * 只查看第四级
		 * <pre><code>
		 * API:
		 *	Tools.viewJSON4({});		//查看对象的前4级JSON表示
		 * </code></pre>
		 * @param Object obj
		 * @return String
		 */
		viewJSON4: function(obj){
			return __viewJSON(obj, '', 4);
		}
	});

	return Tools;
});

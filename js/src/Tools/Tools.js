/**
 * @fileOverview
 * @author hisland hisland@qq.com
 * @description 工具集
 * <pre><code>
 * </code></pre>
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
	 * @return laterOne;
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
	 * 测试fn的执行时间v
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

	return Tools;
});
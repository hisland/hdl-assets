/**
 * @fileOverview
 * @module Tools
 * @author hisland hisland@qq.com
 * @description 工具集
 * <pre><code>
 * </code></pre>
 */

KISSY.add('Tools', function(S, undef) {
	var Tools = window.Tools = {};

	//执行n次
	Tools.doTimes = function(n ,fn){
		for(var i=0; i<n; i++){
			fn(i);
		}
	}

	//延迟执行n次
	Tools.delayTimes = function(n, fn, delay){
		var i = 0;
		delay -= 0;
		delay = delay > 10 ? delay : 10;
		function callback(){
			if(i < n){
				fn(i);
				setTimeout(callback, delay);
			}
		}
		callback();
	}

	//测试fn的执行时间
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

	//测试fn的执行时间
	var t_array_rang = /^(\d+)\.\.(\d+)$/;
	Tools.array = function(str){
		if(S.isString(str)){
			//n..m生成数组n-m,从小到大
			var tmp = t_array_rang.exec(str);
			if(tmp){
				var arr = [], from = tmp[1]-0, to = tmp[2]-0;
				if(from < to){
					for(; from<=to; from++){
						arr.push(from);
					}
					return arr;
				}
			}
		}
	}

	//将扁平的数组生成树状结构
	//扁平:数据库用id,pid表示上下级关系查询出来的结果
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
});
/**********************************************************************************************
 * 颜色类
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-8-11 12:7:19
 * 版本: v1
 * 
 * 前置脚本:patch.javascript.js;
 *			 jquery-1.4.2.min.js;
 * 
 * 1个参数时:
 *		'#ffaa00'
 *		'#fa0'
 *		'rgb(15,16,17)'
 *		'rgb(15, 16, 17)' - 此为firefox生成颜色时的值,参数间有空格
 *		'red' - 常用的颜色名,下面的对应的列表,需要的可加
 * 3个参数时:
 *		155, 158, 138 - 应为正常的值,即每个值都在0-255间
 * 对象属性和方法:
 *		obj.toHex()可获得当前颜色的16进制表示:'#ffaa00'
 *		obj.toRgb()可获得当前颜色的16进制表示:'rgb(15,16,17)'
 *		obj.r\
 *		obj.g  --这3个分别对应颜色的RGB值
 *		obj.b/
 */

(function($){
	//颜色名称对照表
	var name_to_hex = {'red':'#ff0000'
					,'green':'#008000'
					,'blue':'#0000ff'
					,'yellow':'#ffff00'
					,'purple':'#800080'
					,'gray':'#808080'
					,'silver':'#c0c0c0'
					,'pink':'#ffc0cb'
					,'black':'#000000'
					,'white':'#ffffff'
					,'lime':'#00ff00'
					,'aqua':'#00ffff'
					,'fuchsia':'#ff00ff'
					,'teal':'#008080'
					,'maroon':'#800000'
					,'olive':'#808000'};
	//内部解析hex值用的函数
	function parseRgb(hex){
		this.r = parseInt(hex.substr(1,2),16);
		this.g = parseInt(hex.substr(3,2),16);
		this.b = parseInt(hex.substr(5,2),16);
	}
	//颜色类,包含rgb值
	function Color(){
		var args = arguments;
		var arr;

		//一个参数的时候
		if(args.length == 1){
			var arr = args[0].match(/(^#[\da-f]{6}$)|(^#[\da-f]{3}$)|(^rgb\((?:(?:\d{1,2}|[01]\d{2}|2[0-4]\d|25[0-5]),\s*){2}(?:\d{1,2}|[01]\d{2}|2[0-4]\d|25[0-5])\)$)/i);
			//是#aaafff形式
			if(arr && arr[1]){
				parseRgb.call(this, arr[1]);

			//是#f00形式
			}else if(arr && arr[2]){
				arr[2] = arr[2].replace(/([\da-f])/gi,'$1$1');
				parseRgb.call(this, arr[2]);

			//是rgb(255,255,255)形式
			}else if(arr && arr[3]){
				var aa =arr[3].match(/\d{1,3}/g);
				args.length = 3;
				args[0] = parseInt(aa[0],10);
				args[1] = parseInt(aa[1],10);
				args[2] = parseInt(aa[2],10);
			
			//在名称对照表里存在
			}else if(name_to_hex[args[0]]){
				parseRgb.call(this, name_to_hex[args[0]]);
			}else{
				alert('颜色参数: '+args[0]+' 不正确,请检查!');
			}
		}

		//RGB3数字表示
		if(args.length == 3){
			for(var i=0;i<args.length;i++){
				if(!(args[i]<=255 && args[i]>=0)){
					alert('颜色参数: '+args[0]+','+args[1]+','+args[2]+' 不正确,请检查!');
					return;
				}
			}
			this.r=args[0];
			this.g=args[1];
			this.b=args[2];
		}
	}

	//转换成HEX字符串#ff00cc
	Color.prototype.toHex = function(){
		try{
			var sr = this.r.toString(16);
			var sg = this.g.toString(16);
			var sb = this.b.toString(16);
			if(sr.length==1){sr="0"+sr};
			if(sg.length==1){sg="0"+sg};
			if(sb.length==1){sb="0"+sb};
			return "#"+sr+sg+sb;
		}catch(e){
			alert('Color.toHex()失败: 颜色值不正确,请检查!');
		}
	}

	//转换成RGB字符串rgb(254,33,58)
	Color.prototype.toRgb = function(){
		try{
			return 'rgb('+this.r+','+this.g+','+this.b+')';
		}catch(e){
			alert('Color.toRgb()失败: 颜色值不正确,请检查!');
		}
	}

	//注册到jq命名空间上
	$.Color = function(arg1, arg2, arg3){
		if(arguments.length == 1){
			return new Color(arg1);
		}else if(arguments.length == 3){
			return new Color(arg1, arg2, arg3);
		}
	}
})(jQuery);
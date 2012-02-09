/**
 * 颜色类
 */

define(['kissy', './color-name'], function(S, name_to_hex){
	/**
	 * <pre><code>
	 *	var c = Color('#ccff00');	//以hex方式创建
	 *	var c = Color('#f00');	//以hex缩写方式创建
	 *	var c = Color('rgb(200, 100, 50)');	//以rgb字符串方式创建,firefox取出的颜色以此字符串返回
	 *	var c = Color('red');	//以颜色名方式创建,仅提供有限的几个
	 *	var c = Color(233, 20, 255);	//以rgb数字方式创建
	 *	c.r;	//当前r值
	 *	c.g;	//当前g值
	 *	c.b;	//当前b值
	 * </code></pre>
	 * @class 颜色类,包含rgb值
	 */
	function Color(arg0, arg1, arg2){
		//更改为构造方式
		if(!(this instanceof Color)){
			return new Color(arg0, arg1, arg2);
		}
		var args = arguments, arr, tmp, i;

		//一个参数的时候
		if(args.length == 1){
			arr = args[0].match(/(^#[\da-f]{6}$)|(^#[\da-f]{3}$)|(^rgb\((?:(?:\d{1,2}|[01]\d{2}|2[0-4]\d|25[0-5]),\s*){2}(?:\d{1,2}|[01]\d{2}|2[0-4]\d|25[0-5])\)$)/i);

			if(arr){
				//#aaafff形式
				if(arr[1]){
					this.__parseRgb(arr[1]);
				}

				//#f00形式
				else if(arr[2]){
					//转换成#ff0000形式
					arr[2] = arr[2].replace(/([\da-f])/gi, '$1$1');
					this.__parseRgb(arr[2]);
				}

				//rgb(255,255,255)形式
				else if(arr[3]){
					tmp =arr[3].match(/\d{1,3}/g);
					args.length = 3;
					args[0] = parseInt(tmp[0], 10);
					args[1] = parseInt(tmp[1], 10);
					args[2] = parseInt(tmp[2], 10);
				}
			}

			//在名称对照表里存在
			else if(name_to_hex[args[0]]){
				this.__parseRgb(name_to_hex[args[0]]);
			}

			//其它情况
			else{
				console.log('Color: arguments ' + args[0] + ' invalid!');
			}
		}

		//RGB3数字表示
		if(args.length == 3){
			for(i=0; i<3; i++){
				if(args[i] > 255 || args[i] < 0){
					console.log('Color: arguments ' + args[0] + ', ' + args[1] + ', ' + args[2] + 'invalid!');
					return null;
				}
			}
			this.r=args[0];
			this.g=args[1];
			this.b=args[2];
		}

		return this;
	}

	S.augment(Color, {
		/**
		 * 返回HEX字符串#ff00cc
		 */
		getHex: function(){
			var sr, sg, sb;
			sr = this.r.toString(16);
			sg = this.g.toString(16);
			sb = this.b.toString(16);
			if(sr.length==1){sr="0" + sr};
			if(sg.length==1){sg="0" + sg};
			if(sb.length==1){sb="0" + sb};
			return "#" + sr + sg + sb;
		},

		/**
		 * 返回RGB字符串rgb(254,33,58)
		 */
		getRgb: function(){
			return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
		},

		//内部解析hex值用的函数
		__parseRgb: function(hex){
			this.r = parseInt(hex.substr(1,2), 16);
			this.g = parseInt(hex.substr(3,2), 16);
			this.b = parseInt(hex.substr(5,2), 16);
		}
	});

	return Color;
});
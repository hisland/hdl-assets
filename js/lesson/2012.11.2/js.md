JavaScript概览
==============

基于对象
---------

java: 构造出类,再生成实例

	class A{
		public String x = "god";
	}
	A a = new A();

	Object o = new Object();

js: 直接得到对象

	var a = {
		x: 'god'
	};

	var o = {};

字面量(literal)
---------

常见的

* 数字: 123 456
* 字符串: 'abc' 'def'
* 布尔值: true false

JavaScript里面更多的

* 对象: {a: 1, b: 'c'}
* 数组: [1, 2, 3]
* 正则: /reg/gim

js对象结构
---------

* 代码执行 - 从上到下,递归调用
* 作用域链 - 查找变量用

	* 作用域由函数划分, 定义是决定

			var a = 1;
			function aa(){
				var b = 3;
				function bb(){
					var b = 4
					alert(b);
				}
				bb();
				alert(b);
				alert(a);
			}
			aa();

* 原型链 - 查找属性用

	* 在使用继承的时候有用

			var a = 1;
			function aa(){
				var b = 3;
				function bb(){
					var b = 4
					alert(b);
				}
				bb();
				alert(b);
				alert(a);
			}
			aa();


我们现有项目中的代码介绍
---------

* 使用了loader - requirejs

	* 类似于linux下的包管理工具 - 解决以来关系

			file a -> b -> c

* loader附带了optimizer

	* 能把多个js合并成一个

			file d : 
			c's content
			b's content
			a's content

	* 附带js,css压缩功能

		能够去掉注释,把内部变量替换为a,b,c,d...这样的短字符,减小文件体积

* 与项目解耦合

	* 公共功能放入公共模块,作为基础的实现,工具
	* 特定项目自有的放入对应的目录中,使其不干扰其它的代码

			requirejs
				├── config.js
				├── css
				├── demo
				├── i18n.js
				├── jquery-1.7.1.js
				├── jquery-plugin
				├── kissy.js
				├── md5.js
				├── require.js
				├── swfupload
				├── text.js
				├── ui
				├── underscore.js
				├── util
				├── validator
				└── wad - 群发器项目代码指定目录


jade模板引擎
---------

国际化支持
---------
java 使用资源文件

	//zh_CN:
	key1=值1
	key2=值2

	//en_US:
	key1=value1
	key2=value2

	getText(key);

JavaScript 使用 valueMap

	//en_US:
	值1=value1
	值2=value2

	getText('值1'); 


* 中文下直接返回输入值<span style="color:red">'值1'</span>, 其它语言返回<span style="color:red">valueMap['值1']</span>
* 可以使用工具提取 <span style="color:red">/getText\('(.*?)'\)/g</span> 生成 <span style="color:red">valueMap</span>,
* 每次生成还可以通过工具与上次对比产生增量,<span style="color:red">只用维护增量</span>
* 上面提到的工具可以是java,python,php, 也可以是<span style="color:red">nodejs</span>

服务器端js(nodejs) - 脱离了浏览器,js能做什么呢?
---------

* 能操作二进制,能操作文件系统,能调用操作系统api,就能干其它语言能做的事情
* nodejs的一系列api

问题排查
---------

### http请求响应时序
![](time-line.jpg)

使用抓包工具

1. 查看请求数据是否正确
1. 查看响应数据是否正确

虽然很笨,但是能非常快地定位问题出在了哪边

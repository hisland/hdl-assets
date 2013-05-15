<link rel="stylesheet" href="assets/highlight.js/styles/default.css" />
<style type="text/css">
</style>

web前端学习
==============

* 本次针对HTML5学习的范围有

	1. HTTP请求响应的基本流程 
	1. 前端开发的工具和方法的介绍
	1. HTML/HTML5的基本标签以及标签的组合使用
	1. CCS3
	1. JS

* 整个学习分两个阶段

	* 第一个阶段（2 - 3周）

		基础知识的学习，要求能了解web前端开发的基础知识、HTML\CSS\JS基础语法的了解

		学习内容如下:

		1. HTTP请求响应的基本流程
		1. 轻量的server， 浏览器， 调试工具
		1. 三种语言的基本讲解（语法、手册、手过一遍）

		学习方式:

		1. 根据网上资料（w3school等）、书本有计划的预习、自学（计划需要再梳理）
		1. 某个计划点自学完成，由导师集中过一次，学员提出自学过程中的问题
		1. 导师布置针对当前知识点相关的习题，学员完成交付给导师，导师进行考核

	* 第二个阶段（4 - 5周）

		运用前期学习的基础知识，进行项目实践，导师提供一定的技术指导及进行考评

	### 师傅领进门,修行靠个人.


基础预备
--------------------

B/S模式, 即 Browser/Server 浏览器/服务器

两者在不同的物理位置(也可能在同一台电脑上), 通过网络交互, 通常使用的是HTTP协议.

### 浏览器端

主要开发语言有:

javascript: 可以对应MVC中的C, 控制html修改结构, 也可以控制css修改显示

html: 可以对应MVC中的M, 定义当前界面需要展示和交互的数据结构

css: 可以对应MVC中的V, 控制html定义的结构怎么显示

### 服务器端

可以有不同的server和配套的开发语言, 如:

tomcat/jboss, 配套 java, jsp

iis, 配套 c#, asp

nodejs, 配套 javascript

### 数据库层面与c++协作方面

对应的server或者语言都会有与不同数据库协作的库


HTTP请求响应的基本流程
--------------------



开发测试调试工具
--------------------

浏览器端的调试工具,
使用chrome的按f12可以打开<开发者工具>,
使用firefox的可以安装firebug,安装好后同样是f12打开,
其它浏览器不考虑, 因为这2个很方便使用.

这些工具可以查看http请求响应数据包, 可以修改html,css, 可以执行javascript.


在线教程
--------------------

下面这些w3school上的教程都很基础, 可以作为一个基本的入门概略

* javascript

	* [javascript](http://www.w3school.com.cn/js/index.asp)
	* [html DOM](http://www.w3school.com.cn/htmldom/index.asp)
	* [jquery](http://www.w3school.com.cn/jquery/index.asp)
	* [json](http://www.w3school.com.cn/json/index.asp)

* html

	* [html](http://www.w3school.com.cn/html/index.asp)
	* [html5](http://www.w3school.com.cn/html5/index.asp)

* css

	* [css](http://www.w3school.com.cn/css/index.asp)
	* [css3](http://www.w3school.com.cn/css3/index.asp)






<script src="assets/jquery-1.8.2.js"></script>
<script src="assets/highlight.js/highlight.pack.js"></script>
<script>
	$(function(){
		hljs.initHighlightingOnLoad();
	});
</script>

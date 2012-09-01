基本介绍
-----

本目录是模块的起始目录, 是下面组织形式的 **baseDir**

使用到的外部资源

*   loader: [requirejs](http://requirejs.org/) 用于加载组织模块, 打包,压缩也使用它提供的工具 **r.js**
*     less: [less](http://www.lesscss.net/ 'less中文站') 用于组织css, 减少工作量
* markdown: [markdown](http://daringfireball.net/projects/markdown/) 用于写及时的文档, 如README.md
*    qunit: [qunit](http://qunitjs.com/) 用于进行单元测试

模块目录的组织形式

	baseDir
	├── container
	│   ├── container
	│   │   ├── modFile
	│   │   ├── modDir
	│   │   │   └── res
	│   │   └── modFile
	│   └── modDir
	│       ├── res
	│       │   └── res
	│       └── res

* **container** 是一个目录, 用于组织模块, 它里面只能包含另外的 **container** 或者 **modFile** 或者 **modDir**
*   **modFile** 是一个js文件, 它是一个纯js的模块, 很简单, 不常用, 因为需要自动测试时, 需要目录来组织, 这时请使用 **modDir**
*    **modDir** 是一个目录, 它里面只能包含 **res**
*       **res** 是目录模块的具体内容, 可以是 css, js, html, 图片, 目录等资源, <br />
                目录里面只能放资源, 不再是模块, 当可以视为模块是, 它实际是 **子模块**


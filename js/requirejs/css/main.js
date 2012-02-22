/**
 * css插件
 * 根据名字生成link并append到head标签下
 * @see http://stackoverflow.com/questions/5889901/requirejs-and-less
 * @see http://stackoverflow.com/questions/7917639/requirejs-loading-modules-including-templates-and-css
 */

define(function(){
	function load(name, req){
		//生成link节点并放入head
		var node = document.createElement('link');
		node.href = req.toUrl(name);
		node.rel = 'stylesheet';
		node.charset = 'utf-8';
		document.getElementsByTagName("head")[0].appendChild(node);
	}

	//预加载公共样式
	load('css/reset.css', require);
	load('css/common.css', require);
	load('css/demo.css', require);

	return {
		version: '0.1',
		reg_css: /\.css$/,
		load: function(name, req, onLoad, config){
			//不是.css结尾的给它加上
			if(!this.reg_css.test(name)){
				name += '.css';
			}
			load(name, req);
			onLoad();
		}
	}
});

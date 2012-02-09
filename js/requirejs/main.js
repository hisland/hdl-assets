//一些链接
require.config({
	paths: {
		jquery: 'jquery-1.7.1'
	},
	packages: ['css', 'util', 'color']
});


require(['ui/pop/manager', 'css'], function(manager) {
    window.m = manager.init();
});

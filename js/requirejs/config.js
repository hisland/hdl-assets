//公共的模块路径配置,任意页面加载此模块后可获得整体代码的正确配置
require.config({
	paths: {
		jquery: 'jquery-1.7.1'
	},
	packages: ['css', 'util', 'color', 'jquery-plugin', 'valid',
				'ui/autocomp', 'ui/button', 'ui/date', 'ui/grid', 'ui/popwin', 'ui/select',
				'ui/tab', 'ui/tip', 'ui/tree', 'ui/week', 'ui/popup']
});

require.config({
	packages: ['sf/condition', 'sf/config', 'sf/menu', 'sf/page', 'sf/top',
				'demo', 'sf/menu', 'sf/flow']
});
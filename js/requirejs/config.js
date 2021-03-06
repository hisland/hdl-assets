//公共的模块路径配置,任意页面加载此模块后可获得整体代码的正确配置
require.config({
	paths: {
		jquery: 'jquery-1.7.1'
	},
	packages: ['css',
				'demo',
				'jquery-plugin',
				'util',
				'validator']
});

require.config({
	packages: ['ui/ajax-tab',
				'ui/autocomp',
				'ui/button',
				'ui/calendar',
				'ui/drag-sort',
				'ui/grid',
				'ui/highcharts',
				'ui/pager',
				'ui/popbox',
				'ui/pop-manager',
				'ui/popup',
				'ui/popwin',
				'ui/select',
				'ui/swfobject',
				'ui/tab',
				'ui/tip',
				'ui/tree',
				'ui/table-tree',
				'ui/week']
});

require.config({
	packages: ['sf/audit',
				'sf/compare',
				'sf/condition',
				'sf/config',
				'sf/login',
				'sf/menu',
				'sf/page',
				'sf/popwin',
				'sf/rearb',
				'sf/report',
				'sf/skin',
				'sf/top']
});

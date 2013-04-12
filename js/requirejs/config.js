require.config({
	paths: {
		'jquery': 'jquery-1.8.2',
		'jquery-ui': 'jquery-ui-1.9.0/js/jquery-ui-1.9.0.custom',
		'bootstrap': 'bootstrap-2.2.2/js/bootstrap.min',
		'underscore': 'underscore-1.4.2'
	},
	map: {
		'*': {
			'css': 'require-css/css',
			'less': 'require-less/less'
		}
	},
	shim: {
		'jquery-ui': ['jquery'],
		'bootstrap': ['jquery']
	},
	packages: ['css',
				'demo',
				'jquery-plugin',
				'util',
				'validator',
				'ui/ajax-tab',
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

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
	}
});

require.config({
	paths: {
		'jquery': 'jquery-1.8.2',
		'jquery-ui': 'jquery-ui-1.9.0/main',
		'bootstrap': 'bootstrap-ui/js/bootstrap.min',
		'underscore': 'underscore-1.4.2'
	},
	shim: {
		'jquery-ui': ['jquery', 'css!jquery-ui-1.9.0/ui-lightness/jquery-ui-1.9.0.custom'],
		'bootstrap': ['css!bootstrap-ui/css/bootstrap.min']
	}
});
//use define to load global dep before any req
define(['i18n']);
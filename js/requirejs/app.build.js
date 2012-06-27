({
    appDir: "./",
    baseUrl: "./",
    dir: "../webapp-build",

    paths: {
        "jquery": "jquery-1.7.1"
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
				'ui/week'],
		modules: [
			{
				name: 'wad/init',
				exclude: ['css']
			}
		]
})

/*
	This is an example of one way you could set up a configuration file to more
	conveniently define some commandline options. You might like to do this if
	you frequently reuse the same options. Note that you don't need to define
	every option in this file, you can combine a configuration file with
	additional options on the commandline if your wish.
	
	You would include this configuration file by running JsDoc Toolkit like so:
	java -jar jsrun.jar app/run.js -c=conf/sample.conf

*/

{
	// source files to use
	// builtin must be the first, it define the jQuery and window
	_: [
		'/home/hisland/scm/git-root/hdl-assets/js/requirejs/ui/main.js',
		'/home/hisland/scm/git-root/hdl-assets/js/requirejs/ui/grid'
	],
	
	// document all functions, even uncommented ones
	// a: true,
	
	r:10,
	
	E:/test|spec|calendar|validation|demo/,
	
	// including those marked @private
	// p: true,
	
	// some extra variables I want to include
	D: {generatedBy: "hisland@qq.com", copyright: "2012"},
	
	// use this directory as the output directory
	d: "/home/hisland/scm/git-root/hdl-assets/js/docs-requirejs",
	
	// use this template
	t: "/home/hisland/scm/git-root/kissy-tools/jsdoc/templates/kissy"
}
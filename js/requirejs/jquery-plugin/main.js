/**
 * 合并为一个package
 * @class jQuery
 */
define(['./align',
		'./dragmove',
		'./hashchange',
		'./input',
		'./mousetip',
		'./mousewheel',
		'./otherclick',
		'./outerclick'], 
		function(){
			return {
				version: '1.0',
				author: 'hisland',
				desc: 'load jquery-plugin as package'
			};
		}
);


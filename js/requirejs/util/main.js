/**
 * 工具集
 */
define(['kissy', './color', './date', './later-fn', './math', './sbc-dbc',
		'./string', './test', './times', './view-json', './week'], function(S){

	var args = S.makeArray(arguments);
	args.shift();

	//将子模块合并为一个大对象
	return S.merge.apply(null, args);
});

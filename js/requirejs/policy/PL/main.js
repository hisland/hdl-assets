define(['kissy', './showMsgWithLevel', './commonSave', './commonButton', './commonShow', './commonForm'], function(S){
	var args = S.makeArray(arguments);
	args.shift();
	return S.merge.apply(null, args);
});
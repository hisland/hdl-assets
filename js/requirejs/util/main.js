define(
[
'kissy',
'./color',
'./cookie',
'./date',
'./later-fn',
'./math',
'./iframeDownload',
'./sbc-dbc',
'./string',
'./test',
'./times',
'./view-json',
'./week'], 
function(S){
	var args = S.makeArray(arguments);
	args.shift();
	return S.merge.apply(null, args);
}
);

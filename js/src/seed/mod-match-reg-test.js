var reg = /([^,\s+?()]+)(\+css)?(\?\([^,\s]*\))?/g;
'dateTool?(jquery-1.4.2), scrollBarWidth, popWin+css?(jquery.mask)'.replace(reg, function(a, b, c, d, e){
	console.log(a, b, c, d, e);
});
'dateTool?(popWin+css?(jquery.mask), scrollBarWidth)'.replace(reg, function(a, b, c, d, e){
	console.log(a, b, c, d, e);
});


console.log(reg.exec('dateTool+css?(jquery-1.4.2)'));
console.log(reg.exec('dateTool?(jquery-1.4.2)'));
console.log(reg.exec('dateTool+css?(jquery-1.4.2), popWin+css?(jquery.mask)'));
console.log(reg.exec('dateTool?(jquery-1.4.2), scrollBarWidth, popWin+css?(jquery.mask)'));


KISSY.add('dateTool', {requires:['jquery-1.4.2']});
KISSY.add('hdlTipMsg', {requires:['jquery-1.4.2']});
KISSY.use('dateTool+css, hdlTipMsg+css');


var node = document.createElement('script');
node.addEventListener('load', function(){
	console.log('loaded');
}, false);
node.addEventListener('error', function(){
	console.log('error');
}, false);
node.src="jquery-1.4.2.js";
document.getElementsByTagName('head')[0].appendChild(node);


KISSY.add('dateTool', function(){
	console.log('dataTool ok');
});

KISSY.add('dateTool', function(){
	console.log('dataTool ok');
}, {requires:['jquery-1.4.2']});
KISSY.use('dateTool+css');

$ = jQuery;
$('<input type="datetime" />').appendTo('body');
var mw = $('.menu_list');
var h3s = mw.find('h3');
var uls = mw.find('ul');

var m = [{
	"text": "x¸ù½Úµãy",
	"url": "#",
	"children": []}];


h3s.each(function(i, v){
	v = $(v);
	var o = {
		"text": v.find('span:eq(0)').text(),
		"url": "#",
		"children": []};
	
	uls.eq(i).find('a').each(function(i, v){
		v = $(v);
		var o2 = {
			"text": v.text(),
			"url": v.attr('href'),
			"leaf": true
		};
		
		o.children.push(o2);
	});
	m[0].children.push(o);
});

m.viewJSON(m);
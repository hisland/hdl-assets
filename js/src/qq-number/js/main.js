$(function(){
	window.resizeTo(1000,700);
	window.moveTo((parseInt(screen.width)-1000)/2,(parseInt(screen.height)-700)/2);

	var  page_from = 0
		,page_to = 50

		,qq_list = {}
		,num_sort = [];

	function getList(page, callback){
		$.get('http://haoma.qq.com/static/asset/asset_index_'+page+'.html', function(rs){
			sayLog('获取'+page+'页号码成功!');
			var rs2 = rs.replace(/<!--\[if !IE\]>.*<!\[endif\]-->$/, '');
			rs2 = $.parseJSON(rs2);
			$('a', rs2.numbers).each(function(i, v){
				qq_list[$(v).text()] = $(v).attr('href');
			});
		});
	}

	function sayLog(msg){
		$('<p>'+msg+'</p>').appendTo('#show-log');
	}

	$('.ctrl-p:eq(0) :button').click(function(e){
		var text = $(this).prev().val();
		var num = [];
		$.each(qq_list, function(i, v){
			if((v.num+'').indexOf(text) != -1){
				num.push(v);
			}
		});
	});
	//导出到文件
	$('#export').click(function(e){
		$.each(qq_list, function(i, v){
			num_sort.push(i);
		});
		num_sort.sort();
		var c = [];
		$.each(num_sort, function(i, v){
			c.push('\n', v, '\t', qq_list[v]);
		});
		var f = file('qq-' + (+new Date) + 'qq.txt');
		f.save(c.join(''));
	});
	//获取50页号码
	$('#get-num').click(function(e){
		var i = page_from;
		for(; i<page_to; i++){
			getList(i);
		}
	});
});
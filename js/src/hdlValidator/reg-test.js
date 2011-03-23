'ripv4, /2-5/'.replace(/.*?[^\\](,\s*)?/g, function(a, b, c){
	console.log(a);
	console.log(b);
	console.log(c);
})

'ripv4, /2-5/'.substring(-1, 1)

function splitPattern(str){
	var  idx = 0, last_idx = 0
		,arr = [], p
		,trim_reg = /^\s*|\s*$/g;

	//循环每个','号,并且判断前面是否有转义符号'\', 并放入分组
	while(idx != -1){
		idx = str.indexOf(',', idx);
		if(idx != -1){
			if(str[idx-1] == '\\'){
				idx += 1;
				continue;
			}else{
				p = str.substring(last_idx, idx);
				idx += 1;
				last_idx = idx;
			}
		}else{
			p = str.substring(last_idx);
		}
		arr.push(p.replace(/^\s*|\s*$/g, '').replace('\\,', ','));
	}
	return arr;
}
splitPattern('ripv4, /2-5/');


var  p_reg = /^(r)(.*)$/
	,p_test = /^(t)(.*)$/
	,p_len = /^(l)(\d+)(?:-(\d+))?$/
	,p_lena = /^(la)(\d+)(?:-(\d+))?$/
	,p_lenn = /^(ln)(\d+)(?:-(\d+))?$/
	,p_num = /^(n)(\d+)(?:-(\d+))?$/
	,p_reg2 = /^\/.*\/[ig]?$/
	,p_eq = /^(eq)(.*)$/
	,p_gt = /^(gt)(.*)$/
	,p_lt = /^(lt)(.*)$/;

'ajax'

//取消链接点击跳转
function void0(e){this.blur();e.preventDefault();}

//TAB切换整合
function initTabs(tabs,cons,method){//如需改变切换方式,请传第3个参数 'click'或者其它jq支持的方法,,默认是mouseover
	if(!tabs || !cons) return false;
	method = method || 'mouseover';
	tabs.click(void0);
	tabs[method](function(e){
		tabs.parent('.tab-nav-now').removeClass('tab-nav-now');
		cons.removeClass('tab-con-now');
		var i = $(this).parent().index();
		$(this).parent().addClass('tab-nav-now');
		cons.eq(i).addClass('tab-con-now');
	});
}
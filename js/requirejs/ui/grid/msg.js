define(['kissy'], function(S){
	var msg = {
		empty: getText('暂无数据'),
		error: getText('读取数据出错'),
		proc: getText('正在加载,请稍等...'),

		col_display: getText('列名'),

		btn_edit: getText('选中1条进行修改'),
		btn_del: getText('选中1条以上进行删除'),
		btn_export: getText('导出当前结果'),
		btn_compare: getText('对选中2条进行比较'),

		btn_text: getText('按钮文字'),

		page_error: getText('请输入正确的页数'),
		page_info: getText('总共:{totals}条 当前为{beginNum}-{endNum}条')
	};

	// 此段保留在最底部,如果有JS国际化信息将进行覆盖
	if(window.JS_I18N){
		S.each(msg, function(v, i, o){
			o[i] = JS_I18N['js.ui.grid.' + i];
		});
	}

	return msg;
});
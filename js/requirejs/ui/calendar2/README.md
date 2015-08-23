var cal = Calendar();

DATESTRING: '2013-05-16 09:57:10'|'2013-05-16'|'09:57:10'
MILLISECOND: 毫秒数
DATE: (Date|MILLISECOND|DATESTRING)
cal.date(DATE) 设置日期对象
cal.date() 获取日期对象
cal.on('change', fn(e, val)) 注册值被修改的事件, 可以阻止
cal.on('show|hide', fn(e)) 注册显示隐藏事件
cal.off()

cal.attach() 注册到某地方, 目标可通过jqeury获取
cal.detach() 解除注册

TYPE: '(year|month|date|hour|minute|second)'
cal.field(TYPE) 获取TYPE的值
cal.field(TYPE, NUMBER) 设置TYPE的值


CONFIG_TYPE: {
	weekStart: 1,
	fixed: 'year0, month9',
	enableClear: true,
	enableNow: true,
	enableArrAnimate: true,
	selectDateHide: false
}
VAL: 
cal.config(CONFIG_TYPE) 获取CONFIG_TYPE的值
cal.config(CONFIG_TYPE, VAL) 设置CONFIG_TYPE的值


var ui = Calendar.prototype.ui = new UI();
ui.setCursor(TYPE)
ui.refreshList()
ui.refreshYearList()
ui.refreshDateList()
ui.refreshOtherList()
ui.update() 根据config更新UI的全部


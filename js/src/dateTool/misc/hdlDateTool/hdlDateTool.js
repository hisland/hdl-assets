/**********************************************************************************************
 * 日期控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-8-11 12:7:19
 * 版本: v5
 *
 * 前置脚本:
 *			../patch.javascript.js;
 *			../jquery-1.4.2.min.js
 *			../canBind.js
 *			../jquery.mousewheel.js;
 *			../jquery.adjustElement.js;
 * 使用方法:
 *			$('').hdlDateTool(fixed);
 *			$('').hdlDateTool(setting);
 */
(function($){
	//已经有了此函数则不用重复注册了
	if($.fn.hdlDateTool){
		return false;
	}

	var  global_dt = window.hdl_date_tool = []
		,now_tool, now_ipt	//当前使用的时间工具对象, 时间控件内当前设置对象
		,reg_fixed  = /-(year|month|date|hour|minute|second)(\d{0,4})(?=-)/gi	//fixed字符串的匹配模式,每次使用后要重置lastIndex为0
		,pre_setting   = {
							fixed : ''	//'-year-month-date-hour-minute-second-' 仅固定		'-year2010-month5-date15-hour-minute-second-' 固定并设置默认值
							,time_offset:0	//如果要使用另外(如服务器)的时间,则在此保存(服务器 减 本地)时间差(毫秒数)
							,enable: true
							,btn_clear_enable: true
						}
		
		//匹配支持的日期模式
		,reg_date   = /(^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$)|(^\d{4}\/\d{1,2}\/\d{1,2}$)|(^\d{1,2}:\d{1,2}:\d{1,2}$)|(^\d{4}\/\d{1,2}$)|(^\d{1,2}\/\d{1,2}$)/;
						// (^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$) yyyy/mm/dd hh:mm:ss
						// (^\d{4}\/\d{1,2}\/\d{1,2}$)	yyyy/mm/dd
						// (^\d{1,2}:\d{1,2}:\d{1,2}$)	hh:mm:ss
						// (^\d{4}\/\d{1,2}$)			yyyy/mm
						// (^\d{1,2}\/\d{1,2}$)		mm/dd
						// 共5种形式

/**********************************************************************************************
*初始化日期层并保存引用
*/
	//设置样式表和层
	var css = '<style type="text/css">#hdlDateTool_div{display:none;z-index:3000;position:absolute;font-family:"宋体";font-size:12px;}#hdlDateTool_div *{margin:0;padding:0;}#hdlDateTool_div .hdlDateTool_wrap{border:1px solid #92B0DD;background:#fff;width:213px;}#hdlDateTool_div iframe{_position:absolute;_top:0px;_left:0px;_z-index:-1;_width:215px;_height:expression(parentNode.clientHeight+2);}#hdlDateTool_div .hdl_ctrl{height:14px;padding:3px;background:#96C2F1;}#hdlDateTool_div .hdl_ctrl .hdl_tips{float:left;line-height:14px;color:#fff;}#hdlDateTool_div .hdl_ctrl .hdl_btns{float:right;line-height:14px;}#hdlDateTool_div .hdl_ctrl .hdl_btns a{float:left;color:#000;text-decoration:none;margin-left:8px;}#hdlDateTool_div .hdl_ctrl .hdl_btns a:hover{color:#666;}#hdlDateTool_div .hdl_ipt_list{padding:4px 0 4px 4px;overflow:hidden;}#hdlDateTool_div .hdl_ipt_list label{float:left;padding-right:1px;}#hdlDateTool_div .hdl_ipt_list input{font-family:"宋体";font-size:12px;height:14px;width:20px;border:1px solid #bbe1f1;text-align:center;margin-right:1px;-moz-border-radius:3px;border-radius:3px;ime-mode:disabled;}#hdlDateTool_div .hdl_ipt_list input.disabled{border-color:#999;color:#999;background:#ddd;}#hdlDateTool_div .hdl_ipt_list input.hdl_year{width:28px;}#hdlDateTool_div .hdl_ipt_list label.hdl_hour_label{padding-left:5px;}#hdlDateTool_div .hdl_week_list{clear:both;padding-left:5px;overflow:hidden;zoom:1;}#hdlDateTool_div .hdl_week_list span{float:left;width:19px;height:18px;line-height:18px;margin:1px 5px;cursor:default;text-align:center;}#hdlDateTool_div .hdl_date_list{padding:0 0 5px 5px;overflow:hidden;cursor:default;zoom:1;}#hdlDateTool_div .hdl_date_list span,#hdlDateTool_div .hdl_date_list a,#hdlDateTool_div .hdl_date_list strong{float:left;width:19px;height:18px;line-height:18px;margin:1px 5px;text-align:center;text-decoration:none;color:#333;-moz-border-radius:3px;border-radius:3px;outline:none;cursor:default;}#hdlDateTool_div .hdl_date_list a:hover{background:#e7f3ff;cursor:pointer;}#hdlDateTool_div .hdl_date_list a.now_date{width:17px;height:16px;line-height:16px;border:1px solid #96c2f1;background:#e7f3ff;}#hdlDateTool_div .hdl_date_list strong.disabled{color:#ccc;font-weight:400;}#hdlDateTool_div .hdl_drop_list{position:absolute;border:1px solid #92b0dd;background:#fff;height:100px;top:41px;left:195px;width:3em;overflow-x:hidden;overflow-y:scroll;}#hdlDateTool_div .hdl_drop_list_long{width:4em;}#hdlDateTool_div .hdl_drop_list a{display:block;text-align:center;text-decoration:none;color:#333;padding:1px 4px;}#hdlDateTool_div .hdl_drop_list a:hover, #hdlDateTool_div .hdl_drop_list a.selected{background:#96c2f1;}</style>';
	var div = $('<div id="hdlDateTool_div"><!--[if lte IE 6]><iframe frameborder="no" scrolling="no"></iframe><![endif]--><div class="hdlDateTool_wrap"><div class="hdl_ctrl"><div class="hdl_tips">鼠标滚轮选择</div><div class="hdl_btns"><a href="#" class="hdl_clear">清除</a><a href="#" class="hdl_today">今天</a><a href="#" class="hdl_complete">完成</a></div></div><div class="hdl_ipt_list"><label><input type="text" class="hdl_year" />年</label><label><input type="text" class="hdl_month" />月</label><label><input type="text" class="hdl_date" />日</label><label class="hdl_hour_label"><input type="text" class="hdl_hour" />:</label><label><input type="text" class="hdl_minute" />:</label><label><input type="text" class="hdl_second" /></label></div><div class="hdl_week_list"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div><div class="hdl_date_list"><span></span><span></span><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">10</a><a href="#">11</a><a href="#">12</a><a class="now_date" href="#">13</a><a href="#">14</a><a href="#">15</a><a href="#">16</a><a href="#">17</a><a href="#">18</a><a href="#">19</a><a href="#">20</a><a href="#">21</a><a href="#">22</a><a href="#">23</a><a href="#">24</a><a href="#">25</a><a href="#">26</a><a href="#">27</a><a href="#">28</a><a href="#">29</a><a href="#">30</a></div></div><div class="hdl_drop_list"></div></div>');

	//时间控件范围的变量
	var  div_wrap	= div								//日历包含层
		,btn_complete= div.find('a.hdl_complete')		//完成按钮
		,btn_today	= div.find('a.hdl_today')			//今天按钮
		,btn_clear	= div.find('a.hdl_clear')			//清除按钮

		,list_ipt	= div.find('div.hdl_ipt_list')		//内部输入框的包含层
		,list_drop	= div.find('div.hdl_drop_list')		//下拉列表
		,list_date	= div.find('div.hdl_date_list');	//日期列表

/**********************************************************************************************
*设置层上的元素的事件
*/

	//关闭下拉列表,并将目标输入框设置为null
	function closeDropList(){
		list_drop.hide();
		now_ipt = null;
	}

	//页面其它地方点击处理
	function documentClick(e){
		if(!($(e.target).closest('#hdlDateTool_div').length || e.target.setting)){
			closeDateTool();
		}
	}
	//打开时间控件层
	function openDateTool(){
		if(!now_tool.setting.enable){
			sayNotice('当前控件暂时禁用!')
			return false;
		}
		closeDropList();
		if(now_tool.setting.btn_clear_enable){
			btn_clear.show();
		}else{
			btn_clear.hide();
		}
		div_wrap.adjustElement(now_tool.target).show();
		$(document).click(documentClick);
	}
	//关闭时间控件层
	function closeDateTool(e){
		div_wrap.hide();
		$(document).unbind('click', documentClick);
		if(e){
			e.preventDefault();
		}
	}

	//输入目标注册的事件函数
	function targetClick(){
		now_tool = global_dt[$(this).attr('data-hdl-date-tool')];
		now_tool.refresh();
		now_tool.show();
		return false;
	}

	//向上或者向下,支持按键,滚轮
	function upOrDown(e, delta){
		if(now_ipt){
			var  a = list_drop.find('a.selected'), next = $(this).parent().next('label').children('input:enabled')
				,up = a.prev() ,down = a.next();

			if((e.keyCode == 38 || delta > 0) && up.length){//向上滚动
				up.click();
			}else if((e.keyCode == 40 || delta < 0) && down.length){//向下滚动
				down.click();
			}else if(e.keyCode == 13){//回车键
				if(next.length){
					next.focus();
				}else{
					list_drop.hide();
				}
			}else if(e.keyCode == 9){//tab键
				if(!next.length){
					list_drop.hide();
				}
				return true;
			}
			return false;
		}
	}

	//包含层 - 点击
	div_wrap.click(closeDropList);
	//包含层 - 鼠标滚动
	div_wrap.mousewheel(upOrDown);

	//清空按钮 - 点击
	btn_clear.click(function(e){
		now_tool.target.val('');
		e.preventDefault();
	});

	//今天按钮 - 点击
	btn_today.click(function(e){
		now_tool.setting.date_arr.setDate(now_tool.setting.now());
		now_tool.fillInput();
		now_tool.fillTarget();
		e.preventDefault();
	});

	//完成按钮 - 点击
	btn_complete.click(closeDateTool);

	//输入框列表 - 鼠标进入
	list_ipt.mouseover(function(e){
		var elm = $(e.target).filter('input:enabled');
		if(elm[0] && (!now_ipt || now_ipt[0] != elm[0])){
			this._hdt_show_timer = setTimeout(function(){
				elm.click();
			},100);
		}
	});
	//输入框列表 - 鼠标离开
	list_ipt.mouseout(function(e){
		clearTimeout(this._hdt_show_timer);
	});

	//内部输入框 - 点击
	list_ipt.find('input').click(function(e){
		var type, position, height;
		if(!now_ipt || now_ipt[0] != this){
			now_ipt = $(this);
			type = this.className.slice(4);
			if(type == 'year'){
				list_drop.addClass('hdl_drop_list_long');
			}else{
				list_drop.removeClass('hdl_drop_list_long');
			}
			now_tool.setting.refreshDropList(type);
			position = now_ipt.position();
			height	 = now_ipt.outerHeight();
			list_drop.css({left:position.left, top:position.top+height+1}).show();
			list_drop.find('a.selected').focus();
			this.focus();
		}
		e.stopPropagation();
	})
	.keydown(upOrDown)//键盘按键
	.focus(function(e){//获得焦点
		if(now_ipt && now_ipt[0] != this){
			$(this).click();
		}
	});

	//日期列表 - 点击
	list_date.click(function(e){
		var elm = $(e.target).filter('a') ,date_arr = now_tool.setting.date_arr;
		if(elm.length){
			elm.addClass('now_date').siblings('.now_date').removeAttr('class');
			date_arr.item('date', elm.html());
			now_tool.fillInput('date');
			now_tool.fillTarget();
		}
		elm.blur();
		e.preventDefault();
	});
	//日期列表 - 双击
	list_date.dblclick(function(e){
		if($(e.target).filter('a').length){
			closeDateTool();
		}
	});

	//下拉列表 - 点击
	list_drop.click(function(e){
		var type, value, elm = $(e.target).filter('a');
		if(elm.length){
			type = now_ipt[0].className.slice(4);
			value = elm.html() - 0;
			elm.addClass('selected').focus().siblings('.selected').removeAttr('class');
			now_tool.setting.date_arr.item(type, value);
			now_tool.fillInput(type);
			now_tool.fillTarget();
			if(type == 'year' || type == 'month'){
				//更新日期列表
				now_tool.setting.refreshDataList();
				now_tool.fillInput('date');
			}
			if(type == 'date'){
				list_date.find('a.now_date').removeAttr('class');
				list_date.find('a:eq('+(value-1)+')').addClass('now_date');
			}
		}
		now_ipt.focus();
		return false;
	});

/**********************************************************************************************
*内部类定义
*/
	//DateArr类
	function DateArr(date){
		if(date && date instanceof Date){
			this.setDate(date);
		}
	}
	DateArr.days_list = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//读取修改显示与真实值,'any'时只读取修改真实值
	DateArr.prototype.item = function(type, value){
		if(arguments.length == 2){
			value = length1Prefix0(value);
			if(this[type] == 'any'){
				this.real(type, value);
			}else{
				this[type] = value;
				this.real(type, value);
			}
		}else if(arguments.length == 1){
			return this[type];
		}
	}
	//读取修改真实值
	DateArr.prototype.real = function(type, value){
		if(arguments.length == 2){
			value -= 0;
			this['real_'+type] = value;
			if(type == 'year'){
				this.repairMonth2();
			}
			//修正日期大于真实值的情况
			if(type == 'month' || (type == 'year' && this.real('month') == 2)){
				if(this.real('date') > DateArr.days_list[this.real('month')]){
					this.item('date', DateArr.days_list[this.real('month')]);
				}
			}
		}else if(arguments.length == 1){
			return this['real_'+type];
		}
	}
	DateArr.prototype.getMonthDays = function(){
		return DateArr.days_list[this.real('month')];
	}
	DateArr.prototype.getMonthFirstDay = function(){
		var firstDay = new Date(this.real('year')+'/'+this.real('month')+'/1').getDay();
		if(firstDay == 0){
			firstDay = 7;
		}
		return firstDay;
	}
	DateArr.prototype.repairMonth2 = function(){
		var year = this.real('year');
		DateArr.days_list[2] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;
	}
	DateArr.prototype.setDate = function(date){
		if(date && date instanceof Date){
			this.item('year', length1Prefix0(date.getFullYear()));
			this.item('month', length1Prefix0(date.getMonth()+1));
			this.item('date', length1Prefix0(date.getDate()));
			this.item('hour', length1Prefix0(date.getHours()));
			this.item('minute', length1Prefix0(date.getMinutes()));
			this.item('second', length1Prefix0(date.getSeconds()));
		}else{
			sayNotice('参数: ' + date + ' 不是日期对象, 请检查');
		}
	}
	DateArr.prototype.getDate = function(){
		var i, arr, str, arr2=[];
		arr = 'year,month,date'.split(',');
		for(i=0;i<3;i++){
			arr2.push(this['real_'+arr[i]]);
		}
		str = arr2.join('/');

		arr = 'hour,minute,second'.split(',');
		arr2.length = 0;
		for(i=0;i<3;i++){
			arr2.push(this['real_'+arr[i]]);
		}
		str += ' '+arr2.join(':');

		return new Date(str);
	}

	//Setting类
	function Setting(){
		$.extend(true, this, pre_setting);

		this.date_arr = new DateArr(this.now());
		this.date_arr.parent = this;
	}
	Setting.prototype.now = function(){//获取当前时间字符串,加上了时间偏移
		var time_offset = Number(this.time_offset) || 0;
		return new Date(new Date().valueOf() + time_offset);
	}

	Setting.prototype.refreshDropList = function(type){
		var  range = this.getRange(type)
			,str = Setting.getDropListString(Setting.makeArray(range[0], range[1]), this.date_arr.real(type));
		list_drop.html(str);
	}
	Setting.prototype.refreshDataList = function(){
		var  range = this.getRange('date')
			,str = Setting.getDateListString(range[1], this.date_arr.getMonthFirstDay(), this.date_arr.real('date'));
		list_date.html(str);
	}
	Setting.prototype.refreshFixed = function(){//修改fixed值,同时设置控件的输入框状态
		var date_arr = this.date_arr;
		list_ipt.find(':disabled').attr('disabled', false).removeClass('disabled');
		reg_fixed.lastIndex = 0;
		this.fixed.replace(reg_fixed, function(a, b, c){
						c = c ? c : 'any';
						list_ipt.find('input.hdl_'+b).attr('disabled',true).addClass('disabled');
						if(c === 'any'){
							date_arr[b] = c;
						}else{
							date_arr.item(b, c);
						}
						return a;
					});
	}

	Setting.prototype.parseValueToDate = function(value){
		var arr = value.replace(/-/g,'/').match(reg_date);
		var date_now = this.now();
		var date_obj = null;

		if(!arr){		//没有的时候,不做操作
		}else if(arr[1]){//"2010/05/19 16:02:26"的形式 == 年/月/日 时:分:秒
			date_obj = new Date(arr[1]);
		}else if(arr[2]){//"2010/05/19"的形式 == 年/月/日
			date_obj = new Date(arr[2]);
		}else if(arr[3]){//"16:02:26"的形式 == 时:分:秒
			date_obj = new Date(date_now.dateString().replace(/-/g,'/')+' '+arr[3]);
		}else if(arr[4]){//"2010/05"的形式 == 年/月
			date_obj = new Date(arr[4]+'/1');
		}else if(arr[5]){//"05/19"的形式 == 月/日
			date_obj = new Date(date_now.getFullYear()+'/'+arr[5]);
		}

		return date_obj;
	}

	Setting.prototype.getMinTime = function(){
		var val = this.min_time;
		if(typeof val == 'string'){
			if(val.isValidDate()){
				val = val.getDate();
			}else if(val == 'now'){
				val = new Date();
			}else{
				val = $(val).eq(0).val();
				if(val && val.isValidDate()){
					val = val.getDate();
				}else{
					sayNotice('Setting.prototype.minTime: this.min_time 为jq选择器的时候必须选中元素的第一个为input,并且值为可使用的时间字符串形式');
					val = null;
				}
			}
		}else if(typeof val == 'number'){
			val = new Date(val);
		}else if(!val){
			val = null;
		}else{
			sayNotice('Setting.prototype.minTime: this.min_time ' + val + ' 必须是字符串或数字(毫秒数)或null undefined 如: 10755071847 "2010-8-12 20:34:41" "now" "selector" null 不传');
			val = null;
		}

		return val;
	}
	Setting.prototype.getMaxTime = function(){
		var val = this.max_time;
		if(typeof val == 'string'){
			if(val.isValidDate()){
				val = val.getDate();
			}else if(val == 'now'){
				val = new Date();
			}else{
				val = $(val).eq(0).val();
				if(val && val.isValidDate()){
					val = val.getDate();
				}else{
					sayNotice('Setting.prototype.maxTime: this.max_time 为jq选择器的时候必须选中元素的第一个为input,并且值为可使用的时间字符串形式');
					val = null;
				}
			}
		}else if(typeof val == 'number'){
			val = new Date(val);
		}else if(!val){
			val = null;
		}else{
			sayNotice('Setting.prototype.maxTime: this.max_time ' + val + ' 必须是字符串或数字(毫秒数)或null undefined 如: 10755071847 "2010-8-12 20:34:41" "now" "selector" null 不传');
			val = null;
		}

		return val;
	}
	Setting.prototype.getBaseRange = function(type){//不带限定范围的range
		var range = [0, 0];
		if(type == 'year'){
			range[0] = this.date_arr.real('year') - 20;
			range[1] = this.date_arr.real('year') + 20;
		}else if(type == 'month'){
			range[0] = 1;
			range[1] = 12;
		}else if(type == 'date'){
			range[0] = 1;
			range[1] = this.date_arr.getMonthDays();
		}else if(type == 'hour'){
			range[0] = 0;
			range[1] = 23;
		}else if(type == 'minute' || type == 'second'){
			range[0] = 0;
			range[1] = 59;
		}
		return range;
	}
	Setting.prototype.getRange = function(type){
		var  min_time = this.getMinTime(), max_time = this.getMaxTime()
			,now_time ,diff ,value ,range = this.getBaseRange(type);
		if(min_time || max_time){
			now_time = this.date_arr.getDate();
			value = this.date_arr.real(type);
			if(min_time){
				diff = Setting.getDiff(min_time, now_time, type);
				if(diff >= 0){
					range[0] = value - diff;
				}
			}
			if(max_time){
				diff = Setting.getDiff(now_time, max_time, type);
				if(diff >= 0){
					range[1] = value + diff;
				}
			}
		}
		return range;
	}

	//生成下拉列表html字符串
	Setting.getDropListString = function( numArray, nowNum ){
		var i, str = '', len = numArray.length;
		for(i=0; i < len ; i++ ){
			if(numArray[i] == nowNum){
				str += '<a href="#" class="selected">'+numArray[i]+'</a>';
			}else{
				str += '<a href="#">'+numArray[i]+'</a>';
			}
		}
		return str;
	}
	//生成日期列表html字符串, filter形式{enabled:[]}或者 {disabled:[]}
	Setting.getDateListString = function(days, firstDay, nowDay, filter){
		var str = '', i, item, arr = [];
		for(i=1;i<firstDay;i++){
			str += '<span></span>';
		}

		if(filter){
			if(filter.enabled){
				arr = filter.disabled.unique();
				item = arr.shift();
				for(i=1;i<=days;i++){
					if(i == item){
						if(i == nowDay){
							str += '<a href="#" class="now_date">'+i+'</a>';
						}else{
							str += '<a href="#">'+i+'</a>';
						}
						item = arr.shift();
					}else{
						str += '<strong class="disabled">'+i+'</strong>';
					}
				}
			}else if(filter.disabled){
				arr = filter.enabled.unique();
				item = arr.shift();
				for(i=1;i<=days;i++){
					if(i == item){
						str += '<strong class="disabled">'+i+'</strong>';
						item = arr.shift();
					}else{
						if(i == nowDay){
							str += '<a href="#" class="now_date">'+i+'</a>';
						}else{
							str += '<a href="#">'+i+'</a>';
						}
					}
				}
			}
		}else{
			for(i=1;i<=days;i++){
				if(i == nowDay){
					str += '<a href="#" class="now_date">'+i+'</a>';
				}else{
					str += '<a href="#">'+i+'</a>';
				}
			}
		}
		return str;
	}
	//比较date1,date2之间的差值
	Setting.getDiff = function(date1, date2, type){
		var value, diff_level = 0;
		if(date1.getFullYear() != date2.getFullYear()){
			diff_level = 1;
		}else if(date2.getMonth() != date1.getMonth()){
			diff_level = 2;
		}else if(date2.getDate() != date1.getDate()){
			diff_level = 3;
		}else if(date2.getHours() != date1.getHours()){
			diff_level = 4;
		}else if(date2.getMinutes() != date1.getMinutes()){
			diff_level = 5;
		}else if(date2.getSeconds() != date1.getSeconds()){
			diff_level = 6;
		}
		switch(type){
			case 'year':
				value = date2.getFullYear() - date1.getFullYear();
				break;
			case 'month':
				if(diff_level > 1){
					value = date2.getMonth() - date1.getMonth();
				}else{
					value = 'e';
				}
				break;
			case 'date':
				if(diff_level > 2){
					value = date2.getDate() - date1.getDate();
				}else{
					value = 'e';
				}
				break;
			case 'hour':
				if(diff_level > 3){
					value = date2.getHours() - date1.getHours();
				}else{
					value = 'e';
				}
				break;
			case 'minute':
				if(diff_level > 4){
					value = date2.getMinutes() - date1.getMinutes();
				}else{
					value = 'e';
				}
				break;
			case 'second':
				if(diff_level > 5){
					value = date2.getSeconds() - date1.getSeconds();
				}else{
					value = 'e';
				}
				break;
		}
		return value;
	}
	//根据from, to生成一个数组
	Setting.makeArray = function(from, to){
		from -= 0;
		to -= 0;
		var arr = [];
		for(;from<=to;from++){
			arr.push(from);
		}
		return arr;
	}

	//日期控件类
	function Tool(){
		this.setting = new Setting();
		this.setting.parent = this;

		this.enable = true;

		//各种事件
		this.getBindType('beforeShow');
		this.getBindType('show');
		this.getBindType('beforeHide');
		this.getBindType('hide');
		this.getBindType('beforeDropListShow');
		this.getBindType('dropListShow');
		this.getBindType('beforeDropListHide');
		this.getBindType('dropListHide');

		this.getBindType('dropListClick');
		this.getBindType('dateListRefresh');

		this.getBindType('dateListClick');
	}
	Tool.prototype = new canBind();
	Tool.prototype.constructor = Tool;

	Tool.prototype.show = function(){
		this.trigger('beforeShow');
		openDateTool();
		this.trigger('show');
		return this;
	}
	Tool.prototype.hide = function(){
		this.trigger('beforeShow');
		closeDateTool();
		this.trigger('show');
		return this;
	}
	Tool.prototype.remove = function(){
		this.target.removeAttr('data-hdl-date-tool').unbind(targetClick).attr('readonly', false);
		return this;
	}
	Tool.prototype.fillInput = function(type){
		var i, arr, date_arr = this.setting.date_arr;
		if(arguments.length == 1){
			list_ipt.find('input.hdl_'+type).val(date_arr.item(type));
		}else{
			arr = 'year,month,date,hour,minute,second'.split(',');
			for(i=0;i<6;i++){
				list_ipt.find('input.hdl_'+arr[i]).val(date_arr.item(arr[i]));
			}
		}
		return this;
	}
	Tool.prototype.fillTarget = function(){
		var date_arr = this.setting.date_arr, arr, str, temp, arr2=[], i;
		arr = 'year,month,date'.split(',');
		for(i=0;i<3;i++){
			temp = date_arr.item(arr[i]);
			temp == 'any' ? null : arr2.push(temp);
		}
		str = arr2.join('-');
		arr2.length = 0;

		arr = 'hour,minute,second'.split(',');
		for(i=0;i<3;i++){
			temp = date_arr.item(arr[i]);
			temp == 'any' ? null : arr2.push(temp);
		}
		str += ' '+arr2.join(':');

		now_tool.target.val(str.trim());
		return this;
	}
	Tool.prototype.refresh = function(){
		var value = this.target.val();
		this.setting.refreshFixed();
		value = this.setting.parseValueToDate(value);
		if(value){
			this.setting.date_arr.setDate(value);
			this.fillInput();
		}else{
			this.fillInput();
			this.fillTarget();
		}
		this.setting.refreshDataList();
		return this;
	}
	Tool.prototype.setEnable = function(/*Boolean*/value){
		value = Boolean(value);
		this.setting.enable = value;
		return this;
	}

	Tool.guid = function(){
		var key;
		do{
			key = timestamp()+'';
		}
		while(global_dt[key]);
		return key;
	}
/**********************************************************************************************
*定义外部函数
*/

	//外部使用的函数,包括对当前需要填充日期的初始化设置2010-5-19
	function hdlDateTool(args){
		//修正参数
		if(typeof args == 'string' && /^(?:-(?:year|month|date|hour|minute|second)(?:\d{0,4})(?=-))+-$/.test(args)){
			args = {fixed: args};
		}else if(typeof args == 'undefined'){
			args = {};
		}else if(typeof args != 'object'){
			args = {} ;
			sayNotice('hdlDateTool: 参数不是预期值,将使用默认值{},请确认: ' + args);
		}

		//循环注册
		return this.each(function(){
			var tool, key, me = $(this);

			if(!me.attr('data-hdl-date-tool')){
				tool = new Tool();
				key = Tool.guid();
				global_dt[key] = tool;

				tool.target = me;
				me.attr('data-hdl-date-tool', key);

				me.click(targetClick).attr('readonly', true);
			}else{
				tool = global_dt[me.attr('data-hdl-date-tool')];
			}

			$.extend(true, tool.setting, args);
		});
	}

/**********************************************************************************************
* 将元素加入DOM,并将函数注册到jq原型链
*/

	//页面加载完成之后,将元素放入DOM
	$(function(){
		$('head').append(css);
		$('body').append(div);
	});

	//注册到jq原型上
	$.fn.hdlDateTool = hdlDateTool;
	$.fn.hdlDateSetting = function(){
		return global_dt[this.attr('data-hdl-date-tool')];
	};
})(jQuery);
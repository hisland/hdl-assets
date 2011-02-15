/**********************************************************************************************
 * 日期控件
 * 作者:hisland
 * 邮件:hisland@qq.com
 *
 * 前置脚本:jquery-1.4.2.min.js; patch.javascript.js;
 */
(function($){

	var month_days_list = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],		//月份的天数列表
		fixed_regexp  = /-(year|month|date|hour|minute|second)(\d{0,4})(?=-)/gi,	//fixed字符串的匹配模式
		date_regexp   = /(^\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$)|(^\d{4}\/\d{1,2}\/\d{1,2}$)|(^\d{1,2}:\d{1,2}:\d{1,2}$)|(^\d{4}\/\d{1,2}$)|(^\d{1,2}\/\d{1,2}$)/,//匹配支持的日期模式
		pre_setting   = {
							 fixed : ''
							,range : {
										 year:  {start :2010, end:2010}
										,month: {start :1, end:12}
										,date:  {start :1, end:31}
										,hour:  {start :0, end:23}
										,minute:{start :0, end:59}
										,second:{start :0, end:59}
									}
							,nextIpt:0
							,checker :0
						};

	//时间控件范围的变量,初始化了以后就直接使用
	var wrap_div,	//日历包含层
		btn_complete,//完成按钮
		btn_today,	//今天按钮
		btn_clear,	//清除按钮

		ipt_year,	//年输入框
		ipt_month,	//月输入框
		ipt_date,	//日输入框
		ipt_hour,	//时输入框
		ipt_minute,	//分输入框
		ipt_second,	//秒输入框

		list_ipt,	//内部输入框的包含层
		list_drop,	//下拉列表
		list_date,	//月的日期列表

		date_disabled = 0,	//是否禁用日期列表点击
		now_ipt,			//正在填充的控件内部输入框
		target_ipt;			//需要填入日期的地方

	//更新日期列表
	function refreshDateList(){
		var year  = target_ipt[0].hdl_DT_setting.date.getFullYear(),
			month = target_ipt[0].hdl_DT_setting.date.getMonth(),
			date  = target_ipt[0].hdl_DT_setting.date.getDate();

		//获得当月的天数
		month_days_list[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;//修正2月天数
		var monthDays = month_days_list[month];
		target_ipt[0].hdl_DT_setting.range.date.end = monthDays;

		//获取1号是星期几
		var firstDay = new Date(year+'/'+month+'/01').getDay();

		//拼凑日期列表字符串
		var str = '';
		for(var i=1;i<firstDay;i++)
			str += '<span></span>';
		for(var i=1;i<=monthDays;i++)
			if(i == date && !date_disabled)
				str += '<a href="#" class="now_date">'+i+'</a>';
			else
				str += '<a href="#">'+i+'</a>';
		list_date.html(str);
	}
	//生成下拉列表 + 检查无问题2010-5-19
	function refreshDropList( fromNum, toNum, nowNum ){
		var str = '';
		for( ; fromNum <= toNum ; fromNum++ ){
			if(fromNum == nowNum){
				str += '<a href="#" class="selected">'+fromNum+'</a>';
			}else{
				str += '<a href="#">'+fromNum+'</a>';
			}
		}
		list_drop.html(str);
		if(!list_drop.find('a.selected').length){
			list_drop.find('a:last').addClass('selected').focus();
		}else{
			list_drop.find('a.selected').focus();
		}
		now_ipt.focus();
	}
	//关闭时间控件层
	function closeDateTool(){
		list_drop.hide();
		wrap_div.hide();
		if(target_ipt && target_ipt[0].hdl_DT_setting.nextIpt){
			target_ipt[0].hdl_DT_setting.nextIpt.click();
		}
	}
	//向上或者向下,支持按键,滚轮 + 检查无问题2010-5-19
	function upOrDown(e, delta){
		var a = list_drop.find('a.selected');
		var next = $(this).parent().next('label').children('input:enabled');

		if((e.keyCode == 38 || delta > 0) && a.prev().length){//向上滚动
			a.prev().click();
		}else if((e.keyCode == 40 || delta < 0) && a.next().length){//向下滚动
			a.next().click();
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
	//更新目录输入框 + 检查无问题2010-5-19
	function refreshTarget(){
		var dates = list_ipt.find('input:lt(3)').filter(':not([value=any])').map(function(){return this.value;}).get().join('-');
		var times = list_ipt.find('input:gt(2)').filter(':not([value=any])').map(function(){return this.value;}).get().join(':');
		target_ipt.val((dates + ' ' + times).trim());
	}
	//把字符串值转换成日期对象并返回 + 检查无问题2010-6-3
	function parseValueToDate(value){
		var arr = value.replace(/-/g,'/').match(date_regexp);
		var date_obj = new Date();

		if(!arr){		//没有的时候
			date_obj = false;
		}else if(arr[1]){//"2010/05/19 16:02:26"的形式 == 年/月/日 时:分:秒
			date_obj = new Date(arr[1]);
		}else if(arr[2]){//"2010/05/19"的形式 == 年/月/日
			date_obj = new Date(arr[2]);
		}else if(arr[3]){//"16:02:26"的形式 == 时:分:秒
			date_obj = new Date(date_obj.getDateString().replace(/-/g,'/')+' '+arr[3]);
		}else if(arr[4]){//"2010/05"的形式 == 年/月
			date_obj = new Date(arr[4]+'/'+date_obj.getDate());
		}else if(arr[5]){//"05/19"的形式 == 月/日
			date_obj = new Date(date_obj.getFullYear()+'/'+arr[5]);
		}

		return date_obj;
	}
	//填充日期并重新生成日期列表
	function fillDate(){
		var init_date = target_ipt[0].hdl_DT_setting.date;

		//去掉可能的disabled属性
		list_ipt.find('input').removeAttr('disabled').removeClass('disabled');

		//根据fixed字符串设置disabled属性和值
		target_ipt[0].hdl_DT_setting.fixed.replace(fixed_regexp,function(a, b, c){
			if(!c){
				list_ipt.find('input.hdl_'+b).attr('disabled','disabled').addClass('disabled').val('any');//被固定的都要禁用掉
			}else{
				list_ipt.find('input.hdl_'+b).attr('disabled','disabled').addClass('disabled').val(c.length==1 ? '0'+c : c);//被固定的都要禁用掉
			}
			return a;
		});

		//填充剩下的输入框
		list_ipt.find('input:enabled').each(function(){
			this.getVal();
		});

		//填充日期列表
		refreshDateList();
		refreshTarget();
	}
	//页面加载完成之后,做时间层的初始化
	$(function(){

		//设置层和样式表
		var css = '<style type="text/css">#hdlDateTool_div{display:none;z-index:3000;position:absolute;font-size:12px;border:1px solid #92B0DD;background:#fff;width:213px;font-family:"宋体";}#hdlDateTool_div *{margin:0;padding:0;}#hdlDateTool_div .hdl_ctrl{height:14px;padding:3px;background:#96C2F1;}#hdlDateTool_div .hdl_ctrl .hdl_tips{float:left;line-height:14px;color:#fff;}#hdlDateTool_div .hdl_ctrl .hdl_btns{float:right;line-height:14px;}#hdlDateTool_div .hdl_ctrl .hdl_btns a{display:inline-block;cursor:pointer;color:#000;text-decoration:none;margin-left:8px;}#hdlDateTool_div .hdl_ctrl .hdl_btns a:hover{color:#666;}#hdlDateTool_div .hdl_ipt_list{padding:4px 0 4px 4px;overflow:hidden;zoom:1;}#hdlDateTool_div .hdl_ipt_list label{float:left;margin-right:1px;}#hdlDateTool_div .hdl_ipt_list input{font-family:"宋体";font-size:12px;height:14px;width:20px;border:1px solid #bbe1f1;text-align:center;margin-right:1px;-moz-border-radius:3px;ime-mode:disabled;}#hdlDateTool_div .hdl_ipt_list input.disabled{border-color:#999;color:#999;background:#ddd;}#hdlDateTool_div .hdl_ipt_list input.hdl_year{width:28px;}#hdlDateTool_div .hdl_ipt_list label.hdl_hour_label{padding-left:5px;}#hdlDateTool_div .hdl_week_list{clear:both;padding-left:5px;overflow:hidden;zoom:1;}#hdlDateTool_div .hdl_week_list span{float:left;width:19px;height:18px;line-height:18px;margin:1px 5px;cursor:default;text-align:center;}#hdlDateTool_div .hdl_date_list{padding:0 0 5px 5px;overflow:hidden;cursor:default;zoom:1;}#hdlDateTool_div .hdl_date_list span,#hdlDateTool_div .hdl_date_list a{float:left;width:19px;height:18px;line-height:18px;margin:1px 5px;text-align:center;text-decoration:none;color:#333;-moz-border-radius:3px;outline:none;cursor:default;}#hdlDateTool_div .hdl_date_list a:hover{background:#e7f3ff;cursor:pointer;}#hdlDateTool_div .hdl_date_list a.now_date{width:17px;height:16px;line-height:16px;border:1px solid #96c2f1;background:#e7f3ff;}#hdlDateTool_div div.date_disabled a:hover{background:none;cursor:default;}#hdlDateTool_div div.date_disabled a.now_date:hover{background:#e7f3ff;cursor:default;}#hdlDateTool_div .hdl_drop_list{position:absolute;border:1px solid  #92b0dd;background:#fff;height:100px;overflow-y:scroll;overflow-x:hidden;*min-width:20px;*padding-right:17px;}#hdlDateTool_div .hdl_drop_list a{display:block;text-align:center;text-decoration:none;color:#333;padding:1px 4px;}#hdlDateTool_div .hdl_drop_list a:hover, #hdlDateTool_div .hdl_drop_list a.selected{background:#96c2f1;}</style><!--[if ie 6]><style type="text/css">#hdlDateTool_div .hdl_drop_list{overflow-x:visible;}</style><![endif]-->';
		var div = $('<div id="hdlDateTool_div"><div class="hdl_ctrl"><div class="hdl_tips">鼠标滚轮选择</div><div class="hdl_btns"><a href="#" class="hdl_clear">清除</a><a href="#" class="hdl_today">今天</a><a href="#" class="hdl_complete">完成</a></div></div><div class="hdl_ipt_list"><label><input type="text" class="hdl_year disabled" disabled="disabled" maxlength="4" value="any" />年</label><label><input type="text" class="hdl_month" maxlength="3" />月</label><label><input type="text" class="hdl_date" maxlength="3" />日</label><label class="hdl_hour_label"><input type="text" class="hdl_hour" maxlength="3" />:</label><label><input type="text" class="hdl_minute" maxlength="3" />:</label><label><input type="text" class="hdl_second" maxlength="3" /></label></div><div class="hdl_week_list"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div><div class="hdl_date_list"></div><div class="hdl_drop_list"></div></div>');
		$('head').append(css);
		$('body').append(div);

		//将需要的外部变量保存
		wrap_div	= div;
		btn_today	= div.find('a.hdl_today');
		btn_complete= div.find('a.hdl_complete');
		btn_clear	= div.find('a.hdl_clear');

		ipt_year	= div.find('input.hdl_year');
		ipt_month	= div.find('input.hdl_month');
		ipt_date	= div.find('input.hdl_date');
		ipt_hour	= div.find('input.hdl_hour');
		ipt_minute	= div.find('input.hdl_minute');
		ipt_second	= div.find('input.hdl_second');

		list_ipt	= div.find('div.hdl_ipt_list');
		list_drop	= div.find('div.hdl_drop_list');
		list_date	= div.find('div.hdl_date_list');

		//给它们定义统一的方法,放在dom结点上,方便后面调用,不用再做判断
		ipt_year[0].setVal   = function(){target_ipt[0].hdl_DT_setting.date.setFullYear(this.value)}
		ipt_month[0].setVal  = function(){target_ipt[0].hdl_DT_setting.date.setMonth(this.value-1)}
		ipt_date[0].setVal   = function(){target_ipt[0].hdl_DT_setting.date.setDate(this.value)}
		ipt_hour[0].setVal   = function(){target_ipt[0].hdl_DT_setting.date.setHours(this.value)}
		ipt_minute[0].setVal = function(){target_ipt[0].hdl_DT_setting.date.setMinutes(this.value)}
		ipt_second[0].setVal = function(){target_ipt[0].hdl_DT_setting.date.setSeconds(this.value)}

		ipt_year[0].getVal   = function(){var val = target_ipt[0].hdl_DT_setting.date.getFullYear();this.value = val<10? '0'+val : val}
		ipt_month[0].getVal  = function(){var val = target_ipt[0].hdl_DT_setting.date.getMonth()+1;this.value = val<10? '0'+val : val}
		ipt_date[0].getVal   = function(){var val = target_ipt[0].hdl_DT_setting.date.getDate();this.value = val<10? '0'+val : val}
		ipt_hour[0].getVal   = function(){var val = target_ipt[0].hdl_DT_setting.date.getHours();this.value = val<10? '0'+val : val}
		ipt_minute[0].getVal = function(){var val = target_ipt[0].hdl_DT_setting.date.getMinutes();this.value = val<10? '0'+val : val}
		ipt_second[0].getVal = function(){var val = target_ipt[0].hdl_DT_setting.date.getSeconds();this.value = val<10? '0'+val : val}

		//包含层
		wrap_div.click(function(){//点击阻止事件冒泡,保证不关闭
			list_drop.hide();
			now_ipt = null;
			return false;
		}).mousewheel(upOrDown);//鼠标滚动时,设置当前填充的数字

		//页面其它地方点击关闭层
		$(document).click(closeDateTool);

		//今天按钮点击把日期设置为当前时间
		btn_today.click(function(){
			target_ipt[0].hdl_DT_setting.date = new Date();
			fillDate();
		});

		//清空目标输入框
		btn_clear.click(function(e){
			target_ipt.val('');
		});

		//完成按钮点击关闭层
		btn_complete.click(closeDateTool);

		//输入框列表
		list_ipt.mouseover(function(e){//鼠标进入的时候,给个延迟
			var elm = $(e.target).filter('input:enabled');
			if(elm.length){
				this.show_timer = setTimeout(function(){
					elm.click();
				},100);
			}
		}).mouseout(function(e){//鼠标出去的时候,清除延迟
			clearTimeout(this.show_timer);
		});

		//内部输入框的获取到焦点事件
		list_ipt.find('input').click(function(e){
			now_ipt		 = $(this);
			var position = now_ipt.position();
			var height	 = now_ipt.outerHeight();
			list_drop.css({left:position.left, top:position.top+height+1}).show();

			var range = target_ipt[0].hdl_DT_setting.range[this.className.slice(4)];
			refreshDropList( range.start, range.end, this.value );

			e.stopPropagation();//点击的时候阻止冒泡,防止下拉列表被关闭
		})
		.keydown(upOrDown)//键盘按键时
		.focus(function(e){//获得焦点时,如果不是当前输入框,则设置为当前
			if(now_ipt && now_ipt[0] != this){
				$(this).click();
			}
		});

		//日期列表
		list_date.click(function(e){//点击填充输入框
			var elm = $(e.target).filter('a');
			if(!date_disabled && elm.length){
				elm.addClass('now_date').siblings('.now_date').removeAttr('class');
				ipt_date.val(elm.html()<10? '0'+elm.html() : elm.html());
				ipt_date[0].setVal();
				refreshTarget();
			}
			elm.blur();
			now_ipt = null;
		}).dblclick(function(e){//双击关闭层
			if($(e.target).filter('a').length){
				closeDateTool();
			}
		});

		//下拉列表
		list_drop.click(function(e){//点击
			var elm = $(e.target).filter('a');
			if(now_ipt && elm.length){
				var val = elm.html()-0;
				elm.addClass('selected').focus().siblings('.selected').removeAttr('class');

				//如果是日期输入,更新日期列表
				if(now_ipt[0] == ipt_date[0]){
					list_date.find('a.now_date').removeAttr('class');
					list_date.find('a:eq('+(val-1)+')').addClass('now_date');
					now_ipt.val(val<10? '0'+val : val).focus();
					now_ipt[0].setVal();
					refreshTarget();
					return false;

				//如果是月,更新日期列表
				}else if(now_ipt[0] == ipt_month[0]){
					ipt_date.val() > month_days_list[val-1] ? ipt_date.val(month_days_list[val-1]) : 0;

				//如果是年,更新日期列表
				}else if(now_ipt[0] == ipt_year[0]){
					month_days_list[1] = val%400==0 || (val%4==0 && val%100!=0) ? 29 : 28;//修正2月天数
					ipt_date.val() > month_days_list[ipt_month.val()-1] ?ipt_date.val( month_days_list[ipt_month.val()-1]) : 0;
				}

				now_ipt.val(val<10? '0'+val : val).focus();
				if(ipt_date.val() !== 'any'){
					ipt_date[0].setVal();
				}
				now_ipt[0].setVal();
				refreshDateList();
				refreshTarget();
			}
			return false;
		});
	});

	//外部使用的函数,包括对当前需要填充日期的初始化设置2010-5-19
	function hdlDateTool(args){

		args = args || {};

		return this.each(function(){
			var me = $(this);
			var init_date = parseValueToDate(this.value);
			init_date = init_date || new Date();

			var tmp_args = {range:{year:{start:init_date.getFullYear()-10, end:init_date.getFullYear()+10}}
							,date:init_date
							};

			fixed_regexp.lastIndex = 0;
			if(fixed_regexp.test(args)){//为fixed字符串的形式
				$.extend(true, tmp_args, {fixed:args});
				
			}else if(typeof args === 'object'){
				$.extend(true, tmp_args, args);
			}

			//保存当前的设置到dom对象上
			this.hdl_DT_setting = $.extend(true, {}, pre_setting, tmp_args);

			//当前元素事件注册
			me.click(function(){
				target_ipt = me;

				var init_date = parseValueToDate(this.value);
				init_date ? this.hdl_DT_setting.date = init_date : 0;

				//日期列表先初始化为可使用的
				list_date.removeClass('date_disabled');
				date_disabled = 0;
				this.hdl_DT_setting.fixed.replace(fixed_regexp,function(a, b, c){
					//如果固定了日期,则日期列表不能用
					if(b == 'date'){
						list_date.addClass('date_disabled');
						date_disabled = 1;
					}
					return a;
				});

				//定位并显示日期层
				//可能是从一个输入框到另一个输入框,清除这些设置
				now_ipt = null;
				list_drop.hide();
				var offset = target_ipt.offset();
				var height	 = target_ipt.outerHeight();
				wrap_div.css({left:offset.left, top:offset.top+height+1}).show();

				//填充日期并重新生成日期列表
				fillDate();
				return false;
			}).keydown(function(){//让它不能输入
				return false;
			});
		});
	}

	//注册到jq原型上
	$.fn.hdlDateTool = hdlDateTool;
})(jQuery);
(function($){

	//月份的天数列表
	var monthDaysList = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	//时间控件范围的变量,初始化了以后就直接使用
	var wrap_div,	//日历包含层
		btn_complete,//完成按钮
		btn_today,	//今天按钮
		btn_clear,	//清除按钮

		ipt_year,	//年输入框
		ipt_month,	//月输入框
		ipt_date,	//日输入框
		ipt_hour,	//时输入框
		ipt_minute,//分输入框
		ipt_second,//秒输入框

		list_ipt,	//内部输入框的包含层
		list_drop,	//下拉列表
		list_month,	//月的日期列表
		list_month_mask,//月的日期列表遮罩层

		now_ipt,	//正在填充的控件内部输入框
		target;		//需要填入日期的地方

	/**********************************************************************************************
	 *生成月的日期列表
	 *year	: 当前年
	 *month	: 当前月
	 *date	: 当前日期
	 *
	 *返回生成的日期列表字符串表示
	 */
	function refreshMonthList( year, month, date ){
		year  = year=='any' ? 2010 : year;
		month = month=='any' ? 1 : month;
		date  = date=='any' ? 1 : date;

		//获得当月的天数
		monthDaysList[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;//修正2月天数
		var monthDays = monthDaysList[month-1];

		//修正目标输入框保存参数里面的月的大天数
		target[0].args.range.date[1] = monthDays;

		//获取1号是星期几
		var firstDay = new Date(year+'/'+month+'/01').getDay();

		//拼凑日期列表字符串
		var str = '';
		for(var i=1;i<firstDay;i++)
			str += '<span></span>';
		for(var i=1;i<=monthDays;i++)
			if(i == date)
				str += '<a href="#" class="now_date">'+i+'</a>';
			else
				str += '<a href="#">'+i+'</a>';
		list_month.html(str);
		list_month_mask.height(list_month.outerHeight()+20);
	}

	/**********************************************************************************************
	 *生成下拉列表
	 *fromNum : 下拉列表开始数字
	 *toNum   : 下拉列表结束数字
	 *nowNum  : 下拉列表当前数字
	 *
	 *返回生成的下拉列表字符串表示
	 */
	function refreshDropList( fromNum, toNum, nowNum ){
		var str = '';
		if(!nowNum){
			str += '<a href="#" class="selected">'+(fromNum++)+'</a>';
		}
		for( ; fromNum <= toNum ; fromNum++ ){
			if(fromNum == nowNum){
				str += '<a href="#" class="selected">'+fromNum+'</a>';
			}else{
				str += '<a href="#">'+fromNum+'</a>';
			}
		}
		list_drop.html(str);
	}

	//关闭时间控件层
	function closeDateTool(){
		list_drop.hide();
		wrap_div.hide();
	}

	//向上或者向下
	function upOrDown(e, delta){
		var a = list_drop.find('a.selected');
		if((e.keyCode == 38 ||delta > 0) && a.prev().length){//向上滚动
			a.prev().click();
		}else if((e.keyCode == 40 || delta < 0) && a.next().length){//向下滚动
			a.next().click();
		}

		var next = $(this).parent().next('label').children('input:enabled');
		if(delta){//鼠标滚动时,阻止默认行为
			return false;
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
		}else{//其它键
			return false;
		}
	}

	//填充日期并重新生成日期列表
	function fillDate(){
		var init_date = target[0].args.date;

		//去掉可能的disabled属性
		list_ipt.find('input').removeAttr('disabled').removeClass('disabled');

		//可能是从一个输入框到另一个输入框,清除这些设置
		now_ipt = null;
		list_drop.hide();

		//可能需要隐藏它
		list_month_mask.hide();

		//填充日期列表
		refreshMonthList( init_date.getFullYear(), init_date.getMonth()+1, init_date.getDate() );

		//根据设置增加disabled属性
		var fixed = {
						year   : init_date.getFullYear(),
						month  : init_date.getMonth()+1,
						date   : init_date.getDate(),
						hour   : init_date.getHours(),
						minute : init_date.getMinutes(),
						second : init_date.getSeconds()
					};
		target[0].args.fixed.replace(/-(year|month|date|hour|minute|second)(\d{0,4})(?=-)/g,function(a, b, c){
			if(!c){
				c = 'any';
			}else{
				c -= 0;
			}

			//固定了日期,则把日期列表遮住
			if(b == 'date'){
				list_month_mask.show();
			}

			//被固定的都要禁用掉
			list_ipt.find('input.hdl_'+b).attr('disabled','disabled').addClass('disabled');
			fixed[b] = c;
			return a;
		});

		//填充6个输入框
		ipt_year.val(fixed.year);
		ipt_month.val(fixed.month);
		ipt_date.val(fixed.date);
		ipt_hour.val(fixed.hour);
		ipt_minute.val(fixed.minute);
		ipt_second.val(fixed.second);

		refreshTarget();
	}

	//更新目录输入框
	function refreshTarget(){
		var dates = list_ipt.find('input:lt(3)').filter(':not([value=any])').map(function(){var v = this.value;return v.length==1?'0'+v:v;}).get().join('-');
		var times = list_ipt.find('input:gt(2)').filter(':not([value=any])').map(function(){var v = this.value;return v.length==1?'0'+v:v;}).get().join(':');
		target.val((dates + ' ' + times).trim());
	}

	//页面加载完成之后,做时间层的初始化
	$(function(){

		//设置层和样式表
		var css = '<style type="text/css">#hdlDateTool_div{display:none;z-index:3000;position:absolute;font-size:12px;border:1px solid #92B0DD;background:#fff;width:213px;font-family:\'宋体\';}#hdlDateTool_div *{margin:0;padding:0;}#hdlDateTool_div .hdl_ctrl{height:14px;padding:3px;background:#96C2F1;}#hdlDateTool_div .hdl_ctrl .hdl_tips{float:left;line-height:14px;color:#fff;}#hdlDateTool_div .hdl_ctrl .hdl_btns{float:right;line-height:14px;}#hdlDateTool_div .hdl_ctrl .hdl_btns a{display:inline-block;cursor:pointer;color:#000;text-decoration:none;margin-left:8px;}#hdlDateTool_div .hdl_ctrl .hdl_btns a:hover{color:#666;}#hdlDateTool_div .hdl_ipt_list{padding:4px 0 4px 4px;overflow:hidden;zoom:1;}#hdlDateTool_div .hdl_ipt_list label{float:left;margin-right:1px;}#hdlDateTool_div .hdl_ipt_list input{font-family:\'宋体\';font-size:12px;height:14px;width:20px;border:1px solid #bbe1f1;text-align:center;margin-right:1px;-moz-border-radius:3px;ime-mode:disabled;}#hdlDateTool_div .hdl_ipt_list input.disabled{border-color:#999;color:#999;background:#fff;}#hdlDateTool_div .hdl_ipt_list input.hdl_year{width:28px;}#hdlDateTool_div .hdl_ipt_list input.hdl_hour{margin-left:5px;}#hdlDateTool_div .hdl_week_list{clear:both;padding-left:5px;overflow:hidden;zoom:1;}#hdlDateTool_div .hdl_week_list span{float:left;width:19px;height:18px;line-height:18px;margin:1px 5px;cursor:default;text-align:center;}#hdlDateTool_div .hdl_month_list{padding:0 0 5px 5px;overflow:hidden;zoom:1;}#hdlDateTool_div .hdl_month_list span,#hdlDateTool_div .hdl_month_list a{float:left;width:19px;height:18px;line-height:18px;margin:1px 5px;text-align:center;text-decoration:none;color:#333;-moz-border-radius:3px;}#hdlDateTool_div .hdl_month_list a:hover{background:#e7f3ff;}#hdlDateTool_div .hdl_month_list a.now_date{width:17px;height:16px;line-height:16px;border:1px solid #96c2f1;background:#e7f3ff;-moz-border-radius:3px;}#hdlDateTool_div .hdl_drop_list{display:none;position:absolute;border:1px solid  #92b0dd;background:#fff;height:100px;overflow-y:scroll;*padding-right:17px;}#hdlDateTool_div .hdl_drop_list a{display:block;text-align:center;text-decoration:none;color:#333;padding:1px 4px;}#hdlDateTool_div .hdl_drop_list a:hover, #hdlDateTool_div .hdl_drop_list a.selected{background:#96c2f1;}#hdlDateTool_div .hdl_hide_month_list{display:none;position:absolute;left:0;bottom:0;*bottom:-1px;width:100%;height:125px;background:#000;opacity:0.2;filter:alpha(opacity=20);}</style>';
		var div = $('<div id="hdlDateTool_div"><div class="hdl_ctrl"><div class="hdl_tips">可用滚轮选择</div><div class="hdl_btns"><a href="#" class="hdl_clear">清除</a><a href="#" class="hdl_today">今天</a><a href="#" class="hdl_complete">完成</a></div></div><div class="hdl_ipt_list"><label><input type="text" class="hdl_year disabled" disabled="disabled" maxlength="4" value="any" />年</label><label><input type="text" class="hdl_month" maxlength="3" />月</label><label><input type="text" class="hdl_date" maxlength="3" />日</label><label><input type="text" class="hdl_hour" maxlength="3" />:</label><label><input type="text" class="hdl_minute" maxlength="3" />:</label><label><input type="text" class="hdl_second" maxlength="3" /></label></div><div class="hdl_week_list"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div><div class="hdl_month_list"><span></span><span></span><span></span><span></span><a href="#">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#" class="now_date">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">10</a><a href="#">11</a><a href="#">12</a><a href="#">13</a><a href="#">14</a><a href="#">15</a><a href="#">16</a><a href="#">17</a><a href="#">18</a><a href="#">19</a><a href="#">20</a><a href="#">21</a><a href="#">22</a><a href="#">23</a><a href="#">24</a><a href="#">25</a><a href="#">26</a><a href="#">27</a><a href="#">28</a><a href="#">29</a><a href="#">30</a><a href="#">31</a></div><div class="hdl_hide_month_list" title="暂时不能选择日期"></div><div class="hdl_drop_list"><a href="#">1</a><a href="#">11</a><a href="#" class="selected">2010</a><a href="#">111</a><a href="#">2008</a><a href="#">2009</a><a href="#">2008</a><a href="#">2009</a><a href="#">2008</a><a href="#">2009</a><a href="#">2008</a><a href="#">2009</a></div></div>');
		$('head').append(css);
		$('body').append(div);

		//将需要的外部变量保存
		wrap_div	= div;
		btn_today	= $( 'a.hdl_today', div );
		btn_complete= $( 'a.hdl_complete', div );
		btn_clear	= $( 'a.hdl_clear', div );

		ipt_year	= $( 'input.hdl_year', div );
		ipt_month	= $( 'input.hdl_month', div );
		ipt_date	= $( 'input.hdl_date', div );
		ipt_hour	= $( 'input.hdl_hour', div );
		ipt_minute	= $( 'input.hdl_minute', div );
		ipt_second	= $( 'input.hdl_second', div );

		list_ipt	= $( 'div.hdl_ipt_list', div );
		list_drop	= $( 'div.hdl_drop_list', div );
		list_month	= $( 'div.hdl_month_list', div );

		list_month_mask = $( 'div.hdl_hide_month_list', div );

		//包含层点击阻止事件冒泡,保证不关闭, 鼠标滚动时,设置当前填充的数字
		wrap_div.click(function(){
			list_drop.hide();
			now_ipt = null;
			return false;
		}).mousewheel(upOrDown);

		//页面其它地方点击关闭层
		$(document).click(closeDateTool);

		//今天按钮点击把日期设置为当前时间
		btn_today.click(function(){
			target[0].args.date = new Date();
			fillDate();
		});
		//清空目标输入框
		btn_clear.click(function(e){
			target.val('');
		});
		//完成按钮点击关闭层
		btn_complete.click(closeDateTool);

		//鼠标进入的时候,给个延迟
		list_ipt.mouseover(function(e){
			var elm = $(e.target).filter('input:enabled');
			if(elm.length){
				this.show_timer = setTimeout(function(){
					elm.focus();
				},100);
			}

		//鼠标出去的时候,清除延迟
		}).mouseout(function(e){
			clearTimeout(this.show_timer);
		});

		//内部输入框的获取到焦点事件
		list_ipt.find('input').focus(function(e){
			now_ipt		 = $(this);
			var position = now_ipt.position();
			var height	 = now_ipt.outerHeight();
			list_drop.css({left:position.left, top:position.top+height+1}).show();

			var range = target[0].args.range[this.className.slice(4)];
			refreshDropList( range[0], range[1], this.value );
		})
		//键盘按键时
		.keydown(upOrDown)
		//点击的时候阻止冒泡,防止下拉列表被关闭
		.click(function(e){
			e.stopPropagation();
		});;

		//日期列表的点击与双击事件注册
		list_month.click(function(e){
			var elm = $(e.target).filter('a');
			if(elm.length){
				elm.addClass('now_date').blur().siblings().removeAttr('class');
				ipt_date.val(elm.html());
				target[0].args.date.setDate(elm.html());
				refreshTarget();
				e.preventDefault();
			}
			now_ipt = null;
		}).dblclick(function(e){
			if($(e.target).filter('a').length){
				closeDateTool();
			}
		});

		//下拉列表被点击
		list_drop.click(function(e){
			var elm = $(e.target).filter('a');
			if(now_ipt && elm.length){
				var val = elm.html()-0;
				elm.addClass('selected').focus().siblings().removeAttr('class');
				now_ipt.val(val).focus();

				//如果是日期输入,更新日期列表
				if(now_ipt[0] == ipt_date[0]){
					list_month.find('a.now_date').removeAttr('class');
					list_month.find('a:eq('+(val-1)+')').addClass('now_date');
				//如果是年或月,更新日期列表
				}else if(now_ipt[0] == ipt_year[0] || now_ipt[0] == ipt_month[0]){
					refreshMonthList( ipt_year.val(), ipt_month.val(), ipt_date.val() );
				}

				if(now_ipt[0] == ipt_year[0]){
					target[0].args.date.setFullYear(val);
				}else if(now_ipt[0] == ipt_month[0]){
					target[0].args.date.setMonth(val-1);
				}else if(now_ipt[0] == ipt_date[0]){
					target[0].args.date.setDate(val);
				}else if(now_ipt[0] == ipt_hour[0]){
					target[0].args.date.setHours(val);
				}else if(now_ipt[0] == ipt_minute[0]){
					target[0].args.date.setMinutes(val);
				}else if(now_ipt[0] == ipt_second[0]){
					target[0].args.date.setSeconds(val);
				}

				refreshTarget();
			}
			return false;
		});
	});


	/**********************************************************************************************
	 *外部使用的函数,包括对当前需要填充日期的初始化设置
	 *args	: {
			fixed : '-year2010-month-date-minute-',//需要固定的加入到里面,有固定值的写在后面,不写表示任意值
			range : {
						year   : 'any',//年范围,默认为设置年的前后10年,为'any'或者具体值时表示可使用任意值,否则只能选择某个
						month  : [ 1, 12 ],//这个和下面设置和上面的一样,范围得是有效的
						date   : [ 1, 12 ],
						hour   : [ 0, 23 ],
						minute : [ 0, 59 ],
						second : [ 0, 59 ]
					}
		}
	 */
	function hdlDateTool(args){

		args = args || {};

		//将参数的时间设置为正确值
		var value = this.val();
		value = value.replace(/-/g,function(){return '/'});
		if(/^\d{1,2}\/\d{1,2}$/.test(value)){//仅为yy/dd时,把年加上
			args.date = new Date('2010/' + value);
		}else if(/\d{4}\/\d{1,2}\/\d{1,2}($| \d{1,2}:\d{1,2}:\d{1,2})/.test(value)){//为 yyyy/mm/dd 或者 yyyy/mm/dd hh:mm:ss时
			args.date = new Date(value);
		}else if(/\d{1,2}:\d{1,2}:\d{1,2}/.test(value)){//仅为hh:mm:ss时,在前面加上年月日
			args.date = new Date('2010/1/1 ' + value);
		}else{
			args.date = new Date();
		}

		var init_year = args.date.getFullYear();

		//生成当前设置参数并覆盖掉args,放置在dom元素上
		this[0].args = $.extend(true, {
			fixed : '',
			range : {
						year   : [ init_year-10 , init_year+10 ],
						month  : [ 1, 12 ],
						date   : [ 1, 31 ],
						hour   : [ 0, 23 ],
						minute : [ 0, 59 ],
						second : [ 0, 59 ]
					}
		}, args);

		this.click(function(){
			target = $(this);

			//定位并显示日期层
			var offset = target.offset();
			var height	 = target.outerHeight();
			wrap_div.css({left:offset.left, top:offset.top+height+1}).show();

			//填充日期并重新生成日期列表
			fillDate();
			return false;
		})

		//让它不能输入
		.keydown(function(){
			return false;
		});
	}

	//注册到jq原型上
	$.fn.hdlDateTool = hdlDateTool;
})(jQuery);
(function($){
	var inputs ,  //6个输入框
		ipt_year , ipt_month , ipt_date , ipt_hours , ipt_minutes ,ipt_seconds ,//分别6个输入框
		list_drop , //下拉列表
		list_month , //月列表
		btn_ok , btn_today , //完成,今天按钮
		src_ipt , //正在填充的输入框
		wrap_div = '' ,//日历包含层
		fill_ipt;//需要填入日期的地方
		year_range = [2000,2020];//设置年限范围
		isWithTime = true;

	//withTime为true则显示时间,,,false则只显示日期
	function hdlDateTool(withTime){

		//没有日期层则初始化
		if(!$('#hdlDateTool_div').length){
			var css = '<style type="text/css">#hdlDateTool_div{display:none;position:absolute;width:14.5em;font-size:12px;border:1px solid #92B0DD;background:#fff;}#hdlDateTool_div *{margin:0;padding:0;}#hdlDateTool_div .hdl_ctrl{height:1.2em;text-align:right;padding:3px;background:#96C2F1;}#hdlDateTool_div .hdl_ctrl span{cursor:pointer;margin-left:5px;}#hdlDateTool_div .hdl_ctrl span.tips{float:left;cursor:default;margin:0;color:#fff;}#hdlDateTool_div .hdl_ipt{display:block;overflow:hidden;padding:2px;width:13.8em;margin:0 auto 5px;}#hdlDateTool_div .hdl_ipt label{float:left;}#hdlDateTool_div .hdl_ipt input{font-size:100%;width:1.2em;border:1px solid #BBE1F1;}#hdlDateTool_div .hdl_ipt input.year{width:2.3em;}#hdlDateTool_div form.without_time .ipt_time{display:none;}#hdlDateTool_div form.without_time input{width:2.4em;}#hdlDateTool_div form.without_time input.year{width:4.6em;}#hdlDateTool_div .hdl_week{overflow:hidden;width:13.8em;margin:0 auto;}#hdlDateTool_div .hdl_month{overflow:hidden;width:13.8em;margin:0 auto;}#hdlDateTool_div .hdl_week a,#hdlDateTool_div .hdl_month a{float:left;list-style:none;width:1.75em;height:1.2em;padding:1px;text-align:center;color:#333;text-decoration:none;}#hdlDateTool_div .hdl_month a:hover{background:#EFF7FF;}#hdlDateTool_div .hdl_week a{cursor:default;}#hdlDateTool_div .hdl_month a.blank{visibility:hidden;}#hdlDateTool_div .hdl_month a.nowDate{cursor:default;background:#EFF7FF;border:1px solid #96C2F1;padding:0;}#hdlDateTool_div .hdl_list_long,#hdlDateTool_div .hdl_list_short{position:absolute;top:30px;left:5px;height:100px;overflow-y:scroll;overflow-x:hidden;background:#fff;border:1px solid #92B0DD;display:none;*width:2em;*padding-right:20px;}#hdlDateTool_div .hdl_list_short{left:35px;*padding-right:10px;}#hdlDateTool_div .hdl_list_long .selected,#hdlDateTool_div .hdl_list_short .selected{background:#96C2F1;}#hdlDateTool_div .hdl_list_long a,#hdlDateTool_div .hdl_list_short a{color:#333;text-decoration:none;padding:0 3px;display:block;}#hdlDateTool_div .hdl_list_long a:hover,#hdlDateTool_div .hdl_list_short a:hover{background:#96C2F1;}</style>';
			var div = '<div id="hdlDateTool_div"><div class="hdl_ctrl"><span class="tips">可用滚轮选择</span><span class="today">今天</span><span class="complete">完成</span></div><form class="hdl_ipt without_time" action="#"><label><input type="text" name="year" class="year" />年</label><label><input type="text" name="month" />月</label><label><input type="text" name="date" />日&nbsp;</label><label class="ipt_time"><input type="text" name="hours" />:</label><label class="ipt_time"><input type="text" name="minutes" />:</label><label class="ipt_time"><input type="text" name="seconds" /></label></form><div class="hdl_week"><a>一</a><a>二</a><a>三</a><a>四</a><a>五</a><a>六</a><a>日</a></div><div class="hdl_month"></div><div class="hdl_list_long"></div></div>';
			$('head').append($(css));
			$('body').append($(div));
		}

		//如果没有 - 外部通用变量赋值 - 事件处理函数注册
		if(!wrap_div.length){
			wrap_div = $('#hdlDateTool_div');

			inputs = $('input',wrap_div);

			ipt_year = inputs.eq(0);
			ipt_month = inputs.eq(1);
			ipt_date = inputs.eq(2);
			ipt_hours = inputs.eq(3);
			ipt_minutes = inputs.eq(4);
			ipt_seconds = inputs.eq(5);

			list_drop = $('div.hdl_list_long',wrap_div);
			list_month = $('div.hdl_month',wrap_div);
			btn_ok = $('span.complete',wrap_div);
			btn_today = $('span.today',wrap_div);


			//点击这个div不关闭,关闭下拉框
			wrap_div.click(function(e){
				e.stopPropagation();
				src_ipt = null;
				list_drop.hide();
			}).mousewheel(function(e,delta){
				if(src_ipt)
					upOrDown(e,delta);
			});

			//点击页面其它地方关闭弹出层
			$(document).click(function(){
				wrap_div.hide();
			});

			ipt_year.click(function(){iptClick.call(this,['hdl_list_long','hdl_list_short'],year_range)});
			ipt_month.click(function(){iptClick.call(this,['hdl_list_short','hdl_list_long'],[1,12])});
			ipt_date.click(function(){iptClick.call(this,['hdl_list_short','hdl_list_long'],[1,getMonthDays(ipt_year.val(),ipt_month.val()-1)])});
			ipt_hours.click(function(){iptClick.call(this,['hdl_list_short','hdl_list_long'],[0,23])});
			ipt_minutes.click(function(){iptClick.call(this,['hdl_list_short','hdl_list_long'],[0,59])});
			ipt_seconds.click(function(){iptClick.call(this,['hdl_list_short','hdl_list_long'],[0,59])});

			inputs.click(function(){return false;})
				  .keydown(keyEnter)
				  .keydown(upOrDown)
				  .mouseover(function(){$(this).click()});


			ipt_date.add(ipt_seconds).keydown(function(e){
				if((!isWithTime && e.target == ipt_date[0])||(isWithTime && e.target == ipt_seconds[0])){
					if(e.keyCode == 13 || e.keyCode == 9){
						enterOk();
					}
				}
			});

			//日期列表点击上屏
			list_month.click(function(e){
				var elm = $(e.target).filter('a[href]');
				if(elm.length){
					elm.addClass('nowDate').siblings().removeAttr('class');
					ipt_date.val(elm.html());
					elm[0].blur();
					refreshInput();
				}
				src_ipt = null;
				list_drop.hide();
				return false;
			}).dblclick(function(e){
				if($(e.target).filter('a[href]').length)
					enterOk();
				return false;
			});//双击完成输入

			//下拉列表点击上屏
			list_drop.click(function(e){
				var elm = $(e.target).filter('a[href]');
				if(elm.length){
					elm.addClass('selected').siblings().removeAttr('class');
					src_ipt.val(elm.html());
					elm.focus();
					src_ipt.focus();
					refreshInput();

					//如果是日期输入,更新日期列表
					if(src_ipt[0] == ipt_date[0]){
						list_month.children('a.nowDate').removeAttr('class');
						list_month.children('a[href]').eq(elm.html()-1).addClass('nowDate');
						ipt_date.val(elm.html());
					//如果是年和月,更新日期列表
					}else if(src_ipt[0] == ipt_year[0] || src_ipt[0] == ipt_month[0]){
						initInfo(fill_ipt.val());
					}
				}
				return false;
			}).mousewheel(function(e,delta){
				if(src_ipt)
					upOrDown(e,delta);
				return false;
			});

			//点击完成输入按钮
			btn_ok.click(function(){enterOk()});
			//今天按钮
			btn_today.click(function(){
				initInfo(new Date().valueOf());
				refreshInput();
			});
		}
		
		//点击输入按钮定位并显示
		this.click(function(e){
			e.stopPropagation();
			fill_ipt = $(this);
			src_ipt = null;
			isWithTime = withTime;
			if(withTime){
				wrap_div.children('form').removeClass('without_time');
				inputs = $('input',wrap_div);
			}else{
				wrap_div.children('form').addClass('without_time');
				inputs = $('input:lt(3)',wrap_div);
			}
			initInfo(this.value);
			var offset = $(this).offset();
			var height = $(this).outerHeight();
			wrap_div.css({left:offset.left+'px',top:(offset.top+height+1)+'px'}).show();
			list_drop.hide();
		});
	}

	//获得焦点,(showType['hdl_list_short','hdl_list_long'],fromTo[1,31])
	function iptClick(showType,fromTo){
		if(!src_ipt || src_ipt[0] != this){
			src_ipt = $(this);
			var position = $(this).position();
			var height = $(this).outerHeight();
			list_drop.addClass(showType[0]).removeClass(showType[1]).css({left:position.left+'px',top:(position.top+height+1)+'px'}).show();
			list_drop.html(createList(fromTo[0],fromTo[1],this.value));
			list_drop.children('a.selected').click();
		}
		this.focus();
	}

	//回车键/tab键
	function keyEnter(e){
		if(e.keyCode == 13){
			$(this).parent().next('label').children('input').click();
		}else if(e.keyCode == 9){
			$(this).parent().next('label').children('input').click();
			return false;
		}
	}

	//按键上下或者滚轮上下
	function upOrDown(e,delta){
		if((e.keyCode == 38 ||delta > 0) && $('a.selected',list_drop).prev().length){//向上滚动
			$('a.selected',list_drop).removeAttr('class').prev().addClass('selected').click();
		}else if((e.keyCode == 40 || delta < 0) && $('a.selected',list_drop).next().length){//向下滚动
			$('a.selected',list_drop).removeAttr('class').next().addClass('selected').click();
		}
		if(delta)
			return false;
	}

	//更新目标输入框
	function refreshInput(){
		fill_ipt.val((inputs.filter(':lt(3)').map(function(){var v = this.value;return v.length==1?'0'+v:v;}).get().join('-') + ' ' + inputs.filter(':gt(2)').map(function(){var v = this.value;return v.length==1?'0'+v:v;}).get().join(':')).trim());
	}

	//完成输入
	function enterOk(){wrap_div.hide();}

	//更新月列表和6个输入框
	function initInfo(ts){
		ts = typeof ts == 'string' ? ts.replace(/-/g,function(){return '/'}) : ts;
		ts = /\d{4}\/\d{1,2}\/\d{1,2}($| \d{1,2}:\d{1,2}:\d{1,2})|\d{1,13}/.test(ts) ? new Date(ts) : new Date();
		var year = ts.getFullYear(),
			month = ts.getMonth(),
			date = ts.getDate(),
			firstDay = new Date(year+'/'+(month+1)+'/01').getDay();

		ipt_year.val(year);
		ipt_month.val(month+1);
		ipt_date.val(date);

		ipt_hours.val(ts.getHours());
		ipt_minutes.val(ts.getMinutes());
		ipt_seconds.val(ts.getSeconds());

		list_month.html(createMonth(getMonthDays(year,month),date,firstDay));
	}

	//返回某年某个月的天数
	function getMonthDays(year,month){
		var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
		monthDays[1] = year%400==0 || (year%4==0 && year%100!=0) ? 29 : 28;//修正2月天数
		return monthDays[month];
	}

	//生成月的日期列表(天数,当前日期,1号周几)
	function createMonth(monthDays,date,firstDay){
		var str = '';
		for(var i=1;i<firstDay;i++)
			str += '<a class="blank"></a>';
		for(var i=1;i<=monthDays;i++)
			if(i == date)
				str += '<a href="#" class="nowDate">'+i+'</a>';
			else
				str += '<a href="#">'+i+'</a>';
		return str;
	}

	//生成下拉列表(开始数,结束数,当前数)
	function createList(fromNum,toNum,nowNum){
		var str = '';
		for(;fromNum<=toNum;fromNum++)
			if(fromNum == nowNum)
				str += '<a href="#" class="selected">'+fromNum+'</a>';
			else
				str += '<a href="#">'+fromNum+'</a>';
		return str;
	}

	//给String类加上trim函数
	String.prototype.lTrim = function(){return this.replace(/^\s*/,'')}
	String.prototype.rTrim = function(){return this.replace(/\s*$/,'')}
	String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,'')}

	//注册到jq原型上
	$.fn.hdlDateTool = hdlDateTool;
})(jQuery);
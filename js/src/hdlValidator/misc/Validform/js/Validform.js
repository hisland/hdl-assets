/*!
	* 通用表单验证方法;
	* Copyright 2010, Sean
	* Validform version 2.0
	* http://www.rjboy.cn
	* Date: April 7 - November 30, 2010
	
	$(".demoform").Validform({//$(".demoform")指明是哪一表单需要验证,名称需加在from表单上;
		btnSubmit:"#btn_sub", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		tipType:1, //可选项 1=>pop box,2=>side tip;
		postOnce:true, //可选项 是否开启网速慢时的二次提交防御，true开启，不填则默认关闭;
		ajaxurl:"" //ajax提交表单数据;
	});
*/

(function($){
	var errorobj=null,//指示当前验证失败的表单元素;
		msgobj,//pop box object 
		msghidden=true, //msgbox hidden?
		tipmsg={
			w:"请输入正确信息！",
			r:"通过信息验证！",
			c:"正在检测信息…",
			s:"请填入信息！",
			v:"所填信息没有经过验证，请稍后…",
			p:"正在提交数据…"
		},//默认提示文字;
		creatMsgbox=function(){
			if($("#Validform_msg").length!=0){return false;}
			msgobj=$('<div id="Validform_msg"><div class="Validform_title">提示信息<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body");//提示信息框;
			msgobj.find("a.Validform_close").click(function(){
				msgobj.hide();
				msghidden=true;
				if(errorobj){
					errorobj.focus().addClass("Validform_error");
				}
				return false;
			}).focus(function(){this.blur();});
			
			$(window).bind("scroll resize",function(){
				if(!msghidden){				  
					var left=($(window).width()-msgobj.width())/2;
					var top=($(window).height()-msgobj.height())/2;
					var topTo=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(top>0?top:0);
					msgobj.animate({
						left : left,
						top : topTo
					},{ duration:400 , queue:false });
				}
			})
		};
	
	$.fn.Validform=function(settings){
		var defaults={};
		settings=$.extend({},$.fn.Validform.sn.defaults,settings);
		
		this.each(function(){
			var $this=$(this);
			var posting=false; //防止表单按钮双击提交两次;
			$this.find("[tip]").each(function(){//tip是表单元素的默认提示信息,这是点击清空效果;
				var defaultvalue=$(this).attr("tip");
				var altercss=$(this).attr("altercss");
				$(this).focus(function(){
					if($(this).val()==defaultvalue){
						$(this).val('');
						if(altercss){$(this).removeClass(altercss);}
					}
				}).blur(function(){
					if($.trim($(this).val())==''){
						$(this).val(defaultvalue);
						if(altercss){$(this).addClass(altercss);}
					}
				});
			});
			
			//绑定blur事件;
			$this.find("[datatype]").blur(function(){
				var flag=true;
				flag=$.fn.Validform.sn.checkform($(this),$this,settings.tipType,"hide");

				if(!flag){return false;}
				if(typeof(flag)!="boolean"){//如果是radio, checkbox, select则不需再执行下面的代码;
					$(this).removeClass("Validform_error");
					return false;
				}
										
				flag=$.fn.Validform.sn.regcheck($(this).attr("datatype"),$(this).val());
				if(!flag){
					errorobj=$(this);
					$.fn.Validform.sn.showmsg($(this).attr("errormsg")||tipmsg.w,settings.tipType,{obj:$(this)},"hide"); //当tipType=1的情况下，传入"hide"则让提示框不弹出,tipType=2的情况下附加参数“hide”不起作用;
				}else{
					if($(this).attr("ajaxurl")){
						var inputobj=$(this);
						inputobj.attr("valid",tipmsg.c);
						$.fn.Validform.sn.showmsg(tipmsg.c,settings.tipType,{obj:inputobj,type:1},"hide");
						$.ajax({
							type: "POST",
							url: inputobj.attr("ajaxurl"),
							data: "param="+$(this).val(),
							dataType: "text",
							success: function(s){
								if(s=="y"){
									inputobj.attr("valid","true");
									$.fn.Validform.sn.showmsg(tipmsg.r,settings.tipType,{obj:inputobj,type:2},"hide");
								}else{
									inputobj.attr("valid",s);
									errorobj=inputobj;
									$.fn.Validform.sn.showmsg(s,settings.tipType,{obj:inputobj});
								}
							}
						});
					}else{
						errorobj=null;
						$.fn.Validform.sn.showmsg(tipmsg.r,settings.tipType,{obj:$(this),type:2},"hide");
					}
				};
				
			});
			
			//subform
			var subform=function(){
				var flag=true;
				if(posting){return false;}
				
				$this.find("[datatype]").each(function(){
					flag=$.fn.Validform.sn.checkform($(this),$this,settings.tipType);
					if(!flag){
						errorobj.focus();
						return false;
					}
					
					if(typeof(flag)!="boolean"){
						flag=true;
						return true;
					}
					
					flag=$.fn.Validform.sn.regcheck($(this).attr("datatype"),$(this).val());
					
					if(!flag){
						errorobj=$(this);
						errorobj.focus();
						$.fn.Validform.sn.showmsg($(this).attr("errormsg")||tipmsg.w,settings.tipType,{obj:$(this)});
						return false;
					}
					
					if($(this).attr("ajaxurl") && $(this).attr("valid")!="true"){
						flag=false;
						var thisobj=$(this);
						errorobj=thisobj;
						errorobj.focus();
						$.fn.Validform.sn.showmsg(thisobj.attr("valid") || tipmsg.v,settings.tipType,{obj:thisobj});
						if(!msghidden || settings.tipType==2){
							setTimeout(function(){
								thisobj.trigger("blur");
							},2000);
						}
						return false;
					}else{
						$.fn.Validform.sn.showmsg(tipmsg.r,settings.tipType,{obj:$(this),type:2},"hide");
						flag=true;	
					}
				})
				
				if(flag && !posting){
					errorobj=null;
					if(settings.postOnce){posting=true;}
					if(settings.ajaxurl){
						$.fn.Validform.sn.showmsg(tipmsg.p,settings.tipType,{obj:$(this)},"alwaysshow");//传入“showalways”则让提示框不管当前tiptye为1还是2都弹出;
						$.ajax({
							type: "POST",
							url: settings.ajaxurl,
							data: $this.serialize(),
							success: function(html){
								$.fn.Validform.sn.showmsg(html,settings.tipType,{obj:$(this)},"alwaysshow");
							}
						});
						return false;
					}else{
						$this.get(0).submit();
					}
				}
				
			}
			
			$this.find(settings.btnSubmit).bind("click",subform);
			$this.submit(function(){
				subform();
				return false;
			});
		})
		
		//预创建pop box;
		if(settings.tipType!=2 || settings.ajaxurl){		
			creatMsgbox();
		}
		
	}
	
	$.fn.Validform.sn={
		defaults:{
			tipType:1
		},
		
		regcheck:function(type,gets){
			switch(type){
				case "*":
					return true;
				case "*6-15":
					var repost= /[^\s]{6,15}/;
					return repost.test(gets);
				case "n":
					return !isNaN(gets);
				case "s":
					return isNaN(gets);
				case "s5-16":
					var repost= /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{5,16}$/;
					return repost.test(gets);
				case "p":
					var repost= /^[0-9]{6}$/;
					return repost.test(gets);
				case "m":
					var repost= /^13[0-9]{1}[0-9]{8}$|15[0189]{1}[0-9]{8}$|189[0-9]{8}$/;
					return repost.test(gets);
				case "e":
					var repost = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
					return repost.test(gets);
				default:
					return false;
			}
		},
		
		showmsg:function(msg,type,o,show){//o:{obj:当前对象, type:1=>正在检测 | 2=>通过}, show用来判断tipType=1的情况下是否弹出信息框;
			if(errorobj){errorobj.addClass("Validform_error");}
			
			if(type==1 || show=="alwaysshow"){
				msgobj.find(".Validform_info").text(msg);
			}

			if(type==1 && show!="hide" || show=="alwaysshow"){
				msghidden=false;
				msgobj.find(".iframe").css("height",msgobj.height());
				var left=($(window).width()-msgobj.width())/2;
				var top=($(window).height()-msgobj.height())/2;
				top=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(top>0?top:0);
				msgobj.css({
					"left":left
				}).show().animate({
					top:top
				},100);
			}
			
			if(type==2){
				if(o.type){
					switch(o.type){
						case 1://正在检测;
							o.obj.parent().next().find(".Validform_checktip").removeClass().addClass("Validform_checktip Validform_loading").text(msg);
							break;
						case 2://检测通过;
							o.obj.parent().next().find(".Validform_checktip").removeClass().addClass("Validform_checktip Validform_right").text(msg);	
					}
				}else{
					o.obj.parent().next().find(".Validform_checktip").removeClass().addClass("Validform_wrong Validform_checktip").text(msg);
				}
			}
			
		},
		
		checkform:function(obj,parentobj,tiptype,show){//show用来判断是表达提交还是blur事件引发的检测;
			var errormsg=obj.attr("errormsg") || tipmsg.w;
			
			if(obj.is("[datatype='radio']")){  //判断radio表单元素;
				var inputname=obj.attr("name");
				var radiovalue=parentobj.find(":radio[name="+inputname+"]:checked").val();
				if(!radiovalue){
					errorobj=obj;
					this.showmsg(errormsg,tiptype,{obj:obj},show);
					return false;
				}
				errorobj=null;
				this.showmsg(tipmsg.r,tiptype,{obj:obj,type:2},"hide");
				return "radio";
			}

			if(obj.is("[datatype='checkbox']")){  //判断checkbox表单元素;
				var inputname=obj.attr("name");
				var checkboxvalue=parentobj.find(":checkbox[name="+inputname+"]:checked").val();
				if(!checkboxvalue){
					errorobj=obj;
					this.showmsg(errormsg,tiptype,{obj:obj},show);
					return false;
				}
				errorobj=null;
				this.showmsg(tipmsg.r,tiptype,{obj:obj,type:2},"hide");
				return "checkbox";
			}

			if(obj.is("[datatype='select']")){  //判断select表单元素;
				if(!obj.val()){
				  errorobj=obj;
				  this.showmsg(errormsg,tiptype,{obj:obj},show);
				  return false;
				}
				errorobj=null;
				this.showmsg(tipmsg.r,tiptype,{obj:obj,type:2},"hide");
				return "select";
			}
			
			var defaultvalue=obj.attr("tip");
			if(obj.val()=="" || obj.val()==defaultvalue){
				errorobj=obj;
				this.showmsg(tipmsg.s,tiptype,{obj:obj},show);
				return false;
			}
			
			if(obj.attr("recheck")){
				var theother=parentobj.find("input[name="+obj.attr("recheck")+"]:first");
				if(obj.val()!=theother.val()){
					errorobj=obj;
					this.showmsg(errormsg,tiptype,{obj:obj},show);
					return false;
				}
			}
			
			obj.removeClass("Validform_error");
			errorobj=null;
			return true;
		}
		
	}
	
	//公用方法显示信息提示框;
	$.Showmsg=function(msg){
		creatMsgbox();
		$.fn.Validform.sn.showmsg(msg,1);
	};
	
})(jQuery);
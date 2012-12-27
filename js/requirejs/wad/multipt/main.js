/**
 * 
 */

define(['jquery', 'kissy', 'ui/tip', './msg', 'validator', 'validator/group', 'css!./main',], function($, S, Tip, MSG, Valid, GroupView){
	return {
		init: function(config){
			S.mix(config, {
				iptSelector : null,
				iptMaxSize : 10,
				iptMinSize : 1,
				iptArray : [],
				iptname : null,
				valid : null,
				chkArray : [],
				chkname :null,
				maxlength:15,
				validator:null
			}, false);

			var div = $(config.iptSelector),
				valid = config.valid,
				maxsize = config.iptMaxSize,
				minsize = config.iptMinSize,
				initArray = config.iptArray,
				initchkArray = config.chkArray,
				name = config.iptname,
				chkname = config.chkname,
				countsize = 0,
				iptdiv;
				
			
			if(chkname !=null){
				$(div).addClass("multipt-warp-check");
			 	iptdiv =$('<div class="iptdiv">'
						+'<input type="text" autocomplete="off" style="" maxlength="20" class="ipttext" name="'+name+'"/>'
						+'<a href="javascript:;" class="statue wad-link"><span>' + getText("启用中") + '</span><input type="hidden" name="'+chkname+'" value="1" /></a>'
						+'<a href="javascript:;" class="iptdel"></a>'
					+'</div>');
			}else{
			 	iptdiv =$('<div class="iptdiv">'
						+'<input type="text" autocomplete="off" style="" maxlength="'+config.maxlength+'" class="ipttext" name="'+name+'"/>'
						+'<a href="javascript:;" class="iptdel"></a>'
					+'</div>');
			}

			S.mix(this, {
				 $div: div
				,$iptadd: div.find(".iptadd")
				
				,$iptdiv: iptdiv
				,$ipttext: iptdiv.find(".ipttext")
				,$iptdel: iptdiv.find(".iptdel")
				,$iptstatue : iptdiv.find(".statue")
			});
			
			var iptdiv = this.$iptdiv;
			var iptadd = this.$iptadd;

			//点击添加按钮
			this.$iptadd.click(function(){
				if(countsize<maxsize){
					var selector = iptdiv.clone(true);
					addValidator(selector.find("input.ipttext")); //添加验证
					$(this).before(selector);  
					countsize++;
					if(countsize==maxsize){
						$(this).hide();
					}
				}
			});

			//点击启停用按钮
			this.$iptstatue.click(function(){
				if($(this).find(":hidden").val()=="1"){ //启用中的状态点击
					$(this).find("span").html(getText("停用中"));
					$(this).find(":hidden").val("0");
				}else{
					$(this).find("span").html(getText("启用中"));
					$(this).find(":hidden").val("1");
				}
			});
			
			//生成初始化数组
			if(initArray.length>maxsize && initArray.length>0){
				Tip.error(S.substitute(MSG.alert_dataerror, {maxsize:maxsize}));
				iptadd.hide();
			}else if(initArray.length>0){ //ip有数据
				$(initArray).each(function(k,v){
					var tempdiv = iptdiv.clone(true);
					if(k < minsize){
						tempdiv.find(".iptdel").remove();
					}
					tempdiv.find(".ipttext").val(v);
					addValidator(tempdiv.find("input.ipttext")); //添加验证
					if(chkname !=null){ //附加checkbox checked属性 (1:checked)
						if(initchkArray[k] == 1){
							tempdiv.find(".statue").find("span").html(getText("启用中"));
							tempdiv.find(".statue").find(":hidden").val("1");
						}else{
							tempdiv.find(".statue").find("span").html(getText("停用中"));
							tempdiv.find(".statue").find(":hidden").val("0");
						}
					}
					iptadd.before(tempdiv);  
				});
				countsize=initArray.length;
				if(initArray.length < maxsize){
					iptadd.show();
				}
				
			}else if(initArray.length==0){ //ip无数据
				for(var i=0; i<minsize; i++){
					var tempdiv = iptdiv.clone(true);
					tempdiv.find(".iptdel").remove();
					addValidator(tempdiv.find("input.ipttext")); //添加验证
					iptadd.before(tempdiv);  
				}
				iptadd.show();
			}

			function addValidator(selector){  //验证
				var aa1;
				if(S.isFunction(config.validator)){
					aa1 = config.validator();
				}else{
					aa1 =  GroupView.init();
					aa1.rule('ipv4');
				}
					aa1.attach(selector);
					valid.add(aa1);
				
				//点击删除按钮
				selector.nextAll("a.iptdel").click(function(){
					valid.del(aa1);
					$(this).parent().remove();
					countsize--;
					iptadd.show();
				});
			}
		}
	};
});

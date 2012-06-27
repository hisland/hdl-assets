/**
 * 
 */

define(['jquery', 'kissy', 'ui/tip', './msg', 'validator', 'validator/group', 'css!./main',], function($, S, Tip, MSG, Valid, GroupView){
	return {
		init: function(config){
			S.mix(config, {
				iptSelector : null,
				iptMaxSize : 10,
				iptArray : [],
				iptname : null,
				valid : null
			}, false);

			var div = $(config.iptSelector),
				valid = config.valid,
				maxsize = config.iptMaxSize,
				initArray = config.iptArray,
				name = config.iptname,
				countsize = 0;
				

			var iptdiv =$('<div class="iptdiv">'
							+'<input type="text" autocomplete="off" style="" maxlength="15" class="ipttext" name="'+name+'">'
							+'<a href="javascript:;" class="iptdel"></a>'
						+'</div>');
			S.mix(this, {
				 $div: div
				,$iptadd: div.find(".iptadd")
				
				,$iptdiv: iptdiv
				,$ipttext: iptdiv.find(".ipttext")
				,$iptdel: iptdiv.find(".iptdel")
			});
			
			var iptdiv = this.$iptdiv;
			var iptadd = this.$iptadd;

			//点击添加按钮
			this.$iptadd.click(function(){
				if(countsize<maxsize){
					var selector = iptdiv.clone(true);
					addValidator(selector.find("input")); //添加验证
					$(this).before(selector);  
					countsize++;
					if(countsize==maxsize){
						$(this).hide();
					}
				}
			});

			//生成初始化数组
			if(initArray.length>maxsize && initArray.length>0){
				Tip.error(S.substitute(MSG.alert_dataerror, {maxsize:maxsize}));
				iptadd.hide();
			}else if(initArray.length>0){
				$(initArray).each(function(k,v){
					var tempdiv = iptdiv.clone(true);
					if(k==0){
						tempdiv.find(".iptdel").remove();
					}
					tempdiv.find(".ipttext").val(v);
					addValidator(tempdiv.find("input")); //添加验证
					iptadd.before(tempdiv);  
				});
				countsize=initArray.length;
				iptadd.show();
			}else if(initArray.length==0){
				var tempdiv = iptdiv.clone(true);
				tempdiv.find(".iptdel").remove();
				addValidator(tempdiv.find("input")); //添加验证
				iptadd.before(tempdiv);  
				iptadd.show();
			}

			function addValidator(selector){  //验证
				var aa1 =  GroupView.init();
				aa1.rule('ipv4');
				aa1.attach(selector);		
				valid.add(aa1);
				
				//点击删除按钮
				selector.next().click(function(){
					valid.del(aa1);
					$(this).parent().remove();
					countsize--;
					iptadd.show();
				});
			}
		}
	};
});

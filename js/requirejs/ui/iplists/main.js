/**
 * 
 */

define(['jquery', 'kissy', 'ui/tip', './msg', 'validator/base/rule-pre', 'css!./main'], function($, S, Tip, MSG, Rule){
	return {
		init: function(config){
			S.mix(config, {
				ipSelector : null,
				ipMaxSize : 10,
				ipArray : null,
				name : null
			}, false);

			var $ipttext = $(config.ipSelector).find(".iptext"),
				$iptcontent = $(config.ipSelector).find(".ipcotent"),
				$ipvalue = $(config.ipSelector).find(".ipvalue"),
				iparray =[], //内部接收数组
				ipdiv = 
				'<div class="ipli">'
					+'<div class="ipnum"></div>'
					+'<div class="ipdel"></div>'
				+'</div>';

			/**
			 * 初始化div
			 */
			$ipttext.val("");
			$ipvalue.val("");
			$iptcontent.html("");
			initIplist();

			/**
			 * 初始化事件
			 * 点击添加ip
			 */
			$(config.ipSelector).on('click', '.ipadd', function(e){
				if(!ipisnull($ipttext.val())){
					if(Rule.test("ipv4", $ipttext.val())){ //IP正则验证
						if(iparray.length!=config.ipMaxSize){ //ip最大个数验证
							if(!iprepeat($ipttext.val(),iparray)){ //ip重复验证
								iparray.push($ipttext.val()); //加入数组
								$ipvalue.val(iparray.join(","));
								var insertipdiv = $(ipdiv);
								insertipdiv.find(".ipnum").html($ipttext.val());
								$iptcontent.append(insertipdiv); 	//加入div
								
								$ipttext.val("").focus();
							}else{
								Tip.error(MSG.alert_iprepeat).setOnHide(function(){
									$ipttext.focus();
								});
							}
						}else{
							Tip.error(S.substitute(MSG.alert_maxsize, {maxsize:config.ipMaxSize})).setOnHide(function(){
								$ipttext.focus();
							});
						}
					}else{
						Tip.error(MSG.alert_iperror).setOnHide(function(){
							$ipttext.focus();
						});
					}
				}else{
					Tip.error(MSG.alert_ipnull).setOnHide(function(){
						$ipttext.focus();
					});
				}
			});

			/**
			 * 初始化事件
			 * 点击删除按钮
			 */
			$(config.ipSelector).on('click', '.ipdel', function(){
				var ip = $(this).prev().html(),//获取当前删除的IP
				temparr = new Array();
				$(this).parent().remove();
				$(iparray).each(function(k,v){
					if(v!=ip){
						temparr.push(v);
					}
				});
				iparray=temparr;
				$ipvalue.val(iparray.join(","));
			});

			/**
			 * 初始化事件
			 * 样式改变
			 */
			$(config.ipSelector).on('mouseenter', '.ipli', function(){
				$(this).addClass("ipli-hover");
			});
			$(config.ipSelector).on('mouseleave', '.ipli', function(){
				$(this).removeClass("ipli-hover");
			});

			$(config.ipSelector).on('mouseenter', '.ipdel', function(){
				$(this).addClass("ipdel-hover");
			})
			$(config.ipSelector).on('mouseleave', '.ipdel', function(){
				$(this).removeClass("ipdel-hover");
			});

			//修改初始化
			function initIplist(){
				if(config.ipArray !=null){  //初始化IP值
					if(config.ipArray.length > config.ipMaxSize){
						Tip.error(S.substitute(MSG.alert_dataerror, {maxsize:config.ipMaxSize}));
					}else{
						iparray = config.ipArray;
						$ipvalue.val(iparray.join(","));
						$(iparray).each(function(k,v){
							var insertipdiv = $(ipdiv);
							insertipdiv.find(".ipnum").html(v);
							$iptcontent.append(insertipdiv); 	//加入div
						});
					}
				}
			}

			//ip为空验证
			function ipisnull(ip){
				if($.trim(ip) == ""){
					return true
				}else{
					return false
				}
			}

			//ip重复验证
			function iprepeat(ip,iparr){
				var flag = false;
				$(iparr).each(function(k,v){
					if(ip==v){
						flag =true;  //有重复flag置为true
					}
				});
				return flag;
			}

		}
	};
});

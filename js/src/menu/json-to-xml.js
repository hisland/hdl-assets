a = [{
	"text": "根节点",
	"url": "#/antispam2850/#",
	"children": [{
		"text": "系统管理",
		"url": "#/antispam2850/#",
		"children": [{
			"text": "系统配置",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "短信采集连接管理",
				"url": "#/antispam2850/interface/sysNeAction!init.do",
				"rightsPrex": "NE_"
			},
			{
				"text": "模块连接端口配置",
				"url": "#/antispam2850/interface/sysPortsAction!find.do",
				"rightsPrex": "PORTS_"
			},
			{
				"text": "系统模块管理",
				"url": "#/antispam2850/businessGD/sysModulesAction!init.do",
				"rightsPrex": "MODULES_"
			},
			{
				"text": "行为分析模型配置",
				"url": "#/antispam2850/strategy/sysBaModelAction!init.do",
				"rightsPrex": "BAMODEL_"
			}]
		},
		{
			"text": "SPM管理",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "SPM参数设置",
				"url": "#/antispam2850/spm/signlingParamAction!init.do",
				"rightsPrex": "SIGNPARAM_"
			},
			{
				"text": "SPM设备管理",
				"url": "#/antispam2850/pages/gd/spm/SignDev.jsp",
				"rightsPrex": "SIGNDEVICE_"
			},
			{
				"text": "SPM设备E1信息管理",
				"url": "#/antispam2850/spm/signDevE1Action!init.do",
				"rightsPrex": "SIGNDEVE1_"
			},
			{
				"text": "STP管理",
				"url": "#/antispam2850/pages/gd/spm/Stp.jsp",
				"rightsPrex": "STP_"
			},
			{
				"text": "SPM链路管理",
				"url": "#/antispam2850/#",
				"rightsPrex": "STP_LINK_"
			},
			{
				"text": "SPM被叫IMSI管理",
				"url": "#/antispam2850/#",
				"rightsPrex": "BLK_IMSI_"
			},
			{
				"text": "SPM数据管理",
				"url": "#/antispam2850/#",
				"rightsPrex": "SIGNSPAM_"
			},
			{
				"text": "SPM远程升级",
				"url": "#/antispam2850/#",
				"rightsPrex": "SPM_UPDATE_"
			},
			{
				"text": "SPM设备版本号比较",
				"url": "#/antispam2850/#",
				"rightsPrex": "BOSSTO_"
			},
			{
				"text": "SPM拓扑管理",
				"url": "#/antispam2850/#",
				"rightsPrex": "SPMTOP_"
			}]
		},
		{
			"text": "系统维护",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "用户管理",
				"url": "#/antispam2850/sysuser/initSysUser.do",
				"rightsPrex": "USER_"
			},
			{
				"text": "用户组管理",
				"url": "#/antispam2850/sysusergrp/initSysRole.do",
				"rightsPrex": "ROLE_"
			},
			{
				"text": "修改密码",
				"url": "#/antispam2850/sysuser/initModifyPwd.do",
				"rightsPrex": "$"
			}]
		}]
	},
	{
		"text": "业务管理",
		"url": "#/antispam2850/#",
		"children": [{
			"text": "白名单管理",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "主叫白名单管理",
				"url": "#/antispam2850/lists/dataWhitelistsAction!init.do",
				"rightsPrex": "WHITELISTS_"
			},
			{
				"text": "被叫白名单管理",
				"url": "#/antispam2850/lists/dataWhiteListsRAction!init.do",
				"rightsPrex": "WHITELISTS_R_"
			}]
		},
		{
			"text": "黑名单管理",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "黑名单管理",
				"url": "#/antispam2850/businessGD/initDataBlklists.do",
				"rightsPrex": "BLKLISTS_"
			}]
		},
		{
			"text": "关键字管理",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "关键字管理",
				"url": "#/antispam2850/keywords_gd/initKeywords.do",
				"rightsPrex": "KEYWORDS_"
			},
			{
				"text": "关键字分隔符管理",
				"url": "#/antispam2850/pages/common/keywords/KeywordsChar.jsp",
				"rightsPrex": "KEYCHAR_"
			},
			{
				"text": "关键字组管理",
				"url": "#/antispam2850/pages/gd/keywords/KeywordsGroup.jsp",
				"rightsPrex": "KWGROUP_"
			},
			{
				"text": "自动关键字参数设置",
				"url": "#/antispam2850/keywords_gd/KeywordsParamAction!init.do",
				"rightsPrex": "KEYPARAM_"
			}]
		},
		{
			"text": "业务管理",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "业务类型管理",
				"url": "#/antispam2850/businessGD/sysSmTypeAction!init.do",
				"rightsPrex": "SMTYPE_"
			},
			{
				"text": "业务类型号段管理",
				"url": "#/antispam2850/businessGD/sysUsertypePhonepartAction!init.do",
				"rightsPrex": "USERTYPE_"
			},
			{
				"text": "用户群类型管理",
				"url": "#/antispam2850/businessGD/selfUsergroupAction!init.do",
				"rightsPrex": "USRGRP_TYPE_"
			},
			{
				"text": "用户群阈值管理",
				"url": "#/antispam2850/businessGD/usrgrpThresholdAction!init.do",
				"rightsPrex": "USRGRP_VALUE_"
			},
			{
				"text": "用户群号首管理",
				"url": "#/antispam2850/businessGD/usrgrpNumprefAction!init.do",
				"rightsPrex": "USRGRP_NUM_"
			},
			{
				"text": "品牌管理",
				"url": "#/antispam2850/pages/gd/business/Brand.jsp",
				"rightsPrex": "SIGNBRAND_"
			},
			{
				"text": "归属号首管理",
				"url": "#/antispam2850/businessGD/areaNumprefDataAction!init.do",
				"rightsPrex": "SIGNAREANUM_"
			}]
		},
		{
			"text": "策略管理",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "人工仲裁平台连接参数配置",
				"url": "#/antispam2850/strategy/findLinkManualCfg.do",
				"rightsPrex": "LKMANUAL_"
			},
			{
				"text": "送人工仲裁平台策略配置",
				"url": "#/antispam2850/strategy/findToManualCfg.do",
				"rightsPrex": "TOMANUAL_"
			},
			{
				"text": "监控时段管理",
				"url": "#/antispam2850/pages/gd/business/SysMonitorTime.jsp",
				"rightsPrex": "MTTIME_"
			},
			{
				"text": "行为分析时段监控管理",
				"url": "#/antispam2850/businessGD/sysBaHolidaysAction!init.do",
				"rightsPrex": "BAHOLIDAY_"
			},
			{
				"text": "行为分析模型配置",
				"url": "#/antispam2850/strategy/sysBaModelAction!init.do",
				"rightsPrex": "BAMODEL_"
			},
			{
				"text": "模型优先级配置",
				"url": "#/antispam2850/strategy/typeLevelAction!find.do",
				"rightsPrex": "TYLEVEL_"
			},
			{
				"text": "内容监控时间段管理",
				"url": "#/antispam2850/businessGD/sysKeyHolidaysAction!init.do",
				"rightsPrex": "WATCHTIME_"
			},
			{
				"text": "内容拦截策略管理",
				"url": "#/antispam2850/strategy/keywordsPmodeMethodAction!init.do",
				"rightsPrex": "PMODE_"
			},
			{
				"text": "行为拦截策略管理",
				"url": "#/antispam2850/strategy/sysBaValveAction!init.do",
				"rightsPrex": "BAVALVE_"
			},
			{
				"text": "组合拦截策略管理",
				"url": "#/antispam2850/strategy/strategyAction!init.d",
				"rightsPrex": "STRATEGY_"
			}]
		}]
	},
	{
		"text": "统计报表",
		"url": "#/antispam2850/#",
		"children": [{
			"text": "消息流量统计",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "黑名单与复通量统计",
				"url": "#/antispam2850/report/sumBlkReopenAction!init.do",
				"rightsPrex": "BLKREOPEN_"
			},
			{
				"text": "消息违规与拦截量汇总统计",
				"url": "#/antispam2850/#",
				"children": [{
					"text": "消息违规与拦截量汇总统计",
					"url": "#/antispam2850/report/sumSmTotalAction!init.do",
					"rightsPrex": "SMTOTAL_"
				},
				{
					"text": "消息违规量明细统计",
					"url": "#/antispam2850/report/sumSmOutlawDetailAction!init.do",
					"rightsPrex": "OUTDETAIL_"
				},
				{
					"text": "关键字违规量明细统计",
					"url": "#/antispam2850/report/sumKeywordOutlawAction!init.do",
					"rightsPrex": "KWOUTLAW_"
				},
				{
					"text": "行为分析违规明细统计",
					"url": "#/antispam2850/report/sumBaOutlawAction!init.do",
					"rightsPrex": "BAOUTLAW_"
				},
				{
					"text": "消息拦截量明细统计",
					"url": "#/antispam2850/#",
					"children": [{
						"text": "消息拦截量明细统计",
						"url": "#/antispam2850/report/sumSmStopAction!init.do",
						"rightsPrex": "SMSTOP_"
					},
					{
						"text": "收端拦截明细统计",
						"url": "#/antispam2850/report/sumOutnetStopSenderAction!init.do",
						"rightsPrex": "NETSENDER_"
					}]
				}]
			},
			{
				"text": "网间消息违规与黑名单统计",
				"url": "#/antispam2850/report/sumOutnetSmBlkAction!init.do",
				"rightsPrex": "NETBLK_"
			}]
		},
		{
			"text": "系统性能统计",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "Proxy峰值消息流量",
				"url": "#/antispam2850/report/sumProxyMaxAction!init.do",
				"rightsPrex": "PROMAX_"
			},
			{
				"text": "最忙5分钟消息量统计",
				"url": "#/antispam2850/report/sumSmBusyFiveAction!init.do",
				"rightsPrex": "BUSYFIVE_"
			}]
		},
		{
			"text": "SPM流量统计",
			"url": "#/antispam2850/#",
			"children": [{
				"text": "SPM处理时延统计报表",
				"url": "#/antispam2850/report/sumLinkDelayAction!init.do",
				"rightsPrex": "LINKDELAY_"
			},
			{
				"text": "省际消息统计报表",
				"url": "#/antispam2850/report/sumLinkSmAction!init.do",
				"rightsPrex": "LINKSM_"
			},
			{
				"text": "省际行为分析违规明细统计",
				"url": "#/antispam2850/report/sumLinkBaOutlawAction!init.do",
				"rightsPrex": "LINKOUTLAW_"
			},
			{
				"text": "省际信令链路负荷统计",
				"url": "#/antispam2850/report/sumLinkLoadAction!init.do",
				"rightsPrex": "LINKLOAD_"
			},
			{
				"text": "省际信令链路拦截时长统计",
				"url": "#/antispam2850//report/sumLinkHolupsecondsAction!init.do",
				"rightsPrex": "LINKSEC_"
			},
			{
				"text": "省际信令链路完好率统计",
				"url": "#/antispam2850/report/sumLinkAvaliablesecondsAction!init.do",
				"rightsPrex": "LINKAVA_"
			}]
		}]
	}]
}]

//a = {}
//a为服务器返回json
b = [];
function aaa(b, arr, tabs){
$.each(arr, function(i, v){
	if(v.children){
		b.push(tabs, '<menu text="', v.text, '">\n');
		aaa(b, v.children, tabs+'\t');
		b.push(tabs, '</menu>\n');
	}else{
		b.push(tabs, '<item prefix="', v.rightsPrex, '" url="', v.url, '">', v.text, '</item>\n')
	}
});
}
aaa(b, a, '')
$('body').prepend('<textarea>'+b.join('')+'</textarea>');
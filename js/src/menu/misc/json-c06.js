[{
	"text":"根节点",
	"children":[{
			"text":"系统管理",
			"children":[{
					"text":"系统配置",
					"children":[{
							"text":"短信采集连接管理",
							"url":"#/antispam2850/interface/sysNeAction!init.do",
							"prefix":"NE_"
						},{
							"text":"模块连接端口配置",
							"url":"#/antispam2850/interface/sysPortsAction!find.do",
							"prefix":"PORTS_"
						},{
							"text":"系统模块管理",
							"url":"#/antispam2850/businessGD/sysModulesAction!init.do",
							"prefix":"MODULES_"
						},{
							"text":"配置变更管理",
							"url":"#/antispam2850/interface/arbSendConfigAction!init.do",
							"prefix":"SENDCONFIG_"
						},{
							"text":"人工仲裁平台连接参数配置",
							"url":"#/antispam2850/strategy/findLinkManualCfg.do",
							"prefix":"LKMANUAL_"
						}
					]
				},{
					"text":"SPM管理",
					"children":[{
							"text":"SPM参数设置",
							"url":"#/antispam2850/spm/signlingParamAction!init.do",
							"prefix":"SIGNPARAM_"
						},{
							"text":"SPM设备管理",
							"url":"#/antispam2850/spm/signDevAction!init.do",
							"prefix":"SIGNDEVICE_"
						},{
							"text":"SPM设备E1信息管理",
							"url":"#/antispam2850/spm/signDevE1Action!init.do",
							"prefix":"SIGNDEVE1_"
						},{
							"text":"STP管理",
							"url":"#/antispam2850/pages/gd/spm/Stp.jsp",
							"prefix":"STP_"
						},{
							"text":"SPM链路管理",
							"url":"#/antispam2850/spm/signLinkAction!init.do",
							"prefix":"STP_LINK_"
						},{
							"text":"SPM被叫IMSI管理",
							"url":"#/antispam2850/spm/blkImsiAction!init.do",
							"prefix":"BLK_IMSI_"
						},{
							"text":"SPM数据管理",
							"url":"#/antispam2850/spm/spmDataManagerAction!init.do",
							"prefix":"SIGNSPAM_"
						},{
							"text":"SPM远程升级",
							"url":"#/antispam2850/spm/spmRemoteUpgradeAction!init.do",
							"prefix":"SPM_UPDATE_"
						},{
							"text":"SPM设备版本号比较",
							"url":"#/antispam2850/pages/gd/spm/VersionCompare.jsp",
							"prefix":"BOSSTO_"
						},{
							"text":"SPM拓扑管理",
							"url":"#/antispam2850/flex/Spmtopo.html",
							"prefix":"SPMTOP_"
						}
					]
				},{
					"text":"系统维护",
					"children":[{
							"text":"用户管理",
							"url":"#/antispam2850/sysuser/initSysUser.do",
							"prefix":"USER_"
						},{
							"text":"用户组管理",
							"url":"#/antispam2850/sysusergrp/initSysRole.do",
							"prefix":"ROLE_"
						},{
							"text":"日志查询",
							"url":"#/antispam2850/systemlog/tblSystemLogAction!iniModelue.do",
							"prefix":"LOG_"
						},{
							"text":"修改密码",
							"url":"#/antispam2850/sysuser/initModifyPwd.do",
							"prefix":"$"
						}
					]
				},{
					"text":"告警管理",
					"children":[{
							"text":"告警监控",
							"url":"#/antispam2850/flex/alarm.html",
							"prefix":"BLK_MONITOR_"
						},{
							"text":"系统拓扑",
							"url":"#/antispam2850/flex/SystemTopo.html",
							"prefix":"TOPCODER_"
						}
					]
				}
			]
		},{
			"text":"业务管理",
			"children":[{
					"text":"白名单管理",
					"children":[{
							"text":"主叫白名单管理",
							"url":"#/antispam2850/lists/dataWhitelistsAction!init.do",
							"prefix":"WHITELISTS_"
						},{
							"text":"被叫白名单管理",
							"url":"#/antispam2850/lists/dataWhiteListsRAction!init.do",
							"prefix":"WHITELISTS_R_"
						}
					]
				},{
					"text":"黑名单管理",
					"children":[{
							"text":"黑名单管理",
							"url":"#/antispam2850/businessGD/initDataBlklists.do",
							"prefix":"BLKLISTS_"
						}
					]
				},{
					"text":"关键字管理",
					"children":[{
							"text":"关键字管理",
							"url":"#/antispam2850/keywords_gd/initKeywords.do",
							"prefix":"KEYWORDS_"
						},{
							"text":"关键字分隔符管理",
							"url":"#/antispam2850/pages/common/keywords/KeywordsChar.jsp",
							"prefix":"KEYCHAR_"
						},{
							"text":"关键字组管理",
							"url":"#/antispam2850/pages/gd/keywords/KeywordsGroup.jsp",
							"prefix":"KWGROUP_"
						},{
							"text":"自动关键字参数设置",
							"url":"#/antispam2850/keywords_gd/KeywordsParamAction!init.do",
							"prefix":"KEYPARAM_"
						}
					]
				},{
					"text":"业务管理",
					"children":[{
							"text":"业务类型管理",
							"url":"#/antispam2850/businessGD/sysSmTypeAction!init.do",
							"prefix":"SMTYPE_"
						},{
							"text":"业务类型号段管理",
							"url":"#/antispam2850/businessGD/sysUsertypePhonepartAction!init.do",
							"prefix":"USERTYPE_"
						},{
							"text":"用户群类型管理",
							"url":"#/antispam2850/businessGD/selfUsergroupAction!init.do",
							"prefix":"USRGRP_TYPE_"
						},{
							"text":"用户群阈值管理",
							"url":"#/antispam2850/businessGD/usrgrpThresholdAction!init.do",
							"prefix":"USRGRP_VALUE_"
						},{
							"text":"用户群号首管理",
							"url":"#/antispam2850/businessGD/usrgrpNumprefAction!init.do",
							"prefix":"USRGRP_NUM_"
						},{
							"text":"品牌管理",
							"url":"#/antispam2850/pages/gd/business/Brand.jsp",
							"prefix":"SIGNBRAND_"
						},{
							"text":"归属号首管理",
							"url":"#/antispam2850/businessGD/areaNumprefDataAction!init.do",
							"prefix":"SIGNAREANUM_"
						}
					]
				},{
					"text":"策略管理",
					"children":[{
							"text":"组合拦截策略管理",
							"url":"#/antispam2850/strategy/strategyAction!init.do",
							"prefix":"STRATEGY_"
						},{
							"text":"内容拦截策略管理",
							"url":"#/antispam2850/strategy/keywordsPmodeMethodAction!init.do",
							"prefix":"PMODE_"
						},{
							"text":"行为拦截策略管理",
							"url":"#/antispam2850/strategy/sysBaValveAction!init.do",
							"prefix":"BAVALVE_"
						},{
							"text":"特殊监控时段管理",
							"url":"#/antispam2850/pages/gd/business/SysMonitorTime.jsp",
							"prefix":"MTTIME_"
						},{
							"text":"内容特殊监控时间段管理",
							"url":"#/antispam2850/businessGD/sysKeyHolidaysAction!init.do",
							"prefix":"WATCHTIME_"
						},{
							"text":"行为分析特殊监控时段管理",
							"url":"#/antispam2850/businessGD/sysBaHolidaysAction!init.do",
							"prefix":"BAHOLIDAY_"
						},{
							"text":"行为分析模型配置",
							"url":"#/antispam2850/strategy/sysBaModelAction!init.do",
							"prefix":"BAMODEL_"
						},{
							"text":"模型优先级配置",
							"url":"#/antispam2850/strategy/typeLevelAction!find.do",
							"prefix":"TYLEVEL_"
						},{
							"text":"送人工仲裁平台策略配置",
							"url":"#/antispam2850/strategy/findToManualCfg.do",
							"prefix":"TOMANUAL_"
						}
					]
				}
			]
		},{
			"text":"业务查询",
			"children":[{
					"text":"阻止短消息查询",
					"url":"#/antispam2850/query/dataSmStopAction!init.do",
					"prefix":"STOP_RANSON_"
				},{
					"text":"组合拦截策略告警查询",
					"url":"#/antispam2850/query/alarmQueryAction!init.do",
					"prefix":"STAT_BA_"
				},{
					"text":"内容拦截策略告警查询",
					"url":"#/antispam2850/#query/contentThresholdAlarm!init.do",
					"prefix":"CONTENT_TH_"
				},{
					"text":"网元流量统计",
					"url":"#/antispam2850/query/neStatTimesAction!init.do",
					"prefix":"STAT_ESME_"
				},{
					"text":"关键字命中率查询",
					"url":"#/antispam2850/query/keywordsRateAction!init.do",
					"prefix":"KEYRATE_"
				},{
					"text":"网管告警查询",
					"url":"#/antispam2850/query/dataAlarmNmsAction!init.do",
					"prefix":"BOSSBACK_"
				},{
					"text":"网管同步信息汇总",
					"url":"#/antispam2850/query/spmSyncDetailAction!init.do",
					"prefix":"BOSSSYNGA_"
				},{
					"text":"可疑词汇统计",
					"url":"#/antispam2850/query/keywordsBackAction!init.do",
					"prefix":"REPORT1_"
				}
			]
		},{
			"text":"统计报表",
			"children":[{
					"text":"消息流量统计",
					"children":[{
							"text":"黑名单与复通量统计",
							"url":"#/antispam2850/report/sumBlkReopenAction!init.do",
							"prefix":"BLKREOPEN_"
						},{
							"text":"消息违规与拦截量汇总统计",
							"url":"#/antispam2850/report/sumSmTotalAction!init.do",
							"prefix":"SMTOTAL_"
						},{
							"text":"消息违规量明细统计",
							"url":"#/antispam2850/report/sumSmOutlawDetailAction!init.do",
							"prefix":"OUTDETAIL_"
						},{
							"text":"消息拦截量明细统计",
							"url":"#/antispam2850/report/sumSmStopAction!init.do",
							"prefix":"SMSTOP_"
						},{
							"text":"网间消息违规与黑名单统计",
							"url":"#/antispam2850/report/sumOutnetSmBlkAction!init.do",
							"prefix":"NETBLK_"
						},{
							"text":"省际消息统计报表",
							"url":"#/antispam2850/report/sumLinkSmAction!init.do",
							"prefix":"LINKSM_"
						},{
							"text":"最忙5分钟消息量统计",
							"url":"#/antispam2850/report/sumSmBusyFiveAction!init.do",
							"prefix":"BUSYFIVE_"
						},{
							"text":"SPM最忙5分钟消息量统计",
							"url":"#/antispam2850/report/sumSmBusyFiveSpmAction!init.do",
							"prefix":"SMBUS5SPM_"
						},{
							"text":"Proxy峰值消息流量统计",
							"url":"#/antispam2850/report/sumProxyMaxAction!init.do",
							"prefix":"PROMAX_"
						}
					]
				},{
					"text":"模型效果统计",
					"children":[{
							"text":"行为分析违规明细统计",
							"url":"#/antispam2850/report/sumBaOutlawAction!init.do",
							"prefix":"BAOUTLAW_"
						},{
							"text":"省际行为分析违规明细统计",
							"url":"#/antispam2850/report/sumLinkBaOutlawAction!init.do",
							"prefix":"LINKOUTLAW_"
						},{
							"text":"网间的行为分析违规明细统计",
							"url":"#/antispam2850/report/sumBaOutnetAction!init.do",
							"prefix":"BAKEYWORDSOUTNET_"
						},{
							"text":"关键字违规量明细统计",
							"url":"#/antispam2850/report/sumKeywordOutlawAction!init.do",
							"prefix":"KWOUTLAW_"
						},{
							"text":"省际关键字违规明细统计",
							"url":"#/antispam2850/report/sumKeywordSignAction!init.do",
							"prefix":"LINKKEYWORDS_"
						},{
							"text":"网间的关键字违规明细统计",
							"url":"#/antispam2850/report/sumKeywordOutnetAction!init.do",
							"prefix":"OUTNETKEYWORDS_"
						},{
							"text":"行为分析模型有效率统计",
							"url":"#/antispam2850/report/sumBaOutlawBlkRatioAction!init.do",
							"prefix":"SUMBAOUTLAWBLK_"
						},{
							"text":"监控拦截有效率统计",
							"url":"#/antispam2850/report/sumArbPrecisionAction!init.do",
							"prefix":"PRECISION_"
						},{
							"text":"收端拦截明细统计",
							"url":"#/antispam2850/report/sumOutnetStopSenderAction!init.do",
							"prefix":"NETSENDER_"
						},{
							"text":"短信鉴权成功率统计",
							"url":"#/antispam2850/report/sumSmSuccessRatioAction!init.do",
							"prefix":"SUMSMSUCCESS_"
						}
					]
				},{
					"text":"SPM统计报表",
					"children":[{
							"text":"SPM处理时延统计报表",
							"url":"#/antispam2850/report/sumLinkDelayAction!init.do",
							"prefix":"LINKDELAY_"
						},{
							"text":"省际信令链路负荷统计",
							"url":"#/antispam2850/report/sumLinkLoadAction!init.do",
							"prefix":"LINKLOAD_"
						},{
							"text":"省际信令链路拦截时长统计",
							"url":"#/antispam2850/report/sumLinkHolupsecondsAction!init.do",
							"prefix":"LINKSEC_"
						},{
							"text":"省际信令链路完好率统计",
							"url":"#/antispam2850/report/sumLinkAvaliablesecondsAction!init.do",
							"prefix":"LINKAVA_"
						}
					]
				},{
					"text":"外部链接",
					"children":[{
							"text":"Proxy外部链接",
							"url":"#/antispam2850/www.hao123.com",
							"prefix":"PROXYURL_"
						}
					]
				}
			]
		},{
			"text":"导入导出",
			"children":[{
					"text":"导入导出管理",
					"url":"#/antispam2850/pages/gd/file/export.jsp",
					"prefix":"$"
				}
			]
		}
	]
}]
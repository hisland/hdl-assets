{
		"text":"根节点",
		"children":[{
				"text":"系统管理",
				"children":[{
						"text":"系统配置管理",
						"children":[{
								"text":"系统模块管理",
								"url":"#/antispam2850/businesscomm/initSysModules.do",
								"prefix":"MODULES_",
								"id":"menu_as_sysmodule"
							},{
								"text":"模块连接端口配置",
								"url":"#/antispam2850/interfacecomm/initSysPorts.do",
								"prefix":"SYS_PORTS_",
								"id":"menu_as_sysports"
							},{
								"text":"自动报表生成参数配置",
								"url":"#/antispam2850/interface/findSysAutoCreateReportConfig.do",
								"prefix":"AUTO_REPORT_CFG_",
								"id":"menu_as_autoReportCfg"
							},{
								"text":"业务告警设置",
								"url":"#/antispam2850/interface/initSysAlarmCfg.do",
								"prefix":"SYS_ALARM_CFG_",
								"id":"menu_as_sys_alarm_cfg"
							},{
								"text":"告警处理参数配置",
								"url":"#/antispam2850/interface/initAlarmParamCfg.do",
								"prefix":"ALARM_PARAM_CFG_",
								"id":"menu_as_alarmParamCfg"
							},{
								"text":"系统监控参数配置",
								"url":"#/antispam2850/sysMonitorValue/initSysMonitorValue.do",
								"prefix":null,
								"id":"menu_as_UserFollowValueCfg"
							}
						]
					},{
						"text":"安全管理",
						"children":[{
								"text":"用户管理",
								"url":"#/antispam2850/sysuser/initSysUser.do",
								"prefix":"USER_",
								"id":"menu_as_sysuser"
							},{
								"text":"用户组管理",
								"url":"#/antispam2850/sysusergrp/initSysRole.do",
								"prefix":"ROLE_",
								"id":"menu_as_sysrole"
							},{
								"text":"日志查询",
								"url":"#/antispam2850/systemlog/iniSystemLog.do",
								"prefix":"LOG_",
								"id":"menu_as_modelue"
							},{
								"text":"修改密码",
								"url":"#/antispam2850/sysuser/initModifyPwd.do",
								"prefix":"",
								"id":"menu_as_modifypwd"
							}
						]
					}
				]
			},{
				"text":"接口管理",
				"children":[{
						"text":"网元管理",
						"url":"#/antispam2850/interfacecomm/initSysNe.do",
						"prefix":"SYS_NE_",
						"id":"menu_as_sysne"
					},{
						"text":"黑名单接口管理",
						"url":"#/antispam2850/interface/initSysBlackInterface.do",
						"prefix":"SYS_PROXY_",
						"id":"menu_as_typename"
					},{
						"text":"实时BOSS参数配置",
						"url":"#/antispam2850/interface/initRealTimeBossAction.do",
						"prefix":"REAL_TIME_BOSS_",
						"id":"menu_as_sysinterface"
					},{
						"text":"非实时BOSS参数配置",
						"url":"#/antispam2850/interface/initNotRealTimeBoss.do",
						"prefix":"NOT_REAL_TIME_",
						"id":"menu_as_sysblackcfg"
					},{
						"text":"审核平台接口参数配置",
						"url":"#/antispam2850/interface/initExamineInterface.do",
						"prefix":"AUDITING_FLAT_",
						"id":"menu_as_sysblackcfg"
					},{
						"text":"外部接口平台帐户管理",
						"url":"#/antispam2850/interface/initSysInterfaceUser.do",
						"prefix":"SYS_INTERFACEUSER_",
						"id":"menu_as_typename"
					},{
						"text":"用户群FTP接口配置",
						"url":"#/antispam2850/interface/findUsrGrpInterfaceCfg.do",
						"prefix":"USRGRP_FTP_CFG_",
						"id":"menu_as_UsrGrpInterfaceCfg"
					},{
						"text":"灰名单接口管理",
						"url":"#/antispam2850/interface/findGrayInterface.do",
						"prefix":"GRAY_INTERFACE_CFG_",
						"id":"gray_interface_info"
					},{
						"text":"复制卡监控参数配置",
						"url":"#/antispam2850/interface/initSysMM5Interface.do",
						"prefix":"SYS_MM5_",
						"id":"menu_as_SysMm5Cfg"
					},{
						"text":"缓存短信参数配置",
						"url":"#/antispam2850/interface/initSysCommonValue.do",
						"prefix":"CACHE_PARAMS_",
						"id":"menu_as_SysCommon"
					},{
						"text":"消息转发接口配置",
						"url":"#/antispam2850/interface/initSysSpecialInfterface.do",
						"prefix":null,
						"id":"menu_as_SysSpecialInfterface"
					},{
						"text":"H2营帐接口配置",
						"url":"#/antispam2850/interface/initH2Interface.do",
						"prefix":"H2_INTERFACE_CFG_",
						"id":"menu_as_H2InfterfaceCfg"
					}
				]
			},{
				"text":"业务管理",
				"children":[{
						"text":"黑白名单管理",
						"children":[{
								"text":"主叫白名单管理",
								"url":"#/antispam2850//phonecode/initDataWhitelists.do",
								"prefix":null,
								"id":""
							},{
								"text":"被叫白名单管理",
								"url":"#/antispam2850/phonecode/initDataListRs.do",
								"prefix":null,
								"id":""
							},{
								"text":"黑/嫌疑名单管理",
								"url":"#/antispam2850/phonecode/initDataBlklists.do",
								"prefix":"BLK_LISTSM_",
								"id":"menu_as_blklists"
							},{
								"text":"被叫黑名单管理",
								"url":"#/antispam2850//phonecode/initDataBlklistsR.do",
								"prefix":null,
								"id":""
							},{
								"text":"黑白名单优先级管理",
								"url":"#/antispam2850/businesscomm/initTypeLevel.do",
								"prefix":"TYPE_LEVEL_",
								"id":"menu_as_typelevel"
							}
						]
					},{
						"text":"关键字管理",
						"children":[{
								"text":"关键字参数设置",
								"url":"#/antispam2850/keywordscomm/KeywordsParamAction!init.do",
								"prefix":"KEY_PARAM_",
								"id":"menu_as_keywordparam"
							},{
								"text":"关键字分隔符管理",
								"url":"#/antispam2850/pages/common/keywords/KeywordsChar.jsp",
								"prefix":"KEY_CHAR_",
								"id":"menu_as_keywordschar"
							},{
								"text":"嫌疑短信管理",
								"url":"#/antispam2850/keywordscomm/BaseKeywordsPoolAction!init.do",
								"prefix":"KEY_POOL_",
								"id":"menu_as_keywordspool"
							},{
								"text":"关键字管理",
								"url":"#/antispam2850/keywords/initKeywords.do",
								"prefix":"KEYWORDS_",
								"id":"menu_as_keywords"
							},{
								"text":"关键字分组管理",
								"url":"#/antispam2850/pages/qg/keywords/KeywordsGroup.jsp",
								"prefix":"KEY_GROUP_",
								"id":"menu_as_keywordsGroup"
							},{
								"text":"关键字自动导入参数",
								"url":"#/antispam2850/keywords/findCfgOutInterface.do",
								"prefix":"KEY_AUTO_INPUT_",
								"id":"menu_as_keyAutoInput"
							}
						]
					},{
						"text":"监控策略管理",
						"children":[{
								"text":"基本模型管理",
								"url":"#/antispam2850/strategy/initSysModel.do",
								"prefix":"SYS_MODEL_",
								"id":"menu_as_sysModel"
							},{
								"text":"用户群管理",
								"url":"#/antispam2850/strategy/initUserGroup.do",
								"prefix":"GROUPS_",
								"id":""
							},{
								"text":"用户群名单管理",
								"url":"#/antispam2850/strategy/initGroup.do",
								"prefix":"USER_GROUP_",
								"id":""
							},{
								"text":"监控时段管理",
								"url":"#/antispam2850/strategy/initSysMonitorTime.do",
								"prefix":"SYS_MONITOR_TIME_",
								"id":"menu_as_sysmonitortime"
							},{
								"text":"违规原因转换配置",
								"url":"#/antispam2850/pages/qg/strategy/SysOutlawreasonConfig.jsp",
								"prefix":"SYS_OUTLAWREASON_CFG_",
								"id":"menu_as_SysOutlCfg"
							},{
								"text":"监控策略管理",
								"url":"#/antispam2850/strategy/sysStrategyInit.do",
								"prefix":"SYS_STRATEGY_",
								"id":"menu_as_strategy"
							}
						]
					},{
						"text":"业务配置管理",
						"children":[{
								"text":"用户类型号段管理",
								"url":"#/antispam2850/business/SysUsertypePhonepartAction!init.do",
								"prefix":"USER_TYPE_PHONE_",
								"id":"menu_as_usertypephone"
							},{
								"text":"品牌管理",
								"url":"#/antispam2850/pages/common/business/Brand.jsp",
								"prefix":"SIGN_BRAND_",
								"id":"menu_as_brand"
							},{
								"text":"归属号首管理",
								"url":"#/antispam2850/business/areaNumprefGinit.do",
								"prefix":"SIGN_AREANUM_",
								"id":"menu_as_areanumpref"
							},{
								"text":"灰名单管理",
								"url":"#/antispam2850/business/initGrayList.do",
								"prefix":"GRAY_LISTS_",
								"id":"menu_as_graylists"
							},{
								"text":"特殊号码管理",
								"url":"#/antispam2850/pages/qg/business/SpecialNumber.jsp",
								"prefix":"SPECIAL_NUMBER_",
								"id":"menu_as_specialNumber"
							},{
								"text":"本省号段管理",
								"url":"#/antispam2850/business/initSysLocalPhonepart.do",
								"prefix":"LOCAL_PHONE_",
								"id":"menu_as_localPhone"
							},{
								"text":"本省MO_MSC_ID管理",
								"url":"#/antispam2850/pages/qg/business/SysMoMsc.jsp",
								"prefix":"SYS_MO_MSC_",
								"id":"menu_as_sysMoMsc"
							},{
								"text":"SP接入号配置管理",
								"url":"#/antispam2850/pages/qg/business/SpNumber.jsp",
								"prefix":"SP_NUMBER_",
								"id":"menu_as_spNumber"
							},{
								"text":"涉嫌违规SP管理",
								"url":"#/antispam2850/business/initDataAlarmSuspectSp.do",
								"prefix":"ALARM_SUSPECT_SP_",
								"id":"menu_as_dataAlarmSuspectSp"
							},{
								"text":"特殊转发号码管理",
								"url":"#/antispam2850/pages/qg/business/DataSpecialLists.jsp",
								"prefix":"DATA_SPECIALLISTS_",
								"id":"menu_as_dataSpecialLists"
							},{
								"text":"VIP名单管理",
								"url":"#/antispam2850/pages/qg/business/DataVipList.jsp",
								"prefix":null,
								"id":""
							},{
								"text":"提取电话号码管理",
								"url":"#/antispam2850/business/initSysCaCfg.do",
								"prefix":"SYS_GET_PHONE_",
								"id":"menu_as_sysGetPhone"
							}
						]
					}
				]
			},{
				"text":"查询统计",
				"children":[{
						"text":"查询管理",
						"children":[{
								"text":"告警查询",
								"url":"#/antispam2850/query/initAlarmQuery.do",
								"prefix":"ALAR_QUERYQ_",
								"id":"menu_as_alarQueryq"
							},{
								"text":"阻止短消息查询",
								"url":"#/antispam2850/query/initDataSmStopAction.do",
								"prefix":"DATA_SM_STOPQ_",
								"id":"menu_as_dataSmstopq"
							},{
								"text":"白名单违规查询",
								"url":"#/antispam2850/query/initDataWhiteOutlow.do",
								"prefix":"DATA_WHITE_OUTLOWQ_",
								"id":"menu_as_dataWhiteOutlowq"
							},{
								"text":"提交审核记录查询",
								"url":"#/antispam2850/query/initBossToList.do",
								"prefix":"BOSS_TOLISTQ_",
								"id":"menu_as_bossToListq"
							},{
								"text":"审核结果记录查询",
								"url":"#/antispam2850/query/initBossBackList.do",
								"prefix":"BOSS_BACK_LISTQ_",
								"id":"menu_as_bossBackListq"
							},{
								"text":"主叫白名单操作查询",
								"url":"#/antispam2850/query/initDWListsHis.do",
								"prefix":"DW_LISTSHISQ_",
								"id":"menu_as_dtlistsHisq"
							},{
								"text":"提取号码短消息查询",
								"url":"#/antispam2850/query/initDataSmPhone.do",
								"prefix":"DATA_SM_PHONEQ_",
								"id":"menu_as_dataSmPhoneq"
							},{
								"text":"内容分析告警查询",
								"url":"#/antispam2850/query/initContentAlarm.do",
								"prefix":"CONTENT_ALARMQ_",
								"id":"menu_as_contentAlarmq"
							},{
								"text":"H2接口明细查询",
								"url":"#/antispam2850/query/initDH2QueryDetail.do",
								"prefix":null,
								"id":"menu_as_dH2QueryDetailq"
							}
						]
					},{
						"text":"统计管理",
						"children":[{
								"text":"系统运行统计",
								"url":"#/antispam2850/statistic/initRepSystemrunCount.do",
								"prefix":"REP_SYSTEMRUN_COUNTQ_",
								"id":"menu_as_repSystemRunCount"
							},{
								"text":"网元流量统计",
								"url":"#/antispam2850/statistic/initNeStatTimesAciton.do",
								"prefix":"NE_STAT_TIMESQ_",
								"id":"menu_as_neStatTimesq"
							},{
								"text":"黑名单统计",
								"url":"#/antispam2850/statistic/initDataBlklistsAction.do",
								"prefix":"DATA_BLKLISTSQ_",
								"id":"menu_as_dataBlklistsq"
							},{
								"text":"黑名单违规量统计",
								"url":"#/antispam2850/statistic/initSumblkOutlaw.do",
								"prefix":"SUM_BLK_OUTLAWQ_",
								"id":"menu_as_sumblkOutlawq"
							},{
								"text":"黑名单拦截统计",
								"url":"#/antispam2850/statistic/initSumBlkSum.do",
								"prefix":"BLK_SUMQ_",
								"id":"menu_as_blkSumq"
							},{
								"text":"黑名单明细统计",
								"url":"#/antispam2850/statistic/initBlklistsDetailAction.do",
								"prefix":"BLK_LISTSDETAILQ_",
								"id":"menu_as_blklistsDetailq"
							},{
								"text":"白名单流量统计",
								"url":"#/antispam2850/statistic/initDataWhiteFlowTmp.do",
								"prefix":"DATA_WHITE_FLOW_TMPQ_",
								"id":"menu_as_dataWhiteFlowTmpq"
							},{
								"text":"关键字统计",
								"url":"#/antispam2850/statistic/initStaKeywords.do",
								"prefix":"STA_KEYWORDSQ_",
								"id":"menu_as_staKeywords"
							},{
								"text":"关键字拦截统计",
								"url":"#/antispam2850/statistic/initRepKeywordsStopCount.do",
								"prefix":"REPKEYWORDSSTOPQ_",
								"id":"menu_as_repKeywordsStop"
							},{
								"text":"关键字拦截效率统计",
								"url":"#/antispam2850/statistic/initKeywordsRate.do",
								"prefix":"KEYWORDSRATEQ_",
								"id":"menu_as_keywordsRates"
							},{
								"text":"提交审核统计",
								"url":"#/antispam2850/statistic/initStaBoss.do",
								"prefix":"STA_BOSSQ_",
								"id":"menu_as_staBossq"
							},{
								"text":"提交审核按日统计",
								"url":"#/antispam2850/statistic/initRepUnrecognizedBlacklist.do",
								"prefix":"REP_DATE_BLACKLISTQ_",
								"id":"menu_as_repUnrecognizedBlacklistq"
							},{
								"text":"用户群违规统计",
								"url":"#/antispam2850/statistic/initBlklistsUserGroupAction.do",
								"prefix":"SUM_USERGROUPQ_",
								"id":"menu_as_blklistsUserGroup"
							},{
								"text":"按账号统计",
								"url":"#/antispam2850/statistic/initRepByUser.do",
								"prefix":"REP_BY_USERQ_",
								"id":"menu_as_repByUserq"
							},{
								"text":"主叫频次统计",
								"url":"#/antispam2850/statistic/initSenderFrequency.do",
								"prefix":"SUM_SENDERQ_",
								"id":"menu_as_senderFrequency"
							},{
								"text":"短信缓存统计",
								"url":"#/antispam2850/statistic/initRepCache.do",
								"prefix":"REPCACHEQ_",
								"id":"menu_as_repCacheq"
							},{
								"text":"系统处理峰值统计",
								"url":"#/antispam2850/statistic/initRepSystemPerformance.do",
								"prefix":"REP_SYSTEM_PERFORMANCEQ_",
								"id":"menu_as_repSystemPerformance"
							},{
								"text":"H2接口统计",
								"url":"#/antispam2850/statistic/initH2InterfaceStatistic.do",
								"prefix":null,
								"id":"menu_as_h2interfacestatistic"
							}
						]
					}
				]
			},{
				"text":"系统监控",
				"children":[{
						"text":"告警监控",
						"url":"#/antispam2850/flex/alarm.html",
						"prefix":"STAKEOUT_ALARM_",
						"id":"menu_as_stakeoutAlarm"
					},{
						"text":"业务拓扑",
						"url":"#/antispam2850/flex/service.html",
						"prefix":"STAKEOUT_SERVICE_",
						"id":"menu_as_stakeoutService"
					}
				]
			},{
				"text":"导入导出",
				"children":[{
						"text":"导入导出管理",
						"url":"#/antispam2850/pages/qg/file/export.jsp",
						"prefix":"",
						"id":"menu_as_export"
					}
				]
			}
		]
	}

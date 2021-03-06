var aa = [{
		"text":"根节点",
		"url":"#/antispam2850/#",
		"children":[{
				"text":"系统管理",
				"url":"#/antispam2850/#",
				"children":[{
						"text":"系统配置",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"短信采集连接管理",
								"url":"#/antispam2850/interface/sysNeAction!init.do",
								"rightsPrex":"NE_"
							},{
								"text":"模块连接端口配置",
								"url":"#/antispam2850/interface/sysPortsAction!find.do",
								"rightsPrex":"PORTS_"
							},{
								"text":"系统模块管理",
								"url":"#/antispam2850/businessGD/sysModulesAction!init.do",
								"rightsPrex":"MODULES_"
							},{
								"text":"配置变更管理",
								"url":"#/antispam2850/interface/arbSendConfigAction!init.do",
								"rightsPrex":"SENDCONFIG_"
							},{
								"text":"人工仲裁平台连接参数配置",
								"url":"#/antispam2850/strategy/findLinkManualCfg.do",
								"rightsPrex":"LKMANUAL_"
							}
						]
					},{
						"text":"SPM管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"SPM参数设置",
								"url":"#/antispam2850/spm/signlingParamAction!init.do",
								"rightsPrex":"SIGNPARAM_"
							},{
								"text":"SPM设备管理",
								"url":"#/antispam2850/spm/signDevAction!init.do",
								"rightsPrex":"SIGNDEVICE_"
							},{
								"text":"SPM设备E1信息管理",
								"url":"#/antispam2850/spm/signDevE1Action!init.do",
								"rightsPrex":"SIGNDEVE1_"
							},{
								"text":"STP管理",
								"url":"#/antispam2850/pages/gd/spm/Stp.jsp",
								"rightsPrex":"STP_"
							},{
								"text":"SPM链路管理",
								"url":"#/antispam2850/spm/signLinkAction!init.do",
								"rightsPrex":"STP_LINK_"
							},{
								"text":"SPM被叫IMSI管理",
								"url":"#/antispam2850/spm/blkImsiAction!init.do",
								"rightsPrex":"BLK_IMSI_"
							},{
								"text":"SPM数据管理",
								"url":"#/antispam2850/spm/spmDataManagerAction!init.do",
								"rightsPrex":"SIGNSPAM_"
							},{
								"text":"SPM远程升级",
								"url":"#/antispam2850/spm/spmRemoteUpgradeAction!init.do",
								"rightsPrex":"SPM_UPDATE_"
							},{
								"text":"SPM设备版本号比较",
								"url":"#/antispam2850/pages/gd/spm/VersionCompare.jsp",
								"rightsPrex":"BOSSTO_"
							},{
								"text":"SPM拓扑管理",
								"url":"#/antispam2850/flex/Spmtopo.html",
								"rightsPrex":"SPMTOP_"
							}
						]
					},{
						"text":"系统维护",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"用户管理",
								"url":"#/antispam2850/sysuser/initSysUser.do",
								"rightsPrex":"USER_"
							},{
								"text":"用户组管理",
								"url":"#/antispam2850/sysusergrp/initSysRole.do",
								"rightsPrex":"ROLE_"
							},{
								"text":"日志查询",
								"url":"#/antispam2850/systemlog/tblSystemLogAction!iniModelue.do",
								"rightsPrex":"LOG_"
							},{
								"text":"修改密码",
								"url":"#/antispam2850/sysuser/initModifyPwd.do",
								"rightsPrex":"$"
							}
						]
					},{
						"text":"告警管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"告警监控",
								"url":"#/antispam2850/flex/alarm.html",
								"rightsPrex":"BLK_MONITOR_"
							},{
								"text":"系统拓扑",
								"url":"#/antispam2850/flex/SystemTopo.html",
								"rightsPrex":"TOPCODER_"
							}
						]
					}
				]
			},{
				"text":"业务管理",
				"url":"#/antispam2850/#",
				"children":[{
						"text":"白名单管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"主叫白名单管理",
								"url":"#/antispam2850/lists/dataWhitelistsAction!init.do",
								"rightsPrex":"WHITELISTS_"
							},{
								"text":"被叫白名单管理",
								"url":"#/antispam2850/lists/dataWhiteListsRAction!init.do",
								"rightsPrex":"WHITELISTS_R_"
							}
						]
					},{
						"text":"黑名单管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"黑名单管理",
								"url":"#/antispam2850/businessGD/initDataBlklists.do",
								"rightsPrex":"BLKLISTS_"
							}
						]
					},{
						"text":"关键字管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"关键字管理",
								"url":"#/antispam2850/keywords_gd/initKeywords.do",
								"rightsPrex":"KEYWORDS_"
							},{
								"text":"关键字分隔符管理",
								"url":"#/antispam2850/pages/common/keywords/KeywordsChar.jsp",
								"rightsPrex":"KEYCHAR_"
							},{
								"text":"关键字组管理",
								"url":"#/antispam2850/pages/gd/keywords/KeywordsGroup.jsp",
								"rightsPrex":"KWGROUP_"
							},{
								"text":"自动关键字参数设置",
								"url":"#/antispam2850/keywords_gd/KeywordsParamAction!init.do",
								"rightsPrex":"KEYPARAM_"
							}
						]
					},{
						"text":"业务管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"业务类型管理",
								"url":"#/antispam2850/businessGD/sysSmTypeAction!init.do",
								"rightsPrex":"SMTYPE_"
							},{
								"text":"业务类型号段管理",
								"url":"#/antispam2850/businessGD/sysUsertypePhonepartAction!init.do",
								"rightsPrex":"USERTYPE_"
							},{
								"text":"用户群类型管理",
								"url":"#/antispam2850/businessGD/selfUsergroupAction!init.do",
								"rightsPrex":"USRGRP_TYPE_"
							},{
								"text":"用户群阈值管理",
								"url":"#/antispam2850/businessGD/usrgrpThresholdAction!init.do",
								"rightsPrex":"USRGRP_VALUE_"
							},{
								"text":"用户群号首管理",
								"url":"#/antispam2850/businessGD/usrgrpNumprefAction!init.do",
								"rightsPrex":"USRGRP_NUM_"
							},{
								"text":"品牌管理",
								"url":"#/antispam2850/pages/gd/business/Brand.jsp",
								"rightsPrex":"SIGNBRAND_"
							},{
								"text":"归属号首管理",
								"url":"#/antispam2850/businessGD/areaNumprefDataAction!init.do",
								"rightsPrex":"SIGNAREANUM_"
							}
						]
					},{
						"text":"策略管理",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"组合拦截策略管理",
								"url":"#/antispam2850/strategy/strategyAction!init.do",
								"rightsPrex":"STRATEGY_"
							},{
								"text":"内容拦截策略管理",
								"url":"#/antispam2850/strategy/keywordsPmodeMethodAction!init.do",
								"rightsPrex":"PMODE_"
							},{
								"text":"行为拦截策略管理",
								"url":"#/antispam2850/strategy/sysBaValveAction!init.do",
								"rightsPrex":"BAVALVE_"
							},{
								"text":"特殊监控时段管理",
								"url":"#/antispam2850/pages/gd/business/SysMonitorTime.jsp",
								"rightsPrex":"MTTIME_"
							},{
								"text":"内容特殊监控时间段管理",
								"url":"#/antispam2850/businessGD/sysKeyHolidaysAction!init.do",
								"rightsPrex":"WATCHTIME_"
							},{
								"text":"行为分析特殊监控时段管理",
								"url":"#/antispam2850/businessGD/sysBaHolidaysAction!init.do",
								"rightsPrex":"BAHOLIDAY_"
							},{
								"text":"行为分析模型配置",
								"url":"#/antispam2850/strategy/sysBaModelAction!init.do",
								"rightsPrex":"BAMODEL_"
							},{
								"text":"模型优先级配置",
								"url":"#/antispam2850/strategy/typeLevelAction!find.do",
								"rightsPrex":"TYLEVEL_"
							},{
								"text":"送人工仲裁平台策略配置",
								"url":"#/antispam2850/strategy/findToManualCfg.do",
								"rightsPrex":"TOMANUAL_"
							}
						]
					}
				]
			},{
				"text":"业务查询",
				"url":"#/antispam2850/#",
				"children":[{
						"text":"阻止短消息查询",
						"url":"#/antispam2850/query/dataSmStopAction!init.do",
						"rightsPrex":"STOP_RANSON_"
					},{
						"text":"组合拦截策略告警查询",
						"url":"#/antispam2850/query/alarmQueryAction!init.do",
						"rightsPrex":"STAT_BA_"
					},{
						"text":"内容拦截策略告警查询",
						"url":"#/antispam2850/#query/contentThresholdAlarm!init.do",
						"rightsPrex":"CONTENT_TH_"
					},{
						"text":"网元流量统计",
						"url":"#/antispam2850/query/neStatTimesAction!init.do",
						"rightsPrex":"STAT_ESME_"
					},{
						"text":"关键字命中率查询",
						"url":"#/antispam2850/query/keywordsRateAction!init.do",
						"rightsPrex":"KEYRATE_"
					},{
						"text":"网管告警查询",
						"url":"#/antispam2850/query/dataAlarmNmsAction!init.do",
						"rightsPrex":"BOSSBACK_"
					},{
						"text":"网管同步信息汇总",
						"url":"#/antispam2850/query/spmSyncDetailAction!init.do",
						"rightsPrex":"BOSSSYNGA_"
					},{
						"text":"可疑词汇统计",
						"url":"#/antispam2850/query/keywordsBackAction!init.do",
						"rightsPrex":"REPORT1_"
					}
				]
			},{
				"text":"统计报表",
				"url":"#/antispam2850/#",
				"children":[{
						"text":"消息流量统计",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"黑名单与复通量统计",
								"url":"#/antispam2850/report/sumBlkReopenAction!init.do",
								"rightsPrex":"BLKREOPEN_"
							},{
								"text":"消息违规与拦截量汇总统计",
								"url":"#/antispam2850/report/sumSmTotalAction!init.do",
								"rightsPrex":"SMTOTAL_"
							},{
								"text":"消息违规量明细统计",
								"url":"#/antispam2850/report/sumSmOutlawDetailAction!init.do",
								"rightsPrex":"OUTDETAIL_"
							},{
								"text":"消息拦截量明细统计",
								"url":"#/antispam2850/report/sumSmStopAction!init.do",
								"rightsPrex":"SMSTOP_"
							},{
								"text":"网间消息违规与黑名单统计",
								"url":"#/antispam2850/report/sumOutnetSmBlkAction!init.do",
								"rightsPrex":"NETBLK_"
							},{
								"text":"省际消息统计报表",
								"url":"#/antispam2850/report/sumLinkSmAction!init.do",
								"rightsPrex":"LINKSM_"
							},{
								"text":"最忙5分钟消息量统计",
								"url":"#/antispam2850/report/sumSmBusyFiveAction!init.do",
								"rightsPrex":"BUSYFIVE_"
							},{
								"text":"SPM最忙5分钟消息量统计",
								"url":"#/antispam2850/report/sumSmBusyFiveSpmAction!init.do",
								"rightsPrex":"SMBUS5SPM_"
							},{
								"text":"Proxy峰值消息流量统计",
								"url":"#/antispam2850/report/sumProxyMaxAction!init.do",
								"rightsPrex":"PROMAX_"
							}
						]
					},{
						"text":"模型效果统计",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"行为分析违规明细统计",
								"url":"#/antispam2850/report/sumBaOutlawAction!init.do",
								"rightsPrex":"BAOUTLAW_"
							},{
								"text":"省际行为分析违规明细统计",
								"url":"#/antispam2850/report/sumLinkBaOutlawAction!init.do",
								"rightsPrex":"LINKOUTLAW_"
							},{
								"text":"网间的行为分析违规明细统计",
								"url":"#/antispam2850/report/sumBaOutnetAction!init.do",
								"rightsPrex":"BAKEYWORDSOUTNET_"
							},{
								"text":"关键字违规量明细统计",
								"url":"#/antispam2850/report/sumKeywordOutlawAction!init.do",
								"rightsPrex":"KWOUTLAW_"
							},{
								"text":"省际关键字违规明细统计",
								"url":"#/antispam2850/report/sumKeywordSignAction!init.do",
								"rightsPrex":"LINKKEYWORDS_"
							},{
								"text":"网间的关键字违规明细统计",
								"url":"#/antispam2850/report/sumKeywordOutnetAction!init.do",
								"rightsPrex":"OUTNETKEYWORDS_"
							},{
								"text":"行为分析模型有效率统计",
								"url":"#/antispam2850/report/sumBaOutlawBlkRatioAction!init.do",
								"rightsPrex":"SUMBAOUTLAWBLK_"
							},{
								"text":"监控拦截有效率统计",
								"url":"#/antispam2850/report/sumArbPrecisionAction!init.do",
								"rightsPrex":"PRECISION_"
							},{
								"text":"收端拦截明细统计",
								"url":"#/antispam2850/report/sumOutnetStopSenderAction!init.do",
								"rightsPrex":"NETSENDER_"
							},{
								"text":"短信鉴权成功率统计",
								"url":"#/antispam2850/report/sumSmSuccessRatioAction!init.do",
								"rightsPrex":"SUMSMSUCCESS_"
							}
						]
					},{
						"text":"SPM统计报表",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"SPM处理时延统计报表",
								"url":"#/antispam2850/report/sumLinkDelayAction!init.do",
								"rightsPrex":"LINKDELAY_"
							},{
								"text":"省际信令链路负荷统计",
								"url":"#/antispam2850/report/sumLinkLoadAction!init.do",
								"rightsPrex":"LINKLOAD_"
							},{
								"text":"省际信令链路拦截时长统计",
								"url":"#/antispam2850/report/sumLinkHolupsecondsAction!init.do",
								"rightsPrex":"LINKSEC_"
							},{
								"text":"省际信令链路完好率统计",
								"url":"#/antispam2850/report/sumLinkAvaliablesecondsAction!init.do",
								"rightsPrex":"LINKAVA_"
							}
						]
					},{
						"text":"外部链接",
						"url":"#/antispam2850/#",
						"children":[{
								"text":"Proxy外部链接",
								"url":"#/antispam2850/www.hao123.com",
								"rightsPrex":"PROXYURL_"
							}
						]
					}
				]
			},{
				"text":"导入导出",
				"url":"#/antispam2850/#",
				"children":[{
						"text":"导入导出管理",
						"url":"#/antispam2850/pages/gd/file/export.jsp",
						"rightsPrex":"$"
					}
				]
			}
		]
	}
]

KISSY.use('builtin', function(S, undef){
	function filter(arr){
		S.each(arr, function(v, i, o){
			if(v.children){
				delete v.url;
				filter(v.children);
			}else{
				v.prefix = v.rightsPrex;
				delete v.rightsPrex;

				//还有id, helpurl两个属性需要处理
			}
		});
	}

	filter(aa);

	$('body').prepend('<textarea>'+viewJSON(aa)+'</textarea>');
});

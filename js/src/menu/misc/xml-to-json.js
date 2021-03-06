var xml = '<root><menu text="系统管理"><menu text="系统配置管理"><item prefix="MODULES_" url="#/antispam2850/businesscomm/initSysModules.do">系统模块管理</item><item prefix="SYS_PORTS_" url="#/antispam2850/interfacecomm/initSysPorts.do">模块连接端口配置</item><item prefix="AUTO_REPORT_CFG_" url="#/antispam2850/interface/findSysAutoCreateReportConfig.do">自动报表生成参数配置</item><item prefix="SYS_ALARM_CFG_" url="#/antispam2850/interface/initSysAlarmCfg.do">业务告警设置</item><item prefix="ALARM_PARAM_CFG_" url="#/antispam2850/interface/initAlarmParamCfg.do">告警处理参数配置</item><item prefix="@#$%" url="#">系统监控参数配置</item></menu><menu text="安全管理"><item prefix="USER_" url="#/antispam2850/sysuser/initSysUser.do">用户管理</item><item prefix="ROLE_" url="#/antispam2850/sysusergrp/initSysRole.do">用户组管理</item><item prefix="LOG_" url="#/antispam2850/systemlog/iniSystemLog.do">日志查询</item><item prefix="$" url="#/antispam2850/sysuser/initModifyPwd.do">修改密码</item></menu></menu><menu text="接口管理"><item prefix="SYS_NE_" url="#/antispam2850/interfacecomm/initSysNe.do">网元管理</item><item prefix="SYS_PROXY_" url="#/antispam2850/interface/initSysBlackInterface.do">黑名单接口管理</item><item prefix="REAL_TIME_BOSS_" url="#/antispam2850/interface/initRealTimeBossAction.do">实时BOSS参数配置</item><item prefix="NOT_REAL_TIME_" url="#/antispam2850/interface/initNotRealTimeBoss.do">非实时BOSS参数配置</item><item prefix="AUDITING_FLAT_" url="#/antispam2850/interface/initExamineInterface.do">审核平台接口参数配置</item><item prefix="SYS_INTERFACEUSER_" url="#/antispam2850/interface/initSysInterfaceUser.do">外部接口平台帐户管理</item><item prefix="USRGRP_FTP_CFG_" url="#/antispam2850/interface/findUsrGrpInterfaceCfg.do">用户群FTP接口配置</item><item prefix="GRAY_INTERFACE_CFG_" url="#/antispam2850/interface/findGrayInterface.do">灰名单接口管理</item><item prefix="SYS_MM5_" url="#/antispam2850/interface/initSysMM5Interface.do">复制卡监控参数配置</item><item prefix="CACHE_PARAMS_" url="#/antispam2850/interface/initSysCommonValue.do">缓存短信参数配置</item><item prefix="@#$%" url="#">消息转发接口配置</item><item prefix="@#$%" url="#">H2营帐接口配置</item></menu><menu text="业务管理"><menu text="黑白名单管理"><item prefix="WHITE_LISTS_" url="#/antispam2850//phonecode/initDataWhitelists.do">主叫白名单管理</item><item prefix="WHITE_LISTSR_" url="#/antispam2850//pages/qg/phonecode/DataWhiteListsR.jsp">被叫白名单管理</item><item prefix="BLK_LISTSM_" url="#/antispam2850/phonecode/initDataBlklists.do">黑/嫌疑名单管理</item><item prefix="BLK_LISTSR_" url="#/antispam2850//phonecode/initDataBlklistsR.do">被叫黑名单管理</item><item prefix="TYPE_LEVEL_" url="#/antispam2850/businesscomm/initTypeLevel.do">黑白名单优先级管理</item></menu><menu text="关键字管理"><item prefix="KEY_PARAM_" url="#/antispam2850/keywordscomm/KeywordsParamAction!init.do">关键字参数设置</item><item prefix="KEY_CHAR_" url="#/antispam2850/pages/common/keywords/KeywordsChar.jsp">关键字分隔符管理</item><item prefix="KEY_POOL_" url="#/antispam2850/keywordscomm/BaseKeywordsPoolAction!init.do">嫌疑短信管理</item><item prefix="KEYWORDS_" url="#/antispam2850/keywords/initKeywords.do">关键字管理</item><item prefix="KEY_GROUP_" url="#/antispam2850/pages/qg/keywords/KeywordsGroup.jsp">关键字分组管理</item><item prefix="KEY_AUTO_INPUT_" url="#/antispam2850/keywords/findCfgOutInterface.do">关键字自动导入参数</item></menu><menu text="监控策略管理"><item prefix="SYS_MODEL_" url="#/antispam2850/strategy/initSysModel.do">基本模型管理</item><item prefix="GROUPS_" url="#/antispam2850/strategy/initUserGroup.do">用户群管理</item><item prefix="USER_GROUP_" url="#/antispam2850/strategy/initGroup.do">用户群名单管理</item><item prefix="SYS_MONITOR_TIME_" url="#/antispam2850/strategy/initSysMonitorTime.do">监控时段管理</item><item prefix="SYS_OUTLAWREASON_CFG_" url="#/antispam2850/pages/qg/strategy/SysOutlawreasonConfig.jsp">违规原因转换配置</item><item prefix="SYS_STRATEGY_" url="#/antispam2850/strategy/sysStrategyInit.do">监控策略管理</item></menu><menu text="业务配置管理"><item prefix="USER_TYPE_PHONE_" url="#/antispam2850/business/SysUsertypePhonepartAction!init.do">用户类型号段管理</item><item prefix="SIGN_BRAND_" url="#/antispam2850/pages/common/business/Brand.jsp">品牌管理</item><item prefix="SPECIAL_NUMBER_" url="#/antispam2850/pages/qg/business/SpecialNumber.jsp">归属号首管理</item><item prefix="GRAY_LISTS_" url="#/antispam2850/business/initGrayList.do">灰名单管理</item><item prefix="SPECIAL_NUMBER_" url="#/antispam2850/pages/qg/business/SpecialNumber.jsp">特殊号码管理</item><item prefix="LOCAL_PHONE_" url="#/antispam2850/pages/qg/business/SysLocalPhonepart.jsp">本省号段管理</item><item prefix="SYS_MO_MSC_" url="#/antispam2850/pages/qg/business/SysMoMsc.jsp">本省MO_MSC_ID管理</item><item prefix="SP_NUMBER_" url="#/antispam2850/pages/qg/business/SpNumber.jsp">SP接入号配置管理</item><item prefix="ALARM_SUSPECT_SP_" url="#/antispam2850/business/initDataAlarmSuspectSp.do">涉嫌违规SP管理</item><item prefix="@#$%" url="#">特殊转发号码管理</item><item prefix="@#$%" url="#">VIP名单管理</item><item prefix="SYS_GET_PHONE_" url="#/antispam2850/business/initSysCaCfg.do">提取电话号码管理</item></menu></menu><menu text="查询统计"><menu text="查询管理"><item prefix="ALAR_QUERYQ_" url="#/antispam2850/query/initAlarmQuery.do">告警查询</item><item prefix="DATA_SM_STOPQ_" url="#/antispam2850/query/initDataSmStopAction.do">阻止短消息查询</item><item prefix="@#$%" url="#">白名单违规查询</item><item prefix="BOSS_TOLISTQ_" url="#/antispam2850/query/initBossToList.do">提交审核记录查询</item><item prefix="BOSS_BACK_LISTQ_" url="#/antispam2850/query/initBossBackList.do">审核结果记录查询</item><item prefix="DW_LISTSHISQ_" url="#/antispam2850/query/initDWListsHis.do">主叫白名单操作查询</item><item prefix="DATA_SM_PHONEQ_" url="#/antispam2850/query/initDataSmPhone.do">提取号码短消息查询</item><item prefix="CONTENT_ALARMQ_" url="#/antispam2850/query/initContentAlarm.do">内容分析告警查询</item><item prefix="@#$%" url="#">H2接口明细查询</item></menu><menu text="统计管理"><item prefix="REP_SYSTEMRUN_COUNTQ_" url="#/antispam2850/statistic/initRepSystemrunCount.do">系统运行统计</item><item prefix="NE_STAT_TIMESQ_" url="#/antispam2850/statistic/initNeStatTimesAciton.do">网元流量统计</item><item prefix="DATA_BLKLISTSQ_" url="#/antispam2850/statistic/initDataBlklistsAction.do">黑名单统计</item><item prefix="SUM_BLK_OUTLAWQ_" url="#/antispam2850/statistic/initSumblkOutlaw.do">黑名单违规量统计</item><item prefix="BLK_SUMQ_" url="#/antispam2850/statistic/initSumBlkSum.do">黑名单拦截统计</item><item prefix="BLK_LISTSDETAILQ_" url="#/antispam2850/statistic/initBlklistsDetailAction.do">黑名单明细统计</item><item prefix="@#$%" url="#">白名单流量统计</item><item prefix="STA_KEYWORDSQ_" url="#/antispam2850/statistic/initStaKeywords.do">关键字统计</item><item prefix="REPKEYWORDSSTOPQ_" url="#/antispam2850/statistic/initRepKeywordsStopCount.do">关键字拦截统计</item><item prefix="KEYWORDSRATEQ_" url="#/antispam2850/statistic/initKeywordsRate.do">关键字拦截效率统计</item><item prefix="STA_BOSSQ_" url="#/antispam2850/statistic/initStaBoss.do">提交审核统计</item><item prefix="REP_DATE_BLACKLISTQ_" url="#/antispam2850/statistic/initRepUnrecognizedBlacklist.do">提交审核按日统计</item><item prefix="SUM_USERGROUPQ_" url="#/antispam2850/statistic/initBlklistsUserGroupAction.do">用户群违规统计</item><item prefix="REP_BY_USERQ_" url="#/antispam2850/statistic/initRepByUser.do">按账号统计</item><item prefix="SUM_SENDERQ_" url="#/antispam2850/statistic/initSenderFrequency.do">主叫频次统计</item><item prefix="REPCACHEQ_" url="#/antispam2850/statistic/initRepCache.do">短信缓存统计</item><item prefix="REP_SYSTEM_PERFORMANCEQ_" url="#/antispam2850/statistic/initRepSystemPerformance.do">系统处理峰值统计</item><item prefix="@#$%" url="#">H2接口统计</item></menu></menu><menu text="系统监控"><item prefix="STAKEOUT_ALARM_" url="#/antispam2850/flex/alarm.html">告警监控</item><item prefix="STAKEOUT_SERVICE_" url="#/antispam2850/flex/service.html">业务拓扑</item><item prefix="@#$%" url="#">网元流量</item></menu><menu text="导入导出"><item prefix="$" url="#/antispam2850/pages/qg/file/export.jsp">导入导出管理</item></menu></root>';
var menu = [{
	"text": "根节点",
	"children": []
	}];

function makeMenu(parent, node){
	node.children('menu, item').each(function(i, v){
		v = $(v);
		if(v.is('item')){
			parent.children.push({
				"text": v.text(),
				"url": v.attr('url'),
				"prefix": v.attr('ccccc'),
				"id": v.attr('id')
			});
		}else{
			i = {
				"text": v.attr('text'),
				"children": []
			}
			parent.children.push(i);
			makeMenu(i, v);
		}
	})
}

makeMenu(menu[0], c12);


viewJSON = function(obj,tabs){
	var isArr = Object.prototype.toString.apply(obj) === '[object Array]';
	var str = isArr ? '[' : '{';
	var arr = [];
	tabs = tabs ? tabs : '';
	var tabs2 = tabs ? tabs+'\t' : '\t';
	for(var i in obj){
		if (!obj.hasOwnProperty(i)){
			continue;
		}
		if(typeof obj[i] == 'number'){//返回 'key':val|数组val;
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+obj[i]);
		}else if(typeof obj[i] == 'string'){//返回 'key':'val'|数组'val';
			arr.push('\n'+tabs2+(isArr ? '"' : '"'+i+'":"')+obj[i]+'"');
		}else if(typeof obj[i] == 'boolean'){//返回 'key':'val'|数组'val';
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+obj[i]+'');
		}else if(obj[i] == null){//返回 'key':null|数组null;
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+'null');
		}else if(obj[i] == undefined){//返回 'key':undefined|数组undefined;
			arr.push('\n'+tabs2+(isArr ? '' : '"'+i+'":')+'undefined');
		}else if(typeof obj[i] == 'object'){
			arr.push((isArr ? '' : '\n'+tabs2+'"'+i+'":')+viewJSON(obj[i],tabs2));
		}else if(typeof obj[i] == 'function'){
			arr.push('\n'+tabs2+(isArr ? '"' : '"'+i+'":"')+'[function]"');
		}else{
			throw ('出错: '+obj[i]);
		}
	}
	str += arr.join(',');
	str += isArr ? '\n'+tabs+']' : '\n'+tabs+'}';
	return str;
}

$('body').prepend('<textarea>'+viewJSON(menu)+'</textarea>');

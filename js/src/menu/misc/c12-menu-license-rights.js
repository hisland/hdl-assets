// 1. 实时BOSS参数配置
put(SysConstants.REAL_TIME_BOSS_,
	license.getBossCheck() == Constants.ACTIVE
		&& (license.getBossType()== SysInterfaceService.BOSS_TYPE_10
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_11
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_12) );

// 2. 非实时BOSS参数配置
put(SysConstants.NOT_REAL_TIME_,
	license.getBossCheck() == Constants.ACTIVE
		&& (license.getBossType()== SysInterfaceService.BOSS_TYPE_1
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_0
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_2) );

// 3. 审核平台接口参数配置
put(SysConstants.AUDITING_FLAT_,
	license.getBossCheck() == Constants.ACTIVE
		&& license.getMsgRelax()==Constants.ACTIVE 
		&& (license.getBossType()== SysInterfaceService.BOSS_TYPE_3
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_4) );

// 4. 外部接口平台帐户管理
put(SysConstants.SYS_INTERFACEUSER_,
	(license.getComplaints() == Constants.ACTIVE 
		|| license.getCustomerServiceSys() == Constants.ACTIVE) );

// 5. 用户群FTP接口配置
put(SysConstants.USRGRP_FTP_CFG_,
	license.getUserGroup()==Constants.ACTIVE
		&& (license.getGroupCfg().get(0).getUserGroupInter()==Constants.ACTIVE
			|| license.getGroupCfg().get(1).getUserGroupInter()==Constants.ACTIVE) );

// 6. 灰名单接口管理
put(SysConstants.GRAY_INTERFACE_CFG_,
	license.getGrayCheck() == Constants.ACTIVE );

// 7. 复制卡监控参数配置
put(SysConstants.SYS_MM5_,
	license.getStrategyCfg().get(11).getModelActive() == Constants.ACTIVE );

// 8. 缓存短信参数配置
put(SysConstants.CACHE_PARAMS_,
	license.getRealtime() == Constants.REAL_TIME
		&& license.getMsgRelax()==Constants.ACTIVE );

// 9. 用户群管理
put(SysConstants.GROUPS_,
	license.getUserGroup()==Constants.ACTIVE );

// 10. 用户群名单管理
put(SysConstants.USER_GROUP_,
	license.getUserGroup() == Constants.ACTIVE );

// 11. 灰名单管理
put(SysConstants.GRAY_LISTS_,
	license.getGrayCheck() == Constants.ACTIVE );

// 12. 特殊号码管理
put(SysConstants.SPECIAL_NUMBER_,
	license.getSpecialNumber() == Constants.ACTIVE );

// 13. 本省号段管理
put(SysConstants.LOCAL_PHONE_,
	license.getStrategyCfg().get(5).getModelActive()  == Constants.ACTIVE );

// 14. MO_MSC_ID管理
put(SysConstants.SYS_MO_MSC_,
	license.getStrategyCfg().get(11).getModelActive()  == Constants.ACTIVE );

// 15. 品牌管理
put(SysConstants.SIGN_BRAND_,
	license.getAreaCheck() == Constants.ACTIVE );

// 16. 归属号首管理
put(SysConstants.SIGN_AREANUM_,
	license.getAreaCheck() == Constants.ACTIVE );

// 17. 提取电话号码管理
put(SysConstants.SYS_GET_PHONE_,
	license.getPhoneCheck() == Constants.ACTIVE );

// 18. SP接入号配置管理
put(SysConstants.SP_NUMBER_ ,
	license.getRealtime() == Constants.REAL_TIME
		&& license.getSpMonitor() == Constants.ACTIVE );

// 19. 涉嫌违规SP管理
put(SysConstants.ALARM_SUSPECT_SP_ ,
	license.getSuspectSp() == Constants.ACTIVE );

// 20. 被叫白名单管理
put(SysConstants.WHITE_LISTSR_,
	license.getReceiptorCheck() == Constants.ACTIVE );

// 21. 被叫黑名单管理
put(SysConstants.BLK_LISTSR_,
	license.getBlklistR() == Constants.ACTIVE );

// 22. 关键字参数设置
put(SysConstants.KEY_PARAM_,
	license.getKeyauto() == Constants.ACTIVE );

// 23. 关键字分隔符管理
put(SysConstants.KEY_CHAR_,
	license.getKeychar() != Constants.IN_ACTIVE );

// 24. 嫌疑短信管理
put(SysConstants.KEY_POOL_,
	license.getKeypool() == Constants.ACTIVE );

// 25. 关键字自动导入参数
put(SysConstants.KEY_AUTO_INPUT_,
	license.getKeywordsAutoInput() == Constants.ACTIVE );

// 26. 提交审核统计
put(SysConstants.STA_BOSSQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 27. 提交审核按日统计
put(SysConstants.REP_DATE_BLACKLISTQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 28. 黑名单统计
put(SysConstants.DATA_BLKLISTSQ_,
	license.getRealtime() == Constants.REAL_TIME );

// 29. 用户群违规统计
put(SysConstants.SUM_USERGROUPQ_,
	license.getUserGroup()==Constants.ACTIVE );

// 30. 关键字拦截效率统计
put(SysConstants.KEYWORDSRATEQ_,
	license.getKeyrateCheck() == Constants.ACTIVE );

// 31. 关键字拦截统计黑名单拦截统计
put(SysConstants.REPKEYWORDSSTOPQ_,
	license.getRealtime() == Constants.REAL_TIME);

// 32. 主叫频次统计
put(SysConstants.SUM_SENDERQ_,
	license.getRealtime() == Constants.NOT_REAL_TIME
		&& license.getSumsender() == Constants.ACTIVE );

// 33. 短信缓存统计系统处理峰值统计系统运行统计
put(SysConstants.REPCACHEQ_,
	license.getRealtime() == Constants.REAL_TIME );

// 34. 短信缓存统计系统处理峰值统计
put(SysConstants.REPCACHEQ_,
	license.getMsgRelax() == Constants.ACTIVE );

// 35. 系统运行统计
put(SysConstants.REP_SYSTEMRUN_COUNTQ_,
	license.getRunReport() == Constants.ACTIVE );

// 36. 提取号码短消息查询
put(SysConstants.DATA_SM_PHONEQ_,
	license.getPhoneCheck() == Constants.ACTIVE );

// 37. 提交审核记录查询
put(SysConstants.BOSS_TOLISTQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 38. 审核结果记录查询
put(SysConstants.BOSS_BACK_LISTQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 39.飞信平台接口管理
put(SysConstants.SYS_CLIENT_INFO_,
	license.getKeywordsOuterSoap() == Constants.ACTIVE ); 

// 40. 按账号统计
put(SysConstants.REP_BY_USERQ_,
	license.getByUserCount() == Constants.ACTIVE );
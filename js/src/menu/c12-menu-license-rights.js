// 1. ʵʱBOSS��������
put(SysConstants.REAL_TIME_BOSS_,
	license.getBossCheck() == Constants.ACTIVE
		&& (license.getBossType()== SysInterfaceService.BOSS_TYPE_10
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_11
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_12) );

// 2. ��ʵʱBOSS��������
put(SysConstants.NOT_REAL_TIME_,
	license.getBossCheck() == Constants.ACTIVE
		&& (license.getBossType()== SysInterfaceService.BOSS_TYPE_1
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_0
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_2) );

// 3. ���ƽ̨�ӿڲ�������
put(SysConstants.AUDITING_FLAT_,
	license.getBossCheck() == Constants.ACTIVE
		&& license.getMsgRelax()==Constants.ACTIVE 
		&& (license.getBossType()== SysInterfaceService.BOSS_TYPE_3
			|| license.getBossType()==SysInterfaceService.BOSS_TYPE_4) );

// 4. �ⲿ�ӿ�ƽ̨�ʻ�����
put(SysConstants.SYS_INTERFACEUSER_,
	(license.getComplaints() == Constants.ACTIVE 
		|| license.getCustomerServiceSys() == Constants.ACTIVE) );

// 5. �û�ȺFTP�ӿ�����
put(SysConstants.USRGRP_FTP_CFG_,
	license.getUserGroup()==Constants.ACTIVE
		&& (license.getGroupCfg().get(0).getUserGroupInter()==Constants.ACTIVE
			|| license.getGroupCfg().get(1).getUserGroupInter()==Constants.ACTIVE) );

// 6. �������ӿڹ���
put(SysConstants.GRAY_INTERFACE_CFG_,
	license.getGrayCheck() == Constants.ACTIVE );

// 7. ���ƿ���ز�������
put(SysConstants.SYS_MM5_,
	license.getStrategyCfg().get(11).getModelActive() == Constants.ACTIVE );

// 8. ������Ų�������
put(SysConstants.CACHE_PARAMS_,
	license.getRealtime() == Constants.REAL_TIME
		&& license.getMsgRelax()==Constants.ACTIVE );

// 9. �û�Ⱥ����
put(SysConstants.GROUPS_,
	license.getUserGroup()==Constants.ACTIVE );

// 10. �û�Ⱥ��������
put(SysConstants.USER_GROUP_,
	license.getUserGroup() == Constants.ACTIVE );

// 11. ����������
put(SysConstants.GRAY_LISTS_,
	license.getGrayCheck() == Constants.ACTIVE );

// 12. ����������
put(SysConstants.SPECIAL_NUMBER_,
	license.getSpecialNumber() == Constants.ACTIVE );

// 13. ��ʡ�Ŷι���
put(SysConstants.LOCAL_PHONE_,
	license.getStrategyCfg().get(5).getModelActive()  == Constants.ACTIVE );

// 14. MO_MSC_ID����
put(SysConstants.SYS_MO_MSC_,
	license.getStrategyCfg().get(11).getModelActive()  == Constants.ACTIVE );

// 15. Ʒ�ƹ���
put(SysConstants.SIGN_BRAND_,
	license.getAreaCheck() == Constants.ACTIVE );

// 16. �������׹���
put(SysConstants.SIGN_AREANUM_,
	license.getAreaCheck() == Constants.ACTIVE );

// 17. ��ȡ�绰�������
put(SysConstants.SYS_GET_PHONE_,
	license.getPhoneCheck() == Constants.ACTIVE );

// 18. SP��������ù���
put(SysConstants.SP_NUMBER_ ,
	license.getRealtime() == Constants.REAL_TIME
		&& license.getSpMonitor() == Constants.ACTIVE );

// 19. ����Υ��SP����
put(SysConstants.ALARM_SUSPECT_SP_ ,
	license.getSuspectSp() == Constants.ACTIVE );

// 20. ���а���������
put(SysConstants.WHITE_LISTSR_,
	license.getReceiptorCheck() == Constants.ACTIVE );

// 21. ���к���������
put(SysConstants.BLK_LISTSR_,
	license.getBlklistR() == Constants.ACTIVE );

// 22. �ؼ��ֲ�������
put(SysConstants.KEY_PARAM_,
	license.getKeyauto() == Constants.ACTIVE );

// 23. �ؼ��ַָ�������
put(SysConstants.KEY_CHAR_,
	license.getKeychar() != Constants.IN_ACTIVE );

// 24. ���ɶ��Ź���
put(SysConstants.KEY_POOL_,
	license.getKeypool() == Constants.ACTIVE );

// 25. �ؼ����Զ��������
put(SysConstants.KEY_AUTO_INPUT_,
	license.getKeywordsAutoInput() == Constants.ACTIVE );

// 26. �ύ���ͳ��
put(SysConstants.STA_BOSSQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 27. �ύ��˰���ͳ��
put(SysConstants.REP_DATE_BLACKLISTQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 28. ������ͳ��
put(SysConstants.DATA_BLKLISTSQ_,
	license.getRealtime() == Constants.REAL_TIME );

// 29. �û�ȺΥ��ͳ��
put(SysConstants.SUM_USERGROUPQ_,
	license.getUserGroup()==Constants.ACTIVE );

// 30. �ؼ�������Ч��ͳ��
put(SysConstants.KEYWORDSRATEQ_,
	license.getKeyrateCheck() == Constants.ACTIVE );

// 31. �ؼ�������ͳ�ƺ���������ͳ��
put(SysConstants.REPKEYWORDSSTOPQ_,
	license.getRealtime() == Constants.REAL_TIME);

// 32. ����Ƶ��ͳ��
put(SysConstants.SUM_SENDERQ_,
	license.getRealtime() == Constants.NOT_REAL_TIME
		&& license.getSumsender() == Constants.ACTIVE );

// 33. ���Ż���ͳ��ϵͳ�����ֵͳ��ϵͳ����ͳ��
put(SysConstants.REPCACHEQ_,
	license.getRealtime() == Constants.REAL_TIME );

// 34. ���Ż���ͳ��ϵͳ�����ֵͳ��
put(SysConstants.REPCACHEQ_,
	license.getMsgRelax() == Constants.ACTIVE );

// 35. ϵͳ����ͳ��
put(SysConstants.REP_SYSTEMRUN_COUNTQ_,
	license.getRunReport() == Constants.ACTIVE );

// 36. ��ȡ�������Ϣ��ѯ
put(SysConstants.DATA_SM_PHONEQ_,
	license.getPhoneCheck() == Constants.ACTIVE );

// 37. �ύ��˼�¼��ѯ
put(SysConstants.BOSS_TOLISTQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 38. ��˽����¼��ѯ
put(SysConstants.BOSS_BACK_LISTQ_,
	license.getBossCheck() == Constants.ACTIVE );

// 39.����ƽ̨�ӿڹ���
put(SysConstants.SYS_CLIENT_INFO_,
	license.getKeywordsOuterSoap() == Constants.ACTIVE ); 

// 40. ���˺�ͳ��
put(SysConstants.REP_BY_USERQ_,
	license.getByUserCount() == Constants.ACTIVE );
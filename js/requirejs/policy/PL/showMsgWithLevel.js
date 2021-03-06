define(['ui/tip'], function(Tip){
	return {
		/**
		 * 定义系统消息级别
		 */
		MSG_LEVEL: {
			SUCC: 1,//成功信息
			HINT: 2,//提示信息/警告
			FAIL: 3,//错误信息
			NO_OPT: 4//验证失败-未做任何db操作
		},
		/**
		 * 消息统一提示
		 * @param vmsg String 提示信息内容
		 * @param vlevel Int 消息等级
		 * @return ui/tip
		 */
		showMsgWithLevel: function(vmsg, vlevel){
			if (vlevel === this.MSG_LEVEL.SUCC){
				return Tip.alert(vmsg); 
			} else if (vlevel === this.MSG_LEVEL.HINT){
				return Tip.notice(vmsg); 
			} else if (vlevel === this.MSG_LEVEL.NO_OPT) {
				return Tip.error(vmsg); 
			}else{
				return Tip.error(vmsg); 
			}
		}
	};
});
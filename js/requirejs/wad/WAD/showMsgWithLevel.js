define(['ui/tip'], function(Tip){
	return {
		/**
		 * 定义系统消息级别
		 */
		MSG_LEVEL: {
			//成功信息
			SUCC: 1,
			//提示信息/警告
			HINT: 2,
			//错误信息
			FAIL: 3,
			//验证失败-未做任何db操作
			NO_OPT: 4,
			//session超时
			TIMEOUT: 5
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
			} else if (vlevel === this.MSG_LEVEL.TIMEOUT) {
				window.ajaxError();
			}else{
				return Tip.error(vmsg); 
			}
		}
	};
});
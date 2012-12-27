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
			var type = 'alert';
			if (vlevel === this.MSG_LEVEL.SUCC){
				type = 'alert';
			} else if (vlevel === this.MSG_LEVEL.HINT){
				type = 'notice';
			} else if (vlevel === this.MSG_LEVEL.NO_OPT) {
				type = 'error';
			} else if (vlevel === this.MSG_LEVEL.TIMEOUT) {
				window.ajaxError();
				return;
			}else{
				type = 'error';
			}
			var tip = Tip[type](vmsg);
			tip.hideAction = 'remove';
			return tip;
		}
	};
});
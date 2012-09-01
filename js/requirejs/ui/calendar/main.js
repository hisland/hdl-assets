/**
 * 
 */

define(['./dateTool/dateTool'], function(Calendar){
	return {
		init: function(setting){
			return {
				attach: function(selector){
					this.selector = selector || this.selector;
					if(!this.isInit){
						this.isInit = true;
						$(this.selector).addClass('hdt-ipt-rdol').dateTool(setting);
					}else{
						$(this.selector).removeClass('hdt-ipt-rdol').dateTool({
							disabled: false
						});
					}
					return this;
				},
				detach: function(){
					$(this.selector).dateTool({
						disabled: true
					});
					return this;
				},
				setSetting: function(setting){
					$(this.selector).dateTool(setting);
					return this;
				},
				setFixed: function(setting){
					$(this.selector).dateTool(setting);
					return this;
				},
				setWeekStart: function(n){
					$(this.selector).dateTool().setWeekStart(n);
					return this;
				},
				setBtnClearEnable: function(state){
					$(this.selector).dateTool({
						btn_clear_enable: !!state
					});
					return this;
				},
				setBtnNowEnable: function(state){
					$(this.selector).dateTool({
						btn_now_enable: !!state
					});
					return this;
				}
			};
		},
		/**
		 * 初始化一个时间范围选择
		 * @param 
		 * @return 
		 */
		range: function(setting){
			setting.start;
			setting.end;
		}
	};
});

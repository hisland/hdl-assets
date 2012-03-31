/**
 * 
 */

define(['./calendar'], function(Calendar){
	return {
		init: function(setting){
			var calendar = new Calendar(setting);
			return calendar;
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

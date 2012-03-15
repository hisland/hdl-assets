/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	/**
	 * @class
	 * @memberOf ui.Calendar
	 */
	function Setting(setting){
		//固定字符串
		this.fixed = '';

		//每周从周一开始
		this.__week_start = 1;

		//是否禁用
		this.disabled = false;

		//时间偏移
		this.offset = 0;

		//时间范围
		this.min_time = null;
		this.max_time = null;
	}

	/**
	 * @lends ui.Calendar.Setting#
	 */
	S.augment(Setting, {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setFixed: function(){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setWeekStart: function(n){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setMinTime: function(date){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setMaxTime: function(date){
			
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		setDisabled: function(state){
			
		}
	});

	return Setting;
});
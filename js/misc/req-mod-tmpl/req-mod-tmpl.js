/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	/**
	 * @class
	 * @memberOf sf
	 */
	function Compare(){
		this.__init().__initEvent();
	}

	/**
	 * @lends sf.Compare#
	 */
	S.augment(Compare, {
		/**
		 * @return this
		 */
		__init: function(){
			return this;
		},
		/**
		 * @return this
		 */
		__initEvent: function(){
			return this;
		}
	});
});
/**
 * 
 */

define(['jquery', 'kissy', './setting', 'ui/popwin'], function($, S, Setting, P){
	/**
	 * @class
	 * @memberOf sf
	 */
	function Popwin(setting){
		this.__init(setting).__initEvent();
	}

	/**
	 * @lends sf.Popwin#
	 */
	S.augment(Popwin, {
		/**
		 * @return this
		 */
		__init: function(setting){
			var pop = P.init();
			S.mix(setting, Setting, false);
			pop.setTitle(setting.title);
			pop.setTitle(setting.title);
			pop.setTitle(setting.title);
			pop.setTitle(setting.title);
			pop.show().loading();

			$.post(setting.url, setting.param, function(rs){
				pop.$content.html(rs);
				setting.onCreate();
			});

			//pop.onHide(setting.onHide);

			this.pop = pop;
			return this;
		},
		/**
		 * @return this
		 */
		__initEvent: function(){
			return this;
		}
	});

	return Popwin;
});
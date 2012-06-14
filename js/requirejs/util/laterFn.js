define(['kissy'], function(S){
	var Proto = {
		setFn: function(fn){
			this.config.fn = fn;
		},
		setDelay: function(n){
			this.config.delay = n;
		},
		reCount: function(){
			var me = this;
			me.cancel();
			me.__timer = setTimeout(function(){
				me.config.fn && me.config.fn();
			}, me.config.delay);
		},
		cancel: function(){
			clearTimeout(this.__timer);
		}
	};
	return {
		init: function(config){
			S.mix(config, {
				fn: null,
				delay: 50
			}, false);

			var rs = function(){
				rs.reCount();
			}
			rs.config = config;
			S.mix(rs, Proto);
			return rs;
		}
	};
});
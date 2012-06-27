define(['jquery', 'kissy'], function($, S){
	var o = {
		load: function(url, param, fn){
			this.cancel();
			this.url = url;
			this.param = param;
			this.fn = fn;
			this.__makeTimer();
			return this;
		},
		cancel: function(){
			this.__timer && this.__timer.cancel();
			this.__req && this.__req.abort();
			return this;
		},
		__allOk: function(){
			this.fn(this.result);
			return this;
		},
		__makeTimer: function(){
			this.__timer = S.later(function(){
				this.__makeReq();
			}, this.config.delay, false, this);
			return this;
		},
		__makeReq: function(){
			this.__req = $.ajax({
				type: 'POST',
				url: this.url,
				data: this.param,
				context: this,
				success: function(rs){
					this.result = rs;
					this.__allOk();
				}
			});
			return this;
		}
	};
	return {
		init: function(config){
			config = S.mix(config || {}, {
				delay: 300
			}, false);

			return S.mix({
				config: config,
				__timer: null,
				__req: null
			}, o);
		}
	};
});
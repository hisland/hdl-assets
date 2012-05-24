define(['jquery', 'kissy'], function($, S){
	var o = {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		load: function(url, param, fn){
			var me = this;

			me.__timeOk = false;
			me.__reqOk = false;

			me.allOk = function(){
				if(me.__timeOk && me.__reqOk){
					fn && fn(me.result);
				}
			};

			//每次都需要重新计时
			if(me.__timer){
				me.__timer.cancel();
			}
			me.__timer = S.later(function(){
				me.__timer = null;
				me.__timeOk = true;
				me.allOk();
			}, me.delay);

			//保证最后一个请求
			if(me.__req){
				me.__req.abort();
			}
			me.__req = $.post(url, param, function(rs){
				me.__req = null;
				me.result = rs;
				me.__reqOk = true;
				me.allOk();
			});

			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		cancel: function(){
			
		}
	};
	return {
		init: function(config){
			S.mix(config, {
				delay: 300,
				result: false,
				__timeOk: false,
				__reqOk: false,
				__timer: null,
				__req: null
			});

			return S.merge(config, o);
		}
	};
});
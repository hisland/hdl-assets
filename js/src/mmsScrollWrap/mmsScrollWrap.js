(function($){
	function scroll(speed){
		var h = this.clientHeight, max = this.scrollHeight - h;

		if(this.scrollTop >= max){
			this.scrollTop = 0;
		}else{
			this.scrollTop += speed;
		}
	}
	function start(){
		var elm = this;
		this._scroll_timer = setInterval(function(){
			scroll.call(elm, elm._scroll_speed);
		}, elm._scroll_delay);
	}
	function stop(){
		clearInterval(this._scroll_timer);
	}

	$.fn.scrollInit = function(speed, delay){
		speed = speed - 0;
		delay = delay - 0;
		this.each(function(i, v){
			this._scroll_speed = (!speed || speed<1) ? 1 : speed;
			this._scroll_delay = (!delay || delay<50) ? 50 : delay;
		console.log(this._scroll_speed, this._scroll_delay);
			start.call(this);
		});
		this.hover(function(e){
			stop.call(this);
		}, function(e){
			if(!this._stop){
				start.call(this);
			}
		});
	}
	$.fn.scrollStart = function(){
		this.each(function(i, v){
			if(this._stop){
				start.call(this);
				this._stop = false;
			}
		});
	}
	$.fn.scrollStop = function(){
		this.each(function(i, v){
			stop.call(this);
			this._stop = true;
		});
	}
})(jQuery);
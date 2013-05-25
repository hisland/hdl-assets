define([], function() {
	function countDown(len, inc, fn) {
		var time = 0,
			count = 0,
			handle;

		function tick() {
			if (time < len) {
				fn(time, count);
				count++;
				time += inc;
				handle = setTimeout(tick, inc);
			}
		}
		tick();
		return {
			pause: function() {
			},
			resume: function() {
			},
			immediate: function(){
			},
			cancel: function() {
				clearTimeout(handle);
			}
		}
	}
	return countDown;
});

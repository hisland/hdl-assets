/**
 * 鼠标中键滚动
 */

define(['jquery'], function($){
	var types = ['DOMMouseScroll', 'mousewheel'];

	function handler(event) {
		var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
		
		if ( event.wheelDelta ) delta = event.wheelDelta/120;
		if ( event.detail     ) delta = -event.detail/3;
		
		event = $.event.fix(event || window.event);
		event.type = "mousewheel";
		
		// Add events and delta to the front of the arguments
		args.unshift(event, delta);

		return $.event.handle.apply(this, args);
	}

	$.event.special.mousewheel = {
		setup: function() {
			if ( this.addEventListener )
				for ( var i=types.length; i; )
					this.addEventListener( types[--i], handler, false );
			else
				this.onmousewheel = handler;
		},
		
		teardown: function() {
			if ( this.removeEventListener )
				for ( var i=types.length; i; )
					this.removeEventListener( types[--i], handler, false );
			else
				this.onmousewheel = null;
		}
	};

	$.fn.extend({
		mousewheel: function(fn) {
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
		},
		
		unmousewheel: function(fn) {
			return this.unbind("mousewheel", fn);
		}
	});
});

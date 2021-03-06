/**
 * @fileOverview
 * @author hisland hisland@qq.com
 * @description 描述
 * @see http://blog.moocss.com/code-snippets/mootools-code-snippets/773.html
 * @see http://littleroom.se/playground/outerClick/
 * <pre><code>
 * Usage:
 * 		$(selector).bind("outerClick", fn);   // Bind the function fn to the outerClick event on each of the matched elements.
 * 		$(selector).outerClick(fn);           // Bind the function fn to the outerClick event on each of the matched elements.
 * 		$(selector).trigger("outerClick");    // Trigger the outerClick event on each of the matched elements.
 * 		$(selector).outerClick();             // Trigger the outerClick event on each of the matched elements.
 * 		$(selector).unbind("outerClick", fn); // Unbind the function fn from the outerClick event on each of the matched elements.
 * 		$(selector).unbind("outerClick");     // Unbind all outerClick events from each of the matched elements.
 * </code></pre>
 */

KISSY.add('jquery.outerClick', function(S, undef) {
	var $ = jQuery,
		OUTER_CLICK = 'outerClick',
		elements = [];

	/**
	 * Check if the event should be fired.
	 * @param {Object} event  The click event.
	 * @private
	 */
	function check(event) {
		for (var i = 0, l = elements.length, target = event.target, el; i < l; i++) {
			el = elements[i];
			if (el !== target && !(el.contains ? el.contains(target) : el.compareDocumentPosition ? el.compareDocumentPosition(target) & 16 : 1)) {
				$.event.trigger(OUTER_CLICK, event, el);
			}
		}
	}

	$.event.special[OUTER_CLICK] = {
		setup: function () {
			var i = elements.length;
			if (!i) {
				$.event.add(document, 'click', check);
			}
			if ($.inArray(this, elements) < 0) {
				elements[i] = this;
			}
		},
		teardown: function () {
			var i = $.inArray(this, elements);
			if (i >= 0) {
				elements.splice(i, 1);
				if (!elements.length) {
					$.event.remove(document, 'click', check);
				}
			}
		}
	};

	/**
	 * Event helper outerClick
	 * <pre><code>
	 * Usage:
	 * 		$(selector).bind("outerClick", fn);   // Bind the function fn to the outerClick event on each of the matched elements.
	 * 		$(selector).outerClick(fn);           // Bind the function fn to the outerClick event on each of the matched elements.
	 * 		$(selector).trigger("outerClick");    // Trigger the outerClick event on each of the matched elements.
	 * 		$(selector).outerClick();             // Trigger the outerClick event on each of the matched elements.
	 * 		$(selector).unbind("outerClick", fn); // Unbind the function fn from the outerClick event on each of the matched elements.
	 * 		$(selector).unbind("outerClick");     // Unbind all outerClick events from each of the matched elements.
	 * </code></pre>
	 * 
	 * @param  {Function} [fn]  A function to bind to the outerClick event on each of the matched elements.
	 *                          If fn is omitted the event is triggered.
	 * @return {jQuery}         Returns the jQuery object.
	 * @memberOf jQuery#
	 * @name outerClick
	 * @see http://blog.moocss.com/code-snippets/mootools-code-snippets/773.html
	 * @see http://littleroom.se/playground/outerClick/
	 */
	$.fn[OUTER_CLICK] = function (fn) {
		return fn ? this.bind(OUTER_CLICK, fn) : this.trigger(OUTER_CLICK);
	};
}, {
	requires: ['jquery-1.4.2']
});

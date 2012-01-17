/**
 * @fileOverview
 * @module popTip
 * @author hisland hisland@qq.com
 * @description 弹出提示,带方向箭头
 * <pre><code>
 * API:
 *		var o = $.popTip();
 *		o.content 是弹出层的内容块
 *		o.div 是整个弹出层的外层
 *		o.manager 是弹出层管理对象
 * </code></pre>
 */

KISSY.add('popTip', function(S, undef) {
	var $ = jQuery, ie = /*@cc_on!@*/!1, PREFIX= ie ? 'popTip-' : 'popTip2-';

	function popTip(){
		//更改为构造方式
		if(!(this instanceof popTip)){
			return new popTip();
		}

		return this.__init();
	}

	S.augment(popTip, {
		__init: function(){
			var div;
			if(ie){
				div = $('<div class="popTip-wrap"><div class="popTip-h"><div class="popTip-h2"><div class="popTip-h3"></div></div></div><div class="popTip-c"></div><div class="popTip-b"><div class="popTip-b2"><div class="popTip-b3"></div></div></div><div class="popTip-arr-b"></div></div>');
			}else{
				div = $('<div class="popTip2-wrap"><div class="popTip2-c"></div><div class="popTip2-arr-b"></div></div>');
			}

			S.mix(this, {
				$div: div,
				$content: div.find('.popTip-c, .popTip2-c'),
				$arr: div.find('.popTip-arr-b, .popTip2-arr-b'),
				dir: 'up'
			});

			div.appendTo('body');

			return this;
		},
		setContent: function(content){
			this.$content.html(content);
			return this;
		},
		setDir: function(dir){
			if(dir === 'up'){
				this.$arr.attr('class', PREFIX + 'arr-t');
				this.dir = dir;
			}else if(dir === 'right'){
				this.$arr.attr('class', PREFIX + 'arr-r');
				this.dir = dir;
			}else if(dir === 'down'){
				this.$arr.attr('class', PREFIX + 'arr-d');
				this.dir = dir;
			}else if(dir === 'left'){
				this.$arr.attr('class', PREFIX + 'arr-l');
				this.dir = dir;
			}
			return this;
		},
		setTheme: function(theme){
			this.$div.addClass('theme-blue');
			return this;
		},
		adjustElement: function(target){
			var offset;
			if(this.dir === 'up'){
				offset = '0, 5';
			}else if(this.dir === 'right'){
				offset = '5, 0';
			}else if(this.dir === 'down'){
				offset = '0, -5';
			}else if(this.dir === 'left'){
				offset = '-5, 0';
			}

			this.setDir(this.dir);

			this.$div.adjustElement(target);
			return this.$div;
		}
	});

	$.popTip = popTip;
}, {
	requires: ['jquery-1.4.2', 'popManager', 'adjustElement']
});

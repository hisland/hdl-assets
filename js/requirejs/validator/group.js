/**
 * 
 */
define(['jquery', 'kissy', './base/group', 'ui/popup'], function($, S, Group, Popup){
	var pop = Popup.init();

	//标准浏览器鼠标穿透
	pop.$div.css('pointer-events', 'none');

	return {
		init: function(config){
			var group = new Group(config);

			function show(e){
				group.check(this.value);
				pop.align(this).show();
			}
			function hide(e){
				pop.hide();
			}
			function update(e, rs){
				pop.$content.empty();
				$(group.selector).toggleClass('valid-ipt-err', !rs);
				S.each(this.items, function(v, i, o){
					pop.$content.append($('<p class="valid-ok">' + S.substitute(v.msg, v) + '</p>').toggleClass('valid-err', !v.pass));
				});
			}

			group.onCheck(update);
			group.__input = function(e){
				e.data.check(this.value);
			};

			group.oldCheck = group.check;
			group.check = function(str){
				if(str === undefined){
					str = $(this.selector).val();
				}
				return this.oldCheck(str);
			};

			group.attach = function(selector){
				if(!this.attached){
					this.detach();
					this.attached = true;
					this.selector = selector || this.selector;
					$(this.selector).attr('autocomplete', 'off');
					$(this.selector).on('input', this, this.__input);
					$(this.selector).on('focus', show).on('blur', hide);
					$(this.selector).trigger('input');
				}
				return this;
			};
			group.detach = function(){
				if(this.attached){
					$(this.selector).attr('autocomplete', 'on');
					$(this.selector).off('input', this.__input);
					$(this.selector).off('focus', show).off('blur', hide);
					this.attached = false;
				}
				return this;
			};

			return group;
		}
	};
});

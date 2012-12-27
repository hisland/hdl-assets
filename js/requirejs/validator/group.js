define(['jquery', 'kissy', './base/group', 'ui/popup'], function($, S, Group, Popup){
	var pop = Popup.init();

	//标准浏览器鼠标穿透
	pop.$div.css('pointer-events', 'none');

	return {
		init: function(config){
			var group = new Group(config);

			function show(e){
				var bthis = this;
				group.check($(this).val());
				group.updatePop();
				setTimeout(function(){
					if(group.config && group.config.tipAlign === 'right'){
						pop.align(bthis, group.config.tipAlign, function(me){
							this.$div.css('top', '-=5');
						}).show();
					}else{
						pop.align(bthis).show();
					}
				},10);

			}
			function hide(e){
				pop.hide();
			}
			function update(e, rs){
				$(group.selector).toggleClass('valid-ipt-err', !rs);
			}

			group.onCheck(update);
			
			group.__input = function(e){
				e.data.check($(this).val());
				if(!e.isTrigger){
					e.data.updatePop();
				}
			};
			
			group.__clearDelayInput = function(e){
				clearInterval(group.__a);
			};
			group.__delayInput = function(e){
				var data = $(this);
				group.__clearDelayInput();
				group.__a = setInterval(function(){
					e.data.check(data.val());
					if(!e.isTrigger){
						e.data.updatePop();
					}
				},50);
			};
			
			group.updatePop = function(){
				pop.$content.empty();
				S.each(this.items, function(v, i, o){
					pop.$content.append($('<p class="valid-ok">' + S.substitute(v.msg, v) + '</p>').toggleClass('valid-err', !v.pass));
				});
			}

			group.oldCheck = group.check;
			group.check = function(str){
				if(!this.attached){
					return true;
				}
				if(str === undefined){
					str = $(this.selector).val();
				}
				return this.oldCheck(str);
			};

			group.attach = function(selector){
				this.detach();
				this.attached = true;
				this.selector = selector || this.selector;
				$(this.selector).attr('autocomplete', 'off');
				$(this.selector).on('input', this, this.__input);
				if($.browser.msie && !$(this.selector).is('textarea')){
					$(this.selector).on('focus', show).on('focus', this, this.__delayInput).on('blur', hide).on('blur', this ,this.__clearDelayInput);
				}else{
					$(this.selector).on('focus', show).on('blur', hide);
				}
				$(this.selector).trigger('input');
				return this;
			};
			group.detach = function(){
				if(this.attached){
					$(this.selector).attr('autocomplete', 'on');
					$(this.selector).off('input', this.__input);
					if($.browser.msie && !$(this.selector).is('textarea')){
						$(this.selector).off('focus', show).off('focus', this, this.__delayInput).off('blur', hide).off('blur', this ,this.__clearDelayInput);
					}else{
						$(this.selector).off('focus', show).off('blur', hide);
					}
					this.attached = false;
				}
				return this;
			};

			return group;
		}
	};
});

/**
 * 
 */

define(['jquery', 'kissy', 'ui/popup', 'css!./select'], function($, S, Popup){
	/**
	 * @class
	 */
	function Select(){
		this.__init().__initEvent();
	}

	/**
	 * @lends Select#
	 */
	S.augment(Select, {
		__init: function(){
			this.value = '';
			this.text = '';
			this.data = null;
			this.$div = $('<a class="ui-select" href="javascript:;"><span class="ui-select-text"></span></a>');
			this.$span = this.$div.find('span');
			this.popup = Popup.init().setSize(120, 50);
			return this;
		},
		__initEvent: function(){
			this.$div.on('click', this, function(e){
				if(!e.data.disabled){
					e.data.popup.align(this).show();
				}
			});

			this.$div.on('outerclick', this, function(eventFake, e){
				if(!S.inArray(eventFake.data.popup.$div[0], $(e.target).parents().andSelf().get())){
					eventFake.data.popup.hide();
				}
			});

			this.popup.$content.on('click', 'a', this, function(e){
				var val = $(this).attr('data-value');
				e.data.setValue(val);
				$(this).addClass('ui-selected').siblings().removeClass('ui-selected');
			});
			return this;
		},
		addOption: function(value, text){
			this.data.push({
				value: value,
				text: text
			});
			return this;
		},
		delOption: function(n){
			
			return this;
		},
		empty: function(){
			this.data = null;
			return this;
		},
		setData: function(data){
			this.data = data;
			var arr = [];
			S.each(data, function(v, i, o){
				arr.push('<a href="javascript:;" class="ui-select-item" data-value="', i, '" title="', v, '">', v, '</a>');
			});
			this.popup.setContent(arr.join(''));
			if(this.popup.$content.height() > 200){
				this.popup.setHeight(200);
			}else{
				this.popup.setHeight('auto');
			}
			return this;
		},
		setWidth: function(num){
			this.$div.width(num);
			this.$span.width(num);
			return this;
		},
		setValue: function(val){
			this.value = val;
			this.text = this.data[val];
			this.refresh();
			return this;
		},
		refresh: function(){
			this.$span.html(this.text);
			return this;
		},
		appendTo: function(target){
			this.$div.appendTo(target);
			return this;
		},
		toggleDisabled: function(state){
			this.disabled = state = S.isBoolean(state) ? state : !this.disabled;
			this.$div.toggleClass('ui-select-disabled', state);
			return this;
		},
		click: function(fn){
			this.$div.click(fn);
			return this;
		},
		itemClick: function(fn){
			this.popup.$div.on('click', 'a', fn);
			return this;
		},
		change: function(fn){
			fn ? this.$div.on('change', fn) : this.$div.trigger('change');
			return this;
		}
	});

	return Select;
});
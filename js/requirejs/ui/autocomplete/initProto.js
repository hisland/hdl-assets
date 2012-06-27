define(['jquery', 'kissy', 'util'], function($, S, Util){
	/**
	 * @lends ui.Popwin#
	 */
	var Proto = {
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		search: function(str){
			var me = this;
			me.str = str;

			var url = this.config.url;
			if(S.isFunction(url)){
				url = url();
			}

			var dt = this.config.data || {};
			if(S.isFunction(dt)){
				dt = dt();
			}
			if(S.isArray(dt)){
				dt = $.param(dt);
			}
			if(S.isString(dt)){
				dt = S.unparam(dt);
			}
			dt[this.config.varSearch] = str;
			dt[this.config.varPage] = me.data[this.config.varPage];
			dt[this.config.varPagePerNum] = me.data[this.config.varPagePerNum];

			this.delayReq.load(url, dt, function(rs){
				me.data = $.parseJSON(rs);

				me.config.preProcess && me.config.preProcess(me.data);

				me.refreshData();
			});
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		refreshData: function(){
			this.$content.html(S.map(this.data.rows, function(v, i, o){
				v = this.config.process ? this.config.process(v) : v;
				var text2 = S.map(v.split(this.str), function(v, i, o){
					return Util.entityHTML(v);
				}).join('<strong>' + Util.entityHTML(this.str) + '</strong>');
				return '<a class="autocomp-a" href="javascript:;" data-idx="' + i + '" title="' + Util.entityHTML(v) + '">' + text2 + '</a>';
			}, this).join(''));
			return this;
		},
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		attach: function(selector){
			this.detach();
			this.attached = true;
			this.selector = selector || this.selector;
			$(this.selector).on('input', this, this.__input);
			$(this.selector).on('focus', this, this.__focus);
			return this;
		},
		detach: function(){
			$(this.selector).off('input', this.__input);
			$(this.selector).off('focus', this, this.__focus);
			this.attached = false;
			return this;
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__input: function(e){
			e.data.search(this.value);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__focus: function(e){
			var ac = e.data,
				elm = this;
			ac.popup.align(elm).show();

			ac.popup.$div.on('outerclick', function(e, reale){
				if(reale.target !== elm){
					ac.popup.hide();
					ac.popup.$div.off('outerclick');
				}
			});

			e.data.search(this.value);
		}
	};

	return function(o){
		S.mix(o, Proto);
		return o;
	};
});
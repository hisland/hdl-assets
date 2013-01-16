define(['jquery', 'kissy', 'util', './msg'], function($, S, Util, MSG){
	/**
	 * @lends ui.Popwin#
	 */
	var temp_data = null, //所有的中转变量
		temp_string = "", 
		aDelay;
	
	var Proto = {
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		search: function(str){
			var me = this;
			me.str = str;

			me.$loading.show(); //显示加载
			
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

			me.$content.empty(); //每次查询前  清空content
			this.delayReq.load(url, dt, function(rs){
				try{
					me.$loading.hide(); //取消显示加载
					me.data = $.parseJSON(rs);
					me.config.preProcess && me.config.preProcess(me.data);

					me.refreshData();
					
					me.__setPages(me.data);
					
					/**
					 * 当条记录点击
					 */
					me.$content.off('click', 'a.autocomp-a');
					me.$content.on('click', 'a.autocomp-a', function(e){
						var idx = $(this).attr('data-idx');
						var	item = me.data.rows[idx];
						var	str = me.config.process ? me.config.process(item) : item;

						me.config.click && me.config.click(item);

						$(me.config.tempSelector).val(str);
						if(me.config.isInnerSearch){
							me.$input.val(str);
						}
						me.popup.hide();
						setTimeout(function(){
							me.isClick = true;
							me.str = str;
							me.refreshData();
						}, 10);
						
						me.config.isFocus = 0;
					});
				}catch(e){
					me.$tip.html(getText("0-0/0条"));
					me.$prev.css("visibility","hidden");
					me.$next.css("visibility","hidden");
					me.$content.html(rs);
				}

				
			});
			return this;
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		refreshData: function(){
			var allMatch;
			this.$content.html(S.map(this.data.rows, function(v, i, o){
				var tmp = v;
				v = this.config.process ? this.config.process(v, i) : v;
				if (!allMatch && v === this.str) {
					allMatch = tmp;
				}
				if(this.config.process && this.config.processNoMatch){
					return v;
				}else{
					var text2 = S.map(v.split(this.str), function(v, i, o){
						return Util.entityHTML(v);
					}).join('<strong>' + Util.entityHTML(this.str) + '</strong>');
					return '<a class="autocomp-a" href="javascript:;" data-idx="' + i + '" title="' + Util.entityHTML(v) + '">' + text2 + '</a>';
				}
			}, this).join(''));

			if (allMatch && this.isClick && this.config.isInnerSearch) { //匹配 并且执行的是点击操作
				this.config.click && this.config.click(allMatch);
			}else if(allMatch && !this.config.isInnerSearch){
				this.config.click && this.config.click(allMatch);
			}
			return this;
		},
		/**
		 * 设置文本
		 * @param str String
		 * @return this
		 */
		attach: function(selector){
			this.attached = true;
			this.selector = selector || this.selector;
			this.detach();
			
			if(this.config.isInnerSearch){ //有内部框
//				$(this.selector).attr("readonly",true);
				
				if($.browser.msie){
					this.$input.on('focus', this, this.__delayInput).on('blur', this, this.__clearDelayInput);
				}else{
					this.$input.on('input', this,  this.__input);
				}
				
				this.$clear.on('click', this, this.__clear); //清空
			}else{
				$(this.selector).on('input', this, this.__input);
			}
			
			this.$prev.on('click', this, this.__prevPage); //上一页
			this.$next.on('click', this, this.__nextPage); //下一页
			
			$(this.selector).addClass("ac");
			$(this.selector).on('focus', this, this.__focus);
			return this;
		},
		detach: function(){
			if(this.config.isInnerSearch){ //有内部框
//				$(this.selector).attr("readonly",false);
				
				if($.browser.msie){
					this.$input.off('focus', this.__delayInput).off('blur', this.__clearDelayInput);
				}else{
					this.$input.off('input', this.__input);
				}
				
				this.$clear.off('click', this.__clear);
			}else{
				$(this.selector).off('input', this.__input);
			}
			
			this.$prev.off('click', this.__prevPage); //上一页
			this.$next.off('click', this.__nextPage); //下一页
			
			$(this.selector).removeClass("ac");
			$(this.selector).off('focus', this.__focus);
			this.attached = false;
			return this;
		},
		/**
		 * 设置分页信息
		 */
		__setPages:function(data){
			if(data.currPage == data.allPage && data.allPage > 1){ //最后一页
				this.$prev.css("visibility","visible");
				this.$next.css("visibility","hidden");
			}else if(data.currPage == 1 && data.allPage > 1){ //第一页
				this.$prev.css("visibility","hidden");
				this.$next.css("visibility","visible");
			}else if(data.allPage <=1){ //只有一页或者没数据
				this.$prev.css("visibility","hidden");
				this.$next.css("visibility","hidden");
			}else{
				this.$prev.css("visibility","visible");
				this.$next.css("visibility","visible");
			}
			
			this.$tip.html(data.beginNum+"-"+data.endNum+"/"+data.totals+MSG.piece); //页数信息展示
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__input: function(e){
			var ap = temp_data;
			ap.data[ap.config.varPage] = 1;  //置为第一页
			ap.isClick = false;
			ap.search(this.value);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__delayInput: function(e){
			var di = temp_data;
			aDelay = setInterval(function(){
				if(di.$input.val() != temp_string){
					di.data[di.config.varPage] = 1;  //置为第一页
					di.isClick = false;
					di.search(di.$input.val());
					temp_string = di.$input.val();
				}
			},50);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__clearDelayInput: function(e){
			clearInterval(aDelay);
		},
		
		/**
		 * form的submit事件,阻止提交
		 */
		__clear: function(e){
			var o = temp_data;
			$(o.config.tempSelector).val("");
			o.config.clear && o.config.clear("");
			o.$input.val("");
			setTimeout(function(){
				o.search("");
			}, 10);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__prevPage: function(e){
			var o = temp_data;
			if(o.data.currPage > 1){
				o.data.currPage--;
			}
			var ap = e.data, str;
			if (ap.config.isInnerSearch) {
				str = ap.$input.val();
			} else {
				str = $(o.config.tempSelector).val();
			}
			o.search(str);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__nextPage: function(e){
			var o = temp_data;
			if(o.data.currPage < o.data.allPage){
				o.data.currPage++;
			}
			var ap = e.data, str;
			if (ap.config.isInnerSearch) {
				str = ap.$input.val();
			} else {
				str = $(o.config.tempSelector).val();
			}
			o.search(str);
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__focus: function(e){
			var ac = e.data,
				elm = this;
			
			temp_data = ac;
			
			if(ac.config.isInnerSearch){ //有内部框
				ac.$loading.css("top","20px");
				ac.$input.parent().show();
			}else{
				ac.$loading.css("top","0px");
				ac.$input.parent().hide();
			}
			
			if(ac.config.isInnerSearch){ //有内部框
				this.blur();
				
				if(!ac.config.focusClear){
					temp_string = $(elm).val(); //ie9使用的中间值
					ac.$input.val($(elm).val());
	
					setTimeout(function(){
						try{
							/********光标移至文本框最右边******/
							if (ac.$input[0].setSelectionRange) {
								ac.$input.focus();
								ac.$input[0].setSelectionRange(ac.$input.val().length, ac.$input.val().length);
								}
							else if (ac.$input[0].createTextRange) {
								var range = ac.$input[0].createTextRange();
								range.collapse(true);
								range.moveEnd('character', ac.$input.val().length);
								range.moveStart('character', ac.$input.val().length);
								range.select();
							}
						}catch(e){
							
						}
					},500);
				}else{
					ac.$input.focus();
				}
			}
			ac.config.tempSelector = $(elm);
			ac.config.isClick = false;
			ac.data[ac.config.varPage] = 1;  //置为第一页
			ac.popup.align(elm).show();

			if(ac.config.focusClear){
				temp_string="";
				ac.$input.val("");
				ac.search("");
			}else{
				ac.search($(elm).val());
			}
			
			ac.popup.$div.on('outerclick', function(e, reale){
				if(reale.target !== elm && !$(reale.target).hasClass("ac")){
					ac.popup.hide();
					ac.popup.$div.off('outerclick');
				}
			});
		},
		/**
		 * form的submit事件,阻止提交
		 */
		__keyPress: function(e){
			if(e.keyCode == 38){//向上滚动
			}else if(e.keyCode == 40){//向下滚动
			}else if(e.keyCode == 13){//回车键
			}
		}
	};

	return function(o){
		S.mix(o, Proto);
		return o;
	};
});
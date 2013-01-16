define(['jquery', 'kissy', 'jquery-plugin', 'css!./tree'], function($, S){
	//各元素对应的标签
	var arrow = '<em class="arrow"></em>',
		arrow_open = '<em class="arrow arrow-open"></em>',
		arrow_end = '<em class="arrow-end"></em>',
		arrow_open_end = '<em class="arrow-end arrow-open-end"></em>',

		loading = '<small class="loading"></small>',
		leaf = '<small class="leaf"></small>',
		branch = '<small class="branch"></small>',
		branch_open = '<small class="branch branch-open"></small>',

		checked = '<strong class="checked"></strong>',
		partial = '<strong class="partial"></strong>',
		unchecked = '<strong class="unchecked"></strong>',

		blank = '<b class="blank"></b>',
		line = '<b class="line"></b>',
		line_elbow = '<b class="line-elbow"></b>',
		line_elbow_end = '<b class="line-elbow-end"></b>';

	/**
	 * 树控件
	 * @class
	 * @memberOf ui
	 */
	function Tree(setting){
		this.__init(setting).__initEvnet();
	}

	/**
	 * @lends ui.Tree#
	 */
	S.augment(Tree, {
		/**
		 * 初始化树
		 * @private
		 * @return this
		 */
		__init: function(setting){
			this.var_children = 'children';
			this.edit_able = true;
			this.opened = true;

			this.__indent = '0';
			this.__path = S.guid('hdltree');
			this.__end = true;
			this.__parent = this;

			this.$div = $('<div class="hdl-tree"><span class="hdl-tree-help"></span><div class="hdl-tree-title"></div><div class="hdl-tree-wrap"></div></div>');
			this.$help = this.$div.children(':first');
			this.$title = this.$help.next();
			this.$wrap = this.$title.next();
			this.$wrap.attr('id', this.__path);

			return this;
		},
		/**
		 * 初始化事件代理
		 * @private
		 * @return this
		 */
		__initEvnet: function(){
			//checkbox点击代理
			this.$wrap.on('click', 'strong', this, function(e){
				var tree = e.data,
					div = $(this).parent('div'),
					node = tree.getNode(div.attr('id'));
				
				if(tree.edit_able){
					tree.toggleCheckbox(node);
				}
			});

			//arrow点击代理
			this.$wrap.on('click', 'em', this, function(e){
				var tree = e.data,
					div = $(this).parent('div'),
					node = tree.getNode(div.attr('id'));

				//按住ctrl可折叠/展开所有
				if(e.ctrlKey){
					tree.toggleOpenAll(node);
				}else{
					tree.toggleOpen(node);
				}
			});

			//按住alt双击可全部折叠/展开
			this.$wrap.on('dblclick', this, function(e){
				if(e.altKey){
					e.data.toggleOpenAll();
				}
			});

			//按住alt双击可全部折叠/展开
			this.$help.mouseTip('alt+双击树: 折叠/展开全部<br />ctrl+箭头: 折叠/展开下级');

			return this;
		},
		/**
		 * 遍历下级节点,含当前节点
		 * @param node Object|undefined
		 * @param func Function(node)
				this -> tree
				node -> node
		 * @return this
		 */
		walkDescendants: function(node, func){
			var rs;

			//修正参数
			if(S.isFunction(node)){
				func = node;
				node = this;
			}

			rs = func.call(this, node);
			if(node[this.var_children]){
				for(var i = 0, child = node[this.var_children][i]; rs !== false && child; ){
					if(child[this.var_children]){
						this.walkDescendants(child, func);
					}else{
						rs = func.call(this, child);
					}
					child = node[this.var_children][++i];
				}
			}
			return this;
		},
		/**
		 * 遍历上级节点,不含当前节点
		 * @param node Object|undefined
		 * @param func Function(parent)
				this -> tree
				parent -> parent
		 * @return this
		 */
		walkAncestors: function(node, func){
			var parent = node.__parent, rs = true;
			while(rs !== false && parent !== this){
				rs = func.call(this, parent);
				node = parent;
				parent = node.__parent;
			}
			return this;
		},
		/**
		 * 根据path(实际是div的id属性)获得指定js对象
		 * @param path String
		 * @return Object
		 */
		getNode: function(path){
			var node = this, i = 0;
			path = path.split('-');
			path.shift();
			for(; i<path.length; i++){
				node = node[this.var_children][path[i]];
			}
			return node;
		},
		/**
		 * 根据node/path获得指定的DIV
		 * @param path Node|String
		 * @return DOM
		 */
		getDOM: function(path){
			if(S.isObject(path)){
				path = path.__path;
			}
			return document.getElementById(path);
		},
		/**
		 * 不传node直接设置数据
		 * 传node在node下级设置数据
		 * @param data Array
		 * @param node Node
		 * @return this
		 */
		setData: function(data, node){
			//修正参数
			if(!node){
				node = this;
			}
			if(S.isArray(data)){
				node[this.var_children] = data;
			}

			var arr = [];
			this.makeUl(arr, node);

			if(node === this){
				this.$wrap.html(arr.join(''));
			}else{
				this.$wrap.find('#' + node.__path).after(arr.join(''));
			}
			return this;
		},
		/**
		 * 设置主题
		 * @return this
		 */
		setTheme: function(theme){
			if(S.isString(theme)){
				this.$wrap.attr('class', 'hdl-tree-wrap tree-' + theme);
			}
			return this;
		},
		/**
		 * 设置树的checkbox的选中状态
		 * @return this
		 */
		setValue: function(value){
			value = S.isArray(value) ? value : S.isString(value) ? value.split(/[, -]+/) : null;
			//转换成map避免多次使用inArray方法
			var map = {};
			S.each(value, function(v, i, o){
				map[v] = 1;
			});
			var key = this.var_name;
			this.walkDescendants(this, function(node){
				//需要选中
				if(map[node[key]]){
					this.toggleCheckbox(node, true);
				}else{
					this.toggleCheckbox(node, false);
				}
			});
			return this;
		},
		/**
		 * 切换节点的展开与否
		 * @return this
		 */
		toggleOpen: function(node, state, div, em){
			if(!node){
				node = this;
			}

			node.opened = S.isBoolean(state) ? state : !node.opened;
			div = $(this.getDOM(node));
			em = div.find('em');

			if(node.__is_end){
				em.toggleClass('arrow-open-end', node.opened);
			}else{
				em.toggleClass('arrow-open', node.opened);
			}

			em.next().toggleClass('branch-open', node.opened);
			div.next().toggle(node.opened);
			return this;
		},
		/**
		 * 切换节点的展开与否, 递归所有下级节点
		 * 不传node直接折叠整个树
		 * 不传state为切换展开折叠状态
		 * @return this
		 */
		toggleOpenAll: function(node, state){
			if(!node){
				node = this;
			}

			state = node.opened = S.isBoolean(state) ? state : !node.opened;

			this.walkDescendants(node, function(node){
				if(node[this.var_children]){
					this.toggleOpen(node, state);
				}
			});
			return this;
		},
		/**
		 * 设置当前节点选中状态,并遍历上下级节点
		 * @return this
		 */
		toggleCheckbox: function(node, checked){
			var i, chks, parent = node.__parent, has_partial = false;

			checked = S.isBoolean(checked) ? checked : !node.checked;

			if(checked){
				//状态已正确直接返回,提高速度
				if (node.checked) {
					return this;
				}

				parent.__checked_len++;

				//修正下级DOM节点状态,使用原生对象提高速度
				chks = document.getElementById(node.__path).parentNode.getElementsByTagName('strong');
				for (i = 0; i < chks.length; i++) {
					chks[i].className = 'checked';
				}

				//修正下级JS对象状态
				this.walkDescendants(node, function(node){
					node.__partial = false;
					node.checked = true;
					if(node[this.var_children]){
						node.__checked_len = node[this.var_children].length;
					}
				});

				//修正上级状态
				while(parent !== this){
					if(parent.__checked_len === parent.children.length){
						parent.__partial = false;
						parent.checked = true;
						parent.__parent.__checked_len++;
						document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'checked';
					}else{
						if(parent.__partial){
							break;
						}
						parent.__partial = true;
						parent.checked = false;
						document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'partial';
					}
					parent = parent.__parent;
				}
			}else{
				//状态已正确直接返回,提高速度
				if (!node.checked) {
					return this;
				}

				parent.__checked_len--;

				//修正下级DOM节点状态,使用原生对象提高速度
				chks = document.getElementById(node.__path).parentNode.getElementsByTagName('strong');
				for (i = 0; i < chks.length; i++) {
					chks[i].className = 'unchecked';
				}

				//修正下级JS对象状态
				this.walkDescendants(node, function(node){
					node.__partial = false;
					node.checked = false;
					if(node[this.var_children]){
						node.__checked_len = 0;
					}
				});

				//修正上级节点状态
				while(parent !== this){
					//如果自己是选中的,因为是取消选择,所以父节点肯定要-1
					if(parent.checked){
						parent.checked = false;
						parent.__parent.__checked_len--;
					}

					//下面每个步骤都有提前退出,提高速度
					//已选节点为0,需要做更多处理
					if(parent.__checked_len === 0){
						//检测子节点是否还有partial状态的,并修改标记
						for(i=0; i<parent.children.length; i++){
							if(parent.children[i].__partial){
								has_partial = true;
								break;
							}
						}
						if(has_partial){
							if(parent.__partial){
								break;
							}
							parent.__partial = true;
							document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'partial';
						}else{
							if(!parent.__partial && !parent.checked){
								break;
							}
							parent.__partial = false;
							parent.checked = false;
							document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'unchecked';
						}
					}else{
						if(parent.__partial){
							break;
						}
						parent.__partial = true;
						parent.checked = false;
						document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'partial';
					}

					parent = parent.__parent;
				}
			}
			return this;
		},
		/**
		 * 切换可否编辑
		 * @return this
		 */
		toggleEditAble: function(state){
			this.edit_able = S.isBoolean(state) ? state : !this.edit_able;
			return this;
		},
		/**
		 * 切换icon的显示与否
		 * @return this
		 */
		toggleUseIcon: function(state){
			this.use_icon = S.isBoolean(state) ? state : !this.use_icon;
			if(this.use_icon){
				this.$wrap.removeClass('no-icon');
			}else{
				this.$wrap.addClass('no-icon');
			}
			return this;
		},
		/**
		 * 切换checkbox的显示与否
		 * @return this
		 */
		toggleUseCheckbox: function(state){
			this.use_checkbox = S.isBoolean(state) ? state : !this.use_checkbox;
			if(this.use_checkbox){
				this.$wrap.removeClass('no-checkbox');
			}else{
				this.$wrap.addClass('no-checkbox');
			}
			return this;
		},
		/**
		 * 切换node的显示与否
		 * @return this
		 */
		toggleHide: function(node, state){
			if(!node || node == this){
				return null;
			}

			node.hide = S.isBoolean(state) ? state : !node.hide;
			if(node.hide){
				$('#' + node.path).parent().hide();
			}else{
				$('#' + node.path).parent().show();
			}
			return this;
		},
		/**
		 * 将树挂到指定位置
		 * @return this
		 */
		appendTo: function(target){
			this.$div.appendTo(target);
			return this;
		},
		/**
		 * 递归生成ul及下级
		 * @param arr Array
		 * @param parent Node
		 * @return this
		 */
		makeUl: function(arr, parent){
			var child, i = 0, len = parent[this.var_children].length;
			if(len){
				arr.push('<ul>');
				for(; i<len; i++){
					child = parent[this.var_children][i];
					child.__parent = parent;

					child.__path = parent.__path + '-' + i;
					child.__indent = parent.__indent + (parent.__is_end ? '-0' : '-1');
					child.__is_end = i == len-1;
					this.makeLi(arr, child, parent);
				}
				arr.push('</ul>');
			}
			return this;
		},
		/**
		 * 递归生成li及下级
		 * @param arr Array
		 * @param child Node
		 * @param parent Node
		 * @return this
		 */
		makeLi: function(arr, child, parent){
			arr.push('<li>');
			arr.push('<div id="', child.__path, '">');
			this.makeIndent(arr, child.__indent);

			//有子节点使用arrow
			if(child[this.var_children]){
				child.__checked_len = 0;
				//打开
				if(!this.lazy || child.opened === true){
					child.opened = true;
					arr.push(child.__is_end ? arrow_open_end : arrow_open);
					arr.push(branch_open);
				}
				//关闭
				else{
					child.opened = false;
					arr.push(child.__is_end ? arrow_end : arrow);
					arr.push(branch);
				}
			}
			//无子节点使用line
			else{
				arr.push(child.__is_end ? line_elbow_end : line_elbow);
				arr.push(leaf);
			}

			//checkbox状态
			if(child.checked){
				parent.__checked_len++;
				arr.push(checked);
			}else{
				arr.push(unchecked);
			}

			//如果当前节点需要特殊处理使用其自定义函数
			if(S.isFunction(child.process)){
				arr.push('<span class="text">', child.process(), '</span>');
			}else{
				arr.push('<span class="text">', child.text, '</span>');
			}

			arr.push('</div>');

			//是否立即添加子节点
			if(child[this.var_children]){
				if(!this.lazy || child.opened === true){
					this.makeUl(arr, child);
					child.__complete = true;
				}else{
					child.__complete = false;
				}
			}
			arr.push('</li>');
			return this;
		},
		/**
		 * 生成缩进
		 * @param arr Array
		 * @param indent String
		 * @return this
		 */
		makeIndent: function(arr, indent){
			//下面2句不可以用substr(4)代替,因为空字符串split会得到[''],而不是空数组
			indent = indent.substr(2).split('-');
			indent.shift();
			var i = 0, len = indent.length;
			if(len){
				arr.push('<span class="indent">');
				for(; i<len; i++){
					arr.push(indent[i] === '1' ? line : blank);
				}
				arr.push('</span>');
			}
			return this;
		},
		/**
		 * 重置树
		 * @return this
		 */
		reset: function(){
			
		},
		/**
		 * 设置树的title
		 * @param 
		 * @return 
		 */
		setTitle: function(str){
			this.$title.html(str);
			return this;
		}
	});

	return Tree;
});

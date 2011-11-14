/**********************************************************************************************
 * 名称: 树控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2011-07-19 17:27:28
 * 版本: v1
 *
 * API:
 *
tree:{
	use_checkbox: true,			//是否使用checkbox
	use_icon: true,				//是否使用icon图标
	edit_able: true,			//是否可以修改状态
	lazy: false,				//是否懒加载
	theme: 'line',				//使用的图标主题'pnm', line', 'blue', 'gray' 自动加上'theme-'前缀,可在样式里按照相应格式增加更多的
	complete: false,			//子节点是否加载完成
	uid: '',					//唯一id

	ajax: {					//异步加载配置
			 async: false
			,url: ''
			,datatype: 'json'
			,method: 'POST'
		},

	var_children: 'children',	//子节点对应的key,默认是children
	var_text: 'text',			//显示文本对应的key,默认是text
	var_value: 'value',			//name的值对应的key,默认是value
	var_name: 'name',			//对应的name对应的key,默认是name

	itemMaker: null,			//生成节点的回调

	//事件列表:
	arrowClick: null,
	iconClick: null,
	checkboxClick: null,
	nodeClick: null,
	itemMaker: null,

	//后期加入:
	__last_selected:'jqdom'	//上次选中的行
	}
branch:{
	children: [],			//子节点列表 也用于确定是branch还是leaf
	opened: false,			//是否打开
	checked: true,			//是否选中
	hide: false,				//是否隐藏

	//后期加入:
	__checked_len: 0,			//已选中节点数
	__complete: true,			//是否加载完毕 true|false
	__state: 0,					//当前显示状态 0不选, 1半选, 2选中
	__indent: '0-1-0',			//缩进字符串, 0表示无线, 1表示有线
	__path: 'hdltree1-0-3',		//对应的节点path
	__end: true,				//是否为当前层级的结尾 true|false indent需要
	__parent: node,				//上级节点
	__top: tree,				//指向树
	}
leaf:{
	checked: true,			//是否选中
	hide: false,				//是否隐藏

	//后期加入:
	__indent: '0-1-0',		//缩进字符串, 0表示blank, 1表示line
	__path: 'hdltree1-0-3',	//对应的节点path
	__parent: node,			//上级节点
	__top: tree,			//指向树
}

使用下列不同的标签, 遍历效率加快:
	span:	text|indent
	strong:	checkbox
	small:	icon
	em:		arrow
	b:		blank|line

TODO:
	+下级 -下级 - 当前和所有下级 - 双击箭头(文字)触发
	+所有 -所有 - 全部 - 双击空白区域触发
	箭头代表的是当前级别
	2011-5-24 17:43:29:
		上面的使用右键菜单?
		$('').hdlTree() 取配置
		$('').hdlTree(setting) 初始化/修改配置
	2011-06-13 10:50:53:
		单个节点禁用
		隐藏的不进行上下级关联显示计数
	2011-07-25 09:45:55:
		walk提供返回值,false表示停止遍历
	2011-07-26 10:41:25:
		walk会遍历hide的item,请检查hide属性并根据需要排除
		反选功能
		蹦床功能,避免递归溢出
	2011-11-14 14:45:42:
		默认只提供展开折叠的toggle按钮,另外一个小箭头展开折叠当前层级等各种展开需求
*/

KISSY.add('hdlTree', function(S, undef) {
	var $ = jQuery,
		$EMPTY = $('');

	//各元素对应的标签
	var tag_arrow = '<em class="arrow"></em>',
		tag_arrow_end = '<em class="arrow-end"></em>',
		tag_arrow_open = '<em class="arrow-open"></em>',
		tag_arrow_end_open = '<em class="arrow-end-open"></em>',

		tag_loading = '<small class="loading"></small>',
		tag_leaf = '<small class="leaf"></small>',
		tag_branch = '<small class="branch"></small>',
		tag_branch_open = '<small class="branch-open"></small>',

		tag_checked = '<strong class="checked"></strong>',
		tag_partial = '<strong class="partial"></strong>',
		tag_unchecked = '<strong class="unchecked"></strong>',

		tag_blank = '<b class="blank"></b>',
		tag_line = '<b class="line"></b>',
		tag_line_elbow = '<b class="line-elbow"></b>',
		tag_line_elbow_end = '<b class="line-elbow-end"></b>';

	function Tree(setting){
		//更改为构造方式
		if(!(this instanceof Tree)){
			return new Tree(setting);
		}

		this.uid = S.guid('hdltree');
		this.__last_selected = $EMPTY;
	}

	//设置原型方法
	S.augment(Tree, {
		 init: function(data, setting){//初始化树
			setting = setting || {};
			$.extend(this, {
				 use_checkbox: true			//是否使用checkbox
				,use_icon: true				//是否使用icon图标
				,edit_able: true			//是否可以修改状态
				,lazy: false					//是否懒加载
				,theme: 'line'		//使用的图标主题'pnm', line', 'blue', 'gray' 自动加上'theme-'前缀,可在样式里按照相应格式增加更多的
				,ajax: {					//异步加载配置
						 async: false
						,url: ''
						,datatype: 'json'
						,method: 'POST'
					}
				,complete: false			//子节点是否加载完成
				,name: '对应的name'
			}, setting);

			if(data){
				this.children = data;
				this.__indent = '0';
				this.__path = this.uid;
				this.__end = true;
				this.__parent = this;
				this.buildTree();
			}
		},
		buildTree: function(){
			var html = [];
			html.push('<div class="hdl-tree', (this.theme ? ' theme-'+this.theme : ''), '" id="', this.__path, '">');
			html.push(this.buildHTML(this));
			html.push('</div>');
			this.dom.html(html.join(''));
		},
		buildHTML: function(data){
			var html = [];
			this.makeUl(html, data);
			return html.join('');
		},
		makeUl: function(html, parent){
			var child, i = 0, len = parent.children.length;
			if(len){
				html.push('<ul>');
				for(; i<len; i++){
					child = parent.children[i];
					child.__parent = parent;
					child.__top = this;

					child.__path = parent.__path + '-' + i;
					child.__indent = parent.__indent + (parent.__end ? '-0' : '-1');
					child.__end = i == len-1;
					this.makeLi(html, child);
				}
				html.push('</ul>');
			}
			return this;
		},
		makeLi: function(html, child){
			var parent = child.__parent;
			html.push('<li>');
			html.push('<div id="', child.__path, '">');
			this.makeIndent(html, child.__indent);

			//arrow 状态
			if(child.children){
				child.checked_len = 0;
				if(!this.lazy || child.opened == true){
					html.push(child.__end ? tag_arrow_end_open : tag_arrow_open);
				}else{
					child.opened == false;
					html.push(child.__end ? tag_arrow_end : tag_arrow);
				}
				html.push(tag_branch);
			}else{
				html.push(child.__end ? tag_line_elbow_end : tag_line_elbow);
				html.push(tag_leaf);
			}

			//__state 状态
			if(child.checked){
				parent.checked_len++;
				parent.__state = 1;
				child.__state = 2;
			}else{
				child.__state = 0;
			}

			//checkbox 状态
			if(child.__state == 2){
				html.push(tag_checked);
			}else{
				html.push(tag_unchecked);
			}

			html.push('<span class="text">', child.text, '</span>');
			html.push('</div>');

			//是否立即添加子节点
			if(child.children){
				if(!this.lazy || child.opened){
					this.makeUl(html, child);
					child.__complete = true;
				}else{
					child.__complete = false;
				}
			}
			html.push('</li>');
			return this;
		},
		makeIndent: function(html, indent){
			indent = indent.substr(2).split('-');
			indent.shift();
			var i = 0, len = indent.length;
			if(len){
				html.push('<span class="indent">');
				for(; i<len; i++){
					html.push(indent[i] == '1' ? tag_line : tag_blank);
				}
				html.push('</span>');
			}
			return this;
		},

		//遍历下级节点,包括当前节点
		walkDescendants: function(node, func){
			func.call(this, node);
			if(node.children){
				for(var i = 0, item = node.children[i]; item;){
					this.walkDescendants(item, func);
					item = node.children[++i];
				}
			}
			return this;
		},

		//遍历上级节点
		walkAncestors: function(node, func){
			var parent = node.__parent;
			while(parent != this){
				func.call(this, node, parent);
				node = parent;
				parent = node.__parent;
			}
			return this;
		},

		//设置当前节点选中状态,并遍历上下级节点
		checkNode: function(node, checked){
			var i, chks, parent = node.__parent, state0 = true;
			if(checked){
				if (node.checked) {
					return this;
				}
				parent.checked_len++;
				//修正下级节点状态
				chks = document.getElementById(node.__path).parentNode.getElementsByTagName('strong');
				for (i = 0; i < chks.length; i++) {
					if (chks[i].className != 'checked') {
						chks[i].className = 'checked';
					}
				}
				this.walkDescendants(node, function(node){
					node.__state = 2;
					node.checked = true;
					if(node.children){
						node.checked_len = node.children.length;
					}
				});
				//修正上级节点状态
				while(parent != this){
					if(parent.checked_len == parent.children.length){
						parent.__state = 2;
						parent.checked = true;
						parent.__parent.checked_len++;
						document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'checked';
					}else{
						if(parent.__state == 1){
							break;
						}
						parent.__state = 1;
						parent.checked = false;
						document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'partial';
					}
					parent = parent.__parent;
				}
			}else{
				if (!node.checked) {
					return this;
				}
				parent.checked_len--;
				//修正下级节点状态
				chks = document.getElementById(node.__path).parentNode.getElementsByTagName('strong');
				for (i = 0; i < chks.length; i++) {
					if (chks[i].className != 'unchecked') {
						chks[i].className = 'unchecked';
					}
				}
				this.walkDescendants(node, function(node){
					node.__state = 0;
					node.checked = false;
					if(node.children){
						node.checked_len = 0;
					}
				});
				//修正上级节点状态
				while(parent != this){
					if(parent.__state == 2){
						parent.__parent.checked_len--;
					}
					if(parent.checked_len > 0){
						if(parent.__state == 1){
							break;
						}
						parent.__state = 1;
						parent.checked = false;
						document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'partial';
					}else{
						if(state0){
							for(i=0;i<parent.children.length;i++){
								if(parent.children[i].__state > 0){
									state0 = false;
									break;
								}
							}
						}
						if(state0){
							if(parent.__state == 0){
								break;
							}
							parent.__state = 0;
							parent.checked = false;
							document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'unchecked';
						}else{
							if(parent.__state == 1){
								break;
							}
							parent.__state = 1;
							parent.checked = false;
							document.getElementById(parent.__path).getElementsByTagName('strong')[0].className = 'partial';
						}
					}
					parent = parent.__parent;
				}
			}
			return this;
		},

		//根据path获得指定js对象
		getNode: function(path){
			var elm, i = 1;
			path = path.split('-');
			path.shift();
			elm = this.children[path[0]];
			for(;i<path.length;i++){
				elm = elm.children[path[i]];
			}
			return elm;
		},

		//根据node/path获得指定DOM节点
		getDom: function(path){
			if(S.isObject(path)){
				path = path.__path;
			}
			return $('#'+path);
		},

		//设置数据
		addData: function(data, node){
			if(!node){
				node = this;
			}
			if(S.isArray(data)){
				node[this.var_children] = data;
			}else if(S.isObject(data)){
				
			}
		},

		//设置显示风格样式
		setTheme: function(theme){
			if(S.isString(theme)){
				var reg = /theme-[^ ]+/;
				this.getDom(this).attr('class', function(i, attr){
					if(attr.match(reg)){
						return attr.replace(reg, 'theme-'+theme);
					}else{
						return attr + ' theme-'+theme;
					}
				});
			}
		},

		//重新设置树的值, value为值数组或者使用[, -]分隔的字符串
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
					this.checkNode(node, true);
				}else{
					this.checkNode(node, false);
				}
			});
		},

		//树的新值与旧值合并, value为值数组或者使用[, -]分隔的字符串
		mergeValue: function(value){
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
					this.checkNode(node, true);
				}
			});
		},

		//切换icon的显示与否状态
		toggleIcon: function(state){
			//不传state为反转状态
			state = S.isUndefined(state) ? !this.use_icon : state;
			if(state){
				this.use_icon = true;
				$(this.selector).removeClass('no-icon');
			}else{
				this.use_icon = false;
				$(this.selector).addClass('no-icon');
			}
		},

		//切换checkbox的显示与否状态
		toggleCheckbox: function(state){
			//不传state为反转状态
			state = S.isUndefined(state) ? !this.use_checkbox : state;
			if(state){
				this.use_checkbox = true;
				$(this.selector).removeClass('no-checkbox');
			}else{
				this.use_checkbox = false;
				$(this.selector).addClass('no-checkbox');
			}
		},

		//切换item的显示与否状态
		toggleHide: function(node, state){
			if(!node || node == this){
				return this;
			}
			//不传state为反转状态
			state = S.isUndefined(state) ? !node.hide : state;
			if(state){
				node.hide = true;
				$(node.path).hide();
			}else{
				node.hide = false;
				$(node.path).show();
			}
		},

		//获取选中的json表示
		getJSON: function(){
			var  name = this.name
				,arr = [];
			this.walkDescendants(this, function(node){
				name = this.name || name;
				if(!node.children && node.checked){
					arr.push({
						name: name,
						value: node.value
					});
				}
			});
			return arr;
		},

		//获取选中的input:hidden字符串
		getHiddens: function(){
			var  name = this.name
				,arr = [];
			this.walkDescendants(this, function(node){
				name = this.name || name;
				if(!node.children && node.checked){
					arr.push('<input type="hidden" name="', name, '" value="', node.value, '" />');
				}
			});
			return arr.join('');
		}
	});

	//树上的点击事件
	function treeClick(e){
		var target = $(e.target),
			id = target.closest('div').attr('id'),
			css_class = target.attr('class'),
			tree = $(this).hdlTree(),
			node = tree.getNode(id);

		//点击checkbox
		if(target.is('strong')){
			//可点时做下面操作
			if(tree.edit_able){
				if(node.__state < 2){
					tree.checkNode(node, true);
				}else{
					tree.checkNode(node, false);
				}
			}
		}

		//点击箭头
		else if(target.is('em')){
			toggleCollapse.call(target, node, css_class);
		}
		//点击branch|leaf
		}else if(/branch|leaf|loading/.test(css_class)){
			target = target.closest('div');
		//点击空白
		}else if(/blank|line/.test(css_class)){
			target = target.closest('div');
		//点击文字
		}else if(/text/.test(css_class)){
			target = target.closest('div');
		}
		else{
			target = target.closest('div');
		}

		//点击div
		if(target.is('div')){
			tree.__last_selected.removeClass('selected');
			tree.__last_selected = target.addClass('selected');
		}
	}

	//树双击
	function treeDblClick(e){
		var target = $(e.target),
			id = target.closest('div').attr('id'),
			css_class = target.attr('class'),
			tree = $(this).hdlTree(),
			node = tree.getNode(id);

		//展开/收缩全部
		if(target.is('b')){
			
		}

		//展开/收缩当层及下级
		else if(target.is('em')){
			
		}
	}

	//修改target的展开与折叠
	function toggleCollapse(node, css_class){
		if(/open$/.test(css_class)){
			this.closest('div').next().addClass('close');
			this.attr('class', css_class.replace('-open', ''));
		}else{
			if(!node.__complete){
				$('#'+node.__path).after(node.__top.buildHTML(node));
				node.__complete = true;
			}else{
				this.closest('div').next().removeClass('close');
			}
			this.attr('class', css_class+'-open');
		}
	}

	function hdlTree(setting){
		//无参表示读取树设置
		if(!arguments.length){
			return this.attr('--hdl-tree');
		}

		return this.each(function(i, v){
			//初始化
			if(!this.attr('--hdl-tree')){
				//初始化树
				var tree = Tree();
				this.attr('--hdl-tree', tree);

				//使用selector避免引用dom
				if(!this.id){
					this.id = tree.uid;
				}
				tree.selector = '#' + this.id;

				//初始化树
				tree.init(data, setting);

				//设置事件
				$(this).click(treeClick);
			}

			//修改配置
			else{
				S.mix(this.tree, setting);
			}
		});
	}

	$.fn.extend({
		 hdlTree: hdlTree
	});
}, {
	requires: ['jquery-1.4.2']
});
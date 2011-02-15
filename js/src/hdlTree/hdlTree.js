/**********************************************************************************************
 * 树控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: 2010-9-8 14:24:27
 * 版本: v1
 *
 * 前置脚本:
 *			../patch.javascript.js;
 *			../jquery-1.4.2.min.js
 */
(function($){
/**********************************************************************************************
*已经有了此函数则不用重复注册了
*/
	if($.fn.hdlTree){
		return false;
	}

/**********************************************************************************************
*代码正文
*/
	var  global_tree = window.hdl_tree = []
		,ie6Hover;
	
/*
tree:{
	 use_checkbox: true			//是否使用checkbox
	,use_icon: true				//是否使用icon图标
	,edit_able: true			//是否可以修改状态
	,lazy: false				//是否懒加载
	,theme: 'theme-line'		//使用的图标主题'theme-pnm', 'theme-line', 'theme-blue', 'theme-gray' 可在样式里按照相应格式增加更多的
	,ajax: {					//异步加载配置
			 async: false
			,url: ''
			,datatype: 'json'
			,method: 'POST'
		}
	,complete: false			//子节点是否加载完成
	,name: ''					//默认的name
	,uid: ''					//唯一id
	,__last_selected:'jqdom'	//上次选中的行

	//事件列表:
	,arrowClick: null
	,iconClick: null
	,checkboxClick: null
	,nodeClick: null
	}
branch:{
	 children: []			//子节点列表 也用于确定是branch还是leaf
	,checked_len: 0			//已选中节点数
	,checked: true			//是否选中
	,opened: false			//是否打开
	,text: ''				//显示的文本
	,value: ''				//name的值
	,name: ''				//对应的name

	//后期加入:
	,__complete: true		//是否加载完毕 true|false
	,__state: 0				//当前显示状态 0不选, 1半选, 2选中
	,__indent: '0-1-0'		//'缩进字符串'
	,__path: 'hdltree1-0-3'	//'对应的节点path'
	,__end: true		//是否为当前层级的结尾 true|false indent需要
	,__parent: node			//上级节点
	,__top: tree			//指向树
	}
leaf:{
	 checked: true			//是否选中
	,text: ''				//显示的文本
	,value: ''				//name的值
	,name: ''				//对应的name

	//后期加入:
	,__state: 0				//当前显示状态 0不选, 1半选, 2选中
	,__indent: '0-1-0'		//'缩进字符串'
	,__path: 'hdltree1-0-3'	//'对应的节点path'
	,__parent: node			//上级节点
	,__top: tree			//指向树
	}

使用下列标签, 方便遍历:
	span:	text|indent
	strong:	checkbox
	small:	icon
	em:		arrow
	b:		blank
*/

	function Tree(){
		this.uid = Tree.uid();
		this.__last_selected = $('');
	}
	Tree.prototype = {
		 init: function(data, setting){//初始化树
			setting = setting || {};
			$.extend(this, {
				 use_checkbox: true			//是否使用checkbox
				,use_icon: true				//是否使用icon图标
				,edit_able: true			//是否可以修改状态
				,lazy: false					//是否懒加载
				,theme: 'theme-line'				//使用的图标主题'theme-pnm', 'theme-line', 'theme-blue', 'theme-gray' 可在样式里按照相应格式增加更多的
				,ajax: {					//异步加载配置
						 async: false
						,url: ''
						,datatype: 'json'
						,method: 'POST'
					}
				,complete: false			//子节点是否加载完成
				,name: '对应的name'

				,arrowClick: null
				,iconClick: null
				,checkboxClick: null
				,nodeClick: null
			}, setting);

			this.str_arrow = '<em class="arrow"></em>';
			this.str_arrow_end = '<em class="arrow-end"></em>';
			this.str_arrow_open = '<em class="arrow-open"></em>';
			this.str_arrow_end_open = '<em class="arrow-end-open"></em>';

			this.str_loading = '<small class="loading"></small>';
			this.str_leaf = this.use_icon ? '<small class="leaf"></small>' : '';
			this.str_branch = this.use_icon ? '<small class="branch"></small>' : '';
			this.str_branch_open = this.use_icon ? '<small class="branch-open"></small>' : '';

			this.str_checked = this.use_checkbox ? '<strong class="checked"></strong>' : '';
			this.str_partial = this.use_checkbox ? '<strong class="partial"></strong>' : '';
			this.str_unchecked = this.use_checkbox ? '<strong class="unchecked"></strong>' : '';

			this.str_blank = '<b class="blank"></b>';
			this.str_line = '<b class="line"></b>';
			this.str_line_elbow = '<b class="line-elbow"></b>';
			this.str_line_elbow_end = '<b class="line-elbow-end"></b>';

			if(data){
				this.children = data;
				this.__indent = '0';
				this.__path = this.uid;
				this.__end = true;
				this.__parent = this;
				this.buildTree();
			}else{
				this.ajaxInit();
			}
		}
		,ajaxInit: function(){//ajax初始化
			if(!this.url){
				alert('请输入树控件的url');
				return false;
			}
			var me = this;
			$.ajax({
				type: 'post',
				url: '',
				data: '',
				async: true,
				dataType: 'json',
				success: function(data){
					me.children = data;
					me.buildHTML(me);
				},
				error: function(e) { alert("获取树数据失败!"); }
			});
		}
		,buildTree: function(){
			var html = [];
			html.push('<div class="hdl-tree' + (this.theme ? ' '+this.theme : '') + '" id="'+ this.__path +'">');
			html.push(this.buildHTML(this));
			html.push('</div>');
			this.dom.html(html.join(''));
		}
		,buildHTML: function(data){
			var html = [];
			this.makeUl(html, data);
			return html.join('');
		}
		,makeUl: function(html, parent){
			var child, i = 0, len = parent.children.length;
			if(len){
				html.push('<ul>');
				for( ; i<len; i++){
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
		}
		,makeLi: function(html, data){
			var parent = data.__parent;
			html.push('<li>');
			html.push('<div id="' + data.__path + '">');
			this.makeIndent(html, data.__indent);

			//arrow 状态
			if(data.children){
				data.checked_len = 0;
				if(!this.lazy || data.opened == true){
					html.push(data.__end ? this.str_arrow_end_open : this.str_arrow_open);
				}else{
					data.opened == false;
					html.push(data.__end ? this.str_arrow_end : this.str_arrow);
				}
				html.push(this.str_branch);
			}else{
				html.push(data.__end ? this.str_line_elbow_end : this.str_line_elbow);
				html.push(this.str_leaf);
			}

			//__state 状态
			if(data.checked){
				parent.checked_len++;
				parent.__state = 1;
				data.__state = 2;
			}else{
				data.__state = 0;
			}

			//checkbox 状态
			if(data.__state == 2){
				html.push(this.str_checked);
			}else{
				html.push(this.str_unchecked);
			}

			html.push('<span class="text">' + data.text + '</span>');
			html.push('</div>');

			//是否立即添加子节点
			if(data.children){
				if(!this.lazy || data.opened){
					this.makeUl(html, data);
					data.__complete = true;
				}else{
					data.__complete = false;
				}
			}
			html.push('</li>');
		}
		,makeIndent: function(html, indent){
			indent = indent.substr(2).split('-');
			indent.shift();
			var i = 0, len = indent.length;
			if(len){
				html.push('<span class="indent">');
				for(;i<len;i++){
					html.push(indent[i] == 1 ? this.str_line : this.str_blank);
				}
				html.push('</span>');
			}
		}
		,getJSON: function(){
			var  name = this.name
				,arr = [];
			this.walkDescendants(this, function(node){
				name = this.name || name;
				if(!node.children && node.checked){
					arr.push(name + '=' + node.value);
				}
			});
			return arr.join('&');
		}
		,walkDescendants: function(node, func){//遍历下级节点,包括当前节点
			var i, item;
			func(node);
			if(node.children){
				for(i = 0, item = node.children[i]; item;){
					this.walkDescendants(item, func);
					item = node.children[++i];
				}
			}
			return this;
		}
		,walkAncestors: function(node, func){//遍历上级节点
			var parent = node.__parent;
			while(parent != this){
				func(node, parent);
				node = parent;
				parent = node.__parent;
			}
			return this;
		}
		,checkNode: function(node, checked){//设置当前节点选中状态,并遍历上下级节点
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
		}
		,getNode: function(path){//根据path获得指定节点
			var elm, i = 1;
			path = path.split('-');
			path.shift();
			elm = this.children[path[0]];
			for(;i<path.length;i++){
				elm = elm.children[path[i]];
			}
			return elm;
		}
	}

	//Tree静态方法
	$.extend(Tree, {
		 _uid: 0
		,uid: function(){
			return 'hdltree' + (++this._uid);
		}
	});


	//树上的点击事件
	function treeClick(e){
		var  target = $(e.target)
			,id = target.closest('div').attr('id')
			,css_class = target.attr('class')
			,tree = $(this).hdlTreeSetting()
			,node = tree.getNode(id);
		if(/strong/i.test(e.target.tagName)){//点击checkbox
			if(tree.edit_able){//可点时做下面操作
				if(node.__state < 2){
					tree.checkNode(node, true);
				}else{
					tree.checkNode(node, false);
				}
			}
		}else if(/em/i.test(e.target.tagName)){//点击箭头
			toggleExpand.call(target, node, css_class);
		}else{
			target = target.closest('div');
		}
//		}else if(/branch|leaf|loading/.test(css_class)){//点击branch|leaf
//			target = target.closest('div');
//		}else if(/blank|line/.test(css_class)){//点击空白
//			target = target.closest('div');
//		}else if(/text/.test(css_class)){//点击文字
//			target = target.closest('div');
//		}

		if(target.is('div')){//点击div
			tree.__last_selected.removeClass('selected');
			target.addClass('selected');
			tree.__last_selected = target;
		}
	}

	//修改target的展开与折叠
	function toggleExpand(node, css_class){
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

	//ie6设置鼠标划过箭头和div事件
	if($.browser.msie == '6.0'){
		ie6Hover = function(e){
			
		}
	}
/**********************************************************************************************
*注册到jq原型上
*/
	function hdlTree(data, setting){
		var tree = new Tree();
		tree.dom = this;
		this.click(treeClick);
		global_tree[tree.uid] = tree;
		this.attr('data-hdl-tree', tree.uid);
		tree.init(data, setting);
		return this;
	}

	$.fn.hdlTree = hdlTree;
	$.fn.hdlTreeSetting = function(){
		return global_tree[this.attr('data-hdl-tree')];
	};
})(jQuery);
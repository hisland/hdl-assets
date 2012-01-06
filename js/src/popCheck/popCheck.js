/**
 * @fileOverview
 * @module popCheck
 * @author hisland hisland@qq.com
 * @description 弹出选择框
 * <pre><code>
 * </code></pre>
 */

KISSY.add('popCheck', function(S, undef) {
	var pop = $.popWin.init(),
		$EMPTY = $(""),
	
		$ctrl = $('<p style="padding:0 0 5px;"></p>'),
		$box = $('<div style="height:230px;overflow:auto;border:1px solid #92B1DC;padding:2px;"></div>'),
	
		$btn_wrap = $('<div class="win1-btns"><input type="submit" value="确定" class="win1-btn-ok"></div>'),
		$btn_ok = $btn_wrap.find('input'),
	
		$ipt_target = $EMPTY;
	
	//初始化弹出层结构
	pop.$content.append($ctrl).append($box).append($btn_wrap);
	pop.$close.hide();
	pop.setTitle('请选择');
	
	$.getJSON('systemlog/tblSystemLogAction!getModuleTree.do', function(tree){
		$box.hdlTree(tree, {
			use_icon:false,
			theme: 'theme-blue',
			name:'form.moduleId'
		});
	});
	
	//确定按钮点击时放回去
	$btn_ok.click(function(){
		var tree = $box.hdlTreeSetting(),
			hidden = [],
			str = [],
			name = tree.name;
	
		tree.walkDescendants(tree, function(node){
			name = this.name || name;
			if(!node.children && node.checked){
				hidden.push('<input type="hidden" name="' + name + '" value="' + node.value + '" />');
				str.push(node.text);
			}
		});

		$ipt_target.val(str.join('+')).next().html(hidden.join(''));
	
		pop.hide();
		$ipt_target = $EMPTY;
	});
	
	$('#ipt_moduleId').click(function(e){
		$ipt_target = $(this);
		pop.show();
	});

}, {
	requires: ['jquery-1.4.2']
});

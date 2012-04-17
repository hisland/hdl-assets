/**
 * 
 */

define(['jquery', 'kissy'], function($, S){
	var pop_list = [];
	//检查弹出层的焦点
	function checkFocus(e){
		//按下的是tab键且有pop_list时才执行操作
		if(e && e.keyCode === 9 && pop_list.length){
			var m = pop_list[pop_list.length - 1];

			//焦点不在当前层上, 调整到当前层的第一个元素上
			if(!S.inArray(m.$div[0], $(document.activeElement).parents().andSelf().get())){
				m.$div.find('a, input, textarea').first().focus();
			}

			//ESC执行关闭动作
			//if(e && e.keyCode === 27){
			//	m.hide();
			//}
		}
	}

	return {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		put: function(m){
			if(!pop_list.length){
				$(document).keyup(checkFocus);
			}
			pop_list.push(m);
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		remove: function(){
			pop_list.pop();
			if(!pop_list.length){
				$(document).unbind('keyup', checkFocus);
			}
		}
	};
});
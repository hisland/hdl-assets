
/**********************************************************************************************
 *jquery的可拖动代码
 *参数形式:
			{
				range:{
						x:[from,to],
						y:[from,to]
					},
				src_elm:'#someid'
			}
 *range  : 元素能够拖动的范围对象,形如:
			{
				x:[from,to],	//水平的开始结束
				y:[from,to]		//垂直的开始结束
			}
 *src_elm: 为一个jq表达式或者一个元素对象
 *使用此代码需要元素设置了定位属性position,最好为absolute,其它可能会出现未知情况
 *如果没有src_elm,则src_elm为使用此拖动代码的元素
 *如果没有设置range,则range是可拖动元素的上一级定位元素,即设置了position属性的元素
 */
(function($){
	var drag_elm = null;

	//鼠标按下,设置初始数据,注册在元素上
	function mouseDown(e){
		//设置拖动元素
		drag_elm = this.drag_elm;

		//保存当前鼠标的位置
		drag_elm.oldMouse = [e.clientX, e.clientY];

		//保存当前元素的位置
		var pos = $(drag_elm).position();
		drag_elm.oldPos = [pos.left, pos.top];

		//防止拖动的时候选择文本
		document.body.onselectstart = function(){return false;}
		$('body').css('-moz-user-select','none');
	}

	//鼠标移动,设置新的坐标数据,注册在document上
	function mouseMove(e){
		if(drag_elm){
			var newPos = [e.clientX - drag_elm.oldMouse[0] + drag_elm.oldPos[0], e.clientY - drag_elm.oldMouse[1] + drag_elm.oldPos[1]];

			newPos[0] = newPos[0]<drag_elm.range.x[0] ? drag_elm.range.x[0] : newPos[0];//更正水平方向的最小值
			newPos[0] = newPos[0]>drag_elm.range.x[1] ? drag_elm.range.x[1] : newPos[0];//更正水平方向的最大值

			newPos[1] = newPos[1]<drag_elm.range.y[0] ? drag_elm.range.y[0] : newPos[1];//更正垂直方向的最小值
			newPos[1] = newPos[1]>drag_elm.range.y[1] ? drag_elm.range.y[1] : newPos[1];//更正垂直方向的最大值

			$(drag_elm).css({top: newPos[1], left: newPos[0]});
		}
	}

	//鼠标放开,去掉拖动数据,注册在document上
	function mouseUp(e){
		//下面是鼠标放开时候的清除操作
		drag_elm = null;
		document.body.onselectstart = null;
		$('body').css('-moz-user-select','');
	}

	//给文档注册有拖动元素时候的事件
	$(document).mousemove(mouseMove).mouseup(mouseUp);

	//JQ所使用的方法
	function hdlDrag(args){
		args = args || {};

		//指定需要拖动的元素,默认是自己
		args.src_elm = args.src_elm ? $(args.src_elm).eq(0) : this;

		if(!args.range){

			//测试是否可见并设置属性,否则不可以元素不会有宽高
			var v;
			if(!(v = args.src_elm.is(':visible'))){
				args.src_elm.css('visibility','hidden').show();
			}

			//获取需要的值
			var p  = $(args.src_elm[0].offsetParent);
			var w = p.outerWidth() - args.src_elm.outerWidth();
			var h = p.outerHeight() - args.src_elm.outerHeight();

			//如果前面保存的可见与否为不可见,则还原回去
			if(!v){
				args.src_elm.css('visibility','').hide();
			}

			//更新拖动范围
			args.src_elm.range = {
						x:[0, w],
						y:[0, h]
					};
						
		}else{
			args.src_elm.range = args.range;
		}

		this[0].drag_elm = args.src_elm;//保存在dom上
		this.mousedown(mouseDown);
	}
	$.fn.hdlDrag = hdlDrag;
})(jQuery);
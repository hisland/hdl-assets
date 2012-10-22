/**
 * jQuery元素对齐某元素
 * <pre><code>
 * API:
 *		$('').align(target);
 *		$('').align(target, callback);
 *		$('').align({
							target: 'elm',
							position: 'up',
							offset: [0, 0],
							callback: fn(elm, position)
						});
 * </code></pre>
 */
define(['jquery', 'kissy'], function($, S){
/**
 * @memberOf jQuery#
 */
$.fn.align = function(target, callback){
	var elm = this.eq(0), offset = [0, 0], position = 'down', tmp;

	//预处理参数设置
	//target参数为配置对象时
	if(S.isPlainObject(target) && !target.jquery){
		tmp = target;
		target = tmp.target;
		position = tmp.position || position;
		offset = tmp.offset || offset;
		callback = tmp.callback || null;
	}
	target = $(target).eq(0);
	if(!target.length){
		S.error('align: must have target');
		return elm;
	}

	//初始化位置与尺寸
	var me_width = elm.outerWidth(),
		me_height = elm.outerHeight(),

		t_width = target.outerWidth(),
		t_height = target.outerHeight(),
		t_offset = target.offset(),

		doc_elm = document.documentElement,
		p_width = doc_elm.clientWidth + doc_elm.scrollLeft,
		p_height = doc_elm.clientHeight + doc_elm.scrollTop;

	//根据优先位置计算合适位置
	if(position === 'down'){
		//下面容纳不下
		if(me_height + offset[1] + t_offset.top + t_height > p_height){
			//上面可以容纳
			if(me_height + offset[1] < t_offset.top){
				position = 'up';
			}
		}
	}else if(position === 'left'){
		//左侧容纳不下
		if(me_width + offset[0] > t_offset.left){
			//右侧可以容纳
			if(me_width + offset[1] + t_offset.left + t_width < p_width){
				position = 'right';
			}
		}
	}else if(position === 'up'){
		//上面容纳不下
		if(me_height + offset[1] > t_offset.top){
			//下面可以容纳
			if(me_height + offset[1] + t_offset.top + t_height < p_height){
				position = 'down';
			}
		}
	}else if(position === 'right'){
		//右侧容纳不下
		if(me_width + offset[1] + t_offset.left + t_width > p_width){
			//左侧可以容纳
			if(me_width + offset[0] < t_offset.left){
				position = 'left';
			}
		}
	}

	switch(position){
		case 'down':
			elm.css({
				top: t_offset.top + t_height + 1 + offset[1],
				left: t_offset.left + offset[0]
			});
			break;
		case 'left':
			elm.css({
				top: t_offset.top + offset[1],
				left: t_offset.left - me_width + offset[0]
			});
			break;
		case 'up':
			elm.css({
				top: t_offset.top - me_height - 1 + offset[1],
				left: t_offset.left + offset[0]
			});
			break;
		case 'right':
			elm.css({
				top: t_offset.top + offset[1],
				left: t_offset.left + t_width + offset[0]
			});
			break;
	}

	//回调处理
	S.isFunction(callback) && callback(position);

	return elm;
}
});
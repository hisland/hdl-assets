/**********************************************************************************************
 * 名称: MP使用的彩信编辑模块
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 *
 */

(function($){

	var  scroll_height = 51
		,ie = /*@cc_on!@*/0
		,ie6 = ie && /msie 6.0/i.test(navigator.userAgent);

	var  msg_pic = '图片大小不超过80K'
		,msg_pic_err = '图片大小不超过80K'
		,msg_ring = '铃声大小不超过80K，格式为mp3、wav或mid'
		,msg_ring_err = '铃声大小不超过80K，格式为mp3、wav或mid'
		,msg_txt = '文字长度不超过2000字'
		,msg_txt_err = '文字长度不超过2000字'
		,msg_video = '视频大小不超过80K'
		,msg_video_err = '视频大小不超过80K'
		,action_upload = '/strategycfg/uploadFileDemo.do'
		,file_name = 'image';

	function swapText(s1, s2){
		var tmp = s1.html();
		s1.html(s2.html());
		s2.html(tmp);
	}
	function fileChange(e){
		alert('type=file 被点击了.');
	}
	function divClick(e){
		var  me = $(this)
			,dt = $(e.target)
			,o = me.data('mms-setting')
			,idx, len, span, span2, fs, fwrap, vwrap, flen;

		if(dt.is('a, span')){
			//调整帧顺序
			if(dt.closest('.mp-mms-o').length && !dt.is('.mp-mms-od')){
				len = me.find('div.mp-mms-f a').length;
				span = o.last_selected.find('span');
				if(dt.is('.mp-mms-o1')){
					idx = 1;
					span2 = o.last_selected.parent().find('span:first');
					o.last_selected.parent().prepend(o.last_selected);
				}else if(dt.is('.mp-mms-o2')){
					idx = o.last_selected.index();
					span2 = o.last_selected.prev().find('span');
					o.last_selected.prev().before(o.last_selected);
				}else if(dt.is('.mp-mms-o3')){
					idx = o.last_selected.index()+2;
					span2 = o.last_selected.next().find('span');
					o.last_selected.next().after(o.last_selected);
				}else if(dt.is('.mp-mms-o4')){
					idx = len;
					span2 = o.last_selected.parent().find('span:last');
					o.last_selected.parent().append(o.last_selected);
				}
				swapText(span, span2);
				me.MMSEditOrderState(idx, len);

			//选中某帧
			}else if(dt.closest('.mp-mms-f').length){
				dt = dt.closest('a');
				idx = dt.index();
				len = dt.parent().find('a').length;
				dt.addClass('mp-mms-f-s').siblings('.mp-mms-f-s').removeClass('mp-mms-f-s');
				o.last_selected = dt;
				me.find('div.mp-mms-v>div').eq(idx).show().siblings().hide();
				me.MMSEditOrderState(idx+1, len);

			//上滚动
			}else if(dt.is('.mp-mms-su') && !dt.is('.mp-mms-sud')){
				me.MMSEditScroll('up');

			//下滚动
			}else if(dt.is('.mp-mms-sd') && !dt.is('.mp-mms-sdd')){
				me.MMSEditScroll('down');

			//添加
			}else if(dt.closest('.mp-mms-a').length){
				fwrap = me.find('div.mp-mms-f');
				vwrap = me.find('div.mp-mms-v');
				flen = fwrap.find('a').length+1;
				if(dt.is('.mp-mms-a1')){
					span = $('<div class="mp-mms-vb"><a class="mp-mms-vd" href="javascript:void(0)">delete</a><div class="mp-mms-vb1"><form target="mp-mms-iframe" action="'+action_upload+'" method="post" enctype="multipart/form-data" class="mp-mms-vbf" style="display:block;"><p>' + msg_pic + '</p><span class="mp-mms-btn"><input class="mp-mms-btnfile" type="file" name="'+file_name+'" /></span></form><div class="mp-mms-vbf"><div class="mp-mms-vb1w"><img src="#" alt="" /></div></div></div></div>');
					span2 = $('<a class="mp-mms-f1" href="javascript:void(0)"><span>'+flen+'</span></a>');
				}else if(dt.is('.mp-mms-a2')){
					span = $('<div class="mp-mms-vb"><a class="mp-mms-vd" href="javascript:void(0)">delete</a><div class="mp-mms-vb1"><form target="mp-mms-iframe" action="'+action_upload+'" method="post" enctype="multipart/form-data" class="mp-mms-vbf" style="display:block;"><p>' + msg_ring + '</p><span class="mp-mms-btn"><input class="mp-mms-btnfile" type="file" name="'+file_name+'" /></span></form><div class="mp-mms-vbf"><div class="mp-mms-vb2w"></div></div></div></div>');
					span2 = $('<a class="mp-mms-f2" href="javascript:void(0)"><span>'+flen+'</span></a>');
				}else if(dt.is('.mp-mms-a3')){
					span = $('<div class="mp-mms-vb"><a class="mp-mms-vd" href="javascript:void(0)">delete</a><div class="mp-mms-vb3"><textarea class="mp-mms-vbta"></textarea></div></div>');
					span2 = $('<a class="mp-mms-f3" href="javascript:void(0)"><span>'+flen+'</span></a>');
				}else if(dt.is('.mp-mms-a4')){
					span = $('<div class="mp-mms-vb"><a class="mp-mms-vd" href="javascript:void(0)">delete</a><div class="mp-mms-vb1"><form target="mp-mms-iframe" action="'+action_upload+'" method="post" enctype="multipart/form-data" class="mp-mms-vbf" style="display:block;"><p>' + msg_video + '</p><span class="mp-mms-btn"><input class="mp-mms-btnfile" type="file" name="'+file_name+'" /></span></form><div class="mp-mms-vbf"><div class="mp-mms-vb3w"></div></div></div></div>');
					span2 = $('<a class="mp-mms-f4" href="javascript:void(0)"><span>'+flen+'</span></a>');
				}
				span.find('input').change(fileChange);
				vwrap.append(span);
				fwrap.append(span2);
				fs = me.find('span.mp-mms-tt');
				fs.html(fs.html()-0+1);
				//跳到相应帧并转到底部
				span2.click();
				fwrap[0].scrollTop = 9999;
				me.MMSEditScroll();

			//删除
			}else if(dt.is('.mp-mms-vd')){
				idx = dt.parent().index();
				fs = me.find('div.mp-mms-f a');
				fs.filter(':gt('+idx+')').each(function(i, v){
					$(this).find('span').html(idx+i+1);
				});
				//转到下一帧(无下一帧就转到上一帧)并把此帧删除
				fs.eq(idx).next().length ? 
					fs.eq(idx).next().click() : fs.eq(idx).prev().click();
				dt.parent().remove();
				fs.eq(idx).remove();
				me.MMSEditScroll();
				span = me.find('span.mp-mms-tt');
				span.html(span.html()-1);
			}
			dt.blur();
			e.preventDefault();
		}
	}

	$.fn.extend({
		 MMSEditInit: function(){
			var  me = this.eq(0)
				,html = '<div class="mp-mms-l"><div class="mp-mms-o"><a class="mp-mms-o1 mp-mms-od" href="javascript:void(0)" title="top"></a><a class="mp-mms-o2 mp-mms-od" href="javascript:void(0)" title="up"></a><a class="mp-mms-o3 mp-mms-od" href="javascript:void(0)" title="down"></a><a class="mp-mms-o4 mp-mms-od" href="javascript:void(0)" title="bottom"></a></div><a class="mp-mms-su mp-mms-sud" href="javascript:void(0)"></a><div class="mp-mms-f"></div><a class="mp-mms-sd mp-mms-sdd" href="javascript:void(0)"></a><div class="mp-mms-t"><span class="mp-mms-tn">0</span>/<span class="mp-mms-tt">0</span></div></div><div class="mp-mms-r"><div class="mp-mms-a"><a class="mp-mms-a1" href="javascript:void(0)">+Pictures</a><a class="mp-mms-a2" href="javascript:void(0)">+Ringtones</a><a class="mp-mms-a3" href="javascript:void(0)">+Text</a><a class="mp-mms-a4" href="javascript:void(0)">+Video</a></div><div class="mp-mms-v"></div><iframe name="mp-mms-iframe" id="mp-mms-iframe" width="0" height="0" frameborder="no" scrolling="no" allowtransparency="yes"></iframe> </div>';

			me.addClass('mp-mms-wrap').html(html);
			me.MMSEditEvent();
		}
		,MMSEditEvent: function(){
			var  me = this.eq(0)
				,o = {}
			me.data('mms-setting', o);
			this.eq(0).click(divClick);
		}
		,MMSEditOrderState: function(idx, len){
			var  o1 = this.eq(0).find('a.mp-mms-o1, a.mp-mms-o2')
				,o2 = this.eq(0).find('a.mp-mms-o3, a.mp-mms-o4');
			this.eq(0).find('span.mp-mms-tn').html(idx);
			if(idx == 1){
				o1.addClass('mp-mms-od');
			}else{
				o1.removeClass('mp-mms-od');
			}
			if(idx == len){
				o2.addClass('mp-mms-od');
			}else{
				o2.removeClass('mp-mms-od');
			}
		}
		,MMSEditScroll: function(dir){
			var  me = this.eq(0)
				,s = me.find('div.mp-mms-f')
				,stop = s[0].scrollTop
				,len = s.find('a').length
				,sed = Math.floor(stop / scroll_height);

			if(dir == 'up' && stop !== 0){
				s.animate({'scrollTop': scroll_height*(sed-1)}, 'fast', function(){
					if(this.scrollTop === 0){
						me.find('a.mp-mms-su').addClass('mp-mms-sud');
					}
					me.find('a.mp-mms-sd').removeClass('mp-mms-sdd');
				});
			}else if(dir == 'down' && (len - 4 !== sed)){
				s.animate({'scrollTop': scroll_height*(sed+1)}, 'fast', function(){
					sed++;
					if(len - 4 === sed){
						me.find('a.mp-mms-sd').addClass('mp-mms-sdd');
					}
					me.find('a.mp-mms-su').removeClass('mp-mms-sud');
				});

			//不传参数仅检查状态
			}else if(dir == undefined){
				if(stop === 0){
					me.find('a.mp-mms-su').addClass('mp-mms-sud');
				}else{
					me.find('a.mp-mms-su').removeClass('mp-mms-sud');
				}
				if(len - 4 <= sed){
					me.find('a.mp-mms-sd').addClass('mp-mms-sdd');
				}else{
					me.find('a.mp-mms-sd').removeClass('mp-mms-sdd');
				}
			}
		}
	});
})(jQuery);
define(['jquery', 'kissy', 'css!./main'], function($, S){

	//鼠标晃过显示操作
	$(document).on('hover', 'div.multimsg-wrap', function(e){
		$(this).toggleClass('multimsg-wrap-hover');
	});

	return {
		initTimeRange: function(config){
			S.mix(config, {
				msg_del: '',
				data: null,
				selector: null,
				max: null
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.timelist-list')
				popWrap = wrap.find('.timelist-pop div');

			popWrap.html(S.map(config.data, function(v, i, o){
				return '<a href="javascript:;" class="wad-link" title="' + v.name + '" data-idx="' + i + '">' + v.name + '</a>';
			}).join(''));

			//删除一行
			wrap.on('click', 'a.timelist-del', function(e){
				$(this).parent().remove();
				if(listWrap.children().length < config.max){
					wrap.find('a.timelist-add').parent().show();
				}
			});

			//点击添加
			wrap.on('click', 'a.timelist-add', function(e){
				$(this).parent().next().show();
			});
			//点击添加列表
			wrap.find('.timelist-pop').on('click', 'a', function(e){
				var item = config.data[$(this).attr('data-idx')];
				var p = $('<p><input type="text" name="" value="' + item.start + '" class="text1" /> - <input type="text" name="" value="' + item.end + '" class="text1" /> <a href="javascript:;" class="wad-link timelist-del">' + config.msg_del + '</a></p>');
				listWrap.append(p);

				p.find('input').each(function(i, v){
					var c = Calendar.init().attach(v);
					c.setFixed('year, month, date');
				});

				if(listWrap.children().length >= config.max){
					wrap.find('a.timelist-add').parent().hide();
				}

				$(this).parent().parent().hide();
			});

			//关闭列表
			wrap.find('.timelist-pop').on('click', 'span', function(e){
				$(this).parent().hide();
			});
		},
		initTab: function(tabs, cons){
			tabs.click(function(e){
				cons.hide();
				cons.eq($(this).index()).show();
			});

			tabs.eq(0).click();
		},
		initMultiMsg: function(config){
			S.mix(config, {
				msg_del: '',
				data_select: null,
				selector: null,
				max: null
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.multimsg-div');

			function makeSelect(){
				return '<select class="select1">' + S.map(config.data_select, function(v, i, o){
					return '<option value="' + i + '">' + v.name + '</option>';
				}).join('') + '</select>';
			}

			//点击添加列表
			wrap.on('click', '.multimsg-add', function(e){
				var p = $('<div class="multimsg-wrap"><a href="javascript:;" class="wad-link multimsg-del">' + config.msg_del + '</a><p>' + config.msg_tmp_info + ' ' + makeSelect() + '</p><textarea class="text1"></textarea></div>');
				listWrap.append(p);

				p.find('select').change(function(e){
					$(this).parent().next().val(config.data_select[$(this).val()].str);
				});

				if($(this).parent().prev().children().length >= config.max){
					$(this).parent().hide();
				}
			});

			//删除一行
			wrap.on('click', 'a.multimsg-del', function(e){
				$(this).parent().remove();
				if($(this).parent().parent().children().length < config.max){
					wrap.find('a.multimsg-add').parent().show();
				}
			});

			wrap.find('a.multimsg-add').click();
			listWrap.children().find('.multimsg-del').remove();
			listWrap.children().appendTo(wrap.prev());

			wrap.find('a.multimsg-add').click();
			listWrap.children().find('.multimsg-del').remove();
		}
	};
});
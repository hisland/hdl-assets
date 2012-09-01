define(['jquery', 'kissy', './fileUpload', 'ui/moniSelect/main', 'css!./main'], function($, S, DataNumUpload, MoniSelect){

	//鼠标晃过显示操作
	$(document).on('hover', 'div.multimsg-wrap', function(e){
		$(this).toggleClass('multimsg-wrap-hover');
	});

	return {
		initTimeRange: function(config){
			S.mix(config, {
				msgDel: '',
				dataTimeList: null,
				existTimeList: null,
				selector: null,
				max: null
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.timelist-list')
				popWrap = wrap.find('.timelist-pop div');

			popWrap.html(S.map(config.dataTimeList, function(v, i, o){
				return '<a href="javascript:;" class="wad-link" title="' + v.sendName + '" data-idx="' + i + '">' + v.sendName + '</a>';
			}).join(''));

			//删除一行
			wrap.on('click', 'a.timelist-del', function(e){
				$(this).parent().remove();
				if(listWrap.children().length < config.max){
					wrap.find('a.timelist-add').parent().show();
				}
			});

			function prefix0(val){
				if(val < 10){
					return '0' + val;
				}
				return val;
			}

			function makeExistTimeList(item){
				var p = $('<p><input type="text" name="dataTaskRecordsBaseForm.startTime" value="' + prefix0(item.beginTime.hours) + ':' + prefix0(item.beginTime.minutes) + ':' + prefix0(item.beginTime.seconds) + '" class="text1" /> - <input type="text" name="dataTaskRecordsBaseForm.endTime" value="' + prefix0(item.endTime.hours) + ':' + prefix0(item.endTime.minutes) + ':' + prefix0(item.endTime.seconds) + '" class="text1" /> <a href="javascript:;" class="wad-link timelist-del">' + config.msgDel + '</a></p>');
				listWrap.append(p);

				p.find('input').each(function(i, v){
					var c = Calendar.init().attach(v);
					c.setFixed('year, month, date');
				});
			}

			//点击添加
			wrap.on('click', 'a.timelist-add', function(e){
				$(this).parent().next().show();
			});
			//点击添加列表
			wrap.find('.timelist-pop').on('click', 'a', function(e){
				var item = config.dataTimeList[$(this).attr('data-idx')];

				makeExistTimeList(item);

				if(listWrap.children().length >= config.max){
					wrap.find('a.timelist-add').parent().hide();
				}

				$(this).parent().parent().hide();
			});

			//关闭列表
			wrap.find('.timelist-pop').on('click', 'span', function(e){
				$(this).parent().hide();
			});

			S.each(config.existTimeList, function(v, i, o){
				makeExistTimeList(v);
			});
		},
		initTab: function(tabs, cons){
			tabs.click(function(e){
				cons.hide();
				cons.eq($(this).index()).show();
			});

			tabs.eq(0).triggerHandler('click');
			tabs.eq(0).find(':radio').attr('checked', true);
		},
		initMultiMsg: function(config){
			S.mix(config, {
				msgDel: '',
				msgTplInfo: '',
				dataTmplList: null,
				selector: null,
				max: null,
				valid: null
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.multimsg-div');

			function makeTmplList(){
				return '<select class="select1">' + S.map(config.dataTmplList, function(v, i, o){
					return '<option value="' + i + '">' + v.tempName + '</option>';
				}).join('') + '</select>';
			}

			//点击添加列表
			wrap.on('click', '.multimsg-add', function(e){
				var p = $('<div class="multimsg-wrap"><a href="javascript:;" class="wad-link multimsg-del">' + config.msgDel + '</a><p>' + config.msgTplInfo + ' <input class="ac text1" type="text"/></p><textarea class="text1"></textarea></div>');
				
				var ac = Autocomplete.init({
					url: 'busiparams/msgContentTempAction!find.do',
					varSearch: 'msgContentTempForm.tempName',
					data: 'msgContentTempForm.blur=1',
					process: function(item){
						return item.tempName;
					},
					click: function(item){
						var tempContent = "";
						
						if(item.tempContent==undefined){
							tempContent="";
						}else{
							tempContent=item.tempContent;
						}
						$(this.tempSelector).parent().next("textarea").text(tempContent);
						$(this.tempSelector).parent().next("textarea").val(tempContent);
						$(this.tempSelector).parent().next("textarea").focus().blur();
					},
					isInnerSearch:true
				}).attach(p.find('.ac'));
				
				listWrap.append(p.fadeIn());

				p.find('select').change(function(e){
					$(this).parent().next().val(config.dataTmplList[$(this).val()].tempContent);
				});

				var vg = ValidGroup.init().utf8len(1, 140).attach(p.find('textarea'));
				p.find('textarea').data('valid', vg);

				if($(this).parent().prev().children().length >= config.max){
					$(this).parent().hide();
				}
			});

			//删除一行
			wrap.on('click', 'a.multimsg-del', function(e){
				$(this).parent().fadeOut(function() {
					$(this).remove();
				});
				if($(this).parent().parent().children().length < config.max){
					wrap.find('a.multimsg-add').parent().show();
				}
			});

			wrap.find('a.multimsg-add').click();
			listWrap.children().find('.multimsg-del').remove();
			listWrap.children().appendTo(wrap.prev());

			wrap.prev().find('textarea').data('valid').detach();
			ValidGroup.init().utf8len(1, 1400).attach(wrap.prev().find('textarea'));

			wrap.find('a.multimsg-add').click();
			listWrap.children().find('.multimsg-del').remove();
		},
		initNumSeg: function(config){
			S.mix(config, {
				selector: null,
				dataNumSeg: null,
				dataAreaList: null,
				msgDel: null,
				max: 10
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.numberfrom-seg');
			
			function makeAreaSelect(){
				return '<select class="select1">' + S.map(config.dataAreaList, function(v, i, o){
					return '<option value="' + v.areaId + '">' + v.areaName + '</option>';
				}).join('') + '</select>';
			}

			wrap.on('click', '.del', function(e){
				$(this).parent().remove();
				if(listWrap.children().length < config.max){
					listWrap.next().show();
				}
			});

			wrap.on('click', '.number-seg-add', function(e){
				var p = $('<p><input type="text" class="ac text1" /> ' + makeAreaSelect() +  ' <a href="javascript:;" class="del wad-link">' +  config.msgDel + '</a></p>');
				p.find("select").moniSelect();
				listWrap.append(p);
	
				Autocomplete.init({
					url: 'namelist/dataNumSegMagAction!find.do',
					varSearch: 'form.numSegment',
					data: 'form.blur=1&form.areaId=-1',
					process: function(item){
						return item.numSegment;
					},
					click: function(item){
						p.find('.hidden').val(item.numSegment);
						p.find('select').val(item.areaId);
					},
					change: function(){
						p.find('.hidden').val('');
					}
				}).attach(p.find('.ac'));

				if(listWrap.children().length >= config.max){
					$(this).parent().hide();
				}
			});
		},
		initNumFile: function(config){
			S.mix(config, {
				selector: null,
				dataNumLib: null,
				dataAreaList: null,
				max: 10,
				msgDel: null,
				msgPleaseSelect: null,
				msgOr: null,
				msgWait: null
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.numberfrom-div');
			
			function makeNumLib(){
				return '<select class="select1 numLib"><option value="-1">' + config.msgPleaseSelect + '</option>' + S.map(config.dataNumLib, function(v, i, o){
					return '<option value="' + v.numLibName + '">' + v.numLibName + '</option>';
				}).join('') + '</select>';
			}

			function makeAreaSelect(){
				return '<select class="select1">' + S.map(config.dataAreaList, function(v, i, o){
					return '<option value="' + v.areaId + '">' + v.areaName + '</option>';
				}).join('') + '</select>';
			}

			function makeFileMark(mark){
				if(mark.resultCode == 1){
					var rs = $('<span>文件名:</span><span style="margin-right:5px;width:60px;overflow:hidden;display:inline-block;text-overflow:ellipsis;" title="' + mark.fileName + '">' + mark.fileName + '</span><span>行数:</span><span>' + mark.lineCount + '</span><span>归属地</span>' + makeAreaSelect() + ' <a href="javascript:;" class="del wad-link">' +  config.msgDel + '</a>');
					rs.find("select").moniSelect();
					rs.filter('select').val(mark.localID);
					return rs;
				}else{
					return '<span class="red">' + mark.resultMsg + '</span> <a href="javascript:;" class="del wad-link">' +  config.msgDel + '</a>';
				}
			}

			wrap.on('change', '.numLib', function(e){
				var val = config.dataNumLib[$(this).find(':selected').index()-1];

				var p = $(this).parent();

				p.html(config.msgWait);

				var dt = {
					'fileForm.dataNumLibID': val.listId,
					'fileForm.numLibName': val.fileName,
					'fileForm.msgRource': config.msgRource,
					'fileForm.numRource': 2
				};

				$.post(config.numLibUrl, dt, function(mark){
					p.html(makeFileMark(mark));
					if(mark.resultCode == 1){
						p.data('mark', mark);
						p.addClass('upload-ok');
					}
				}, 'json');
			});

			wrap.on('click', '.del', function(e){
				$(this).closest('p').remove();
				if(listWrap.children().length < config.max){
					listWrap.next().show();
				}
			});

			wrap.on('click', '.number-add', function(e){
				var p = $('<p style="position:relative;"><b></b><span class="wad-link">上传</span> <span>' + config.msgOr + '</span> ' + makeNumLib() +  ' <a href="javascript:;" class="del wad-link">' +  config.msgDel + '</a></p>');
				listWrap.append(p);

				//初始化上传
				DataNumUpload.init({
					hole: p.find('b'),
					p: p,
					makeFileMark: makeFileMark,
					posturl: config.numUpUrl,
					upload_name: config.uploadName,
					max_size: config.maxSize,
					filter: config.filter,
					width: 28,
					height: 26,
					numRource: config.numRource,
					msgRource: config.msgRource
				});

				if(listWrap.children().length >= config.max){
					$(this).parent().hide();
				}
			});

			DataNumUpload.clearFns();
		}
	};
});
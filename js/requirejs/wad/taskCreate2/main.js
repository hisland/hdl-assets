define(['jquery', 'kissy', './fileUpload', 'ui/moniSelect/main', 'css!./main'], function($, S, FileUpload, MoniSelect){
	//鼠标晃过显示操作
	$(document).on('hover', 'div.multimsg-div', function(e){
		$(this).toggleClass('multimsg-div-hover');
	});

	return {
		initTimeRange: function(config){
			S.mix(config, {
				msgDel: 'del',
				url: null,
				data: null,
				existTimeList: null,
				selector: null,
				max: null
			}, false);

			var wrap = $(config.selector),
				listWrap = wrap.find('.timelist-list'),
				addBtn = wrap.find('.timelist-add'),
				ac = Autocomplete.init({
					url: config.url,
					data: config.data,
					processNoMatch: true,
					isInnerSearch: true,
					focusClear: true,
					varSearch: 'sendTimeForm.sendName',
					preProcess: function(data){
						if(!data.rows.length){
							data.rows.push({
								sendName: getText('默认'),
								beginTime: '00:00:00',
								endTime: '23:59:59'
							});
						}
					},
					click: function(item){
						makeItem(item);
					},
					process: function(item, idx){
						return '<a title="'
								+ Util.entityHTML(item.sendName) + '" data-idx="'
								+ idx + '" href="javascript:;" class="autocomp-a">'
								+ '<span style="display:inline-block;width:75px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;vertical-align:top;">'
								+ Util.entityHTML(item.sendName) + '</span><span style="display:inline-block;vertical-align:top;">'
								+ '[' + item.beginTime + '-' + item.endTime + ']</span></a>';
					}
				});

			ac.attach(addBtn);

			//删除一行
			wrap.on('click', '.timelist-del', function(e){
				$(this).parent().remove();
				if(listWrap.children().length < config.max){
					addBtn.parent().show();
				}
			});

			function makeItem(item){
				var p = $('<p><input type="text" readonly="readonly" value="' 
					+ item.beginTime
					+ '" class="text1" /> - <input type="text" readonly="readonly" value="'
					+ item.endTime + '" class="text1" /> <a href="javascript:;" class="wad-link timelist-del" style="display:inline-block;">'
					+ config.msgDel + '</a></p>');
				listWrap.append(p);

				p.find('input').each(function(i, v){
					var c = Calendar.init().attach(v);
					c.setFixed('year, month, date');
				});

				if(listWrap.children().length >= config.max){
					addBtn.parent().hide();
				}
			}

			S.each(config.existTimeList, function(v, i, o){
				makeItem(v);
			});
		},

		initTabSwitch: function(config){
			S.mix(config, {
				tabs: null,
				cons: null,
				defaultShow: 0
			}, false);

			config.tabs.click(function(e){
				config.cons.hide();
				config.cons.eq($(this).index()).show();
				$(this).find(':radio').attr('checked', true);
			});

			config.tabs.eq(config.defaultShow).triggerHandler('click');
			config.tabs.eq(config.defaultShow).find(':radio').attr('checked', true);
		},

		makeMsg: function(config){
			S.mix(config, {
				noDel: false,
				msgDel: 'del',
				msgSelectTmpl: 'Template',
				useTmpl: true,
				tmplUrl: null,
				tmplData: null,
				tmplSearch: null,
				tipStr: null,
				maxLength: null
			}, false);

			var wrap =$('<div class="multimsg-div">'
						+ (config.noDel ? '' : '<a href="javascript:;" class="wad-link multimsg-del">' + config.msgDel + '</a>')
						+ (config.useTmpl ? '<a href="javascript:;" class="wad-link select-tmpl">' + config.msgSelectTmpl + '</a>' : '')
						+ '<textarea class="text1"></textarea>'
						+ '</div>'),
				ac = Autocomplete.init({
					url: config.tmplUrl,
					varSearch: config.tmplSearch,
					data: config.tmplData,
					isInnerSearch: true,
					processNoMatch: true,
					focusClear: true,
					click: function(item){
						wrap.find('textarea').val(item.tempContent).trigger('input');
					},
					process: function(item, idx){
						return '<a title="'
								+ Util.entityHTML(item.tempContent) + '" data-idx="'
								+ idx + '" href="javascript:;" class="autocomp-a">'
								+ Util.entityHTML(item.tempName) + '</a>';
					}
				});

			ac.attach(wrap.find('.select-tmpl'));

			var valid = ValidGroup.init().len(1, config.maxLength).attach(wrap.find('textarea'));
			if(config.tipStr){
				valid.fn(function(){
					return true;
				}, config.tipStr);
			}

			return wrap;
		},
		initMsgFrom: function(config){
			S.mix(config, {
				msgDel: 'del',
				msgSelectTmpl: 'Template',
				useTmpl: true,
				tmplUrl: null,
				tmplData: null,
				maxLength: null,
				tipStr: null,
				max: 3,
				selector: null
			}, false);
			
			var TC = this;
			var wrap = $(config.selector),
				listWrap = wrap.find('.multimsg-wrap');

			//点击添加列表
			wrap.on('click', '.multimsg-add', function(e){
				listWrap.append(TC.makeMsg({
					msgDel: config.msgDel,
					msgSelectTmpl: config.msgSelectTmpl,
					useTmpl: config.useTmpl,
					tmplUrl: config.tmplUrl,
					tmplData: config.tmplData,
					tipStr: config.tipStr,
					maxLength: config.maxLength
				}));

				if($(this).parent().prev().children().length >= config.max){
					$(this).parent().hide();
				}
			});

			//删除一行
			wrap.on('click', '.multimsg-del', function(e){
				$(this).parent().fadeOut(function() {
					$(this).remove();

					if($(this).parent().parent().children().length < config.max){
						wrap.find('.multimsg-add').parent().show();
					}
				});
			});

			//初始化一个不能删除的msg
			listWrap.append(TC.makeMsg({
				noDel: true,
				msgDel: config.msgDel,
				msgSelectTmpl: config.msgSelectTmpl,
				useTmpl: config.useTmpl,
				tmplUrl: config.tmplUrl,
				tmplData: config.tmplData,
				tipStr: config.tipStr,
				maxLength: config.maxLength
			}));
		},

		makeNumFile: function(config){
			S.mix(config, {
				msgDel: getText('删除'),
				msgUpload: getText('上传'),
				msgOr: getText('或'),
				msgPleaseSelect: getText('请选择号码文件'),
				msgRource: null,
				numRource: 1,
				uploadUrl: null,
				uploadName: null,
				maxSize: null,
				filter: null,
				dataAreaList: null,
				selector: null,
				useArea: true,
				areaDisabled: false,
				useSelectLib: true
			}, false);

			var wrap =$('<div class="numberFile-div">'
							+ '<span class="flash-hole"></span>'
							+ '<a href="javascript:;" class="wad-link del-numfile">' + config.msgDel + '</a>'
							+ '<div class="numberFile-hole">'
								+ '<a href="javascript:;" class="wad-link btn1-upload">' + config.msgUpload + '</a>'
								+ (config.useSelectLib ? ' <span>' + config.msgOr + '</span> '
								+ '<a href="javascript:;" class="wad-link select-numfile">' + config.msgPleaseSelect + '</a>' : '')
							+ '</div>'
							+ '<div class="numberFile-state"></div>'
							+ '<div class="red numberFile-error"></div>'
							+ '<span class="clear-both"></span>'
						+ '</div>');
			
			wrap.find('.numberFile-state').hide();
			wrap.find('.numberFile-error').hide();
			function complete(mark){
				mark = $.parseJSON(mark);
				if(mark.resultCode){
					wrap.find('.numberFile-state').html(makeResult(mark));
					wrap.find('.numberFile-error').hide();
				}else{
					wrap.find('object').css('left', 0);
					wrap.find('.numberFile-hole').show();
					wrap.find('.numberFile-state').hide();
					wrap.find('.numberFile-error').show().html(mark.resultMsg);
				}
			}
			function makeResult(mark){
				return $('<input type="hidden" value="' + mark.key + '" class="upload-ok" />'
						+ '<p><span class="file-th">文件名: </span><span class="file-name" title="' + mark.fileName + '">' + mark.fileName + '</span></p>'
						+ '<p><span class="file-th">预计行数: </span>' + mark.lineCount + '</p>'
						+ (config.useArea ? '<p><span class="file-th">归属地: </span>' + makeAreaSelect() + '</p>' : '')
						+ '<p><span class="file-th">查看: </span><a class="wad-link" href="javascript:;" onclick="Util.startDownload(\'' + mark.url + '\')">下载</a></p>').find('select').val(mark.localID).end();
			}
			function makeAreaSelect(){
				return '<select class="select1"' + (config.areaDisabled ? ' disabled="disabled"' : '') + '>' + S.map(config.dataAreaList, function(v, i, o){
					return '<option value="' + v.areaId + '">' + v.areaName + '</option>';
				}).join('') + '</select>';
			}

			Autocomplete.init({
				url: 'busiparams/dataNumLibMagAction!findByNoAuthority.do',
				data: 'dataNumLibMagQueryForm.userId=&dataNumLibMagQueryForm.blur=1&perPageNum=15&currPage=1&dataNumLibMagQueryForm.numType=' + config.numType,
				varSearch: 'dataNumLibMagQueryForm.originalFileName',
				isInnerSearch: true,
				focusClear: true,
				click: function(item){
					wrap.find('object').css('left', -1000);
					wrap.find('.numberFile-hole').hide();
					wrap.find('.numberFile-state').show();
					wrap.find('.numberFile-state').html(getText('正在处理文件格式...'));
					$.post(config.uploadUrl, {
						'fileForm.dataNumLibID': item.listId,
						'fileForm.numLibName': item.fileName,
						'fileForm.msgRource': config.msgRource,
						'fileForm.numRource': 2
					}, function(mark){
						complete(mark);
					});
				},
				processNoMatch: true,
				process: function(item, idx){
					return '<a title="'
							+ Util.entityHTML('[' + item.numLibName + ']' + item.originalFileName) + '" data-idx="'
							+ idx + '" href="javascript:;" class="autocomp-a">'
							+ Util.entityHTML('[' + item.numLibName + ']' + item.originalFileName)
							+ '</a>';
				}
			}).attach(wrap.find('a.select-numfile'));

			//延迟,让它放到dom中再加载flash
			setTimeout(function(){
				FileUpload.init({
					selector: wrap.find('.flash-hole'),
					posturl: config.uploadUrl,
					upload_name: config.uploadName,
					max_size: config.maxSize,
					filter: config.filter,
					width: 76,
					height: 26,
					handles: {
						funcSelected: function(){
							wrap.find('object').css('left', -1000);
							wrap.find('.numberFile-hole').hide();
							wrap.find('.numberFile-state').show();
						},
						funcData: function(){
							return {
								'fileForm.numRource': config.numRource,
								'fileForm.msgRource': config.msgRource
							};
						},
						funcProgress: function(percent){
							if(percent != 100){
								wrap.find('.numberFile-state').html(percent + '%');
							}else{
								wrap.find('.numberFile-state').html(getText('上传完成, 正在处理文件格式...'));
							}
						},
						funcUploaded: function(){
							wrap.find('.numberFile-state').html(getText('上传完成, 正在处理文件格式...'));
						},
						funcComplete: complete
					}
				});
			}, 10);
			
			return wrap;
		},
		initNumFile: function(config){
			S.mix(config, {
				msgDel: getText('删除'),
				msgUpload: getText('上传'),
				msgOr: getText('或'),
				msgPleaseSelect: getText('请选择号码文件'),
				msgRource: null,
				numRource: 1,
				uploadUrl: null,
				uploadName: null,
				maxSize: null,
				filter: null,
				dataAreaList: null,
				selector: null,
				msgRource: null,
				max: null,
				useArea: true,
				areaDisabled: false,
				useSelectLib: true
			}, false);

			var wrap = $(config.selector), TC = this;

			wrap.on('click', '.del-numfile', function(e){
				$(this).parent().remove();
				if(wrap.children().length < config.max){
					wrap.next().show();
				}
			});

			wrap.next().on('click', '.numberFile-add', function(e){
				wrap.append(TC.makeNumFile(config));

				if(wrap.children().length >= config.max){
					$(this).parent().hide();
				}
			});
		},

		makeNumSeg: function(config){
			S.mix(config, {
				msgDel: getText('删除'),
				msgArea: getText('地区'),
				dataAreaList: null,
				selector: null,
				max: null,
				areaDisabled: false,
				useArea: true
			}, false);

			function makeAreaSelect(){
				return '<select class="select1"' + (config.areaDisabled ? ' disabled="disabled"' : '') + '>' + S.map(config.dataAreaList, function(v, i, o){
					return '<option value="' + v.areaId + '">' + v.areaName + '</option>';
				}).join('') + '</select>';
			}

			var wrap =$('<div class="numberSeg-div">'
							+ '<div class="numberSeg-hole">'
								+ '<input type="text" name="" value="" class="text1" /> '
								+ (config.useArea ? config.msgArea + makeAreaSelect() : '')
							+ '</div>'
							+ '<a href="javascript:;" class="wad-link del-numseg">' + config.msgDel + '</a>'
							+ '<span class="clear-both"></span>'
						+ '</div>');
			Autocomplete.init({
				url: 'namelist/dataNumSegMagAction!findByNoAuthority.do',
				data: 'form.areaId=-1&form.userId=&form.blur=1&perPageNum=15&currPage=1',
				varSearch: 'form.numSegment',
				focusClear: true,
				click: function(item){
					wrap.find('select').val(item.areaId);
				},
				process: function(item, idx){
					return item.numSegment;
				}
			}).attach(wrap.find('input'));
			return wrap;
		},
		initNumSeg: function(config){
			S.mix(config, {
				msgDel: getText('删除'),
				msgArea: getText('地区'),
				dataAreaList: null,
				selector: null,
				max: null,
				areaDisabled: false,
				useArea: true
			}, false);

			var wrap = $(config.selector), TC = this;

			wrap.on('click', '.del-numseg', function(e){
				$(this).parent().remove();
				if(wrap.children().length < config.max){
					wrap.next().show();
				}
			});

			wrap.next().on('click', '.numberSeg-add', function(e){
				wrap.append(TC.makeNumSeg(config));

				if(wrap.children().length >= config.max){
					$(this).parent().hide();
				}
			});
		},

		makeNumSegFile: function(config){
			S.mix(config, {
				msgDel: getText('删除'),
				msgUpload: getText('上传'),
				msgOr: getText('或'),
				msgPleaseSelect: getText('请选择号码文件'),
				msgRource: null,
				numRource: 3,
				uploadUrl: null,
				uploadName: null,
				maxSize: null,
				filter: null,
				dataAreaList: null,
				selector: null
			}, false);

			var wrap =$('<div class="numberFile-div">'
							+ '<span class="flash-hole"></span>'
							+ '<a href="javascript:;" class="wad-link del-numfile">' + config.msgDel + '</a>'
							+ '<div class="numberFile-hole">'
								+ '<a href="javascript:;" class="wad-link btn1-upload">' + config.msgUpload + '</a>'
							+ '</div>'
							+ '<div class="numberFile-state"></div>'
							+ '<div class="red numberFile-error"></div>'
							+ '<span class="clear-both"></span>'
						+ '</div>');
			
			wrap.find('.numberFile-state').hide();
			wrap.find('.numberFile-error').hide();
			function complete(mark){
				mark = $.parseJSON(mark);
				if(mark.resultCode){
					wrap.find('.numberFile-state').html(makeResult(mark));
					wrap.find('.numberFile-error').hide();
				}else{
					wrap.find('object').css('left', 0);
					wrap.find('.numberFile-hole').show();
					wrap.find('.numberFile-state').hide();
					wrap.find('.numberFile-error').show().html(mark.resultMsg);
				}
			}
			function makeResult(mark){
				return $('<input type="hidden" value="' + mark.key + '" class="upload-ok" />'
						+ '<p><span class="file-th">文件名: </span><span class="file-name" title="' + mark.fileName + '">' + mark.fileName + '</span></p>'
						+ '<p><span class="file-th">预计行数: </span>' + mark.lineCount + '</p>'
						+ '<p><span class="file-th">查看: </span><a class="wad-link" href="javascript:;" onclick="Util.startDownload(\'' + mark.url + '\')">下载</a></p>');
			}

			//延迟,让它放到dom中再加载flash
			setTimeout(function(){
				FileUpload.init({
					selector: wrap.find('.flash-hole'),
					posturl: config.uploadUrl,
					upload_name: config.uploadName,
					max_size: config.maxSize,
					filter: config.filter,
					width: 76,
					height: 26,
					handles: {
						funcSelected: function(){
							wrap.find('object').css('left', -1000);
							wrap.find('.numberFile-hole').hide();
							wrap.find('.numberFile-state').show();
						},
						funcData: function(){
							return {
								'fileForm.numRource': config.numRource,
								'fileForm.msgRource': config.msgRource
							};
						},
						funcProgress: function(percent){
							if(percent != 100){
								wrap.find('.numberFile-state').html(percent + '%');
							}else{
								wrap.find('.numberFile-state').html(getText('上传完成, 正在处理文件格式...'));
							}
						},
						funcUploaded: function(){
							wrap.find('.numberFile-state').html(getText('上传完成, 正在处理文件格式...'));
						},
						funcComplete: complete
					}
				});
			}, 10);
			
			return wrap;
		},
		initNumSegFile: function(config){
			S.mix(config, {
				msgDel: getText('删除'),
				msgUpload: getText('上传'),
				msgOr: getText('或'),
				msgPleaseSelect: getText('请选择号码文件'),
				msgRource: null,
				numRource: 3,
				uploadUrl: null,
				uploadName: null,
				maxSize: null,
				filter: null,
				dataAreaList: null,
				selector: null,
				msgRource: null,
				max: null
			}, false);

			var wrap = $(config.selector), TC = this;

			wrap.on('click', '.del-numfile', function(e){
				$(this).parent().remove();
				if(wrap.children().length < config.max){
					wrap.next().show();
				}
			});

			wrap.next().on('click', '.numberSegFile-add', function(e){
				wrap.append(TC.makeNumSegFile(config));

				if(wrap.children().length >= config.max){
					$(this).parent().hide();
				}
			});
		},

		makeContentFrom: function(config){
			S.mix(config, {
				noDel: false,
				msgDel: '',
				selector: null,
				max: null
			}, false);
		}
	};
});
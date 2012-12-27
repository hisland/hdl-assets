define(['ui/tip', './popConfig', './popEvent'], function(Tip, popup){
	return {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addAddButton: function(config){
			S.mix(config, {
				grid: null,
				icon: 'add',
				text: getText('添加'),
				enable: null,
				url: null,
				form_url: null,
				title: null,
				callback: null,
				prefix: null
			}, false);
			
			if(!WAD.checkPrefix('A')){
				return ;
			}

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : function(e, checkedItems) {
					WAD.showPop({
						url : config.url,
						form_url: config.form_url,
						title : config.title,
						grid: config.grid,
						callback: config.callback
					});
				}
			});
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addModifyButton: function(config){
			S.mix(config, {
				grid: null,
				icon: 'edit',
				text: getText('修改'),
				enable: '=1',
				url: null,
				form_url: null,
				title: null,
				idKey: null,
				postIdKey: null
			}, false);

			//postIdKey和idKey相同处理
			if(!config.postIdKey){
				config.postIdKey = config.idKey;
			}
			
			if(!WAD.checkPrefix('M')){
				return ;
			}

			function click(e, checkedItems){
				WAD.showPop({
					url : config.url + '?' + config.postIdKey + '=' + checkedItems[0][config.idKey],
					form_url: config.form_url,
					title : config.title,
					grid: config.grid
				});
			}

			config.grid.$tbody.on('dblclick', 'tr', config.grid, function(e){
				if($(e.target).is('td, div') && this.rawData.enable_check !== false && WAD.checkPrefix('M')){
					click.call(this, e, [this.rawData]);
				}
			});

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : click
			});
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addDeleteButton: function(config){
			S.mix(config, {
				grid: null,
				icon: 'del',
				text: getText('删除'),
				enable: '>0',
				url: null,
				confirmText: null,
				idKey: null,
				nameKey: null,
				delayLoad: 0,
				postIdKey: 'delForm.recordId',
				postNameKey: 'delForm.tmpName'
			}, false);
			
			if(!WAD.checkPrefix('D')){
				return ;
			}

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : function(e, checkedItems) {
					Tip.confirm(config.confirmText, function(rs) {
						if (rs) {
							var dt = [];
							S.each(checkedItems, function(v, i, o) {
								dt.push({
									name : config.postIdKey,
									value : v[config.idKey]
								}, {
									name : config.postNameKey,
									value : v[config.nameKey]
								});
							});
							WAD.save({
								url: config.url,
								data: dt,
								onSuccess: function(){
									if(config.delayLoad){
										setTimeout(function(){
											config.grid.ajaxLoad();
										}, config.delayLoad);
									}else{
										config.grid.ajaxLoad();
									}
								}
							});
						}
					});
				}
			});
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addExportButton: function(config){
			S.mix(config, {
				grid: null,
				icon: 'export',
				text: getText('导出'),
				enable: function(rs){
					return !!rs.grid.data.totals;
				},
				url: null,
				postNameKey: 'exportForm.tableHead'
			}, false);
			
			if(!WAD.checkPrefix('O')){
				return ;
			}

			//点击下拉框中模板
			popup.$div.find("a.autocomp-a").unbind('click').bind('click',function(){
				//需要grid的查询条件加上显示的列数据
				var dt = S.clone(config.grid.param).concat(config.grid.getTableHead(config.postNameKey));
				dt.push({
					 name: 'exportFileType'
					,value: $(this).attr("type_id")
				});
				WAD.save({
					url: config.url,
					data: dt,
					onSuccess: function(){
						config.grid.ajaxLoad();
					}
				});
			});
			
			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : function(e, checkedItems) {
					$(this).addClass("tempfileexp");
					popup.align($(this));
					popup.$div.show();
				}
			});
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addButton: function(config){
			S.mix(config, {
				grid: null,
				icon: null,
				text: null,
				enable: null,
				click: null,
				suffix: null
			}, false);
			
			if(config.suffix !== 'NOT_CHECK' && !WAD.checkPrefix(config.suffix)){
				return ;
			}

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : config.click
			});
		},
		/**
		 * 将菜单的prefix与传入的suffix串起来在权限表中检查有没有权限
		 * @param suffix 权限后缀, A,M,D...
		 * @return true表示有权限, false表示没权限
		 */
		checkPrefix: function(suffix){
			//prefix为 SYSUSER_, BLK_LISTS_ ...
			var prefix = $('#menu-wrap a.menu-item-hover').attr('prefix');
			return !!this.rightsMap[prefix+suffix];
		}
	};
});
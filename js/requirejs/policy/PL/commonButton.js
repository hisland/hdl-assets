define(['ui/tip'], function(Tip){
	return {
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addAddButton: function(config){
			var Common = this;
			
			S.mix(config, {
				grid: null,
				icon: 'add',
				text: '添加',
				enable: null,
				url: null,
				form_url: null,
				title: null,
				callback: null
			}, false);

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : function(e, checkedItems) {
					Common.showPop({
						url : config.url,
						form_url: config.form_url,
						title : config.title,
						grid: config.grid,
						onHide: config.callback
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
			var Common = this;
			
			S.mix(config, {
				grid: null,
				icon: 'edit',
				text: '修改',
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

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : function(e, checkedItems) {
					Common.showPop({
						url : config.url,
						data: config.postIdKey + '=' + checkedItems[0][config.idKey],
						form_url: config.form_url,
						title : config.title,
						grid: config.grid,
						onHide: config.callback
					});
				}
			});
		},
		/**
		 * 
		 * @param 
		 * @return 
		 */
		addDeleteButton: function(config){
			var Common = this;
			
			S.mix(config, {
				grid: null,
				icon: 'del',
				text: '删除',
				enable: '>0',
				url: null,
				confirmText: null,
				idKey: null,
				nameKey: null,
				postIdKey: 'delForm.recordId',
				postNameKey: 'delForm.tmpName'
			}, false);

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
							Common.save({
								url: config.url,
								data: dt,
								onComplete: function(){
									config.grid.ajaxLoad();
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
			var Common = this;
			
			S.mix(config, {
				grid: null,
				icon: 'export',
				text: '导出',
				enable: null,
				url: null,
				postNameKey: 'exportForm.tableHead'
			}, false);

			config.grid.addButton({
				icon : config.icon,
				text : config.text,
				enable : config.enable,
				click : function(e, checkedItems) {
					//需要grid的查询条件加上显示的列数据
					var dt = S.clone(config.grid.param).concat(config.grid.getTableHead(config.postNameKey));
					
					Common.save({
						url: config.url,
						data: dt
					});
				}
			});
		}
	};
});
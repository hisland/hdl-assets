/**********************************************************************************************
 * 名称: 增加KISSY一些自定义方法
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * 增加KISSY一些自定义方法
 *
 * 需要设置:
 *		S.css_base_path;
 *
 * API:
 *		S.useCSS(modNames, callback);
 */

KISSY.add('kissy-patcher', function(S, undef) {
	S.mix(S, {
		 useCSS: function(modNames, callback){
			var names = modNames.replace(/\s+/g, '').split(','), mods = {};
			S.each(names, function(v){
				mods[v] = {
					path: S.css_base_path + '/' + v + '/' + v + '.css',
					charset: 'utf-8'
				};
			});
			S.add(mods);
			S.use(modNames, callback);
		}
	});
});
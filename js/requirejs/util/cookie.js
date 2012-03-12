/**
 * 操作cookie
 * <pre><code>
 * API:
 *		var Cookie = require('util/cookie');
 *		Cookie.set('name', 'value');
 *		Cookie.get('name');
 *		Cookie.del('name');
 * </code></pre>
 */

define({
	/**
	 * 设置cookie
	 * @param sName String
	 * @param sValue String
	 * @param oExpires Date
	 * @param sPath String
	 * @param sDomain String
	 * @param bSecure true|false
	 * @return 
	 */
	set: function(sName, sValue, oExpires, sPath, sDomain, bSecure){
		var sCookie = sName + '=' + encodeURIComponent(sValue);
		if(oExpires){
			sCookie += '; expires=' + oExpires.toGMTString();
		}
		if(sPath){
			sCookie += '; path=' + sPath;
		}
		if(sDomain){
			sCookie += '; domain=' + sDomain;
		}
		if(bSecure){
			sCookie += '; secure';
		}
		document.cookie = sCookie;
	},
	/**
	 * 获得cookie
	 * @param sName String
	 * @return 
	 */
	get: (sName){
		var sRE = '(?:; )?' + sName + '=([^;]*);?';
		var oRE = new RegExp(sRE);

		if(oRE.test(document.cookie)){
			return decodeURIComponent(RegExp['$1']);
		}else{
			return null;
		}
	},
	/**
	 * 删除cookie
	 * @param sName String
	 * @param sPath String
	 * @param sDomain String
	 * @return 
	 */
	del: (sName, sPath, sDomain){
		setCookie(sName, '', new Date(0), sPath, sDomain);
	}
});
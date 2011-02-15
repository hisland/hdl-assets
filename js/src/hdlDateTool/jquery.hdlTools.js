//给String类加上trim函数
String.prototype.lTrim = function(){return this.replace(/^\s*/,'')}
String.prototype.rTrim = function(){return this.replace(/\s*$/,'')}
String.prototype.trim = function(){return this.replace(/^\s*|\s*$/g,'')}

//给Date类加上getDateString函数,获取形如'2010-09-01'形式的日期字符串
Date.prototype.getDateString = function(){
	var y = this.getFullYear()+'',
		m = this.getMonth()+1+'',
		d = this.getDate()+'';
	m = m.length==1 ? '0'+m : m;
	d = d.length==1 ? '0'+d : d;
	return y+'-'+m+'-'+d;
}
//给Date类加上getTimeString函数,获取形如'09:05:02'形式的时间字符串
Date.prototype.getTimeString = function(){
	var h = this.getHours()+'',
		m = this.getMinutes()+'',
		s = this.getSeconds()+'';
	h = h.length==1 ? '0'+h : h;
	m = m.length==1 ? '0'+m : m;
	s = s.length==1 ? '0'+s : s;
	return h+':'+m+':'+s;
}
//给Date类加上getDateTimeString函数,获取形如'2010-09-01 09:05:02'形式的日期时间字符串
Date.prototype.getDateTimeString = function(){
	return this.getDateString()+' '+this.getTimeString();
}

//给String类加上3个获取时间的函数,如果字符串可以转换成时间对象的话
String.prototype.getDateString = function(){return new Date(this).getDateString()}
String.prototype.getTimeString = function(){return new Date(this).getTimeString()}
String.prototype.getDateTimeString = function(){return new Date(this).getDateTimeString()}


/**********************************************************************************************
 *from到to由快到慢的计算函数,返回当前from到to需要增加的数字(为负则是需要减去的数字,统一用加法)
 *from  : 开始数字
 *to    : 结束数字
 *speed : 速度,越大越慢
 */
function tween(from,to,speed){
	speed = speed<10 ? 10 : speed;
	return from>to ? Math.floor((to-from)/speed) : Math.ceil((to-from)/speed);
}

/**********************************************************************************************
 *encode所有的字符
 *str  : 需要编码的字符串
 *     : 把 !'()*-._~ 这些不会编码的一起使用%XXX的形式编码
 */
function encodeAll(str){
	str = encodeURIComponent(str);
	return str.replace(/[!'()*-._~]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
}

/**********************************************************************************************
 *escape所有的字符
 *str  : 需要编码的字符串
 *     : 把 *+-./@_ 这些不会编码的一起使用%XXX的形式编码
 */
function escapeAll(str){
	str = escape(str);
	return str.replace(/[*+-./@_]/g,function(a){return "%"+a.charCodeAt(0).toString(16).toUpperCase()});
}

//将一些需要的函数放到jquery命名空间上
$.extend({
	tween     : tween,
	encodeAll : encodeAll,
	escapeAll : escapeAll
});
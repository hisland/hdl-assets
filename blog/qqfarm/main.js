//作物数据
var cropData = [,{"cId":1,"cName":"\u8349\u8393","cType":"1","growthCycle":"86400","maturingTime":"2","expect":1296,"output":"24","sale":"27","price":"605","cLevel":"10","cropExp":"20","vip":"1"}
				,{"cId":2,"cName":"\u767d\u841d\u535c","cType":"1","growthCycle":"36000","maturingTime":"1","expect":272,"output":"16","sale":"17","price":"125","cLevel":"0","cropExp":"15","vip":"1"}
				,{"cId":3,"cName":"\u80e1\u841d\u535c","cType":"1","growthCycle":"46800","maturingTime":"1","expect":357,"output":"17","sale":"21","price":"163","cLevel":"0","cropExp":"18","vip":"1"}
				,{"cId":4,"cName":"\u7389\u7c73","cType":"1","growthCycle":"50400","maturingTime":"1","expect":391,"output":"17","sale":"23","price":"175","cLevel":"3","cropExp":"19","vip":"1"}
				,{"cId":5,"cName":"\u571f\u8c46","cType":"1","growthCycle":"54000","maturingTime":"1","expect":432,"output":"18","sale":"24","price":"188","cLevel":"4","cropExp":"20","vip":"1"}
				,{"cId":6,"cName":"\u8304\u5b50","cType":"1","growthCycle":"57600","maturingTime":"1","expect":500,"output":"20","sale":"25","price":"237","cLevel":"5","cropExp":"21","vip":"1"}
				,{"cId":7,"cName":"\u756a\u8304","cType":"1","growthCycle":"61200","maturingTime":"1","expect":546,"output":"21","sale":"26","price":"251","cLevel":"6","cropExp":"22","vip":"1"}
				,{"cId":8,"cName":"\u8c4c\u8c46","cType":"1","growthCycle":"64800","maturingTime":"1","expect":594,"output":"22","sale":"27","price":"266","cLevel":"7","cropExp":"23","vip":"1"}
				,{"cId":9,"cName":"\u8fa3\u6912","cType":"1","growthCycle":"72000","maturingTime":"1","expect":672,"output":"24","sale":"28","price":"296","cLevel":"8","cropExp":"25","vip":"1"}
				,{"cId":10,"cName":"\u5357\u74dc","cType":"1","growthCycle":"79200","maturingTime":"1","expect":750,"output":"25","sale":"30","price":"325","cLevel":"9","cropExp":"27","vip":"1"}
				,{"cId":11,"cName":"\u82f9\u679c","cType":"1","growthCycle":"75600","maturingTime":"2","expect":1104,"output":"23","sale":"24","price":"578","cLevel":"10","cropExp":"18","vip":"1",'time':32400}
				,,{"cId":13,"cName":"\u8461\u8404","cType":"1","growthCycle":"165600","maturingTime":"3","expect":4089,"output":"29","sale":"47","price":"1978","cLevel":"15","cropExp":"30","vip":"1",'time':72000}
				,{"cId":14,"cName":"\u897f\u74dc","cType":"1","growthCycle":"100800","maturingTime":"2","expect":1566,"output":"27","sale":"29","price":"708","cLevel":"11","cropExp":"23","vip":"1",'time':46800}
				,{"cId":15,"cName":"\u9999\u8549","cType":"1","growthCycle":"111600","maturingTime":"2","expect":1856,"output":"29","sale":"32","price":"900","cLevel":"12","cropExp":"25","vip":"1",'time':50400}
				,,,{"cId":18,"cName":"\u6843\u5b50","cType":"1","growthCycle":"151200","maturingTime":"2","expect":2560,"output":"32","sale":"40","price":"1200","cLevel":"13","cropExp":"33","vip":"1",'time':64800}
				,{"cId":19,"cName":"\u6a59\u5b50","cType":"1","growthCycle":"133200","maturingTime":"3","expect":3198,"output":"26","sale":"41","price":"1587","cLevel":"14","cropExp":"25","vip":"1",'time':57600}
				,,,,{"cId":23,"cName":"\u77f3\u69b4","cType":"1","growthCycle":"187200","maturingTime":"3","expect":4860,"output":"30","sale":"54","price":"2425","cLevel":"16","cropExp":"34","vip":"1",'time':79200}
				,,,{"cId":26,"cName":"\u67da\u5b50","cType":"1","growthCycle":"219600","maturingTime":"3","expect":5742,"output":"33","sale":"58","price":"2855","cLevel":"17","cropExp":"39","vip":null,'time':93600}
				,{"cId":27,"cName":"\u83e0\u841d","cType":"1","growthCycle":"230400","maturingTime":"3","expect":6510,"output":"35","sale":"62","price":"3480","cLevel":"18","cropExp":"40","vip":null,'time':93600}
				,,{"cId":29,"cName":"\u6930\u5b50","cType":"1","growthCycle":"198000","maturingTime":"4","expect":7020,"output":"27","sale":"65","price":"3720","cLevel":"19","cropExp":"32","vip":null,'time':82800}
				,,{"cId":31,"cName":"\u846b\u82a6","cType":"1","growthCycle":"219600","maturingTime":"4","expect":8520,"output":"30","sale":"71","price":"4742","cLevel":"20","cropExp":"36","vip":null,'time':93600}
				,,{"cId":33,"cName":"\u706b\u9f99\u679c","cType":"1","growthCycle":"252000","maturingTime":"4","expect":9856,"output":"32","sale":"77","price":"5356","cLevel":"21","cropExp":"41","vip":null,'time':104400}
				,{"cId":34,"cName":"\u6a31\u6843","cType":"1","growthCycle":"259200","maturingTime":"4","expect":10296,"output":"33","sale":"78","price":"5527","cLevel":"22","cropExp":"42","vip":null,'time':108000}
				,{"cId":35,"cName":"\u8354\u679d","cType":"1","growthCycle":"277200","maturingTime":"4","expect":11696,"output":"34","sale":"86","price":"6588","cLevel":"23","cropExp":"44","vip":null,'time':126000}
				,,,{"cId":38,"cName":"\u6728\u74dc","cType":1,"growthCycle":165600,"maturingTime":5,"expect":11200,"output":28,"sale":80,"price":6975,"cLevel":24,"cropExp":26,"vip":null,'time':72000}
				,{"cId":39,"cName":"\u6768\u6843","cType":1,"growthCycle":165600,"maturingTime":5,"expect":11890,"output":29,"sale":82,"price":7576,"cLevel":25,"cropExp":27,"vip":null,'time':72000}
				,{"cId":40,"cName":"\u7267\u8349","cType":"1","growthCycle":"28800","maturingTime":"1","expect":150,"output":"25","sale":"6","price":"120","cLevel":"0","cropExp":"10","vip":null}
				,{"cId":41,"cName":"\u73ab\u7470","cType":1,"growthCycle":64800,"maturingTime":1,"expect":594,"output":22,"sale":27,"price":266,"cLevel":7,"cropExp":23,"vip":null}
				]
function getSeedInfo(){
	//从服务器获取作物信息
	var str = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=repertory&act=getSeedInfo',getKey());
	str = eval("("+str+")");

	//按cId从小到大排列
	str.sort(function(a,b){return a.cId - b.cId;});

	//将中间没有的位置插入undefined值
	var i=0;
	var maxLen = str[str.length-1].cId;
	while(i<maxLen){
		if(i != str[i].cId){
			str.splice(i,0,undefined);
		}
		i++;
	}

	//将全局数据设置为最新数据
	cropData = str;

	//将作物信息转换成json表示,可选
	//for(var i=0;i<str.length;i++){
	//    if(str[i]){
	//		var rs=[];
	//		for(var j in str[i]){
	//			rs.push('"'+j+'":"'+str[i][j]+'"');
	//		}
	//		str[i] = '{'+rs.join(',')+'}';
	//	}
	//}
	//var cropDataString = '['+str.join(',')+']';
}

//获取iframe里面的数据(iframe的ID,回调函数)
function getIframeData(id,callback){
	var ifr = $('qqname');
	if(!ifr){
		ifr = document.createElement('iframe');
		ifr.id = 'qqname';
		ifr.src = '';
		ifr.style.display = 'none';
		document.body.appendChild(ifr);
	}
	ifr.src = 'http://base.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins='+id+'&get_nick=1';
	addEvent(ifr,'load',function(){

		//FF下打开跨越访问权限
		if((/firefox/i).test(navigator.userAgent)) netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");

		//将页面的内容传回给回调函数
		callback(ifr.contentWindow.document.body.innerHTML);
	})
}

//检测是否偷过了
function stolen(n){
	for(var i in n)
		if(i == uId)
			return 1;
	return 0;
}

//全局属性方便使用
//主人信息
var QQID = 273698404;
var fName = 'ジ冗黙..ōō';
var uId = '';

//目标信息
var tName = '';
var ownerId = '';
var dog = 0;


//主人构造函数
function master(){

	//从服务器获取数据
	var s = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=user&act=run',getKey());
	var me = this;

	//检查错误
	checkError(s);

	//结果转换成对象并进行下列操作
	s = eval('('+s+')');
	
	me.url = 'http://happyfarm.qzone.qq.com/api.php?mod=user&act=run&flag=1';
	for(var i in s.user)
		me[i] = s.user[i];

	//设置全局变量,方便后面建立自己农场使用
	uId = me.uId;
	tName = me.userName;
	ownerId = me.uId;

//	if(!me.userName){
//		//根据QQ号从好友买卖中找出当前用户的用户名全称
//		var s2 = sendRequest('http://base.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins='+QQID+'&get_nick=1');
//
//		//检查错误
//		checkError(s2);
//		s2 = eval('('+s2.match(/{.*}/)[0]+')');
//		fName = s2[QQID][s2[QQID].length-1];
//	}else{
//		fName = me.userName;
//	}


	//算自己的经验等级
	me.level = 0;
	me.expNow = 0;
	me.expNeed = 0;
	for(var tmp=0;tmp < me.exp;me.level++){
		me.expNeed = 200*(me.level+1);
		tmp += me.expNeed;
		if(tmp > me.exp){
			tmp -= me.expNeed;
			me.expNow = me.exp - tmp;
			break;
		}
	}

	//建自己的农场
	me.farm = new farm(s.farmlandStatus);

	//农场加载成功后加载好友列表
	me.farm.oncomplete = function(){
		me.loadFriends();
	}
}

//加载好友列表
master.prototype.loadFriends = function(){			
	var s = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=friend',getKey()+'&refresh=true');
	var me = this;

	//检查错误
	checkError(s);

	s = eval('('+s+')');

	//将自己从列表中移除
	for(var i=0;i<s.length;i++){
		if(s[i].userId == uId){
			s.splice(i,1);
			break;
		}
	}

	//将朋友按经验从大到小排序
	s.sort(function(a,b){return b.exp - a.exp;})

	var friends = this.friends = new Friends;
	var i=0;
	function load(){
		if(i < s.length){
			friends[i] = new friend(s[i]);
			friends[i].oncomplete = function(){
				i++;
				setTimeout(load,numBetween(800,1000));
			}
		}else{

			//好友列表加载完毕,开始自动监视农场
			autoFarm();
		}
	}
	load();
}

//朋友列表构造函数
function Friends(){}

//使Friends用起来像数组
Friends.prototype.push = [].push;


//朋友构造函数 参数形式:{"userId":273004395,"userName":"\u30b8\u5197\u9ed9..","headPic":"http:\/\/imgcache.qq.com\/qzone_v4\/client\/userinfo_icon\/1002.gif","yellowlevel":0,"yellowstatus":0,"exp":9772,"money":7029}
function friend(s){
	var me = this;

	//根据传入数据设置好友的信息
	for(var i in s)
		me[i] = s[i];
	me.url = 'http://happyfarm.qzone.qq.com/api.php?mod=user&act=run&flag=1&ownerId='+this.userId;

	//从服务器获取农场数据
	var rs = sendRequest(me.url);
	
	//检查错误
	checkError(rs);

	rs = eval('('+rs+')');

	//设置全局2个变量,方便后面建立自己农场使用
//	//自己
//	if(me.userId == uId){
//
//		//是自己的话直接返回,前面已经处理过了,加延迟避免函数没注册产生调用错误
//		setTimeout(function(){me.oncomplete()},numBetween(300,500));
//		return;
//	
//	//朋友
//	}else{
		tName = me.userName;
		ownerId = me.userId;
//	}

	//算自己的经验等级
	me.level = 0;
	me.expNow = 0;
	me.expNeed = 0;
	for(var tmp=0;tmp < me.exp;me.level++){
		me.expNeed = 200*(me.level+1);
		tmp += me.expNeed;
		if(tmp > me.exp){
			tmp -= me.expNeed;
			me.expNow = me.exp - tmp;
			break;
		}
	}

	//设置狗的状态
	if(rs.dog && !rs.dog.isHungry) dog = 1;
	else dog = 0;

	//建立农场
	me.farm = new farm(rs.farmlandStatus);

	//农场加载成功后加载好友列表
	me.farm.oncomplete = function(){
		friendsTable(me);
		me.oncomplete();
	}

}

//农场构造函数(农场状态 farmlandStatus)
function farm(s){
	var i = 0;
	var f = this;
//	alert(ownerId+'---'+tName+'---'+uId+'---'+fName+'---'+dog);
	function check(){
		if(i < s.length){

			var rs;
			//如果是自己的农场,则采取收获操作
			if(ownerId == uId && s[i].k>0){
				rs = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=farmlandstatus&act=harvest',getKey()+'&place='+i+'&ownerId='+ownerId);

				//检查错误
				checkError(rs);

				//记录返回数据
				log(rs);
				
				//进行清理操作
				rs = eval('('+rs+')');
				s[i].k = rs.status.output;
				setTimeout(check,numBetween(500,800));
				return;
			
			//如果 有产量 并且 剩余数量大于最小数量 并且 没有狗 并且 没有偷过,就偷
			}else if(s[i].k>0 && (s[i].m>s[i].l) && !dog && !stolen(s[i].n)){
				rs = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=farmlandstatus&act=scrounge',getKey()+'&place='+i+'&fName='+encodeAll(fName)+'&tName='+encodeAll(tName)+'&ownerId='+ownerId);
				
				//检查错误
				checkError(rs);

				//记录返回数据
				log(rs);
				
				//进行清理操作
				rs = eval('('+rs+')');
				s[i].n = rs.status.thief;
				setTimeout(check,numBetween(500,800));
				return;

			//果实没有产量(没有成熟)并且有草,则锄草
			}else if(s[i].k==0 && s[i].f > 0){
				rs = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=farmlandstatus&act=clearWeed',getKey()+'&place='+i+'&fName='+encodeAll(fName)+'&tName='+encodeAll(tName)+'&ownerId='+ownerId);
				
				//检查错误
				checkError(rs);

				//记录返回数据
				log(rs);

				//进行清理操作
				rs = eval('('+rs+')');
				s[i].f = rs.weed;
				setTimeout(check,numBetween(500,800));
				return;
			
			//果实没有产量(没有成熟)并且有虫,则除虫
			}else if(s[i].k==0 && s[i].g > 0){
				rs = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=farmlandstatus&act=spraying',getKey()+'&place='+i+'&fName='+encodeAll(fName)+'&tName='+encodeAll(tName)+'&ownerId='+ownerId+'&tId=0');
				
				//检查错误
				checkError(rs);

				//记录返回数据
				log(rs);

				//进行清理操作
				rs = eval('('+rs+')');
				s[i].g = rs.pest;
				setTimeout(check,numBetween(500,800));
				return;
			
			//果实没有产量(没有成熟)并且干旱,则浇水
			}else if(s[i].k==0 && s[i].h < 1){
				rs = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=farmlandstatus&act=water',getKey()+'&place='+i+'&fName='+encodeAll(fName)+'&tName='+encodeAll(tName)+'&ownerId='+ownerId);
				
				//检查错误
				checkError(rs);

				//记录返回数据
				log(rs);

				//进行清理操作
				rs = eval('('+rs+')');
				s[i].h = rs.humidity;
				setTimeout(check,numBetween(500,800));
				return;
			
			//没有状态,将当前地存入farm并将增量+1继续,用1ms的延迟是避免前面还没有注册函数就调用产生错误
			}else{
				f.push(s[i++]);
				setTimeout(check,1);
			}
		}else{

			//检查农场完毕,执行完成函数
			f.oncomplete();
		}
	}
	check();
}

//使farm用起来像数组
farm.prototype.push = [].push;


/*结构设置

//工具函数
getKey()				//每次需要的时候自动生成 形式是 farmKey=fd73ecbbd8501a1baa551cc5f774827c&farmTime=1247637920
sendRequest()			//产生HTTP请求并返回结果  采用同步设置(非异步)

//主人属性
master
master.uId					┓
master.userName				┃
master.money				┃
master.headPic				┣━━━此为从服务器返回的形式
master.exp					┃
master.yellowlevel			┃
master.yellowstatus			┛

master.level				//此3个根据master.exp计算得出
master.expNow
master.expNeed

master.dog

master.farm

master.friends[friend,friend,...]

master.loadFriends()		//加载主人好友列表

--------------------------------------------------------------
//朋友
friend
friend.userId				┓
friend.userName				┃
friend.headPic				┃
friend.yellowlevel			┣━━━此为从服务器返回的形式
friend.yellowstatus			┃
friend.exp					┃
friend.money				┛

friend.level				//此3个根据friend.exp计算得出
friend.expNow
friend.expNeed

friend.dog

friend.farm

--------------------------------------------------------------
//农场
farm[field,field,...]

--------------------------------------------------------------

建立主人(等级,经验,金钱...) -> 好友列表(N*(等级,经验,金钱...)) -> 获取单个好友农场(N*(种植作物,状态...)) -> 发现状态进行操作(浇水,锄草,除虫...)

*/
addEvent(window,'load',function(){
		window.me = new master;//建立农场主,其余朋友农场自动加载,并执行一次所有人的更新(摘果实,队状态)操作
});

function autoFarm(){
//	alert('农场加载完毕');

	setTimeout(function(){window.me = new master;},numBetween(20,40)*60*1000);

}
function log(s){

	//显示返回的字符串
//	makeTmp(s);

	var ts = s;


	//进行处理
	s = eval('('+s+')');

	//发现错误提示
	if(s.errorType) alert('遇到错误: '+decodeURI(s.errorContent));

	//没有处理数据,则直接返回
	if(!s.code) alert('无数据处理: '+decodeURI(ts));
	
	var p = document.createElement('p');

	//浇水操作
	if(s.humidity){
		p.className = 'cure';
		p.innerHTML = '<span class="action">除状态</span>给<span class="user">'+tName+'</span>浇水,获得经验+2、金钱+1';
	//锄草操作
	}else if(s.hasOwnProperty('weed')){
		p.className = 'cure';
		p.innerHTML = '<span class="action">除状态</span>给<span class="user">'+tName+'</span>锄草,获得经验+2、金钱+1';
	//除虫操作
	}else if(s.hasOwnProperty('pest')){
		p.className = 'cure';
		p.innerHTML = '<span class="action">除状态</span>给<span class="user">'+tName+'</span>除虫,获得经验+2、金钱+1';
	//偷果实操作
	}else if(s.harvest && s.status.plantTime){
		p.className = 'scrounge';
		p.innerHTML = '<span class="action">摘果实</span>摘<span class="user">'+tName+'</span>'+cropData[s.status.cId].cName+'*'+s.harvest+',价值'+cropData[s.status.cId].sale*s.harvest;
	//收获果实操作
	}else if(s.harvest && !s.status.plantTime){
		p.className = 'scrounge';
		p.innerHTML = '<span class="action">摘果实</span>收获'+cropData[s.status.cId].cName+'×'+s.harvest+',价值'+cropData[s.status.cId].sale*s.harvest+',经验'+cropData[s.status.cId].cropExp;
	}
	$('log').appendChild(p);
	$('log').scrollTop = $('log').scrollHeight;
}
function friendsTable(s){
	var tr = makeTag('tr',[makeTag('td',s.userName),makeTag('td',s.level+'级('+s.expNow+'/'+s.expNeed+')'),makeTag('td',s.money),makeTag('td','35:45'),makeTag('td','<input type="checkbox" />')],s.userId);
	if($(s.userId)){
		var otr = $(s.userId);
		otr.parentNode.replaceChild(tr,otr);
	}else{
		$('friends').getElementsByTagName('tbody')[0].appendChild(tr);
		$('users').scrollTop = $('users').scrollHeight;
	}
}

function makeTag(tag,text,id,className){
	var tag = document.createElement(tag);
	if(typeof text == 'string' || typeof text == 'number'){
		tag.innerHTML = text;
	}else if(text.constructor == Array){
		for(var i=0;i<text.length;i++){
			tag.appendChild(text[i]);
		}
	}else{
		alert('标签'+tag+'#'+id+'.'+className+'内容不是文本也不是元素数组,没有添加');
	}
	if(id) tag.id = id;
	if(className) tag.className = className;
	return tag;
}

function makeTmp(s){
	var p = document.createElement('p');
	p.innerHTML = ownerId+'---'+tName+'---'+uId+'---'+fName+'---'+decodeURI(s);
	$('result').appendChild(p);
	$('result').scrollTop = $('result').scrollHeight;
}

function checkError(s){
//	alert(s);
}



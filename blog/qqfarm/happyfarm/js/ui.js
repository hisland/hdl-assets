//[元素($('a')),目标时间串(12543215465)]
var alarmList = [];
//计时函数,使用了上面的计时列表
function alarmCount(){
	var time,seconds,minutes,hours;
	for(var i=0;i<alarmList.length;i++){
		time = alarmList[i][1] - (new Date).valueOf();
		if(time>0){
			seconds = Math.floor(time/1000)%60;
			minutes = Math.floor(time/60000)%60;
			hours = Math.floor(time/3600000);
			alarmList[i][0].innerHTML = hours+':'+minutes+':'+seconds;
		}else{
			alarmList.splice(i,1);
		}

	}
}
//计时器,使用上面定义的2个对象进行计时操作,可被清除
var countTimer = setInterval(alarmCount,1000);


//获取种子信息
function getSeedsInfo(){
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

	//将作物信息转换成json表示,并存入本地配置文件,可选
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

function autoFarm(){
	
}

addEvent(window,'load',function(){

	//几个地方的tab切换
	tabs($('ver_tabs').getElementsByTagName('li'),[$('qzone'),$('xiaoyou')],'active');
	tabs($('qzone_tabs').getElementsByTagName('li'),[$('qzone_friends'),$('qzone_crops'),$('qzone_recCrops'),$('qzone_recView'),$('qzone_repertory'),$('qzone_config')],'active');
	tabs($('xiaoyou_tabs').getElementsByTagName('li'),[$('xiaoyou_friends'),$('xiaoyou_crops')],'active');

//	window.qzone = QQFarm('qzone');
	addClassName($('tab_qzone'),'online');
	addClassName($('qzone'),'online');
});
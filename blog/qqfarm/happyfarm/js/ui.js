//[Ԫ��($('a')),Ŀ��ʱ�䴮(12543215465)]
var alarmList = [];
//��ʱ����,ʹ��������ļ�ʱ�б�
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
//��ʱ��,ʹ�����涨���2��������м�ʱ����,�ɱ����
var countTimer = setInterval(alarmCount,1000);


//��ȡ������Ϣ
function getSeedsInfo(){
	//�ӷ�������ȡ������Ϣ
	var str = sendRequest('http://happyfarm.qzone.qq.com/api.php?mod=repertory&act=getSeedInfo',getKey());
	str = eval("("+str+")");

	//��cId��С��������
	str.sort(function(a,b){return a.cId - b.cId;});

	//���м�û�е�λ�ò���undefinedֵ
	var i=0;
	var maxLen = str[str.length-1].cId;
	while(i<maxLen){
		if(i != str[i].cId){
			str.splice(i,0,undefined);
		}
		i++;
	}

	//��ȫ����������Ϊ��������
	cropData = str;

	//��������Ϣת����json��ʾ,�����뱾�������ļ�,��ѡ
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

	//�����ط���tab�л�
	tabs($('ver_tabs').getElementsByTagName('li'),[$('qzone'),$('xiaoyou')],'active');
	tabs($('qzone_tabs').getElementsByTagName('li'),[$('qzone_friends'),$('qzone_crops'),$('qzone_recCrops'),$('qzone_recView'),$('qzone_repertory'),$('qzone_config')],'active');
	tabs($('xiaoyou_tabs').getElementsByTagName('li'),[$('xiaoyou_friends'),$('xiaoyou_crops')],'active');

//	window.qzone = QQFarm('qzone');
	addClassName($('tab_qzone'),'online');
	addClassName($('qzone'),'online');
});
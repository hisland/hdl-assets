<?php
	usleep(3000);

	if(!isset($_REQUEST['currPage']) || $_REQUEST['currPage'] == '1'){
		echo <<<EOD
{
	"perPageNum":8,
	"currPage":1,
	"beginNum":1,
	"endNum":8,
	"totals":30,
	"currRecordNum":8,
	"allPage":4,
	"rows":[{
			"recordId":0,
			"firstToBoss":0,
			"cdmaName":"未知业务",
			"status":1,
			"isBi":1,
			"smTypeId":0,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/XXX",
			"biContent":"XXX",
			"typeCheck":1,
			"fsmTypeId":0,
			"processType":2,
			"mobileName":"未知业务",
			"isSp":"0",
			"processBoss":1,
			"enable_check":false,
			"graylistRate":100
		},{
			"recordId":1,
			"firstToBoss":0,
			"cdmaName":"点对点短信",
			"status":1,
			"isBi":1,
			"smTypeId":1,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/MOXYHMD",
			"biContent":"MOXYHMD",
			"typeCheck":1,
			"fsmTypeId":1,
			"processType":2,
			"mobileName":"点对点短信",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":2,
			"firstToBoss":0,
			"cdmaName":"一般SP短信",
			"status":1,
			"isBi":1,
			"smTypeId":2,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/AOXYHMD",
			"biContent":"AOXYHMD",
			"typeCheck":1,
			"fsmTypeId":2,
			"processType":2,
			"mobileName":"梦网SP短信",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":3,
			"firstToBoss":0,
			"cdmaName":"集团用户短信",
			"status":1,
			"isBi":1,
			"smTypeId":3,
			"isUSSD":0,
			"remarks":"1234555555555555",
			"biDirectory":"BI/AOXYHMD",
			"biContent":"AOXYHMD",
			"typeCheck":1,
			"fsmTypeId":3,
			"processType":2,
			"mobileName":"行业SP短信",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":4,
			"firstToBoss":0,
			"cdmaName":"互联互通短信",
			"status":1,
			"isBi":1,
			"smTypeId":4,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/WJHTXYHMD",
			"biContent":"WJHTXYHMD",
			"typeCheck":1,
			"fsmTypeId":4,
			"processType":2,
			"mobileName":"互联互通短信",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":5,
			"firstToBoss":0,
			"cdmaName":"自有业务短信",
			"status":1,
			"isBi":1,
			"smTypeId":5,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/ZYYWXYHMD",
			"biContent":"ZYYWXYHMD",
			"typeCheck":1,
			"fsmTypeId":5,
			"processType":2,
			"mobileName":"自有业务短信",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":6,
			"firstToBoss":0,
			"cdmaName":"省际平台短信",
			"status":1,
			"isBi":0,
			"smTypeId":6,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":6,
			"processType":2,
			"mobileName":"省际短信",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":7,
			"firstToBoss":0,
			"cdmaName":"USSD短信",
			"status":1,
			"isBi":0,
			"smTypeId":7,
			"isUSSD":1,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":7,
			"processType":2,
			"mobileName":"USSD短信",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		}
	]
}
EOD;
	}else if($_REQUEST['currPage'] == '2'){
		echo <<<EOD
{
	"perPageNum":8,
	"currPage":2,
	"beginNum":9,
	"endNum":16,
	"totals":30,
	"currRecordNum":8,
	"allPage":4,
	"rows":[{
			"recordId":8,
			"firstToBoss":0,
			"cdmaName":"未定义8",
			"status":2,
			"isBi":0,
			"smTypeId":8,
			"isUSSD":1,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":8,
			"processType":2,
			"mobileName":"飞信",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":9,
			"firstToBoss":0,
			"cdmaName":"未定义9",
			"status":1,
			"isBi":0,
			"smTypeId":9,
			"isUSSD":0,
			"remarks":"123",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":9,
			"processType":2,
			"mobileName":"123123",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":10,
			"firstToBoss":0,
			"cdmaName":"未定义10",
			"status":1,
			"isBi":0,
			"smTypeId":10,
			"isUSSD":1,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":10,
			"processType":2,
			"mobileName":"sdfsdfsdfsdfsdf",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":11,
			"firstToBoss":0,
			"cdmaName":"未定义11",
			"status":1,
			"isBi":0,
			"smTypeId":11,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":11,
			"processType":2,
			"mobileName":"停用",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":12,
			"firstToBoss":0,
			"cdmaName":"未定义12",
			"status":2,
			"isBi":1,
			"smTypeId":12,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/AOXYHMD",
			"biContent":"AOXYHMD",
			"typeCheck":1,
			"fsmTypeId":2,
			"processType":2,
			"mobileName":"启用",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":13,
			"firstToBoss":0,
			"cdmaName":"未定义13",
			"status":1,
			"isBi":0,
			"smTypeId":13,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":11,
			"processType":2,
			"mobileName":"政府专用业务",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":14,
			"firstToBoss":0,
			"cdmaName":"未定义14",
			"status":1,
			"isBi":1,
			"smTypeId":14,
			"isUSSD":0,
			"remarks":"1211",
			"biDirectory":"BI/ZYYWXYHMD",
			"biContent":"ZYYWXYHMD",
			"typeCheck":1,
			"fsmTypeId":5,
			"processType":2,
			"mobileName":"aadfaf",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":15,
			"firstToBoss":0,
			"cdmaName":"未定义15",
			"status":2,
			"isBi":1,
			"smTypeId":15,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/MOXYHMD",
			"biContent":"MOXYHMD",
			"typeCheck":1,
			"fsmTypeId":1,
			"processType":2,
			"mobileName":"1231233123",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		}
	]
}
EOD;
		echo '';
	}else if($_REQUEST['currPage'] == '3'){
		echo <<<EOD
{
	"perPageNum":8,
	"currPage":3,
	"beginNum":17,
	"endNum":24,
	"totals":30,
	"currRecordNum":8,
	"allPage":4,
	"rows":[{
			"recordId":16,
			"firstToBoss":0,
			"cdmaName":"未定义16",
			"status":2,
			"isBi":0,
			"smTypeId":16,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":16,
			"processType":2,
			"mobileName":"123123111",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":17,
			"firstToBoss":0,
			"cdmaName":"未定义17",
			"status":2,
			"isBi":0,
			"smTypeId":17,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":17,
			"processType":2,
			"mobileName":"2232434",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":18,
			"firstToBoss":0,
			"cdmaName":"未定义18",
			"status":2,
			"isBi":1,
			"smTypeId":18,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/MOXYHMD",
			"biContent":"MOXYHMD",
			"typeCheck":1,
			"fsmTypeId":1,
			"processType":2,
			"mobileName":"啊打发地方",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":19,
			"firstToBoss":0,
			"cdmaName":"未定义19",
			"status":2,
			"isBi":1,
			"smTypeId":19,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"BI/MOXYHMD",
			"biContent":"MOXYHMD",
			"typeCheck":1,
			"fsmTypeId":1,
			"processType":2,
			"mobileName":"默认",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":20,
			"firstToBoss":0,
			"cdmaName":"未定义20",
			"status":2,
			"isBi":0,
			"smTypeId":20,
			"isUSSD":0,
			"remarks":"234",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":20,
			"processType":2,
			"mobileName":"233333333333333333333333423423333333333333333333333333333333333333333333333333333333333333333333",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":21,
			"firstToBoss":0,
			"cdmaName":"未定义21",
			"status":2,
			"isBi":0,
			"smTypeId":21,
			"isUSSD":0,
			"remarks":"234",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":21,
			"processType":2,
			"mobileName":"234234",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":22,
			"firstToBoss":0,
			"cdmaName":"未定义22",
			"status":2,
			"isBi":0,
			"smTypeId":22,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":22,
			"processType":2,
			"mobileName":"234234234234234",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":23,
			"firstToBoss":0,
			"cdmaName":"未定义23",
			"status":2,
			"isBi":0,
			"smTypeId":23,
			"isUSSD":0,
			"remarks":"234234",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":23,
			"processType":2,
			"mobileName":"23423432",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		}
	]
}
EOD;
	}else if($_REQUEST['currPage'] == '4'){
		echo <<<EOD
{
	"perPageNum":8,
	"currPage":4,
	"beginNum":25,
	"endNum":30,
	"totals":30,
	"currRecordNum":6,
	"allPage":4,
	"rows":[{
			"recordId":24,
			"firstToBoss":0,
			"cdmaName":"未定义24",
			"status":2,
			"isBi":0,
			"smTypeId":24,
			"isUSSD":1,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":24,
			"processType":2,
			"mobileName":"234234234",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":25,
			"firstToBoss":0,
			"cdmaName":"未定义25",
			"status":2,
			"isBi":0,
			"smTypeId":25,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":25,
			"processType":2,
			"mobileName":"未知业务1",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":26,
			"firstToBoss":0,
			"cdmaName":"未定义26",
			"status":2,
			"isBi":0,
			"smTypeId":26,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":26,
			"processType":2,
			"mobileName":"test哈哈",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":27,
			"firstToBoss":0,
			"cdmaName":"未定义27",
			"status":2,
			"isBi":0,
			"smTypeId":27,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":20,
			"processType":2,
			"mobileName":"tiantttt",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":28,
			"firstToBoss":0,
			"cdmaName":"未定义28",
			"status":2,
			"isBi":1,
			"smTypeId":28,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"123",
			"biContent":"11",
			"typeCheck":1,
			"fsmTypeId":28,
			"processType":2,
			"mobileName":"tiantt",
			"isSp":"1",
			"processBoss":1,
			"graylistRate":100
		},{
			"recordId":29,
			"firstToBoss":0,
			"cdmaName":"未定义29",
			"status":2,
			"isBi":0,
			"smTypeId":29,
			"isUSSD":0,
			"remarks":"",
			"biDirectory":"",
			"biContent":"",
			"typeCheck":1,
			"fsmTypeId":25,
			"processType":2,
			"mobileName":"1231233",
			"isSp":"0",
			"processBoss":1,
			"graylistRate":100
		}
	]
}
EOD;
	}
?>

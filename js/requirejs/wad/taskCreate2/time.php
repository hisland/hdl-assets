<?php

//sleep(1);	//模拟慢网速

$str1 = <<<EOD
{
	"perPageNum": 15,
	"currPage": 1,
	"beginNum": 1,
	"endNum": 15,
	"totals": 48,
	"currRecordNum": 15,
	"allPage": 2,
	"rows": [{
		"name":"时段1",
		"start":"20:47:08",
		"end":"20:47:15"
	},{
		"name":"时段2",
		"start":"20:47:08",
		"end":"20:47:15"
	}]
}
EOD;
$str2 = <<<EOD
{
	"perPageNum": 15,
	"currPage": 2,
	"beginNum": 16,
	"endNum": 30,
	"totals": 48,
	"currRecordNum": 15,
	"allPage": 2,
	"rows": [{
		"name":"时段1",
		"start":"20:47:08",
		"end":"20:47:15"
	},{
		"name":"时段2",
		"start":"20:47:08",
		"end":"20:47:15"
	}]
}
EOD;
	if(!isset($_REQUEST['currPage']) || $_REQUEST['currPage']<2){
		echo $str1;
	}else{
		echo $str2;
	}
?>
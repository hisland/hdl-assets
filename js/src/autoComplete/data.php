<?php

sleep(1);	//模拟慢网速

$str1 = <<<EOD
{
	"perPageNum": 15,
	"currPage": 1,
	"beginNum": 1,
	"endNum": 15,
	"totals": 48,
	"currRecordNum": 15,
	"allPage": 5,
	"rows": [
		"''||\" \"",
		"''||''4",
		"dfd&sdfssddf1",
		"ewsdr",
		"ffsdsd",
		"fgpdepde'0tdssqe'pfd_7843920",
		"fgpdepde'0tdssqe'pf_88884",
		"ewr",
		"ff",
		"fgpdepde'0tdssqe'pf_7843920",
		"fgpdepde'0tdssqe'pf_88884",
		"fgpdepde'0tgaojing",
		"iujyhgfdsxb",
		"sdfa56fasdsf+as65df65a6d5f6dsa5f6dsa5f6ds5f6dsa4f6ds4f5d6s4f6d5s4f6ds54f6ads45f6sd54f6ds54f5d6f4d65sf4d65s4fd65sf4d6sf43",
		"trew"
	]
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
	"allPage": 5,
	"rows": [
		"if u'r say1",
		"if u'r say2",
		"if u'r say3",
		"if u'r say4",
		"if u'r say5",
		"if u'r say6",
		"if u'r say7",
		"if u'r say8",
		"if u'r say9",
		"if u'r say10",
		"if u'r say11",
		"if u'r say12",
		"if u'r say13",
		"if u'r say14",
		"if u'r say15"
	]
}
EOD;
	if(!isset($_REQUEST['currPage']) || $_REQUEST['currPage']<2){
		echo $str1;
	}else{
		echo $str2;
	}
?>
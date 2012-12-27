<?php
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
	"headHTML":"<tr><th>名称</th><th>是否启用</th><th class=\"td-right\">是否SP</th><th>是否USSD</th><th>父业务类型</th><th>是否送BI</th><th>送BI文件名</th><th>送BI目录</th><th>备注</th></tr>",
	"bodyHTML":"<tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>未知业务</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>0</td><td>1</td><td>XXX</td><td>BI/XXX</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>点对点短信</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>1</td><td>1</td><td>MOXYHMD</td><td>BI/MOXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>梦网SP短信</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>2</td><td>1</td><td>AOXYHMD</td><td>BI/AOXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>行业SP短信</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>3</td><td>1</td><td>AOXYHMD</td><td>BI/AOXYHMD</td><td>1234555555555555</td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>互联互通短信</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>4</td><td>1</td><td>WJHTXYHMD</td><td>BI/WJHTXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>自有业务短信</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>5</td><td>1</td><td>ZYYWXYHMD</td><td>BI/ZYYWXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>省际短信</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>6</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>USSD短信</td><td>是</td><td class=\"td-right\">0</td><td>1</td><td>7</td><td>0</td><td></td><td></td><td></td></tr>"
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
	"colModel" : [{
			"width":90
		},{
			"width":40
		},{
			"width":90
		},{
			"width":120
		},{
			"width":90
		},{
			"width":90
		},{
			"width":90
		},{
			"width":90
		},{
			"width":90
		}
	],
	"headHTML":"<tr><th>名称</th><th>启用</th><th class=\"td-right\">是否SP</th><th>是否USSD</th><th>父业务类型</th><th>是否送BI</th><th>送BI文件名</th><th>送BI目录</th><th>备注</th></tr>",
	"bodyHTML":"<tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>飞信</td><td>是</td><td class=\"td-right\">0</td><td>1</td><td>8</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>123123</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>9</td><td>0</td><td></td><td></td><td>123</td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>sdfsdfsdfsdfsdf</td><td>是</td><td class=\"td-right\">0</td><td>1</td><td>10</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>停用</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>11</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>启用</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>2</td><td>1</td><td>AOXYHMD</td><td>BI/AOXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>政府专用业务</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>11</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>aadfaf</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>5</td><td>1</td><td>ZYYWXYHMD</td><td>BI/ZYYWXYHMD</td><td>1211</td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>1231233123</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>1</td><td>1</td><td>MOXYHMD</td><td>BI/MOXYHMD</td><td></td></tr>"
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
	"headHTML":"<tr><th>名称</th><th>是否启用</th><th class=\"td-right\">是否SP</th><th>是否USSD</th><th>父业务类型</th><th>是否送BI</th><th>送BI文件名</th><th>送BI目录</th><th>备注</th></tr>",
	"bodyHTML":"<tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>123123111</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>16</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>2232434</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>17</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>啊打发地方</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>1</td><td>1</td><td>MOXYHMD</td><td>BI/MOXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>默认</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>1</td><td>1</td><td>MOXYHMD</td><td>BI/MOXYHMD</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>233333333333333333333333423423333333333333333333333333333333333333333333333333333333333333333333</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>20</td><td>0</td><td></td><td></td><td>234</td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>234234</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>21</td><td>0</td><td></td><td></td><td>234</td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>234234234234234</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>22</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>23423432</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>23</td><td>0</td><td></td><td></td><td>234234</td></tr>"
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
	"headHTML":"<tr><th>名称</th><th>是否启用</th><th class=\"td-right\">是否SP</th><th>是否USSD</th><th>父业务类型</th><th>是否送BI</th><th>送BI文件名</th><th>送BI目录</th><th>备注</th></tr>",
	"bodyHTML":"<tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>234234234</td><td>是</td><td class=\"td-right\">0</td><td>1</td><td>24</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>未知业务1</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>25</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>test哈哈</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>26</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>tiantttt</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>20</td><td>0</td><td></td><td></td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(255, 255, 255);\"><td>tiantt</td><td>是</td><td class=\"td-right\">1</td><td>0</td><td>28</td><td>1</td><td>11</td><td>123</td><td></td></tr><tr style=\"background: none repeat scroll 0% 0% rgb(243, 243, 243);\"><td>1231233</td><td>是</td><td class=\"td-right\">0</td><td>0</td><td>25</td><td>0</td><td></td><td></td><td></td></tr>"
}
EOD;
	}
?>

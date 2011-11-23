/**********************************************************************************************
 * 名称: 省市选择控件
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 * 
 * NOTICE:
 * 
 * API:
 * 
 */

KISSY.add('provinceCity', function(S, undef) {
	var msg_please_check = '请选择',
		msg_ok = '确定',
		msg_all_all = '全部-全部',
		msg_close_title = '双击选择并关闭';
	
	//JS国际化信息覆盖
	if(window.JS_I18N){
		msg_please_check = JS_I18N['js.common.provinceCity.msg_please_check'];
		msg_ok = JS_I18N['js.common.provinceCity.msg_ok'];
		msg_all_all = JS_I18N['js.common.provinceCity.msg_all_all'];
		msg_close_title = JS_I18N['js.common.provinceCity.msg_close_title'];
	}

	var $ = jQuery,
		$EMPTY = $(''),

		pop = $.popWin.init(),

		$box_left = $('<div class="province-city"></div>'),
		$box_right = $('<div class="province-city" style="margin-left:5px;" title="' + msg_close_title + '"></div>'),

		$btn_wrap = $('<div class="win1-btns"><input type="submit" value="' + msg_ok + '" class="win1-btn-ok"></div>'),
		$btn_ok = $btn_wrap.find('input'),

		$ipt_target = $EMPTY;

	var pc_list = {
			"province":[{"id":1,"name":"北京市"},{"id":2,"name":"天津市"},{"id":3,"name":"上海市"},{"id":4,"name":"重庆市"},{"id":5,"name":"河北省"},{"id":6,"name":"山西省"},{"id":8,"name":"辽宁省"},{"id":9,"name":"吉林省"},{"id":10,"name":"黑龙江省"},{"id":11,"name":"江苏省"},{"id":12,"name":"浙江省"},{"id":13,"name":"安徽省"},{"id":14,"name":"福建省"},{"id":15,"name":"江西省"},{"id":16,"name":"山东省"},{"id":17,"name":"河南省"},{"id":18,"name":"湖北省"},{"id":19,"name":"湖南省"},{"id":20,"name":"广东省"},{"id":21,"name":"甘肃省"},{"id":22,"name":"四川省"},{"id":23,"name":"贵州省"},{"id":24,"name":"海南省"},{"id":25,"name":"云南省"},{"id":26,"name":"青海省"},{"id":27,"name":"陕西省"},{"id":28,"name":"广西壮族自治区"},{"id":29,"name":"西藏自治区"},{"id":30,"name":"宁夏回族自治区"},{"id":31,"name":"新疆维吾尔自治区"},{"id":32,"name":"内蒙古自治区"},{"id":0,"name":"其他"}],
			"city":[{"id":2216,"name":"雅安市"},{"id":2217,"name":"巴中市"},{"id":2218,"name":"资阳市"},{"id":2219,"name":"阿坝藏族羌族自治州"},{"id":2220,"name":"甘孜藏族自治州"},{"id":2221,"name":"凉山彝族自治州"},{"id":2301,"name":"贵阳市"},{"id":2302,"name":"六盘水市"},{"id":2303,"name":"遵义市"},{"id":2304,"name":"安顺市"},{"id":2305,"name":"铜仁地区"},{"id":2306,"name":"毕节地区"},{"id":2307,"name":"黔西南布依族苗族自治州"},{"id":2308,"name":"黔东南苗族侗族自治州"},{"id":2309,"name":"黔南布依族苗族自治州"},{"id":2401,"name":"海口市"},{"id":2402,"name":"三亚市"},{"id":2403,"name":"五指山市"},{"id":2404,"name":"琼海市"},{"id":2405,"name":"儋州市"},{"id":2406,"name":"文昌市"},{"id":2407,"name":"万宁市"},{"id":2408,"name":"东方市"},{"id":2409,"name":"澄迈县"},{"id":2410,"name":"定安县"},{"id":2411,"name":"屯昌县"},{"id":2412,"name":"临高县"},{"id":2413,"name":"白沙黎族自治县"},{"id":2414,"name":"昌江黎族自治县"},{"id":2415,"name":"乐东黎族自治县"},{"id":2416,"name":"陵水黎族自治县"},{"id":2417,"name":"保亭黎族苗族自治县"},{"id":2418,"name":"琼中黎族苗族自治县"},{"id":2501,"name":"昆明市"},{"id":2502,"name":"曲靖市"},{"id":2503,"name":"玉溪市"},{"id":2504,"name":"保山市"},{"id":2505,"name":"昭通市"},{"id":2506,"name":"丽江市"},{"id":2507,"name":"思茅市"},{"id":2508,"name":"临沧市"},{"id":2509,"name":"文山壮族苗族自治州"},{"id":2510,"name":"红河哈尼族彝族自治州"},{"id":2511,"name":"西双版纳傣族自治州"},{"id":2512,"name":"楚雄彝族自治州"},{"id":2513,"name":"大理白族自治州"},{"id":2514,"name":"德宏傣族景颇族自治州"},{"id":2515,"name":"怒江傈傈族自治州"},{"id":2516,"name":"迪庆藏族自治州"},{"id":2601,"name":"西宁市"},{"id":2602,"name":"海东地区"},{"id":2603,"name":"海北藏族自治州"},{"id":2604,"name":"黄南藏族自治州"},{"id":2605,"name":"海南藏族自治州"},{"id":2606,"name":"果洛藏族自治州"},{"id":2607,"name":"玉树藏族自治州"},{"id":2608,"name":"海西蒙古族藏族自治州"},{"id":2701,"name":"西安市"},{"id":2702,"name":"铜川市"},{"id":2703,"name":"宝鸡市"},{"id":2704,"name":"咸阳市"},{"id":2705,"name":"渭南市"},{"id":2706,"name":"延安市"},{"id":2707,"name":"汉中市"},{"id":2708,"name":"榆林市"},{"id":2709,"name":"安康市"},{"id":2710,"name":"商洛市"},{"id":2801,"name":"南宁市"},{"id":2802,"name":"柳州市"},{"id":2803,"name":"桂林市"},{"id":2804,"name":"梧州市"},{"id":2805,"name":"北海市"},{"id":2806,"name":"防城港市"},{"id":2807,"name":"钦州市"},{"id":2808,"name":"贵港市"},{"id":2809,"name":"玉林市"},{"id":2810,"name":"百色市"},{"id":2811,"name":"贺州市"},{"id":2812,"name":"河池市"},{"id":2813,"name":"来宾市"},{"id":2814,"name":"崇左市"},{"id":2901,"name":"拉萨市"},{"id":2902,"name":"那曲地区"},{"id":2903,"name":"昌都地区"},{"id":2904,"name":"山南地区"},{"id":2905,"name":"日喀则地区"},{"id":2906,"name":"阿里地区"},{"id":2907,"name":"林芝地区"},{"id":3001,"name":"银川市"},{"id":3002,"name":"石嘴山市"},{"id":3003,"name":"吴忠市"},{"id":3004,"name":"固原市"},{"id":3005,"name":"中卫市"},{"id":3101,"name":"乌鲁木齐市"},{"id":3102,"name":"克拉玛依市"},{"id":3103,"name":"石河子市"},{"id":3104,"name":"阿拉尔市"},{"id":3105,"name":"图木舒克市"},{"id":3106,"name":"五家渠市"},{"id":3107,"name":"吐鲁番市"},{"id":3108,"name":"阿克苏市"},{"id":3109,"name":"喀什市"},{"id":3110,"name":"哈密市"},{"id":3111,"name":"和田市"},{"id":3112,"name":"阿图什市"},{"id":3113,"name":"库尔勒市"},{"id":3114,"name":"昌吉市"},{"id":3115,"name":"阜康市"},{"id":3116,"name":"米泉市"},{"id":3117,"name":"博乐市"},{"id":3118,"name":"伊宁市"},{"id":3119,"name":"奎屯市"},{"id":3120,"name":"塔城市"},{"id":3121,"name":"乌苏市"},{"id":3122,"name":"阿勒泰市"},{"id":3201,"name":"呼和浩特市"},{"id":3202,"name":"包头市"},{"id":3203,"name":"乌海市"},{"id":3204,"name":"赤峰市"},{"id":3205,"name":"通辽市"},{"id":3206,"name":"鄂尔多斯市"},{"id":3207,"name":"呼伦贝尔市"},{"id":3208,"name":"巴彦淖尔市"},{"id":3209,"name":"乌兰察布市"},{"id":3210,"name":"锡林郭勒盟"},{"id":3211,"name":"兴安盟"},{"id":3212,"name":"阿拉善盟"},{"id":0,"name":"其他"},{"id":101,"name":"东城区"},{"id":102,"name":"西城区"},{"id":103,"name":"崇文区"},{"id":104,"name":"宣武区"},{"id":105,"name":"朝阳区"},{"id":106,"name":"丰台区"},{"id":107,"name":"石景山区"},{"id":108,"name":"海淀区"},{"id":109,"name":"门头沟区"},{"id":110,"name":"房山区"},{"id":111,"name":"通州区"},{"id":112,"name":"顺义区"},{"id":113,"name":"昌平区"},{"id":114,"name":"大兴区"},{"id":115,"name":"怀柔区"},{"id":116,"name":"平谷区"},{"id":117,"name":"延庆县"},{"id":118,"name":"密云县"},{"id":501,"name":"石家庄市"},{"id":502,"name":"唐山市"},{"id":503,"name":"秦皇岛市"},{"id":504,"name":"邯郸市"},{"id":505,"name":"邢台市"},{"id":506,"name":"保定市"},{"id":507,"name":"张家口市"},{"id":508,"name":"承德市"},{"id":509,"name":"沧州市"},{"id":510,"name":"廊坊市"},{"id":511,"name":"衡水市"},{"id":601,"name":"太原市"},{"id":602,"name":"大同市"},{"id":603,"name":"阳泉市"},{"id":604,"name":"长治市"},{"id":605,"name":"晋城市"},{"id":606,"name":"朔州市"},{"id":607,"name":"晋中市"},{"id":608,"name":"运城市"},{"id":609,"name":"忻州市"},{"id":610,"name":"临汾市"},{"id":611,"name":"吕梁市"},{"id":701,"name":"台北市"},{"id":702,"name":"高雄市"},{"id":703,"name":"基隆市"},{"id":704,"name":"台中市"},{"id":705,"name":"台南市"},{"id":706,"name":"新竹市"},{"id":707,"name":"嘉义市"},{"id":708,"name":"台北县"},{"id":709,"name":"宜兰县"},{"id":710,"name":"桃园县"},{"id":711,"name":"新竹县"},{"id":712,"name":"苗栗县"},{"id":713,"name":"台中县"},{"id":714,"name":"彰化县"},{"id":715,"name":"南投县"},{"id":716,"name":"云林县"},{"id":717,"name":"嘉义县"},{"id":718,"name":"台南县"},{"id":719,"name":"高雄县"},{"id":720,"name":"屏东县"},{"id":721,"name":"澎湖县"},{"id":722,"name":"台东县"},{"id":723,"name":"花莲县"},{"id":801,"name":"沈阳市"},{"id":802,"name":"大连市"},{"id":803,"name":"鞍山市"},{"id":804,"name":"抚顺市"},{"id":805,"name":"本溪市"},{"id":806,"name":"丹东市"},{"id":807,"name":"锦州市"},{"id":808,"name":"营口市"},{"id":809,"name":"阜新市"},{"id":810,"name":"辽阳市"},{"id":811,"name":"盘锦市"},{"id":812,"name":"铁岭市"},{"id":813,"name":"朝阳市"},{"id":814,"name":"葫芦岛市"},{"id":901,"name":"长春市"},{"id":902,"name":"吉林市"},{"id":903,"name":"四平市"},{"id":904,"name":"辽源市"},{"id":905,"name":"通化市"},{"id":906,"name":"白山市"},{"id":907,"name":"松原市"},{"id":908,"name":"白城市"},{"id":909,"name":"延边朝鲜族自治州"},{"id":1001,"name":"哈尔滨市"},{"id":1002,"name":"齐齐哈尔市"},{"id":1003,"name":"鹤岗市"},{"id":1004,"name":"双鸭山市"},{"id":1005,"name":"鸡西市"},{"id":1006,"name":"大庆市"},{"id":1007,"name":"伊春市"},{"id":1008,"name":"牡丹江市"},{"id":1009,"name":"佳木斯市"},{"id":1010,"name":"七台河市"},{"id":1011,"name":"黑河市"},{"id":1012,"name":"绥化市"},{"id":1013,"name":"大兴安岭地区"},{"id":1101,"name":"南京市"},{"id":1102,"name":"无锡市"},{"id":1103,"name":"徐州市"},{"id":1104,"name":"常州市"},{"id":1105,"name":"苏州市"},{"id":1106,"name":"南通市"},{"id":1107,"name":"连云港市"},{"id":1108,"name":"淮安市"},{"id":1109,"name":"盐城市"},{"id":1110,"name":"扬州市"},{"id":1111,"name":"镇江市"},{"id":1112,"name":"泰州市"},{"id":1113,"name":"宿迁市"},{"id":1201,"name":"杭州市"},{"id":1202,"name":"宁波市"},{"id":1203,"name":"温州市"},{"id":1204,"name":"嘉兴市"},{"id":1205,"name":"湖州市"},{"id":1206,"name":"绍兴市"},{"id":1207,"name":"金华市"},{"id":1208,"name":"衢州市"},{"id":1209,"name":"舟山市"},{"id":1210,"name":"台州市"},{"id":1211,"name":"丽水市"},{"id":1301,"name":"合肥市"},{"id":1302,"name":"芜湖市"},{"id":1303,"name":"蚌埠市"},{"id":1304,"name":"淮南市"},{"id":1305,"name":"马鞍山市"},{"id":1306,"name":"淮北市"},{"id":1307,"name":"铜陵市"},{"id":1308,"name":"安庆市"},{"id":1309,"name":"黄山市"},{"id":1310,"name":"滁州市"},{"id":1311,"name":"阜阳市"},{"id":1312,"name":"宿州市"},{"id":1313,"name":"巢湖市"},{"id":1314,"name":"六安市"},{"id":1315,"name":"亳州市"},{"id":1316,"name":"池州市"},{"id":1317,"name":"宣城市"},{"id":1401,"name":"福州市"},{"id":1402,"name":"厦门市"},{"id":1403,"name":"莆田市"},{"id":1404,"name":"三明市"},{"id":1405,"name":"泉州市"},{"id":1406,"name":"漳州市"},{"id":1407,"name":"南平市"},{"id":1408,"name":"龙岩市"},{"id":1409,"name":"宁德市"},{"id":1501,"name":"南昌市"},{"id":1502,"name":"景德镇市"},{"id":1503,"name":"萍乡市"},{"id":1504,"name":"九江市"},{"id":1505,"name":"新余市"},{"id":1506,"name":"鹰潭市"},{"id":1507,"name":"赣州市"},{"id":1508,"name":"吉安市"},{"id":1509,"name":"宜春市"},{"id":1510,"name":"抚州市"},{"id":1511,"name":"上饶市"},{"id":1601,"name":"济南市"},{"id":1602,"name":"青岛市"},{"id":1603,"name":"淄博市"},{"id":1604,"name":"枣庄市"},{"id":1605,"name":"东营市"},{"id":1606,"name":"烟台市"},{"id":1607,"name":"潍坊市"},{"id":1608,"name":"济宁市"},{"id":1609,"name":"泰安市"},{"id":1610,"name":"威海市"},{"id":1611,"name":"日照市"},{"id":1612,"name":"莱芜市"},{"id":1613,"name":"临沂市"},{"id":1614,"name":"德州市"},{"id":1615,"name":"聊城市"},{"id":1616,"name":"滨州市"},{"id":1617,"name":"菏泽市"},{"id":1701,"name":"郑州市"},{"id":1702,"name":"开封市"},{"id":1703,"name":"洛阳市"},{"id":1704,"name":"平顶山市"},{"id":1705,"name":"安阳市"},{"id":1706,"name":"鹤壁市"},{"id":1707,"name":"新乡市"},{"id":1708,"name":"焦作市"},{"id":1709,"name":"濮阳市"},{"id":1710,"name":"许昌市"},{"id":1711,"name":"漯河市"},{"id":1712,"name":"三门峡市"},{"id":1713,"name":"南阳市"},{"id":1714,"name":"商丘市"},{"id":1715,"name":"信阳市"},{"id":1716,"name":"周口市"},{"id":1717,"name":"驻马店市"},{"id":1718,"name":"济源市"},{"id":1801,"name":"武汉市"},{"id":1802,"name":"黄石市"},{"id":1803,"name":"十堰市"},{"id":1804,"name":"荆州市"},{"id":1805,"name":"宜昌市"},{"id":1806,"name":"襄樊市"},{"id":1807,"name":"鄂州市"},{"id":1808,"name":"荆门市"},{"id":1809,"name":"孝感市"},{"id":1810,"name":"黄冈市"},{"id":1811,"name":"咸宁市"},{"id":1812,"name":"随州市"},{"id":1813,"name":"仙桃市"},{"id":1814,"name":"天门市"},{"id":1815,"name":"潜江市"},{"id":1816,"name":"神农架林区"},{"id":1817,"name":"恩施土家族苗族自治州"},{"id":1901,"name":"长沙市"},{"id":1902,"name":"株洲市"},{"id":1903,"name":"湘潭市"},{"id":1904,"name":"衡阳市"},{"id":1905,"name":"邵阳市"},{"id":1906,"name":"岳阳市"},{"id":1907,"name":"常德市"},{"id":1908,"name":"张家界市"},{"id":1909,"name":"益阳市"},{"id":1910,"name":"郴州市"},{"id":1911,"name":"永州市"},{"id":1912,"name":"怀化市"},{"id":1913,"name":"娄底市"},{"id":1914,"name":"湘西土家族苗族自治州"},{"id":2001,"name":"广州市"},{"id":2002,"name":"深圳市"},{"id":2003,"name":"珠海市"},{"id":2004,"name":"汕头市"},{"id":2005,"name":"韶关市"},{"id":2006,"name":"佛山市"},{"id":2007,"name":"江门市"},{"id":2008,"name":"湛江市"},{"id":2009,"name":"茂名市"},{"id":2010,"name":"肇庆市"},{"id":2011,"name":"惠州市"},{"id":2012,"name":"梅州市"},{"id":2013,"name":"汕尾市"},{"id":2014,"name":"河源市"},{"id":2015,"name":"阳江市"},{"id":2016,"name":"清远市"},{"id":2017,"name":"东莞市"},{"id":2018,"name":"中山市"},{"id":2019,"name":"潮州市"},{"id":2020,"name":"揭阳市"},{"id":2021,"name":"云浮市"},{"id":2101,"name":"兰州市"},{"id":2102,"name":"金昌市"},{"id":2103,"name":"白银市"},{"id":2104,"name":"天水市"},{"id":2105,"name":"嘉峪关市"},{"id":2106,"name":"武威市"},{"id":2107,"name":"张掖市"},{"id":2108,"name":"平凉市"},{"id":2109,"name":"酒泉市"},{"id":2110,"name":"庆阳市"},{"id":2111,"name":"定西市"},{"id":2112,"name":"陇南市"},{"id":2113,"name":"宁夏回族自治州"},{"id":2114,"name":"甘南藏族自治州"},{"id":2201,"name":"成都市"},{"id":2202,"name":"自贡市"},{"id":2203,"name":"攀枝花市"},{"id":2204,"name":"泸州市"},{"id":2205,"name":"德阳市"},{"id":2206,"name":"绵阳市"},{"id":2207,"name":"广元市"},{"id":2208,"name":"遂宁市"},{"id":2209,"name":"内江市"},{"id":2210,"name":"乐山市"},{"id":2211,"name":"南充市"},{"id":2212,"name":"眉山市"},{"id":2213,"name":"宜宾市"},{"id":2214,"name":"广安市"},{"id":2215,"name":"达州市"}]
		};

	//空的节点
	pc_list[""] = {"id":"","name":"全部"};
	//省对象挂到map上,并创建子节点
	S.each(pc_list.province, function(v, i, o){
		pc_list[v.id] = v;
		v.city = [pc_list[""]];
	});
	pc_list.province.unshift(pc_list[""]);

	//市对象挂到map上,并放入省子列表
	S.each(pc_list.city, function(v, i, o){
		i = Math.floor(v.id / 100);
		//避免i为0时覆盖省的0的情况, 0==其它
		if(i){
			pc_list[v.id] = v;
		}
		//避免没有对应省的市的处理出错
		if(pc_list[i] && pc_list[i].city){
			pc_list[i].city.push(v);
		}
	});

	//初始化省列表
	var sb = [];
	S.each(pc_list.province, function(v, i, o){
		sb.push('<a href="#" data-id="', v.id, '">', v.name, '</a>');
	});
	$box_left.html(sb.join(''));

	//初始化市列表
	function changeProvince(pid){
		//初始化省列表
		var sb = [];
		if(pid === ''){
			sb.push('<a href="#" data-id="">', pc_list[pid].name, '</a>');
		}else{
			S.each(pc_list[pid].city, function(v, i, o){
				sb.push('<a href="#" data-id="', v.id, '">', v.name, '</a>');
			});
		}
		$box_right.html(sb.join('')).children(':first').click();
	}

	$box_left.children(':first').click();

	//初始化弹出层结构
	pop.$content.append($box_left).append($box_right).append($btn_wrap);
	pop.setTitle(msg_please_check);
	pop.setInnerWidth(350);
	pop.manager.$div.addClass('not-remove');

	//左侧点击,切换并且更新右侧
	$box_left.click(function(e){
		var dt = $(e.target);
		if(dt.is('a')){
			dt.addClass('hover').siblings('.hover').removeClass('hover');
			changeProvince(dt.attr('data-id'));
			dt.blur();
			e.preventDefault();
		}
	});

	//右侧点击,切换
	$box_right.click(function(e){
		var dt = $(e.target);
		if(dt.is('a')){
			dt.addClass('hover').siblings('.hover').removeClass('hover');
			dt.blur();
			e.preventDefault();
		}
	}).dblclick(function(e){
		$btn_ok.click();
	});

	//确定按钮点击时放回去
	$btn_ok.click(function(){
		var province = $box_left.find('.hover'),
			city = $box_right.find('.hover'),
			pid = province.attr('data-id'),
			cid = city.attr('data-id');

		//填入对应ID
		$ipt_target.next().val(pid);
		$ipt_target.next().next().val(cid);

		//填入显示文本
		$ipt_target.val(province.text() + '-' + city.text());

		pop.hide();
		$ipt_target = $EMPTY;
	});

	//输入框点击
	function iptclick(e){
		$ipt_target = $(this);
		var pid = $ipt_target.next().val(),
			cid = $ipt_target.next().next().val();

		//先显示,否则focus不起作用
		pop.front().show();

		//初始化显示的选中状态,focus是为了在显示范围内出现,触发click是为了产生联动
		$box_left.find('[data-id='+pid+']').focus().click();
		$box_right.find('[data-id='+cid+']').focus().click();
	}

	//根据hidden的值填入显示文本
	function fillIptByHidden($ipt_target){
		var pid = $ipt_target.next().val(),
			cid = $ipt_target.next().next().val();
		$ipt_target.val(pc_list[pid].name + '-' + pc_list[cid].name);
	}

	$.fn.extend({
		provinceCity: function(){
			this.filter(':text').each(function(i, v){
				if(!this['--bind-province']){
					this['--bind-province'] = true;
					$(v).click(iptclick);
					fillIptByHidden($(v));
				}
			});
			return this;
		}
	});
}, {
	requires: ['jquery-1.4.2', 'popWin+css']
});

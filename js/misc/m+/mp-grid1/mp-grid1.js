/**********************************************************************************************
 * 名称: MP使用的表格控件1
 * 作者: hisland
 * 邮件: hisland@qq.com
 * 时间: @TIMESTAMP@
 * 版本: @VERSION@
 *
 */

(function($){
	//层点击事件代理
	function wrapClick(e){
		var me = $(this), elm = $(e.target), span, select_box;

		select_box = me.find('.mp-g1-box-lb,.mp-g1-box-rb');
		//选择行处理
		if(elm.is('td, li') && !elm.closest('li, tr').is('.mp-g1-selected')){
			select_box.find('.mp-g1-selected').removeClass('mp-g1-selected');
			select_box.find('li:eq('+elm.closest('li, tr').index()+')').addClass('mp-g1-selected');
			select_box.find('tr:eq('+elm.closest('li, tr').index()+')').addClass('mp-g1-selected');
		
		//上下移动处理
		}else if(elm.is('span')){
			span = elm.attr('class');
			if(span === 'mp-g1-top'){
				select_box.find('.mp-g1-selected').each(function(i, v){
					v = $(v);
					v.parent().prepend(v);
				});
			}else if(span === 'mp-g1-up'){
				select_box.find('.mp-g1-selected').each(function(i, v){
					v = $(v);
					v.prev().before(v);
				});
			}else if(span === 'mp-g1-down'){
				select_box.find('.mp-g1-selected').each(function(i, v){
					v = $(v);
					v.next().after(v);
				});
			}else if(span === 'mp-g1-bottom'){
				select_box.find('.mp-g1-selected').each(function(i, v){
					v = $(v);
					v.parent().append(v);
				});
			}

		//切换状态处理
		}else if(elm.is('strong')){
			if(elm.attr('class') === 'mp-g1-0'){
				elm.attr('class', 'mp-g1-1');
			}else if(elm.attr('class') === 'mp-g1-1'){
				elm.attr('class', 'mp-g1-0');
			}
		}
	}

	//滚动条滚动事件
	function tableScroll(e){
		var  t = $(this).prev().find('table')
			,l = $(this).parent().prev().find('ul')
			,st = this.scrollTop
			,sl = this.scrollLeft;
		t.css('left', -sl);
		l.css('top', -st);
	}

	$.extend({
		mpGrid1: function(elm, data, fn){
			elm = $(elm);
			if(!elm.length){
				alert('mpGrid1: 指定放置表格的元素不存在!');
				return false;
			}
			if(!data){
				alert('mpGrid1: 无原始数据!');
				return false;
			}

			var b = [], header_len = 0;

			b.push('<div class="mp-g1-left">');
			b.push('<div class="mp-g1-box-lt"><span class="mp-g1-top"></span><span class="mp-g1-up"></span><span class="mp-g1-text">priority</span><span class="mp-g1-down"></span><span class="mp-g1-bottom"></span></div>');
			b.push('<div class="mp-g1-box-lb"><ul></ul></div></div>');

			b.push('<div class="mp-g1-right">');
				b.push('<div class="mp-g1-box-rt"><table><thead><tr>');
				$.each(data.header, function(i, v){
					header_len++;//顺便计数
					b.push('<th data-idx="', i, '">', v, '</th>');
				});
				b.push('</tr></thead></table></div>');

				b.push('<div class="mp-g1-box-rb" style="visibility:hidden;"><table>');
				b.push('<thead>');
				$.each(data.data, function(i, v){
					var d = v[2];
					//取header_len个数字
					d = d.substr(0, header_len);
					//不足位数补全,末尾加N个1
					if(d.length < header_len){
						d += new Array(header_len-d.length+1).join(1);
					}
					d = d.split('');
					b.push('<tr data-idx="', v[1], '">');
					$.each(d, function(i, v){
						b.push('<td><strong class="mp-g1-', v, '"></strong></td>');
					});
					b.push('</tr>');
				});
				b.push('</thead>');
				b.push('</table></div>');
			b.push('</div>');

			elm.data('grid-data', data)
				.data('grid-header-len', header_len)
				.addClass('mp-g1-wrap')
				.html(b.join(''));

			//区别对待ie6,避免其解析过慢导致有些宽计算不正确
			if($.browser.version == 6.0){
				setTimeout(function(){
					elm.mpGrid1Init();
					$.isFunction(fn) && fn();
				}, 10);
			}else{
				elm.mpGrid1Init();
				$.isFunction(fn) && fn();
			}
		}
	});
	$.fn.extend({
		 mpGrid1Init: function(){
			var  elm = $(this), ul, b, header
				,thead ,tbody, ths, cols;
			if(elm.is('.mp-g1-wrap')){
				elm.click(wrapClick);

				//生成左侧文字
				ul = elm.find('.mp-g1-box-lb ul');
				b = [];
				header = elm.data('grid-data').header;
				elm.find('.mp-g1-box-rb').find('tr').each(function(i, v){
					b.push('<li>', header[$(v).attr('data-idx')], '</li>');
				});
				ul.html(b.join(''));

				//水平单元格对齐
				thead = elm.find('.mp-g1-box-rt');
				tbody = elm.find('.mp-g1-box-rb');
				tbody.find('table').width(thead.find('table').width());
				ths = thead.find('th');
				cols = tbody.find('tr:eq(0) td');
				ths.each(function(i, v){
					cols.eq(i).width(v.clientWidth);
				});
				tbody.add(ul.parent()).height(elm.height() - thead.outerHeight());
				tbody.scroll(tableScroll).css('visibility', '');
				if(!$.browser.msie){
					tbody.find('table').width(thead.find('table').width());
				}
			}else{
				alert('此层不适合使用此函数,它应该是由$.mpGrid1生成的表格.');
			}
		}

		//取得数据
		,mpGrid1GetData: function(){
			var  elm = $(this)
				,tbody = elm.find('.mp-g1-box-rb tr')
				,data = []
				,last = /\d$/;

			tbody.each(function(i, v){
				v = $(v);
				var str = v.attr('data-idx')+'-'+i+'-';
				str += v.find('strong').map(function(i, v){
					return v.className ? v.className.match(last)[0] : '1';
				}).get().join('');
				data.push(str);
			});
			return data;
		}
	});
})(jQuery);
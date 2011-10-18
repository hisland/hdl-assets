package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttribute;

/**
 * @author hdl
 * 标签结构:
<form class="search-condition">
	<div class="search-condition-c1">
		<div class="ls1">
		<!-- 这里面是查询条件 -->
		</div>
	</div>
	<div class="search-condition-c2">
		<input class="search-submit" type="button" value="查询" />
		<p class="search-more">收起条件</p>
	</div>
</form>
 */
@SuppressWarnings("serial")
public class Query extends TagAttribute {
	@Override
	public int doStartTag(){
		StringBuffer sb = new StringBuffer();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("<form class=\"search-condition\">");
			sb.append("<div class=\"search-condition-c1\">");
			sb.append("<div class=\"ls1\">");
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE;
	}
	
	@Override
	public int doEndTag() throws JspException {
		StringBuffer sb = new StringBuffer();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("</div>");
			sb.append("</div>");
			sb.append("<div class=\"search-condition-c2\">");
			sb.append("<input class=\"search-submit\" type=\"button\" value=\"查询\" />");
			sb.append("<p class=\"search-more\">收起条件</p>");
			sb.append("</div></form>");
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
}

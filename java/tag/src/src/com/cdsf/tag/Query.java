package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttr;

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
public class Query extends TagAttr {
	//默认关闭浏览器的自动完成功能
	private boolean autocomplete = false;
	private String action;
	
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

	//表单的浏览器自动完成功能
	public String getAutocomplete() {
		if (autocomplete == false) {
			return " autocomplete=\"off\"";
		}else {
			return "";
		}
	}
	public void setAutocomplete(boolean autocomplete) {
		this.autocomplete = autocomplete;
	}

	//form的action属性
	public String getAction() {
		if (action == null) {
			return "";
		}else {
			return " action=\"" + action + "\"";
		}
	}
	public void setAction(String action) {
		this.action = action;
	}
}

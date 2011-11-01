package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

import com.cdsf.tag.base.TagI18n;

/**
 * @author hdl
 * @description 标签结构:
<form class="search-condition">
	<div class="search-condition-c1">
		<div class="ls1">
		<!-- 这里面是查询条件 -->
		</div>
	</div>
	<div class="search-condition-c2">
		<input class="search-submit" type="submit" value="查询" />
		<p class="search-more">收起条件</p>
	</div>
</form>
 */
@SuppressWarnings("serial")
public class Query extends TagI18n {
	//默认关闭浏览器的自动完成功能
	private boolean autocomplete;
	private String action;
	private String name;
	private String id;
	
	@Override
	public int doStartTag(){
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("<form class=\"search-condition\"");
			sb.append(getId());
			sb.append(getName());
			sb.append(getAction());
			sb.append(getAutocomplete());
			sb.append(">");
			sb.append("<div class=\"search-condition-c1\">");
			sb.append("<div class=\"ls1\">");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE;
	}
	
	@Override
	public int doEndTag() throws JspException {
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("</div>");
			sb.append("</div>");
			sb.append("<div class=\"search-condition-c2\">");
			sb.append("<input class=\"search-submit\" type=\"submit\" value=\"查询\" />");
			sb.append("<p class=\"search-more\">收起条件</p>");
			sb.append("</div></form>");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	/**
	 * @author hedingliang
	 * @return autocomplete="off"
	 */
	public String getAutocomplete() {
		if (autocomplete) {
			return " autocomplete=\"off\"";
		}else {
			return "";
		}
	}
	public void setAutocomplete(String autocomplete){
		if ("true".equals(autocomplete)) {
			this.autocomplete = true;
		}
	}

	/**
	 * @author hedingliang
	 * @return action="xx"
	 */
	public String getAction() {
		if (action != null) {
			return " action=\"" + action + "\"";
		}else {
			return "";
		}
	}
	public void setAction(String action) {
		this.action = action;
	}

	/**
	 * @author hedingliang
	 * @return name="xx"
	 */
	public String getName() {
		if (name != null) {
			return " name=\"" + name + "\"";
		}else {
			return "";
		}
	}
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * @author hedingliang
	 * @return id="xx"
	 */
	public String getId() {
		if (id != null) {
			return " id=\"" + id + "\"";
		}else {
			return getName();
		}
	}
	public void setId(String id) {
		this.id = id;
	}
}

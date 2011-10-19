package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttr;

/**
 * @author hdl
 * 标签结构:
<div class="red"></div>
 */
@SuppressWarnings("serial")
public class Tip extends TagAttr {
	@Override
	public int doStartTag(){
		StringBuffer sb = new StringBuffer();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("<div class=\"red\">");
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
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
}

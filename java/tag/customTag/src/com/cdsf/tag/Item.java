package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

import com.cdsf.tag.base.TagAttr;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">label:</div>
	<div class="ls1-ipts">
		
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Item extends TagAttr {
	private String cols;
	
	@Override
	public int doStartTag(){
		return SKIP_BODY;
	}
	
	/**
	 * 由于是自关闭标签,直接在endTag里面做所有事情
	 */
	@Override
	public int doEndTag() throws JspException {
		StringBuilder sb = new StringBuilder();
		try {
			sb.append("<div class=\"ls1-item\">");
			sb.append("<div class=\"ls1-text\">");

			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\">");
			
			sb.append("</div>");
			sb.append("</div>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public String getCols() {
		return cols;
	}
	public void setCols(String cols) {
		if ("2".equals(cols) || "3".equals(cols)) {
			this.cols = cols;
		}
	}
	
}

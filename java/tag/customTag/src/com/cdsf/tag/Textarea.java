package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttr;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<textarea></textarea>
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Textarea extends TagAttr {
	private String dataValidType;
	
	@Override
	public int doStartTag(){
		StringBuilder sb = new StringBuilder();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("<div class=\"ls1-item-3r\">");
			sb.append("<div class=\"ls1-text\">");

			//label
			sb.append(getLable());
			
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\">");
			
			sb.append("<textarea");
			sb.append(getCommonAttr());
			sb.append(">");
			
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE;
	}
	
	/**
	 * 由于是自关闭标签,直接在endTag里面做所有事情
	 */
	@Override
	public int doEndTag() throws JspException {
		StringBuilder sb = new StringBuilder();
		try {
			sb.append("</textarea>");
			
			sb.append("</div>");
			sb.append("</div>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	
	//验证信息
	public String getDataValidType() {
		if (dataValidType != null) {
			return " data-valid-type=\"" + dataValidType + "\"";
		}else {
			return "";
		}
	}
	public void setDataValidType(String dataValidType) {
		this.dataValidType = dataValidType;
	}
}

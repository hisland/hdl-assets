package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttribute;

/**
 * @author hdl
 * 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Select extends TagAttribute {
	@Override
	public int doStartTag(){
		StringBuffer sb = new StringBuffer();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("<div class=\"ls1-item\">");
			sb.append("<div class=\"ls1-text\">");
			
			//红色*号
			if (isRequired()) {
				sb.append("<strong class=\"red\">*</strong>");
			}

			//label
			sb.append(getLable());
			
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\">");
			
			sb.append("<select");
			sb.append(getName());
			sb.append(getId());
			sb.append(getStyle());
			sb.append(getCssclass());
			sb.append(getDisabledReadonly());
			sb.append(getValue());
			sb.append(">");
			
			//自定义内容前的内容
			sb.append("<option value=\"0\">before</option>");
			
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
		StringBuffer sb = new StringBuffer();
		try {

			//自定义内容
			if (bodyContent != null) {
				sb.append(bodyContent.toString());
			}
			
			//自定义内容后的内容
			sb.append("<option value=\"3\">after</option>");
			
			//input标签
			sb.append("</select>");
			
			//后缀文本
			sb.append(getSuffix());
			
			sb.append("</div>");
			sb.append("</div>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
}

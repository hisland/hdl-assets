package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

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
public class Password extends TagAttribute {
	@Override
	public int doStartTag(){
		return SKIP_BODY;
	}
	
	/**
	 * 由于是自关闭标签,直接在endTag里面做所有事情
	 */
	@Override
	public int doEndTag() throws JspException {
		StringBuffer sb = new StringBuffer();
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
			
			//input标签
			sb.append("<input type=\"password\"");
			sb.append(getName());
			sb.append(getId());
			sb.append(getStyle());
			sb.append(getCssclass());
			sb.append(getDisabledReadonly());
			sb.append(getValue());
			sb.append(getMaxlength());
			sb.append(getAutocomplete());
			sb.append(" />");
			
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

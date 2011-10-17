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
public class Text extends TagAttribute {

	@Override
	public int doStartTag(){
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
		
		return EVAL_BODY_INCLUDE;
	}
	
	@Override
	public int doAfterBody() throws JspException {
		JspWriter out = pageContext.getOut();
		try {
			//input标签
			sb.append("<input");
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
			System.out.println(sb);
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return super.doAfterBody();
	}
	
	@Override
	public int doEndTag() throws JspException {
		return super.doEndTag();
	}
}

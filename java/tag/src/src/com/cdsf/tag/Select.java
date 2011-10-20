package com.cdsf.tag;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttr;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<select class="text1" name="" value="">
			<option value="0">text</option>
		</select>
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Select extends TagAttr {
	@Override
	public int doStartTag(){
		StringBuilder sb = new StringBuilder();
		JspWriter out = pageContext.getOut();
		try {
			setDefaultCssclass("select1");
			sb.append("<div class=\"ls1-item\">");
			sb.append("<div class=\"ls1-text\">");

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
		StringBuilder sb = new StringBuilder();
		try {
			//自定义内容后的内容
			sb.append("<option value=\"3\">after</option>");
			
			//input标签
			sb.append("</select>");
			
			sb.append("</div>");
			sb.append("</div>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	
	//根据data生成option标签
	public String makeOptions(List<?> data) {
		return "";
	}
}

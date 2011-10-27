package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;


/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<textarea class="ls1-big-box"></textarea>
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Textarea extends Text {
	@Override
	public void preInit() {
		setRows("3");
	}
	
	@Override
	public void childDo() {}
	
	@Override
	public int doEndTag() throws JspException {
		try {
			StringBuffer sb = new StringBuffer();
			
			sb.append("<textarea");
			sb.append(getName());
			sb.append(getId());
			sb.append(getStyle());
			sb.append(getCssclass());
			sb.append(getDisabledReadonly());
			sb.append(getDataValidType());
			sb.append(">");
			if (bodyContent != null) {
				sb.append(bodyContent.getString());
			}
			sb.append("</textarea>");
			
			sb.append("</div>");
			sb.append("</div>");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
}

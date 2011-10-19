package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

/**
 * @author hdl
 * 标签结构:
<div class="ls1-item">
	<div class="ls1-text">模糊匹配:</div>
	<div class="ls1-ipts">
		<input class="text1" type="checkbox" name="" value="" data-fuzzy-targets="#id1, #id2" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Fuzzy extends Checkbox {
	private String dataFuzzyIds;
	
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
			sb.append(getRequiredString());

			//label
			sb.append(getLable());
			
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\">");
			
			//input标签
			sb.append("<input type=\"checkbox\"");
			sb.append(getName());
			sb.append(getId());
			sb.append(getStyle());
			sb.append(getCssclass());
			sb.append(getDisabledReadonly());
			sb.append(getValue());
			sb.append(getDataFuzzyIds());
			sb.append(" />");
			
			sb.append("</div>");
			sb.append("</div>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public String getDataFuzzyIds() {
		if (dataFuzzyIds != null) {
			return " data-fuzzy-ids=\"" + dataFuzzyIds + "\"";
		}else {
			return "";
		}
	}
	public void setDataFuzzyIds(String dataFuzzyIds) {
		this.dataFuzzyIds = dataFuzzyIds;
	}
}

package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

import com.cdsf.tag.base.TagAttr;

/**
 * @author hdl
 * 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="password" name="" value="" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Password extends TagAttr {
	private int maxlength;
	private String dataValidType;
	
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
			sb.append("<input");
			sb.append(getType());
			sb.append(getName());
			sb.append(getId());
			sb.append(getStyle());
			sb.append(getCssclass());
			sb.append(getDisabledReadonly());
			sb.append(getValue());
			sb.append(getMaxlength());
			sb.append(" />");
			
			sb.append("</div>");
			sb.append("</div>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	
	public String getType() {
		return " type=\"password\"";
	}

	//text的maxlength属性
	public String getMaxlength() {
		if (maxlength == 0) {
			return "";
		}else {
			return " maxlength=\"" + maxlength + "\"";
		}
	}
	public void setMaxlength(int maxlength) {
		this.maxlength = maxlength;
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

package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Text extends Password {
	private String suffix;
	//默认关闭浏览器的自动完成功能
	private boolean autocomplete = false;
	
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
			setDefaultCssclass("text1");
			sb.append("<div class=\"ls1-item\">");
			sb.append("<div class=\"ls1-text\">");

			//label
			sb.append(getLable());
			
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\">");
			
			//input标签
			sb.append("<input");
			sb.append(getType());
			sb.append(getCommonAttr());
			sb.append(getValue());
			sb.append(getMaxlengthAttr());
			sb.append(getDataValidType());
			sb.append(getAutocompleteAttr());
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
	
	public String getType() {
		return " type=\"text\"";
	}

	//文本框后面的文本
	public String getSuffix() {
		if (suffix == null) {
			return "";
		}else {
			return suffix;
		}
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	//表单的浏览器自动完成功能
	public String getAutocompleteAttr() {
		if (autocomplete == false) {
			return " autocomplete=\"off\"";
		}else {
			return "";
		}
	}
	public void setAutocomplete(boolean autocomplete) {
		this.autocomplete = autocomplete;
	}
}

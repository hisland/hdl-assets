package com.cdsf.tag.base;

import java.util.ResourceBundle;

import javax.servlet.jsp.tagext.BodyTagSupport;

/**
 * @author hdl
 * @description handle some i18n process
 */
@SuppressWarnings("serial")
public abstract class TagI18n extends BodyTagSupport {
	protected static final String COLON = ":";
	protected static ResourceBundle bundle = null;
	
	//表单元素前置文本[国际化key/文本],文本优先
	private String i18n;
	private String text;
	
	/**
	 * @author hdl
	 * @param ResourceBundle bund
	 * set the i18n bundle
	 */
	public static void setBundle(ResourceBundle bund) {
		bundle = bund;
	}

	/**
	 * @author hdl
	 * @param text
	 * adjust character
	 */
	public static String fixText(String text) {
		//2个字符中间加4个&nbsp;
		if (text.length() == 2) {
			text = text.replaceFirst(".", "$0&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		//3个字符间隔加1个&nbsp;
		else if (text.length() == 3) {
			text = text.replaceFirst("(.)(.)", "$1&nbsp;$2&nbsp;");
		}
		return text;
	}
	
	//i18n,text二选一,text优先
	public void setI18n(String i18n) {
		this.i18n = i18n;
	}
	public String getI18n() {
		if (bundle != null) {
			return String.valueOf(bundle.getObject(i18n));
		}else {
			return i18n;
		}
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getText() {
		if (text != null) {
			return text + COLON;
		}else {
			return getI18n() + COLON;
		}
	}
}

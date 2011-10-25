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
}

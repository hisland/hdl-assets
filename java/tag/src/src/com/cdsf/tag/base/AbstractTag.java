package com.cdsf.tag.base;

import java.util.ResourceBundle;

import javax.servlet.jsp.tagext.BodyTagSupport;

/**
 * @author hdl
 * @description handle some common process
 */
@SuppressWarnings("serial")
public abstract class AbstractTag extends BodyTagSupport {
	public static ResourceBundle bundle = null;
	
	/**
	 * @author hdl
	 * @param bundle
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
			text = text.substring(0, 1) + "&nbsp;&nbsp;&nbsp;&nbsp;" + text.substring(1, 2);
		}
		//3个字符间隔加1个&nbsp;
		else if (text.length() == 3) {
			text = text.substring(0, 1) + "&nbsp;" + text.substring(1, 2) + "&nbsp;" + text.substring(2, 3);
		}
		//末尾加上:
		return text += ":";
	}
}

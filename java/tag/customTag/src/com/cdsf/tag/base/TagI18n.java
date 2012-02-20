package com.cdsf.tag.base;

import java.util.ResourceBundle;

import javax.servlet.jsp.tagext.BodyTagSupport;

/**
 * 处理国际化与文本的基础类
 * @author hedingliang
 */
@SuppressWarnings("serial")
public abstract class TagI18n extends BodyTagSupport {
	protected static final String COLON = "：";
	protected static ResourceBundle bundle = null;
	
	//表单元素前置文本[国际化key/文本],文本优先
	private String i18n;
	private String text;
	
	/**
	 * @author hedingliang
	 * @param bundle 设置国际化资源文件的引用
	 */
	public static void setBundle(ResourceBundle bundle) {
		TagI18n.bundle = bundle;
	}

	/**
	 * @author hedingliang
	 * @param text 需要对齐的文本
	 * @return 传入的text为2个字符时,在中间加4个&nbsp;, 3个字符时各加1个 &nbsp;
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
	
	public void setI18n(String i18n) {
		this.i18n = i18n;
	}
	/**
	 * @author hedingliang
	 * @return 根据i18n从bundle里获取对应值,如果没有bundle直接返回key
	 */
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
	/**
	 * @author hedingliang
	 * @return text和i18n同时存在时, text优先考虑 
	 */
	public String getText() {
		if (text != null) {
			return text;
		}else {
			return getI18n();
		}
	}
	
	/**
	 * @author hedingliang
	 * @return text加上冒号
	 */
	public String getLabel() {
		return getText() + COLON;
	}
}

package com.cdsf.tag.base;

/**
 * @author hdl
 * @description handle some common attribute
 */
@SuppressWarnings("serial")
public abstract class TagAttr extends TagI18n {
	protected static final String COLON = ":";
	
	private String name;
	private String id;
	private String wrapId;
	
	//表单元素前置文本[国际化key/文本],文本优先
	private String i18n;
	private String text;
	
	private String style;
	private String cssclass;
	private String defaultStyle;
	private String defaultCssclass;
	
	private String value;
	
	//为true时表单元素会被[禁用/只读], 禁用优先
	private boolean disabled;
	private boolean readonly;
	
	//为true时会在前面加红色*号
	private boolean required;

	//获取公共属性
	public String getCommonAttr() {
		StringBuilder sb = new StringBuilder();
		sb.append(getName())
		.append(getId())
		.append(getStyle())
		.append(getCssclass())
		.append(getDisabledReadonly());
		return sb.toString();
	}

	//text的name属性
	public String getName() {
		if (name != null) {
			return " name=\"" + name + "\"";
		}else {
			return "";
		}
	}
	public void setName(String name) {
		this.name = name;
	}
	//text的id属性
	public String getId() {
		if (id != null) {
			return " id=\"" + id + "\"";
		}else {
			return getName();
		}
	}
	public void setId(String id) {
		this.id = id;
	}
	
	//外层包含块id
	public String getWrapId() {
		if (wrapId != null) {
			return " id=\"" + wrapId + "\"";
		}else {
			return "";
		}
	}
	public void setWrapId(String wrapId) {
		this.wrapId = wrapId;
	}
	
	//标签的label, i18n,text二选一,text优先
	public void setI18n(String i18n) {
		this.i18n = i18n;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getText(String key) {
		if (bundle != null) {
			return String.valueOf(bundle.getObject(key));
		}else {
			return key;
		}
	}
	public String getLable() {
		String rs = "";
		//是否必须,根据此会在前面加红色*号
		if (required == true) {
			rs = "<strong class=\"red\">*</strong>";
		}
		if (text != null) {
			return rs + text + COLON;
		}else {
			return rs + getText(i18n) + COLON;
		}
	}

	//text的style属性
	public String getStyle() {
		if (style != null) {
			return " style=\"" + (defaultStyle == null ? style : defaultStyle + style) + "\"";
		}else {
			return defaultStyle == null ? "" : " style=\"" + defaultStyle + "\"";
		}
	}
	public void setStyle(String style) {
		this.style = style;
	}

	//text的class属性
	public String getCssclass() {
		if (cssclass != null) {
			return " class=\"" + (defaultCssclass == null ? cssclass : defaultCssclass + " " + cssclass) + "\"";
		}else {
			return defaultCssclass == null ? "" : " class=\"" + defaultCssclass + "\"";
		}
	}
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}

	public void setDefaultStyle(String defaultStyle) {
		this.defaultStyle = defaultStyle;
	}
	public void setDefaultCssclass(String defaultCssclass) {
		this.defaultCssclass = defaultCssclass;
	}

	//默认的value属性
	public String getValue() {
		if (value != null) {
			return " value=\"" + value + "\"";
		}else {
			return "";
		}
	}
	public void setValue(String value) {
		this.value = value;
	}

	//readonly, disabled二选一, disabled优先
	public void setDisabled(String disabled) throws Exception {
		if ("true".equals(disabled)) {
			this.disabled = true;
		}else {
			throw new Exception("\n\n\n disabled must be true!----<<<\n\n");
		}
	}
	public void setReadonly(String readonly) throws Exception {
		if ("true".equals(readonly)) {
			this.readonly = true;
		}else {
			throw new Exception("\n\n\n readonly must be true!----<<<\n\n");
		}
	}
	public String getDisabledReadonly() {
		if (disabled != false) {
			return " disabled=\"disabled\"";
		}else {
			if (readonly != false) {
				return " readonly=\"readonly\"";
			}else {
				return "";
			}
		}
	}

	public void setRequired(String required) throws Exception {
		if ("true".equals(required)) {
			this.required = true;
		}else {
			throw new Exception("\n\n\n required must be true!----<<<\n\n");
		}
	}
}

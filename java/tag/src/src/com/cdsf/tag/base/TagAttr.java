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
	
	private String value;
	
	//为true时表单元素会被[禁用/只读], 禁用优先
	private boolean disabled;
	private boolean readonly;
	
	//为true时会在前面加红色*号
	private boolean required;

	//text的name属性
	public String getName() {
		if (name == null) {
			return "";
		}else {
			return " name=\"" + name + "\"";
		}
	}
	public void setName(String name) {
		this.name = name;
	}
	//text的id属性
	public String getId() {
		if (id == null) {
			return getName();
		}else {
			return " id=\"" + id + "\"";
		}
	}
	public void setId(String id) {
		this.id = id;
	}
	
	//外层包含块id
	public String getWrapId() {
		if (wrapId == null) {
			return "";
		}else {
			return " id=\"" + wrapId + "\"";
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
		if (bundle == null) {
			return key;
		}else {
			return String.valueOf(bundle.getObject(key));
		}
	}
	public String getLable() {
		if (text == null) {
			return getText(i18n) + COLON;
		}else {
			return text + COLON;
		}
	}

	//text的style属性
	public String getStyle() {
		if (style == null) {
			return "";
		}else {
			return " style=\"" + style + "\"";
		}
	}
	public void setStyle(String style) {
		this.style = style;
	}

	//text的class属性
	public String getCssclass() {
		if (cssclass == null) {
			return "";
		}else {
			return " class=\"" + cssclass + "\"";
		}
	}
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}

	//默认的value属性
	public String getValue() {
		if (value == null) {
			return "";
		}else {
			return " value=\"" + value + "\"";
		}
	}
	public void setValue(String value) {
		this.value = value;
	}

	//readonly, disabled二选一, disabled优先
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	public void setReadonly(boolean readonly) {
		this.readonly = readonly;
	}
	public String getDisabledReadonly() {
		if (disabled == false) {
			if (readonly == false) {
				return "";
			}else {
				return " readonly=\"readonly\"";
			}
		}else {
			return " disabled=\"disabled\"";
		}
	}

	//是否必须,根据此会在前面加红色*号
	public String getRequiredString() {
		if (required == true) {
			return "<strong class=\"red\">*</strong>";
		}else {
			return "";
		}
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
}

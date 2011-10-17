package com.cdsf.tag.base;

/**
 * @author hdl
 * @description handle some common attribute
 */
@SuppressWarnings("serial")
public abstract class TagAttribute extends AbstractTag {
	
	private String name;
	private String id;
	private String i18n;
	private String text;
	private String style;
	private String cssclass;
	private String value;
	private String suffix;
	private int maxlength;
	private boolean disabled;
	private boolean readonly;
	private boolean required;
	private boolean autocomplete;
	protected StringBuffer sb = new StringBuffer();

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
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
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
			return getText(i18n);
		}else {
			return text;
		}
	}

	//表单的浏览器自动完成功能
	public String getAutocomplete() {
		if (autocomplete == false) {
			return "";
		}else {
			return " autocomplete=\"off\"";
		}
	}
	public void setAutocomplete(boolean autocomplete) {
		this.autocomplete = autocomplete;
	}

	//文本框后面的文本
	public String getSuffix() {
		return suffix;
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
}

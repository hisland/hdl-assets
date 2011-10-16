package com.cdsf.tag.base;

/**
 * @author hdl
 * @description handle some common attribute
 */
@SuppressWarnings("serial")
public class TagAttribute extends AbstractTag {
	
	private String i18n;
	private String text;
	private String name;
	private String id;
	private String style;
	private String cssclass;
	private String maxlength;
	private String value;
	private boolean disabled;
	private boolean readonly;
	private boolean required;
	private boolean autocomplete;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public String getCssclass() {
		return cssclass;
	}
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}
	public String getMaxlength() {
		return maxlength;
	}
	public void setMaxlength(String maxlength) {
		this.maxlength = maxlength;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public boolean isDisabled() {
		return disabled;
	}
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	public boolean isReadonly() {
		return readonly;
	}
	public void setReadonly(boolean readonly) {
		this.readonly = readonly;
	}
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
	public String getI18n() {
		return i18n;
	}
	public void setI18n(String i18n) {
		this.i18n = i18n;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isAutocomplete() {
		return autocomplete;
	}
	public void setAutocomplete(boolean autocomplete) {
		this.autocomplete = autocomplete;
	}
	
}

package com.cdsf.tag;

import java.io.IOException;

import com.cdsf.tag.base.Item;

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
public class Text extends Item {
	private String name;
	private String id;
	
	private String style;
	private String cssclass;
	
	//为true时表单元素会被[禁用/只读], 禁用优先
	private boolean disabled;
	private boolean readonly;

	private String value;
	private String suffix;
	//默认关闭浏览器的自动完成功能
	private String autocomplete;
	private String maxlength;
	private String dataValidType;
	
	@Override
	public void childDo() {
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("<input");
			sb.append(getType());
			sb.append(getName());
			sb.append(getId());
			sb.append(getStyle());
			sb.append(getCssclass());
			sb.append(getValue());
			sb.append(getDisabledReadonly());
			sb.append(getAutocomplete());
			sb.append(getMaxlengthAttr());
			sb.append(getDataValidType());
			sb.append(" />");
			
			sb.append(getSuffix());
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//子标签可覆盖可设置type
	public String getType() {
		return " type=\"text\"";
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

	//text的style属性
	public String getStyle() {
		if (style != null) {
			return " style=\"" + style + "\"";
		}else {
			return "";
		}
	}
	public void setStyle(String style) {
		this.style = style;
	}

	//text的class属性
	public String getCssclass() {
		return " class=\"text1" + (cssclass != null ? " "+cssclass : "") + "\"";
	}
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
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
	public void setDisabled(String disabled){
		if ("true".equals(disabled)) {
			this.disabled = true;
		}
	}
	public void setReadonly(String readonly){
		if ("true".equals(readonly)) {
			this.readonly = true;
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

	//文本框后面的文本
	public String getSuffix() {
		return suffix != null ? suffix : "";
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	//表单的浏览器自动完成功能
	public String getAutocomplete() {
		return autocomplete != null ? " autocomplete=\"off\"" : "";
	}
	public void setAutocomplete(String autocomplete){
		if ("true".equals(autocomplete)) {
			this.autocomplete = autocomplete;
		}
	}

	//text的maxlength属性
	public String getMaxlengthAttr() {
		return maxlength != null ? " maxlength=\"" + maxlength + "\"" : "";
	}
	public void setMaxlength(String maxlength) {
		if ("true".equals(maxlength)) {
			this.maxlength = maxlength;
		}
	}
	
	//验证信息
	public String getDataValidType() {
		return dataValidType != null ? " data-valid-type=\"" + dataValidType + "\"" : "";
	}
	public void setDataValidType(String dataValidType) {
		this.dataValidType = dataValidType;
	}
}

package com.cdsf.tag;

import com.cdsf.tag.base.Item;

/**
 * 标签结构:
<pre>
{@literal
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</div>
</div>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class Text extends Item {
	protected String name;
	protected String id;
	
	protected String style;
	protected String cssclass;
	
	//为true时表单元素会被[禁用/只读], 禁用优先
	protected boolean disabled;
	protected boolean readonly;

	protected String value;
	protected String suffix;
	//默认关闭浏览器的自动完成功能
	protected boolean autocomplete;
	protected int maxlength;
	protected String dataValidType;
	
	@Override
	public void preInit() {
		super.preInit();
		
		if (iptWidth != 124) {
			if (style != null) {
				setStyle("width:" + (iptWidth - 4) + "px;" + style);
			} else {
				setStyle("width:" + (iptWidth - 4) + "px;");
			}
		}
	}
	
	@Override
	public String beforeBody() {
		StringBuffer sb = new StringBuffer();
		sb.append("<input");
		sb.append(getType());
		sb.append(getName());
		sb.append(getId());
		sb.append(getStyle());
		sb.append(getCssclass());
		sb.append(getValue());
		sb.append(getDisabledReadonly());
		sb.append(getAutocompleteAttr());
		sb.append(getMaxlengthAttr());
		sb.append(getDataValidType());
		sb.append(" />");
		
		sb.append(getSuffix());
		return sb.toString();
	}
	
	@Override
	public void clean() {
		setStyle(null);
		super.clean();
	}

	/**
	 * @author hedingliang
	 * @return type="xx"
	 */
	public String getType() {
		return " type=\"text\"";
	}

	/**
	 * @author hedingliang
	 * @return name="xx"
	 */
	public String getName() {
		return name != null ? " name=\"" + name + "\"" : "";
	}
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * @author hedingliang
	 * @return id="xx"
	 */
	public String getId() {
		return id != null ? " id=\"" + id + "\"" : getName();
	}
	public void setId(String id) {
		this.id = id;
	}
	
	/**
	 * @author hedingliang
	 * @return style="xx"
	 */
	public String getStyle() {
		return style != null ? " style=\"" + style + "\"" : "";
	}
	public void setStyle(String style) {
		this.style = style;
	}

	/**
	 * @author hedingliang
	 * @return class="xx"
	 */
	public String getCssclass() {
		return " class=\"text1" + (cssclass != null ? " "+cssclass : "") + "\"";
	}
	public void setCssclass(String cssclass) {
		this.cssclass = cssclass;
	}

	/**
	 * @author hedingliang
	 * @return value="xx"
	 */
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

	/**
	 * @author hedingliang
	 * @return disabled="xx" 或者 readonly="xx", disabled优先
	 */
	public void setDisabled(boolean disabled){
		if (disabled) {
			this.disabled = disabled;
		}
	}
	public void setReadonly(boolean readonly){
		if (readonly) {
			this.readonly = readonly;
		}
	}
	public String getDisabledReadonly() {
		if (disabled) {
			return " disabled=\"disabled\"";
		}else {
			if (readonly) {
				return " readonly=\"readonly\"";
			}else {
				return "";
			}
		}
	}


	/**
	 * @author hedingliang
	 * @return 文本框后面的文本
	 */
	public String getSuffix() {
		return suffix != null ? "<span>" + suffix + "</span>" : "";
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	/**
	 * @author hedingliang
	 * @return autocomplete="off"
	 */
	public String getAutocompleteAttr() {
		return !autocomplete ? " autocomplete=\"off\"" : "";
	}
	public void setAutocomplete(boolean autocomplete){
		if (autocomplete) {
			this.autocomplete = autocomplete;
		}
	}

	/**
	 * @author hedingliang
	 * @return maxlength="xx"
	 */
	public String getMaxlengthAttr() {
		return maxlength != 0 ? " maxlength=\"" + maxlength + "\"" : "";
	}
	public void setMaxlength(int maxlength) {
		this.maxlength = maxlength;
	}
	
	/**
	 * @author hedingliang
	 * @return 验证信息, data-valid-type="xx"
	 */
	public String getDataValidType() {
		return dataValidType != null ? " data-valid-type=\"" + dataValidType + "\"" : "";
	}
	public void setDataValidType(String dataValidType) {
		this.dataValidType = dataValidType;
	}
}

package com.cdsf.tag;

import com.cdsf.tag.base.Item;

/**
 * 标签结构:
<pre>
{@literal
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="checkbox1" type="checkbox" name="" value="" checked="true" />
	</div>
</div>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class Checkbox extends Item {
	private boolean checked;
	
	private String name;
	private String id;
	private String value;
	
	private String style;
	private String cssclass;
	
	//为true时表单元素会被[禁用/只读], 禁用优先
	private boolean disabled;
	private boolean readonly;
	
	@Override
	public String beforeBody() {
		StringBuffer sb = new StringBuffer();
		sb.append("<input type=\"checkbox\"");
		sb.append(getName());
		sb.append(getId());
		sb.append(getStyle());
		sb.append(getCssclass());
		sb.append(getValue());
		sb.append(getChecked());
		sb.append(getMore());
		sb.append(getDisabledReadonly());
		sb.append(" />");
		return sb.toString();
	};
	
	public String getMore() {
		return "";
	}

	public String getChecked() {
		if (checked) {
			return " checked=\"checked\"";
		}else {
			return "";
		}
	}
	public void setChecked(String checked){
		if ("true".equals(checked)) {
			this.checked = true;
		}
	}

	/**
	 * @author hedingliang
	 * @return name="xx"
	 */
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
	
	/**
	 * @author hedingliang
	 * @return id="xx"
	 */
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
	
	/**
	 * @author hedingliang
	 * @return style="xx"
	 */
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

	/**
	 * @author hedingliang
	 * @return class="xx"
	 */
	public String getCssclass() {
		return " class=\"checkbox" + (cssclass != null ? " "+cssclass : "") + "\"";
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
}

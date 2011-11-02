package com.cdsf.tag;

import com.cdsf.tag.base.Item;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<select class="text1" name="" value="">
			<option value="0">text</option>
		</select>
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Select extends Item {
	private String name;
	private String id;
	
	private String style;
	private String cssclass;
	
	private boolean disabled;

	private String value;
	
	@Override
	public void preInit() {
		//内部调用时会保留上一次的值,初始化一次
		setStyle(null);
		
		super.preInit();
		
		if (iptWidth != 124) {
			if (style != null) {
				setStyle("width:" + iptWidth + "px;" + style);
			} else {
				setStyle("width:" + iptWidth + "px;");
			}
		}
	}
	
	@Override
	public String beforeBody() {
		StringBuffer sb = new StringBuffer();
		sb.append("<select");
		sb.append(getName());
		sb.append(getId());
		sb.append(getStyle());
		sb.append(getCssclass());
		sb.append(getValue());
		sb.append(getDisabled());
		sb.append(">");
		return sb.toString();
	};
	
	@Override
	public String afterBody() {
		return "</select>";
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
		return " class=\"select1" + (cssclass != null ? " "+cssclass : "") + "\"";
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
	public String getDisabled() {
		if (disabled != false) {
			return " disabled=\"disabled\"";
		}else {
			return "";
		}
	}
}

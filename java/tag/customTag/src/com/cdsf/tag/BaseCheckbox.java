package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;

import com.cdsf.tag.base.TagI18n;

/**
 * 标签结构:
<pre>
{@literal
<label class="label-1r">
	<input type="checkbox" class="checkbox3" name="" value="" />值1
</label>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class BaseCheckbox extends TagI18n {
	private String name;
	private String id;
	private String value;
	private boolean disabled;
	private boolean checked;
	private boolean labelBlock;
	
	@Override
	public int doStartTag() {
		return SKIP_BODY;
	}
	
	@Override
	public int doEndTag() throws JspException {
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("<label class=\"");
			if (labelBlock) {
				sb.append("label-1r");
			}else {
				sb.append("label");
			}
			sb.append("\">");
			sb.append("<input class=\"checkbox2\"");
			sb.append(getType());
			sb.append(getName());
			sb.append(getId());
			sb.append(getValue());
			sb.append(getCheckedAttr());
			sb.append(getDisabledAttr());
			sb.append(" />");
			sb.append(getText());
			sb.append("</label>");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}
	
	//子标签可覆盖可设置type
	public String getType() {
		return " type=\"checkbox\"";
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

	public void setDisabled(boolean disabled){
		if (disabled) {
			this.disabled = disabled;
		}
	}
	public String getDisabledAttr() {
		if (disabled) {
			return " disabled=\"disabled\"";
		}else {
			return "";
		}
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

	public String getCheckedAttr() {
		if (checked) {
			return " checked=\"checked\"";
		}else {
			return "";
		}
	}
	public void setChecked(boolean checked){
		if (checked) {
			this.checked = checked;
		}
	}

	public void setLabelBlock(boolean labelBlock) {
		if (labelBlock) {
			this.labelBlock = labelBlock;
		}
	}
}

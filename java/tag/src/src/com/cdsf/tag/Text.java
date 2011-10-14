package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.cdsf.tag.base.Common;


/**
 * @author hdl
 * 标签结构:
<li class="ls1-item">
	<span class="ls1-text">输入文字:</span>
	<span class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</span>
</li>
 */
public class Text extends BodyTagSupport {
	private static final long serialVersionUID = -5889341190699449172L;
	
	private String label;
	private String name;
	private String id;
	private String style;
	private String cssclass;
	private String maxlength;
	private String value;
	private String disabled;
	private String readonly;
	private String required;

	@Override
	public int doStartTag() throws JspException {
		JspWriter out = pageContext.getOut();
		try {
			out.write("<li class=\"ls1-item\">");
			out.write("<span class=\"ls1-text\">");
			if (required != null) {
				out.write("<b class=\"red\">*</b>");
			}
			out.write(Common.fixLable(label));
			out.write("</span><span class=\"ls1-ipts\">");
			out.write("<input class=\"text1");
			if (cssclass != null) {
				out.write(" " + cssclass);
			}
			out.write("\" type=\"text\" name=\"" + name + "\" id=\"");
			if (id != null) {
				out.write(id);
			}else {
				out.write(name);
			}
			out.write("\" value=\"");
			if (value != null) {
				out.write(value);
			}
			out.write("\"");
			if (disabled != null) {
				out.write(" disabled=\"disabled\"");
			}else if (readonly != null) {
				out.write(" readonly=\"readonly\"");
			}
			out.write(" />");
			out.write("</span></li>");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE;
	}

	//getters and setters for private properties
	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

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

	public String getDisabled() {
		return disabled;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public String getReadonly() {
		return readonly;
	}

	public void setReadonly(String readonly) {
		this.readonly = readonly;
	}

	public String getRequired() {
		return required;
	}

	public void setRequired(String required) {
		this.required = required;
	}
}

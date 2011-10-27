package com.cdsf.tag.base;

import java.io.IOException;

import javax.servlet.jsp.JspException;


/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">label:</div>
	<div class="ls1-ipts">
		
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Item extends TagI18n {
	private String cols;
	private String rows;
	private String required;
	private int textWidth;
	private int iptWidth;
	private int itemWidth = 230;
	private String wrapId;

	//作为父类时,子类覆盖此方法可在内部嵌入内容
	public void childDo(){}
	//作为父类时,子类需要进行一些参数的初始化
	public void preInit(){}
	
	@Override
	public int doStartTag(){
		try {
			preInit();
			
			StringBuffer sb = new StringBuffer();
			sb.append("<div class=\"ls1-item");
			sb.append(getCols());
			sb.append(getRows());
			sb.append("\"");
			sb.append(getWrapId());
			sb.append(">");
			sb.append("<div class=\"ls1-text\"");
			sb.append(getTextWidth());
			sb.append(">");
			sb.append(getText());
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\"");
			sb.append(getIptWidth());
			sb.append(">");
			
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_BUFFERED;
	}
	
	@Override
	public int doEndTag() throws JspException {
		try {
			StringBuffer sb = new StringBuffer();
			if (bodyContent != null) {
				sb.append(bodyContent.getString());
			}else {
				childDo();
			}
			sb.append("</div>");
			sb.append("</div>");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	//item列数
	public String getCols() {
		return cols != null ? " ls1-"+cols+"c" : "";
	}
	public void setCols(String cols) {
		if ("2".equals(cols) || "3".equals(cols)) {
			this.cols = cols;
		}
	}

	//item行数
	public String getRows() {
		return rows != null ? " ls1-"+rows+"r" : "";
	}
	public void setRows(String rows) {
		if ("3".equals(rows) || "4".equals(rows)) {
			this.rows = rows;
		}
	}

	//label区域宽度
	public String getTextWidth() {
		if (textWidth != 0) {
			return "style=\"width:" + textWidth + "px\"";
		}else {
			return "";
		}
	}
	public String getIptWidth() {
		if (textWidth != 0) {
			return "style=\"width:" + iptWidth + "px\"";
		}else {
			return "";
		}
	}
	public void setTextWidth(String textWidth) {
		try {
			int width = Integer.valueOf(textWidth);
			this.textWidth = width;
			this.iptWidth = this.itemWidth - width - 6;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getRequired() {
		return required;
	}
	public void setRequired(String required) {
		if ("true".equals(required)) {
			this.required = required;
		}
	}
	
	public String getText() {
		//是否必须,根据此会在前面加红色*号
		return (required != null ? "<strong class=\"red\">*</strong>" : "") + super.getText();
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
}

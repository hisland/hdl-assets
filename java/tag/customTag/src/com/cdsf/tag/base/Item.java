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
	private String wrapId;
	private boolean required;
	protected int textWidth;
	protected int iptWidth;
	protected int itemWidth = 230;

	/**
	 * @author hedingliang
	 * @description 作为父类时,子类需要进行一些参数的初始化
	 */
	public void preInit() {
	}

	/**
	 * @author hedingliang
	 * @description 作为父类时,子类覆盖此方法返回body前面的内容
	 */
	public String beforeBody() {
		return "";
	}

	/**
	 * @author hedingliang
	 * @description 作为父类时,子类覆盖此方法返回body后面的内容
	 */
	public String afterBody() {
		return "";
	}

	/**
	 * @author hedingliang
	 * @description 作为父类时,子类覆盖此方法返回修改后的bodyContent的内容
	 */
	public String modifyBody(){
		if (bodyContent != null) {
			return bodyContent.getString();
		} else {
			return "";
		}
	}
	
	@Override
	public int doStartTag(){
		try {
			//初始化长度信息
			if (this.textWidth != 0) {
				int cols = 1;
				if (this.cols != null ) {
					cols = Integer.valueOf(this.cols);
				}
				this.iptWidth = this.itemWidth * cols + (cols-1)*4 - this.textWidth - 6;
			}
			
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
			sb.append(getLabel());
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\"");
			sb.append(getIptWidth());
			sb.append(">");
			
			sb.append(beforeBody());
			
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
			
			sb.append(modifyBody());
			
			sb.append(afterBody());
			
			sb.append("</div>");
			sb.append("</div>");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	/**
	 * @author hedingliang
	 * @return ls1-*c 或者 ""
	 */
	public String getCols() {
		return cols != null ? " ls1-"+cols+"c" : "";
	}
	
	/**
	 * @author hedingliang
	 * @param cols 值只能为2或者3
	 */
	public void setCols(String cols) {
		if ("2".equals(cols) || "3".equals(cols)) {
			this.cols = cols;
		}
	}

	/**
	 * @author hedingliang
	 * @return ls1-*r 或者 ""
	 */
	public String getRows() {
		return rows != null ? " ls1-"+rows+"r" : "";
	}
	
	/**
	 * @author hedingliang
	 * @param rows 值只能为3,4或者5
	 */
	public void setRows(String rows) {
		if ("3".equals(rows) || "4".equals(rows) || "5".equals(rows)) {
			this.rows = rows;
		}
	}

	/**
	 * @author hedingliang
	 * @return style="xx"
	 * @description label区域宽度
	 */
	public String getTextWidth() {
		if (textWidth != 0) {
			return "style=\"width:" + textWidth + "px\"";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return style="xx"
	 * @description ipt区域宽度
	 */
	public String getIptWidth() {
		if (textWidth != 0) {
			return "style=\"width:" + iptWidth + "px\"";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @param textWidth ipt区域宽度,只能为数字
	 */
	public void setTextWidth(String textWidth) {
		try {
			this.textWidth = Integer.valueOf(textWidth);
		} catch (NumberFormatException e) {
			//not a number do nothin!
		}
	}

	/**
	 * @author hedingliang
	 * @param required 是否必须,只能为true
	 */
	public void setRequired(String required) {
		if ("true".equals(required)) {
			this.required = true;
		}
	}

	/**
	 * @author hedingliang
	 * @return 根据是否必须,会在前面加红色*号
	 */
	public String getLabel() {
		return (required ? "<strong class=\"red\">*</strong>" : "") + super.getLabel();
	}

	/**
	 * @author hedingliang
	 * @return 如果有id,返回id="id"
	 */
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

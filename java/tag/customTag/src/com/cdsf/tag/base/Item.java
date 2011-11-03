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
	protected String wrapId;
	protected boolean required;
	protected int cols = 1;
	protected int rows = 1;
	protected int itemWidth;
	protected int itemHeight;
	protected int textWidth = 100;
	protected int iptWidth = 124;
	protected int baseWidth = 230;
	protected int baseHeight = 24;

	/**
	 * @author hedingliang
	 * @description 作为父类时,宽高的初始化, 可能之前也可能之后, 所以需要子类执行super.preInit()调用
	 */
	public void preInit() {
		//初始化宽高
		itemWidth = baseWidth * cols + (cols-1)*4;
		iptWidth = itemWidth - textWidth - 6;
		itemHeight = baseHeight * rows + (rows-1)*4;
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

	/**
	 * @author hedingliang
	 * @description 标签会缓存,在一个标签输出完毕后执行一点清理工作
	 */
	public void clean(){}
	
	@Override
	public int doStartTag(){
		try {
			preInit();
			
			StringBuffer sb = new StringBuffer();
			sb.append("<div class=\"ls1-item\"");
			sb.append(getWrapId());
			sb.append(getWrapStyle());
			sb.append(">");
			sb.append("<div class=\"ls1-text\"");
			sb.append(getTextStyle());
			sb.append(">");
			sb.append(getLabel());
			sb.append("</div>");
			sb.append("<div class=\"ls1-ipts\"");
			sb.append(getIptStyle());
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
			
			clean();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	/**
	 * @author hedingliang
	 * @param cols 值只能为2或者3
	 */
	public void setCols(int cols) {
		if (cols > 1 && cols < 4) {
			this.cols = cols;
		}
	}
	
	/**
	 * @author hedingliang
	 * @param rows 值只能为3,4或者5
	 */
	public void setRows(int rows) {
		if (rows > 2 && rows < 6) {
			this.rows = rows;
		}
	}

	/**
	 * @author hedingliang
	 * @param textWidth ipt区域宽度,只能为数字
	 */
	public void setTextWidth(String textWidth) {
		if (("" + textWidth).matches("\\d+")) {
			this.textWidth = Integer.valueOf(textWidth);
		}
	}

	/**
	 * @author hedingliang
	 * @param required 是否必须,只能为true
	 */
	public void setRequired(boolean required) {
		if (required) {
			this.required = required;
		}
	}

	/**
	 * @author hedingliang
	 * @return width:xxpx
	 * @description label区域宽度
	 */
	public String getWrapStyle() {
		if (cols != 1 || rows != 1 || getWrapFloat() != null) {
			return "style=\"" + getWrapWidth() + getWrapHeight() + getWrapFloat() + "\"";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return width:xxpx;
	 * @description item的宽度
	 */
	public String getWrapWidth() {
		if (cols != 1) {
			return "width:" + itemWidth + "px;";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return height:xxpx;
	 * @description item的高度
	 */
	public String getWrapHeight() {
		if (rows != 1) {
			return "height:" + itemHeight + "px;";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return float:xx;
	 * @description item的浮动
	 */
	public String getWrapFloat() {
		return null;
	}

	/**
	 * @author hedingliang
	 * @return width:xxpx
	 * @description label区域宽度
	 */
	public String getTextStyle() {
		if (textWidth != 100 || rows != 1) {
			return "style=\"" + getTextWidth() + getTextHeight() + "\"";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return width:xxpx
	 * @description label区域宽度
	 */
	public String getTextWidth() {
		if (textWidth != 100) {
			return "width:" + textWidth + "px;";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return height:xxpx;
	 * @description item的高度
	 */
	public String getTextHeight() {
		if (rows != 1) {
			return "height:" + itemHeight + "px;line-height:" + itemHeight + "px;";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return width:xxpx
	 * @description label区域宽度
	 */
	public String getIptStyle() {
		if (cols != 1 || rows != 1 || textWidth != 100) {
			return "style=\"" + getIptWidth() + getIptHeight() + "\"";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return width:xxpx
	 * @description ipt区域宽度
	 */
	public String getIptWidth() {
		if (textWidth != 0 || cols != 1) {
			return "width:" + iptWidth + "px;";
		}else {
			return "";
		}
	}

	/**
	 * @author hedingliang
	 * @return height:xxpx;
	 * @description item的高度
	 */
	public String getIptHeight() {
		if (rows != 1) {
			return "height:" + (itemHeight - 6) + "px;";
		} else {
			return "";
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
		return wrapId != null ? " id=\"" + wrapId + "\"" : "";
	}
	public void setWrapId(String wrapId) {
		this.wrapId = wrapId;
	}
}

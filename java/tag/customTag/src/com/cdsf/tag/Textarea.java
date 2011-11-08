package com.cdsf.tag;



/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<textarea class="ls1-big-box"></textarea>
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Textarea extends Text {
	private boolean floatRight;
	
	@Override
	public void preInit() {
		if (rows == 1) {
			rows = 3;
		}
		super.preInit();
		
		if (itemHeight != 24) {
			if (style != null) {
				setStyle("height:" + (itemHeight - 6 - 6) + "px;" + style);
			} else {
				setStyle("height:" + (itemHeight - 6 - 6) + "px;");
			}
		}
	}
	
	@Override
	public String beforeBody() {
		StringBuffer sb = new StringBuffer();
		
		sb.append("<textarea");
		sb.append(getName());
		sb.append(getId());
		sb.append(getStyle());
		sb.append(getCssclass());
		sb.append(getDisabledReadonly());
		sb.append(getDataValidType());
		sb.append(">");
		
		return sb.toString();
	}
	
	@Override
	public String afterBody() {
		return "</textarea>";
	}
	
	@Override
	public String getWrapFloat() {
		if (floatRight) {
			return "float:right;";
		}else {
			return "";
		}
	}

	public void setFloatRight(boolean floatRight) {
		if (floatRight) {
			this.floatRight = floatRight;
		}
	}
	
	/**
	 * @author hedingliang
	 * @param rows 值只能为3-15
	 */
	public void setRows(int rows) {
		if (rows > 2 && rows < 16) {
			this.rows = rows;
		}
	}
}

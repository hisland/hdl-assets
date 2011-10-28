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
	@Override
	public void preInit() {
		setRows("3");
	}
	
	@Override
	public void setRows(String rows) {
		if ("3".equals(rows) || "4".equals(rows)) {
			super.setRows(rows);
		}else {
			super.setRows("3");
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
}

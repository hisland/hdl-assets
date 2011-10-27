package com.cdsf.tag;


/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class TextFuzzy extends Text {
	private boolean fuzzyChecked;
	private String fuzzyValue;
	
	@Override
	public void preInit() {
		setStyle("width:90px;");
	}
	
	@Override
	public String getSuffix() {
		if (fuzzyChecked) {
			StringBuffer sb = new StringBuffer();
			sb.append("<input type=\"checkbox\"");
			sb.append(getFuzzyValue());
			sb.append(getFuzzyChecked());
			sb.append(" />");
			return sb.toString();
		}else {
			return "";
		}
	}
	
	public String getFuzzyChecked() {
		if (fuzzyChecked) {
			return " checked=\"checked\"";
		}else {
			return "";
		}
	}
	public void setFuzzyChecked(String fuzzyChecked) {
		if ("true".equals(fuzzyChecked)) {
			this.fuzzyChecked = true;
		}
	}
	
	public String getFuzzyValue() {
		if (fuzzyValue != null) {
			return " value=\"" + fuzzyValue + "\"";
		}else {
			return "";
		}
	}
	public void setFuzzyValue(String fuzzyValue) {
		this.fuzzyValue = fuzzyValue;
	}
}

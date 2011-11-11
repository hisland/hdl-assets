package com.cdsf.tag;


/**
 * 标签结构:
<pre>
{@literal
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</div>
</div>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class TextFuzzy extends Text {
	private boolean fuzzyChecked;
	private String fuzzyValue;
	private String fuzzyName;
	
	@Override
	public void preInit() {
		super.preInit();
		
		if (style != null) {
			setStyle("width:100px;" + style);
		} else {
			setStyle("width:100px;");
		}
	}
	
	@Override
	public String getSuffix() {
		StringBuffer sb = new StringBuffer();
		sb.append("<input type=\"checkbox\" class=\"checkbox2\"");
		sb.append(getFuzzyName());
		sb.append(getFuzzyValue());
		sb.append(getFuzzyChecked());
		sb.append(" />");
		return sb.toString();
	}
	
	public String getFuzzyName() {
		return fuzzyName != null ? " name=\"" + fuzzyName + "\"" : "";
	}

	public void setFuzzyName(String fuzzyName) {
		this.fuzzyName = fuzzyName;
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

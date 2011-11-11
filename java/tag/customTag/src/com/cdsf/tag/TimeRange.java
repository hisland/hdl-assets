package com.cdsf.tag;

import com.cdsf.tag.base.Item;

/**
 * 标签结构:
<pre>
{@literal
<div class="ls1-item">
	<div class="ls1-text">XX开始段:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" /> - <input class="text1" type="text" name="" value="" />
	</div>
</div>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class TimeRange extends Item {
	private String valueStart;
	private String valueEnd;
	private String nameStart;
	private String nameEnd;
	private String idStart;
	private String idEnd;

	private boolean readonlyStart;
	private boolean readonlyEnd;

	private boolean disabledStart;
	private boolean disabledEnd;

	private String enableValue;
	private String enableName;
	private String enableText;
	private String enableI18n;
	private boolean enableChecked;
	
	@Override
	public void preInit() {
		setCols(2);
		super.preInit();
	}
	
	@Override
	public String beforeBody() {
		StringBuffer sb = new StringBuffer();
		sb.append("<input class=\"text1\" type=\"text\"");
		sb.append(getIdStart());
		sb.append(getNameStart());
		sb.append(getValueStart());
		sb.append(getDisabledReadonlyStart());
		sb.append(" />");
		sb.append(" - ");
		sb.append("<input class=\"text1\" type=\"text\"");
		sb.append(getIdEnd());
		sb.append(getNameEnd());
		sb.append(getValueEnd());
		sb.append(getDisabledReadonlyEnd());
		sb.append(" />");
		sb.append(getEnableStr());
		return sb.toString();
	}
	
	public String getValueStart() {
		if (valueStart != null) {
			return " value=\""+valueStart+"\"";
		}else {
			return "";
		}
	}
	public void setValueStart(String valueStart) {
		this.valueStart = valueStart;
	}
	
	public String getValueEnd() {
		if (valueEnd != null) {
			return " value=\""+valueEnd+"\"";
		}else {
			return "";
		}
	}
	public void setValueEnd(String valueEnd) {
		this.valueEnd = valueEnd;
	}
	
	public String getNameStart() {
		if (nameStart != null) {
			return " name=\""+nameStart+"\"";
		}else {
			return "";
		}
	}
	public void setNameStart(String nameStart) {
		this.nameStart = nameStart;
	}

	public String getNameEnd() {
		if (nameEnd != null) {
			return " name=\""+nameEnd+"\"";
		}else {
			return "";
		}
	}
	public void setNameEnd(String nameEnd) {
		this.nameEnd = nameEnd;
	}

	public String getIdStart() {
		if (idStart != null) {
			return " id=\""+idStart+"\"";
		}else {
			return "";
		}
	}
	public void setIdStart(String idStart) {
		this.idStart = idStart;
	}

	public String getIdEnd() {
		if (idEnd != null) {
			return " id=\""+idEnd+"\"";
		}else {
			return "";
		}
	}
	public void setIdEnd(String idEnd) {
		this.idEnd = idEnd;
	}

	public String getDisabledReadonlyStart() {
		if (disabledStart) {
			return " disabled=\"disabled\"";
		}else {
			if (readonlyStart) {
				return " readonly=\"readonly\"";
			}else {
				return "";
			}
		}
	}
	public String getDisabledReadonlyEnd() {
		if (disabledEnd) {
			return " disabled=\"disabled\"";
		}else {
			if (readonlyEnd) {
				return " readonly=\"readonly\"";
			}else {
				return "";
			}
		}
	}
	
	public void setReadonlyStart(boolean readonlyStart) {
		if (readonlyStart) {
			this.readonlyStart = readonlyStart;
		}
	}
	public void setReadonlyEnd(boolean readonlyEnd) {
		if (readonlyEnd) {
			this.readonlyEnd = readonlyEnd;
		}
	}
	public void setDisabledStart(boolean disabledStart) {
		if (disabledStart) {
			this.disabledStart = disabledStart;
		}
	}
	public void setDisabledEnd(boolean disabledEnd) {
		if (disabledEnd) {
			this.disabledEnd = disabledEnd;
		}
	}
	
	public String getEnableValue() {
		return enableValue;
	}
	public void setEnableValue(String enableValue) {
		this.enableValue = enableValue;
	}
	
	public String getEnableName() {
		return enableName;
	}
	public void setEnableName(String enableName) {
		this.enableName = enableName;
	}
	
	public void setEnableChecked(boolean enableChecked) {
		if (enableChecked) {
			this.enableChecked = enableChecked;
		}
	}
	
	public String getEnableStr() {
		if (enableValue != null) {
			if (enableChecked) {
				return "<label class=\"label\"><input class=\"checkbox2\" type=\"checkbox\" name=\""
						+ enableName
						+ "\" value=\""
						+ enableValue
						+ "\" checked=\"checked\" />"
						+ getEnableText()
						+ "</label>";
			} else {
				return "<label class=\"label\"><input class=\"checkbox2\" type=\"checkbox\" name=\"\"+enableName+\"\" value=\""
						+ enableValue + "\" />" + getEnableText() + "</label>";
			}
		} else {
			return "";
		}
	}

	public String getEnableText() {
		if (enableText != null) {
			return enableText;
		}else {
			return getEnableI18n();
		}
	}
	public void setEnableText(String enableText) {
		this.enableText = enableText;
	}

	public String getEnableI18n() {
		if (bundle != null) {
			return String.valueOf(bundle.getObject(enableI18n));
		}else {
			return enableI18n;
		}
	}
	public void setEnableI18n(String enableI18n) {
		this.enableI18n = enableI18n;
	}
}

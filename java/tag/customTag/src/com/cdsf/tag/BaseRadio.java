package com.cdsf.tag;


/**
 * @author hdl
 * @description 标签结构:
	<label class="label-1r"><input type="radio" class="checkbox3" name="" value="" />值1</label>
 */
@SuppressWarnings("serial")
public class BaseRadio extends BaseCheckbox {
	private boolean selected;
	
	//子标签可覆盖可设置type
	public String getType() {
		return " type=\"radio\"";
	}

	public String getChecked() {
		if (selected) {
			return " selected=\"selected\"";
		}else {
			return "";
		}
	}
	public void setSelected(String selected){
		if ("true".equals(selected)) {
			this.selected = true;
		}
	}
}

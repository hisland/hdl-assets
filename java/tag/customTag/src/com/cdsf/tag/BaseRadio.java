package com.cdsf.tag;


/**
 * @author hdl
 * @description 标签结构:
	<label class="label-1r"><input type="radio" class="checkbox3" name="" value="" />值1</label>
 */
@SuppressWarnings("serial")
public class BaseRadio extends BaseCheckbox {
	public String getType() {
		return " type=\"radio\"";
	}
}

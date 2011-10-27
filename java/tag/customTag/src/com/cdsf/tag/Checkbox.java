package com.cdsf.tag;

import com.cdsf.tag.base.Item;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="checkbox1" type="checkbox" name="" value="" checked="true" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Checkbox extends Item {
	private boolean checked;
	
	@Override
	public void childDo() {
		
	};

	public String getChecked() {
		if (checked) {
			return " checked=\"checked\"";
		}else {
			return "";
		}
	}
	public void setChecked(String checked){
		if ("true".equals(checked)) {
			this.checked = true;
		}
	}
}

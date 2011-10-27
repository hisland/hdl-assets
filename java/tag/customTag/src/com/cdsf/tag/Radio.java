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
public class Radio extends Item {
	@Override
	public String beforeBody() {
		return "";
	};
	
	@Override
	public String afterBody() {
		return "";
	}
}

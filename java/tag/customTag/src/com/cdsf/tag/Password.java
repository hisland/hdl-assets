package com.cdsf.tag;

/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="password" name="" value="" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Password extends Text {
	
	@Override
	public String getType() {
		return " type=\"password\"";
	}
}
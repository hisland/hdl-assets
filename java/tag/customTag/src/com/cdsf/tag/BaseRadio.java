package com.cdsf.tag;


/**
 * 标签结构:
<pre>
{@literal
<label class="label-1r">
	<input type="radio" class="checkbox3" name="" value="" />值1
</label>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class BaseRadio extends BaseCheckbox {
	public String getType() {
		return " type=\"radio\"";
	}
}

package com.cdsf.tag;


/**
 * 标签结构:
<pre>
{@literal
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
		<!-- 标签体会显示在这里 -->
	</div>
</div>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class TextHole extends Text {
	@Override
	public String beforeBody() {
		setReadonly(true);
		return super.beforeBody();
	}
}

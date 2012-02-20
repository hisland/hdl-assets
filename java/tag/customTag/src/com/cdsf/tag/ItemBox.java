package com.cdsf.tag;


/**
 * 标签结构:
<pre>
{@literal
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<div class="ls1-big-box">
			
		</div>
	</div>
</div>
}
</pre>
 * @author hedingliang
 */
@SuppressWarnings("serial")
public class ItemBox extends Textarea {
	@Override
	public String beforeBody() {
		StringBuffer sb = new StringBuffer();
		
		sb.append("<div");
		sb.append(getId());
		sb.append(getStyle());
		sb.append(getCssclass());
		sb.append(">");
		
		return sb.toString();
	}
	
	@Override
	public String afterBody() {
		return "</div>";
	}
	
	/**
	 * @author hedingliang
	 * @return class="xx"
	 */
	public String getCssclass() {
		return " class=\"ls1-big-box" + (cssclass != null ? " "+cssclass : "") + "\"";
	}
}

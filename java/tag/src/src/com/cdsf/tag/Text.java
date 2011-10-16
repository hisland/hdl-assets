package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttribute;




/**
 * @author hdl
 * 标签结构:
<div class="ls1-item">
	<div class="ls1-text">输入文字:</div>
	<div class="ls1-ipts">
		<input class="text1" type="text" name="" value="" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Text extends TagAttribute {

	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		try {
			out.write("<div class=\"ls1-item\">");
			out.write("<div class=\"ls1-text\">输入文字:</div>");
			out.write("<div class=\"ls1-ipts\">");
			out.write("<input class=\"text1\" type=\"text\" name=\"\" value=\"\" />");
			out.write("</div>");
			out.write("</div>");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE;
	}
}

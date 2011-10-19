package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagAttr;

/**
 * @author hdl
 * 标签结构:
<form style="display:none;">
	<div class="ls1">
	</div>
	<div class="win1-btns">
		<input class="win1-btn-ok" type="submit" id="rSavedatabtn"  value="确定" />
		<input  class="win1-btn-cancle" type="button" id="rClosepopbtn" value="取消" />
	</div>
</form>
 */
@SuppressWarnings("serial")
public class Pop extends TagAttr {
	//默认关闭浏览器的自动完成功能
	private boolean autocomplete = false;
	
	@Override
	public int doStartTag(){
		StringBuffer sb = new StringBuffer();
		JspWriter out = pageContext.getOut();
		try {
//			sb.append("<form style=\"display:none;\">");
			sb.append("<form>");
			sb.append("<div class=\"ls1\">");
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_INCLUDE;
	}
	
	@Override
	public int doEndTag() throws JspException {
		StringBuffer sb = new StringBuffer();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("</div>");
			sb.append("<div class=\"win1-btns\">");
			sb.append("<input class=\"win1-btn-ok\" type=\"submit\" value=\"确定\" />");
			sb.append("<input  class=\"win1-btn-cancle\" type=\"button\" value=\"取消\" />");
			sb.append("</div></form>");
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	//表单的浏览器自动完成功能
	public String getAutocomplete() {
		if (autocomplete == false) {
			return " autocomplete=\"off\"";
		}else {
			return "";
		}
	}
	public void setAutocomplete(boolean autocomplete) {
		this.autocomplete = autocomplete;
	}
}

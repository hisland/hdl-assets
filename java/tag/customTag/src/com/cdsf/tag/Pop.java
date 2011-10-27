package com.cdsf.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import com.cdsf.tag.base.TagI18n;

/**
 * @author hdl
 * @description 标签结构:
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
public class Pop extends TagI18n {
	//默认关闭浏览器的自动完成功能
	private boolean autocomplete = false;
	private boolean needButtons = true;
	private String action;
	
	@Override
	public int doStartTag(){
		StringBuilder sb = new StringBuilder();
		JspWriter out = pageContext.getOut();
		try {
//			sb.append("<form style=\"display:none;\">");
			sb.append("<form");
			sb.append(getAction());
			sb.append(getAutocomplete());
			sb.append(">");
			sb.append("<div class=\"ls1\">");
			out.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_BUFFERED;
	}
	
	@Override
	public int doEndTag() throws JspException {
		StringBuilder sb = new StringBuilder();
		JspWriter out = pageContext.getOut();
		try {
			sb.append("</div>");
			if (needButtons) {
				sb.append("<div class=\"win1-btns\">");
				sb.append("<input class=\"win1-btn-ok\" type=\"submit\" value=\"确定\" />");
				sb.append("<input  class=\"win1-btn-cancle\" type=\"button\" value=\"取消\" />");
				sb.append("</div>");
			}
			sb.append("</form>");
			out.write("3");
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
	public void setAutocomplete(String autocomplete) throws Exception {
		if ("true".equals(autocomplete)) {
			this.autocomplete = true;
		}else {
			throw new Exception("\n\n\n autocomplete must be true!----<<<\n\n");
		}
	}
	
	public void setNeedButtons(String needButtons) throws Exception {
		if ("false".equals(needButtons)) {
			this.needButtons = false;
		}else {
			throw new Exception("\n\n\n needButtons must be false!----<<<\n\n");
		}
	}

	//form的action属性
	public String getAction() {
		if (action == null) {
			return "";
		}else {
			return " action=\"" + action + "\"";
		}
	}
	public void setAction(String action) {
		this.action = action;
	}
}

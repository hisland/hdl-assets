package com.cdsf.tag;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
public class Pop extends Query {
	//默认自动生成 确定 取消 按钮
	private boolean needButtons = true;
	
	@Override
	public int doStartTag(){
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("<form style=\"display:none;\"");
//			sb.append("<form");
			sb.append(getId());
			sb.append(getName());
			sb.append(getAction());
			sb.append(getAutocomplete());
			sb.append(">");
			sb.append("<div class=\"ls1\">");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_BODY_BUFFERED;
	}
	
	@Override
	public int doEndTag(){
		try {
			StringBuffer sb = new StringBuffer();
			String bc = "";
			if (bodyContent != null) {
				bc = bodyContent.getString();
			}

			Pattern p = Pattern.compile("(.+)(<div[^>]+win1-btns.+</div>)");
			Matcher m = p.matcher(bc);
			//顺序不可颠倒,因为需要find一次
			if (!m.find() || needButtons) {
				sb.append(bc);
				sb.append("</div>");
				sb.append("<div class=\"win1-btns\">");
				sb.append("<input class=\"win1-btn-ok\" type=\"submit\" value=\"确定\" />");
				sb.append("<input  class=\"win1-btn-cancle\" type=\"button\" value=\"取消\" />");
				sb.append("</div>");
			}else {
				sb.append(m.group(1));
				sb.append("</div>");
				sb.append(m.group(2));
			}
			
			sb.append("</form>");
			pageContext.getOut().write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public void setNeedButtons(String needButtons){
		if ("false".equals(needButtons)) {
			this.needButtons = false;
		}
	}
}

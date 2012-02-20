package bbq;
import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;


public class AAA extends SimpleTagSupport {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public void doTag() throws JspException, IOException {
		getJspContext().getOut().write("<p>--2</p>");
//		StringWriter w = new StringWriter();
//		getJspBody().invoke(w);
		getJspBody().invoke(null);
		getJspContext().getOut().write("<p>--2</p>");
	}
}

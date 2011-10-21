<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="anti" uri="/antispam2850-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	List ll = new ArrayList();
	ll.add("a");
	ll.add("b");
	ll.add("c");
	request.setAttribute("god", ll);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title> new document </title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<script type="text/javascript" src="assets/seed.js"></script>
	<script type="text/javascript">
		KISSY.use('reset-css, common-css, condition-list-css, popWin-css', function(S, undef) {

		});
	</script>
</head>
<body>
	<anti:query name="hello" action="test.action">
		<anti:text name="god" text="禁用标签" disabled="true" value="禁用标签" />
		<anti:text name="cc" text="只读标签" readonly="true" value="只读标签" />
		<anti:text name="god" text="最大长度4" value="" maxlength="4" />
		<anti:text name="cc" text="时间片" suffix="分钟" style="width:90px;" />
		<anti:text name="cc" text="必填项" required="true" />
		<anti:text name="cc" text="启用自动完成" autocomplete="true" />
		<anti:text name="cc" text="验证数字1-3" required="true" dataValidType="n1-3" />
		<anti:text name="cc" text="文本标签" />
		<anti:password name="cc" text="密码" />
		<anti:select name="cc" text="下拉" />
		<anti:select name="cc" text="c标签生成下拉项">
			<option value="">全部</option>
			<c:forEach items="${god}" var="ii">
				<option value="${ii}">${ii}</option>
			</c:forEach>
		</anti:select>
		<anti:textarea name="tt" text="备注">bbq</anti:textarea>
		<anti:checkbox name="queryForm.q_arg3" id="q_slur" text="启用" value="1" checked="true" />
		<anti:fuzzy name="queryForm.q_arg3" id="q_slur" text="模糊匹配" value="1" checked="true" dataFuzzyIds="#q_slur" />
	</anti:query>
	
	<anti:pop name="hello" action="pop.action">
		<anti:text name="cc" text="文本标签" />
	</anti:pop>
	
	<anti:pop name="hello" action="pop.action" needButtons="false">
		<anti:text name="cc" text="文本标签" />
		<div class="win1-btns">
			<input type="submit" value="确定" class="win1-btn-ok">
			<input type="button" value="取消" class="win1-btn-cancle">
			<input type="button" value="其它" class="win1-btn-cancle">
			<input type="button" value="自定义的" class="win1-btn-cancle">
		</div>
	</anti:pop>
</body>
</html>

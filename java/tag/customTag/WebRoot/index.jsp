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
	<anti:query>
		<anti:item />
		<anti:item cols="2" textWidth="200" />
		<anti:item cols="3" />
		<anti:item rows="3" />
		<anti:item rows="4" />
		<anti:item text="hello" />
		<anti:item text="hello" required="true" />
		<anti:item text="hello" required="true" textWidth="150" />
		<anti:item i18n="i18n-key" />
		<anti:item i18n="i18n-key">有内容</anti:item>
	</anti:query>
	
	<anti:query>
		<anti:text text="god" cols="2" />
		<anti:text text="disabled" disabled="true"  />
		<anti:text text="readonly" readonly="true" />
		<anti:text text="时间片" suffix="分钟" style="width:90px;" />
		<anti:text text="god" value="有默认值" />
	</anti:query>
	
	<anti:query>
		<anti:textFuzzy fuzzyChecked="true" />
		
		<anti:password text="密码" value="pass" />
		
		<anti:textarea text="cc">ss</anti:textarea>
		<anti:item text="hello" cols="2">
			<anti:baseCheckbox value="aa" text="god" />
			<anti:baseCheckbox value="aa" text="god" disabled="true" />
			<anti:baseCheckbox value="aa" text="god" />
			<anti:baseCheckbox value="aa" text="god" disabled="true" />
		</anti:item>
		
		<anti:item text="hello" cols="2">
			<anti:baseRadio value="aa" text="god" />
			<anti:baseRadio value="aa" text="god" disabled="true" />
			<anti:baseRadio value="aa" text="god" />
			<anti:baseRadio value="aa" text="god" disabled="true" />
		</anti:item>
	</anti:query>
</body>
</html>

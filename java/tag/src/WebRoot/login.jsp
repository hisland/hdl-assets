<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title> 登录页面 </title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
</head>
<body>
	<form action="LoginAction.action" method="post">
		<table>
			<tr>
				<td>用户名:</td>
				<td><input type="text" name="user.name" /></td>
			</tr>
			<tr>
				<td>密码:</td>
				<td><input type="text" name="user.pass" /></td>
			</tr>
			<tr>
				<td><input type="submit" value="登录" /></td>
			</tr>
		</table>
	</form>
	<s:property value="user.name" />
	<s:property value="user.pass" />
</body>
</html>
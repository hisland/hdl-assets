<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="anti" uri="/antispam2850-tags"%>

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
	<anti:query name="hello" action="text.action">
		<anti:text name="god" text="禁用标签" disabled="true" value="禁用标签" />
		<anti:text name="cc" text="只读标签" readonly="true" value="只读标签" />
		<anti:text name="cc" text="时间片" suffix="分钟" style="width:90px;" />
		<anti:text name="cc" text="必填项" required="true" />
		<anti:text name="cc" text="文本标签" />
		<anti:password name="cc" text="密码" />
		<anti:select name="cc" text="下拉" />
		<anti:select name="cc" text="自定义项下拉">
			<option value="3">555</option>
		</anti:select>
		<anti:textarea name="tt" text="备注">bbq</anti:textarea>
	</anti:query>
	
	<anti:pop name="hello">
		<anti:text name="cc" text="文本标签" />
	</anti:pop>
</body>
</html>

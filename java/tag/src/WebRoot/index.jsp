<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="anti" uri="/antispam2850-tags"%>

<anti:text name="god" text="文本标签1:" disabled="true" value="禁用标签" />
<anti:text name="cc" text="文本标签2:" />
<anti:text name="cc" text="时间片:" suffix="分钟" style="width:100px;" />
<anti:text name="cc" text="文本标签3:" required="true" />
<anti:text name="cc" text="文本标签4:" readonly="true" value="只读标签" />

<anti:query name="hello">
	<anti:text name="cc" text="文本标签:" />
	<anti:password name="cc" text="密码:" />
	<anti:select name="cc" text="下拉:" />
	<anti:select name="cc" text="下拉:">
		<option value="3">555</option>
	</anti:select>
</anti:query>

<anti:pop name="hello">
	<anti:text name="cc" text="文本标签:" />
</anti:pop>
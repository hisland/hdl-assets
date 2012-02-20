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
	<anti:query name="god" id="shit" action="hello.action">
		<fieldset class="ls1-fieldset">
			<legend class="ls1-legend">item</legend>
			<div class="ls1-box">
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
			</div>
		</fieldset>
		<fieldset class="ls1-fieldset">
			<legend class="ls1-legend">text</legend>
			<div class="ls1-box">
				<anti:text text="god" cols="2" />
				<anti:text text="disabled" disabled="true"  />
				<anti:text text="readonly" readonly="true" />
				<anti:text text="时间片" suffix="分钟" style="width:90px;" />
				<anti:text text="god" value="有默认值" />
			</div>
		</fieldset>
		<fieldset class="ls1-fieldset">
			<legend class="ls1-legend">text2</legend>
			<div class="ls1-box">
				<anti:textFuzzy fuzzyChecked="true" />
				
				<anti:password text="密码" value="pass" />
				
				<anti:textarea text="cc" dataValidType="l1-99">ss</anti:textarea>
			</div>
		</fieldset>
		<fieldset class="ls1-fieldset">
			<legend class="ls1-legend">base</legend>
			<div class="ls1-box">
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
			</div>
		</fieldset>
		<fieldset class="ls1-fieldset">
			<legend class="ls1-legend">checkbox</legend>
			<div class="ls1-box">
				<anti:checkbox text="启用" value="1" />
				<anti:fuzzy text="模糊匹配" value="1" dataFuzzyIds="#cc" />
			</div>
		</fieldset>
	</anti:query>
</body>
</html>

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
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">item</legend>
		<div class="ls1-box">
			<anti:item text="cols" cols="2" />
			<anti:item text="i18n" i18n="18n" />
			<anti:item text="required" required="true" />
			<anti:item text="rows" rows="3" />
			<anti:item text="text" text="text" />
			<anti:item text="textWidth" textWidth="150" />
			<anti:item>有内容</anti:item>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">text</legend>
		<div class="ls1-box">
			<anti:text text="autocomplete" autocomplete="false" />
			<anti:text text="cols" cols="2" />
			<anti:text text="cssclass" cssclass="cssclass"/>
			<anti:text text="dataValidType" dataValidType="#cc"/>
			<anti:text text="disabled" disabled="true"/>
			<anti:text text="i18n" i18n="i18n"/>
			<anti:text text="id" id="id"/>
			<anti:text text="maxlength" maxlength="3"/>
			<anti:text text="name" name="name"/>
			<anti:text text="readonly" readonly="true"/>
			<anti:text text="required" required="true"/>
			<anti:text text="style" style="color:red;"/>
			<anti:text text="suffix" suffix="分钟" style="width:90px;" />
			<anti:text text="text" text="text"/>
			<anti:text text="value" value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">textFuzzy</legend>
		<div class="ls1-box">
			<anti:textFuzzy text="autocomplete" autocomplete="false" />
			<anti:textFuzzy text="cols" cols="2" />
			<anti:textFuzzy text="cssclass" cssclass="cssclass"/>
			<anti:textFuzzy text="dataValidType" dataValidType="#cc"/>
			<anti:textFuzzy text="disabled" disabled="true"/>
			<anti:textFuzzy text="fuzzyChecked" fuzzyChecked="true" />
			<anti:textFuzzy text="fuzzyValue" fuzzyValue="1" />
			<anti:textFuzzy text="i18n" i18n="i18n"/>
			<anti:textFuzzy text="id" id="id"/>
			<anti:textFuzzy text="maxlength" maxlength="3"/>
			<anti:textFuzzy text="name" name="name"/>
			<anti:textFuzzy text="readonly" readonly="true"/>
			<anti:textFuzzy text="required" required="true"/>
			<anti:textFuzzy text="style" style="color:red;"/>
			<anti:textFuzzy text="text" text="text"/>
			<anti:textFuzzy text="value" value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">password</legend>
		<div class="ls1-box">
			<anti:password text="cssclass" cssclass="cssclass"/>
			<anti:password text="dataValidType" dataValidType="#cc"/>
			<anti:password text="disabled" disabled="true"/>
			<anti:password text="i18n" i18n="i18n"/>
			<anti:password text="id" id="id"/>
			<anti:password text="maxlength" maxlength="3"/>
			<anti:password text="name" name="name"/>
			<anti:password text="readonly" readonly="true"/>
			<anti:password text="required" required="true"/>
			<anti:password text="style" style="color:red;"/>
			<anti:password text="text" text="text"/>
			<anti:password text="value" value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">textarea</legend>
		<div class="ls1-box">
			<anti:textarea text="cssclass" cssclass="cssclass"></anti:textarea>
			<anti:textarea text="dataValidType" dataValidType="#cc"></anti:textarea>
			<anti:textarea text="disabled" disabled="true"></anti:textarea>
			<anti:textarea text="i18n" i18n="i18n"></anti:textarea>
			<anti:textarea text="id" id="id"></anti:textarea>
			<anti:textarea text="name" name="name"></anti:textarea>
			<anti:textarea text="readonly" readonly="true"></anti:textarea>
			<anti:textarea text="required" required="true"></anti:textarea>
			<anti:textarea text="rows" rows="3"></anti:textarea>
			<anti:textarea text="style" style="color:red;"></anti:textarea>
			<anti:textarea text="text" text="text"></anti:textarea>
			<anti:textarea text="value" value="aa"></anti:textarea>
			<anti:textarea text="floatRight" floatRight="true"></anti:textarea>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">select</legend>
		<div class="ls1-box">
			<anti:select text="cssclass" cssclass="cssclass">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="disabled" disabled="true">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="i18n" i18n="i18n">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="id" id="id">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="name" name="name">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="required" required="true">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="style" style="color:red;">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="text" text="text">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="value" value="aa">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">base</legend>
		<div class="ls1-box">
			<anti:item text="hello" cols="2">
				<anti:baseCheckbox text="checked" checked="true" />
				<anti:baseCheckbox text="disabled" disabled="true" />
				<anti:baseCheckbox text="i18n" i18n="i18n" />
				<anti:baseCheckbox text="id" id="id" />
				<anti:baseCheckbox text="name" name="name" />
				<anti:baseCheckbox text="text" text="text" />
				<anti:baseCheckbox text="value" value="1" />
			</anti:item>
			
			<anti:item text="hello" cols="2">
				<anti:baseRadio text="selected" selected="true" />
				<anti:baseRadio text="disabled" disabled="true" />
				<anti:baseRadio text="i18n" i18n="i18n" />
				<anti:baseRadio text="id" id="id" />
				<anti:baseRadio text="name" name="name" />
				<anti:baseRadio text="text" text="text" />
				<anti:baseRadio text="value" value="1" />
			</anti:item>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">checkbox</legend>
		<div class="ls1-box">
			<anti:checkbox />
			<anti:checkbox text="checked" checked="true" />
			<anti:checkbox text="cssclass" cssclass="god" />
			<anti:checkbox text="disabled" disabled="true" />
			<anti:checkbox text="i18n" i18n="i18nkey" />
			<anti:checkbox text="id" id="id" />
			<anti:checkbox text="name" name="name" />
			<anti:checkbox text="required" required="true" />
			<anti:checkbox text="style" style="width:auto;" />
			<anti:checkbox text="text" text="text" />
			<anti:checkbox text="value" value="1" />
			<anti:fuzzy text="dataFuzzyIds" value="1"  dataFuzzyIds="#cc" />
		</div>
	</fieldset>
	
	<anti:query name="god" id="shit" action="hello.action" autocomplete="false">
	</anti:query>
	<anti:pop name="god" id="shit" action="hello.action" autocomplete="false" needButtons="false">
	</anti:pop>
</body>
</html>

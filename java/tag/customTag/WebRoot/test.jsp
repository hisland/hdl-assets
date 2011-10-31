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
			<anti:item cols="2" />
			<anti:item i18n="18n" />
			<anti:item required="true" />
			<anti:item rows="3" />
			<anti:item text="text" />
			<anti:item textWidth="150" />
			<anti:item>有内容</anti:item>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">text</legend>
		<div class="ls1-box">
			<anti:text autocomplete="false" />
			<anti:text cols="2" />
			<anti:text cssclass="cssclass"/>
			<anti:text dataValidType="#cc"/>
			<anti:text disabled="true"/>
			<anti:text i18n="i18n"/>
			<anti:text id="id"/>
			<anti:text maxlength="3"/>
			<anti:text name="name"/>
			<anti:text readonly="true"/>
			<anti:text required="true"/>
			<anti:text style="color:red;"/>
			<anti:text suffix="分钟" style="width:90px;" />
			<anti:text text="text"/>
			<anti:text value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">textFuzzy</legend>
		<div class="ls1-box">
			<anti:textFuzzy autocomplete="false" />
			<anti:textFuzzy cols="2" />
			<anti:textFuzzy cssclass="cssclass"/>
			<anti:textFuzzy dataValidType="#cc"/>
			<anti:textFuzzy disabled="true"/>
			<anti:textFuzzy fuzzyChecked="true" />
			<anti:textFuzzy fuzzyValue="1" />
			<anti:textFuzzy i18n="i18n"/>
			<anti:textFuzzy id="id"/>
			<anti:textFuzzy maxlength="3"/>
			<anti:textFuzzy name="name"/>
			<anti:textFuzzy readonly="true"/>
			<anti:textFuzzy required="true"/>
			<anti:textFuzzy style="color:red;"/>
			<anti:textFuzzy text="text"/>
			<anti:textFuzzy value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">password</legend>
		<div class="ls1-box">
			<anti:password cssclass="cssclass"/>
			<anti:password dataValidType="#cc"/>
			<anti:password disabled="true"/>
			<anti:password i18n="i18n"/>
			<anti:password id="id"/>
			<anti:password maxlength="3"/>
			<anti:password name="name"/>
			<anti:password readonly="true"/>
			<anti:password required="true"/>
			<anti:password style="color:red;"/>
			<anti:password text="text"/>
			<anti:password value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">textarea</legend>
		<div class="ls1-box">
			<anti:textarea cssclass="cssclass"></anti:textarea>
			<anti:textarea dataValidType="#cc"></anti:textarea>
			<anti:textarea disabled="true"></anti:textarea>
			<anti:textarea i18n="i18n"></anti:textarea>
			<anti:textarea id="id"></anti:textarea>
			<anti:textarea name="name"></anti:textarea>
			<anti:textarea readonly="true"></anti:textarea>
			<anti:textarea required="true"></anti:textarea>
			<anti:textarea rows="3"></anti:textarea>
			<anti:textarea style="color:red;"></anti:textarea>
			<anti:textarea text="text"></anti:textarea>
			<anti:textarea value="aa"></anti:textarea>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">select</legend>
		<div class="ls1-box">
			<anti:select cssclass="cssclass">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select disabled="true">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select i18n="i18n">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select id="id">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select name="name">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select required="true">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select style="color:red;">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="text">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select value="aa">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">base</legend>
		<div class="ls1-box">
			<anti:item text="hello" cols="2">
				<anti:baseCheckbox checked="true" />
				<anti:baseCheckbox disabled="true" />
				<anti:baseCheckbox i18n="i18n" />
				<anti:baseCheckbox id="id" />
				<anti:baseCheckbox name="name" />
				<anti:baseCheckbox text="text" />
				<anti:baseCheckbox value="1" />
			</anti:item>
			
			<anti:item text="hello" cols="2">
				<anti:baseRadio selected="true" />
				<anti:baseRadio disabled="true" />
				<anti:baseRadio i18n="i18n" />
				<anti:baseRadio id="id" />
				<anti:baseRadio name="name" />
				<anti:baseRadio text="text" />
				<anti:baseRadio value="1" />
			</anti:item>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">checkbox</legend>
		<div class="ls1-box">
			<anti:checkbox />
			<anti:checkbox checked="true" />
			<anti:checkbox cssclass="god" />
			<anti:checkbox disabled="true" />
			<anti:checkbox i18n="i18nkey" />
			<anti:checkbox id="id" />
			<anti:checkbox name="name" />
			<anti:checkbox required="true" />
			<anti:checkbox style="width:auto;" />
			<anti:checkbox text="text" />
			<anti:checkbox value="1" />
			<anti:fuzzy text="模糊匹配" value="1"  dataFuzzyIds="#cc" />
		</div>
	</fieldset>
	
	<anti:query name="god" id="shit" action="hello.action" autocomplete="false">
	</anti:query>
	<anti:pop name="god" id="shit" action="hello.action" autocomplete="false" needButtons="false">
	</anti:pop>
</body>
</html>

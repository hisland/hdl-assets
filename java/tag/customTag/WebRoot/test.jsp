<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="anti" uri="/antispam2850-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title> new document </title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<script type="text/javascript" src="assets/seed.js"></script>
	<script type="text/javascript">
		KISSY.use('reset-css, common-css, condition-list-css, popWin+css, multiCheckbox, provinceCity+css, weekTool+css', function(S, undef) {
			$('#multiCheckbox1').multiCheckbox();
			$('#select-pc').provinceCity();
			$('#time-week').weekTool();
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
			<anti:text text="cols" cols="2" suffix="分钟" style="width:330px;" />
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
			<anti:text text="text"/>
			<anti:text text="textWidth" textWidth="150"/>
			<anti:text text="value" value="aa" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">multiCheckbox</legend>
		<div class="ls1-box">
			<anti:multiCheckbox text="cols,这个有效果" cols="2" id="multiCheckbox1">
				<div style="display:none;">
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
					<anti:baseCheckbox text="另外一个1" name="33" labelBlock="true" />
				</div>
			</anti:multiCheckbox>
			<anti:multiCheckbox text="cols" cols="2" suffix="分钟" style="width:330px;"></anti:multiCheckbox>
			<anti:multiCheckbox text="cssclass" cssclass="cssclass"></anti:multiCheckbox>
			<anti:multiCheckbox text="disabled" disabled="true"></anti:multiCheckbox>
			<anti:multiCheckbox text="i18n" i18n="i18n"></anti:multiCheckbox>
			<anti:multiCheckbox text="id" id="id"></anti:multiCheckbox>
			<anti:multiCheckbox text="readonly" readonly="true"></anti:multiCheckbox>
			<anti:multiCheckbox text="required" required="true"></anti:multiCheckbox>
			<anti:multiCheckbox text="style" style="color:red;"></anti:multiCheckbox>
			<anti:multiCheckbox text="suffix" suffix="分钟" style="width:90px;"></anti:multiCheckbox>
			<anti:multiCheckbox text="text"></anti:multiCheckbox>
			<anti:multiCheckbox text="textWidth" textWidth="150"></anti:multiCheckbox>
			<anti:multiCheckbox text="value" value="aa"></anti:multiCheckbox>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">textHole</legend>
		<div class="ls1-box">
			<anti:textHole text="cols" cols="2"></anti:textHole>
			<anti:textHole text="cols" cols="2" suffix="分钟" style="width:330px;"></anti:textHole>
			<anti:textHole text="cssclass" cssclass="cssclass"></anti:textHole>
			<anti:textHole text="disabled" disabled="true"></anti:textHole>
			<anti:textHole text="i18n" i18n="i18n"></anti:textHole>
			<anti:textHole text="id" id="id"></anti:textHole>
			<anti:textHole text="readonly" readonly="true"></anti:textHole>
			<anti:textHole text="required" required="true"></anti:textHole>
			<anti:textHole text="style" style="color:red;"></anti:textHole>
			<anti:textHole text="suffix" suffix="分钟" style="width:90px;"></anti:textHole>
			<anti:textHole text="text"></anti:textHole>
			<anti:textHole text="textWidth" textWidth="150"></anti:textHole>
			<anti:textHole text="value" value="aa"></anti:textHole>
			<anti:textHole text="省市选择" id="select-pc">
				<input type="hidden" name="province" />
				<input type="hidden" name="city" />
			</anti:textHole>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">textFuzzy</legend>
		<div class="ls1-box">
			<anti:textFuzzy text="autocomplete" autocomplete="false" />
			<anti:textFuzzy text="cols" cols="2" style="width:333px;" />
			<anti:textFuzzy text="cssclass" cssclass="cssclass"/>
			<anti:textFuzzy text="dataValidType" dataValidType="#cc"/>
			<anti:textFuzzy text="disabled" disabled="true"/>
			<anti:textFuzzy text="fuzzyName" fuzzyName="ttt"/>
			<anti:textFuzzy text="fuzzyChecked" fuzzyChecked="true" />
			<anti:textFuzzy text="fuzzyValue" fuzzyValue="1" />
			<anti:textFuzzy text="i18n" i18n="i18n"/>
			<anti:textFuzzy text="id" id="id"/>
			<anti:textFuzzy text="maxlength" maxlength="3"/>
			<anti:textFuzzy text="name" name="name"/>
			<anti:textFuzzy text="readonly" readonly="true"/>
			<anti:textFuzzy text="required" required="true"/>
			<anti:textFuzzy text="style" style="color:red;"/>
			<anti:textFuzzy text="text"/>
			<anti:textFuzzy text="textWidth" textWidth="150" style="width:50px;" />
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
			<anti:password text="text"/>
			<anti:password text="textWidth" textWidth="150"/>
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
			<anti:textarea text="rows" rows="4"></anti:textarea>
			<anti:textarea text="rows,cols" rows="4" cols="2"></anti:textarea>
			<anti:textarea text="style" style="color:red;"></anti:textarea>
			<anti:textarea text="text"></anti:textarea>
			<anti:textarea text="textWidth" textWidth="150"></anti:textarea>
			<anti:textarea text="value" value="aa"></anti:textarea>
			<anti:textarea text="floatRight" floatRight="true"></anti:textarea>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">itemBox</legend>
		<div class="ls1-box">
			<anti:itemBox text="id" id="cccss">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="cssclass" cssclass="cssclass">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="i18n" i18n="i18n">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="required" required="true">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="rows" rows="4">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="rows,cols" rows="4" cols="2">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="style" style="color:red;">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="text">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="textWidth" textWidth="120">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
			<anti:itemBox text="floatRight" floatRight="true">
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
				<anti:baseCheckbox text="checked" checked="true" labelBlock="true" />
			</anti:itemBox>
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
			<anti:checkbox text="text" />
			<anti:checkbox text="textWidth" textWidth="150" />
			<anti:checkbox text="value" value="1" />
			<anti:fuzzy text="dataFuzzyIds" value="1"  dataFuzzyIds="#cc" />
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">select</legend>
		<div class="ls1-box">
			<anti:select text="cssclass" cssclass="red">
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
			<anti:select text="style" style="color:green;">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="text">
				<option value="1" selected="selected">消息(SMPP)</option>
			</anti:select>
			<anti:select text="textWidth" textWidth="150" style="color:red;">
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
			<anti:item text="hello" cols="3">
				<anti:baseCheckbox name="name" text="checked" checked="true" />
				<anti:baseCheckbox name="name" text="disabled" disabled="true" />
				<anti:baseCheckbox name="name" text="i18n" i18n="i18n" />
				<anti:baseCheckbox name="name" text="id" id="id" />
				<anti:baseCheckbox name="name" text="name" />
				<anti:baseCheckbox name="name" text="text" />
				<anti:baseCheckbox name="name" text="value" value="1" />
			</anti:item>
			
			<anti:item text="hello" cols="3">
				<anti:baseRadio name="name" text="checked" checked="true" />
				<anti:baseRadio name="name" text="disabled" disabled="true" />
				<anti:baseRadio name="name" text="i18n" i18n="i18n" />
				<anti:baseRadio name="name" text="id" id="id" />
				<anti:baseRadio name="name" text="name" />
				<anti:baseRadio name="name" text="text" text="text" />
				<anti:baseRadio name="name" text="value" value="1" />
			</anti:item>
		</div>
	</fieldset>
	<fieldset class="ls1-fieldset">
		<legend class="ls1-legend">timeRange</legend>
		<div class="ls1-box">
			<anti:timeRange text="text" />
			<anti:timeRange text="idStart" idStart="time-start" />
			<anti:timeRange text="idEnd" idEnd="time-end" />
			<anti:timeRange text="valueStart" valueStart="2011-11-01" />
			<anti:timeRange text="valueStart" valueEnd="14:19:25" />
			<anti:timeRange text="disabledStart" disabledStart="true" />
			<anti:timeRange text="disabledEnd" disabledEnd="true" />
			<anti:timeRange text="nameStart" nameStart="bb"/>
			<anti:timeRange text="nameEnd" nameEnd="nn"/>
			<anti:timeRange text="readonlyStart" readonlyStart="true"/>
			<anti:timeRange text="readonlyEnd" readonlyEnd="true"/>
			<anti:timeRange text="enableValue" enableValue="1" enableText="启用"/>
			<anti:timeRange text="enableName" enableValue="1" enableText="启用" enableName="aa"/>
			<anti:timeRange text="enableChecked" enableValue="1" enableText="启用" enableChecked="true"/>
			<anti:timeRange text="按周" idStart="time-week"/>
		</div>
	</fieldset>
	
	<anti:query name="god" id="shit" action="hello.action" autocomplete="false">
	</anti:query>
	<anti:pop name="god" id="shit" action="hello.action" autocomplete="false" needButtons="false">
	</anti:pop>
</body>
</html>

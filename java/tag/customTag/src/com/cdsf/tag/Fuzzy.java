package com.cdsf.tag;


/**
 * @author hdl
 * @description 标签结构:
<div class="ls1-item">
	<div class="ls1-text">模糊匹配:</div>
	<div class="ls1-ipts">
		<input class="checkbox1" type="checkbox" name="" value="" data-fuzzy-ids="#id1, #id2" />
	</div>
</div>
 */
@SuppressWarnings("serial")
public class Fuzzy extends Checkbox {
	private String dataFuzzyIds;

	public String getDataFuzzyIds() {
		if (dataFuzzyIds != null) {
			return " data-fuzzy-ids=\"" + dataFuzzyIds + "\"";
		}else {
			return "";
		}
	}
	public void setDataFuzzyIds(String dataFuzzyIds) {
		this.dataFuzzyIds = dataFuzzyIds;
	}
}

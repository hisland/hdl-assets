package com.cdsf.tag.base;

/**
 * @author hdl
 * @description handle some common process
 */
public class Common {
	//no instance
	private Common() {}
	
	/**
	 * @author hdl
	 * @param label
	 * @return label
	 */
	public static String fixLable(String label) {
		if (label.length() == 2) {
			label = label.substring(0, 1) + "&nbsp;&nbsp;&nbsp;&nbsp;" + label.substring(1, 2);
		}else if (label.length() == 3) {
			label = label.substring(0, 1) + "&nbsp;" + label.substring(1, 2) + "&nbsp;" + label.substring(2, 3);
		}
		return label += ":";
	}
}

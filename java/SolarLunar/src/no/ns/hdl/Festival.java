package no.ns.hdl;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Festival {
	public static List<String> solar = new ArrayList<String>();
	public static List<String> lular = new ArrayList<String>();
	public static List<String> week = new ArrayList<String>();
	public static void addSolar(String s){
		solar.add(s);
	}
	public static void addLular(String s){
		lular.add(s);
	}
	public static void addWeek(String s){
		week.add(s);
	}
	public static List<String> getLunarFestivals(Lunar lunar){
		List<String> festivals = new ArrayList<String>();
		Pattern p = Pattern.compile("(\\d{4})?(\\d{2})(\\d{2})-(.+)");
		Matcher m = null;
		for (String str : lular) {
			m = p.matcher(str);
			m.find();
			if (Integer.parseInt(m.group(2)) == lunar.getMonth_int() && Integer.parseInt(m.group(3)) == lunar.getDate_int()) {
				festivals.add(m.group(4));
			}
		}
		return festivals;
	}
	private Festival(){}
}

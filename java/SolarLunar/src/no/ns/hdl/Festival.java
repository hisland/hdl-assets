package no.ns.hdl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Festival {
	public static List<String> solar = new ArrayList<String>();
	public static List<String> lunar = new ArrayList<String>();
	public static List<String> week = new ArrayList<String>();
	public static void addSolar(String s){
		solar.add(s);
	}
	public static void addLular(String s){
		lunar.add(s);
	}
	public static void addWeek(String s){
		week.add(s);
	}
	public static List<String> getSolarFestivals(Calendar cal){
		List<String> festivals = new ArrayList<String>();
		Pattern p = Pattern.compile("(\\d{4})?(\\d{2})(\\d{2}) (.+)");
		Matcher m = null;
		for (String str : lunar) {
			m = p.matcher(str);
			//月和日相等表示是节日
			if (m.find() && Integer.parseInt(m.group(2)) == cal.get(Calendar.MONTH) && Integer.parseInt(m.group(3)) == cal.get(Calendar.DATE)) {
				festivals.add(m.group(4));
			}
		}
		return festivals;
	}
	public static List<String> getLunarFestivals(Calendar cal){
		Lunar l = new Lunar(cal.getTime());
		List<String> festivals = new ArrayList<String>();
		Pattern p = Pattern.compile("(\\d{4})?(\\d{2})(\\d{2}) (.+)");
		Matcher m = null;
		for (String str : lunar) {
			m = p.matcher(str);
			//月和日相等表示是节日
			if (m.find() && Integer.parseInt(m.group(2)) == l.getIntMonth() && Integer.parseInt(m.group(3)) == l.getIntDate()) {
				festivals.add(m.group(4));
			}
		}
		return festivals;
	}
	
	//no instance
	private Festival(){}
	
	public static void main(String[] args) {
		addLular("0516 ^ ^我的生日");
		for (String i : lunar) {
			System.out.println(i);
		}
		for (String i : getLunarFestivals(Calendar.getInstance())) {
			System.out.println(i);
		}
	}
}

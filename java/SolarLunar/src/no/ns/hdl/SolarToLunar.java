package no.ns.hdl;

import java.util.Date;

/**
 * @author hedingliang
 * @version 1
 * 
 * */
public class SolarToLunar {
	private Date date;
	private Lunar lunar;

	/**
	 * @param Date d
	 * set the date and calculate the lunar;
	 */
	public void setDate(Date d) {
		date = d;
		toLunar();
	}
	
	private void toLunar() {
		lunar = new Lunar(date);
	}

	/**
	 * @return the lunar
	 */
	public Lunar getLunar() {
		return lunar;
	}

	/**
	 * @return the date
	 */
	public Date getDate() {
		return date;
	}
	
	public static void main(String[] args) {
		SolarToLunar s = new SolarToLunar();
		s.setDate(new Date());
		System.out.println(s.getDate());
		System.out.println(s.getLunar());
		Festival.addLular("0101-春节");
		Festival.addLular("19870516-我的生日");
	}
}
